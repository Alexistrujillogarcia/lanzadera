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

    /* ============================ UNIDAD 2 ========================= */
    {
      id: "u2",
      numero: 2,
      titulo: "¿Qué significa proteger de verdad a un animal?",
      subtitulo: "Ciencia, ley y ética del bienestar animal",
      icono: "🐶",
      iconoImg: "img/perro.png",
      duracion: "45 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 2 · NADIE NACE SABIENDO CUIDAR",
          titulo: "¿Qué significa proteger<br>de verdad a un animal?",
          imagen: "img/perro.png",
          nota: "Ciencia, ley y ética para entender el bienestar animal más allá de «no pegarle»."
        },

        /* 02 / 15 */
        {
          tipo: "texto",
          rotulo: "PARA EMPEZAR",
          titulo: "¿Sienten los animales lo mismo que nosotros?",
          destacado: "¿Dolor, miedo, aburrimiento, alegría?",
          parrafos: [
            "Pensad en un ejemplo concreto que hayáis visto en un animal."
          ],
          imagen: "img/huella.png",
          nota: "👉 En parejas, 1 minuto: compartid un ejemplo real que hayáis observado. Después, 2-3 parejas lo cuentan en voz alta."
        },

        /* 03 / 15 */
        {
          tipo: "texto",
          rotulo: "NO ES OPINIÓN, ES LEY",
          titulo: "Lo que dice el Código Civil",
          destacado: "«Los animales son seres vivos dotados de sensibilidad.»",
          parrafos: [
            "No son cosas, no son objetos: <strong>sienten dolor, miedo y aburrimiento</strong>."
          ],
          imagen: "img/mazo.png",
          nota: "Esto cambia por completo cómo debemos tratarlos — y lo que la ley nos exige."
        },

        /* 04 / 15 */
        {
          tipo: "lista",
          rotulo: "LAS 5 LIBERTADES DEL BIENESTAR ANIMAL",
          titulo: "No es solo «no pegarle»",
          items: [
            { iconoImg: "img/huella.png",   titulo: "Libre de hambre y sed" },
            { iconoImg: "img/casa.png",     titulo: "Libre de incomodidad física o térmica" },
            { iconoImg: "img/alerta.png",   titulo: "Libre de dolor, lesión y enfermedad" },
            { iconoImg: "img/personas.png", titulo: "Libre de miedo y angustia" },
            { iconoImg: "img/perro.png",    titulo: "Libre de expresar su comportamiento natural" }
          ]
        },

        /* 05 / 15 */
        {
          tipo: "sabias_que",
          rotulo: "UNA IDEA CLAVE DE HOY",
          dato: "Querer ≠ Cuidar",
          texto: "Ignorar cualquiera de las 5 libertades es maltrato por omisión — aunque quieras muchísimo a tu animal.",
          iconoImg: "img/destello.png"
        },

        /* 06 / 15 */
        {
          tipo: "lista",
          rotulo: "MALTRATO POR OMISIÓN, EN LA PRÁCTICA",
          titulo: "No hace falta pegar para hacer daño",
          items: [
            {
              iconoImg: "img/casa.png",
              titulo: "Dejarlo solo demasiadas horas",
              texto: "Sin estímulos ni compañía, un animal social sufre ansiedad y aburrimiento."
            },
            {
              iconoImg: "img/alerta.png",
              titulo: "No llevarlo al veterinario",
              texto: "Posponer revisiones o vacunas «porque está bien» es ignorar su salud a largo plazo."
            },
            {
              iconoImg: "img/perro.png",
              titulo: "Alimentación inadecuada",
              texto: "Sobrealimentar o no cubrir sus necesidades nutricionales también es maltrato."
            }
          ]
        },

        /* 07 / 15 */
        {
          tipo: "lista",
          rotulo: "LA OTRA CARA: EL ENRIQUECIMIENTO AMBIENTAL",
          titulo: "¿Cómo se ve el bienestar real?",
          items: [
            {
              iconoImg: "img/destello.png",
              titulo: "Estimulación mental",
              texto: "Juguetes interactivos, juegos de olfato, rutinas variadas — no solo comida y agua."
            },
            {
              iconoImg: "img/perro.png",
              titulo: "Comportamiento natural",
              texto: "Un gato necesita trepar y arañar; un perro necesita explorar olores nuevos."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Vínculo social",
              texto: "Tiempo de calidad, contacto, paseos que cambian de ruta — no solo «sacarlo a hacer sus necesidades»."
            }
          ]
        },

        /* 08 / 15 */
        {
          tipo: "reto",
          rotulo: "MODO DETECTIVE · EN PAREJAS",
          titulo: "Auditoría de las 5 Libertades",
          descripcion: "Vais a analizar 4 casos reales. Vuestro trabajo: decidir qué libertad(es) están fallando en cada uno.",
          pasos: [
            "Leed los 4 casos de la siguiente diapositiva con vuestra pareja.",
            "Para cada uno, anotad qué libertad(es) de las 5 creéis que se incumplen.",
            "Preparaos para defender vuestra respuesta — no siempre hay una única «correcta»."
          ]
        },

        /* 09 / 15 */
        {
          tipo: "lista",
          rotulo: "CASOS PARA ANALIZAR",
          titulo: "Lee, piensa, decide",
          instruccion: "Pulsa para mostrar el siguiente caso.",
          items: [
            {
              iconoImg: "img/casa.png",
              titulo: "Caso A · Patio",
              texto: "Perro en patio. Sale a pasear una vez por semana. Tiene caseta, comida de sobra y agua limpia."
            },
            {
              iconoImg: "img/ubicacion.png",
              titulo: "Caso B · Piso",
              texto: "Gato en un piso, 12 horas solo al día. Sin sitios altos donde trepar ni ventanas protegidas."
            },
            {
              iconoImg: "img/prohibido.png",
              titulo: "Caso C · Jaula",
              texto: "Conejo en jaula pequeña, alimentado con pienso de supermercado. Nunca sale de la jaula."
            },
            {
              iconoImg: "img/perro.png",
              titulo: "Caso D · Sofá",
              texto: "Perro muy querido, duerme en la cama, pero con sobrepeso severo y sin apenas paseos por falta de tiempo."
            }
          ]
        },

        /* 10 / 15 */
        {
          tipo: "texto",
          rotulo: "PUESTA EN COMÚN",
          titulo: "Un representante por pareja",
          parrafos: [
            "Elegid el caso que más debate haya generado en vuestra pareja y explicad por qué."
          ],
          imagen: "img/megafono.png",
          nota: "👉 2-3 parejas comparten su caso y su veredicto con toda la clase antes de ver las respuestas."
        },

        /* 11 / 15 */
        {
          tipo: "tarjetas",
          rotulo: "LAS RESPUESTAS",
          titulo: "Lo que fallaba en cada caso",
          instruccion: "Toca cada tarjeta para darle la vuelta.",
          tarjetas: [
            {
              frenteRotulo: "CASO A · PATIO",
              frente: "Caseta, comida y agua… pero un solo paseo a la semana.",
              dorsoRotulo: "LO QUE FALLABA",
              dorso: "Falla <strong>comportamiento natural</strong>: un paseo semanal es insuficiente estímulo y ejercicio."
            },
            {
              frenteRotulo: "CASO B · PISO",
              frente: "Gato 12 horas solo, sin sitios altos ni ventanas protegidas.",
              dorsoRotulo: "LO QUE FALLABA",
              dorso: "Falla <strong>comportamiento natural</strong> y posible angustia: sin enriquecimiento ni seguridad en ventanas."
            },
            {
              frenteRotulo: "CASO C · JAULA",
              frente: "Conejo en jaula pequeña, pienso de supermercado, nunca sale.",
              dorsoRotulo: "LO QUE FALLABA",
              dorso: "Falla <strong>comodidad</strong>, comportamiento natural y posible salud: dieta y espacio inadecuados."
            },
            {
              frenteRotulo: "CASO D · SOFÁ",
              frente: "Muy querido y en la cama, pero con sobrepeso severo y sin paseos.",
              dorsoRotulo: "LO QUE FALLABA",
              dorso: "Falla <strong>salud</strong> (sobrepeso) y comportamiento natural: el cariño no sustituye el ejercicio."
            }
          ]
        },

        /* 12 / 15 */
        {
          tipo: "texto",
          rotulo: "REFLEXIÓN PERSONAL",
          titulo: "Piensa en un animal que conozcas",
          destacado: "¿Le falta alguna de las 5 Libertades sin que nadie se haya dado cuenta?",
          parrafos: [
            "No hace falta compartirlo en voz alta si no quieres."
          ],
          imagen: "img/huella.png",
          nota: "👉 Tómate 30 segundos de silencio para pensarlo. Si te sientes cómodo, coméntalo con la persona de al lado."
        },

        /* 13 / 15 */
        {
          tipo: "lista",
          rotulo: "PONTE A PRUEBA",
          titulo: "Antes de seguir, comprobamos",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Qué dice el Código Civil sobre los animales?",
              texto: "✔ Son seres vivos dotados de sensibilidad, no cosas."
            },
            {
              titulo: "2. ¿Es maltrato dejar a un animal solo muchas horas sin estímulos?",
              texto: "✔ Sí, es maltrato por omisión aunque no haya violencia física."
            },
            {
              titulo: "3. ¿Qué es el enriquecimiento ambiental?",
              texto: "✔ Dar estímulos mentales, sociales y de comportamiento natural, no solo cubrir lo básico."
            }
          ]
        },

        /* 14 / 15 */
        {
          tipo: "imagen",
          rotulo: "PARA REFLEXIONAR",
          titulo: "El cariño no es una lista de tareas",
          imagen: "img/megafono.png",
          pie: "«Un animal bien cuidado no es solo el que come y duerme, sino el que puede ser, de verdad, lo que es.»",
          nota: "Cuidar bien empieza por conocer sus necesidades reales, no solo las que nos resultan cómodas."
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "Ya sabes qué es cuidar de verdad.",
          subtitulo: "¿Y tú, estarías dispuesto a hacerlo?",
          ideas: [
            "El Código Civil reconoce a los animales como seres con sensibilidad, no cosas.",
            "Las 5 Libertades son el mínimo del bienestar, no un extra.",
            "Querer no es cuidar: ignorar cualquiera de ellas es maltrato por omisión.",
            "El enriquecimiento ambiental también forma parte del cuidado."
          ],
          siguiente: "En la próxima unidad: un debate en equipo sobre dilemas morales y responsabilidad.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 3 →"
        }

      ]
    },

    /* ============================ UNIDAD 3 ========================= */
    {
      id: "u3",
      numero: 3,
      titulo: "Toma de posición y juicio ético",
      subtitulo: "Debate, argumentación y escucha",
      icono: "⚖️",
      iconoImg: "img/personas.png",
      duracion: "40 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 3 · NADIE NACE SABIENDO CUIDAR",
          titulo: "Toma de posición<br>y juicio ético",
          imagen: "img/personas.png",
          nota: "No siempre hay una única respuesta correcta. Hoy vamos a debatir, argumentar y escuchar."
        },

        /* 02 / 15 */
        {
          tipo: "lista",
          rotulo: "LAS REGLAS DEL JUEGO",
          titulo: "Cómo funciona el «termómetro de opinión»",
          items: [
            {
              iconoImg: "img/megafono.png",
              titulo: "1. Se lee un dilema",
              texto: "El profesor plantea una frase o situación con la que puedes estar más o menos de acuerdo."
            },
            {
              iconoImg: "img/ubicacion.png",
              titulo: "2. Te posicionas en el aula",
              texto: "Un extremo del aula es «totalmente de acuerdo», el otro «totalmente en desacuerdo». Te colocas según tu opinión real."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "3. Se debate",
              texto: "Personas de distintos puntos explican su postura. Puedes cambiar de posición si te convencen."
            }
          ]
        },

        /* 03 / 15 */
        {
          tipo: "encuesta",
          rotulo: "DILEMA 1",
          titulo: "Posiciónate",
          afirmacion: "«Si tengo dinero ahorrado, debería poder comprar el cachorro de raza que quiero, aunque haya muchos animales esperando en adopción.»",
          opciones: ["De acuerdo", "En desacuerdo"],
          nota: "👉 Colócate en el aula según tu grado de acuerdo. Prepárate para explicar por qué."
        },

        /* 04 / 15 */
        {
          tipo: "texto",
          rotulo: "PUESTA EN COMÚN",
          titulo: "¿Por qué te has colocado ahí?",
          parrafos: [
            "Escuchamos a 2-3 personas de posiciones distintas. Nadie está «equivocado» por pensar diferente — el objetivo es <strong>argumentar bien</strong>."
          ],
          imagen: "img/megafono.png",
          nota: "👉 Si alguien te convence con un buen argumento, puedes cambiarte de sitio. Eso también es parte del juego."
        },

        /* 05 / 15 */
        {
          tipo: "encuesta",
          rotulo: "DILEMA 2",
          titulo: "Posiciónate",
          afirmacion: "«Un menor de edad debería poder decidir tener una mascota propia, aunque sus padres no estén de acuerdo.»",
          opciones: ["De acuerdo", "En desacuerdo"],
          nota: "👉 Colócate según tu opinión. Piensa: ¿quién asume la responsabilidad legal si algo sale mal?"
        },

        /* 06 / 15 */
        {
          tipo: "sabias_que",
          rotulo: "UN DATO LEGAL IMPORTANTE",
          dato: "Padres o tutores",
          titulo: "son los responsables legales del animal",
          texto: "Aunque el animal «sea tuyo» emocionalmente, el seguro, el censo y las sanciones recaen legalmente en un adulto.",
          iconoImg: "img/mazo.png"
        },

        /* 07 / 15 */
        {
          tipo: "encuesta",
          rotulo: "DILEMA 3",
          titulo: "Posiciónate",
          afirmacion: "«Si veo a un amigo cuidando mal a su mascota por pura ignorancia (no por maldad), debo hablarlo con él antes de denunciarlo.»",
          opciones: ["De acuerdo", "En desacuerdo"],
          nota: "👉 Colócate en el aula. Piensa en la diferencia entre ignorancia y maltrato intencionado."
        },

        /* 08 / 15 */
        {
          tipo: "texto",
          rotulo: "PUESTA EN COMÚN",
          titulo: "¿Hablar primero o denunciar directamente?",
          parrafos: [
            "No hay una respuesta única: depende de la <strong>gravedad</strong>, del <strong>riesgo para el animal</strong> y de si hay tiempo para actuar."
          ],
          imagen: "img/alerta.png",
          nota: "👉 En los casos de riesgo vital inmediato, la prioridad siempre es actuar rápido (protocolo 112) — lo veremos en la Unidad 5."
        },

        /* 09 / 15 */
        {
          tipo: "lista",
          rotulo: "¿QUÉ ES UN HOGAR PREPARADO?",
          titulo: "Señales de que un hogar está listo para un animal",
          items: [
            {
              iconoImg: "img/casa.png",
              titulo: "Espacio y estabilidad",
              texto: "Un lugar fijo, sin previsión de mudanzas que no admitan animales."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Acuerdo familiar",
              texto: "Toda la familia está de acuerdo, no solo quien más lo desea."
            },
            {
              iconoImg: "img/cartera.png",
              titulo: "Capacidad de tiempo y dinero",
              texto: "Tiempo diario real y un colchón económico para imprevistos."
            }
          ]
        },

        /* 10 / 15 */
        {
          tipo: "reto",
          rotulo: "ACTIVIDAD EN GRUPO · 6 MIN",
          titulo: "El contrato de adopción familiar",
          descripcion: "En grupos de 3-4, redactad las 5 condiciones que, para vosotros, debería cumplir una familia antes de adoptar un animal.",
          minutos: 6,
          pasos: [
            "Debatid en grupo y llegad a un acuerdo sobre 5 condiciones clave.",
            "Ordenadlas de más a menos importante.",
            "Un portavoz por grupo comparte la condición número 1 de su lista."
          ]
        },

        /* 11 / 15 */
        {
          tipo: "encuesta",
          rotulo: "DILEMA 4 (EL MÁS DIFÍCIL)",
          titulo: "Posiciónate",
          afirmacion: "«Si mi familia se muda a un piso donde no admiten mascotas, lo más fácil es regalar al animal a quien sea, rápido.»",
          opciones: ["De acuerdo", "En desacuerdo"],
          nota: "👉 Colócate en el aula. Pensad: ¿qué alternativas éticas existen antes de llegar a esa opción?"
        },

        /* 12 / 15 */
        {
          tipo: "lista",
          rotulo: "ALTERNATIVAS ANTES DE RENDIRSE",
          titulo: "Opciones éticas ante una mudanza complicada",
          items: [
            {
              iconoImg: "img/casa.png",
              titulo: "Buscar piso que admita mascotas",
              texto: "Es una condición más a la hora de elegir vivienda, no un imprevisto de última hora."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Recurrir a familiares o amigos de confianza",
              texto: "Una acogida temporal o definitiva con alguien conocido es mejor que un abandono improvisado."
            },
            {
              iconoImg: "img/institucion.png",
              titulo: "Contactar con una protectora",
              texto: "Un traspaso responsable y gestionado siempre es preferible a «regalarlo a quien sea»."
            }
          ]
        },

        /* 13 / 15 */
        {
          tipo: "imagen",
          rotulo: "PARA REFLEXIONAR",
          titulo: "La ética no siempre es cómoda",
          imagen: "img/megafono.png",
          pie: "«Tomar una buena decisión no siempre es la más fácil ni la más barata. A veces es, simplemente, la más responsable.»",
          nota: "Los dilemas de hoy no tenían una única respuesta correcta — pero sí decisiones más y menos responsables."
        },

        /* 14 / 15 */
        {
          tipo: "lista",
          rotulo: "PONTE A PRUEBA",
          titulo: "Antes de seguir, comprobamos",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Quién es el responsable legal de un animal si su «dueño» es menor de edad?",
              texto: "✔ Sus padres o tutores legales."
            },
            {
              titulo: "2. ¿Es lo mismo ignorancia que maltrato intencionado?",
              texto: "✔ No — la forma de actuar puede variar, pero el bienestar del animal sigue siendo la prioridad."
            },
            {
              titulo: "3. ¿Qué deberíamos hacer antes de una mudanza si tenemos un animal?",
              texto: "✔ Buscar activamente alternativas (piso que admita mascotas, familiares, protectoras) antes de considerar el abandono."
            }
          ]
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "El debate no termina aquí.",
          subtitulo: "Ahora toca poner números sobre la mesa.",
          ideas: [
            "Posicionarse está bien; lo importante es argumentar y escuchar.",
            "El responsable legal del animal es siempre un adulto: padres o tutores.",
            "Un hogar preparado: estabilidad, acuerdo familiar, tiempo y dinero.",
            "Ante una mudanza hay alternativas éticas antes del abandono."
          ],
          siguiente: "En la próxima unidad: la simulación económica «Adoptar a Luna».",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 4 →"
        }

      ]
    },
    /* ============================ UNIDAD 4 ========================= */
    {
      id: "u4",
      numero: 4,
      titulo: "Simulación: adoptar a Luna",
      subtitulo: "Los números reales de cuidar a un animal",
      icono: "💶",
      iconoImg: "img/cartera.png",
      duracion: "45 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 4 · NADIE NACE SABIENDO CUIDAR",
          titulo: "Simulación:<br>adoptar a Luna",
          imagen: "img/cartera.png",
          nota: "Luna es una perra de 2 años que necesita un hogar. Hoy vais a simular, con números reales, qué significa adoptarla."
        },

        /* 02 / 15 */
        {
          tipo: "texto",
          rotulo: "CONOCE A LUNA",
          titulo: "Conoce a Luna",
          destacado: "2 años, mestiza, esterilizada. Esperanza de vida: 12-15 años más.",
          parrafos: [
            "A partir de ahora, cada decisión económica que toméis será <strong>«en nombre de Luna»</strong>."
          ],
          imagen: "img/perro.png",
          imagenAlt: ""
        },

        /* 03 / 15 */
        {
          tipo: "sabias_que",
          rotulo: "EL PRESUPUESTO VITAL",
          dato: "10.000 – 20.000 €",
          texto: "es lo que puede costar tener a Luna durante toda su vida (12-15 años).",
          iconoImg: "img/cartera.png",
          nota: "No es un gasto puntual: es un compromiso económico sostenido durante más de una década."
        },

        /* 04 / 15 */
        {
          tipo: "lista",
          rotulo: "GASTOS FIJOS ANUALES",
          titulo: "¿En qué se va el dinero cada año?",
          items: [
            {
              iconoImg: "img/perro.png",
              titulo: "Alimentación",
              texto: "Pienso de calidad adecuado a su edad y tamaño, todo el año."
            },
            {
              iconoImg: "img/alerta.png",
              titulo: "Veterinario y vacunas",
              texto: "Revisiones anuales, vacunación, desparasitación periódica."
            },
            {
              iconoImg: "img/mazo.png",
              titulo: "Seguro de responsabilidad civil",
              texto: "Obligatorio por la Ley 7/2023, cubre daños a terceros."
            }
          ]
        },

        /* 05 / 15 */
        {
          tipo: "texto",
          rotulo: "OBLIGACIÓN LEGAL · LEY 7/2023",
          titulo: "El seguro de responsabilidad civil",
          destacado: "Es obligatorio para perros: cubre los daños que el animal pueda causar a otras personas, animales o bienes.",
          parrafos: [
            "No tenerlo no es solo un riesgo económico — <strong>es una infracción sancionable</strong>."
          ],
          imagen: "img/mazo.png"
        },

        /* 06 / 15 */
        {
          tipo: "texto",
          rotulo: "OBLIGACIÓN LEGAL · MICROCHIP Y CENSO",
          titulo: "Identificar a Luna es obligatorio",
          destacado: "El microchip identifica al animal de por vida, y el censo municipal registra quién es su responsable legal.",
          parrafos: [
            "Sin esto, Luna no puede «existir» oficialmente para el ayuntamiento — y su adulto responsable puede ser sancionado."
          ],
          imagen: "img/institucion.png"
        },

        /* 07 / 15 */
        {
          tipo: "reto",
          rotulo: "SIMULACIÓN EN EQUIPO · 15 MIN",
          titulo: "Los sobres de imprevistos",
          descripcion: "Cada equipo recibe un presupuesto inicial simulado y varios «sobres» con imprevistos que Luna puede tener a lo largo de su vida.",
          minutos: 15,
          pasos: [
            "Formad equipos de 3-4. Recibiréis un presupuesto inicial (dinero ficticio) y un fondo de ahorro.",
            "Abrid un sobre cada vez y decidid en equipo cómo resolver el imprevisto con vuestro presupuesto.",
            "Anotad qué decisión tomasteis y qué le pasó a Luna en cada caso."
          ],
          premio: "💡 No hay trampa: a veces no llegaréis a cubrir todo. El objetivo es sentir la presión real de la responsabilidad económica."
        },

        /* 08 / 15 */
        {
          tipo: "tarjetas",
          rotulo: "SOBRE 1",
          titulo: "Luna se rompe una pata jugando",
          instruccion: "Decidid primero en equipo. Después, tocad la tarjeta para ver la reflexión.",
          tarjetas: [
            {
              frenteRotulo: "EL IMPREVISTO",
              frenteImg: "img/alerta.png",
              frente: "El veterinario cuesta 800 €. Tenéis 200 € ahorrados en el fondo de emergencia del equipo. ¿Qué hacéis?",
              dorsoRotulo: "LA REFLEXIÓN",
              dorsoImg: "img/cartera.png",
              dorso: "Con 200 € no se cubren 800 €: hay que recortar de otras partidas, pedir ayuda o fraccionar el pago. Por eso el fondo de emergencia se llena <strong>antes</strong> de que llegue la urgencia."
            }
          ]
        },

        /* 09 / 15 */
        {
          tipo: "tarjetas",
          rotulo: "SOBRE 2",
          titulo: "Vais a mudaros y el nuevo piso exige seguro al día",
          instruccion: "Decidid primero en equipo. Después, tocad la tarjeta para ver la reflexión.",
          tarjetas: [
            {
              frenteRotulo: "EL IMPREVISTO",
              frenteImg: "img/casa.png",
              frente: "Descubrís que no renovasteis el seguro de responsabilidad civil el año pasado para ahorrar. ¿Cómo lo resolvéis?",
              dorsoRotulo: "LA REFLEXIÓN",
              dorsoImg: "img/mazo.png",
              dorso: "Ahorrar en el seguro sale caro: hay que renovarlo sí o sí, porque además de bloquear la mudanza, no tenerlo es una <strong>infracción sancionable</strong>."
            }
          ]
        },

        /* 10 / 15 */
        {
          tipo: "tarjetas",
          rotulo: "SOBRE 3",
          titulo: "Luna cumple 10 años y necesita una dieta especial más cara",
          instruccion: "Decidid primero en equipo. Después, tocad la tarjeta para ver la reflexión.",
          tarjetas: [
            {
              frenteRotulo: "EL IMPREVISTO",
              frenteImg: "img/perro.png",
              frente: "Es un gasto permanente, no puntual. ¿Ajustáis otra partida del presupuesto?",
              dorsoRotulo: "LA REFLEXIÓN",
              dorsoImg: "img/cartera.png",
              dorso: "Un gasto permanente obliga a rehacer el presupuesto mensual para el resto de su vida. Envejecer no es un imprevisto: <strong>es parte del compromiso</strong>."
            }
          ]
        },

        /* 11 / 15 */
        {
          tipo: "texto",
          rotulo: "PUESTA EN COMÚN",
          titulo: "¿Cómo os ha ido con Luna?",
          parrafos: [
            "Cada equipo comparte brevemente un imprevisto que le costó resolver y cómo lo solucionó (o no pudo)."
          ],
          imagen: "img/megafono.png",
          nota: "👉 Sed honestos: si algún equipo se quedó sin presupuesto, es una oportunidad para hablar de qué fallo previo lo causó."
        },

        /* 12 / 15 */
        {
          tipo: "imagen",
          rotulo: "LA IDEA MÁS IMPORTANTE DE LA UNIDAD",
          titulo: "Los problemas imprevistos<br>nunca justifican el abandono",
          imagen: "img/prohibido.png",
          pie: "«El compromiso es para siempre.»",
          nota: "Por eso hay que planificar antes de adoptar, no improvisar después."
        },

        /* 13 / 15 */
        {
          tipo: "lista",
          rotulo: "CÓMO PREPARARSE DE VERDAD",
          titulo: "Antes de adoptar, prepara esto",
          items: [
            {
              iconoImg: "img/cartera.png",
              titulo: "Un fondo de emergencia",
              texto: "Ahorro específico para imprevistos veterinarios, aparte del gasto mensual habitual."
            },
            {
              iconoImg: "img/institucion.png",
              titulo: "Seguro y papeles al día",
              texto: "Seguro de RC, microchip y censo municipal, revisados cada año."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Informarte antes de decidir",
              texto: "Habla con veterinarios, protectoras o familias con experiencia antes de dar el paso."
            }
          ]
        },

        /* 14 / 15 */
        {
          tipo: "lista",
          rotulo: "PONTE A PRUEBA",
          titulo: "Antes de seguir, comprobamos",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Cuánto puede costar tener un animal a lo largo de su vida?",
              texto: "✔ Entre 10.000 € y 20.000 €, en 12-15 años."
            },
            {
              titulo: "2. ¿Qué cubre el seguro de responsabilidad civil obligatorio?",
              texto: "✔ Los daños que el animal pueda causar a terceros, personas u otros bienes."
            },
            {
              titulo: "3. ¿Qué deberíamos tener antes de adoptar, además de cariño?",
              texto: "✔ Un presupuesto realista, seguro, microchip/censo y un fondo de emergencia."
            }
          ]
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "Ya sabes lo que cuesta cuidar a Luna.",
          subtitulo: "Ahora, ¿qué dice la ley si algo sale mal?",
          ideas: [
            "Cuidar a un animal cuesta 10.000-20.000 € en 12-15 años.",
            "Seguro de RC, microchip y censo municipal son obligatorios.",
            "Sin fondo de emergencia, un imprevisto rompe el presupuesto.",
            "Ningún imprevisto justifica el abandono: se planifica antes."
          ],
          siguiente: "En la próxima unidad: el marco legal en Canarias y el protocolo ante el maltrato.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 5 →"
        }

      ]
    },

    /* ============================ UNIDAD 5 ========================= */
    {
      id: "u5",
      numero: 5,
      titulo: "La ley en Canarias y qué hacer ante el maltrato",
      subtitulo: "Tres niveles de norma y el protocolo de actuación",
      icono: "🏛️",
      iconoImg: "img/mazo.png",
      duracion: "45 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 5 · NADIE NACE SABIENDO CUIDAR",
          titulo: "La ley en Canarias y qué<br>hacer ante el maltrato",
          imagen: "img/mazo.png",
          nota: "Tres niveles de ley, un concurso para ponerlos a prueba, y un protocolo para actuar si hace falta."
        },

        /* 02 / 15 */
        {
          tipo: "lista",
          rotulo: "TRES NIVELES, UNA SOLA PROTECCIÓN",
          titulo: "¿Quién hace las normas?",
          items: [
            {
              iconoImg: "img/institucion.png",
              titulo: "Estatal",
              texto: "<strong>Ley 7/2023</strong>: microchip, seguro RC obligatorio, prohibición de venta en tiendas físicas."
            },
            {
              iconoImg: "img/mazo.png",
              titulo: "Autonómico (Canarias)",
              texto: "<strong>Ley 8/1991 y Decreto 117/1995</strong>: obligaciones generales de tenencia y sus sanciones."
            },
            {
              iconoImg: "img/ubicacion.png",
              titulo: "Municipal (La Laguna)",
              texto: "<strong>Ordenanza local</strong>: edad mínima, ataduras, ruidos y deyecciones."
            }
          ]
        },

        /* 03 / 15 */
        {
          tipo: "texto",
          rotulo: "NIVEL ESTATAL · LEY 7/2023",
          titulo: "La base para toda España",
          destacado: "Marca el mínimo común: microchip obligatorio, seguro de responsabilidad civil, prohibición de venta y exposición en tiendas físicas.",
          parrafos: [
            "Las comunidades autónomas y los ayuntamientos pueden añadir <strong>más</strong> exigencias, nunca menos."
          ],
          imagen: "img/institucion.png"
        },

        /* 04 / 15 */
        {
          tipo: "texto",
          rotulo: "NIVEL AUTONÓMICO · LEY 8/1991 Y DECRETO 117/1995",
          titulo: "Las reglas propias de Canarias",
          destacado: "Regulan obligaciones generales de tenencia responsable en el archipiélago, y desarrollan el régimen de sanciones autonómico.",
          parrafos: [
            "Son normas anteriores a la ley estatal, pero <strong>siguen vigentes</strong> en todo lo que no contradiga a la Ley 7/2023."
          ],
          imagen: "img/mazo.png"
        },

        /* 05 / 15 */
        {
          tipo: "texto",
          rotulo: "NIVEL MUNICIPAL · ORDENANZA DE LA LAGUNA",
          titulo: "Las reglas de tu propia calle",
          destacado: "Prohíbe vender o donar animales a menores de 18 años, regula ataduras (mínimo 2 metros), ruidos y la recogida de deyecciones.",
          parrafos: [
            "Es la norma más cercana a tu día a día — y la que más fácilmente puedes ayudar a que se cumpla."
          ],
          imagen: "img/ubicacion.png"
        },

        /* 06 / 15 */
        {
          tipo: "reto",
          rotulo: "CONCURSO EN EQUIPO",
          titulo: "¿Legal o ilegal?",
          descripcion: "Por equipos, vais a levantar una tarjeta LEGAL o ILEGAL para cada caso. Un punto por acierto, un punto extra por justificar bien.",
          pasos: [
            "Formad equipos y preparad vuestras tarjetas de colores (verde = LEGAL, roja = ILEGAL).",
            "Para cada caso, debatid 15 segundos en equipo y levantad vuestra tarjeta a la vez.",
            "El equipo que acierte y justifique mejor su respuesta gana el punto extra."
          ]
        },

        /* 07 / 15 */
        {
          tipo: "pregunta",
          rotulo: "CASO 1 DEL CONCURSO",
          titulo: "¿Legal o ilegal?",
          enunciado: "Dejar al perro atado en el patio con una cuerda de metro y medio para que no moleste.",
          opciones: [
            { texto: "LEGAL" },
            { texto: "ILEGAL", correcta: true }
          ],
          veredicto: "VEREDICTO: ILEGAL",
          explicacion: "La atadura debe medir mínimo 3 veces la longitud del animal, nunca menos de 2 metros."
        },

        /* 08 / 15 */
        {
          tipo: "pregunta",
          rotulo: "CASO 2 DEL CONCURSO",
          titulo: "¿Legal o ilegal?",
          enunciado: "No recoger los excrementos del perro porque «total, es abono para el césped del jardín».",
          opciones: [
            { texto: "LEGAL" },
            { texto: "ILEGAL", correcta: true }
          ],
          veredicto: "VEREDICTO: ILEGAL",
          explicacion: "En La Laguna es una infracción <strong>GRAVE</strong>, no leve. La multa puede llegar hasta 1.502,53 €."
        },

        /* 09 / 15 */
        {
          tipo: "pregunta",
          rotulo: "CASO 3 DEL CONCURSO",
          titulo: "¿Legal o ilegal?",
          enunciado: "Llevar al perro al parque infantil, atado con una correa muy corta para que no se acerque a los niños.",
          opciones: [
            { texto: "LEGAL" },
            { texto: "ILEGAL", correcta: true }
          ],
          veredicto: "VEREDICTO: ILEGAL",
          explicacion: "La ordenanza prohíbe el acceso y permanencia de animales en áreas de juego infantil, incluso atados."
        },

        /* 10 / 15 */
        {
          tipo: "pregunta",
          rotulo: "CASO 4 DEL CONCURSO",
          titulo: "¿Legal o ilegal?",
          enunciado: "Ves a un perro sufriendo maltrato evidente y decides denunciarlo, aunque no seas el dueño ni conozcas a nadie implicado.",
          opciones: [
            { texto: "LEGAL", correcta: true },
            { texto: "ILEGAL" }
          ],
          veredicto: "VEREDICTO: NO SOLO LEGAL: ES TU DEBER",
          explicacion: "No solo legal: es tu deber. La ordenanza reconoce a toda persona el deber de denunciar los incumplimientos que presencie. No es «meterse donde no te llaman»."
        },

        /* 11 / 15 */
        {
          tipo: "imagen",
          rotulo: "FIN DEL CONCURSO",
          titulo: "¡Buen trabajo, equipo ganador!",
          imagen: "img/destello.png",
          pie: "«Conocer la ley no es solo para aprobar un examen: es la herramienta que usaréis si algún día tenéis que actuar de verdad.»"
        },

        /* 12 / 15 */
        {
          tipo: "tarjetas",
          rotulo: "SI VES MALTRATO REAL",
          titulo: "El protocolo de las 4 «P»",
          instruccion: "Toca cada tarjeta para ver qué significa.",
          tarjetas: [
            {
              frenteRotulo: "1.ª P",
              frente: "Protégete",
              dorsoRotulo: "QUÉ SIGNIFICA",
              dorso: "Nunca te enfrentes al agresor ni entres a propiedades privadas. Es peligroso e invalida el caso."
            },
            {
              frenteRotulo: "2.ª P",
              frente: "Pruebas",
              dorsoRotulo: "QUÉ SIGNIFICA",
              dorso: "Graba vídeos o fotos desde lejos. Anota ubicación exacta, matrícula, fecha y hora."
            },
            {
              frenteRotulo: "3.ª P",
              frente: "Policía (112 / 092 / 062)",
              dorsoRotulo: "QUÉ SIGNIFICA",
              dorso: "Emergencias, Policía Local o Seprona. Dar datos objetivos es tu mejor arma."
            },
            {
              frenteRotulo: "4.ª P",
              frente: "Paciencia",
              dorsoRotulo: "QUÉ SIGNIFICA",
              dorso: "La burocracia institucional es lenta, pero tu denuncia formal queda registrada."
            }
          ]
        },

        /* 13 / 15 */
        {
          tipo: "reto",
          rotulo: "ROLEPLAY · POR PAREJAS",
          titulo: "Simulacro de llamada al 112",
          descripcion: "Una persona hace de «operador/a de emergencias», la otra de testigo que llama para reportar un caso de maltrato.",
          pasos: [
            "Elegid quién llama y quién opera la centralita. El testigo debe aplicar la regla de las 4 P.",
            "La llamada debe incluir: ubicación exacta, descripción del animal y de la situación, y si hay peligro presente.",
            "Intercambiad los papeles y repetid con un caso distinto."
          ],
          premio: "🎯 El profesor evaluará esta simulación como parte de la prueba práctica del programa."
        },

        /* 14 / 15 */
        {
          tipo: "lista",
          rotulo: "PONTE A PRUEBA",
          titulo: "Antes de seguir, comprobamos",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Qué ley exige el seguro de responsabilidad civil obligatorio?",
              texto: "✔ La Ley 7/2023, de ámbito estatal."
            },
            {
              titulo: "2. ¿Cuánto puede costar no recoger las cacas de tu perro en La Laguna?",
              texto: "✔ Hasta 1.502,53 €: es infracción GRAVE, no leve."
            },
            {
              titulo: "3. ¿Cuál es la primera «P» del protocolo ante el maltrato?",
              texto: "✔ Protégete: nunca te enfrentes al agresor."
            }
          ]
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "Ya conoces la ley y el protocolo.",
          subtitulo: "Ahora, conviértelo en un mensaje para otros.",
          ideas: [
            "Tres niveles de norma: estatal, autonómico (Canarias) y municipal.",
            "La ordenanza de La Laguna: edad, ataduras, ruidos y deyecciones.",
            "No recoger los excrementos en La Laguna: hasta 1.502,53 €.",
            "Ante el maltrato, las 4 P: Protégete, Pruebas, Policía, Paciencia."
          ],
          siguiente: "En la próxima unidad: vuestro propio reto creativo de sensibilización.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 6 →"
        }

      ]
    },
    /* ============================ UNIDAD 6 ========================= */
    {
      id: "u6",
      numero: 6,
      titulo: "Tu turno: activismo y reto creativo",
      subtitulo: "Crear un mensaje que cambie opiniones",
      icono: "✨",
      iconoImg: "img/destello.png",
      duracion: "50 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 6 · NADIE NACE SABIENDO CUIDAR",
          titulo: "Tu turno: activismo<br>y reto creativo",
          imagen: "img/destello.png",
          nota: "Ya tenéis los datos y la ley. Ahora vais a crear un mensaje capaz de cambiar la opinión de alguien de vuestra edad."
        },

        /* 02 / 15 */
        {
          tipo: "texto",
          rotulo: "PARA ARRANCAR",
          titulo: "¿Qué mensaje te haría cambiar de opinión a ti?",
          parrafos: [
            "Piensa en una campaña, anuncio o vídeo que realmente te haya hecho reflexionar alguna vez (de cualquier tema)."
          ],
          imagen: "img/megafono.png",
          nota: "👉 Compártelo en 10 segundos con la persona de al lado: ¿qué tenía ese mensaje que funcionó contigo?"
        },

        /* 03 / 15 */
        {
          tipo: "imagen",
          rotulo: "LA IDEA DETRÁS DEL RETO",
          titulo: "Las leyes no cambian a la sociedad",
          imagen: "img/megafono.png",
          pie: "«Las leyes no cambian a la sociedad: la sociedad exige las leyes.»",
          nota: "Vuestro mensaje puede ser el primer paso de ese cambio. No hace falta ser adulto ni tener seguidores para influir en tu entorno inmediato."
        },

        /* 04 / 15 */
        {
          tipo: "lista",
          rotulo: "LAS 3 REGLAS DE ORO",
          titulo: "Antes de crear nada, esto es innegociable",
          items: [
            {
              iconoImg: "img/realidad.png",
              titulo: "Regla 1 · Dato verificable",
              texto: "Usa un dato real de los que hemos visto (ej. el 15 % de camadas no deseadas), citando la fuente."
            },
            {
              iconoImg: "img/diana.png",
              titulo: "Regla 2 · Acción concreta",
              texto: "Propón algo que la persona pueda hacer ya (ej. «adopta, no compres»)."
            },
            {
              iconoImg: "img/prohibido.png",
              titulo: "Regla 3 · Cero sangre",
              texto: "Sin imágenes de maltrato ni sufrimiento explícito. Impacta con inteligencia, no con morbo."
            }
          ]
        },

        /* 05 / 15 */
        {
          tipo: "lista",
          rotulo: "ELIGE TU FORMATO",
          titulo: "Tres maneras de hacer llegar tu mensaje",
          items: [
            {
              iconoImg: "img/destello.png",
              titulo: "Vídeo vertical (30 s)",
              texto: "Formato tipo TikTok o Reel: rápido, directo, pensado para móvil."
            },
            {
              iconoImg: "img/diana.png",
              titulo: "Cartel A3",
              texto: "Impacto visual inmediato para pasillos del instituto o tablones informativos."
            },
            {
              iconoImg: "img/megafono.png",
              titulo: "Cuña de radio",
              texto: "Un mensaje de audio breve, ideal para megafonía del centro o pódcast."
            }
          ]
        },

        /* 06 / 15 */
        {
          tipo: "lista",
          rotulo: "SI ELIGES VÍDEO VERTICAL",
          titulo: "Trucos para los primeros 3 segundos",
          items: [
            {
              iconoImg: "img/destello.png",
              titulo: "Engancha ya",
              texto: "Empieza con una pregunta o dato sorprendente, no con una introducción larga."
            },
            {
              iconoImg: "img/realidad.png",
              titulo: "Subtítulos siempre",
              texto: "Mucha gente ve vídeos sin sonido — que se entienda igualmente."
            },
            {
              iconoImg: "img/diana.png",
              titulo: "Cierra con una acción",
              texto: "Termina diciendo exactamente qué quieres que haga quien lo vea."
            }
          ]
        },

        /* 07 / 15 */
        {
          tipo: "lista",
          rotulo: "SI ELIGES CARTEL A3",
          titulo: "Menos es más",
          items: [
            {
              iconoImg: "img/diana.png",
              titulo: "Un único mensaje central",
              texto: "Si intentas decirlo todo, no se entiende nada desde lejos."
            },
            {
              iconoImg: "img/destello.png",
              titulo: "Jerarquía visual clara",
              texto: "Lo más importante, más grande; los detalles, más pequeños."
            },
            {
              iconoImg: "img/ubicacion.png",
              titulo: "Incluye un contacto o QR",
              texto: "Facilita que quien se interese pueda dar el siguiente paso."
            }
          ]
        },

        /* 08 / 15 */
        {
          tipo: "lista",
          rotulo: "SI ELIGES CUÑA DE RADIO",
          titulo: "El poder de la voz",
          items: [
            {
              iconoImg: "img/megafono.png",
              titulo: "Guion breve y ensayado",
              texto: "15-20 segundos leídos con naturalidad, no de carrerilla."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Tono cercano, no de sermón",
              texto: "Habla como le hablarías a un amigo, no como una charla oficial."
            },
            {
              iconoImg: "img/diana.png",
              titulo: "Repite la acción al final",
              texto: "Que la última frase sea la llamada a la acción, para que se quede en la memoria."
            }
          ]
        },

        /* 09 / 15 */
        {
          tipo: "reto",
          rotulo: "TALLER EN EQUIPO · 30 MIN",
          titulo: "Manos a la obra",
          descripcion: "Formad equipos de 3-4 personas y poneos de acuerdo antes de empezar a crear.",
          minutos: 30,
          pasos: [
            "Elegid formato (vídeo, cartel o cuña) y el dato concreto que vais a usar como base.",
            "Definid la acción concreta que le pediréis a quien vea/oiga vuestra pieza.",
            "Repartíos roles (guion, diseño/grabación, revisión de las 3 reglas) y empezad a trabajar."
          ]
        },

        /* 10 / 15 */
        {
          tipo: "texto",
          rotulo: "FEEDBACK CRUZADO",
          titulo: "Intercambio de ideas a mitad de camino",
          parrafos: [
            "Cada equipo enseña su borrador a otro equipo durante 2 minutos."
          ],
          imagen: "img/personas.png",
          nota: "👉 El equipo que escucha da un comentario positivo y una sugerencia de mejora, aplicando las 3 reglas de oro."
        },

        /* 11 / 15 */
        {
          tipo: "lista",
          rotulo: "CÓMO SE EVALUARÁ",
          titulo: "La rúbrica del reto creativo",
          items: [
            {
              iconoImg: "img/realidad.png",
              titulo: "Rigor",
              texto: "¿El dato usado es real y está bien citado?"
            },
            {
              iconoImg: "img/diana.png",
              titulo: "Propuesta de acción",
              texto: "¿Queda claro qué debe hacer quien vea la pieza?"
            },
            {
              iconoImg: "img/prohibido.png",
              titulo: "Respeto",
              texto: "¿Se ha evitado el morbo y las imágenes explícitas, tal como pide la Regla 3?"
            }
          ]
        },

        /* 12 / 15 */
        {
          tipo: "imagen",
          rotulo: "ANTES DE PRESENTAR",
          titulo: "Un buen mensaje no necesita<br>asustar para convencer",
          imagen: "img/prohibido.png",
          pie: "«El impacto real viene de la claridad del dato y de lo concreto de la acción propuesta, no del morbo.»"
        },

        /* 13 / 15 */
        {
          tipo: "reto",
          rotulo: "PRESENTACIÓN FINAL",
          titulo: "Cada equipo presenta su pieza",
          descripcion: "Turno de presentaciones ante toda la clase (2 minutos por equipo).",
          pasos: [
            "Presentad vuestra pieza y el dato en el que se basa.",
            "Explicad en una frase la acción concreta que proponéis.",
            "El resto de la clase puede hacer una pregunta o comentario breve al terminar."
          ]
        },

        /* 14 / 15 */
        {
          tipo: "lista",
          rotulo: "PONTE A PRUEBA",
          titulo: "Antes de cerrar, comprobamos",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Qué debe tener siempre vuestra pieza de sensibilización?",
              texto: "✔ Un dato verificable citado, una acción concreta, y cero imágenes explícitas."
            },
            {
              titulo: "2. ¿Por qué son importantes los primeros 3 segundos en un vídeo vertical?",
              texto: "✔ Porque es el tiempo que tienes para enganchar antes de que la persona pase al siguiente contenido."
            },
            {
              titulo: "3. ¿Qué es más efectivo, el morbo o la claridad?",
              texto: "✔ La claridad del dato y de la acción propuesta — el morbo puede generar rechazo en vez de cambio real."
            }
          ]
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "Habéis creado algo real.",
          subtitulo: "Ahora falta el último paso: el tuyo.",
          ideas: [
            "Las leyes no cambian a la sociedad: la sociedad exige las leyes.",
            "Dato verificable citado, acción concreta y cero imágenes explícitas.",
            "Cada formato tiene sus reglas: vídeo, cartel o cuña de radio.",
            "Se evalúa el rigor, la claridad de la acción y el respeto."
          ],
          siguiente: "En la última unidad: tu compromiso personal a 30 días y los recursos de tu municipio.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 7 →"
        }

      ]
    },

    /* ============================ UNIDAD 7 ========================= */
    {
      id: "u7",
      numero: 7,
      titulo: "Tu compromiso ciudadano y los recursos de tu ciudad",
      subtitulo: "El compromiso a 30 días",
      icono: "🎯",
      iconoImg: "img/diana.png",
      duracion: "30 min",
      diapositivas: [

        /* 01 / 15 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 7 · NADIE NACE SABIENDO CUIDAR",
          titulo: "Tu compromiso ciudadano<br>y los recursos de tu ciudad",
          imagen: "img/diana.png",
          nota: "Cerramos el programa con lo más importante: qué vas a hacer tú a partir de mañana."
        },

        /* 02 / 15 */
        {
          tipo: "lista",
          rotulo: "TODO LO QUE HEMOS VISTO",
          titulo: "Un repaso relámpago",
          items: [
            {
              iconoImg: "img/huella.png",
              titulo: "Realidad y mitos",
              texto: "285.000 ingresos al año — y la causa real no es el verano."
            },
            {
              iconoImg: "img/perro.png",
              titulo: "Bienestar animal",
              texto: "Las 5 Libertades y por qué querer no siempre es cuidar."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Ética y ley",
              texto: "Dilemas sin respuesta fácil, presupuestos reales y tres niveles de norma."
            }
          ]
        },

        /* 03 / 15 */
        {
          tipo: "lista",
          rotulo: "Y TAMBIÉN...",
          titulo: "La parte más práctica del programa",
          items: [
            {
              iconoImg: "img/cartera.png",
              titulo: "Adoptar a Luna",
              texto: "Presupuestos reales, imprevistos y por qué nunca justifican el abandono."
            },
            {
              iconoImg: "img/mazo.png",
              titulo: "Ley y protocolo 112",
              texto: "Tres niveles de norma, un concurso legal y la regla de las 4 P."
            },
            {
              iconoImg: "img/destello.png",
              titulo: "Activismo creativo",
              texto: "Vuestras propias piezas de sensibilización, con datos y sin morbo."
            }
          ]
        },

        /* 04 / 15 */
        {
          tipo: "imagen",
          rotulo: "ANTES DE TERMINAR",
          titulo: "La información sin acción no sirve",
          imagen: "img/megafono.png",
          pie: "«El problema es gigante, pero tu rango de acción es tuyo.»",
          nota: "No podéis resolver el abandono animal solos — pero sí podéis dejar de formar parte del problema. Y eso, multiplicado por todos vosotros, ya es un cambio real."
        },

        /* 05 / 15 */
        {
          tipo: "lista",
          rotulo: "RECURSOS EN SAN CRISTÓBAL DE LA LAGUNA",
          titulo: "A quién acudir si lo necesitas",
          items: [
            {
              iconoImg: "img/alerta.png",
              titulo: "Emergencias: 112 / 092 / 062",
              texto: "Emergencias generales, Policía Local y Seprona, para casos de maltrato o riesgo vital."
            },
            {
              iconoImg: "img/institucion.png",
              titulo: "Concejalía de Bienestar Animal",
              texto: "Información oficial, censo municipal y programas de educación y voluntariado."
            },
            {
              iconoImg: "img/casa.png",
              titulo: "Protectoras locales",
              texto: "Adopción, voluntariado juvenil y campañas de sensibilización en el municipio."
            }
          ]
        },

        /* 06 / 15 */
        {
          tipo: "lista",
          rotulo: "CUATRO FORMAS DE PASAR A LA ACCIÓN",
          titulo: "Elige tu paso posible",
          items: [
            {
              iconoImg: "img/casa.png",
              titulo: "Auditoría en casa",
              texto: "Comprobar con tu familia que el microchip y el censo de vuestro animal están actualizados."
            },
            {
              iconoImg: "img/personas.png",
              titulo: "Influencia familiar",
              texto: "Convencer a tu familia de las ventajas médicas y éticas de la esterilización."
            },
            {
              iconoImg: "img/prohibido.png",
              titulo: "Frenar el impulso",
              texto: "Explicarle a un amigo por qué NO debe comprar un cachorro por capricho."
            },
            {
              iconoImg: "img/diana.png",
              titulo: "Pasar a la acción",
              texto: "Buscar información sobre voluntariado juvenil en protectoras locales."
            }
          ]
        },

        /* 07 / 15 */
        {
          tipo: "reto",
          rotulo: "ACTIVIDAD INDIVIDUAL · 8 MIN",
          titulo: "Tu tarjeta «Mi paso posible»",
          descripcion: "Vas a rellenar una tarjeta con un compromiso real y concreto para los próximos 30 días.",
          minutos: 8,
          pasos: [
            "Elige UNA sola acción de las cuatro que hemos visto (no hace falta hacerlas todas).",
            "Escríbela en tu tarjeta de forma concreta: qué, cuándo y cómo la vas a cumplir.",
            "Guarda la tarjeta en un lugar donde la veas a menudo (estuche, agenda, nevera de casa)."
          ]
        },

        /* 08 / 15 */
        {
          tipo: "sabias_que",
          rotulo: "TU TARJETA · MI PASO POSIBLE",
          dato: "30 días",
          titulo: "1 acción · 0 excusas",
          texto: "Campos de la tarjeta: mi acción, fecha límite, cómo sabré que lo he cumplido, a quién se lo voy a contar.",
          iconoImg: "img/diana.png"
        },

        /* 09 / 15 */
        {
          tipo: "texto",
          rotulo: "COMPROMISO EN VOZ ALTA",
          titulo: "Compártelo con la persona de al lado",
          parrafos: [
            "Contar un compromiso en voz alta lo hace más real y más difícil de olvidar."
          ],
          imagen: "img/personas.png",
          nota: "👉 Leedle vuestra tarjeta a la persona de al lado. Ella será quien os lo recuerde dentro de un mes si os ve."
        },

        /* 10 / 15 */
        {
          tipo: "lista",
          rotulo: "¿QUIERES IR MÁS ALLÁ?",
          titulo: "Cómo hacerte voluntario juvenil",
          items: [
            {
              iconoImg: "img/casa.png",
              titulo: "Protectoras locales",
              texto: "Muchas aceptan voluntariado juvenil, a veces acompañado de un adulto, para tareas de apoyo."
            },
            {
              iconoImg: "img/institucion.png",
              titulo: "Concejalía de Bienestar Animal",
              texto: "Pregunta por programas municipales de educación y voluntariado juvenil."
            },
            {
              iconoImg: "img/megafono.png",
              titulo: "Campañas puntuales",
              texto: "Recogidas de material, jornadas de adopción, difusión en redes: formas de empezar sin compromiso largo."
            }
          ]
        },

        /* 11 / 15 */
        {
          tipo: "sabias_que",
          rotulo: "MAPA DE RECURSOS",
          dato: "112 · 092 · 062",
          titulo: "Guarda estos contactos en tu móvil ahora mismo",
          texto: "112 (Emergencias) · 092 (Policía Local) · 062 (Seprona) · Concejalía de Bienestar Animal de tu ayuntamiento.",
          iconoImg: "img/ubicacion.png"
        },

        /* 12 / 15 */
        {
          tipo: "lista",
          rotulo: "REPASO FINAL DEL PROGRAMA",
          titulo: "Un último repaso de todo el curso",
          instruccion: "Pulsa para ir mostrando cada respuesta.",
          items: [
            {
              titulo: "1. ¿Cuál es la causa número 1 de abandono animal?",
              texto: "✔ Las camadas no deseadas (15 %), no las vacaciones de verano."
            },
            {
              titulo: "2. ¿Qué son las 5 Libertades del bienestar animal?",
              texto: "✔ Hambre y sed, incomodidad, dolor/enfermedad, miedo/angustia, y comportamiento natural."
            },
            {
              titulo: "3. ¿Qué debes hacer si presencias maltrato animal?",
              texto: "✔ Aplicar la regla de las 4 P: Protégete, Pruebas, Policía (112/092/062), Paciencia."
            }
          ]
        },

        /* 13 / 15 */
        {
          tipo: "texto",
          rotulo: "REFLEXIÓN FINAL",
          titulo: "¿Qué te llevas de estas 5 horas?",
          parrafos: [
            "Puede ser un dato, una frase, un caso que te haya marcado, o simplemente una idea nueva."
          ],
          imagen: "img/huella.png",
          nota: "👉 Quien quiera, comparte una frase en voz alta antes de cerrar el programa."
        },

        /* 14 / 15 */
        {
          tipo: "imagen",
          rotulo: "¡ENHORABUENA!",
          titulo: "Has completado el programa<br>«Nadie nace sabiendo cuidar»",
          imagen: "img/destello.png",
          pie: "Recibirás tu certificado de asistencia y aprovechamiento según lo evaluado durante las 5 horas del curso."
        },

        /* 15 / 15 */
        {
          tipo: "cierre",
          rotulo: "FIN DEL PROGRAMA",
          titulo: "Nadie nace sabiendo cuidar.",
          subtitulo: "Pero hoy, ya sabéis por dónde empezar.",
          ideas: [
            "El abandono tiene causas evitables: camadas y compra impulsiva.",
            "Cuidar es garantizar las 5 Libertades, no solo dar cariño.",
            "Adoptar es un compromiso económico y legal de más de una década.",
            "Ante el maltrato: las 4 P y los teléfonos 112 / 092 / 062."
          ],
          nota: "Gracias por vuestra participación activa durante todo el programa."
        }

      ]
    }

  ]
};
