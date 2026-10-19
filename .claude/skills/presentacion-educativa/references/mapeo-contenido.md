# Mapeo del material original a tipos de diapositiva

Guía práctica sacada de convertir las 7 unidades de «Nadie nace sabiendo
cuidar» (105 diapositivas de PowerPoint → 105 diapositivas interactivas).
Los ejemplos citan la unidad y la diapositiva: el original está en
`unidades/texto/UnidadN_*.md` del proyecto de ejemplo y el resultado en
`ejemplo-nadie-nace-sabiendo-cuidar.js` (busca el comentario `/* NN / 15 */`).

## Cómo trabajar

1. Lee el `.md` de la unidad entero antes de escribir nada. Muchas
   diapositivas solo se entienden con la anterior o la siguiente (una
   actividad y sus casos, unos casos y sus respuestas).
2. Para cada diapositiva original decide el tipo con la tabla de abajo. Por
   defecto, **una diapositiva original = una diapositiva interactiva**, en el
   mismo orden.
3. Copia los textos tal cual: cifras, nombres de leyes, importes, fuentes,
   frases entre comillas. Solo cambian tres cosas: comillas rectas `"…"` →
   latinas `«…»`, `15%` → `15 %` (con espacio, como pide la norma española) y los
   saltos de línea del original, que desaparecen salvo en titulares de portada.
4. Lo que el original dice al profesor (👉 …, «Sin hablar todavía»,
   «Contamos y después revelamos») va en `nota`.
5. Anota cada texto nuevo y cada desviación (ver más abajo).

## Tabla: patrón del original → tipo

| Patrón en el original | Tipo | Ejemplo real | Cómo se rellenó |
|---|---|---|---|
| «01 / 15», «UNIDAD N · PROGRAMA», título en dos líneas, icono y una frase de arranque | `portada` | U1 #1 | `rotulo` = «UNIDAD 1 · NADIE NACE SABIENDO CUIDAR», `titulo` con `<br>` donde cortaba el original, `imagen` = icono, `nota` = la frase de arranque. El «01 / 15» se descarta: lo pone el contador. |
| **Termómetro de opinión** o **dilema «Posiciónate»**: una frase entre comillas y dos polos («TOTALMENTE EN DESACUERDO» / «TOTALMENTE DE ACUERDO») | `encuesta` | U1 #2, U3 #3, #5, #7, #11 | `afirmacion` = la frase, `opciones: ["De acuerdo", "En desacuerdo"]` (los polos simplificados para que quepan en móvil), `nota` = la instrucción 👉 de moverse por el aula. El profesor cuenta con `+`/`−`. |
| **Cifra gigante** + qué es + «(Fuente: …)» | `sabias_que` | U1 #3 «+285.000» | `dato: "+285.000"`, `texto: "perros y gatos ingresan en centros de acogida cada año en España."`, `fuente` sin la palabra «Fuente» ni paréntesis, `nota` = el comentario de debajo. |
| **Dato que no es número** pero cambia el debate | `sabias_que` | U3 #6 «Padres o tutores» | `dato: "Padres o tutores"` (16 caracteres: el máximo razonable), `titulo: "son los responsables legales del animal"`, `texto` = la explicación. |
| **MITO** con frase + **REALIDAD** con frase | `tarjetas` (una) | U1 #4 | `frenteRotulo: "MITO"`, `frenteImg: "img/mito.png"`, `frente` = la frase entre comillas; `dorsoRotulo: "REALIDAD"`, `dorsoImg: "img/realidad.png"`, `dorso` = la respuesta. |
| **Caso real «¿Legal o ilegal?»** con LEGAL / ILEGAL y «VEREDICTO: … Justificación: …» | `pregunta` | U1 #11 (Wallapop), U1 #12 (escaparate), U5 #7-10 (concurso) | `enunciado` = el caso, `opciones: [{texto:"LEGAL"}, {texto:"ILEGAL", correcta:true}]`, `veredicto: "VEREDICTO: ILEGAL"`, `explicacion` = la justificación sin la palabra «Justificación:». El rótulo del original se conserva («CASO 1 DEL CONCURSO»). |
| **Ronda relámpago**: frase y «levantad la mano si creéis que es VERDADERO» | `verdadero_falso` | U1 #9 | `afirmacion` = la frase, `respuesta: false`, `nota` = la instrucción. El original no daba la respuesta escrita: la `explicacion` es **texto nuevo**, sacado de lo que la propia unidad dice dos diapositivas antes. |
| **Sobres de imprevistos** (U4 «Adoptar a Luna»): situación + pregunta, sin respuesta | `tarjetas` (una por sobre) | U4 #8-10 | `rotulo: "SOBRE 1"`, `titulo` = el imprevisto, `frenteRotulo: "EL IMPREVISTO"`, `frente` = cifras y pregunta del original; `dorsoRotulo: "LA REFLEXIÓN"`, `dorso` = **texto nuevo** (qué aprender del sobre), `instruccion: "Decidid primero en equipo. Después, tocad la tarjeta para ver la reflexión."` |
| **Siglas o protocolo** con varios bloques título + explicación (las 4 P) | `tarjetas` (varias) | U5 #12 | Una tarjeta por P: `frenteRotulo: "1.ª P"`, `frente: "Protégete"`, `dorsoRotulo: "QUÉ SIGNIFICA"`, `dorso` = el texto del original. Así la clase intenta adivinar antes de voltear. |
| **«Las respuestas»** de unos casos planteados en la diapositiva anterior | `tarjetas` (varias) | U2 #11 | `frente` = el caso condensado en una línea (**texto nuevo**, resumido de U2 #9), `dorso` = la respuesta del original. |
| Tres o cuatro **bloques con icono, título y texto** (reglas, obligaciones, gastos, formatos) | `lista` progresiva | U1 #6 «Adiós al capricho», U4 #4 gastos fijos | Un item por bloque: `{ iconoImg, titulo, texto }`. Las palabras en mayúsculas del original («PROHIBIDA», «ILEGAL») van en `<strong>`. |
| **«Ponte a prueba»**: preguntas numeradas con su respuesta ✔ | `lista` progresiva | U1 #13 y el penúltimo de cada unidad | `items: [{ titulo: "1. ¿…?", texto: "✔ …" }]`, `instruccion: "Pulsa para ir mostrando cada respuesta."`. Cada pulsación descubre una pregunta con su respuesta: el profesor la lanza al aula antes de pulsar. |
| **Actividad** con «· 8 MIN», enunciado, pasos 1-2-3 y 🏆 | `reto` | U1 #10 «Caza-mitos», U4 #7, U5 #6 | `minutos: 8` (temporizador), `descripcion`, `pasos` sin los números (los pone el motor), `premio` con su emoji. Si no hay minutos, sin `minutos` (no hay temporizador). |
| **Titular + dato destacado + explicación** («Entonces, ¿cuál es la causa número 1?») | `texto` con `destacado` | U1 #5 | `titulo` = la pregunta, `destacado` = la frase-dato en una línea, `parrafos` = la explicación, `imagen` = icono. |
| **Zoom local** o explicación en dos bloques con titulillo | `texto` | U1 #7 | Cada bloque es un párrafo que empieza por su titulillo en `<strong>`. `imagen` = icono a la derecha. |
| **Puesta en común** (instrucciones para debatir) | `texto` + `nota` | U3 #4 | `parrafos` = lo que se dice a la clase, `nota` = la instrucción 👉. |
| **«Para reflexionar»**: icono grande + cita | `imagen` | U1 #14 | `imagen` = icono, `pie` = la cita entre comillas latinas, `nota` = la frase de debajo. |
| **Tarjeta o lema con cifras** («30 días — 1 acción — 0 excusas») | `sabias_que` | U7 #8 | Frase partida: `dato: "30 días"`, `titulo: "1 acción · 0 excusas"`, `texto: "Campos de la tarjeta: …"`. |
| **«FIN DE LA UNIDAD»** con frase, puente y «SIGUIENTE: UNIDAD N →» | `cierre` | U1 #15, U5 #15 | `titulo`, `subtitulo`, `siguiente` y `siguienteEtiqueta` del original. Las `ideas` (3-4) son **texto nuevo**: el original no las tiene. Se escriben con los datos de la unidad, sin añadir nada que no esté en ella. |

