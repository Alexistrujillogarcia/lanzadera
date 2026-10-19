#!/usr/bin/env node
/* =======================================================================
   recorrer.mjs — recorrido automático de la presentación con Chromium
   -----------------------------------------------------------------------
   Uso:
     node recorrer.mjs <ruta a index.html> --capturas <carpeta>
                       [--viewports 1920x1080,390x844] [--chromium <ruta>]
                       [--solo u1,u3] [--tolerancia 4]

   Para cada viewport abre la presentación, recorre TODAS las diapositivas
   de TODAS las unidades (las que no están pendientes) y en cada una:
     · revela todos los puntos de las listas progresivas,
     · mide desbordes (scroll interno del lienzo, scroll horizontal),
     · responde las preguntas y verdadero/falso y vuelve a medir,
     · voltea todas las tarjetas y vuelve a medir,
     · comprueba que no hay imágenes rotas.
   Cuenta los errores de JavaScript, de consola y de peticiones (ignorando
   Google Fonts, que falla sin internet) y guarda, por unidad y viewport, la
   captura de la diapositiva más densa con todo revelado, más el menú.

   Sale con código 1 si hay errores o desbordes.

   Desborde = el lienzo necesita scroll interno de más de --tolerancia px
   (4 por defecto). Los de 1 a 4 px se listan aparte como «roces»: son
   redondeos o la fuente de reserva, que es algo más ancha que Outfit
   cuando Google Fonts no carga; no se ven, pero indican que esa
   diapositiva va justa.

   Necesita playwright-core (npm i playwright-core en una carpeta fuera del
   repo y NODE_PATH=<carpeta>/node_modules) y un Chromium: --chromium,
   CHROMIUM_PATH, PLAYWRIGHT_BROWSERS_PATH, /opt/pw-browsers,
   ~/.cache/ms-playwright o el del sistema.
   ======================================================================= */

import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/* ---------------------------------------------------------------- */
/* Argumentos                                                       */
/* ---------------------------------------------------------------- */

const AYUDA = 'Uso: node recorrer.mjs <index.html> --capturas <carpeta> ' +
  '[--viewports 1920x1080,390x844] [--chromium <ruta>] [--solo u1,u2] [--tolerancia 4]';
const args = process.argv.slice(2);
if (!args.length || args.includes('-h') || args.includes('--help')) {
  console.log(AYUDA);
  process.exit(args.length ? 0 : 2);
}
const opts = { viewports: '1920x1080,390x844', tolerancia: '4' };
let entrada = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--capturas') opts.capturas = args[++i];
  else if (a === '--viewports') opts.viewports = args[++i];
  else if (a === '--chromium') opts.chromium = args[++i];
  else if (a === '--solo') opts.solo = args[++i];
  else if (a === '--tolerancia') opts.tolerancia = args[++i];
  else if (!entrada) entrada = a;
  else { console.error(`Argumento no reconocido: ${a}\n${AYUDA}`); process.exit(2); }
}
if (!entrada || !opts.capturas) { console.error(AYUDA); process.exit(2); }

