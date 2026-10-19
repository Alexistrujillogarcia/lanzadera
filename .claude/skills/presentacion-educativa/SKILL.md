---
name: presentacion-educativa
description: Convierte material de un programa educativo o de sensibilización (pptx, PDF, docx, imágenes o notas) en (1) una presentación web interactiva por unidades para proyectar en aulas de colegios e institutos y (2) una propuesta institucional en PDF para que un ayuntamiento, cabildo u organismo apruebe y financie la actividad. Úsala siempre que el usuario pida una presentación "interactiva", "amena", "moderna" o "para alumnos" a partir de unidades o temas, una propuesta/dosier/prólogo para "vender" una actividad a una administración, o cuando mencione a Víctor, Seprona, unidades didácticas, charlas en centros educativos o material nuevo "como el de Nadie nace sabiendo cuidar", aunque no diga la palabra "presentación". Incluye el motor ya hecho, el validador y el recorrido automático con Chromium, así que nunca hay que reimplementar nada.
---

# Presentación educativa interactiva + propuesta institucional

Esta skill reutiliza lo que se construyó para el programa «Nadie nace sabiendo
cuidar» (7 unidades, 105 diapositivas, propuesta de 11 páginas al Ayuntamiento
de La Laguna). El motor de presentación y la plantilla de propuesta ya existen y
están probados: el trabajo en cada nuevo encargo es **solo de contenido**.
No reescribas el motor, no inventes otro formato de datos y no cambies la
plantilla salvo que el usuario lo pida.

Todo el texto visible se escribe en español de España, salvo que el usuario
pida otro idioma.

## Qué se entrega

1. **Presentación interactiva** (`presentacion/`): aplicación web estática sin
   build. Un menú de unidades y, dentro de cada una, diapositivas a pantalla
   completa con 11 tipos (portada, texto, lista progresiva, imagen, pregunta
   tipo test, verdadero/falso, tarjetas que se voltean, encuesta a mano alzada,
   «¿sabías que…?», reto con temporizador y cierre). Funciona en proyector,
   tablet y móvil, con `file://` y en GitHub Pages.
2. **Propuesta institucional en PDF** (`propuesta/`): documento A4 con carta al
   responsable político, la actividad en una página, ficha por unidad,
   beneficios para la institución, metodología, calendario, presupuesto con
   marcadores, autores, contacto y firma. Solo si el usuario la pide o si el
   material va dirigido a una administración.
3. Entrega: zip de la presentación y PDF enviados al usuario, artefactos
   publicados con enlace (para abrir desde el móvil), y commit en el repo si se
   trabaja en uno.

## Flujo de trabajo

### 1. Reunir y entender el material

- Copia el material original a `unidades/` del proyecto (o la carpeta que
  indique el usuario) y extrae el texto con
  `python3 -I scripts/extraer_contenido.py <archivos...> --salida unidades/texto`.
  Admite pptx, pdf, docx e imágenes (de las imágenes solo extrae el archivo;
  descríbelas tú leyéndolas). Genera un `.md` por archivo con una sección por
  diapositiva o página y saca las imágenes, sin duplicados, a
  `unidades/texto/img-originales/` (siempre `<salida>/img-originales/`).
- Lee todos los `.md` enteros antes de decidir nada. Fíjate en: nombre del
  programa, público, duración total y por unidad, ámbito geográfico (municipio,
  isla), normativa citada, dinámicas de aula (actividades con minutos),
  evaluación y certificado, y la paleta de colores del original (el script la
  imprime: colores más usados y fuentes).
- Escribe `docs/BRIEF-contenido.md` con lo anterior en una página: datos fijos
  del programa, resumen de cada unidad en 3-4 líneas, argumentos de venta y
  **lo que falta por confirmar** (precios, nombres, fechas). Este brief es lo que
  leen los agentes de contenido; ahorra releer el material.
- Si el usuario ha dado información oral o por mensaje (por ejemplo «son 5 horas
  presenciales el mismo día»), métela en el brief: suele ser lo que no está en
  las diapositivas.

### 2. Crear el proyecto a partir de la base