Lo que **no** se hace: convertir texto expositivo en preguntas inventadas,
poner un test donde el original no pregunta, añadir un temporizador a una
actividad sin minutos o una encuesta donde nadie se posiciona.

## Cómo repartir una frase larga entre `dato`, `titulo` y `texto`

En `sabias_que` la cifra se ve desde el fondo del aula y el resto se lee de
cerca. Reparto:

- `dato`: solo la cifra o expresión corta (≤ 17 caracteres: «+285.000»,
  «10.000 – 20.000 €», «112 · 092 · 062», «30 días»). Si no hay número, la
  expresión clave («Padres o tutores»).
- `titulo` (opcional): la afirmación que la cifra demuestra, en una línea.
- `texto`: el resto, continuando la frase en minúscula si la cifra es el
  sujeto («perros y gatos ingresan…»).
- `fuente`: el nombre del informe o la norma, sin «Fuente:» (se antepone solo).

Ejemplos reales:

| Original | `dato` | `titulo` | `texto` |
|---|---|---|---|
| «+285.000 perros y gatos ingresan en centros de acogida cada año en España. (Fuente: …)» | +285.000 | — | perros y gatos ingresan en centros de acogida cada año en España. |
| «El presupuesto vital: entre 10.000 y 20.000 € … durante toda su vida (12-15 años)» | 10.000 – 20.000 € | — | es lo que puede costar tener a Luna durante toda su vida (12-15 años). |
| «30 días — 1 acción — 0 excusas. Campos: …» | 30 días | 1 acción · 0 excusas | Campos de la tarjeta: mi acción, fecha límite… |

En `texto`, una frase larga del original con dato dentro va al `destacado`
(una línea, la idea) y el resto a `parrafos`.

## Textos que hay que redactar nuevos