let URL_BASE;
if (/^https?:\/\//.test(entrada)) {
  URL_BASE = entrada.replace(/#.*$/, '');
} else {
  const ruta = resolve(entrada);
  if (!existsSync(ruta)) { console.error(`No existe ${ruta}`); process.exit(2); }
  URL_BASE = pathToFileURL(ruta).href;
}
const CAPTURAS = resolve(opts.capturas);
mkdirSync(CAPTURAS, { recursive: true });

const VIEWPORTS = opts.viewports.split(',').map((v) => {
  const m = v.trim().match(/^(\d+)x(\d+)$/);
  if (!m) { console.error(`Viewport no válido: «${v}» (formato 1920x1080)`); process.exit(2); }
  return { width: Number(m[1]), height: Number(m[2]), et: `${m[1]}x${m[2]}` };
});
const TOL = Math.max(0, Number(opts.tolerancia) || 0);
const SOLO = opts.solo ? new Set(opts.solo.split(',').map((s) => s.trim())) : null;

/* ---------------------------------------------------------------- */
/* Chromium y playwright-core                                       */
/* ---------------------------------------------------------------- */

function buscarChromium() {
  for (const p of [opts.chromium, process.env.CHROMIUM_PATH]) {
    if (p) {
      if (existsSync(p)) return p;
      console.error(`No existe el Chromium indicado: ${p}`);
      process.exit(2);
    }
  }
  const raices = [process.env.PLAYWRIGHT_BROWSERS_PATH, '/opt/pw-browsers',
    join(process.env.HOME || '', '.cache', 'ms-playwright')].filter(Boolean);
  for (const raiz of raices) {
    if (!existsSync(raiz)) continue;
    let dirs = [];
    try { dirs = readdirSync(raiz); } catch { continue; }
    /* chromium-NNNN antes que chromium_headless_shell-NNNN; el más reciente primero */
    dirs = dirs.filter((d) => d.startsWith('chromium'))
      .sort((a, b) => (a.includes('headless') - b.includes('headless')) || b.localeCompare(a, 'en', { numeric: true }));
    for (const d of dirs) {
      for (const bin of ['chrome-linux/chrome', 'chrome-linux64/chrome', 'chrome-linux/headless_shell',
        'chrome-headless-shell-linux64/chrome-headless-shell',
        'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
        'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium',
        'chrome-win/chrome.exe']) {
        const p = join(raiz, d, bin);
        if (existsSync(p)) return p;
      }
    }
  }
  for (const p of ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']) {
    if (existsSync(p)) return p;
  }
  return null;
}

async function cargarPlaywright() {
  for (const nombre of ['playwright-core', 'playwright']) {
    try { return await import(nombre); } catch { /* sigue */ }
    try {
      /* Los módulos ESM no miran NODE_PATH; require.resolve sí. */
      const require = createRequire(join(process.cwd(), 'noop.js'));
      return await import(pathToFileURL(require.resolve(nombre)).href);
    } catch { /* sigue */ }
  }
  return null;
}

const pw = await cargarPlaywright();
if (!pw) {
  console.error('No se encuentra playwright-core. Instálalo FUERA del repositorio y pasa NODE_PATH:\n' +
    '  mkdir -p /tmp/pw && (cd /tmp/pw && npm i playwright-core)\n' +
    '  NODE_PATH=/tmp/pw/node_modules node recorrer.mjs …');
  process.exit(2);
}
const chromium = (pw.chromium || (pw.default && pw.default.chromium));
const EXE = buscarChromium();
if (!EXE) {
  console.error('No se encuentra Chromium. Indica la ruta con --chromium o CHROMIUM_PATH, ' +
    'o instala uno con: npx playwright install chromium');
  process.exit(2);
}

/* ---------------------------------------------------------------- */
/* Recorrido                                                        */
/* ---------------------------------------------------------------- */

const IGNORA = /fonts\.googleapis|fonts\.gstatic/;
const espera = (p, ms) => p.waitForTimeout(ms);
const dos = (n) => String(n).padStart(2, '0');

const navegador = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--font-render-hinting=none'] });
console.log(`Chromium: ${EXE}`);
console.log(`Presentación: ${URL_BASE}`);

const errores = [];
const desbordes = [];
const roces = [];
let fuentesFallidas = 0;
const imagenesRotas = [];
const informe = {};      // informe[uid][vp] = { n, densa: {s, ratio} }
let unidades = [];
let visitadas = 0;

async function medir(page) {
  return page.evaluate(() => {
    const l = document.querySelector('#lienzo');
    const d = document.querySelector('#lienzo > .d');
    const rotas = [...document.querySelectorAll('#lienzo img')]
      .filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
    return {
      v: l.scrollHeight - l.clientHeight,
      h: l.scrollWidth - l.clientWidth,
      hDoc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ratio: d ? d.scrollHeight / Math.max(1, l.clientHeight) : 0,
      txt: d ? d.textContent.replace(/\s+/g, ' ').length : 0,
      tipo: d ? d.className.replace(/^d d--/, '') : '?',
      cont: (document.querySelector('#contador') || {}).textContent || '',
      rotas
    };
  });
}

async function revelarLista(page) {
  for (let k = 0; k < 15; k++) {
    /* Solo las listas progresivas tienen .lista__item ocultos (la pista de
       las tarjetas reutiliza .lista__pista, así que no sirve de señal). */
    if (!(await page.locator('.lista__item:not(.visible)').count())) return;
    const antes = await page.locator('#contador').textContent();
    await page.keyboard.press('ArrowRight');
    await espera(page, 40);
    if ((await page.locator('#contador').textContent()) !== antes) {
      await page.keyboard.press('ArrowLeft');   // se pasó: vuelve con todo revelado
      await espera(page, 60);
      return;
    }
  }
}

async function revelarTodo(page) {
  await revelarLista(page);
  const ops = await page.locator('.opcion:not([disabled])').count();
  if (ops) { await page.locator('.opcion').first().click(); await espera(page, 80); }
  const nt = await page.locator('.flip:not(.volteada)').count();
  for (let j = 0; j < nt; j++) await page.locator('.flip:not(.volteada)').first().click();
  if (nt) await espera(page, 120);
}

async function ir(page, uid, s) {
  await page.goto(`${URL_BASE}#${uid}-${s}`, { waitUntil: 'load' });
  await espera(page, 70);
  const c = (await page.locator('#contador').textContent() || '').trim();
  if (!c.startsWith(`${s} /`)) {
    /* Mismo hash que antes o carga sin hashchange: se fuerza por la API */
    await page.evaluate(([u, n]) => { window.PRESENTACION.abrirUnidad(u, true); window.PRESENTACION.irA(n - 1); }, [uid, s]);
    await espera(page, 70);
  }
}

for (const vp of VIEWPORTS) {
  const ctx = await navegador.newContext({ viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const marca = (t) => `[${vp.et}] ${t}`;
  page.on('pageerror', (e) => errores.push(marca(`pageerror: ${e.message}`)));
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const url = (m.location && m.location().url) || '';
    if (IGNORA.test(m.text()) || IGNORA.test(url)) { fuentesFallidas++; return; }
    errores.push(marca(`console.error: ${m.text()}${url ? ` (${url})` : ''}`));
  });
  page.on('requestfailed', (r) => {
    const fallo = r.failure()?.errorText || '';
    /* ERR_ABORTED = petición cancelada por la propia navegación, no un fallo */
    if (!IGNORA.test(r.url()) && !/ERR_ABORTED/.test(fallo)) errores.push(marca(`requestfailed: ${r.url()} — ${r.failure()?.errorText}`));
  });

  await page.goto(URL_BASE, { waitUntil: 'load' });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* nada */ } });
  await page.reload({ waitUntil: 'load' });
  await espera(page, 150);
  const datos = await page.evaluate(() => {
    const D = window.UNIDADES || {};
    return {
      titulo: (D.config || {}).titulo || '',
      motor: !!window.PRESENTACION,
      unidades: (D.unidades || []).map((u) => ({ id: u.id, titulo: u.titulo,
        n: (u.diapositivas || []).length, pendiente: !!u.pendiente }))
    };
  });
  if (!datos.motor) errores.push(marca('el motor (app.js) no se ha iniciado: window.PRESENTACION no existe'));
  unidades = datos.unidades;
  const hDocMenu = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (hDocMenu > TOL) desbordes.push(marca(`menú: scroll horizontal de ${hDocMenu}px`));
  await page.screenshot({ path: join(CAPTURAS, `menu-${vp.et}.png`) });

  for (const u of unidades) {
    if (u.pendiente || !u.n || (SOLO && !SOLO.has(u.id))) continue;
    let densa = { s: 1, ratio: -1, txt: 0 };
    for (let s = 1; s <= u.n; s++) {
      await ir(page, u.id, s);
      await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* nada */ } });
      visitadas++;
      const etiqueta = (m, extra = '') => marca(`${u.id}-${dos(s)} ${m.tipo}${extra}`);
      const anotar = (m, extra) => {
        for (const [px, que] of [[m.v, 'VERTICAL'], [m.h, 'HORIZONTAL'], [m.hDoc, 'horizontal de página']]) {
          if (px > TOL) desbordes.push(`${etiqueta(m, extra)}: desborde ${que} ${px}px`);
          else if (px > 0) roces.push(`${etiqueta(m, extra)}: ${px}px ${que.toLowerCase()} (dentro de la tolerancia)`);
        }
        m.rotas.forEach((src) => imagenesRotas.push(`${etiqueta(m)}: imagen rota ${src}`));
      };

      await revelarLista(page);
      let m = await medir(page);
      anotar(m, '');
      let peor = m;

      if (await page.locator('.opcion').count()) {
        await page.locator('.opcion').first().click();
        await espera(page, 80);
        m = await medir(page);
        anotar(m, ' (respondida)');
        if (m.ratio > peor.ratio) peor = m;
      }
      const nt = await page.locator('.flip').count();
      if (nt) {
        for (let j = 0; j < nt; j++) await page.locator('.flip').nth(j).click();
        await espera(page, 120);
        m = await medir(page);
        anotar(m, ' (volteadas)');
        if (m.ratio > peor.ratio) peor = m;
      }
      if (peor.ratio > densa.ratio || (peor.ratio === densa.ratio && peor.txt > densa.txt)) {
        densa = { s, ratio: peor.ratio, txt: peor.txt, tipo: peor.tipo };
      }
    }

    /* Captura de la más densa, con todo revelado, en un estado limpio */
    await page.goto(URL_BASE, { waitUntil: 'load' });
    await page.reload({ waitUntil: 'load' });
    await ir(page, u.id, densa.s);
    await revelarTodo(page);
    await espera(page, 150);
    const archivo = `${u.id}-${dos(densa.s)}-${vp.et}.png`;
    await page.screenshot({ path: join(CAPTURAS, archivo) });
    informe[u.id] = informe[u.id] || {};
    informe[u.id][vp.et] = { n: u.n, densa, archivo };
  }
  await ctx.close();
}
await navegador.close();

