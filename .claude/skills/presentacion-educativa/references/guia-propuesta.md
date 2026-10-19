# Guía para redactar la propuesta institucional

La propuesta es el documento con el que una administración (ayuntamiento,
cabildo, consejería, diputación) decide si aprueba y paga el programa. Lo lee
primero un cargo político con poco tiempo y después un técnico que tiene que
justificar el gasto. Tiene que servir a los dos: la carta y la página 2
convencen; el resto permite aprobarlo sin preguntas.

La plantilla está en `assets/propuesta/propuesta.html` (portada + 9 secciones,
una por hoja, con comentarios `<!-- GUÍA: … -->` en cada bloque). El ejemplo
real terminado es la propuesta de «Nadie nace sabiendo cuidar» al
Ayuntamiento de San Cristóbal de La Laguna: 11 páginas.

## Regla de oro: ningún dato inventado

- **Ningún importe, nombre, cargo, fecha, teléfono, NIF ni número de centros
  inventado.** Todo lo que no sepas va como marcador:
  `<span class="marcador">[Nombre del alcalde/sa]</span>`,
  `[importe]`, `[fecha]`, `[curso escolar]`, `[nº]`, `[teléfono]`. Sale
  resaltado en amarillo y el autor lo rellena y regenera.
- Las cifras, normas y fuentes salen **del material original**, con la misma
  redacción. Si el material dice «más de 285.000», no escribas «casi 300.000».
- Si un dato local reforzaría el argumento pero no lo tienes (gasto anual del
  municipio en recogida), deja un marcador opcional:
  `[cifra municipal, si se dispone]`.
- Lo que sí puedes redactar: el hilo argumental, los resúmenes de las
  unidades, los beneficios, la metodología y el calendario por fases, siempre
  a partir de lo que el material ya contiene.
- Las duraciones por unidad, si el autor solo ha dado el total, se reparten y
  se marcan como «orientativo»; dilo en el informe para que lo valide.

## Tono

Formal, directo y concreto. De usted. Frases con sujeto y verbo, sin
grandilocuencia («una iniciativa pionera e innovadora que transformará…»).
Cada párrafo responde a una pregunta del lector: qué es, por qué ahora, por
qué a mí, qué me pides, cuánto cuesta. Un dato potente en el primer párrafo
útil vale más que tres adjetivos. Español de España: «alumnado», «centros
educativos», «curso escolar», «Concejalía de…».

## Qué argumentos convencen a una administración

Por orden de peso, según la experiencia del ejemplo:

1. **Difunde su propia normativa.** La ordenanza, la ley autonómica y la
   estatal se convierten en casos que el alumnado dictamina. La institución
   cumple una obligación de divulgación que normalmente no tiene cómo cumplir.
2. **Actúa sobre la causa real del problema, no sobre sus consecuencias.** Y
   eso tiene un coste que la institución ya paga (recogida, acogida,
   limpieza, sanciones que no se cobran).
3. **Ciudadanía que sabe actuar.** El alumnado sale sabiendo a quién llamar y
   qué datos dar: menos avisos confusos, más denuncias útiles.
4. **Metodología evaluable.** Hay evidencias de aprendizaje (rúbrica,
   simulacro, producto final), no solo una hoja de firmas.
5. **Escalable por centros.** Unidad de despliegue fija (una jornada por
   grupo-clase), piloto primero y extensión después: el coste se calcula
   multiplicando y se ajusta al crédito disponible.
6. **Encaja con lo que ya existe** (concejalía, programas de voluntariado,
   campañas) sin duplicarlo, y deja material reutilizable para sus campañas.
7. **Garantía técnica.** Si un coautor tiene un cargo que da credibilidad
   (agente del Seprona, técnico municipal, sanitario), se dice en la carta y
   en «Sobre los autores».

## Las 9 secciones