El original es una presentación para que alguien la cuente; la versión
interactiva necesita algunos textos que el ponente decía de palabra:

| Texto nuevo | Cuándo | Regla |
|---|---|---|
| `ideas` del `cierre` | Siempre (el original solo tiene «Fin de la unidad») | 3-4 ideas con los datos de la propia unidad, una línea cada una. |
| `dorso` de tarjetas | Cuando el original plantea la pregunta pero no da la respuesta (sobres de Luna) | Resume lo que la unidad ya dice; dos frases como máximo. |
| `frente` condensado | Cuando el original separa casos y respuestas en dos diapositivas (U2 #9 y #11) | El caso en una línea, con las mismas palabras. |
| `explicacion` de `verdadero_falso` | Cuando el original dice «revelamos la respuesta juntos» sin escribirla | Sale de la norma o el dato citados en la unidad. |
| `opciones` de `encuesta` | Cuando el original da dos polos largos | «De acuerdo» / «En desacuerdo». |
| `rotulo` o `titulo` | Cuando el original no tiene (U1 #5 no tiene rótulo; se deja sin él) | Mejor sin rótulo que con uno inventado. |

Cómo anotarlos: en `unidades.js`, un comentario junto al campo,
`/* NUEVO: resumen de la diapositiva 9 */`, y en el informe final una lista
«Textos nuevos redactados» con unidad, diapositiva, campo y texto, para que
el autor (y el coautor que responde de la parte legal) los valide. Las
desviaciones (fusionar dos diapositivas, dividir una que no cabe, cambiar el
orden) se listan igual.

## Límites de longitud que caben en móvil (390×844)

Medidos en las 105 diapositivas del ejemplo, que pasan el recorrido sin
desbordes. Caracteres sin contar etiquetas HTML. El validador avisa (sin
fallar) por encima de la columna «aviso».

| Campo | Ideal | Máximo usado | Aviso |
|---|---|---|---|
| Idea de `cierre` | 60-70 | 85 | > 90 |
| `dato` de `sabias_que` | ≤ 12 | 17 | > 20 |
| `titulo` | ≤ 45 | 58 | > 70 |
| `parrafos` + `destacado` de `texto` | 2-3 frases | 259 | > 300 |
| `dorso` con una sola tarjeta | ≤ 120 | 172 | > 180 |
| `dorso` con 2-4 tarjetas | ≤ 100 | 96 | > 120 |
| Puntos de una `lista` | 3-4 | 5 | > 5 |
| Tarjetas por diapositiva | 1-4 | 4 | > 4 |
| Pasos de un `reto` | 3 | 3 | > 4 |
| Opciones de `encuesta` | 2 (≤ 15 caracteres cada una) | 2 | fallo si < 2 o > 4 |

Si no cabe, se divide la diapositiva (y se anota la desviación); no se reduce
la letra.

## Errores que ya cometimos y cómo se corrigieron

- **Dorso de tarjeta cortado.** Las caras del volteo estaban en posición
  absoluta y la tarjeta medía lo que el frente: un dorso más largo se cortaba
  sin aviso (el recorrido no lo veía porque no había scroll). Se corrigió en
  `styles.css` apilando las dos caras en la misma celda de rejilla, así que la
  tarjeta mide lo que la cara más alta. Aun así, mantén los dorsos cortos y
  mira la captura con las tarjetas volteadas: `recorrer.mjs` las voltea antes
  de medir y de capturar.
- **Títulos partidos en columnas de dos palabras.** Un titular largo junto a
  una imagen (`texto` con `imagen`) o en la caja de `sabias_que` se partía en
  muchas líneas cortas en móvil. Remedio: titulares de ≤ 45 caracteres, `<br>`
  solo en portadas y donde corte bien, y la frase larga al `destacado` o al
  `texto`. Solo se ve mirando la captura.
- **Emojis que salen como cuadrados.** El Chromium del entorno de pruebas no
  siempre tiene fuente de emoji (`fc-list | grep -i emoji` lo dice), y un
  emoji sin fuente se pinta como un cuadrado. Por eso los iconos de las
  unidades y de las listas son PNG (`iconoImg`) y el `icono` emoji queda solo
  de reserva. Los emojis que siguen (👉 en notas, 🏆 y 💡 en premios, ✔ en
  respuestas) son decorativos: el texto se entiende igual sin ellos. No
  pongas un emoji como único portador de significado.
- **Desbordes en móvil con 4 tarjetas, 5 puntos o temporizador.** Se
  resolvieron compactando márgenes en `styles.css` para pantallas ≤ 640 px,
  no bajando la letra. Si una diapositiva nueva desborda, primero acorta el
  texto; si no basta, divídela.
- **Fuente de reserva más ancha.** Sin internet no carga Outfit y el sistema
  usa una fuente más ancha. Las mediciones del recorrido se hacen así; si
  cabe sin Outfit, cabe con ella. Un roce de 1-4 px (por ejemplo U1 #9 en
  móvil tras responder) no se ve y no cuenta como desborde.
- **Cifras con formato inglés.** «15%» y «800€» se escriben «15 %» y
  «800 €»; los miles con punto («285.000»).
