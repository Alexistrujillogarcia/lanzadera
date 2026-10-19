# Esquema de `data/unidades.js`

Única fuente de verdad del formato de datos de la presentación. Todo lo que
se ve en pantalla sale de este archivo: `index.html` y `app.js` no se tocan
para un programa nuevo.

Los ejemplos están tomados del programa real «Nadie nace sabiendo cuidar»
(ejemplo completo en `ejemplo-nadie-nace-sabiendo-cuidar.js`), salvo donde se
indica.

## Por qué `.js` y no `.json`

Al abrir la página con `file://` (doble clic en `index.html`), el navegador
bloquea `fetch()` de archivos locales. Por eso el contenido se carga con
`<script src="data/unidades.js">`, que solo asigna `window.UNIDADES = { … }`.
Se edita igual que un JSON, pero admite comentarios `/* … */`, comillas sin
escapar en las claves y comas finales.

```js
window.UNIDADES = {
  config:  { … },      // ajustes globales: título, autor, paleta
  unidades: [ … ]      // lista de unidades, en el orden del menú
};
```

## `config`

| Campo | Obligatorio | Descripción |
|---|---|---|
| `titulo` | sí | Título del programa. Va en el menú y en el `<title>` de la pestaña. |
| `subtitulo` | no | Línea bajo el título del menú («7 unidades · 5 horas · tema»). |
| `autor` | no | Aparece bajo el subtítulo. |
| `municipio` | no | Se muestra junto al autor, separado por `·`. |
| `distintivo` | no | Etiqueta en píldora sobre el título. Si se omite, no se muestra. |
| `descripcion` | no | `<meta name="description">`. Si falta, se usa `subtitulo`. |
| `favicon` | no | Icono de la pestaña (`img/…png`). Por defecto `img/huella.png`. |
| `epigrafe` | no | Texto sobre la lista del menú. Por defecto «Elige una unidad». |
| `claveAlmacen` | no | Prefijo de `localStorage` para el progreso. Por defecto, el título en minúsculas y sin tildes. |
| `colorPrimario` | no | Color principal (rótulos, botones, barra). Por defecto `#6C4CF1`. También pinta la barra del navegador en móvil. |
| `colorPrimarioOscuro` | no | Titulares y texto destacado. `#4B2FD4`. |
| `colorAcento` | no | Filete de las notas, foco del teclado, detalles. `#FFC93C`. |
| `colorTexto` / `colorTextoSuave` | no | `#211A3D` / `#655D8A`. |
| `colorFondo` | no | Fondo general. `#F1ECFF`. |
| `colorRojo` / `colorRojoFondo` / `colorRojoTexto` | no | Respuesta incorrecta y frente («mito») de las tarjetas. `#FF5C6C` / `#FFE3E6` / `#7A1620`. |
| `colorVerde` / `colorVerdeFondo` | no | Respuesta correcta y dorso («realidad») de las tarjetas. `#0A4B3A` / `#DDF7EE`. |

Ejemplo real:

```js
config: {
  titulo: "Nadie nace sabiendo cuidar",
  subtitulo: "7 unidades · 5 horas · Tenencia responsable y bienestar animal",
  autor: "Alexis Trujillo",
  municipio: "San Cristóbal de La Laguna (Tenerife)",
  distintivo: "Programa educativo para colegios e institutos",
  colorPrimario: "#6C4CF1", colorPrimarioOscuro: "#4B2FD4", colorAcento: "#FFC93C",
  colorTexto: "#211A3D", colorTextoSuave: "#655D8A", colorFondo: "#F1ECFF",
  colorRojo: "#FF5C6C", colorRojoFondo: "#FFE3E6", colorRojoTexto: "#7A1620",
  colorVerde: "#0A4B3A", colorVerdeFondo: "#DDF7EE"
}
```

Paleta a partir del original: el extractor (`scripts/extraer_contenido.py`)
imprime los colores `srgbClr` más usados del pptx. El más frecuente que no sea
blanco, negro o gris suele ser `colorPrimario`; uno cálido y luminoso,
`colorAcento`; el fondo claro de las diapositivas, `colorFondo`. Comprueba el
contraste del texto sobre `colorFondo` (mínimo 4,5:1).

## Unidad

