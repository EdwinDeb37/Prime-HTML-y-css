/* PRIME — navegación, canchas, entrenadores, mapa y cuenta */
"use strict";

/* Configuración de Firebase.
   Reemplaza estos valores por los de tu proyecto Firebase. */
const firebaseConfig = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  projectId: "PEGA_AQUI_TU_PROJECT_ID",
  appId: "PEGA_AQUI_TU_APP_ID"
};

let auth = null;
let currentUser = null;
let mapInstance = null;
let mapMarkers = [];

const courts = [
  {
    id: 1,
    name: "Cancha Central",
    location: "Ciudad de Panamá",
    sport: "Baloncesto",
    type: "basketball",
    lat: 8.9824,
    lng: -79.5199,
    icon: "fa-basketball",
    price: 15
  },
  {
    id: 2,
    name: "Complejo Deportivo",
    location: "San Francisco, Panamá",
    sport: "Fútbol",
    type: "football",
    lat: 8.9904,
    lng: -79.5057,
    icon: "fa-futbol",
    price: 25
  },
  {
    id: 3,
    name: "Club de Tenis",
    location: "Costa del Este, Panamá",
    sport: "Tenis",
    type: "tennis",
    lat: 9.0058,
    lng: -79.4642,
    icon: "fa-table-tennis-paddle-ball",
    price: 20
  },
  {
    id: 4,
    name: "Cancha Metropolitana",
    location: "Parque Omar, Panamá",
    sport: "Baloncesto",
    type: "basketball",
    lat: 8.9936,
    lng: -79.5033,
    icon: "fa-basketball",
    price: 12
  },
  {
    id: 5,
    name: "Campo de Fútbol",
    location: "La Chorrera, Panamá Oeste",
    sport: "Fútbol",
    type: "football",
    lat: 8.8803,
    lng: -79.7833,
    icon: "fa-futbol",
    price: 20
  },
  {
    id: 6,
    name: "Cancha Multiuso",
    location: "Arraiján, Panamá Oeste",
    sport: "Voleibol",
    type: "volleyball",
    lat: 8.9495,
    lng: -79.6601,
    icon: "fa-volleyball",
    price: 18
  }
];

const coaches = [
  {
    name: "Alex Rodríguez",
    specialty: "Baloncesto",
    icon: "fa-basketball",
    description: "Técnica, coordinación y fundamentos deportivos."
  },
  {
    name: "Daniel Martínez",
    specialty: "Fútbol",
    icon: "fa-futbol",
    description: "Control del balón, táctica y trabajo en equipo."
  },
  {
    name: "Sofía Herrera",
    specialty: "Preparación física",
    icon: "fa-dumbbell",
    description: "Movilidad, fuerza general y preparación física."
  }
];

const articles = [
  {
    category: "ENTRENAMIENTO",
    title: "Construye hábitos de entrenamiento",
    text: "La constancia y los objetivos realistas te ayudan a mejorar paso a paso.",
    icon: "fa-stopwatch",
    tips: [
      "Define objetivos concretos para cada sesión.",
      "Registra tus avances.",
      "Reserva tiempo para descansar y recuperarte."
    ]
  },
  {
    category: "TRABAJO EN EQUIPO",
    title: "Crecer también significa colaborar",
    text: "La comunicación y el respeto son fundamentales en cualquier equipo.",
    icon: "fa-people-group",
    tips: [
      "Escucha las ideas de tus compañeros.",
      "Comunica tus objetivos con claridad.",
      "Respeta las diferencias y juega limpio."
    ]
  },
  {
    category: "BIENESTAR",
    title: "Entrena de forma equilibrada",
    text: "Descansar, hidratarse y escuchar al cuerpo también forman parte del progreso.",
    icon: "fa-heart-pulse",
    tips: [
      "Mantén una hidratación adecuada.",
      "Duerme lo suficiente.",
      "Prioriza la técnica y la seguridad."
    ]
  }
];

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

function pageHero(eyebrow, title, description) {
  return `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </section>
  `;
}

