#!/usr/bin/env node
/* =======================================================================
   Genera propuesta/Propuesta-Ayuntamiento.pdf a partir de propuesta.html
   -----------------------------------------------------------------------
   Uso:
     node propuesta/build-pdf.mjs

   Dos caminos, en este orden:
     1. playwright-core (o playwright) si está disponible. Es el camino
        bueno: añade encabezado y pie con número de página.
     2. Si no lo está, lanza directamente el binario de Chromium con
        --headless --print-to-pdf. Sin encabezado ni pie propios.

   Variables de entorno opcionales:
     CHROMIUM_PATH   ruta al binario de Chromium
     NODE_PATH       carpeta node_modules donde buscar playwright-core
   ======================================================================= */

import { existsSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const ENTRADA = join(AQUI, 'propuesta.html');
const SALIDA = join(AQUI, 'Propuesta-Ayuntamiento.pdf');

if (!existsSync(ENTRADA)) {
  console.error(`No se encuentra ${ENTRADA}`);
  process.exit(1);
}

/* ---------------------------------------------------------------- */
/* Localizar Chromium                                               */
/* ---------------------------------------------------------------- */

function buscarChromium() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) {
    return process.env.CHROMIUM_PATH;
  }

  // Navegadores descargados por Playwright
  const raices = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    '/opt/pw-browsers',
    join(process.env.HOME || '', '.cache', 'ms-playwright')
  ].filter(Boolean);

  for (const raiz of raices) {
    if (!existsSync(raiz)) continue;
    let entradas;
    try { entradas = readdirSync(raiz); } catch { continue; }
    const candidatos = entradas
      .filter((d) => d.startsWith('chromium'))
      .sort()
      .reverse();
    for (const c of candidatos) {
      for (const bin of ['chrome-linux/chrome', 'chrome-linux/headless_shell',
                         'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const p = join(raiz, c, bin);
        if (existsSync(p)) return p;
      }
    }
  }

  // Chromium / Chrome del sistema
  for (const p of ['/usr/bin/chromium', '/usr/bin/chromium-browser',
                   '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
                   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']) {
    if (existsSync(p)) return p;
  }
  return null;
}

const PIE = `
<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;
            color:#655D8A;padding:0 18mm;display:flex;justify-content:space-between;">
  <span>Nadie nace sabiendo cuidar · Alexis Trujillo</span>
  <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
</div>`;

const CABECERA = `
<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;
            color:#8A82A8;padding:0 18mm;text-align:right;">
  Propuesta al Excmo. Ayuntamiento de San Cristóbal de La Laguna
</div>`;

/* ---------------------------------------------------------------- */
/* Camino 1: playwright-core                                        */
/* ---------------------------------------------------------------- */

async function cargarPlaywright() {
  for (const nombre of ['playwright-core', 'playwright']) {
    // 1) resolución normal (node_modules del repo o instalación global enlazada)
    try { return await import(nombre); } catch { /* seguimos */ }
    // 2) resolución al estilo CommonJS: así sí se tiene en cuenta NODE_PATH
    try {
      const require = createRequire(import.meta.url);
      const ruta = require.resolve(nombre);
      return await import(pathToFileURL(ruta).href);
    } catch { /* siguiente nombre */ }
  }
  return null;
}

async function conPlaywright(ejecutable) {
  const pw = await cargarPlaywright();
  if (!pw) return false;

  const { chromium } = pw.default && pw.default.chromium ? pw.default : pw;
  const navegador = await chromium.launch({
    executablePath: ejecutable || undefined,
    args: ['--no-sandbox']
  });
  const pagina = await navegador.newPage();
  await pagina.goto(pathToFileURL(ENTRADA).href, { waitUntil: 'networkidle' });
  await pagina.emulateMedia({ media: 'print' });
  await pagina.pdf({
    path: SALIDA,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: CABECERA,
    footerTemplate: PIE,
    margin: { top: '18mm', bottom: '17mm', left: '18mm', right: '18mm' }
  });
  await navegador.close();
  return true;
}

/* ---------------------------------------------------------------- */
/* Camino 2: binario de Chromium directamente                       */
/* ---------------------------------------------------------------- */

function conChromiumDirecto(ejecutable) {
  return new Promise((cumplir, fallar) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      `--print-to-pdf=${SALIDA}`,
      pathToFileURL(ENTRADA).href
    ];
    const proceso = spawn(ejecutable, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let err = '';
    proceso.stderr.on('data', (d) => { err += d.toString(); });
    proceso.on('error', fallar);
    proceso.on('close', (codigo) => {
      if (codigo === 0 && existsSync(SALIDA)) { cumplir(true); }
      else { fallar(new Error(`Chromium terminó con código ${codigo}.\n${err}`)); }
    });
  });
}

/* ---------------------------------------------------------------- */

const ejecutable = buscarChromium();

try {
  if (await conPlaywright(ejecutable)) {
    console.log(`PDF generado con Playwright (con encabezado y numeración):\n  ${SALIDA}`);
    process.exit(0);
  }
} catch (e) {
  console.warn(`Playwright no pudo generar el PDF (${e.message}). Se prueba con Chromium directo.`);
}

if (!ejecutable) {
  console.error(
    'No se ha encontrado Chromium.\n' +
    'Instala playwright-core y un Chromium, o indica la ruta con CHROMIUM_PATH:\n' +
    '  CHROMIUM_PATH=/ruta/a/chrome node propuesta/build-pdf.mjs'
  );
  process.exit(1);
}

try {
  await conChromiumDirecto(ejecutable);
  console.log(
    `PDF generado con Chromium directo (sin encabezado ni numeración propios):\n  ${SALIDA}`
  );
} catch (e) {
  console.error(`No se ha podido generar el PDF: ${e.message}`);
  process.exit(1);
}