```js
{
  id: "u2",                       // OBLIGATORIO y único: enlace #u2 y clave de progreso
  numero: 2,                      // número que se muestra en la tarjeta del menú
  titulo: "¿Qué significa proteger de verdad a un animal?",   // OBLIGATORIO
  subtitulo: "Ciencia, ley y ética del bienestar animal",     // opcional, informativo
  icono: "🐶",                    // emoji de reserva si no hay iconoImg
  iconoImg: "img/perro.png",      // icono de la tarjeta del menú (preferido)
  duracion: "45 min",             // se muestra en el menú
  pendiente: false,               // true ⇒ «Próximamente», no se puede abrir
  diapositivas: [ … ]
}
```

Una unidad con `pendiente: true` **o** con `diapositivas: []` aparece
deshabilitada en el menú. El validador da fallo si queda alguna `pendiente`.
El menú muestra «N diapositivas» y, si se dejó a medias, «Retomar en la N».

## Diapositivas: campos comunes

Cada diapositiva es un objeto con un campo `tipo` (uno de los 11 de abajo; un
tipo desconocido se pinta como `texto` y el validador lo marca como fallo).

| Campo | Tipos | Descripción |
|---|---|---|
| `rotulo` | todos | Línea pequeña en mayúsculas y color primario sobre el título (el «kicker» de las originales). |
| `titulo` | todos | Titular grande. En `sabias_que` va debajo de la cifra. |
| `nota` | todos | Texto pequeño al pie, con filete de color acento. Ideal para las indicaciones al profesor («👉 …»). |

**Todos los campos de texto admiten HTML** (`<strong>`, `<em>`, `<br>`).
Usa `<br>` para forzar el corte de un titular largo en la portada. Las
comillas de cita se escriben como comillas latinas «…».

## Los 11 tipos

### 1. `portada`

| Campo | Descripción |
|---|---|
| `rotulo`, `titulo` | «UNIDAD N · PROGRAMA» y el título de la unidad (con `<br>` si es largo). |
| `subtitulo` | Opcional. |
| `imagen` | Opcional: icono grande centrado (84-190 px). |
| `nota` | Frase de arranque, en texto normal (no como nota al pie). |

```js
{ tipo: "portada",
  rotulo: "UNIDAD 1 · NADIE NACE SABIENDO CUIDAR",
  titulo: "La realidad del abandono<br>y los mitos que lo rodean",
  imagen: "img/huella.png",
  nota: "Vamos a desmontar, con datos y con ley, lo que «todo el mundo dice» sobre el abandono animal." }
```

### 2. `texto` — título + párrafos + imagen opcional

| Campo | Descripción |
|---|---|
| `destacado` | Opcional: frase clave en caja de color con filete izquierdo. |
| `parrafos` | Array de párrafos (HTML). Dos o tres frases en total. |
| `imagen` | Opcional: icono a la derecha (la diapositiva pasa a dos columnas). |
| `imagenAlt` | Texto alternativo; vacío si es decorativa. |

```js
{ tipo: "texto",
  rotulo: "ZOOM LOCAL · SAN CRISTÓBAL DE LA LAGUNA",
  titulo: "Tu ayuntamiento lo deja aún más claro",
  parrafos: [
    "<strong>Prohibición explícita por edad.</strong> La ordenanza municipal prohíbe vender o donar animales a menores de 18 años, sin excepción.",
    "<strong>Ninguna tienda puede saltarse la norma.</strong> Aunque un menor tenga el dinero ahorrado, ninguna tienda puede legalmente entregarle un animal."
  ],
  imagen: "img/ubicacion.png" }
```

```js
{ tipo: "texto",
  titulo: "Entonces, ¿cuál es la causa número 1?",
  destacado: "El 15 % de los animales en la calle llegan por camadas no deseadas.",
  parrafos: [ "Más que las vacaciones, más que las mudanzas: la principal causa de abandono es <strong>la falta de esterilización</strong>." ],
  imagen: "img/perro.png" }
```

### 3. `lista` — puntos que aparecen uno a uno

Cada pulsación de avance muestra un punto más; con todos visibles, la
siguiente pasa de diapositiva. Al volver atrás desde la siguiente, aparecen
todos. Máximo recomendable: 5 puntos (4 si llevan texto largo).

| Campo | Descripción |
|---|---|
| `items` | Array. Cada item es un objeto `{ iconoImg | icono, titulo, texto }` (todos opcionales) o una cadena suelta. |
| `instruccion` | Opcional. Pista bajo la lista; por defecto «Pulsa para mostrar el siguiente punto.». Desaparece al mostrarlo todo. |