function callToAction() {
  return `
    <section class="cta">
      <div class="wrap cta-inner">
        <div>
          <p class="eyebrow">TU PRÓXIMO NIVEL EMPIEZA HOY</p>
          <h2>¿LISTO PARA JUGAR?</h2>
        </div>
        <a class="btn" href="#canchas">Explorar PRIME</a>
      </div>
    </section>
  `;
}

/* INICIO */

function homePage() {
  return `
    <section class="hero">
      <div class="wrap hero-inner">
        <p class="eyebrow">TU DEPORTE. TU COMUNIDAD. TU NIVEL.</p>

        <h1>
          LLEVA TU JUEGO<br>
          <span class="highlight">AL SIGUIENTE NIVEL.</span>
        </h1>

        <p class="hero-copy">
          Encuentra canchas, conecta con entrenadores y forma parte
          de una comunidad que vive el deporte.
        </p>

        <div class="button-row">
          <a class="btn btn-primary" href="#canchas">
            <i class="fa-solid fa-location-dot"></i>
            Encuentra una cancha
          </a>

          <a class="btn btn-secondary" href="#entrenadores">
            Conoce a los entrenadores
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <strong>ENCUENTRA</strong>
            <span>Tu espacio deportivo</span>
          </div>

          <div class="stat">
            <strong>ENTRENA</strong>
            <span>Con profesionales</span>
          </div>

          <div class="stat">
            <strong>SUPÉRATE</strong>
            <span>Mejora cada día</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">HECHO PARA DEPORTISTAS</p>
            <h2>TODO PARA AVANZAR</h2>
            <p>
              Encuentra espacios para jugar, personas que te ayuden
              a mejorar y una comunidad que te motive.
            </p>
          </div>
        </div>

        <div class="feature-grid">
          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-basketball"></i>
            </div>
            <h3>Canchas cerca de ti</h3>
            <p>Descubre instalaciones deportivas y consulta sus ubicaciones.</p>
            <a class="text-link" href="#canchas">Explorar canchas →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-dumbbell"></i>
            </div>
            <h3>Entrenadores</h3>
            <p>Encuentra opciones de entrenamiento para desarrollar tus habilidades.</p>
            <a class="text-link" href="#entrenadores">Ver entrenadores →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-people-group"></i>
            </div>
            <h3>Comunidad deportiva</h3>
            <p>Comparte experiencias, ideas y objetivos con otros deportistas.</p>
            <a class="text-link" href="#comunidad">Conocer comunidad →</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">DESCUBRE PRIME</p>
            <h2>ELIGE TU PRÓXIMO PASO</h2>
          </div>
        </div>

        <div class="feature-grid">
          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-map-location-dot"></i>
            </div>
            <h3>Explora el mapa</h3>
            <p>Consulta ubicaciones deportivas de ejemplo en Panamá.</p>
            <a class="text-link" href="#mapa">Abrir mapa →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <h3>Aprende y mejora</h3>
            <p>Lee consejos sobre entrenamiento, bienestar y trabajo en equipo.</p>
            <a class="text-link" href="#blog">Leer consejos →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-user"></i>
            </div>
            <h3>Tu perfil</h3>
            <p>Accede a las opciones de cuenta de PRIME.</p>
            <a class="text-link" href="#acceso">Mi cuenta →</a>
          </article>
        </div>
      </div>
    </section>

    ${callToAction()}
  `;
}

/* CANCHAS */

function courtsPage() {
  return `
    ${pageHero(
      "ENCUENTRA TU ESPACIO",
      "CANCHAS DESTACADAS",
      "Busca instalaciones deportivas y explora ubicaciones de ejemplo en Panamá."
    )}

    <section class="page-content">
      <div class="wrap">
        <div class="toolbar">
          <div class="field">
            <label for="court-search">Buscar cancha</label>
            <input id="court-search" type="search"
              placeholder="Nombre o ubicación">
          </div>

          <div class="field">
            <label for="sport-filter">Deporte</label>
            <select id="sport-filter">
              <option value="all">Todos los deportes</option>
              <option value="basketball">Baloncesto</option>
              <option value="football">Fútbol</option>
              <option value="tennis">Tenis</option>
              <option value="volleyball">Voleibol</option>
            </select>
          </div>

          <a class="btn btn-secondary" href="#mapa">
            Ver mapa <i class="fa-solid fa-map"></i>
          </a>
        </div>

        <div class="court-grid" id="court-grid"></div>

        <p class="note">
          Las canchas y tarifas son datos de demostración.
          Confirma la disponibilidad directamente con cada instalación.
        </p>
      </div>
    </section>
  `;
}

