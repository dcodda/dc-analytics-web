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
    // 2. NAVBAR INTELIGENTE FLUIDA (Ocultar al bajar, mostrar al subir)
    // -------------------------------------------------------------
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    let isTicking = false;

    window.addEventListener("scroll", () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                // Siempre visible al inicio de la página
                if (currentScrollY <= 30) {
                    navbar.classList.remove("nav-hidden");
                } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolleando hacia abajo: ocultar suavemente
                    navbar.classList.add("nav-hidden");
                } else if (currentScrollY < lastScrollY) {
                    // Scrolleando hacia arriba: reaparecer fluidamente
                    navbar.classList.remove("nav-hidden");
                }

                lastScrollY = currentScrollY;
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // -------------------------------------------------------------
    // 3. ENLACE DIRECTO DE WHATSAPP CON MENSAJE PREDEFINIDO
    // -------------------------------------------------------------
    const whatsappButtons = document.querySelectorAll(".btn-whatsapp");
    const defaultMsg = encodeURIComponent("Hola! Estuve viendo el sitio web de DC Analytics y me gustaría conversar sobre una auditoría analítica para mi negocio.");

    whatsappButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const phone = (btn.getAttribute("data-phone") || "5493704325018").replace(/[^0-9]/g, "");
            window.open(`https://wa.me/${phone}?text=${defaultMsg}`, "_blank", "noopener,noreferrer");
        });
    });

    // -------------------------------------------------------------
    // 4. MOTOR DE ANIMACIÓN: SCROLL REVEAL (INTERSECTION OBSERVER)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optimización de rendimiento
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    console.log("DC Analytics Website Initialized Securely.");
});
