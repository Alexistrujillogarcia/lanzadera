/* =======================================================================
   NADIE NACE SABIENDO CUIDAR — motor de la presentación
   Sin dependencias. El contenido vive en data/unidades.js.
   ======================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Datos y utilidades                                               */
  /* ---------------------------------------------------------------- */

  var DATOS = window.UNIDADES || { config: {}, unidades: [] };
  var CONFIG = DATOS.config || {};
  var UNIDADES = DATOS.unidades || [];
  var CLAVE_ALMACEN = 'nnsc.progreso.v1';

  var $ = function (sel) { return document.querySelector(sel); };

  function el(tag, clase, html) {
    var n = document.createElement(tag);
    if (clase) { n.className = clase; }
    if (html !== undefined && html !== null) { n.innerHTML = html; }
    return n;
  }

  function texto(v) { return v === undefined || v === null ? '' : String(v); }

  /* Progreso guardado (tolerante a navegadores sin localStorage) */
  function leerProgreso() {
    try { return JSON.parse(window.localStorage.getItem(CLAVE_ALMACEN) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function guardarProgreso(idUnidad, indice) {
    try {
      var p = leerProgreso();
      p[idUnidad] = indice;
      window.localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(p));
    } catch (e) { /* modo privado o almacenamiento bloqueado: se ignora */ }
  }
  function borrarProgreso() {
    try { window.localStorage.removeItem(CLAVE_ALMACEN); } catch (e) {}
  }

  /* ---------------------------------------------------------------- */
  /* Referencias del DOM                                              */
  /* ---------------------------------------------------------------- */

  var pantallaMenu   = $('#pantalla-menu');
  var pantallaUnidad = $('#pantalla-unidad');
  var menuLista      = $('#menu-lista');
  var lienzo         = $('#lienzo');
  var contador       = $('#contador');
  var progreso       = $('#progreso');
  var progresoRelleno= $('#progreso-relleno');
  var avisoEl        = $('#aviso');
  var modalAyuda     = $('#modal-ayuda');

  /* ---------------------------------------------------------------- */
  /* Estado                                                           */
  /* ---------------------------------------------------------------- */

  var unidad = null;      // unidad abierta
  var indice = 0;         // diapositiva actual
  var paso = 0;           // sub-paso dentro de la diapositiva (listas progresivas)
  var estado = {};        // respuestas y contadores por diapositiva
  var cronometro = null;  // intervalo del temporizador de los retos
  var avisoTemporizador = null;

  function claveDiapositiva() { return (unidad ? unidad.id : '?') + ':' + indice; }
  function estadoActual() {
    var k = claveDiapositiva();
    if (!estado[k]) { estado[k] = {}; }
    return estado[k];
  }

  /* ---------------------------------------------------------------- */
  /* Configuración visual                                             */
  /* ---------------------------------------------------------------- */

  function aplicarConfig() {
    var raiz = document.documentElement.style;
    var mapa = {
      colorPrimario: '--primario',
      colorPrimarioOscuro: '--primario-oscuro',
      colorAcento: '--acento',
      colorTexto: '--texto',
      colorTextoSuave: '--texto-suave',
      colorFondo: '--fondo',
      colorRojo: '--rojo',
      colorRojoFondo: '--rojo-fondo',
      colorRojoTexto: '--rojo-texto',
      colorVerde: '--verde',
      colorVerdeFondo: '--verde-fondo'
    };
    Object.keys(mapa).forEach(function (k) {
      if (CONFIG[k]) { raiz.setProperty(mapa[k], CONFIG[k]); }
    });

    if (CONFIG.titulo) {
      $('#menu-titulo').textContent = CONFIG.titulo;
      document.title = CONFIG.titulo;
    }
    $('#menu-subtitulo').textContent = texto(CONFIG.subtitulo);

    var autor = [];
    if (CONFIG.autor) { autor.push(CONFIG.autor); }
    if (CONFIG.municipio) { autor.push(CONFIG.municipio); }
    $('#menu-autor').textContent = autor.join(' · ');

    var dist = $('#menu-distintivo');
    if (CONFIG.distintivo) { dist.textContent = CONFIG.distintivo; }
    else { dist.hidden = true; }
  }

  /* ---------------------------------------------------------------- */
  /* Menú de unidades                                                 */
  /* ---------------------------------------------------------------- */

  function pintarMenu() {
    var guardado = leerProgreso();
    menuLista.textContent = '';

    UNIDADES.forEach(function (u, i) {
      var li = el('li');
      var b = el('button', 'tarjeta-unidad');
      b.type = 'button';
      b.setAttribute('data-unidad', u.id);

      var icono = el('span', 'tarjeta-unidad__icono');
      icono.setAttribute('aria-hidden', 'true');
      if (u.iconoImg) {
        var img = el('img');
        img.src = u.iconoImg;
        img.alt = '';
        icono.appendChild(img);
      } else {
        icono.textContent = texto(u.icono) || '📘';
      }

      var cuerpo = el('span', 'tarjeta-unidad__cuerpo');
      cuerpo.appendChild(el('span', 'tarjeta-unidad__numero',
        'Unidad ' + (u.numero !== undefined ? u.numero : i + 1)));
      cuerpo.appendChild(el('span', 'tarjeta-unidad__titulo', texto(u.titulo)));

      var nDiapos = (u.diapositivas || []).length;
      var meta = [];
      if (u.duracion) { meta.push(u.duracion); }
      meta.push(nDiapos > 0 ? nDiapos + ' diapositivas' : 'por preparar');
      cuerpo.appendChild(el('span', 'tarjeta-unidad__meta',
        meta.map(function (m) { return '<span>' + m + '</span>'; }).join('')));

      if (u.pendiente || nDiapos === 0) {
        b.disabled = true;
        b.setAttribute('aria-disabled', 'true');
        cuerpo.appendChild(el('span', 'tarjeta-unidad__estado tarjeta-unidad__estado--pendiente', 'Próximamente'));
        b.setAttribute('aria-label', 'Unidad ' + (u.numero || i + 1) + ': ' + texto(u.titulo) + '. Todavía no disponible.');
      } else {
        var g = guardado[u.id];
        if (typeof g === 'number' && g > 0 && g < nDiapos) {
          cuerpo.appendChild(el('span', 'tarjeta-unidad__estado tarjeta-unidad__estado--retomar',
            'Retomar en la ' + (g + 1)));
        }
        b.setAttribute('aria-label', 'Abrir la unidad ' + (u.numero || i + 1) + ': ' + texto(u.titulo));
        b.addEventListener('click', function () { abrirUnidad(u.id); });
      }

      b.appendChild(icono);
      b.appendChild(cuerpo);
      li.appendChild(b);
      menuLista.appendChild(li);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Abrir / cerrar unidad                                            */
  /* ---------------------------------------------------------------- */

  function abrirUnidad(id, desdeElPrincipio) {
    var u = null;
    for (var i = 0; i < UNIDADES.length; i++) {
      if (UNIDADES[i].id === id) { u = UNIDADES[i]; break; }
    }
    if (!u || !(u.diapositivas || []).length) { return; }

    unidad = u;
    var guardado = leerProgreso()[u.id];
    indice = (!desdeElPrincipio && typeof guardado === 'number' && guardado >= 0 && guardado < u.diapositivas.length)
      ? guardado : 0;
    paso = 0;

    pantallaMenu.hidden = true;
    pantallaUnidad.hidden = false;
    pintar();
    pantallaUnidad.focus && pantallaUnidad.focus();
  }

  function volverAlMenu() {
    pararCronometro();
    unidad = null;
    pantallaUnidad.hidden = true;
    pantallaMenu.hidden = false;
    pintarMenu();
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- */
  /* Navegación                                                       */
  /* ---------------------------------------------------------------- */

  function diapositivaActual() {
    return unidad ? unidad.diapositivas[indice] : null;
  }

  function pasosDe(d) {
    if (!d) { return 0; }
    if (d.tipo === 'lista') { return (d.items || []).length; }
    return 0;
  }

  function necesitaRespuesta(d) {
    if (!d) { return false; }
    if (d.tipo !== 'pregunta' && d.tipo !== 'verdadero_falso') { return false; }
    return estadoActual().respondida !== true;
  }

  function avanzar(origen) {
    if (!unidad) { return; }
    var d = diapositivaActual();

    if (paso < pasosDe(d)) { paso++; aplicarPaso(); return; }

    if (origen !== 'teclado' && necesitaRespuesta(d)) {
      mostrarAviso('Responde para avanzar (con las flechas del teclado puedes saltar).');
      return;
    }

    if (indice < unidad.diapositivas.length - 1) {
      indice++; paso = 0; pintar();
    } else {
      /* Unidad terminada: se vuelve al menú y se olvida el punto de retomar. */
      guardarProgreso(unidad.id, 0);
      volverAlMenu();
    }
  }

  function retroceder() {
    if (!unidad) { return; }
    if (paso > 0) { paso--; aplicarPaso(); return; }
    if (indice > 0) {
      indice--;
      paso = pasosDe(unidad.diapositivas[indice]);
      pintar();
    }
  }

  function irA(n) {
    if (!unidad) { return; }
    indice = Math.max(0, Math.min(unidad.diapositivas.length - 1, n));
    paso = 0;
    pintar();
  }

  function mostrarAviso(msg) {
    avisoEl.textContent = msg;
    avisoEl.classList.add('visible');
    window.clearTimeout(avisoTemporizador);
    avisoTemporizador = window.setTimeout(function () {
      avisoEl.classList.remove('visible');
    }, 2600);
  }

  /* ---------------------------------------------------------------- */
  /* Pintado de la diapositiva                                        */
  /* ---------------------------------------------------------------- */

  function pintar() {
    pararCronometro();
    var d = diapositivaActual();
    if (!d) { return; }

    lienzo.textContent = '';
    var constructor = plantillas[d.tipo] || plantillas.texto;
    lienzo.appendChild(constructor(d));
    lienzo.scrollTop = 0;

    var total = unidad.diapositivas.length;
    contador.textContent = (indice + 1) + ' / ' + total;
    var pct = total > 1 ? ((indice + 1) / total) * 100 : 100;
    progresoRelleno.style.width = pct + '%';
    progreso.setAttribute('aria-valuenow', String(Math.round(pct)));
    progreso.setAttribute('aria-valuetext', 'Diapositiva ' + (indice + 1) + ' de ' + total);

    aplicarPaso();
    guardarProgreso(unidad.id, indice);
  }

  function aplicarPaso() {
    var items = lienzo.querySelectorAll('.lista__item');
    if (!items.length) { return; }
    for (var i = 0; i < items.length; i++) {
      if (i < paso) { items[i].classList.add('visible'); }
      else { items[i].classList.remove('visible'); }
    }
    var pista = lienzo.querySelector('.lista__pista');
    if (pista) { pista.hidden = paso >= items.length; }
  }

  /* Cabecera común: rótulo + título */
  function cabecera(cont, d) {
    if (d.rotulo) { cont.appendChild(el('p', 'd__rotulo', texto(d.rotulo))); }
    if (d.titulo) { cont.appendChild(el('h3', 'd__titulo', texto(d.titulo))); }
  }
  function pie(cont, d) {
    if (d.nota) { cont.appendChild(el('p', 'd__nota', texto(d.nota))); }
  }

  /* ---------------------------------------------------------------- */
  /* Plantillas por tipo de diapositiva                               */
  /* ---------------------------------------------------------------- */

  var plantillas = {

    /* ---------------- portada ---------------- */
    portada: function (d) {
      var c = el('div', 'd d--portada');
      if (d.imagen) {
        var img = el('img', 'portada__img');
        img.src = d.imagen; img.alt = '';
        c.appendChild(img);
      }
      cabecera(c, d);
      if (d.subtitulo) { c.appendChild(el('p', 'd__subtitulo', texto(d.subtitulo))); }
      pie(c, d);
      return c;
    },

    /* ---------------- texto ---------------- */
    texto: function (d) {
      var c = el('div', 'd d--texto');
      cabecera(c, d);

      var cols = el('div', 'texto__cols' + (d.imagen ? ' con-imagen' : ''));
      var col = el('div');
      if (d.destacado) { col.appendChild(el('p', 'texto__destacado', texto(d.destacado))); }
      (d.parrafos || []).forEach(function (p) {
        col.appendChild(el('p', 'texto__parrafo', texto(p)));
      });
      cols.appendChild(col);

      if (d.imagen) {
        var img = el('img', 'texto__img');
        img.src = d.imagen; img.alt = texto(d.imagenAlt);
        cols.appendChild(img);
      }
      c.appendChild(cols);
      pie(c, d);
      return c;
    },

    /* ---------------- lista progresiva ---------------- */
    lista: function (d) {
      var c = el('div', 'd d--lista');
      cabecera(c, d);

      var ul = el('ul', 'lista');
      (d.items || []).forEach(function (it) {
        var li = el('li', 'lista__item');
        var obj = (typeof it === 'string') ? { texto: it } : it;

        if (obj.icono || obj.iconoImg) {
          var ic = el('span', 'lista__icono');
          ic.setAttribute('aria-hidden', 'true');
          if (obj.iconoImg) {
            var img = el('img'); img.src = obj.iconoImg; img.alt = '';
            ic.appendChild(img);
          } else { ic.textContent = obj.icono; }
          li.appendChild(ic);
        }

        var cuerpo = el('div');
        if (obj.titulo) { cuerpo.appendChild(el('p', 'lista__titulo', texto(obj.titulo))); }
        if (obj.texto) { cuerpo.appendChild(el('p', 'lista__texto', texto(obj.texto))); }
        li.appendChild(cuerpo);
        ul.appendChild(li);
      });
      c.appendChild(ul);

      c.appendChild(el('p', 'lista__pista',
        texto(d.instruccion) || 'Pulsa para mostrar el siguiente punto.'));
      pie(c, d);
      return c;
    },

    /* ---------------- imagen a pantalla ---------------- */
    imagen: function (d) {
      var c = el('div', 'd d--imagen');
      cabecera(c, d);
      var fig = el('figure', 'figura');
      if (d.imagen) {
        var img = el('img', 'figura__img');
        img.src = d.imagen; img.alt = texto(d.imagenAlt);
        fig.appendChild(img);
      }
      if (d.pie) { fig.appendChild(el('figcaption', 'figura__pie', texto(d.pie))); }
      c.appendChild(fig);
      pie(c, d);
      return c;
    },

    /* ---------------- pregunta tipo test ---------------- */
    pregunta: function (d) {
      var c = el('div', 'd d--pregunta');
      cabecera(c, d);
      if (d.enunciado) { c.appendChild(el('p', 'd__afirmacion', texto(d.enunciado))); }

      var cont = el('div', 'opciones');
      var botones = [];
      var est = estadoActual();

      (d.opciones || []).forEach(function (op, i) {
        var obj = (typeof op === 'string') ? { texto: op } : op;
        var b = el('button', 'opcion');
        b.type = 'button';
        b.appendChild(el('span', 'opcion__marca', String.fromCharCode(65 + i)));
        b.appendChild(el('span', null, texto(obj.texto)));
        b.addEventListener('click', function () { responder(i); });
        botones.push({ boton: b, correcta: obj.correcta === true, datos: obj });
        cont.appendChild(b);
      });
      c.appendChild(cont);

      var zonaFeedback = el('div');
      c.appendChild(zonaFeedback);
      pie(c, d);

      function responder(elegida) {
        if (estadoActual().respondida) { return; }
        var est2 = estadoActual();
        est2.respondida = true;
        est2.elegida = elegida;
        pintarRespuesta();
      }

      function pintarRespuesta() {
        var est2 = estadoActual();
        if (!est2.respondida) { return; }
        var acierto = false;
        botones.forEach(function (b, i) {
          b.boton.disabled = true;
          if (b.correcta) {
            b.boton.classList.add('correcta');
            if (i === est2.elegida) { acierto = true; }
          } else if (i === est2.elegida) {
            b.boton.classList.add('incorrecta');
          } else {
            b.boton.classList.add('atenuada');
          }
        });
        zonaFeedback.textContent = '';
        var fb = el('div', 'feedback ' + (acierto ? 'feedback--ok' : 'feedback--ko'));
        fb.appendChild(el('p', 'feedback__titulo',
          texto(d.veredicto) || (acierto ? '¡Correcto!' : 'No exactamente')));
        var expl = texto(d.explicacion) ||
          texto((botones[est2.elegida] && botones[est2.elegida].datos.explicacion));
        if (expl) { fb.appendChild(el('p', 'feedback__texto', expl)); }
        zonaFeedback.appendChild(fb);
      }

      if (est.respondida) { pintarRespuesta(); }
      return c;
    },

    /* ---------------- verdadero / falso ---------------- */
    verdadero_falso: function (d) {
      var c = el('div', 'd d--vf');
      cabecera(c, d);
      if (d.afirmacion) { c.appendChild(el('p', 'd__afirmacion', texto(d.afirmacion))); }

      var cont = el('div', 'opciones opciones--vf');
      var botones = [];
      [['VERDADERO', true], ['FALSO', false]].forEach(function (par) {
        var b = el('button', 'opcion');
        b.type = 'button';
        b.appendChild(el('span', null, par[0]));
        b.addEventListener('click', function () {
          if (estadoActual().respondida) { return; }
          var e = estadoActual();
          e.respondida = true;
          e.elegida = par[1];
          pintarRespuesta();
        });
        botones.push({ boton: b, valor: par[1] });
        cont.appendChild(b);
      });
      c.appendChild(cont);

      var zonaFeedback = el('div');
      c.appendChild(zonaFeedback);
      pie(c, d);

      function pintarRespuesta() {
        var e = estadoActual();
        if (!e.respondida) { return; }
        var acierto = e.elegida === (d.respuesta === true);
        botones.forEach(function (b) {
          b.boton.disabled = true;
          if (b.valor === (d.respuesta === true)) { b.boton.classList.add('correcta'); }
          else if (b.valor === e.elegida) { b.boton.classList.add('incorrecta'); }
          else { b.boton.classList.add('atenuada'); }
        });
        zonaFeedback.textContent = '';
        var fb = el('div', 'feedback ' + (acierto ? 'feedback--ok' : 'feedback--ko'));
        fb.appendChild(el('p', 'feedback__titulo',
          (d.respuesta === true ? 'VERDADERO' : 'FALSO') + (acierto ? ' · ¡acertasteis!' : '')));
        if (d.explicacion) { fb.appendChild(el('p', 'feedback__texto', texto(d.explicacion))); }
        zonaFeedback.appendChild(fb);
      }

      if (estadoActual().respondida) { pintarRespuesta(); }
      return c;
    },

    /* ---------------- tarjetas que se voltean ---------------- */
    tarjetas: function (d) {
      var c = el('div', 'd d--tarjetas');
      cabecera(c, d);

      var lista = d.tarjetas || [];
      var cont = el('div', 'tarjetas' + (lista.length === 1 ? ' tarjetas--una' : ''));
      var est = estadoActual();
      if (!est.volteadas) { est.volteadas = {}; }

      lista.forEach(function (t, i) {
        var b = el('button', 'flip');
        b.type = 'button';
        b.setAttribute('aria-pressed', est.volteadas[i] ? 'true' : 'false');
        b.setAttribute('aria-label', 'Tarjeta ' + (i + 1) + '. Pulsa para darle la vuelta.');

        var interior = el('div', 'flip__interior');

        var frente = el('div', 'flip__cara flip__cara--frente');
        if (t.frenteRotulo) { frente.appendChild(el('span', 'flip__rotulo', texto(t.frenteRotulo))); }
        if (t.frenteImg) { var i1 = el('img', 'flip__img'); i1.src = t.frenteImg; i1.alt = ''; frente.appendChild(i1); }
        frente.appendChild(el('p', 'flip__texto', texto(t.frente)));
        frente.appendChild(el('span', 'flip__pista', 'Toca para ver la respuesta'));

        var dorso = el('div', 'flip__cara flip__cara--dorso');
        if (t.dorsoRotulo) { dorso.appendChild(el('span', 'flip__rotulo', texto(t.dorsoRotulo))); }
        if (t.dorsoImg) { var i2 = el('img', 'flip__img'); i2.src = t.dorsoImg; i2.alt = ''; dorso.appendChild(i2); }
        dorso.appendChild(el('p', 'flip__texto', texto(t.dorso)));

        interior.appendChild(frente);
        interior.appendChild(dorso);
        b.appendChild(interior);

        if (est.volteadas[i]) { b.classList.add('volteada'); }
        b.addEventListener('click', function () {
          var v = !b.classList.contains('volteada');
          b.classList.toggle('volteada', v);
          b.setAttribute('aria-pressed', v ? 'true' : 'false');
          est.volteadas[i] = v;
        });
        cont.appendChild(b);
      });

      c.appendChild(cont);
      if (d.instruccion) { c.appendChild(el('p', 'lista__pista', texto(d.instruccion))); }
      pie(c, d);
      return c;
    },

    /* ---------------- encuesta a mano alzada ---------------- */
    encuesta: function (d) {
      var c = el('div', 'd d--encuesta');
      cabecera(c, d);
      if (d.afirmacion) { c.appendChild(el('p', 'd__afirmacion', texto(d.afirmacion))); }

      var opciones = d.opciones || [];
      var est = estadoActual();
      if (!est.votos) { est.votos = opciones.map(function () { return 0; }); }

      var cont = el('div', 'encuesta');
      var refs = [];

      opciones.forEach(function (op, i) {
        var obj = (typeof op === 'string') ? { texto: op } : op;
        var caja = el('div', 'encuesta__opcion');
        caja.appendChild(el('p', 'encuesta__etiqueta', texto(obj.texto)));

        var cifra = el('p', 'encuesta__cifra', String(est.votos[i]));
        cifra.setAttribute('aria-live', 'polite');
        cifra.setAttribute('aria-label', 'Votos de ' + texto(obj.texto));
        caja.appendChild(cifra);

        var barra = el('div', 'encuesta__barra');
        var relleno = el('span');
        barra.appendChild(relleno);
        caja.appendChild(barra);

        var mandos = el('div', 'encuesta__mandos');
        var menos = el('button', 'boton boton--redondo', '−');
        menos.type = 'button';
        menos.setAttribute('aria-label', 'Quitar un voto a ' + texto(obj.texto));
        var mas = el('button', 'boton boton--redondo', '+');
        mas.type = 'button';
        mas.setAttribute('aria-label', 'Sumar un voto a ' + texto(obj.texto));
        menos.addEventListener('click', function () { sumar(i, -1); });
        mas.addEventListener('click', function () { sumar(i, 1); });
        mandos.appendChild(menos);
        mandos.appendChild(mas);
        caja.appendChild(mandos);

        refs.push({ cifra: cifra, relleno: relleno });
        cont.appendChild(caja);
      });

      function sumar(i, n) {
        est.votos[i] = Math.max(0, est.votos[i] + n);
        refrescar();
      }
      function refrescar() {
        var max = Math.max.apply(null, est.votos.concat([1]));
        refs.forEach(function (r, i) {
          r.cifra.textContent = String(est.votos[i]);
          r.relleno.style.width = ((est.votos[i] / max) * 100) + '%';
        });
      }

      c.appendChild(cont);
      pie(c, d);
      window.setTimeout(refrescar, 0);
      return c;
    },

    /* ---------------- ¿sabías que…? ---------------- */
    sabias_que: function (d) {
      var c = el('div', 'd d--sabias');
      if (d.rotulo) { c.appendChild(el('p', 'd__rotulo', texto(d.rotulo))); }

      var caja = el('div', 'sabias__caja');
      if (d.iconoImg) {
        var img = el('img', 'sabias__img'); img.src = d.iconoImg; img.alt = '';
        caja.appendChild(img);
      }
      if (d.dato) { caja.appendChild(el('p', 'sabias__cifra', texto(d.dato))); }
      if (d.titulo) { caja.appendChild(el('h3', 'd__titulo', texto(d.titulo))); }
      if (d.texto) { caja.appendChild(el('p', 'sabias__texto', texto(d.texto))); }
      if (d.fuente) { caja.appendChild(el('p', 'sabias__fuente', 'Fuente: ' + texto(d.fuente))); }
      c.appendChild(caja);
      pie(c, d);
      return c;
    },

    /* ---------------- reto / actividad ---------------- */
    reto: function (d) {
      var c = el('div', 'd d--reto');
      cabecera(c, d);

      var rejilla = el('div', 'reto' + (d.minutos ? ' con-crono' : ''));
      var col = el('div');
      if (d.descripcion) { col.appendChild(el('p', 'texto__parrafo', texto(d.descripcion))); }

      var ol = el('ol', 'reto__pasos');
      (d.pasos || []).forEach(function (p) {
        ol.appendChild(el('li', 'reto__paso', el('span', null, texto(p)).outerHTML));
      });
      col.appendChild(ol);
      if (d.premio) { col.appendChild(el('p', 'reto__premio', texto(d.premio))); }
      rejilla.appendChild(col);

      if (d.minutos) { rejilla.appendChild(crearCronometro(d.minutos)); }
      c.appendChild(rejilla);
      pie(c, d);
      return c;
    },

    /* ---------------- cierre ---------------- */
    cierre: function (d) {
      var c = el('div', 'd d--cierre');
      cabecera(c, d);
      if (d.subtitulo) { c.appendChild(el('p', 'd__subtitulo', texto(d.subtitulo))); }

      if ((d.ideas || []).length) {
        var ul = el('ul', 'cierre__ideas');
        d.ideas.forEach(function (idea) {
          ul.appendChild(el('li', 'cierre__idea', el('span', null, texto(idea)).outerHTML));
        });
        c.appendChild(ul);
      }

      if (d.siguiente || d.siguienteEtiqueta) {
        var caja = el('div', 'cierre__siguiente');
        if (d.siguiente) { caja.appendChild(el('p', null, texto(d.siguiente))); }
        if (d.siguienteEtiqueta) { caja.appendChild(el('p', 'cierre__etiqueta', texto(d.siguienteEtiqueta))); }
        c.appendChild(caja);
      }
      pie(c, d);
      return c;
    }
  };

  /* ---------------------------------------------------------------- */
  /* Cronómetro de los retos                                          */
  /* ---------------------------------------------------------------- */

  function crearCronometro(minutos) {
    var total = Math.max(1, Math.round(Number(minutos) * 60));
    var restante = total;

    var caja = el('div', 'crono');
    caja.appendChild(el('p', 'crono__rotulo', 'Temporizador'));
    var tiempo = el('p', 'crono__tiempo', formatear(restante));
    tiempo.setAttribute('role', 'timer');
    tiempo.setAttribute('aria-live', 'off');
    caja.appendChild(tiempo);

    var mandos = el('div', 'crono__mandos');
    var iniciar = el('button', 'boton boton--solido', 'Iniciar');
    iniciar.type = 'button';
    var reiniciar = el('button', 'boton boton--fantasma', 'Reiniciar');
    reiniciar.type = 'button';
    mandos.appendChild(iniciar);
    mandos.appendChild(reiniciar);
    caja.appendChild(mandos);

    function formatear(s) {
      var m = Math.floor(s / 60), r = s % 60;
      return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
    }
    function pintarTiempo() {
      tiempo.textContent = formatear(restante);
      caja.classList.toggle('agotado', restante === 0);
    }
    function parar() {
      window.clearInterval(cronometro);
      cronometro = null;
      iniciar.textContent = 'Iniciar';
    }

    iniciar.addEventListener('click', function () {
      if (cronometro) { parar(); return; }
      if (restante === 0) { restante = total; pintarTiempo(); }
      iniciar.textContent = 'Parar';
      cronometro = window.setInterval(function () {
        restante = Math.max(0, restante - 1);
        pintarTiempo();
        if (restante === 0) { parar(); }
      }, 1000);
    });
    reiniciar.addEventListener('click', function () {
      parar(); restante = total; pintarTiempo();
    });

    return caja;
  }

  function pararCronometro() {
    if (cronometro) { window.clearInterval(cronometro); cronometro = null; }
  }

  /* ---------------------------------------------------------------- */
  /* Pantalla completa                                                */
  /* ---------------------------------------------------------------- */

  function alternarPantallaCompleta() {
    var doc = document;
    var e = doc.documentElement;
    if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
      var p = e.requestFullscreen ? e.requestFullscreen() :
              (e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : null);
      if (p && p.catch) { p.catch(function () { mostrarAviso('El navegador no permite la pantalla completa aquí.'); }); }
    } else {
      if (doc.exitFullscreen) { doc.exitFullscreen(); }
      else if (doc.webkitExitFullscreen) { doc.webkitExitFullscreen(); }
    }
  }

  /* ---------------------------------------------------------------- */
  /* Ayuda                                                            */
  /* ---------------------------------------------------------------- */

  var focoPrevio = null;

  function alternarAyuda(forzar) {
    var abrir = (forzar !== undefined) ? forzar : modalAyuda.hidden;
    if (abrir) {
      focoPrevio = document.activeElement;
      modalAyuda.hidden = false;
      var cerrar = modalAyuda.querySelector('[data-accion="cerrar-ayuda"]');
      cerrar && cerrar.focus();
    } else {
      modalAyuda.hidden = true;
      if (focoPrevio && focoPrevio.focus) { focoPrevio.focus(); }
    }
  }

  /* ---------------------------------------------------------------- */
  /* Eventos                                                          */
  /* ---------------------------------------------------------------- */

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest ? ev.target.closest('[data-accion]') : null;
    if (!b) { return; }
    switch (b.getAttribute('data-accion')) {
      case 'siguiente': avanzar('raton'); break;
      case 'anterior': retroceder(); break;
      case 'menu': volverAlMenu(); break;
      case 'ayuda': alternarAyuda(true); break;
      case 'cerrar-ayuda': alternarAyuda(false); break;
      case 'pantalla-completa': alternarPantallaCompleta(); break;
      case 'borrar-progreso':
        borrarProgreso(); pintarMenu();
        b.textContent = 'Progreso borrado ✓';
        window.setTimeout(function () { b.textContent = 'Borrar progreso guardado'; }, 2000);
        break;
    }
  });

  modalAyuda.addEventListener('click', function (ev) {
    if (ev.target === modalAyuda) { alternarAyuda(false); }
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.ctrlKey || ev.altKey || ev.metaKey) { return; }

    if (!modalAyuda.hidden) {
      if (ev.key === 'Escape' || ev.key === '?' || ev.key === 'h' || ev.key === 'H') {
        ev.preventDefault(); alternarAyuda(false);
      }
      return;
    }

    if (ev.key === '?' || ev.key === 'h' || ev.key === 'H') {
      ev.preventDefault(); alternarAyuda(true); return;
    }

    /* Menú */
    if (!unidad) {
      if (/^[1-9]$/.test(ev.key)) {
        var u = UNIDADES[Number(ev.key) - 1];
        if (u && !u.pendiente && (u.diapositivas || []).length) { ev.preventDefault(); abrirUnidad(u.id); }
      }
      if (ev.key === 'f' || ev.key === 'F') { ev.preventDefault(); alternarPantallaCompleta(); }
      return;
    }

    /* Dentro de una unidad */
    switch (ev.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Spacebar': case 'Enter':
        /* Espacio/Intro sobre un botón deben activar el botón, no avanzar */
        if ((ev.key === ' ' || ev.key === 'Spacebar' || ev.key === 'Enter') &&
            document.activeElement && document.activeElement.tagName === 'BUTTON' &&
            !document.activeElement.classList.contains('zona')) { return; }
        ev.preventDefault(); avanzar('teclado'); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        ev.preventDefault(); retroceder(); break;
      case 'Home': ev.preventDefault(); irA(0); break;
      case 'End': ev.preventDefault(); irA(unidad.diapositivas.length - 1); break;
      case 'f': case 'F': ev.preventDefault(); alternarPantallaCompleta(); break;
      case 'Escape': ev.preventDefault(); volverAlMenu(); break;
    }
  });

  /* Gestos táctiles */
  (function () {
    var x0 = 0, y0 = 0, t0 = 0, activo = false;
    pantallaUnidad.addEventListener('touchstart', function (ev) {
      if (ev.touches.length !== 1) { activo = false; return; }
      activo = true;
      x0 = ev.touches[0].clientX; y0 = ev.touches[0].clientY; t0 = Date.now();
    }, { passive: true });

    pantallaUnidad.addEventListener('touchend', function (ev) {
      if (!activo) { return; }
      activo = false;
      var t = ev.changedTouches[0];
      var dx = t.clientX - x0, dy = t.clientY - y0;
      if (Date.now() - t0 > 900) { return; }
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.6) { return; }
      if (dx < 0) { avanzar('raton'); } else { retroceder(); }
    }, { passive: true });
  }());

  /* ---------------------------------------------------------------- */
  /* Arranque                                                         */
  /* ---------------------------------------------------------------- */

  aplicarConfig();
  pintarMenu();

  /* Enlace directo a una unidad: index.html#u1 (y #u1-5 para la 5ª diapositiva) */
  function aplicarEnlace() {
    var h = (window.location.hash || '').replace('#', '');
    if (!h) { return; }
    var partes = h.split('-');
    var u = null;
    for (var i = 0; i < UNIDADES.length; i++) {
      if (UNIDADES[i].id === partes[0]) { u = UNIDADES[i]; break; }
    }
    if (!u || u.pendiente || !(u.diapositivas || []).length) { return; }
    abrirUnidad(u.id, true);
    var n = Number(partes[1]);
    if (partes[1] && !isNaN(n)) { irA(n - 1); }
  }

  aplicarEnlace();
  window.addEventListener('hashchange', aplicarEnlace);

  window.PRESENTACION = { abrirUnidad: abrirUnidad, irA: irA, volverAlMenu: volverAlMenu,
                          avanzar: avanzar, retroceder: retroceder,
                          estadoActual: function () { return { unidad: unidad && unidad.id, indice: indice, paso: paso }; } };
}());