function setupCourtFilters() {
  const search = $("#court-search");
  const filter = $("#sport-filter");
  const grid = $("#court-grid");

  if (!search || !filter || !grid) return;

  function render() {
    const query = search.value.trim().toLowerCase();
    const sport = filter.value;

    const results = courts.filter(court => {
      const matchesText =
        `${court.name} ${court.location} ${court.sport}`
          .toLowerCase()
          .includes(query);

      const matchesSport =
        sport === "all" || court.type === sport;

      return matchesText && matchesSport;
    });

    grid.innerHTML = results.length
      ? results.map(court => `
        <article class="court-card">
          <div class="court-visual">
            <span class="court-sport">${escapeHTML(court.sport)}</span>
            <i class="fa-solid ${court.icon}"></i>
          </div>

          <div class="court-content">
            <h3>${escapeHTML(court.name)}</h3>

            <div class="court-location">
              <i class="fa-solid fa-location-dot"></i>
              <span>${escapeHTML(court.location)}</span>
            </div>

            <div class="court-bottom">
              <span class="court-price">
                $${court.price}
                <small>por hora · ejemplo</small>
              </span>

              <button class="btn btn-primary location-button"
                data-id="${court.id}">
                Ver ubicación
              </button>
            </div>
          </div>
        </article>
      `).join("")
      : `<p class="empty-state">No se encontraron canchas.</p>`;

    $$(".location-button", grid).forEach(button => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        location.hash = "#mapa";

        setTimeout(() => {
          const court = courts.find(item => item.id === id);

          if (court && mapInstance) {
            mapInstance.setView([court.lat, court.lng], 15);
            const marker = mapMarkers.find(item => item.id === id);
            marker?.marker.openPopup();
          }
        }, 350);
      });
    });
  }

  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  render();
}

/* MAPA */

function mapPage() {
  return `
    ${pageHero(
      "TU DEPORTE, MÁS CERCA",
      "ENCUENTRA TU PRÓXIMA CANCHA",
      "Explora ubicaciones de ejemplo y consulta cómo llegar."
    )}

    <section class="page-content">
      <div class="wrap map-layout">
        <div id="prime-map" aria-label="Mapa de canchas"></div>

        <aside>
          <h2 class="large-title">Canchas disponibles</h2>

          <p class="note">
            Ubicaciones de demostración. Comprueba las direcciones
            antes de desplazarte.
          </p>

          <div class="map-list">
            ${courts.map(court => `
              <div class="map-list-item">
                <strong>${escapeHTML(court.name)}</strong>
                <span>
                  ${escapeHTML(court.location)} ·
                  ${escapeHTML(court.sport)}
                </span>
                <a class="text-link" target="_blank" rel="noopener"
                  href="https://www.google.com/maps/dir/?api=1&destination=${court.lat},${court.lng}">
                  Cómo llegar →
                </a>
              </div>
            `).join("")}
          </div>
        </aside>
      </div>
    </section>
  `;
}

function initializeMap() {
  const element = $("#prime-map");

  if (!element || typeof L === "undefined") {
    if (element) {
      showToast("No se pudo cargar el mapa. Revisa tu conexión.");
    }
    return;
  }

  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
    mapMarkers = [];
  }

  mapInstance = L.map(element).setView([8.9824, -79.5199], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(mapInstance);

  mapMarkers = courts.map(court => {
    const marker = L.marker([court.lat, court.lng])
      .addTo(mapInstance)
      .bindPopup(`
        <strong>${escapeHTML(court.name)}</strong><br>
        ${escapeHTML(court.location)}<br>
        ${escapeHTML(court.sport)}
      `);

    return { id: court.id, marker };
  });
}

/* ENTRENADORES */

