# Presentación interactiva por unidades — base

Aplicación web estática (HTML + CSS + JS, sin build ni dependencias) para
proyectar un programa educativo en el aula. Un único enlace para el
profesorado, con un menú desde el que se abre cada unidad de forma
independiente. Funciona en proyector, pizarra digital, tablet y móvil.

Esta es la **base genérica**: trae el motor completo y una unidad de ejemplo
de 8 diapositivas. Para un programa nuevo solo se edita `data/unidades.js`.

```
presentacion/
├── index.html          estructura (menú, visor, modal de atajos)
├── styles.css          estilos; la paleta se sobrescribe desde config
├── app.js              motor: navegación, 11 tipos de diapositiva, progreso
├── data/unidades.js    ← TODO EL CONTENIDO VIVE AQUÍ (título, colores, unidades)
├── img/                iconos PNG 300×300 de fondo transparente
└── README.md           este archivo
```

## Puesta en marcha para un programa nuevo

1. En `data/unidades.js`, rellena `config`: todo lo que va entre `[corchetes]`
   (título, subtítulo, autor, municipio, distintivo, descripción) y la paleta
   del material original.
2. Sustituye la unidad de ejemplo por las unidades reales (`u1`, `u2`, …).
3. Copia a `img/` los iconos que vayas a usar.
4. Comprueba el resultado:
   ```bash
   node <skill>/scripts/validar_unidades.mjs data/unidades.js
   NODE_PATH=<carpeta>/node_modules node <skill>/scripts/recorrer.mjs index.html --capturas /tmp/capturas
   ```

`index.html` y `app.js` no llevan nada propio de ningún programa: el título
de la pestaña, la descripción, el color de la barra del navegador en móvil y
el icono salen de `config`. El progreso guardado en `localStorage` usa una
clave derivada del título, así que dos presentaciones servidas desde el mismo
dominio no se pisan.

## Cómo se usa

- **En local:** doble clic en `index.html`. Funciona con `file://`.
- **En GitHub Pages o cualquier servidor estático:** todas las rutas son
  relativas; basta con publicar la carpeta.
- **Enlace directo a una unidad:** `index.html#u1`. A una diapositiva
  concreta: `index.html#u1-5` (unidad 1, diapositiva 5).

> **Por qué `data/unidades.js` y no `unidades.json`:** al abrir la página con
> `file://`, el navegador bloquea `fetch()` de archivos locales. Cargando el
> contenido con `<script src="data/unidades.js">`, que solo asigna
> `window.UNIDADES = { … }`, funciona igual en local y en el servidor. Se edita
> como un JSON, pero admite comentarios `/* … */` y comas finales.

## Atajos de teclado

| Tecla | Acción |
|---|---|
| `→` `↓` `PageDown` `Espacio` `Intro` | Avanzar |
| `←` `↑` `PageUp` `Retroceso` | Retroceder |
| `Inicio` / `Fin` | Primera / última diapositiva |
| `F` | Pantalla completa |
| `Esc` | Volver al menú de unidades |
| `?` o `H` | Mostrar u ocultar la ayuda |
| `1` … `9` | En el menú: abrir esa unidad |

También funcionan el clic en los bordes izquierdo y derecho, los botones de
la barra inferior y el deslizamiento lateral en táctil.

En `pregunta` y `verdadero_falso` **no se puede avanzar con el ratón hasta
responder**; con las teclas de avance sí (para que el profesor no se quede
bloqueado). La última diapositiva vista de cada unidad se guarda y el menú
ofrece «Retomar en la N»; «Borrar progreso guardado» lo limpia. Si el
navegador bloquea el almacenamiento, todo sigue funcionando sin recordar nada.

---

# Esquema de `data/unidades.js` (resumen)

El esquema completo, con un ejemplo real de cada tipo, está en
`references/esquema-unidades.md` de la skill `presentacion-educativa`.

```js
window.UNIDADES = {
  config:  { … },      // título, autor, paleta
  unidades: [ … ]      // en el orden del menú
};
```

