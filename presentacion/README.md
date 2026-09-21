# Presentación interactiva — «Nadie nace sabiendo cuidar»

Aplicación web estática (HTML + CSS + JS, sin build ni dependencias) para
proyectar el programa en el aula. Un único enlace para el profesorado, con un
menú desde el que se abre cada unidad de forma independiente.

```
presentacion/
├── index.html          estructura (menú, visor, modal de atajos)
├── styles.css          estilos y paleta
├── app.js              motor: navegación, tipos de diapositiva, progreso
├── data/unidades.js    ← TODO EL CONTENIDO VIVE AQUÍ
├── img/                iconos PNG 300×300 (los de las presentaciones originales)
└── README.md           este archivo
```

## Cómo se usa

- **En local:** doble clic en `index.html`. Funciona con `file://`.
- **En GitHub Pages:** todas las rutas son relativas, así que basta con que el
  repositorio esté publicado. La dirección será
  `https://<usuario>.github.io/<repositorio>/presentacion/`.
- **Enlace directo a una unidad:** `index.html#u1`.
  A una diapositiva concreta: `index.html#u1-11` (unidad 1, diapositiva 11).

> **Por qué `data/unidades.js` y no `unidades.json`:** al abrir la página con
> `file://`, el navegador bloquea `fetch()` de archivos locales por seguridad
> (CORS de origen `null`). Cargando el contenido con
> `<script src="data/unidades.js">`, que solo asigna `window.UNIDADES = { … }`,
> funciona igual en local y en el servidor. El archivo es JSON dentro de una
> asignación: se edita exactamente igual que un JSON (pero admite comentarios
> `/* … */` y comas finales, porque lo interpreta el motor de JavaScript).

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

También funcionan: clic en los bordes izquierdo y derecho de la pantalla, los
botones de la barra inferior y el deslizamiento lateral (swipe) en táctil.

En las diapositivas de tipo `pregunta` y `verdadero_falso` **no se puede
avanzar con el ratón hasta responder**; con las teclas de avance sí se puede
saltar (para que el profesor no se quede bloqueado).

La última diapositiva vista de cada unidad se guarda en `localStorage` y el
menú ofrece «Retomar en la N». El botón «Borrar progreso guardado» lo limpia.
Si el navegador bloquea el almacenamiento (modo privado, kiosco), todo sigue
funcionando: simplemente no se recuerda nada.

---

# Esquema de `data/unidades.js`

```js
window.UNIDADES = {
  config:  { … },      // ajustes globales
  unidades: [ … ]      // lista de unidades, en el orden del menú
};
```

## `config`

| Campo | Obligatorio | Descripción |
|---|---|---|
| `titulo` | sí | Título del programa. Se usa también como `<title>` de la pestaña. |
| `subtitulo` | no | Línea bajo el título del menú. |
| `autor` | no | Aparece bajo el subtítulo. |
| `municipio` | no | Se muestra junto al autor, separado por `·`. |
| `distintivo` | no | Etiqueta en píldora sobre el título. Si se omite, no se muestra. |
| `colorPrimario` | no | Morado principal. Por defecto `#6C4CF1`. |
| `colorPrimarioOscuro` | no | `#4B2FD4`. |
| `colorAcento` | no | Amarillo. `#FFC93C`. |
| `colorTexto` / `colorTextoSuave` | no | `#211A3D` / `#655D8A`. |
| `colorFondo` | no | `#F1ECFF`. |
| `colorRojo` / `colorRojoFondo` / `colorRojoTexto` | no | Respuestas incorrectas y «mito». |
| `colorVerde` / `colorVerdeFondo` | no | Respuestas correctas y «realidad». |

## Unidad

```js
{
  id: "u2",                       // OBLIGATORIO y único: se usa en el enlace #u2 y en localStorage
  numero: 2,                      // número que se muestra en la tarjeta del menú
  titulo: "…",                    // OBLIGATORIO
  subtitulo: "…",                 // opcional, no se muestra en el menú (informativo)
  icono: "🐶",                    // emoji de reserva si no hay iconoImg
  iconoImg: "img/perro.png",      // icono de la tarjeta del menú (preferido)
  duracion: "45 min",
  pendiente: false,               // true ⇒ la tarjeta sale como «Próximamente» y no se puede abrir
  diapositivas: [ … ]             // array de diapositivas (ver más abajo)
}
```