function coachesPage() {
  return `
    ${pageHero(
      "MEJORA CADA DÍA",
      "ENTRENA CON PROPÓSITO",
      "Descubre perfiles de ejemplo y opciones para desarrollar tus habilidades."
    )}

    <section class="page-content">
      <div class="wrap">
        <div class="coach-grid">
          ${coaches.map((coach, index) => `
            <article class="coach-card">
              <div class="coach-visual">
                <i class="fa-solid ${coach.icon}"></i>
              </div>

              <div class="coach-content">
                <h3>${escapeHTML(coach.name)}</h3>
                <div class="coach-specialty">
                  ${escapeHTML(coach.specialty)}
                </div>
                <p>${escapeHTML(coach.description)}</p>

                <button class="btn btn-primary coach-contact"
                  data-coach="${index}">
                  Consultar entrenador
                </button>
              </div>
            </article>
          `).join("")}
        </div>

        <p class="note">
          Estos perfiles son demostrativos y no representan
          necesariamente entrenadores disponibles.
        </p>
      </div>
    </section>
  `;
}

function setupCoachButtons() {
  $$(".coach-contact").forEach(button => {
    button.addEventListener("click", () => {
      const coach = coaches[Number(button.dataset.coach)];

      const subject = encodeURIComponent(
        `PRIME — Consulta para ${coach.name}`
      );

      const body = encodeURIComponent(
        `Hola, quisiera consultar información sobre ${coach.name}, especialista en ${coach.specialty}.`
      );

      location.href =
        `mailto:?subject=${subject}&body=${body}`;
    });
  });
}

/* COMUNIDAD */

function communityPage() {
  return `
    ${pageHero(
      "MÁS QUE UN JUEGO",
      "EL DEPORTE NOS CONECTA",
      "PRIME busca conectar deportistas y crear oportunidades para crecer juntos."
    )}

    <section class="page-content">
      <div class="wrap">
        <div class="community-banner">
          <div>
            <p class="eyebrow">CRECE CON PRIME</p>
            <h2>EL SIGUIENTE NIVEL SE CONSTRUYE EN EQUIPO.</h2>
            <p>
              Comparte metas, conoce nuevas personas y descubre
              oportunidades para disfrutar del deporte.
            </p>
            <a class="btn btn-primary" href="#acceso">
              Únete a PRIME
            </a>
          </div>

          <ul class="check-list">
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Descubre oportunidades deportivas.</span></li>
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Comparte metas y experiencias.</span></li>
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Promueve el respeto y la competencia sana.</span></li>
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Aprende de otros deportistas.</span></li>
          </ul>
        </div>

        <div class="feature-grid" style="margin-top:22px">
          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-handshake-angle"></i>
            </div>
            <h3>Colaboración</h3>
            <p>Conecta con personas que comparten tus intereses deportivos.</p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-calendar-check"></i>
            </div>
            <h3>Organización</h3>
            <p>Planifica tus actividades y mantente activo.</p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <h3>Superación</h3>
            <p>Establece objetivos y celebra tus avances.</p>
          </article>
        </div>
      </div>
    </section>
  `;
}

/* BLOG */

