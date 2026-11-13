function otroRubro(sel){
  var w = document.getElementById("otro-wrap");
  w.hidden = sel.value !== "Otro";
  if (!w.hidden) w.querySelector("input").focus();
}

function enviar(e){
  e.preventDefault();
  var f = e.target;
  var rubro = f.rubro.value === "Otro" ? (f.rubroOtro.value || "Otro") : (f.rubro.value || "Sin especificar");
  var t =
    "Hola Daniel, quiero coordinar una visita sin cargo.\n" +
    "Nombre: " + f.nombre.value + "\nComercio: " + f.comercio.value +
    "\nRubro: " + rubro + "\nHoy controlo con: " + f.hoy.value +
    (f.msg.value ? "\nQuiero resolver: " + f.msg.value : "");
  window.open("https://wa.me/5493704325018?text=" + encodeURIComponent(t), "_blank", "noopener");
  return false;
}

(function () {
  var t = "Hola Daniel, vi la web de DC Analytics y me gustaría coordinar una visita para mi negocio.";
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/5493704325018?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
})();

/* ===================== Animaciones ===================== */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1) Laptop del inicio "en vivo": gráfico, números y alertas
  var scene = document.querySelector(".scene");
  function contar(el) {
    var to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
    var pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    var t0 = null, dur = 1300;
    function fmt(n) { return pre + n.toFixed(dec).replace(".", ",") + suf; }
    el.textContent = fmt(0);
    function paso(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e);
      if (p < 1) requestAnimationFrame(paso);
    }
    setTimeout(function () { requestAnimationFrame(paso); }, 400);
  }
  function arrancar() {
    scene.classList.add("play");
    if (!reduce) scene.querySelectorAll("[data-to]").forEach(contar);
  }
  if (scene) {
    // arranca cuando la laptop aparece en pantalla (en celular está más abajo)
    if (reduce || !("IntersectionObserver" in window)) {
      arrancar();
    } else {
      var ioScene = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { ioScene.disconnect(); requestAnimationFrame(arrancar); }
      }, { threshold: 0.35 });
      // esperar las tipografías: antes de que carguen, la laptop aparece más arriba
      var listo = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      listo.then(function () { ioScene.observe(scene); });
    }
  }

  // 2) Aparición suave al bajar, escalonada entre hermanos
  var grupos = [".strip > div", ".head", ".rubro", ".more", ".panel", ".viz-grid > div:last-child",
                ".quote", "#trabajo .work > div:first-child > *", "form#contacto", ".cta-box"];
  grupos.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("reveal");
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--d", Math.min(i, 5) * 90 + "ms");
    });
  });
  var objetivos = document.querySelectorAll(".reveal, .steps");
  if (reduce || !("IntersectionObserver" in window)) {
    objetivos.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    objetivos.forEach(function (el) { io.observe(el); });
  }

  // 3) Menú: sombra al bajar y sección activa
  var nav = document.querySelector(".nav");
  function alBajar() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", alBajar, { passive: true });
  alBajar();
  var links = {};
  document.querySelectorAll(".nav nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var secciones = ["rubros", "ver", "trabajo"].map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
        var id = e.target.id === "trabajo" && e.target.getBoundingClientRect().top < -200 ? "contacto" : e.target.id;
        if (links[id]) links[id].classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secciones.forEach(function (s) { obs.observe(s); });
    window.addEventListener("scroll", function () {
      if (window.scrollY < 200) Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
    }, { passive: true });
  }
})();