Una unidad con `pendiente: true` **o** con `diapositivas: []` aparece
deshabilitada en el menú. Para activarla: rellenar `diapositivas` y quitar
`pendiente` (o ponerlo a `false`).

## Diapositivas

Cada diapositiva es un objeto con un campo `tipo`. Campos comunes a casi todos
los tipos:

| Campo | Descripción |
|---|---|
| `rotulo` | Línea pequeña en mayúsculas y morado sobre el título (el «kicker» de las originales). |
| `titulo` | Titular grande. |
| `nota` | Texto pequeño al pie, con filete amarillo. Ideal para las indicaciones al profesor («👉 …»). |

**Todos los campos de texto admiten HTML** (`<strong>`, `<em>`, `<br>`, …),
porque el contenido lo escribes tú. Usa `<br>` para forzar un salto de línea en
un titular.

### `portada`

```js
{ tipo:"portada",
  rotulo:"UNIDAD 1 · NADIE NACE SABIENDO CUIDAR",
  titulo:"La realidad del abandono<br>y los mitos que lo rodean",
  subtitulo:"opcional",
  imagen:"img/huella.png",       // opcional, se muestra grande y centrada
  nota:"Frase de arranque del profesor." }
```

### `texto` — título + párrafos + imagen opcional

```js
{ tipo:"texto",
  rotulo:"ZOOM LOCAL · …",            // opcional
  titulo:"…",
  destacado:"Frase clave en caja morada.",   // opcional
  parrafos:[ "Párrafo 1 con <strong>HTML</strong>.", "Párrafo 2." ],
  imagen:"img/ubicacion.png",         // opcional → pasa a dos columnas
  imagenAlt:"",                       // texto alternativo (vacío si es decorativa)
  nota:"…" }
```

### `lista` — viñetas que aparecen una a una

Cada pulsación de avance muestra un punto más; cuando están todos, la siguiente
pulsación pasa de diapositiva. Al retroceder desde la siguiente diapositiva
vuelve con todos los puntos visibles.

```js
{ tipo:"lista",
  rotulo:"«ADIÓS AL CAPRICHO»",
  titulo:"Las nuevas reglas de adquisición",
  instruccion:"Pulsa para mostrar el siguiente punto.",   // opcional
  items:[
    { iconoImg:"img/tienda.png",      // o `icono:"🏪"`, o ninguno
      titulo:"Tiendas físicas",
      texto:"<strong>PROHIBIDA</strong> la venta de perros, gatos y hurones." },
    "También vale una cadena de texto suelta como item."
  ],
  nota:"…" }
```

### `imagen` — imagen grande + pie

```js
{ tipo:"imagen",
  rotulo:"PARA REFLEXIONAR",
  titulo:"El abandono no es un accidente",
  imagen:"img/megafono.png",
  imagenAlt:"",
  pie:"«Cita destacada que acompaña a la imagen.»",
  nota:"…" }
```

### `pregunta` — test de opción múltiple

Al pulsar una opción se marca en verde la correcta, en rojo la elegida si falla,
y se despliega la explicación. La respuesta se recuerda mientras dure la sesión.

```js
{ tipo:"pregunta",
  rotulo:"CASO REAL · ¿LEGAL O ILEGAL?",
  titulo:"¿Legal o ilegal?",
  enunciado:"Texto del caso, en caja blanca destacada.",
  opciones:[
    { texto:"LEGAL" },
    { texto:"ILEGAL", correcta:true },          // exactamente una con correcta:true
    "Una opción también puede ser una cadena suelta"
  ],
  veredicto:"VEREDICTO: ILEGAL",   // opcional: titular del recuadro de respuesta.
                                    // Si se omite: «¡Correcto!» / «No exactamente».
  explicacion:"Por qué es así.",
  nota:"…" }
```

### `verdadero_falso`

```js
{ tipo:"verdadero_falso",
  rotulo:"RONDA RELÁMPAGO",
  titulo:"Verdadero o falso, ¡mano alzada ya!",
  afirmacion:"«Frase que hay que juzgar.»",
  respuesta:false,                  // true = VERDADERO, false = FALSO
  explicacion:"Justificación que se revela al responder.",
  nota:"👉 Indicación al profesor." }
```

### `tarjetas` — se voltean al tocarlas

Una o varias. Con una sola, ocupa el ancho central; con varias, se reparten en
rejilla. El frente se pinta en rojo/«mito» y el dorso en verde/«realidad».