`bash scripts/nuevo_proyecto.sh <carpeta-destino>` copia `assets/presentacion`
y `assets/propuesta` al destino sin pisar nada que ya exista. Después:

- Pon el título real en el `<title>` de `presentacion/index.html` (el motor lo
  sobrescribe al cargar, pero el artefacto publicado y los marcadores del
  navegador usan el estático).
- En `presentacion/data/unidades.js` rellena `config` (título, subtítulo, autor,
  ámbito, `colorPrimario`, `colorAcento` y resto de paleta del original) y la
  lista de unidades. El esquema completo de los 11 tipos, con todos los campos
  y un ejemplo de cada uno, está en `references/esquema-unidades.md`. Léelo
  entero la primera vez; es la única fuente de verdad del formato.
- Copia los iconos del original (o los de `assets/presentacion/img/`, que son
  genéricos: huella, alerta, mazo, institución, personas, cartera…) a
  `presentacion/img/`. No generes imágenes nuevas salvo que el usuario lo pida.

### 3. Mapear el contenido a los tipos de diapositiva

Lee `references/mapeo-contenido.md` antes de rellenar. Resume la experiencia de
convertir 105 diapositivas: qué patrón del original va a qué tipo (termómetro
de opinión → `encuesta`; dato grande → `sabias_que`; mito/realidad o
caso/respuesta → `tarjetas`; «¿legal o ilegal?» → `pregunta`; actividad con
pasos y minutos → `reto`; «ponte a prueba» → `lista` progresiva; fin de unidad →
`cierre`), cómo repartir una frase larga entre `dato`, `titulo` y `texto`, y
qué textos hay que redactar nuevos (ideas clave del cierre, dorsos de tarjetas
cuyo original solo plantea la pregunta) y cómo anotarlos.

Principios que importan más que las reglas:

- **Fidelidad.** El material es del usuario y de sus coautores (a menudo con
  responsabilidad legal, como un agente del Seprona). Mantén datos, cifras,
  leyes y frases tal cual. Si redactas algo nuevo, que resuma lo que la unidad
  ya dice, y lista cada texto nuevo en el informe final para que el autor lo
  valide.
- **Una diapositiva original, una diapositiva interactiva** salvo buena razón
  (fusionar actividad y sus casos, dividir una que no cabe). Anota cada
  desviación.
- **Interactividad con sentido.** Un test solo donde el original pregunta; una
  encuesta solo donde el original pide posicionarse; un temporizador solo donde
  hay minutos. No conviertas texto expositivo en preguntas inventadas.
- **Texto legible desde el fondo del aula.** Las ideas de cierre caben en una
  línea (unos 60-70 caracteres); los párrafos de `texto` no pasan de dos o tres
  frases. Si no cabe, divide la diapositiva.

### 4. Repartir el trabajo

Si hay más de dos unidades, delega el relleno en agentes en paralelo (modelo
más barato que el tuyo si el usuario quiere ahorrar), uno por bloque de 2-3
unidades y otro para la propuesta, cada uno tocando solo sus ficheros: el
`unidades.js` se puede repartir haciendo que cada agente escriba su bloque en
un fichero aparte (`u2u3.js`…) y luego se concatena, o que edite solo sus
unidades. Dales el brief, el esquema, la carpeta `unidades/texto/` y las reglas
de la sección 3. Pídeles siempre un informe con: mapeo por diapositiva, textos
nuevos, desviaciones y resultado de las verificaciones con números. Revisa
después capturas y textos tú mismo: los agentes son buenos, pero el usuario te
ha pedido a ti que lo compruebes.

### 5. Verificar (obligatorio antes de entregar)

```bash
node scripts/validar_unidades.mjs presentacion/data/unidades.js
node scripts/recorrer.mjs presentacion/index.html --capturas <carpeta>
```

- `validar_unidades.mjs` comprueba el esquema: unidades y diapositivas
  presentes, tipos válidos, `pregunta` con una sola `correcta` y `explicacion`,
  `encuesta` con 2-4 opciones, rutas de imagen existentes, sin `pendiente`.
  Además lista los marcadores `[…]` sin rellenar y avisa (sin fallar) de los
  textos más largos de lo que cabe en móvil. Sale con código 1 si hay fallos.