| N.º | Sección | Qué va | Extensión |
|---|---|---|---|
| — | **Portada** | Distintivo («Programa educativo para colegios e institutos»), título grande, subtítulo de dos líneas (tema + ámbito), una línea de datos («7 unidades · 5 horas en una jornada · Primaria y Secundaria»), un lema literal del material, destinatario (tratamiento, cargo, institución, nombre y concejalías) y pie con autores, lugar y fecha. | 1 página con aire: nada más. |
| 01 | **Carta de presentación** | Cinco párrafos: quién y qué; el dato potente y la causa real; qué hace el programa en el aula; por qué a esta institución; qué se solicita (reunión, aprobación, financiación para el curso, remitiendo al apartado 07). Firma con teléfono y correo. | 1 página justa (≈ 550-650 palabras). |
| 02 | **La actividad en una página** | Entradilla («no es una charla: es…»), a quién va dirigida, formato, metodología activa (una línea por dinámica real), evaluación y certificado, producto final. | 1 página. |
| 03 | **Las unidades** | Entradilla sobre el orden y las duraciones, y una ficha por unidad: Unidad N + minutos «orientativo» + título; Objetivo; En el aula; Se lleva. | 2-3 fichas por página (90-130 palabras cada una). |
| 04 | **Beneficios** | Para la institución (los argumentos de arriba, idea en negrita al principio), medible y escalable, para los centros (encaje curricular, sin carga para el profesorado, competencias, formato), para el alumnado y las familias. | 1 página. |
| 05 | **Metodología y recursos** | Cómo se trabaja (4-5 principios), qué aporta el programa (presentación y materiales concretos por unidad), qué necesita del centro, qué ocurre después. | 1 página. |
| 06 | **Calendario** | Tabla de cinco fases con `[fechas]` (acuerdo, contacto con centros, piloto en el primer trimestre, extensión, evaluación y memoria), ritmo de impartición y qué aporta cada parte. | 1 página. |
| 07 | **Presupuesto** | Entradilla sobre la unidad de coste, tabla con `[importe]` (impartición por grupo, materiales por grupo, preparación por programa, desplazamientos), base imponible, `[IGIC/IVA] ([%])` y total; ejemplo orientativo de cálculo; condiciones de facturación. | 1 página. |
| 08 | **Sobre los autores** | Entradilla sobre los papeles, un bloque por autor (nombre, rol, qué aporta al programa, ficha con trayectoria y requisitos como marcadores) y fuentes en las que se apoya el programa. | 1 página. |
| 09 | **Contacto y firma** | Datos de contacto (marcadores), documentación disponible, lo que se solicita (lo mismo que en la carta) y firma con lugar y fecha. | 1 página. |

Total: 10-12 páginas. Menos de 10 suele significar fichas de unidad
demasiado escuetas; más de 12, que la carta o los beneficios se han alargado.

Impuesto: en Canarias es el **IGIC** (tipo general 7 %); en la península y
Baleares, el **IVA**; algunas actividades educativas están exentas. No lo
decidas tú: deja `[IGIC/IVA] ([%])` salvo que el autor lo haya dicho (en el
ejemplo dijo IGIC 7 %).

## Maquetación

- Cada sección empieza en página nueva (`.hoja`). Las fichas de unidad, los
  bloques y las tablas no se parten entre páginas (`break-inside: avoid`).
- **Ninguna página con menos de dos tercios de contenido**, salvo la portada.
  Si una sección queda corta, completa con contenido real (un bloque de
  «Qué ocurre después», las fuentes), no con relleno; si se pasa por poco,
  recorta texto antes que tocar márgenes o letra.
- **Tablas enteras** en una sola página, con su cabecera.
- **Portada con aire**: título, subtítulo, datos, lema y destinatario. No
  metas logos que no tengas ni más texto.
- Fichas de unidad de dos en dos o de tres en tres por página; si queda una
  sola ficha huérfana en una página, reparte mejor o resume.
- Genera con `node propuesta/build-pdf.mjs` (con `playwright-core` en
  `NODE_PATH` para tener cabecera y «Página N de M»), rasteriza todas las
  páginas con PyMuPDF y míralas una a una antes de entregar.
- Cabecera, pie y nombre del PDF salen de las metas `pdf-cabecera`, `pdf-pie`
  y `pdf-archivo` del `<head>`.

## Fragmentos de ejemplo (propuesta real)

### La carta: el párrafo del dato potente