```js
{ tipo:"tarjetas",
  rotulo:"MITO VS. REALIDAD",
  titulo:"El abandono no tiene temporada",
  instruccion:"Toca la tarjeta para darle la vuelta.",
  tarjetas:[
    { frenteRotulo:"MITO",     frenteImg:"img/mito.png",     frente:"«Solo se abandona en julio…»",
      dorsoRotulo:"REALIDAD",  dorsoImg:"img/realidad.png",  dorso:"Es un goteo constante los 365 días." }
  ],
  nota:"…" }
```

### `encuesta` — a mano alzada, con contadores

De 2 a 4 opciones. Cada una tiene un contador con botones `−` y `+` que pulsa
el profesor, y una barra proporcional al máximo. No se guarda: al salir de la
unidad se reinicia.

```js
{ tipo:"encuesta",
  rotulo:"TERMÓMETRO DE OPINIÓN",
  titulo:"¿De acuerdo o en desacuerdo?",
  afirmacion:"«Frase sobre la que se posiciona la clase.»",
  opciones:["De acuerdo","En desacuerdo"],    // o [{texto:"…"}, …]
  nota:"👉 Indicación al profesor." }
```

### `sabias_que` — dato curioso destacado

```js
{ tipo:"sabias_que",
  rotulo:"EL DATO QUE CAMBIA EL DEBATE",
  dato:"+285.000",                 // la cifra gigante
  titulo:"…",                      // opcional, bajo la cifra
  texto:"perros y gatos ingresan en centros de acogida cada año en España.",
  fuente:"Informe Abandono y Adopción, Fundación Affinity",   // se antepone «Fuente: »
  iconoImg:"img/alerta.png",
  nota:"…" }
```

### `reto` — actividad práctica con temporizador

```js
{ tipo:"reto",
  rotulo:"ACTIVIDAD EN EQUIPO · 8 MIN",
  titulo:"Caza-mitos",
  descripcion:"Enunciado de la actividad.",
  minutos:8,                        // opcional: si está, aparece el temporizador
  pasos:["Paso 1.","Paso 2.","Paso 3."],
  premio:"🏆 Recompensa o condición de victoria.",
  nota:"…" }
```

El temporizador tiene «Iniciar / Parar» y «Reiniciar». Se detiene solo al
cambiar de diapositiva o volver al menú.

### `cierre` — resumen y siguiente unidad

```js
{ tipo:"cierre",
  rotulo:"FIN DE LA UNIDAD",
  titulo:"Ya conoces los mitos.",
  subtitulo:"Ahora toca entender qué es cuidar de verdad.",
  ideas:["Idea clave 1.","Idea clave 2."],
  siguiente:"En la próxima unidad: …",
  siguienteEtiqueta:"SIGUIENTE: UNIDAD 2 →" }
```

Al avanzar desde la última diapositiva se vuelve automáticamente al menú.

---

## Iconos disponibles en `img/`

Son los propios iconos de las presentaciones originales (PNG 300×300, fondo
transparente):

`huella` · `alerta` · `mito` (✕ rojo) · `realidad` (✓ verde) · `casa` ·
`tienda` · `prohibido` · `ubicacion` · `megafono` · `mazo` · `institucion` ·
`perro` · `personas` · `cartera` · `destello` · `diana`

Para añadir más, basta con copiar el PNG en `img/` y referenciarlo como
`img/nombre.png`. Conviene mantener el trazo y los colores de la paleta.

## Notas de diseño

- Tipografía **Outfit** desde Google Fonts, con reserva a las fuentes del
  sistema. Si no hay internet, la presentación se ve igual de bien.
- El cuerpo de texto mide ~34 px a 1920×1080 (mínimo exigido: 28 px) y escala
  con `clamp()` hasta ~19 px en móvil.
- Probado a 1920×1080 (proyector) y 390×844 (móvil vertical): sin scroll
  horizontal y sin desbordes.
- Se respeta `prefers-reduced-motion`: con esa preferencia activada
  desaparecen las transiciones y el volteo de tarjetas es instantáneo.
- Accesibilidad: botones reales, `aria-label` en todos los controles, foco
  visible con contorno amarillo y barra de progreso con `role="progressbar"`.

## Publicar

El repositorio ya sirve contenido estático y tiene `.nojekyll`. No hay nada que
compilar: al hacer push, `presentacion/` queda publicado tal cual.
