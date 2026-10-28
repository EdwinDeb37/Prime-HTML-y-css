/* =========================================
   PRIME - FUNCIONES E INTERACTIVIDAD
   Archivo: Script.js
   ========================================= */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    // =====================================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // 2. MENÚ DE NAVEGACIÓN PARA MÓVILES
    // =====================================

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("open");

            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Cerrar el menú si se hace clic fuera de él.
        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Cerrar el menú con la tecla Escape.
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Si se cambia a una pantalla grande, cerrar el menú móvil.
        window.addEventListener("resize", function () {

            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    // =====================================
    // 3. MENSAJES EMERGENTES
    // =====================================

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    let toastTimeout;

    function showToast(message) {

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(function () {
            toast.classList.remove("show");
        }, 3500);
    }


    // =====================================
    // 4. BUSCADOR Y FILTROS DE CANCHAS
    // =====================================

    const searchInput = document.getElementById("court-search-input");
    const sportFilter = document.getElementById("sport-filter");
    const searchButton = document.getElementById("search-courts-btn");

    const courtCards = document.querySelectorAll(".court-card");
    const emptyResults = document.getElementById("empty-results");

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function filterCourts() {

        if (!searchInput || !sportFilter) return;

        const searchTerm = normalizeText(searchInput.value);
        const selectedSport = sportFilter.value;

        let visibleCards = 0;

        courtCards.forEach(function (card) {

            const cardSport = card.dataset.sport || "";

            const cardSearch = normalizeText(
                (card.dataset.search || "") + " " + card.textContent
            );

            const matchesSearch = cardSearch.includes(searchTerm);

            const matchesSport =
                selectedSport === "todos" ||
                cardSport === selectedSport;

            const shouldShow = matchesSearch && matchesSport;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCards++;
            }
        });

        if (emptyResults) {
            emptyResults.hidden = visibleCards !== 0;
        }
    }

    if (searchInput) {

        searchInput.addEventListener("input", filterCourts);

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                filterCourts();
            }
        });
    }

    if (sportFilter) {
        sportFilter.addEventListener("change", filterCourts);
    }

    if (searchButton) {

        searchButton.addEventListener("click", function () {

            filterCourts();

            const visibleCards = Array.from(courtCards).filter(function (card) {
                return !card.hidden;
            }).length;

            if (visibleCards > 0) {
                showToast(
                    visibleCards === 1
                        ? "Encontramos 1 espacio deportivo."
                        : "Encontramos " + visibleCards + " espacios deportivos."
                );
            } else {
                showToast("No encontramos canchas con esos criterios.");
            }
        });
    }


    // =====================================
    // 5. BOTONES DE INFORMACIÓN DE CANCHAS
    // =====================================

    const courtButtons = document.querySelectorAll(".court-button");

    courtButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const courtName = button.dataset.court || "Esta cancha";

            showToast(
                courtName +
                ": la ubicación, disponibilidad y los precios están pendientes de confirmación."
            );
        });
    });


    // =====================================
    // 6. FORMULARIO DE CONTACTO
    // =====================================

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;
            }

            const nameInput = document.getElementById("name");
            const name = nameInput ? nameInput.value.trim() : "";

            showToast(
                "¡Gracias" +
                (name ? ", " + name : "") +
                "! El formulario funciona, pero todavía necesita conectarse a un servicio de envío."
            );

            /*
             * IMPORTANTE:
             * Este formulario todavía NO envía información a un correo.
             * Para recibir mensajes reales, será necesario conectarlo
             * a un servicio de formularios o a un servidor.
             *
             * No se envían ni se almacenan los datos en este código.
             */

            contactForm.reset();
        });
    }


    // =====================================
    // 7. ANIMACIONES AL DESPLAZARSE
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        // Mostrar todo si el navegador no admite las animaciones.
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    // =====================================
    // 8. RESALTAR LA SECCIÓN ACTUAL
    // EN LA BARRA DE NAVEGACIÓN
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navLinks.forEach(function (link) {

                            const linkTarget = link.getAttribute("href");

                            if (linkTarget === "#" + currentId) {
                                link.classList.add("active");
                            } else {
                                link.classList.remove("active");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }


    // =====================================
    // 9. INICIALIZACIÓN
    // =====================================

    // Mostrar las secciones visibles al cargar la página.
    revealElements.forEach(function (element) {

        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.9) {
            element.classList.add("visible");
        }
    });

    console.log("PRIME está listo. ¡Activa tu potencial!");

});