```js
{ tipo: "lista",
  rotulo: "«ADIÓS AL CAPRICHO»",
  titulo: "Las nuevas reglas de adquisición",
  items: [
    { iconoImg: "img/tienda.png",    titulo: "Tiendas físicas",
      texto: "<strong>PROHIBIDA</strong> la venta de perros, gatos y hurones. Se acabaron las compras impulsivas." },
    { iconoImg: "img/casa.png",      titulo: "Cría casera",
      texto: "<strong>ILEGAL</strong> si vendes o regalas camadas. Solo permitido a criadores inscritos oficialmente." },
    { iconoImg: "img/prohibido.png", titulo: "Menores de edad",
      texto: "Prohibida la venta o donación de animales a menores de 18 años." }
  ] }
```

«Ponte a prueba» (pregunta → respuesta revelada):

```js
{ tipo: "lista",
  rotulo: "PONTE A PRUEBA",
  titulo: "Antes de seguir, comprobamos",
  instruccion: "Pulsa para ir mostrando cada respuesta.",
  items: [
    { titulo: "1. ¿Cuál es la causa número 1 de abandono?",
      texto: "✔ Las camadas no deseadas (15 %), no las vacaciones de verano." },
    { titulo: "2. ¿Quién puede criar y vender animales legalmente?",
      texto: "✔ Solo los criadores inscritos en el Registro Oficial." }
  ] }
```

### 4. `imagen` — icono grande + cita

El motor pinta la imagen a tamaño de icono (100-240 px) salvo con `imagenGrande: true`, no a pantalla
completa: está pensado para la diapositiva «Para reflexionar» con un icono y
una frase. Para una foto grande habría que cambiar el CSS.

| Campo | Descripción |
|---|---|
| `imagen`, `imagenAlt` | Icono y texto alternativo. |
| `pie` | Frase destacada bajo la imagen (grande, en color primario). |
| `imagenGrande` | `true` para diagramas, organigramas o fotos: la imagen ocupa el ancho de la diapositiva hasta el 60 % de la altura, sobre fondo blanco. Sin él, sale a tamaño de icono. |

```js
{ tipo: "imagen",
  rotulo: "PARA REFLEXIONAR",
  titulo: "El abandono no es un accidente",
  imagen: "img/megafono.png",
  pie: "«Cada cifra de abandono empieza con una decisión humana: comprar sin pensar, criar sin control, regalar sin permiso.»",
  nota: "Entender esto es el primer paso para no formar parte del problema." }
```

### 5. `pregunta` — test de opción múltiple

Al pulsar una opción se marca en verde la correcta, en rojo la elegida si
falla, y se despliega la explicación. Con ratón o gesto no se puede avanzar
hasta responder; con las teclas de avance sí (para no bloquear al profesor).
La respuesta se recuerda mientras no se recargue la página.

| Campo | Descripción |
|---|---|
| `enunciado` | Opcional: el caso, en caja blanca destacada. |
| `opciones` | Array de `{ texto, correcta?, explicacion? }` o cadenas. **Exactamente una** con `correcta: true`. Hasta 4 opciones (se rotulan A, B, C, D). |
| `veredicto` | Opcional: titular del recuadro de respuesta. Si falta: «¡Correcto!» / «No exactamente». |
| `explicacion` | Por qué. Obligatoria para el validador (si falta, se usaría la `explicacion` de la opción elegida). |

```js
{ tipo: "pregunta",
  rotulo: "CASO REAL · ¿LEGAL O ILEGAL?",
  titulo: "¿Legal o ilegal?",
  enunciado: "Un vecino publica en Wallapop cachorros de su perra «pura raza»: «primera camada, se venden rápido».",
  opciones: [ { texto: "LEGAL" }, { texto: "ILEGAL", correcta: true } ],
  veredicto: "VEREDICTO: ILEGAL",
  explicacion: "La cría y venta solo está permitida a criadores inscritos en el Registro Oficial. Un particular que vende cachorros comete una infracción, aunque su animal tenga pedigrí." }
```

### 6. `verdadero_falso`

| Campo | Descripción |
|---|---|
| `afirmacion` | La frase que hay que juzgar. |
| `respuesta` | `true` = VERDADERO, `false` = FALSO (booleano, no cadena). |
| `explicacion` | Justificación que se revela al responder. |

