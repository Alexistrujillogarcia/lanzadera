# Propuesta institucional — plantilla

Plantilla de propuesta para que una administración (ayuntamiento, cabildo,
consejería…) apruebe y financie un programa educativo. Maquetada en A4 y
exportable a PDF.

```
propuesta/
├── propuesta.html   el documento (portada + 9 secciones), con marcadores y guías
├── propuesta.css    maquetación A4 y estilo institucional
├── build-pdf.mjs    genera el PDF con Chromium
└── README.md        este archivo
```

## Cómo se rellena

`propuesta.html` trae la estructura completa y probada:

| Hoja | Sección |
|---|---|
| 1 | Portada |
| 2 | 01 · Carta de presentación |
| 3 | 02 · La actividad en una página |
| 4-5 | 03 · Las unidades (una ficha por unidad) |
| 6 | 04 · Beneficios para la institución y los centros |
| 7 | 05 · Metodología y recursos |
| 8 | 06 · Calendario propuesto |
| 9 | 07 · Presupuesto |
| 10 | 08 · Sobre los autores |
| 11 | 09 · Contacto y firma |

- Cada bloque lleva un comentario `<!-- GUÍA: … -->` que explica qué escribir
  y con qué extensión. No se imprimen; se pueden dejar.
- Todo lo que no se sabe va como `<span class="marcador">[…]</span>`, que sale
  **resaltado en amarillo** en el HTML y en el PDF. Ningún importe, nombre,
  cargo o fecha se inventa: se deja el marcador y el autor lo rellena.
- La sección 03 trae **una ficha de unidad de ejemplo**: duplica el
  `<article class="unidad">` una vez por unidad.
- La tabla de presupuesto lleva `[importe]` en todas las celdas y la fila de
  impuesto como `[IGIC/IVA] ([%])`: IGIC en Canarias (tipo general 7 %), IVA
  en el resto, o exención si el autor la confirma.
- Las tres metas del `<head>` (`pdf-archivo`, `pdf-cabecera`, `pdf-pie`) dan
  el nombre del PDF y el texto de la cabecera y el pie de cada página.
- Para otra paleta, cambia `--primario`, `--primario-claro` y los tres colores
  del degradado de `.portada` en `propuesta.css`.

Para localizar los marcadores pendientes:

```bash
grep -o '\[[^]]*\]' propuesta/propuesta.html | sort | uniq -c
```

La guía de redacción completa (tono, argumentos, extensión de cada sección,
ejemplos reales) está en `references/guia-propuesta.md` de la skill
`presentacion-educativa`.

## Revisar en el navegador

`propuesta.html` es HTML normal: se abre en cualquier navegador y se ve ya
paginado (una hoja blanca por sección sobre fondo gris). `Ctrl+P` muestra
exactamente cómo va a imprimirse.

## Generar el PDF

```bash
node propuesta/build-pdf.mjs              # nombre según <meta name="pdf-archivo">
node propuesta/build-pdf.mjs otra-ruta.pdf
```

A4, con `printBackground` activado (la portada lleva fondo de color; el resto
imprime sobre blanco). El script busca Chromium por este orden: la variable
`CHROMIUM_PATH`, los navegadores de Playwright (`PLAYWRIGHT_BROWSERS_PATH`,
`/opt/pw-browsers`, `~/.cache/ms-playwright`) y el Chromium o Chrome del
sistema.

**Con `playwright-core` (recomendado)** añade la cabecera y el pie con
«Página N de M». Instálalo fuera del repositorio y pásalo con `NODE_PATH`:

```bash
mkdir -p /tmp/pdf-tools && (cd /tmp/pdf-tools && npm i playwright-core)
NODE_PATH=/tmp/pdf-tools/node_modules node propuesta/build-pdf.mjs
```

**Sin Playwright** lanza Chromium con `--headless --print-to-pdf`: misma
paginación, pero sin cabecera ni número de página. Para la versión que se
envía, usa la primera forma.

## Revisar el PDF generado

Rasteriza todas las páginas y míralas una a una: portada con aire, ninguna
página con menos de dos tercios de contenido, tablas enteras, fichas de unidad
de dos en dos o de tres en tres.

```bash
python3 -c "
import pymupdf
d = pymupdf.open('propuesta/Propuesta.pdf')
for i in range(d.page_count):
    d[i].get_pixmap(dpi=110).save(f'/tmp/propuesta-pagina-{i+1:02d}.png')
print(d.page_count, 'páginas')
"
```