- `recorrer.mjs` abre la presentación con el Chromium de Playwright, recorre
  todas las diapositivas de todas las unidades a 1920×1080 y a 390×844,
  revelando listas, respondiendo preguntas y volteando tarjetas; cuenta errores
  de JavaScript y desbordes (scroll interno) y guarda una captura de la
  diapositiva más densa de cada unidad en ambas resoluciones. Cuenta como
  desborde lo que pase de 4 px (`--tolerancia`); los roces de 1-4 px se listan
  aparte y no fallan. Sale con código 1 si hay errores o desbordes. Necesita
  `playwright-core` (instálalo en el scratchpad, nunca en el repo:
  `npm i playwright-core` y pasa `NODE_PATH`). El único error de consola
  aceptable es el de Google Fonts si el entorno no tiene salida a internet: la
  fuente de reserva del sistema es más ancha, así que si cabe sin ella, cabe
  con ella.
- Mira las capturas con tus propios ojos. Los desbordes se detectan solos; los
  títulos partidos en columnas de dos palabras, las tarjetas enanas o un emoji
  que sale como cuadrado solo los ves mirando.

### 6. Propuesta institucional (si procede)

Lee `references/guia-propuesta.md`: estructura de las 9 secciones, tono
(formal, directo, un dato potente en el primer párrafo, sin grandilocuencia),
qué argumentos convencen a una administración (difunde su propia normativa,
actúa sobre la causa real del problema, ciudadanía que sabe actuar, metodología
evaluable, escalable por centros) y la regla de oro: **ningún importe ni
nombre inventado**. Todo lo que no sepas va entre corchetes resaltados en
amarillo: `[Nombre del alcalde/sa]`, `[importe]`, `[fecha]`. El usuario los
rellena y regenera.

Edita `propuesta/propuesta.html` (plantilla con marcadores y comentarios de
guía), genera con `node propuesta/build-pdf.mjs`, rasteriza todas las páginas
(PyMuPDF) y míralas una a una: portada con aire, ninguna página con menos de
dos tercios de contenido, tablas enteras, fichas de unidad de dos en dos o tres
en tres por página. Objetivo: 10-12 páginas.

### 7. Entregar e informar

- Zip de `presentacion/` y el PDF, enviados como ficheros al usuario.
- Publica la presentación como artefacto (página + `app.js`, `styles.css`,
  `data/unidades.js` e `img/*`) y la propuesta como otro artefacto con el PDF
  como fichero adjunto, para que se abran desde el móvil.
- Commit y push si hay repo.
- En el mensaje final: enlaces, qué verificaste (números: unidades,
  diapositivas, errores, desbordes), **lista de textos nuevos redactados**,
  **decisiones que el autor debe validar** (duraciones estimadas, reparto de
  minutos) y **marcadores pendientes** del PDF.

## Dónde está cada cosa

| Necesito… | Fichero |
|---|---|
| Motor de presentación listo para copiar | `assets/presentacion/` |
| Plantilla de propuesta y generador de PDF | `assets/propuesta/` |
| Esquema de los 11 tipos de diapositiva | `references/esquema-unidades.md` |
| Cómo convertir material original a tipos | `references/mapeo-contenido.md` |
| Cómo redactar la propuesta | `references/guia-propuesta.md` |
| Ejemplo completo real (7 unidades) | `references/ejemplo-nadie-nace-sabiendo-cuidar.js` |
| Extraer texto e imágenes de pptx/pdf/docx | `scripts/extraer_contenido.py` |
| Validar el esquema | `scripts/validar_unidades.mjs` |
| Recorrido automático y capturas | `scripts/recorrer.mjs` |
| Crear un proyecto nuevo desde la base | `scripts/nuevo_proyecto.sh` |

## Requisitos del entorno

Node 18+, Python 3 con `python-pptx`, `pymupdf` y `python-docx` (el script de
extracción avisa si falta alguno y cómo instalarlo), Chromium de Playwright
(`/opt/pw-browsers` en Claude Code web, o `npx playwright install chromium`).
Esta skill está pensada para Claude Code (necesita ejecutar Node y Chromium);
en el chat sin entorno de ejecución solo sirve la parte de redacción.
