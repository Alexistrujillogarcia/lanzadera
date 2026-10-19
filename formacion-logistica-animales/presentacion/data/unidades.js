/* =======================================================================
   DATOS DE LA PRESENTACIÓN — «Formación sobre Logística y acogida de animales»
   -----------------------------------------------------------------------
   Este archivo ES el contenido. No hace falta tocar app.js ni index.html
   para cambiar el título, los colores, las unidades o las diapositivas.

   Se carga con <script src="data/unidades.js"> en lugar de fetch()+JSON
   para que la presentación funcione también abriendo index.html con
   doble clic (protocolo file://).

   Fuentes (texto íntegro en unidades/texto/):
     · Píldora de Víctor «Catálogo de medios y recursos para evacuar
       animales» (10 diapositivas con notas del orador).
     · Decreto 195/2022 (Anexo 8 del PLATECA: Protocolo de actuación
       frente a los animales ante emergencias de Protección Civil).
     · PEMU de Guía de Isora: apdo. 4.6.1 (Grupo de Logística) y
       apdo. 2.2.8.2 (Ganadería).

   Los textos redactados de nuevo (no copiados de las fuentes) llevan el
   comentario «NUEVO: …» para que los autores los validen.

   Validar:  node <skill>/scripts/validar_unidades.mjs data/unidades.js
   ======================================================================= */