## `config`

| Campo | Descripción |
|---|---|
| `titulo` | **Obligatorio.** Menú y `<title>` de la pestaña. |
| `subtitulo`, `autor`, `municipio`, `distintivo` | Cabecera del menú (todos opcionales). |
| `descripcion` | `<meta name="description">`; si falta, se usa `subtitulo`. |
| `favicon` | Icono de la pestaña. Por defecto `img/huella.png`. |
| `epigrafe` | Texto sobre la lista de unidades. Por defecto «Elige una unidad». |
| `claveAlmacen` | Prefijo de `localStorage`. Por defecto, derivado del título. |
| `colorPrimario` `colorPrimarioOscuro` `colorAcento` `colorTexto` `colorTextoSuave` `colorFondo` `colorRojo` `colorRojoFondo` `colorRojoTexto` `colorVerde` `colorVerdeFondo` | Paleta. Por defecto, morado `#6C4CF1` y amarillo `#FFC93C`. |

## Unidad

```js
{ id: "u1",                 // obligatorio y único
  numero: 1,
  titulo: "…",              // obligatorio
  iconoImg: "img/huella.png",
  duracion: "45 min",
  pendiente: false,         // true ⇒ «Próximamente» en el menú
  diapositivas: [ … ] }
```

## Diapositivas

Campos comunes: `tipo` (obligatorio), `rotulo` (línea pequeña sobre el
título), `titulo`, `nota` (texto al pie para el profesor). Todos los textos
admiten HTML (`<strong>`, `<em>`, `<br>`).

| `tipo` | Campos propios |
|---|---|
| `portada` | `subtitulo`, `imagen` |
| `texto` | `destacado`, `parrafos[]`, `imagen`, `imagenAlt` |
| `lista` | `items[]` (`{iconoImg|icono, titulo, texto}` o cadena), `instruccion` |
| `imagen` | `imagen`, `imagenAlt`, `pie` |
| `pregunta` | `enunciado`, `opciones[]` (`{texto, correcta}`; una sola correcta), `veredicto`, `explicacion` |
| `verdadero_falso` | `afirmacion`, `respuesta` (booleano), `explicacion` |
| `tarjetas` | `tarjetas[]` (`{frenteRotulo, frenteImg, frente, dorsoRotulo, dorsoImg, dorso}`), `instruccion` |
| `encuesta` | `afirmacion`, `opciones[]` (2 a 4) |
| `sabias_que` | `dato`, `titulo` (bajo la cifra), `texto`, `fuente`, `iconoImg` |
| `reto` | `descripcion`, `minutos` (temporizador), `pasos[]`, `premio` |
| `cierre` | `subtitulo`, `ideas[]`, `siguiente`, `siguienteEtiqueta` |

La unidad de ejemplo de `data/unidades.js` usa ocho de estos tipos y sirve de
plantilla para copiar y pegar.

## Iconos incluidos en `img/`

`huella` · `alerta` · `mito` (✕ rojo) · `realidad` (✓ verde) · `casa` ·
`tienda` · `prohibido` · `ubicacion` · `megafono` · `mazo` · `institucion` ·
`perro` · `personas` · `cartera` · `destello` · `diana`

Para añadir más, copia el PNG en `img/` y referéncialo como `img/nombre.png`.
Conviene mantener el trazo y los colores de la paleta.

## Notas de diseño

- Tipografía **Outfit** desde Google Fonts, con reserva a las fuentes del
  sistema. Sin internet se ve igual de bien (la reserva es algo más ancha).
- El cuerpo de texto mide ~34 px a 1920×1080 y escala con `clamp()` hasta
  ~19 px en móvil.
- Probado a 1920×1080 (proyector) y 390×844 (móvil vertical) sin scroll
  horizontal ni desbordes.
- Respeta `prefers-reduced-motion`. Botones reales, `aria-label` en todos los
  controles, foco visible y barra de progreso con `role="progressbar"`.
