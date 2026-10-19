#!/usr/bin/env node
/* =======================================================================
   validar_unidades.mjs — comprueba el esquema de data/unidades.js
   -----------------------------------------------------------------------
   Uso:
     node validar_unidades.mjs <ruta a unidades.js> [--img-base <carpeta>]

   --img-base   carpeta respecto a la que se resuelven las rutas img/…
                (por defecto, la que contiene index.html: si unidades.js
                está en data/, la carpeta padre).

   FALLOS (salida con código 1):
     · el archivo no carga o no define window.UNIDADES
     · falta config.titulo, no hay unidades, id repetido o ausente
     · unidad sin título, sin diapositivas o con pendiente:true
     · tipo de diapositiva desconocido
     · pregunta sin exactamente una opción correcta o sin explicacion
     · verdadero_falso sin respuesta booleana
     · encuesta con menos de 2 o más de 4 opciones
     · lista sin items, tarjeta sin frente o dorso, cierre sin ideas
     · reto con minutos no numérico
     · imagen referenciada que no existe
   AVISOS (no hacen fallar): marcadores [ … ] sin rellenar y textos más
   largos de lo que cabe cómodamente en móvil.
   ======================================================================= */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import vm from 'node:vm';

const TIPOS = ['portada', 'texto', 'lista', 'imagen', 'pregunta', 'verdadero_falso',
  'tarjetas', 'encuesta', 'sabias_que', 'reto', 'cierre'];

/* Límites de longitud (en caracteres, sin etiquetas HTML) calibrados con
   las 105 diapositivas de «Nadie nace sabiendo cuidar», que caben sin
   desborde a 390×844. Superarlos no es un fallo, pero conviene mirar la
   captura de esa diapositiva en móvil. */
const LIMITES = {
  idea: 90,          // cada idea del cierre (ideal 60-70)
  dato: 20,          // cifra gigante de sabias_que
  titulo: 70,
  parrafos: 300,     // suma de los párrafos de una diapositiva texto
  dorsoUna: 180,     // dorso de tarjeta cuando hay una sola
  dorsoVarias: 120,  // dorso de tarjeta cuando hay 2-4
  items: 5,          // puntos de una lista
  tarjetas: 4,
  pasos: 4
};

/* ---------------------------------------------------------------- */
/* Argumentos                                                       */
/* ---------------------------------------------------------------- */

const args = process.argv.slice(2);
if (!args.length || args.includes('-h') || args.includes('--help')) {
  console.log('Uso: node validar_unidades.mjs <ruta a unidades.js> [--img-base <carpeta>]');
  process.exit(args.length ? 0 : 2);
}
let ruta = null, imgBase = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--img-base') { imgBase = args[++i]; }
  else if (!ruta) { ruta = args[i]; }
}
ruta = resolve(ruta);
if (!existsSync(ruta) || !statSync(ruta).isFile()) {
  console.error(`No existe el archivo ${ruta}`);
  process.exit(2);
}
if (!imgBase) {
  const d = dirname(ruta);
  imgBase = basename(d) === 'data' ? dirname(d) : d;
}
imgBase = resolve(imgBase);

/* ---------------------------------------------------------------- */
/* Carga en un contexto aislado (el archivo solo asigna window.UNIDADES) */
/* ---------------------------------------------------------------- */

const fallos = [];
const avisos = [];
let D;
try {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(readFileSync(ruta, 'utf8'), ctx, { filename: ruta });
  D = ctx.window.UNIDADES;
} catch (e) {
  console.error(`El archivo no se puede ejecutar: ${e.message}`);
  if (e.stack) console.error(e.stack.split('\n').slice(0, 3).join('\n'));
  process.exit(1);
}
if (!D || typeof D !== 'object') {
  console.error('El archivo no define window.UNIDADES.');
  process.exit(1);
}

const limpio = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
const largo = (s) => limpio(s).length;

/* Marcadores [ … ] pendientes en cualquier texto */
function buscarMarcadores(obj, ref, vistos = new Set()) {
  if (typeof obj === 'string') {
    const m = obj.match(/\[[^\]\n]{1,80}\]/g);
    if (m) m.forEach((x) => vistos.add(`${ref}: ${x}`));
  } else if (Array.isArray(obj)) {
    obj.forEach((x) => buscarMarcadores(x, ref, vistos));
  } else if (obj && typeof obj === 'object') {
    Object.values(obj).forEach((x) => buscarMarcadores(x, ref, vistos));
  }
  return vistos;
}

function comprobarImagen(ruta, ref, campo) {
  if (!ruta) return;
  if (/^(https?:|data:)/.test(ruta)) return;
  if (!existsSync(join(imgBase, ruta))) fallos.push(`${ref}: ${campo} inexistente «${ruta}» (buscada en ${imgBase})`);
}