window.UNIDADES = {

  /* ---------------------------------------------------------------- */
  /* CONFIGURACIÓN GENERAL                                            */
  /* ---------------------------------------------------------------- */
  config: {
    titulo: "Formación sobre Logística y acogida de animales",
    subtitulo: "Píldora formativa · 4 unidades · Protocolo de animales en emergencias (Decreto 195/2022)",
    autor: "Víctor [apellidos, Seprona] · Alexis Trujillo",
    municipio: "Guía de Isora (Tenerife) · Canarias",
    distintivo: "Para ayuntamientos y universidad",
    descripcion: "Píldora formativa sobre qué medios y recursos debe tener catalogados un ayuntamiento para evacuar y acoger animales en emergencias, según el Decreto 195/2022.",
    favicon: "img/huella.png",

    colorPrimario: "#2F6B4F",
    colorPrimarioOscuro: "#1F3A2E",
    colorAcento: "#C99A2E",
    colorTexto: "#1F3A2E",
    colorTextoSuave: "#4F6B5E",
    colorFondo: "#EEF3EF",
    colorRojo: "#A8402B",
    colorRojoFondo: "#F6E3DE",
    colorRojoTexto: "#6B2416",
    colorVerde: "#1F5A3C",
    colorVerdeFondo: "#DDEFE3"
  },

  /* ---------------------------------------------------------------- */
  /* UNIDADES                                                         */
  /* ---------------------------------------------------------------- */
  unidades: [

    /* =============================================================== */
    /* UNIDAD 1 · POR QUÉ EXISTE UN PROTOCOLO PARA LOS ANIMALES         */
    /* =============================================================== */
    {
      id: "u1",
      numero: 1,
      titulo: "Por qué existe un protocolo para los animales",
      subtitulo: "Origen, alcance y quién da las órdenes",
      iconoImg: "img/volcan.png",
      duracion: "5 min",
      diapositivas: [

        /* 01 / 10 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 1 · LOGÍSTICA Y ACOGIDA DE ANIMALES",
          titulo: "Por qué existe un protocolo<br>para los animales",
          imagen: "img/volcan.png",
          /* NUEVO: frase de arranque */
          nota: "Antes de hablar de camiones y vallas: de dónde sale la obligación y quién da las órdenes."
        },

        /* 02 / 10 */
        {
          tipo: "encuesta",
          rotulo: "PREGUNTA A LA SALA",
          titulo: "¿Vuestro plan municipal dice algo de los animales?",
          opciones: ["Sí", "No", "No lo sé"],
          /* NUEVO: instrucción */
          nota: "Mano alzada. Quien diga «sí», que piense en qué apartado lo dice."
        },

        /* 03 / 10 */
        {
          tipo: "sabias_que",
          rotulo: "EL ORIGEN",
          dato: "19-9-2021",
          titulo: "erupción de La Palma",
          texto: "Esa erupción y los incendios de Gran Canaria de 2017 y 2019 mostraron que los animales pueden resultar gravemente afectados.",
          fuente: "Decreto 195/2022, preámbulo",
          iconoImg: "img/volcan.png",
          nota: "Hasta entonces, los planes de Protección Civil de Canarias no recogían previsiones concretas para los animales."
        },

        /* 04 / 10 */
        {
          tipo: "lista",
          rotulo: "LO QUE ESTÁ EN JUEGO",
          titulo: "Más daños que la pérdida del animal",
          items: [
            { iconoImg: "img/ganado.png", titulo: "Economía y ecosistemas",
              texto: "Daños a las economías familiares y al medio ambiente." },
            { iconoImg: "img/sanitario.png", titulo: "Salud pública",
              texto: "Los cadáveres de los animales, un problema sanitario." },
            { iconoImg: "img/grupo.png", titulo: "Personas que no quieren irse",
              texto: "Afectación psicológica y resistencia a evacuar sin sus animales." },
            { iconoImg: "img/alerta.png", titulo: "Rescates espontáneos",
              texto: "Gente sin formación, convocada por redes, sin coordinación." }
          ],
          /* NUEVO: resume el preámbulo del decreto */
          nota: "Proteger a los animales también es proteger la evacuación de las personas."
        },

        /* 05 / 10 */
        {
          tipo: "texto",
          rotulo: "DECRETO 195/2022 · ANEXO 8 DEL PLATECA",
          titulo: "Cuándo se aplica el Protocolo",
          destacado: "Al activarse el PLATECA o un plan especial o específico, si el riesgo afecta de forma colectiva a los animales.",
          parrafos: [
            "<strong>Animales:</strong> silvestres, domésticos, de compañía, de núcleos zoológicos y de explotaciones ganaderas, cinegéticas o piscícolas.",
            "<strong>Emergencias:</strong> seísmos, volcanes, incendios forestales, inundaciones, calor y calima, temporales y contaminación marina."
          ],
          nota: "Base: Código Civil, art. 333 bis (Ley 17/2021); Estatuto de Autonomía, art. 35; Ley 17/2015."
        },

        /* 06 / 10 */
        {
          tipo: "lista",
          rotulo: "APARTADO 3 DEL PROTOCOLO",
          /* NUEVO: agrupación de los 10 objetivos en cinco bloques */
          titulo: "Diez objetivos, cinco ideas",
          items: [
            { iconoImg: "img/grupo.png",
              texto: "<strong>Coordinar:</strong> criterios homogéneos y comunicación entre unidades (1 y 2)." },
            { iconoImg: "img/perro.png",
              texto: "<strong>Evacuar juntos:</strong> personas con sus animales de compañía (3)." },
            { iconoImg: "img/censo.png",
              texto: "<strong>Saber qué hay:</strong> censos e inventario de quien no puede evacuar solo (6 y 10)." },
            { iconoImg: "img/albergue.png",
              texto: "<strong>Tener dónde y con qué:</strong> centros, medios de traslado y planes de evacuación (4, 5 y 9)." },
            { iconoImg: "img/equipo.png",
              texto: "<strong>Formar y divulgar:</strong> agentes, personal, voluntariado y población (7 y 8)." }
          ],
          /* NUEVO */
          nota: "Entre paréntesis, el número de objetivo. El 4, el 6, el 9 y el 10 son el catálogo de la unidad 2."
        },

        /* 07 / 10 */
        {
          tipo: "imagen",
          rotulo: "ANEXO 1 DEL PROTOCOLO · ORGANIGRAMA",
          titulo: "Dónde encaja la Unidad de Evacuación",
          imagen: "img/organigrama.png",
          imagenGrande: true,
          imagenAlt: "Organigrama: el Comité Asesor (Comité de Evacuación) sobre el PMA y el CECOPIN; del PMA dependen el Grupo de Logística, con la Unidad de Evacuación, y el Grupo de Seguridad (CRM, albergue, CPA).",
          nota: "La Unidad se constituye dentro del Grupo Logístico y su coordinador/a lo designa la jefatura de Logística. Se comunican por el canal Canarias 8 Logística y el SMC."
        },

        /* 08 / 10 */
        {
          tipo: "pregunta",
          rotulo: "PREGUNTA DE CRITERIO",
          titulo: "¿Quién da la luz verde?",
          enunciado: "¿Quién autoriza que la Unidad de Evacuación empiece a actuar?",
          opciones: [
            { texto: "Su coordinador/a" },
            { texto: "La jefatura de Logística" },
            { texto: "La Dirección Técnica del Plan", correcta: true }
          ],
          veredicto: "LA DIRECCIÓN TÉCNICA",
          explicacion: "Valora si se puede evacuar con seguridad y fija prioridades (apdo. 4.4). Y el responsable de sector del Grupo de Intervención puede detenerla.",
          nota: "Decidid en 30 segundos, por mayoría, antes de pulsar."
        },

        /* 09 / 10 */
        {
          tipo: "texto",
          rotulo: "EN GUÍA DE ISORA · PEMU, APDO. 4.6.1",
          titulo: "El Grupo de Logística del PEMU",
          parrafos: [
            "<strong>Quién lo forma:</strong> Cruz Roja, Protección Civil, Servicios Sociales, asociaciones y servicios municipales; lo dirige quien designe el Director del Plan.",
            "<strong>Con qué medios:</strong> propios del Ayuntamiento y privados del Catálogo de Medios; si no bastan, la Dirección los pide a otras administraciones o empresas."
          ],
          imagen: "img/ayuntamiento.png",
          imagenAlt: "",
          /* NUEVO: enlace entre PEMU y Protocolo */
          nota: "Es el grupo en el que el Protocolo integra la Unidad de Evacuación de Animales."
        },

        /* 10 / 10 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          /* NUEVO: título, subtítulo e ideas */
          titulo: "El marco ya existe.",
          subtitulo: "Lo que falta es tenerlo preparado antes de la alerta.",
          ideas: [
            "La Palma 2021 y Gran Canaria 2017 y 2019 explican el Decreto 195/2022.",
            "Anexo 8 del PLATECA: se aplica si el riesgo afecta a los animales.",
            "La Unidad de Evacuación de Animales va dentro del Grupo Logístico.",
            "Solo empieza a actuar con autorización de la Dirección Técnica."
          ],
          siguiente: "En la próxima unidad: qué información y qué catálogo hay que tener antes del naranja.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 2 →"
        }
      ]
    },

    /* =============================================================== */
    /* UNIDAD 2 · ANTES DEL NARANJA: INFORMACIÓN Y CATÁLOGO             */
    /* =============================================================== */
    {
      id: "u2",
      numero: 2,
      titulo: "Antes del naranja: información y catálogo",
      subtitulo: "Qué hay que saber y dónde se apunta",
      iconoImg: "img/censo.png",
      duracion: "5 min",
      diapositivas: [

        /* 01 / 10 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 2 · LOGÍSTICA Y ACOGIDA DE ANIMALES",
          titulo: "Antes del naranja:<br>información y catálogo",
          imagen: "img/censo.png",
          nota: "«En semáforo naranja solo se activa lo que ya está catalogado. Lo que falte, habrá que improvisarlo con la emergencia en marcha.»"
        },

        /* 02 / 10 */
        {
          tipo: "texto",
          rotulo: "ANEXO 3 DEL PROTOCOLO",
          titulo: "El Protocolo no inventa otro catálogo",
          destacado: "Remite al capítulo 6 y al Anexo 3 del PLATECA, y dice dónde va cada cosa.",
          parrafos: [
            "<strong>Catálogo de medios y recursos:</strong> archivo con los datos de las personas y bienes, públicos y privados, susceptibles de ser activados en una emergencia."
          ],
          imagen: "img/contrato.png",
          imagenAlt: "",
          nota: "En el PEMU, el Grupo de Logística trabaja con los medios propios del Ayuntamiento y los privados de su Catálogo de Medios."
        },

        /* 03 / 10 */
        {
          tipo: "tarjetas",
          rotulo: "CATÁLOGO · APARTADOS 1 A 4",
          titulo: "¿Qué va en cada apartado?",
          tarjetas: [
            { frenteRotulo: "APARTADO 1", frente: "Información previa",
              dorsoRotulo: "QUÉ VA AHÍ",
              /* NUEVO: dorso */
              dorso: "Censos e inventarios de explotaciones, núcleos y centros. Lo piden los objetivos 6 y 10." },
            { frenteRotulo: "APARTADO 2", frente: "Medios humanos",
              dorsoRotulo: "QUÉ VA AHÍ",
              dorso: "El personal de la Unidad de Evacuación, con nombre y teléfono. Subepígrafe 1.4 (Grupos de Apoyo)." },
            { frenteRotulo: "APARTADO 3", frente: "Transporte",
              dorsoRotulo: "QUÉ VA AHÍ",
              dorso: "Vehículos para el traslado de animales y sus contactos. Subepígrafe 2.3.2." },
            { frenteRotulo: "APARTADO 4", frente: "Albergue y abastecimiento",
              dorsoRotulo: "QUÉ VA AHÍ",
              dorso: "Vallas, naves desmontables, bebederos, comederos, agua y alimento. Subepígrafe 2.3.3." }
          ]
        },

        /* 04 / 10 */
        {
          tipo: "tarjetas",
          rotulo: "CATÁLOGO · APARTADOS 5 A 7",
          titulo: "¿Y en el resto?",
          tarjetas: [
            { frenteRotulo: "APARTADO 5", frenteImg: "img/sanitario.png", frente: "Sanitarios",
              dorsoRotulo: "QUÉ VA AHÍ",
              dorso: "Triaje veterinario y ficha, sedación, retirada de animales muertos. Subepígrafe 2.3.4." },
            { frenteRotulo: "APARTADO 6", frenteImg: "img/material.png", frente: "Auxiliares",
              dorsoRotulo: "QUÉ VA AHÍ",
              dorso: "Cuerdas o lazos, palas, cubos, lonas, equipos de captura y EPI. Subepígrafe 2.3.6." },
            { frenteRotulo: "APARTADO 7", frenteImg: "img/albergue.png", frente: "Lugares de albergue y almacenamiento",
              dorsoRotulo: "QUÉ VA AHÍ",
              dorso: "Centros de protección animal y zonas habilitadas, con sus plazas. Subepígrafe 3.4." }
          ]
        },

        /* 05 / 10 */
        {
          tipo: "lista",
          rotulo: "INFORMACIÓN PREVIA",
          titulo: "Saber qué animales hay y dónde",
          items: [
            { iconoImg: "img/ganado.png",
              texto: "<strong>Explotaciones:</strong> censo del Registro de Explotaciones Ganaderas de Canarias y plan de evacuación de cada una." },
            { iconoImg: "img/alerta.png",
              texto: "<strong>Quien no puede salir solo:</strong> inventario de quien no puede evacuar por sus medios y de fincas no habitadas." },
            { iconoImg: "img/perro.png",
              texto: "<strong>Compañía:</strong> censo municipal y datos al día en el Registro Canario de Identificación Animal." },
            { iconoImg: "img/huella.png",
              texto: "<strong>Núcleos y colonias:</strong> núcleos zoológicos y centros con plan de autoprotección; colonias felinas." }
          ],
          nota: "Sin información no hay catálogo útil."
        },

        /* 06 / 10 */
        {
          tipo: "sabias_que",
          rotulo: "GUÍA DE ISORA EN CIFRAS",
          dato: "5.929",
          titulo: "cabezas de ganado censadas en el municipio",
          texto: "Caprino 2.682 (46 %), ovino 2.637 (44 %), porcino 535 (9 %) y bovino 77 (1 %).",
          fuente: "PEMU de Guía de Isora, apdo. 2.2.8.2 (censo de 2009)",
          iconoImg: "img/ganado.png",
          nota: "El PEMU cita ganadería doméstica en El Pozo, Vera de Erques, El Jaral, Aripe, Chirche y Chiguergue: puede haber animales sin censar."
        },

        /* 07 / 10 */
        {
          tipo: "texto",
          rotulo: "EN GUÍA DE ISORA · PEMU, APDO. 2.2.8.2",
          titulo: "Qué ganado habría que mover",
          parrafos: [
            "<strong>Caprino y ovino:</strong> explotaciones poco tecnificadas, muy intensivas y, por lo general, aisladas de los núcleos urbanos.",
            "<strong>Porcino:</strong> bastante tecnificado, confinado en naves-granja y dentro de una ADS.",
            "<strong>Abejas:</strong> unas mil colmenas, con trashumancia de marzo a octubre hacia el Teide."
          ],
          imagen: "img/nave.png",
          imagenAlt: "",
          nota: "La Asociación de Apicultores Isora agrupa a 41 socios/as."
        },

        /* 08 / 10 */
        {
          tipo: "verdadero_falso",
          rotulo: "VERDADERO O FALSO",
          titulo: "¿Con un censo basta?",
          afirmacion: "«Basta con el censo municipal de mascotas para saber qué animales hay.»",
          respuesta: false,
          /* NUEVO: explicación (resume la diapositiva 5) */
          explicacion: "Solo cubre animales de compañía. Faltan el Registro de Explotaciones Ganaderas de Canarias, el inventario de quienes no pueden evacuar por sus medios y los animales en fincas no habitadas.",
          nota: "Mano alzada para VERDADERO y luego para FALSO. Después se revela."
        },

        /* 09 / 10 */
        {
          tipo: "reto",
          rotulo: "EJERCICIO INDIVIDUAL · 3 MIN",
          titulo: "Vuestros tres censos",
          descripcion: "Lista los tres censos o inventarios que tu municipio tendría que tener al día.",
          minutos: 3,
          /* NUEVO: pasos y cierre del ejercicio */
          pasos: [
            "Escribe los tres censos o inventarios.",
            "Junto a cada uno, anota si existe, quién lo custodia y de qué año es.",
            "Compara con quien tengas al lado: ¿cuál falta en los dos?"
          ],
          premio: "Al acabar, contrastad con la diapositiva 5. Un censo sin fecha cuenta como medio censo."
        },

        /* 10 / 10 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          titulo: "Sin información no hay catálogo útil.",
          /* NUEVO: subtítulo e ideas */
          subtitulo: "Ya sabemos qué apuntar. Falta saber con qué y con quién.",
          ideas: [
            "En semáforo naranja solo se activa lo que ya está catalogado.",
            "Cada medio tiene su sitio en el PLATECA: 1.4, 2.3.2 a 2.3.6 y 3.4.",
            "Registro ganadero, censo municipal e inventario de quien no sale.",
            "Guía de Isora: 5.929 cabezas censadas y ganadería sin censar."
          ],
          siguiente: "En la próxima unidad: personas, transporte, albergue y material.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 3 →"
        }
      ]
    },

    /* =============================================================== */
    /* UNIDAD 3 · MEDIOS: PERSONAS, TRANSPORTE, ALBERGUE Y MATERIAL     */
    /* =============================================================== */
    {
      id: "u3",
      numero: 3,
      titulo: "Medios: personas, transporte, albergue y material",
      subtitulo: "Quién, con qué y adónde",
      iconoImg: "img/camion.png",
      duracion: "7 min",
      diapositivas: [

        /* 01 / 10 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 3 · LOGÍSTICA Y ACOGIDA DE ANIMALES",
          titulo: "Medios: personas, transporte,<br>albergue y material",
          imagen: "img/camion.png",
          nota: "El catálogo tiene que tener nombres y teléfonos, no solo categorías."
        },

        /* 02 / 10 */
        {
          tipo: "tarjetas",
          rotulo: "UNIDAD DE EVACUACIÓN DE ANIMALES",
          titulo: "Cuatro perfiles mínimos",
          tarjetas: [
            { frenteRotulo: "PERFIL 1", frente: "Personal veterinario de triaje",
              dorsoRotulo: "QUÉ HACE",
              dorso: "Valora y clasifica; decide la forma de evacuación, la sedación y el centro según la especie." },
            { frenteRotulo: "PERFIL 2", frente: "Jefatura de cuadrilla o agrupación",
              dorsoRotulo: "QUÉ HACE",
              dorso: "Dirige a cada equipo sobre el terreno." },
            { frenteRotulo: "PERFIL 3", frente: "Operarios de Protección Civil",
              dorsoRotulo: "QUÉ HACE",
              dorso: "Captura, carga y traslado." },
            { frenteRotulo: "PERFIL 4", frente: "Auxiliares de protección animal",
              dorsoRotulo: "QUÉ HACE",
              dorso: "Manejo y cuidado de los animales." }
          ]
        },

        /* 03 / 10 */
        {
          tipo: "lista",
          rotulo: "REFUERZOS Y APOYOS",
          titulo: "Quién más puede sumarse",
          items: [
            { iconoImg: "img/veterinario.png", titulo: "Personal técnico",
              texto: "Técnico agrícola, de biología o ciencias del mar; personal de agricultura para alimentación y ordeño." },
            { iconoImg: "img/grupo.png", titulo: "Voluntariado",
              texto: "De Protección Civil y de protección animal, en un listado previo y con prenda identificativa (Ley 4/1998)." },
            { iconoImg: "img/seguridad.png", titulo: "Grupo de Seguridad",
              texto: "Seprona y Agentes de Medio Ambiente: control de accesos y custodia de los centros." },
            { iconoImg: "img/alerta.png", titulo: "Grupo de Intervención",
              texto: "Informa en tiempo real de la viabilidad de la evacuación." }
          ],
          nota: "Alimentación y ordeño: clave en un municipio de caprino lechero."
        },

        /* 04 / 10 */
        {
          tipo: "texto",
          rotulo: "MEDIOS DE TRANSPORTE",
          titulo: "Quién mueve a cada animal",
          parrafos: [
            "<strong>Ganado:</strong> vehículos de recogida de animales o preparados para ello, con un listado de contactos y medios, y los medios propios de los ganaderos.",
            "<strong>Compañía:</strong> preferentemente con sus propietarios; si no, transportines plegables y vehículos de Protección Civil o de entidades con convenio."
          ],
          imagen: "img/camion.png",
          imagenAlt: ""
        },

        /* 05 / 10 */
        {
          tipo: "reto",
          rotulo: "EJERCICIO EN PAREJAS · 3 MIN",
          titulo: "La ficha de un vehículo",
          descripcion: "Elegid un vehículo real que pudiera mover animales y rellenad sus cinco campos: titular y contacto 24 h, tipo, capacidad, tiempo de llegada y forma de movilización.",
          minutos: 3,
          /* NUEVO: pasos */
          pasos: [
            "Elegid un vehículo concreto de vuestro municipio.",
            "Rellenad los cinco campos; si no sabéis uno, apuntad quién lo sabría.",
            "Puesta en común: ¿qué campo se ha quedado más veces en blanco?"
          ],
          premio: "Ejemplos: transportista o ganadero · camión de ganado o furgoneta · cabezas o transportines · minutos hasta Chirche o Aripe · propio, contrato o convenio."
        },

        /* 06 / 10 */
        {
          tipo: "pregunta",
          rotulo: "LUGARES DE ALBERGUE · ANEXO 3",
          titulo: "¿En qué orden se busca albergue?",
          enunciado: "<strong>P</strong> · centros de los planes<br><strong>G</strong> · propuestos por Ganadería del Cabildo<br><strong>Z</strong> · zonas habilitadas en fincas",
          opciones: [
            { texto: "Z → G → P" },
            { texto: "P → G → Z", correcta: true },
            { texto: "G → P → Z" }
          ],
          veredicto: "P → G → Z",
          explicacion: "Primero, los centros de los planes insular y municipal; después, los que proponga Ganadería del Cabildo; si no hay, zonas en fincas públicas o privadas."
        },

        /* 07 / 10 */
        {
          tipo: "lista",
          rotulo: "REGLAS QUE CONDICIONAN LAS PLAZAS",
          titulo: "Antes de contar plazas",
          items: [
            { iconoImg: "img/perro.png", titulo: "Mascotas fuera de los albergues de personas",
              texto: "Salvo los perros de asistencia." },
            { iconoImg: "img/alerta.png", titulo: "Animales potencialmente peligrosos",
              texto: "Con espacios propios." },
            { iconoImg: "img/nave.png", titulo: "Instalaciones",
              texto: "Permanentes o fácilmente desmontables." },
            { iconoImg: "img/veterinario.png", titulo: "Control veterinario",
              texto: "Filiación, control y evaluación sanitaria de cada animal." },
            { iconoImg: "img/seguridad.png", titulo: "Separación y seguridad",
              texto: "Por especie y entre heridos y sanos; accesos controlados y cierres comprobados." }
          ]
        },

        /* 08 / 10 */
        {
          tipo: "lista",
          rotulo: "MATERIAL",
          titulo: "Lo que tiene que estar localizado",
          items: [
            { iconoImg: "img/nave.png",
              texto: "<strong>Instalaciones (2.3.3):</strong> vallas o naves desmontables por especie, bebederos, comederos, sombra, luz y residuos." },
            { iconoImg: "img/caja.png",
              texto: "<strong>Abastecimiento (2.3.3):</strong> agua, alimento y medicación para varios días, con control veterinario. Con ceniza, suministro de fuera." },
            { iconoImg: "img/sanitario.png",
              texto: "<strong>Sanitario (2.3.4):</strong> triaje y ficha, sedación y retirada de animales muertos, identificados para el seguro." },
            { iconoImg: "img/material.png",
              texto: "<strong>Auxiliar (2.3.6):</strong> cuerdas o lazos, palas, cubos, basureros con tapa, lonas, equipo de captura y EPI." }
          ],
          /* La primera frase es de las notas de Víctor; la segunda es NUEVA */
          nota: "En almacén o con proveedor identificado: en naranja no se sale a comprar lonas."
        },

        /* 09 / 10 */
        {
          tipo: "pregunta",
          rotulo: "MOVILIZACIÓN · APARTADO 6",
          titulo: "¿Qué medios se movilizan primero?",
          opciones: [
            { texto: "Privados, por contratación" },
            { texto: "Autonómicos" },
            { texto: "Públicos locales", correcta: true }
          ],
          veredicto: "LOS PÚBLICOS LOCALES",
          explicacion: "Públicos antes que privados y, entre ellos, los locales antes que los autonómicos: dan la primera respuesta con la información más precisa.",
          nota: "Los privados, por contrato o, si no, por convenio. En Guía de Isora: La Traílla (convenio) y Salva Misio Isora (colaboración)."
        },

        /* 10 / 10 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA UNIDAD",
          /* NUEVO: título, subtítulo e ideas */
          titulo: "Medios con nombre, teléfono y plazas.",
          subtitulo: "Ahora toca comprobar si nos alcanzan.",
          ideas: [
            "Mínimo: veterinario de triaje, jefatura, operarios y auxiliares.",
            "Cada vehículo, con ficha: contacto 24 h, capacidad y llegada.",
            "Albergue: planes, luego Ganadería del Cabildo, luego zonas.",
            "Primero medios públicos locales; luego autonómicos y privados."
          ],
          siguiente: "En la próxima unidad: el caso de Chirche y Aripe y la lista de comprobación.",
          siguienteEtiqueta: "SIGUIENTE: UNIDAD 4 →"
        }
      ]
    },

    /* =============================================================== */
    /* UNIDAD 4 · CASO PRÁCTICO Y LISTA DE COMPROBACIÓN                 */
    /* =============================================================== */
    {
      id: "u4",
      numero: 4,
      titulo: "Caso práctico y lista de comprobación",
      subtitulo: "Semáforo naranja en Chirche y Aripe",
      iconoImg: "img/check.png",
      duracion: "6 min",
      diapositivas: [

        /* 01 / 11 */
        {
          tipo: "portada",
          rotulo: "UNIDAD 4 · LOGÍSTICA Y ACOGIDA DE ANIMALES",
          titulo: "¿Cubrimos un naranja<br>en Chirche y Aripe?",
          imagen: "img/check.png",
          nota: "Aterrizamos el catálogo en el caso del simulacro: cuatro necesidades, cuatro decisiones de 30 segundos, por mayoría."
        },

        /* 02 / 11 */
        {
          tipo: "pregunta",
          rotulo: "CASO PRÁCTICO · 1 DE 4 · CHIRCHE",
          titulo: "200 cabras en Chirche",
          enunciado: "Recurso: explotación de ovino en Camino La Tablada. Capacidad: sin dato.",
          opciones: [
            { texto: "Cubierto" },
            { texto: "A verificar", correcta: true },
            { texto: "Déficit probable" },
            { texto: "Solo para triaje" }
          ],
          veredicto: "SITUACIÓN: VERIFICAR",
          explicacion: "Sin capacidad conocida y con dos dudas: la bioseguridad al juntar caprino y ovino, y si queda fuera de la zona de riesgo."
        },

        /* 03 / 11 */
        {
          tipo: "pregunta",
          rotulo: "CASO PRÁCTICO · 2 DE 4 · ARIPE",
          titulo: "20 perros de protectora",
          enunciado: "Recurso: residencia de Pista de Alzola y La Traílla (convenio). Hasta 100 perros.",
          opciones: [
            { texto: "Cubierto", correcta: true },
            { texto: "A verificar" },
            { texto: "Déficit probable" },
            { texto: "Solo para triaje" }
          ],
          veredicto: "SITUACIÓN: CUBIERTO",
          explicacion: "Pista de Alzola, fuera de la zona, da hasta 100 plazas y La Traílla tiene convenio de recogida: cubierto si se confirma."
        },

        /* 04 / 11 */
        {
          tipo: "pregunta",
          rotulo: "CASO PRÁCTICO · 3 DE 4 · ARIPE",
          titulo: "Unos 15 gatos de colonia",
          enunciado: "Recurso: Asociación Salva Misio Isora. Capacidad: sin dato.",
          opciones: [
            { texto: "Cubierto" },
            { texto: "A verificar" },
            { texto: "Déficit probable", correcta: true },
            { texto: "Solo para triaje" }
          ],
          veredicto: "SITUACIÓN: DÉFICIT PROBABLE",
          explicacion: "Solo está Salva Misio Isora, sin capacidad definida: es el punto débil del catálogo."
        },

        /* 05 / 11 */
        {
          tipo: "pregunta",
          rotulo: "CASO PRÁCTICO · 4 DE 4",
          titulo: "Animales heridos o especiales",
          enunciado: "Recurso: centro municipal de rescate. Capacidad: 4 perros y 2 gatos.",
          opciones: [
            { texto: "Cubierto" },
            { texto: "A verificar" },
            { texto: "Déficit probable" },
            { texto: "Solo para triaje", correcta: true }
          ],
          veredicto: "SITUACIÓN: SOLO PARA TRIAJE",
          explicacion: "Con 4 perros y 2 gatos de capacidad, conviene reservarlo para animales heridos o que necesiten atención especial."
        },

        /* 06 / 11 */
        {
          tipo: "texto",
          rotulo: "ANEXO 4 · CONSEJOS A LA POBLACIÓN",
          titulo: "Lo que hay que difundir antes",
          parrafos: [
            "<strong>Confinamiento:</strong> fuentes oficiales, huecos cerrados y puertas interiores abiertas con agua y comida repartidas; en explotaciones, recintos cerrados.",
            "<strong>Evacuación:</strong> mochila, punto de reunión y de filiación, animal identificado y vacunado, y datos al día en el Registro Canario de Identificación Animal."
          ],
          imagen: "img/ayuntamiento.png",
          imagenAlt: "",
          nota: "Perros de asistencia: evacuación y traslado conjunto garantizados, permanencia constante junto a la persona y atención veterinaria prioritaria."
        },

        /* 07 / 11 */
        {
          tipo: "tarjetas",
          rotulo: "UNA POR ANIMAL, PORTÁTIL Y RESISTENTE AL AGUA",
          titulo: "¿Qué lleva la mochila?",
          tarjetas: [
            { frenteRotulo: "BLOQUE 1", frente: "Documentación",
              dorsoRotulo: "QUÉ LLEVA",
              dorso: "Copia sellada de cartilla o pasaporte e historial; licencia si es PPP; foto juntos; contacto del veterinario." },
            { frenteRotulo: "BLOQUE 2", frente: "Transporte",
              dorsoRotulo: "QUÉ LLEVA",
              dorso: "Transportín plegable o jaula desmontable, con datos de contacto." },
            { frenteRotulo: "BLOQUE 3", frente: "Agua, comida y salud",
              dorsoRotulo: "QUÉ LLEVA",
              dorso: "Agua para dos días y comida para tres (mejor, una semana); medicación y botiquín si hay tratamiento." },
            { frenteRotulo: "BLOQUE 4", frente: "Sujeción y aviso",
              dorsoRotulo: "QUÉ LLEVA",
              dorso: "Collar con etiqueta, correa, bozal, bolsas, toalla, juguetes, estaca y pegatina «Evacuado con animal de compañía»." }
          ]
        },

        /* 08 / 11 */
        {
          tipo: "lista",
          rotulo: "AUTOEVALUACIÓN · PUNTOS 1 A 5",
          titulo: "Lista de comprobación antes del naranja",
          instruccion: "Contad cuántos tenéis resueltos.",
          items: [
            { iconoImg: "img/check.png", texto: "<strong>1.</strong> Censos actualizados: explotaciones, mascotas e identificación animal" },
            { iconoImg: "img/check.png", texto: "<strong>2.</strong> Plan de evacuación de cada explotación ganadera" },
            { iconoImg: "img/check.png", texto: "<strong>3.</strong> Inventario de quienes no pueden evacuar por sus medios" },
            { iconoImg: "img/check.png", texto: "<strong>4.</strong> Listado de vehículos para animales con contacto 24 h" },
            { iconoImg: "img/check.png", texto: "<strong>5.</strong> Centros de protección animal con plazas por especie" }
          ],
          /* NUEVO */
          nota: "Resuelto = con nombre, teléfono y fecha. «Lo lleva otra concejalía» no cuenta."
        },

        /* 09 / 11 */
        {
          tipo: "lista",
          rotulo: "AUTOEVALUACIÓN · PUNTOS 6 A 9",
          titulo: "Lista de comprobación (continuación)",
          instruccion: "Seguid contando.",
          items: [
            { iconoImg: "img/check.png", texto: "<strong>6.</strong> Zona habilitada para ganado" },
            { iconoImg: "img/check.png", texto: "<strong>7.</strong> Listado de voluntariado y familias de acogida" },
            { iconoImg: "img/check.png", texto: "<strong>8.</strong> Material, EPI y equipos de captura localizados" },
            { iconoImg: "img/check.png", texto: "<strong>9.</strong> Convenios firmados y previsión presupuestaria" }
          ],
          nota: "Si en semáforo naranja hay que empezar a buscar alguno de estos elementos, llegamos tarde para los animales."
        },

        /* 10 / 11 */
        {
          tipo: "encuesta",
          rotulo: "RECUENTO FINAL",
          titulo: "¿Cuántos de los 9 puntos tiene resueltos vuestro municipio?",
          opciones: ["0-3", "4-6", "7-9"],
          nota: "Mano alzada. En el simulacro comprobaremos cuántos lo están de verdad."
        },

        /* 11 / 11 */
        {
          tipo: "cierre",
          rotulo: "FIN DE LA PÍLDORA",
          titulo: "En semáforo naranja no se busca: se activa lo que ya está en el catálogo.",
          /* NUEVO: subtítulo e ideas */
          subtitulo: "Próximo paso: comprobarlo en el simulacro.",
          ideas: [
            "Chirche y Aripe: perros cubiertos si se confirma; gatos, en déficit.",
            "Capacidades confirmadas, convenios firmados y destinos sin riesgo.",
            "Una mochila por animal: papeles, transportín, agua, comida, correa.",
            "Nueve puntos que revisar en el catálogo antes de la alerta."
          ]
        }
      ]
    }

  ]
};
