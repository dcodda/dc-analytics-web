"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. CALCULADORA INTERACTIVA DE ROI (Segura: uso de textContent)
    // -------------------------------------------------------------
    const slider = document.getElementById("churnSlider");
    const sliderVal = document.getElementById("sliderVal");
    const resultDisplay = document.getElementById("roiResult");

    // Base de cálculo del caso de estudio: ~$480,000 USD en facturación vulnerable
    const BASE_VULNERABLE_REVENUE = 480000;

    if (slider && sliderVal && resultDisplay) {
        slider.addEventListener("input", (e) => {
            const pct = parseInt(e.target.value, 10);
            if (isNaN(pct) || pct < 0 || pct > 100) return;
            sliderVal.textContent = `${pct}%`;
            
            const recovered = BASE_VULNERABLE_REVENUE * (pct / 100);
            resultDisplay.textContent = `$${recovered.toLocaleString('en-US', { maximumFractionDigits: 0 })} USD`;
        });
    }

    // -------------------------------------------------------------
    // 2. ENLACE DIRECTO DE WHATSAPP CON MENSAJE PREDEFINIDO
    // -------------------------------------------------------------
    const whatsappButtons = document.querySelectorAll(".btn-whatsapp");
    const defaultMsg = encodeURIComponent("Hola! Estuve viendo el sitio web de DC Analytics y me gustaría conversar sobre una auditoría analítica para mi negocio.");

    whatsappButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const phone = (btn.getAttribute("data-phone") || "5491100000000").replace(/[^0-9]/g, "");
            window.open(`https://wa.me/${phone}?text=${defaultMsg}`, "_blank", "noopener,noreferrer");
        });
    });

    console.log("DC Analytics Website Initialized Securely.");
});
