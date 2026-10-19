/* =======================================================================
   DATOS DE LA PRESENTACIÓN — versión mínima de arranque
   -----------------------------------------------------------------------
   Este archivo ES el contenido. No hace falta tocar app.js ni index.html
   para cambiar el título, los colores, las unidades o las diapositivas.

   Se carga con <script src="data/unidades.js"> en lugar de fetch()+JSON
   para que la presentación funcione también abriendo index.html con
   doble clic (protocolo file://), donde fetch() de archivos locales falla.

   Qué hacer con este archivo en un programa nuevo:
     1. Rellena `config` (todo lo que va entre [corchetes]) y la paleta.
     2. Sustituye la unidad de ejemplo por las unidades reales.
     3. Valida:  node <skill>/scripts/validar_unidades.mjs data/unidades.js

   El esquema completo (los 11 tipos de diapositiva, con todos sus campos)
   está en references/esquema-unidades.md de la skill y en README.md.
   ======================================================================= */

window.UNIDADES = {

  /* ---------------------------------------------------------------- */
  /* CONFIGURACIÓN GENERAL                                            */
  /* ---------------------------------------------------------------- */
  config: {
    titulo: "[Título del programa]",
    subtitulo: "[N unidades · N horas · tema del programa]",
    autor: "[Nombre del autor o autora]",
    municipio: "[Municipio (isla o provincia)]",
    distintivo: "[Programa educativo para colegios e institutos]",
    descripcion: "[Una frase que describa la presentación: se usa como descripción de la página]",
    favicon: "img/huella.png",

    /* Paleta por defecto (morado y amarillo). Sustitúyela por la del
       material original: el extractor imprime los colores más usados. */
    colorPrimario: "#6C4CF1",
    colorPrimarioOscuro: "#4B2FD4",
    colorAcento: "#FFC93C",
    colorTexto: "#211A3D",
    colorTextoSuave: "#655D8A",
    colorFondo: "#F1ECFF",
    colorRojo: "#FF5C6C",
    colorRojoFondo: "#FFE3E6",
    colorRojoTexto: "#7A1620",
    colorVerde: "#0A4B3A",
    colorVerdeFondo: "#DDF7EE"
  },

  /* ---------------------------------------------------------------- */
  /* UNIDADES                                                         */
  /* ---------------------------------------------------------------- */
  unidades: [

    /* ===================== UNIDAD DE EJEMPLO ======================= */
    /* Bórrala cuando tengas las unidades reales. Está para ver cómo se
       ven los tipos más usados y para comprobar que todo funciona.     */
    {
      id: "u1",
      numero: 1,
      titulo: "Unidad de ejemplo: así se ve cada tipo",
      subtitulo: "Plantilla de arranque",
      iconoImg: "img/destello.png",
      duracion: "[45 min]",
      diapositivas: [

        /* 01 / 08 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 1 · [TÍTULO DEL PROGRAMA]",
          titulo: "Unidad de ejemplo:<br>así se ve cada tipo",
          imagen: "img/destello.png",
          nota: "Frase de arranque del profesor. Aquí va la entradilla de la portada original."
        },

        /* 02 / 08 */
        {
          tipo: "encuesta",
          rotulo: "TERMÓMETRO DE OPINIÓN",
          titulo: "¿De acuerdo o en desacuerdo?",
          afirmacion: "«Frase de ejemplo sobre la que la clase se posiciona antes de ver los datos.»",
          opciones: ["De acuerdo", "En desacuerdo"],
          nota: "👉 Indicación al profesor: cómo se vota (mano alzada, moverse por el aula…)."
        },

        /* 03 / 08 */
        {
          tipo: "sabias_que",
          rotulo: "EL DATO QUE CAMBIA EL DEBATE",
          dato: "+00.000",
          texto: "texto que completa la cifra: qué se cuenta, dónde y cada cuánto.",
          fuente: "[Fuente del dato, tal cual la cita el material original]",
          iconoImg: "img/alerta.png",
          nota: "Comentario breve que acompaña al dato."
        },

        /* 04 / 08 */
        {
          tipo: "tarjetas",
          rotulo: "MITO VS. REALIDAD",
          titulo: "Dos tarjetas de ejemplo",
          instruccion: "Toca cada tarjeta para darle la vuelta.",
          tarjetas: [
            {
              frenteRotulo: "MITO",
              frenteImg: "img/mito.png",
              frente: "«Una creencia extendida, tal como la diría el alumnado.»",
              dorsoRotulo: "REALIDAD",
              dorsoImg: "img/realidad.png",
              dorso: "Lo que dicen los datos o la ley, en una o dos frases."
            },
            {
              frenteRotulo: "MITO",
              frenteImg: "img/mito.png",
              frente: "«Otra creencia de ejemplo.»",
              dorsoRotulo: "REALIDAD",
              dorsoImg: "img/realidad.png",
              dorso: "Su respuesta, también breve para que quepa en móvil."
            }
          ]
        },

        /* 05 / 08 */
        {
          tipo: "lista",
          rotulo: "LO ESENCIAL",
          titulo: "Tres puntos que aparecen uno a uno",
          items: [
            { iconoImg: "img/institucion.png", titulo: "Primer punto", texto: "Explicación corta del primer punto." },
            { iconoImg: "img/personas.png",    titulo: "Segundo punto", texto: "Explicación corta del segundo punto." },
            { iconoImg: "img/diana.png",       titulo: "Tercer punto", texto: "Explicación corta del tercer punto." }
          ]
        },

        /* 06 / 08 */
        {
          tipo: "pregunta",
          rotulo: "CASO REAL · ¿SÍ O NO?",
          titulo: "¿Qué opinas?",
          enunciado: "Descripción de un caso concreto sobre el que la clase tiene que decidir.",
          opciones: [
            { texto: "SÍ" },
            { texto: "NO", correcta: true }
          ],
          veredicto: "VEREDICTO: NO",
          explicacion: "Por qué la respuesta es esa, con la norma o el dato que lo justifica."
        },

        /* 07 / 08 */
        {
          tipo: "reto",
          rotulo: "ACTIVIDAD EN EQUIPO · 5 MIN",
          titulo: "Nombre de la actividad",
          descripcion: "Enunciado de la actividad tal como lo plantea el material original.",
          minutos: 5,
          pasos: [
            "Formad equipos de 3 o 4.",
            "Haced la tarea que pide la actividad.",
            "Compartid el resultado con el resto de la clase."
          ],
          premio: "🏆 Recompensa o condición de victoria, si el original la tiene."
        },

        /* 08 / 08 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "Frase de cierre de la unidad.",
          subtitulo: "Puente hacia lo que viene después.",
          ideas: [
            "Primera idea clave: cabe en una línea.",
            "Segunda idea clave: también breve.",
            "Tercera idea clave: el dato más importante."
          ],
          siguiente: "En la próxima unidad: de qué trata la siguiente.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 2 →"
        }

      ]
    }

  ]
};
