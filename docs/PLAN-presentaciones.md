# Plan: propuesta al Ayuntamiento + presentación interactiva de las unidades

Estado: **pendiente de recibir las unidades/presentaciones originales** (no están en el
repo, en Drive, en Gmail ni en Gamma). En cuanto lleguen se ejecuta la fase 2.

## Entregables

1. **Propuesta en PDF para el Ayuntamiento** (`propuesta/Propuesta-Ayuntamiento.pdf`)
   - Carta/prólogo dirigido al Sr./Sra. Alcalde/sa: qué es la actividad, a quién va
     dirigida (alumnado de colegios e institutos), por qué le interesa al municipio.
   - Resumen de cada unidad (título, objetivo, qué se hace en el aula, duración).
   - Beneficios para el municipio, metodología, calendario propuesto, necesidades
     logísticas y **presupuesto** (importe a confirmar por el autor).
   - Se genera desde `propuesta/propuesta.html` con `node propuesta/build-pdf.mjs`
     (Chromium ya instalado en el entorno), maquetado A4 con estilo institucional.

2. **Presentación interactiva para el alumnado** (`presentacion/`)
   - Decisión: **una sola aplicación web con menú de unidades** (una "unidad" = un
     capítulo con sus propias diapositivas). Así hay un único enlace para el profesor
     y cada unidad se puede proyectar de forma independiente.
   - Estática, sin build (HTML + CSS + JS + `data/unidades.json`). Funciona en
     proyector, pizarra digital, tablet y móvil. Navegación con teclado, ratón y
     gestos táctiles. Pantalla completa. Barra de progreso.
   - Tipos de diapositiva: portada, contenido con imagen, lista progresiva,
     pregunta tipo test con feedback, verdadero/falso, tarjetas que se voltean,
     encuesta a mano alzada (contador), "¿sabías que…?", reto/actividad, cierre.
   - Todo el contenido vive en el JSON: cambiar o añadir unidades no toca código.
   - Publicable en GitHub Pages (el repo ya sirve estático) y como artefacto.

## Fases

- **Fase 1 (sin contenido, hecha con Opus 5):** motor de la presentación con dos
  unidades DEMO marcadas como tal, plantilla de la propuesta y script de PDF.
- **Fase 2 (cuando lleguen las unidades, Opus 5):** extraer el contenido de cada
  presentación original, redactar el prólogo y los resúmenes, rellenar el JSON con
  cada unidad, generar el PDF final.
- **Fase 3 (revisión):** comprobar fidelidad al contenido original, ortografía,
  funcionamiento en móvil y proyector, PDF correcto; publicar y enlazar.

## Cómo hacer llegar las unidades

Cualquiera de estas opciones vale: adjuntarlas en el chat, subirlas a una carpeta de
Google Drive llamada `Unidades alumnado`, o commitearlas en `unidades/` del repo.
