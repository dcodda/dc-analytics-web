function enviar(e){
  e.preventDefault();
  var f = e.target, t =
    "Hola Daniel, quiero pedir el diagnóstico gratis.\n" +
    "Nombre: " + f.nombre.value + "\nComercio: " + f.comercio.value +
    "\nRubro: " + f.rubro.value + "\nHoy controlo con: " + f.hoy.value +
    (f.msg.value ? "\nQuiero resolver: " + f.msg.value : "");
  window.open("https://wa.me/5493704325018?text=" + encodeURIComponent(t), "_blank", "noopener");
  return false;
}

(function () {
  var t = "Hola Daniel, vi la web de DC Analytics y me interesa el diagnóstico gratis para mi negocio.";
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/5493704325018?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
})();