```js
{ tipo: "verdadero_falso",
  rotulo: "RONDA RELÁMPAGO",
  titulo: "Verdadero o falso, ¡mano alzada ya!",
  afirmacion: "«Si compro un cachorro a un particular por redes sociales, pero él no gana dinero con ello, no pasa nada.»",
  respuesta: false,
  explicacion: "Solo los criadores inscritos en el Registro Oficial pueden criar y entregar animales. Un particular que vende <em>o regala</em> una camada comete una infracción, aunque no gane dinero con ella.",
  nota: "👉 Levantad la mano si creéis que es VERDADERO. Contamos y después revelamos la respuesta juntos." }
```

### 7. `tarjetas` — se voltean al tocarlas

Una o varias (hasta 4 caben en móvil). Con una sola ocupa el ancho central;
con varias se reparten en rejilla. El frente usa los colores «rojo» y el dorso
los «verdes». La tarjeta mide lo que su cara más alta, así que el dorso nunca
se corta; aun así, que el dorso no pase de dos frases.

| Campo | Descripción |
|---|---|
| `tarjetas` | Array de `{ frenteRotulo, frenteImg, frente, dorsoRotulo, dorsoImg, dorso }`. `frente` y `dorso` son obligatorios; el resto, opcional. |
| `instruccion` | Opcional (sin valor por defecto). Pista bajo las tarjetas. |

```js
{ tipo: "tarjetas",
  rotulo: "MITO VS. REALIDAD",
  titulo: "El abandono no tiene temporada",
  instruccion: "Toca la tarjeta para darle la vuelta.",
  tarjetas: [
    { frenteRotulo: "MITO",     frenteImg: "img/mito.png",     frente: "«Solo se abandona en julio, antes de irse de vacaciones a la playa.»",
      dorsoRotulo: "REALIDAD",  dorsoImg: "img/realidad.png",  dorso: "Es un goteo constante los 365 días del año. El verano solo lo hace más visible en las noticias." }
  ] }
```

Varias tarjetas cortas (protocolo, siglas, pasos con significado):

```js
{ tipo: "tarjetas",
  rotulo: "SI VES MALTRATO REAL",
  titulo: "El protocolo de las 4 «P»",
  instruccion: "Toca cada tarjeta para ver qué significa.",
  tarjetas: [
    { frenteRotulo: "1.ª P", frente: "Protégete", dorsoRotulo: "QUÉ SIGNIFICA",
      dorso: "Nunca te enfrentes al agresor ni entres a propiedades privadas. Es peligroso e invalida el caso." },
    { frenteRotulo: "2.ª P", frente: "Pruebas", dorsoRotulo: "QUÉ SIGNIFICA",
      dorso: "Graba vídeos o fotos desde lejos. Anota ubicación exacta, matrícula, fecha y hora." }
    /* … 3.ª y 4.ª P */
  ] }
```

### 8. `encuesta` — a mano alzada, con contadores

De **2 a 4** opciones. Cada una tiene un contador con botones `−` y `+` que
pulsa el profesor y una barra proporcional al máximo. No se guarda: al salir
de la unidad se reinicia.

| Campo | Descripción |
|---|---|
| `afirmacion` | Frase o dilema sobre el que se posiciona la clase. |
| `opciones` | Array de cadenas o `{ texto }`, de 2 a 4. |

```js
{ tipo: "encuesta",
  rotulo: "TERMÓMETRO DE OPINIÓN",
  titulo: "¿De acuerdo o en desacuerdo?",
  afirmacion: "«El abandono de animales es sobre todo un problema de verano, por las vacaciones.»",
  opciones: [ "De acuerdo", "En desacuerdo" ],
  nota: "👉 Poneos de pie. Quien esté muy de acuerdo se mueve a la derecha del aula; quien esté muy en desacuerdo, a la izquierda. Sin hablar todavía." }
```

### 9. `sabias_que` — dato destacado

Va todo dentro de una caja centrada: icono, cifra gigante, título y texto.
Aquí `titulo` va **debajo** de la cifra, no arriba.

| Campo | Descripción |
|---|---|
| `dato` | La cifra o expresión gigante. Corta: «+285.000», «30 días», «112 · 092 · 062». |
| `titulo` | Opcional: frase bajo la cifra. |
| `texto` | Lo que completa la cifra, empezando en minúscula si continúa la frase. |
| `fuente` | Opcional: se antepone «Fuente: ». |
| `iconoImg` | Opcional: icono sobre la cifra. |

