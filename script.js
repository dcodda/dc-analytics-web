(function () {
  // Todos los botones de contacto abren WhatsApp con un mensaje listo
  var WA_NUMBER = "5493704325018";
  var WA_TEXT = "Hola Daniel, vi la web de DC Analytics y me interesa el diagnóstico gratis para mi negocio.";
  var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(WA_TEXT);
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Animación de barras escalonada
  document.querySelectorAll(".bars span").forEach(function (s, i) {
    s.style.setProperty("--i", i);
  });

  // Borde del nav al hacer scroll
  var nav = document.getElementById("nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Aparición de secciones
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