```html
<p>Cada año ingresan en España más de <strong>285.000 perros y gatos</strong> en centros de
acogida, según el informe anual de la Fundación Affinity. La causa número uno no son las
vacaciones de verano, como suele repetirse: son las <strong>camadas no deseadas</strong>,
responsables de en torno al 15 % de los animales que acaban en la calle. Detrás de cada una de esas cifras hay
decisiones humanas evitables —una compra impulsiva, una cría casera «sin ánimo de lucro», un
animal regalado a un menor— que hoy son en su mayoría ilegales y que, sin embargo, se siguen
tomando porque casi nadie sabe que lo son. La Ley 7/2023 lleva poco tiempo en vigor y la
ordenanza municipal de La Laguna es, en la práctica, desconocida para la mayoría de los
adolescentes del municipio: […]</p>
```

Y el cierre de la carta, con las tres peticiones:

```html
<p>Por todo ello, le solicito respetuosamente tres cosas: una <strong>reunión</strong> con
usted o con la persona responsable de las concejalías de Bienestar Animal y Educación para
exponer el programa en detalle; la <strong>aprobación</strong> de la actividad como programa
municipal dirigido a los colegios e institutos de San Cristóbal de La Laguna; y su
<strong>financiación</strong> para el curso escolar <span class="marcador">[curso escolar]</span>,
conforme al presupuesto que se detalla en el apartado 07 de este documento. […]</p>
```

### Una ficha de unidad

```html
<article class="unidad">
  <div class="unidad__cabecera">
    <p class="unidad__meta"><span class="unidad__num">Unidad 4</span><span class="unidad__duracion">45 min · orientativo</span></p>
    <h3>Simulación: adoptar a Luna</h3>
  </div>
  <dl>
    <dt>Objetivo</dt><dd>Dimensionar con números reales lo que supone adoptar: entre 10.000 € y 20.000 € en doce o quince años.</dd>
    <dt>En el aula</dt><dd>El grupo conoce a <strong>Luna</strong>, mestiza de dos años, y a partir de ahí decide en su nombre: gastos fijos anuales y obligaciones legales —<strong>seguro de responsabilidad civil</strong> exigido por la Ley 7/2023, microchip y censo municipal—. <strong>Los sobres de imprevistos</strong> (15 min): con un presupuesto ficticio y un fondo de ahorro, cada equipo abre tres sobres —una pata rota de 800 €, un seguro sin renovar, una dieta especial a los diez años— y asume las consecuencias. Puesta en común honesta, también con los equipos que se quedaron sin dinero.</dd>
    <dt>Se lleva</dt><dd>La idea central de la unidad: los imprevistos nunca justifican el abandono; se planifica antes de adoptar, no se improvisa después.</dd>
  </dl>
</article>
```

Fíjate en: objetivo en una frase con la cifra; «En el aula» con las
dinámicas en negrita y sus minutos; «Se lleva» con la idea central de la
unidad, no con una lista de contenidos.

### La nota de cálculo del presupuesto

```html
<div class="bloque nota">
  <h3>Ejemplo orientativo de cálculo</h3>
  <p class="formula">
    (n.º de grupos-clase × precio por jornada)
    + (n.º de grupos-clase × materiales por grupo)
    + preparación y adaptación al municipio
    + (n.º de jornadas × desplazamiento)<br>
    <span class="formula__total">= base imponible, sobre la que se aplica el 7 % de IGIC.</span>
  </p>
  <p>
    Duplicar el número de grupos duplica la partida principal; la preparación se paga una sola
    vez por programa. El Ayuntamiento puede así dimensionar la actuación al crédito disponible
    sin renegociar la propuesta.
  </p>
</div>
```

La fórmula sustituye a los números que todavía no hay: el técnico ve cómo se
calcula el total y que puede ajustarlo sin volver a negociar.

## Antes de entregar

```bash
grep -o '\[[^]]*\]' propuesta/propuesta.html | sort | uniq -c   # marcadores pendientes
node propuesta/build-pdf.mjs
```

En el informe al usuario: número de páginas, qué has comprobado en cada una
y la **lista de marcadores pendientes** agrupados (destinatario y fechas,
presupuesto, contacto, autores), igual que en el README del ejemplo.