/* ---------------------------------------------------------------- */
/* config                                                            */
/* ---------------------------------------------------------------- */

const config = D.config || {};
if (!D.config) fallos.push('config: no existe');
if (!limpio(config.titulo)) fallos.push('config.titulo: vacío');
for (const k of Object.keys(config)) {
  if (/^color/.test(k) && !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(config[k]))) {
    avisos.push(`config.${k}: «${config[k]}» no parece un color hexadecimal`);
  }
}
comprobarImagen(config.favicon, 'config', 'favicon');
const marcadores = [...buscarMarcadores(config, 'config')];

/* ---------------------------------------------------------------- */
/* unidades                                                          */
/* ---------------------------------------------------------------- */

const unidades = Array.isArray(D.unidades) ? D.unidades : [];
if (!unidades.length) fallos.push('unidades: la lista está vacía o no existe');

const ids = new Set();
const reparto = {};
const resumen = [];
let totalDiapos = 0;

unidades.forEach((u, iu) => {
  const id = u && u.id;
  const refU = id || `unidad #${iu + 1}`;
  if (!id) fallos.push(`${refU}: sin id`);
  else if (ids.has(id)) fallos.push(`${refU}: id repetido`);
  else ids.add(id);
  if (/[\s#-]/.test(String(id || ''))) fallos.push(`${refU}: el id no puede llevar espacios, «#» ni «-» (se usa en el enlace #${id}-N)`);
  if (!limpio(u.titulo)) fallos.push(`${refU}: sin título`);
  if (u.pendiente) fallos.push(`${refU}: sigue con pendiente:true`);
  comprobarImagen(u.iconoImg, refU, 'iconoImg');
  const { diapositivas: _d, ...camposUnidad } = u;
  buscarMarcadores(camposUnidad, refU).forEach((m) => marcadores.push(m));

  const diapos = Array.isArray(u.diapositivas) ? u.diapositivas : [];
  if (!diapos.length) fallos.push(`${refU}: sin diapositivas`);
  totalDiapos += diapos.length;
  const tiposU = {};

  diapos.forEach((d, i) => {
    const ref = `${refU}#${i + 1}`;
    if (!d || typeof d !== 'object') { fallos.push(`${ref}: no es un objeto`); return; }
    const t = d.tipo;
    reparto[t] = (reparto[t] || 0) + 1;
    tiposU[t] = (tiposU[t] || 0) + 1;
    if (!TIPOS.includes(t)) fallos.push(`${ref}: tipo desconocido «${t}»`);

    if (largo(d.titulo) > LIMITES.titulo) avisos.push(`${ref} (${t}): título de ${largo(d.titulo)} caracteres (> ${LIMITES.titulo})`);

    switch (t) {
      case 'texto': {
        const n = (d.parrafos || []).map(limpio).join(' ').length + largo(d.destacado);
        if (!(d.parrafos || []).length && !d.destacado) fallos.push(`${ref}: texto sin parrafos ni destacado`);
        if (n > LIMITES.parrafos) avisos.push(`${ref}: ${n} caracteres de texto (> ${LIMITES.parrafos}); valora dividirla`);
        break;
      }
      case 'lista': {
        const it = d.items || [];
        if (!it.length) fallos.push(`${ref}: lista sin items`);
        if (it.length > LIMITES.items) avisos.push(`${ref}: ${it.length} puntos (> ${LIMITES.items})`);
        it.forEach((x, j) => {
          if (x && typeof x === 'object') {
            if (!x.titulo && !x.texto) fallos.push(`${ref}: item ${j + 1} sin titulo ni texto`);
            comprobarImagen(x.iconoImg, ref, `icono del item ${j + 1}`);
          } else if (!limpio(x)) fallos.push(`${ref}: item ${j + 1} vacío`);
        });
        break;
      }
      case 'imagen':
        if (!d.imagen && !d.pie) fallos.push(`${ref}: imagen sin imagen ni pie`);
        break;
      case 'pregunta': {
        const ops = d.opciones || [];
        if (ops.length < 2) fallos.push(`${ref}: pregunta con ${ops.length} opciones`);
        const ok = ops.filter((o) => o && typeof o === 'object' && o.correcta === true);
        if (ok.length !== 1) fallos.push(`${ref}: ${ok.length} opciones con correcta:true (debe haber exactamente 1)`);
        if (!limpio(d.explicacion)) fallos.push(`${ref}: pregunta sin explicacion`);
        break;
      }
      case 'verdadero_falso':
        if (typeof d.respuesta !== 'boolean') fallos.push(`${ref}: respuesta debe ser true o false (booleano), no «${d.respuesta}»`);
        if (!limpio(d.afirmacion)) fallos.push(`${ref}: verdadero_falso sin afirmacion`);
        if (!limpio(d.explicacion)) avisos.push(`${ref}: verdadero_falso sin explicacion`);
        break;
      case 'tarjetas': {
        const ts = d.tarjetas || [];
        if (!ts.length) fallos.push(`${ref}: tarjetas vacía`);
        if (ts.length > LIMITES.tarjetas) avisos.push(`${ref}: ${ts.length} tarjetas (> ${LIMITES.tarjetas})`);
        const lim = ts.length > 1 ? LIMITES.dorsoVarias : LIMITES.dorsoUna;
        ts.forEach((c, j) => {
          if (!limpio(c.frente) || !limpio(c.dorso)) fallos.push(`${ref}: tarjeta ${j + 1} sin frente o sin dorso`);
          if (largo(c.dorso) > lim) avisos.push(`${ref}: dorso de la tarjeta ${j + 1} con ${largo(c.dorso)} caracteres (> ${lim})`);
          comprobarImagen(c.frenteImg, ref, `frenteImg de la tarjeta ${j + 1}`);
          comprobarImagen(c.dorsoImg, ref, `dorsoImg de la tarjeta ${j + 1}`);
        });
        break;
      }
      case 'encuesta': {
        const n = (d.opciones || []).length;
        if (n < 2 || n > 4) fallos.push(`${ref}: encuesta con ${n} opciones (deben ser de 2 a 4)`);
        break;
      }
      case 'sabias_que':
        if (!limpio(d.dato) && !limpio(d.texto)) fallos.push(`${ref}: sabias_que sin dato ni texto`);
        if (largo(d.dato) > LIMITES.dato) avisos.push(`${ref}: dato de ${largo(d.dato)} caracteres (> ${LIMITES.dato}); la cifra gigante no cabrá en móvil`);
        break;
      case 'reto':
        if (d.minutos !== undefined && !(Number(d.minutos) > 0)) fallos.push(`${ref}: minutos debe ser un número positivo`);
        if ((d.pasos || []).length > LIMITES.pasos) avisos.push(`${ref}: ${(d.pasos || []).length} pasos (> ${LIMITES.pasos})`);
        break;
      case 'cierre':
        if (!(d.ideas || []).length) fallos.push(`${ref}: cierre sin ideas`);
        (d.ideas || []).forEach((x, j) => {
          if (largo(x) > LIMITES.idea) avisos.push(`${ref}: idea ${j + 1} con ${largo(x)} caracteres (> ${LIMITES.idea}; ideal 60-70)`);
        });
        break;
    }

    for (const k of ['imagen', 'iconoImg']) comprobarImagen(d[k], ref, k);
    buscarMarcadores(d, ref).forEach((m) => marcadores.push(m));
  });

  if (diapos.length && diapos[diapos.length - 1].tipo !== 'cierre') {
    avisos.push(`${refU}: la última diapositiva no es de tipo cierre`);
  }
  resumen.push({ id: refU, n: diapos.length, duracion: u.duracion || '—', titulo: limpio(u.titulo), tipos: tiposU });
});

/* ---------------------------------------------------------------- */
/* Informe                                                           */
/* ---------------------------------------------------------------- */

console.log(`Archivo: ${ruta}`);
console.log(`Imágenes buscadas en: ${imgBase}`);
console.log(`Programa: ${limpio(config.titulo) || '(sin título)'}`);
console.log(`Unidades: ${unidades.length} · diapositivas: ${totalDiapos}`);
for (const r of resumen) {
  const tipos = Object.entries(r.tipos).map(([k, v]) => `${k}×${v}`).join(' ');
  console.log(`  ${r.id.padEnd(4)} ${String(r.n).padStart(3)} diap. · ${r.duracion} · ${r.titulo}`);
  console.log(`         ${tipos}`);
}
console.log('Reparto de tipos:');
for (const t of TIPOS) console.log(`  ${t.padEnd(16)} ${String(reparto[t] || 0).padStart(4)}`);
for (const t of Object.keys(reparto)) if (!TIPOS.includes(t)) console.log(`  ${String(t).padEnd(16)} ${String(reparto[t]).padStart(4)}  ← desconocido`);

if (marcadores.length) {
  console.log(`\nMarcadores sin rellenar: ${marcadores.length}`);
  marcadores.slice(0, 40).forEach((m) => console.log('  ' + m));
  if (marcadores.length > 40) console.log(`  … y ${marcadores.length - 40} más`);
}
if (avisos.length) {
  console.log(`\nAvisos: ${avisos.length}`);
  avisos.forEach((a) => console.log('  ' + a));
}
if (fallos.length) {
  console.log(`\nFALLOS: ${fallos.length}`);
  fallos.forEach((f) => console.log('  ' + f));
  process.exit(1);
}
console.log(`\nSin fallos.${avisos.length || marcadores.length ? ' Revisa los avisos y marcadores.' : ''}`);