```js
{ tipo: "sabias_que",
  rotulo: "EL DATO QUE CAMBIA EL DEBATE",
  dato: "+285.000",
  texto: "perros y gatos ingresan en centros de acogida cada año en España.",
  fuente: "Informe Abandono y Adopción, Fundación Affinity",
  iconoImg: "img/alerta.png",
  nota: "Y esto es solo lo que se registra oficialmente. La cifra real probablemente es mayor." }
```

### 10. `reto` — actividad con temporizador

| Campo | Descripción |
|---|---|
| `descripcion` | Enunciado de la actividad. |
| `minutos` | Opcional: si está, aparece el temporizador (Iniciar/Parar, Reiniciar). Se detiene al cambiar de diapositiva. |
| `pasos` | Array de pasos numerados (3-4; cortos). |
| `premio` | Opcional: recompensa, condición de victoria o aviso final. |

```js
{ tipo: "reto",
  rotulo: "ACTIVIDAD EN EQUIPO · 8 MIN",
  titulo: "Caza-mitos",
  descripcion: "Repartidas por el aula hay tarjetas con frases. En equipos de 3-4, debéis clasificarlas.",
  minutos: 8,
  pasos: [
    "Formad equipos y recoged un set de tarjetas de «mitos» repartidas por la clase.",
    "Clasificad cada tarjeta en dos montones: MITO o REALIDAD.",
    "Elegid una tarjeta que os haya sorprendido para compartir con el grupo."
  ],
  premio: "🏆 El equipo con más aciertos elige el orden de intervención en la siguiente actividad de la unidad." }
```

### 11. `cierre` — resumen y siguiente unidad

Al avanzar desde la última diapositiva de una unidad se vuelve al menú.

| Campo | Descripción |
|---|---|
| `subtitulo` | Opcional: puente hacia lo siguiente. |
| `ideas` | Array de 3-4 ideas clave, de una línea cada una (60-70 caracteres). Obligatorio para el validador. |
| `siguiente` | Opcional: «En la próxima unidad: …». |
| `siguienteEtiqueta` | Opcional: «SIGUIENTE: UNIDAD 2 →». |

```js
{ tipo: "cierre",
  rotulo: "FIN DE LA UNIDAD",
  titulo: "Ya conoces los mitos.",
  subtitulo: "Ahora toca entender qué es cuidar de verdad.",
  ideas: [
    "Más de 285.000 perros y gatos ingresan cada año en centros de acogida en España.",
    "La causa número 1 no es el verano: son las camadas no deseadas (15 %).",
    "Solo los criadores inscritos pueden criar y vender; las tiendas físicas ya no pueden.",
    "En La Laguna, ninguna tienda puede entregar un animal a un menor de 18 años."
  ],
  siguiente: "En la próxima unidad: el bienestar animal, explicado con ciencia y con ley.",
  siguienteEtiqueta: "SIGUIENTE: UNIDAD 2 →" }
```

## Imágenes

Las rutas son relativas a `index.html` (`img/nombre.png`). El validador
comprueba que existan. La base trae 16 iconos PNG 300×300 de fondo
transparente:

`huella` · `alerta` · `mito` (✕ rojo) · `realidad` (✓ verde) · `casa` ·
`tienda` · `prohibido` · `ubicacion` · `megafono` · `mazo` · `institucion` ·
`perro` · `personas` · `cartera` · `destello` · `diana`

Si el original trae sus propios iconos, el extractor los saca a
`img-originales/`; copia los que uses a `presentacion/img/` con un nombre
descriptivo.

## Navegación y enlaces

- `index.html#u1` abre la unidad 1; `index.html#u1-11`, su diapositiva 11.
- Teclado: `→ ↓ PageDown Espacio Intro` avanzan; `← ↑ PageUp Retroceso`
  retroceden; `Inicio`/`Fin`; `F` pantalla completa; `Esc` menú; `?` o `H`
  ayuda; `1`…`9` en el menú abren esa unidad. En táctil, deslizar.
- `window.PRESENTACION` expone `abrirUnidad`, `irA`, `avanzar`,
  `retroceder`, `volverAlMenu` y `estadoActual()` para pruebas automáticas.
