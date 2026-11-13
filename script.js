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
    "Hola Daniel, quiero pedir el diagnóstico gratis.\n" +
    "Nombre: " + f.nombre.value + "\nComercio: " + f.comercio.value +
    "\nRubro: " + rubro + "\nHoy controlo con: " + f.hoy.value +
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
