/* =======================================================================
   NADIE NACE SABIENDO CUIDAR — datos de la presentación
   -----------------------------------------------------------------------
   Este archivo ES el contenido. No hace falta tocar app.js para añadir,
   quitar o cambiar unidades y diapositivas.

   Se carga con <script src="data/unidades.js"> en lugar de fetch()+JSON
   para que la presentación funcione también abriendo index.html con
   doble clic (protocolo file://), donde fetch() de archivos locales falla.

   El esquema completo, tipo a tipo, está documentado en README.md.
   ======================================================================= */

window.UNIDADES = {

  /* ---------------------------------------------------------------- */
  /* CONFIGURACIÓN GENERAL                                            */
  /* ---------------------------------------------------------------- */
  config: {
    titulo: "Nadie nace sabiendo cuidar",
    subtitulo: "7 unidades · 5 horas · Tenencia responsable y bienestar animal",
    autor: "Alexis Trujillo",
    municipio: "San Cristóbal de La Laguna (Tenerife)",
    distintivo: "Programa educativo para colegios e institutos",

    /* Paleta (la misma de las presentaciones originales) */
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

    /* ============================ UNIDAD 1 ========================= */
    {
      id: "u1",
      numero: 1,
      titulo: "La realidad del abandono y los mitos que lo rodean",
      subtitulo: "Datos, ley y mitos desmontados",
      icono: "🐾",
      iconoImg: "img/huella.png",
      duracion: "45 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 1 · NADIE NACE SABIENDO CUIDAR",
          titulo: "La realidad del abandono<br>y los mitos que lo rodean",
          imagen: "img/huella.png",
          nota: "Vamos a desmontar, con datos y con ley, lo que «todo el mundo dice» sobre el abandono animal."
        },

        /* 02 / 15 */
        {
          tipo: "encuesta",
          rotulo: "TERMÓMETRO DE OPINIÓN",
          titulo: "¿De acuerdo o en desacuerdo?",
          afirmacion: "«El abandono de animales es sobre todo un problema de verano, por las vacaciones.»",
          opciones: ["De acuerdo", "En desacuerdo"],
          nota: "👉 Poneos de pie. Quien esté muy de acuerdo se mueve a la derecha del aula; quien esté muy en desacuerdo, a la izquierda. Sin hablar todavía."
        },

        /* 03 / 15 */
        {
          tipo: "sabias_que",
          rotulo: "EL DATO QUE CAMBIA EL DEBATE",
          dato: "+285.000",
          texto: "perros y gatos ingresan en centros de acogida cada año en España.",
          fuente: "Informe Abandono y Adopción, Fundación Affinity",
          iconoImg: "img/alerta.png",
          nota: "Y esto es solo lo que se registra oficialmente. La cifra real probablemente es mayor."
        },

        /* 04 / 15 */
        {
          tipo: "tarjetas",
          rotulo: "MITO VS. REALIDAD",
          titulo: "El abandono no tiene temporada",
          instruccion: "Toca la tarjeta para darle la vuelta.",
          tarjetas: [
            {
              frenteRotulo: "MITO",
              frenteImg: "img/mito.png",
              frente: "«Solo se abandona en julio, antes de irse de vacaciones a la playa.»",
              dorsoRotulo: "REALIDAD",
              dorsoImg: "img/realidad.png",
              dorso: "Es un goteo constante los 365 días del año. El verano solo lo hace más visible en las noticias."
            }
          ]
        },

        /* 05 / 15 */
        {
          tipo: "texto",
          titulo: "Entonces, ¿cuál es la causa número 1?",
          destacado: "El 15 % de los animales en la calle llegan por camadas no deseadas.",
          parrafos: [
            "Más que las vacaciones, más que las mudanzas: la principal causa de abandono es <strong>la falta de esterilización</strong>."
          ],
          imagen: "img/perro.png"
        },

        /* 06 / 15 */
        {
          tipo: "lista",
          rotulo: "«ADIÓS AL CAPRICHO»",
          titulo: "Las nuevas reglas de adquisición",
          items: [
            {
              iconoImg: "img/tienda.png",
              titulo: "Tiendas físicas",
              texto: "<strong>PROHIBIDA</strong> la venta de perros, gatos y hurones. Se acabaron las compras impulsivas."
            },
            {
              iconoImg: "img/casa.png",
              titulo: "Cría casera",
              texto: "<strong>ILEGAL</strong> si vendes o regalas camadas. Solo permitido a criadores inscritos oficialmente."
            },
            {
              iconoImg: "img/prohibido.png",
              titulo: "Menores de edad",
              texto: "Prohibida la venta o donación de animales a menores de 18 años."
            }
          ]
        },

        /* 07 / 15 */
        {
          tipo: "texto",
          rotulo: "ZOOM LOCAL · SAN CRISTÓBAL DE LA LAGUNA",
          titulo: "Tu ayuntamiento lo deja aún más claro",
          parrafos: [
            "<strong>Prohibición explícita por edad.</strong> La ordenanza municipal prohíbe vender o donar animales a menores de 18 años, sin excepción.",
            "<strong>Ninguna tienda puede saltarse la norma.</strong> Aunque un menor tenga el dinero ahorrado, ninguna tienda puede legalmente entregarle un animal."
          ],
          imagen: "img/ubicacion.png"
        },

        /* 08 / 15 */
        {
          tipo: "lista",
          rotulo: "SOLO UN CAMINO ES LEGAL",
          titulo: "Criadores inscritos: la única cría permitida",
          items: [
            {
              iconoImg: "img/institucion.png",
              titulo: "Registro Oficial de Criadores",
              texto: "Solo quienes están inscritos pueden criar y vender animales legalmente, bajo control sanitario."
            },
            {
              iconoImg: "img/casa.png",
              titulo: "«Mi perra tuvo una camada»",
              texto: "Si un particular vende o regala esos cachorros, está cometiendo una infracción — por bienintencionado que sea."
            }
          ]
        },

        /* 09 / 15 */
        {
          tipo: "verdadero_falso",
          rotulo: "RONDA RELÁMPAGO",
          titulo: "Verdadero o falso, ¡mano alzada ya!",
          afirmacion: "«Si compro un cachorro a un particular por redes sociales, pero él no gana dinero con ello, no pasa nada.»",
          respuesta: false,
          explicacion: "Solo los criadores inscritos en el Registro Oficial pueden criar y entregar animales. Un particular que vende <em>o regala</em> una camada comete una infracción, aunque no gane dinero con ella.",
          nota: "👉 Levantad la mano si creéis que es VERDADERO. Contamos y después revelamos la respuesta juntos."
        },

        /* 10 / 15 */
        {
          tipo: "reto",
          rotulo: "ACTIVIDAD EN EQUIPO · 8 MIN",
          titulo: "Caza-mitos",
          descripcion: "Repartidas por el aula hay tarjetas con frases. En equipos de 3-4, debéis clasificarlas.",
          minutos: 8,
          pasos: [
            "Formad equipos y recoged un set de tarjetas de «mitos» repartidas por la clase.",
            "Clasificad cada tarjeta en dos montones: MITO o REALIDAD.",
            "Elegid una tarjeta que os haya sorprendido para compartir con el grupo."
          ],
          premio: "🏆 El equipo con más aciertos elige el orden de intervención en la siguiente actividad de la unidad."
        },

        /* 11 / 15 */
        {
          tipo: "pregunta",
          rotulo: "CASO REAL · ¿LEGAL O ILEGAL?",
          titulo: "¿Legal o ilegal?",
          enunciado: "Un vecino publica en Wallapop cachorros de su perra «pura raza»: «primera camada, se venden rápido».",
          opciones: [
            { texto: "LEGAL" },
            { texto: "ILEGAL", correcta: true }
          ],
          veredicto: "VEREDICTO: ILEGAL",
          explicacion: "La cría y venta solo está permitida a criadores inscritos en el Registro Oficial. Un particular que vende cachorros comete una infracción, aunque su animal tenga pedigrí."
        },

        /* 12 / 15 */
        {
          tipo: "pregunta",
          rotulo: "CASO REAL · ¿LEGAL O ILEGAL?",
          titulo: "¿Legal o ilegal?",
          enunciado: "Una tienda de animales expone cachorros vivos en el escaparate para atraer a los clientes que pasean por el centro comercial.",
          opciones: [
            { texto: "LEGAL" },
            { texto: "ILEGAL", correcta: true }
          ],
          veredicto: "VEREDICTO: ILEGAL",
          explicacion: "La Ley 7/2023 prohíbe la venta y la exposición de animales en tiendas físicas. El objetivo es acabar con la compra impulsiva."
        },

        /* 13 / 15 */
        {
          tipo: "lista",
          rotulo: "PONTE A PRUEBA",
          titulo: "Antes de seguir, comprobamos",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Cuál es la causa número 1 de abandono?",
              texto: "✔ Las camadas no deseadas (15 %), no las vacaciones de verano."
            },
            {
              titulo: "2. ¿Quién puede criar y vender animales legalmente?",
              texto: "✔ Solo los criadores inscritos en el Registro Oficial."
            },
            {
              titulo: "3. ¿Puede una tienda vender un cachorro en La Laguna?",
              texto: "✔ No — está prohibida la venta y exposición de animales en tiendas físicas."
            }
          ]
        },

        /* 14 / 15 */
        {
          tipo: "imagen",
          rotulo: "PARA REFLEXIONAR",
          titulo: "El abandono no es un accidente",
          imagen: "img/megafono.png",
          pie: "«Cada cifra de abandono empieza con una decisión humana: comprar sin pensar, criar sin control, regalar sin permiso.»",
          nota: "Entender esto es el primer paso para no formar parte del problema."
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
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
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 2 →"
        }

      ]
    },

    /* ================= UNIDADES 2 A 7 — PENDIENTES ================= */
    /* Solo la entrada del menú. Al añadir `diapositivas` y quitar      */
    /* `pendiente: true`, la unidad se abre igual que la 1.             */

    {
      id: "u2",
      numero: 2,
      titulo: "¿Qué significa proteger de verdad a un animal?",
      subtitulo: "Ciencia, ley y ética del bienestar animal",
      icono: "🐶",
      iconoImg: "img/perro.png",
      duracion: "45 min",
      pendiente: true,
      diapositivas: []
    },
    {
      id: "u3",
      numero: 3,
      titulo: "Toma de posición y juicio ético",
      subtitulo: "Debate, argumentación y escucha",
      icono: "⚖️",
      iconoImg: "img/personas.png",
      duracion: "40 min",
      pendiente: true,
      diapositivas: []
    },
    {
      id: "u4",
      numero: 4,
      titulo: "Simulación: adoptar a Luna",
      subtitulo: "Los números reales de cuidar a un animal",
      icono: "💶",
      iconoImg: "img/cartera.png",
      duracion: "45 min",
      pendiente: true,
      diapositivas: []
    },
    {
      id: "u5",
      numero: 5,
      titulo: "La ley en Canarias y qué hacer ante el maltrato",
      subtitulo: "Tres niveles de norma y el protocolo de actuación",
      icono: "🏛️",
      iconoImg: "img/mazo.png",
      duracion: "45 min",
      pendiente: true,
      diapositivas: []
    },
    {
      id: "u6",
      numero: 6,
      titulo: "Tu turno: activismo y reto creativo",
      subtitulo: "Crear un mensaje que cambie opiniones",
      icono: "✨",
      iconoImg: "img/destello.png",
      duracion: "50 min",
      pendiente: true,
      diapositivas: []
    },
    {
      id: "u7",
      numero: 7,
      titulo: "Tu compromiso ciudadano y los recursos de tu ciudad",
      subtitulo: "El compromiso a 30 días",
      icono: "🎯",
      iconoImg: "img/diana.png",
      duracion: "30 min",
      pendiente: true,
      diapositivas: []
    }

  ]
};