function blogPage() {
  return `
    ${pageHero(
      "IDEAS PARA TU PROGRESO",
      "PRIME INSIGHTS",
      "Consejos para entrenar, trabajar en equipo y disfrutar del deporte."
    )}

    <section class="page-content">
      <div class="wrap">
        <div class="article-grid">
          ${articles.map((article, index) => `
            <article class="article-card">
              <div class="court-visual">
                <i class="fa-solid ${article.icon}"></i>
              </div>

              <div class="article-body">
                <span class="article-category">
                  ${escapeHTML(article.category)}
                </span>

                <h3>${escapeHTML(article.title)}</h3>
                <p>${escapeHTML(article.text)}</p>

                <button class="text-link read-more"
                  data-article="${index}">
                  Leer consejo →
                </button>

                <div class="article-details" hidden>
                  <ul class="check-list">
                    ${article.tips.map(tip => `
                      <li>
                        <i class="fa-solid fa-check"></i>
                        <span>${escapeHTML(tip)}</span>
                      </li>
                    `).join("")}
                  </ul>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function setupArticles() {
  $$(".read-more").forEach(button => {
    button.addEventListener("click", () => {
      const details = button.parentElement.querySelector(".article-details");
      details.hidden = !details.hidden;
      button.textContent = details.hidden ? "Leer consejo →" : "Ocultar consejo ↑";
    });
  });
}

/* CONTACTO */

function contactPage() {
  return `
    ${pageHero(
      "HABLEMOS",
      "¿TIENES UNA IDEA PARA PRIME?",
      "Envíanos tus dudas, sugerencias o propuestas."
    )}

    <section class="page-content">
      <div class="wrap contact-layout">
        <aside class="info-panel">
          <h2>Conectemos</h2>
          <p>
            Queremos conocer tus ideas para mejorar la experiencia deportiva.
          </p>

          <div class="contact-details">
            <div>
              <i class="fa-solid fa-envelope"></i>
              <span>Consultas y sugerencias</span>
            </div>
            <div>
              <i class="fa-solid fa-globe"></i>
              <span>PRIME · Panamá</span>
            </div>
            <div>
              <i class="fa-solid fa-lightbulb"></i>
              <span>Ideas y colaboraciones</span>
            </div>
          </div>
        </aside>

        <form id="contact-form" class="info-panel form-stack">
          <div class="field">
            <label for="contact-name">Nombre</label>
            <input id="contact-name" name="name" required>
          </div>

          <div class="field">
            <label for="contact-email">Correo electrónico</label>
            <input id="contact-email" name="email"
              type="email" required>
          </div>

          <div class="field">
            <label for="contact-message">Mensaje</label>
            <textarea id="contact-message" name="message" required></textarea>
          </div>

          <button class="btn btn-primary" type="submit">
            Preparar mensaje
            <i class="fa-solid fa-paper-plane"></i>
          </button>

          <small class="muted">
            Este formulario prepara un correo; no lo envía a un servidor.
          </small>
        </form>
      </div>
    </section>
  `;
}

function setupContactForm() {
  $("#contact-form")?.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const subject = encodeURIComponent("Mensaje desde PRIME");

    const body = encodeURIComponent(
      `Nombre: ${data.get("name")}\n` +
      `Correo: ${data.get("email")}\n\n` +
      `Mensaje:\n${data.get("message")}`
    );

    location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}

/* ACCESO Y REGISTRO */

function accessPage() {
  return `
    ${pageHero(
      "TU EXPERIENCIA PRIME",
      "ENTRA EN JUEGO",
      "Crea una cuenta o inicia sesión para acceder a las opciones de usuario."
    )}

    <section class="page-content">
      <div class="wrap auth-layout">
        <aside class="info-panel">
          <h2>Tu cuenta PRIME</h2>
          <p>
            Accede a tu perfil y descubre las opciones de la plataforma.
          </p>

          <ul class="check-list">
            <li><i class="fa-solid fa-check"></i>
              <span>Consulta canchas.</span></li>
            <li><i class="fa-solid fa-check"></i>
              <span>Explora entrenadores.</span></li>
            <li><i class="fa-solid fa-check"></i>
              <span>Conoce la comunidad.</span></li>
          </ul>

          <p class="note">
            Para activar el inicio de sesión real, configura Firebase
            en el código JavaScript.
          </p>
        </aside>

        <section class="auth-card">
          <div class="auth-tabs">
            <button class="auth-tab active" id="login-tab" type="button">
              Iniciar sesión
            </button>
            <button class="auth-tab" id="register-tab" type="button">
              Crear cuenta
            </button>
          </div>

          <form id="login-form" class="form-stack">
            <div class="field">
              <label for="login-email">Correo electrónico</label>
              <input id="login-email" name="email"
                type="email" autocomplete="email" required>
            </div>

            <div class="field">
              <label for="login-password">Contraseña</label>
              <input id="login-password" name="password"
                type="password" autocomplete="current-password"
                minlength="6" required>
            </div>

            <button class="btn btn-primary" type="submit">
              Iniciar sesión
            </button>
          </form>

          <form id="register-form" class="form-stack" hidden>
            <div class="field">
              <label for="register-name">Nombre</label>
              <input id="register-name" name="name"
                autocomplete="name" required>
            </div>

            <div class="field">
              <label for="register-email">Correo electrónico</label>
              <input id="register-email" name="email"
                type="email" autocomplete="email" required>
            </div>

            <div class="field">
              <label for="register-password">Contraseña</label>
              <input id="register-password" name="password"
                type="password" autocomplete="new-password"
                minlength="6" required>
            </div>

            <button class="btn btn-primary" type="submit">
              Crear cuenta
            </button>
          </form>

          <div class="separator">O continúa con</div>

          <div class="social-buttons">
            <button class="social-button" type="button"
              data-provider="Google">
              <i class="fa-brands fa-google"></i> Google
            </button>

            <button class="social-button" type="button"
              data-provider="Apple">
              <i class="fa-brands fa-apple"></i> Apple
            </button>
          </div>
        </section>
      </div>
    </section>
  `;
}

function setupAuthForms() {
  const login = $("#login-form");
  const register = $("#register-form");
  const loginTab = $("#login-tab");
  const registerTab = $("#register-tab");

  if (!login || !register) return;

  loginTab.addEventListener("click", () => {
    login.hidden = false;
    register.hidden = true;
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  });

  registerTab.addEventListener("click", () => {
    login.hidden = true;
    register.hidden = false;
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
  });

  login.addEventListener("submit", async event => {
    event.preventDefault();

    if (!auth) {
      showToast("Configura Firebase para activar el acceso.");
      return;
    }

    const data = new FormData(login);

    try {
      await auth.signInWithEmailAndPassword(
        String(data.get("email")).trim(),
        String(data.get("password"))
      );

      location.hash = "#perfil";
    } catch (error) {
      showToast("No se pudo iniciar sesión. Revisa tus datos.");
      console.error(error);
    }
  });

  register.addEventListener("submit", async event => {
    event.preventDefault();

    if (!auth) {
      showToast("Configura Firebase para activar el registro.");
      return;
    }

    const data = new FormData(register);

    try {
      const credential = await auth.createUserWithEmailAndPassword(
        String(data.get("email")).trim(),
        String(data.get("password"))
      );

      await credential.user.updateProfile({
        displayName: String(data.get("name")).trim()
      });

      currentUser = credential.user;
      location.hash = "#perfil";
    } catch (error) {
      showToast("No se pudo crear la cuenta. Revisa los datos.");
      console.error(error);
    }
  });

  $$("[data-provider]").forEach(button => {
    button.addEventListener("click", () => {
      socialLogin(button.dataset.provider);
    });
  });
}

async function socialLogin(providerName) {
  if (!auth) {
    showToast("Configura Firebase para activar el acceso.");
    return;
  }

  let provider;

  if (providerName === "Google") {
    provider = new firebase.auth.GoogleAuthProvider();
  } else {
    provider = new firebase.auth.OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
  }

  try {
    await auth.signInWithPopup(provider);
    location.hash = "#perfil";
  } catch (error) {
    showToast("No se pudo completar el acceso social.");
    console.error(error);
  }
}

/* PERFIL */

function profilePage() {
  if (!currentUser) {
    return `
      ${pageHero(
        "TU CUENTA",
        "MI PERFIL PRIME",
        "Inicia sesión para acceder a tu perfil."
      )}

      <section class="page-content">
        <div class="wrap info-panel">
          <p>Necesitas iniciar sesión para ver tu perfil.</p>
          <a class="btn btn-primary" href="#acceso">Mi cuenta</a>
        </div>
      </section>
    `;
  }

  const name = currentUser.displayName || currentUser.email || "PRIME";

  return `
    ${pageHero(
      "TU CUENTA",
      "MI PERFIL PRIME",
      "Consulta la información de tu sesión."
    )}

    <section class="page-content">
      <div class="wrap profile-layout">
        <article class="profile-card">
          <div class="profile-avatar">
            <i class="fa-solid fa-user"></i>
          </div>

          <h2>${escapeHTML(name)}</h2>
          <p>Correo: ${escapeHTML(currentUser.email || "")}</p>

          <button id="logout-button" class="btn btn-primary">
            Cerrar sesión
          </button>
        </article>

        <aside class="info-panel">
          <h2>Continúa explorando</h2>
          <p>Descubre espacios deportivos y opciones de entrenamiento.</p>
          <a class="text-link" href="#canchas">Explorar canchas →</a>
          <br>
          <a class="text-link" href="#entrenadores">Ver entrenadores →</a>
        </aside>
      </div>
    </section>
  `;
}

function setupLogout() {
  $("#logout-button")?.addEventListener("click", async () => {
    if (auth) {
      await auth.signOut();
    }

    currentUser = null;
    location.hash = "#inicio";
    showToast("Has cerrado sesión.");
  });
}

/* NAVEGACIÓN ENTRE PÁGINAS */

function currentRoute() {
  const route = (location.hash || "#inicio").slice(1).split("?")[0];

  const validRoutes = [
    "inicio",
    "canchas",
    "mapa",
    "entrenadores",
    "comunidad",
    "blog",
    "contacto",
    "acceso",
    "perfil"
  ];

  return validRoutes.includes(route) ? route : "inicio";
}

function renderRoute() {
  const route = currentRoute();
  const content = $("#page-content");

  if (route !== "mapa" && mapInstance) {
    mapInstance.remove();
    mapInstance = null;
    mapMarkers = [];
  }

  const pages = {
    inicio: homePage,
    canchas: courtsPage,
    mapa: mapPage,
    entrenadores: coachesPage,
    comunidad: communityPage,
    blog: blogPage,
    contacto: contactPage,
    acceso: accessPage,
    perfil: profilePage
  };

  content.innerHTML = pages[route]();

  $$(".nav-link").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${route}`
    );
  });

  window.scrollTo({ top: 0, behavior: "auto" });

  if (route === "canchas") setupCourtFilters();
  if (route === "mapa") setTimeout(initializeMap, 100);
  if (route === "entrenadores") setupCoachButtons();
  if (route === "blog") setupArticles();
  if (route === "contacto") setupContactForm();
  if (route === "acceso") setupAuthForms();
  if (route === "perfil") setupLogout();
}

/* TEMA CLARO Y OSCURO */

function applyTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  document.documentElement.dataset.theme = selectedTheme;
  localStorage.setItem("prime-theme", selectedTheme);

  const button = $("#theme-toggle");

  if (button) {
    button.innerHTML = selectedTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';

    button.title = selectedTheme === "dark"
      ? "Activar modo claro"
      : "Activar modo oscuro";
  }
}

/* IDIOMA */

function applyLanguage(language) {
  const select = $("#language-select");

  if (select) {
    select.value = language;
  }

  document.documentElement.lang = language;
  localStorage.setItem("prime-language", language);

  if (language !== "es") {
    showToast(
      "La traducción completa de esta versión está disponible en español."
    );
  }
}

/* FIREBASE */

function initializeFirebase() {
  const configured =
    firebaseConfig.apiKey !== "PEGA_AQUI_TU_API_KEY" &&
    firebaseConfig.authDomain !== "PEGA_AQUI_TU_AUTH_DOMAIN" &&
    firebaseConfig.projectId !== "PEGA_AQUI_TU_PROJECT_ID" &&
    firebaseConfig.appId !== "PEGA_AQUI_TU_APP_ID";

  if (!configured || typeof firebase === "undefined") {
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();

    auth.onAuthStateChanged(user => {
      currentUser = user;

      const accountLink = $("#account-link");

      if (accountLink) {
        accountLink.href = user ? "#perfil" : "#acceso";
        accountLink.textContent = user ? "Mi perfil" : "Mi cuenta";
      }

      if (currentRoute() === "perfil") {
        renderRoute();
      }
    });
  } catch (error) {
    console.error("Error de Firebase:", error);
  }
}

/* INICIALIZACIÓN */

function initialize() {
  const year = $("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem("prime-theme") || "dark";
  const savedLanguage = localStorage.getItem("prime-language") || "es";

  applyTheme(savedTheme);
  applyLanguage(savedLanguage);
  initializeFirebase();

  $("#theme-toggle")?.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
  });

  $("#language-select")?.addEventListener("change", event => {
    applyLanguage(event.target.value);
  });

  const menuToggle = $("#menu-toggle");
  const navMenu = $("#nav-menu");

  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  $$("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");

      if (menuToggle) {
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  window.addEventListener("hashchange", renderRoute);

  renderRoute();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
  initialize();
}