/* ---------------------------------------------------------------- */
/* Informe                                                          */
/* ---------------------------------------------------------------- */

const totalErrores = errores.length + imagenesRotas.length;
console.log(`\nUnidades recorridas: ${Object.keys(informe).length} de ${unidades.length} · ` +
  `diapositivas visitadas: ${visitadas} (${VIEWPORTS.map((v) => v.et).join(', ')})`);
for (const u of unidades) {
  if (!informe[u.id]) { console.log(`  ${u.id}: no recorrida${u.pendiente ? ' (pendiente)' : u.n ? '' : ' (sin diapositivas)'}`); continue; }
  const partes = VIEWPORTS.map((vp) => {
    const r = informe[u.id][vp.et];
    return r ? `${vp.et}: más densa la ${r.densa.s} (${r.densa.tipo}, ${Math.round(r.densa.ratio * 100)} % del alto)` : '';
  }).filter(Boolean);
  console.log(`  ${u.id} · ${u.n} diap. · ${partes.join(' · ')}`);
}
console.log(`\nErrores JS / consola / peticiones: ${errores.length}`);
errores.slice(0, 40).forEach((e) => console.log('  ' + e));
if (errores.length > 40) console.log(`  … y ${errores.length - 40} más`);
if (fuentesFallidas) {
  console.log(`(Ignorados ${fuentesFallidas} errores de Google Fonts: se ha medido con la fuente de reserva, más ancha que Outfit.)`);
}
console.log(`Imágenes rotas: ${imagenesRotas.length}`);
imagenesRotas.slice(0, 20).forEach((e) => console.log('  ' + e));
console.log(`Desbordes (> ${TOL}px): ${desbordes.length}`);
desbordes.forEach((d) => console.log('  ' + d));
if (roces.length) {
  console.log(`Roces (1-${TOL}px, no cuentan como fallo): ${roces.length}`);
  roces.forEach((d) => console.log('  ' + d));
}
console.log(`\nCapturas en ${CAPTURAS}:`);
console.log('  ' + ['menu', ...Object.values(informe).flatMap((r) => Object.values(r).map((x) => x.archivo))]
  .map((x) => x === 'menu' ? VIEWPORTS.map((v) => `menu-${v.et}.png`).join(', ') : x).join(', '));
console.log('\nMira las capturas: los títulos partidos, las tarjetas enanas o un emoji que sale como cuadrado no los detecta este script.');

process.exit(totalErrores || desbordes.length ? 1 : 0);
