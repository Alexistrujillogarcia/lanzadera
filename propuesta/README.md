# Propuesta al Ayuntamiento de San Cristóbal de La Laguna

Plantilla de la propuesta institucional del programa **«Nadie nace sabiendo
cuidar»**, maquetada en A4 y exportable a PDF.

```
propuesta/
├── propuesta.html               el documento (portada + 9 secciones)
├── propuesta.css                maquetación A4 y estilo institucional
├── build-pdf.mjs                genera el PDF con Chromium
├── Propuesta-Ayuntamiento.pdf   PDF generado (11 páginas)
└── README.md                    este archivo
```

## Estado: redactado, a falta de los datos que solo conoce el autor

El texto del documento está **cerrado y definitivo**. Lo único que queda por
completar son los datos que no podían saberse al redactarlo, resaltados en
amarillo entre corchetes tanto en el HTML como en el PDF:

- **Destinatario y fechas:** `[Nombre del alcalde/sa]`, `[fecha]`, `[fechas]`,
  `[curso escolar]`, `[nº]` (centros y grupos).
- **Presupuesto:** `[importe]` en cada concepto y en base imponible, IGIC y total.
  El tipo de IGIC ya está fijado en el 7 %.
- **Contacto:** `[teléfono]`, `[correo electrónico]`, `[dirección postal]`, `[NIF]`,
  `[adjuntar]`.
- **Coautor:** `[nombre completo y cargo de Víctor]`, `[nombre completo de Víctor]`,
  `[cargo]`, `[unidad, destino y funciones]`, `[años de servicio…]`,
  `[confirmar si participa presencialmente…]`.
- **Biografía de Alexis:** `[formación y experiencia profesional relevante]`,
  `[experiencia en protectoras, voluntariado, colaboraciones]`,
  `[charlas, talleres o programas impartidos previamente]`,
  `[motivación personal en dos o tres líneas]`, `[alta como autónomo, seguro…]`.
- **Opcional:** `[cifra municipal, si se dispone]` — gasto anual del municipio en
  recogida y acogida, para reforzar el argumento económico.

Para localizarlos todos:

```bash
grep -o '\[[^]]*\]' propuesta/propuesta.html | sort -u
```

## Contenido del documento

| Página | Sección |
|---|---|
| 1 | Portada |
| 2 | 01 · Carta de presentación |
| 3 | 02 · La actividad en una página |
| 4-5 | 03 · Las siete unidades (7 fichas) |
| 6 | 04 · Beneficios para el municipio y los centros |
| 7 | 05 · Metodología y recursos |
| 8 | 06 · Calendario propuesto |
| 9 | 07 · Presupuesto |
| 10 | 08 · Sobre los autores |
| 11 | 09 · Contacto y firma |

Cada sección arranca en página nueva. Las fichas de unidad y las tablas no se
parten entre páginas. Las duraciones de las unidades (45/45/40/45/50/45/30 min)
suman las cinco horas de la jornada y van marcadas como orientativas.

## Editar

`propuesta.html` es HTML normal: se abre en cualquier navegador y se ve ya
paginado (una hoja blanca por sección, con sombra, sobre fondo gris). Para
revisar exactamente cómo va a imprimirse, `Ctrl+P` en el navegador.

Las duraciones de las unidades son una distribución estimada del total de cinco
horas: convendrá ajustarlas a la realidad de las sesiones antes de enviar la
propuesta.

## Generar el PDF

```bash
node propuesta/build-pdf.mjs
```

Escribe `propuesta/Propuesta-Ayuntamiento.pdf` en A4, con `printBackground`
activado (la portada lleva fondo de color; el resto del documento imprime sobre
blanco para no gastar tinta).

El script busca Chromium por este orden: la variable `CHROMIUM_PATH`, los
navegadores descargados por Playwright (`PLAYWRIGHT_BROWSERS_PATH`,
`/opt/pw-browsers`, `~/.cache/ms-playwright`) y, por último, el Chromium o
Chrome del sistema.

### Las dos formas de ejecutarlo

**1. Con `playwright-core` (recomendada).** Es la que añade el encabezado
—«Propuesta al Excmo. Ayuntamiento…»— y el pie con **«Página N de M»**.

`node_modules` no se guarda en el repositorio, así que hay dos opciones:

```bash
# a) instalación puntual fuera del repositorio
mkdir -p /tmp/pdf-tools && cd /tmp/pdf-tools && npm i playwright-core
cd /ruta/al/repo
NODE_PATH=/tmp/pdf-tools/node_modules node propuesta/build-pdf.mjs

# b) instalación global
npm i -g playwright-core
node propuesta/build-pdf.mjs
```

El script resuelve `playwright-core` también a través de `NODE_PATH`, que los
módulos ESM no consultan por sí solos.

**2. Sin Playwright (camino de reserva).** Si no encuentra el módulo, lanza el
binario de Chromium directamente con `--headless --print-to-pdf`:

```bash
node propuesta/build-pdf.mjs
# o indicando el navegador a mano:
CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node propuesta/build-pdf.mjs
```

El resultado es el mismo documento con la misma paginación, **pero sin el
encabezado ni el pie con el número de página**: Chromium no admite plantillas
de encabezado desde la línea de órdenes. Para la versión que se envíe al
Ayuntamiento conviene usar la forma 1.

## Revisar el PDF generado

Si hay `poppler-utils`:

```bash
pdftoppm -png -r 110 propuesta/Propuesta-Ayuntamiento.pdf /tmp/propuesta-pagina
```

Si no, con Python y PyMuPDF:

```bash
python3 -c "
import pymupdf
d = pymupdf.open('propuesta/Propuesta-Ayuntamiento.pdf')
for i in range(d.page_count):
    d[i].get_pixmap(dpi=110).save(f'/tmp/propuesta-pagina-{i+1:02d}.png')
print(d.page_count, 'páginas')
"
```
