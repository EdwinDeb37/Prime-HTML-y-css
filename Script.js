/* PRIME — navigation, courts, coaches, map, and account */
"use strict";

/* Firebase configuration.
   Replace these values with your Firebase project settings. */
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
    name: "Central Court",
    location: "Panama City",
    sport: "Basketball",
    type: "basketball",
    lat: 8.9824,
    lng: -79.5199,
    icon: "fa-basketball",
    price: 15
  },
  {
    id: 2,
    name: "Sports Complex",
    location: "San Francisco, Panama",
    sport: "Soccer",
    type: "football",
    lat: 8.9904,
    lng: -79.5057,
    icon: "fa-futbol",
    price: 25
  },
  {
    id: 3,
    name: "Tennis Club",
    location: "Costa del Este, Panama",
    sport: "Tennis",
    type: "tennis",
    lat: 9.0058,
    lng: -79.4642,
    icon: "fa-table-tennis-paddle-ball",
    price: 20
  },
  {
    id: 4,
    name: "Metropolitan Court",
    location: "Omar Park, Panama",
    sport: "Basketball",
    type: "basketball",
    lat: 8.9936,
    lng: -79.5033,
    icon: "fa-basketball",
    price: 12
  },
  {
    id: 5,
    name: "Soccer Field",
    location: "La Chorrera, West Panama",
    sport: "Soccer",
    type: "football",
    lat: 8.8803,
    lng: -79.7833,
    icon: "fa-futbol",
    price: 20
  },
  {
    id: 6,
    name: "Multi-purpose Court",
    location: "Arraijan, West Panama",
    sport: "Volleyball",
    type: "volleyball",
    lat: 8.9495,
    lng: -79.6601,
    icon: "fa-volleyball",
    price: 18
  }
];

const coaches = [
  {
    name: "Alex Rodriguez",
    specialty: "Basketball",
    icon: "fa-basketball",
    description: "Technique, coordination, and sports fundamentals."
  },
  {
    name: "Daniel Martinez",
    specialty: "Soccer",
    icon: "fa-futbol",
    description: "Ball control, tactics, and teamwork."
  },
  {
    name: "Sofia Herrera",
    specialty: "Physical Training",
    icon: "fa-dumbbell",
    description: "Mobility, general strength, and physical conditioning."
  }
];

const articles = [
  {
    category: "TRAINING",
    title: "Build Training Habits",
    text: "Consistency and realistic goals help you improve step by step.",
    icon: "fa-stopwatch",
    tips: [
      "Set specific goals for each session.",
      "Track your progress.",
      "Make time to rest and recover."
    ]
  },
  {
    category: "TEAMWORK",
    title: "Growing Also Means Working Together",
    text: "Communication and respect are essential in every team.",
    icon: "fa-people-group",
    tips: [
      "Listen to your teammates' ideas.",
      "Communicate your goals clearly.",
      "Respect differences and play fair."
    ]
  },
  {
    category: "WELLNESS",
    title: "Train with Balance",
    text: "Resting, staying hydrated, and listening to your body are also part of progress.",
    icon: "fa-heart-pulse",
    tips: [
      "Stay properly hydrated.",
      "Get enough sleep.",
      "Prioritize technique and safety."
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
          <p class="eyebrow">YOUR NEXT LEVEL STARTS TODAY</p>
          <h2>READY TO PLAY?</h2>
        </div>
        <a class="btn" href="#canchas">Explore PRIME</a>
      </div>
    </section>
  `;
}

/* HOME */

function homePage() {
  return `
    <section class="hero">
      <div class="wrap hero-inner">
        <p class="eyebrow">YOUR SPORT. YOUR COMMUNITY. YOUR LEVEL.</p>

        <h1>
          TAKE YOUR GAME<br>
          <span class="highlight">TO THE NEXT LEVEL.</span>
        </h1>

        <p class="hero-copy">
          Find courts, connect with coaches, and become part
          of a community that lives and breathes sports.
        </p>

        <div class="button-row">
          <a class="btn btn-primary" href="#canchas">
            <i class="fa-solid fa-location-dot"></i>
            Find a Court
          </a>

          <a class="btn btn-secondary" href="#entrenadores">
            Meet the Coaches
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <strong>DISCOVER</strong>
            <span>Your sports space</span>
          </div>

          <div class="stat">
            <strong>TRAIN</strong>
            <span>With professionals</span>
          </div>

          <div class="stat">
            <strong>IMPROVE</strong>
            <span>Get better every day</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">MADE FOR ATHLETES</p>
            <h2>EVERYTHING YOU NEED TO MOVE FORWARD</h2>
            <p>
              Find places to play, people who can help you improve,
              and a community that keeps you motivated.
            </p>
          </div>
        </div>

        <div class="feature-grid">
          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-basketball"></i>
            </div>
            <h3>Courts Near You</h3>
            <p>Discover sports facilities and check their locations.</p>
            <a class="text-link" href="#canchas">Explore Courts →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-dumbbell"></i>
            </div>
            <h3>Coaches</h3>
            <p>Find training options to develop your skills.</p>
            <a class="text-link" href="#entrenadores">View Coaches →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-people-group"></i>
            </div>
            <h3>Sports Community</h3>
            <p>Share experiences, ideas, and goals with other athletes.</p>
            <a class="text-link" href="#comunidad">Join the Community →</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">DISCOVER PRIME</p>
            <h2>CHOOSE YOUR NEXT STEP</h2>
          </div>
        </div>

        <div class="feature-grid">
          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-map-location-dot"></i>
            </div>
            <h3>Explore the Map</h3>
            <p>Check out sample sports locations in Panama.</p>
            <a class="text-link" href="#mapa">Open Map →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <h3>Learn and Improve</h3>
            <p>Read tips about training, wellness, and teamwork.</p>
            <a class="text-link" href="#blog">Read Tips →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-user"></i>
            </div>
            <h3>Your Profile</h3>
            <p>Access your PRIME account options.</p>
            <a class="text-link" href="#acceso">My Account →</a>
          </article>
        </div>
      </div>
    </section>

    ${callToAction()}
  `;
}

/* COURTS */

function courtsPage() {
  return `
    ${pageHero(
      "FIND YOUR SPACE",
      "FEATURED COURTS",
      "Search for sports facilities and explore sample locations in Panama."
    )}

    <section class="page-content">
      <div class="wrap">
        <div class="toolbar">
          <div class="field">
            <label for="court-search">Search Courts</label>
            <input id="court-search" type="search"
              placeholder="Name or location">
          </div>

          <div class="field">
            <label for="sport-filter">Sport</label>
            <select id="sport-filter">
              <option value="all">All Sports</option>
              <option value="basketball">Basketball</option>
              <option value="football">Soccer</option>
              <option value="tennis">Tennis</option>
              <option value="volleyball">Volleyball</option>
            </select>
          </div>

          <a class="btn btn-secondary" href="#mapa">
            View Map <i class="fa-solid fa-map"></i>
          </a>
        </div>

        <div class="court-grid" id="court-grid"></div>

        <p class="note">
          Courts and prices are sample data.
          Please confirm availability directly with each facility.
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
                <small>per hour · sample price</small>
              </span>

              <button class="btn btn-primary location-button"
                data-id="${court.id}">
                View Location
              </button>
            </div>
          </div>
        </article>
      `).join("")
      : `<p class="empty-state">No courts found.</p>`;

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

/* MAP */

function mapPage() {
  return `
    ${pageHero(
      "YOUR SPORT, CLOSER",
      "FIND YOUR NEXT COURT",
      "Explore sample locations and find out how to get there."
    )}

    <section class="page-content">
      <div class="wrap map-layout">
        <div id="prime-map" aria-label="Sports courts map"></div>

        <aside>
          <h2 class="large-title">Available Courts</h2>

          <p class="note">
            These are sample locations. Check the addresses
            before traveling.
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
                  Get Directions →
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
      showToast("The map could not be loaded. Check your connection.");
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

/* COACHES */

function coachesPage() {
  return `
    ${pageHero(
      "GET BETTER EVERY DAY",
      "TRAIN WITH PURPOSE",
      "Discover sample coach profiles and opportunities to develop your skills."
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
                  Contact Coach
                </button>
              </div>
            </article>
          `).join("")}
        </div>

        <p class="note">
          These profiles are for demonstration purposes and do not
          necessarily represent available coaches.
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
        `PRIME — Inquiry for ${coach.name}`
      );

      const body = encodeURIComponent(
        `Hello, I would like to request information about ${coach.name}, who specializes in ${coach.specialty}.`
      );

      location.href =
        `mailto:?subject=${subject}&body=${body}`;
    });
  });
}

/* COMMUNITY */

function communityPage() {
  return `
    ${pageHero(
      "MORE THAN A GAME",
      "SPORTS BRING US TOGETHER",
      "PRIME aims to connect athletes and create opportunities to grow together."
    )}

    <section class="page-content">
      <div class="wrap">
        <div class="community-banner">
          <div>
            <p class="eyebrow">GROW WITH PRIME</p>
            <h2>THE NEXT LEVEL IS BUILT TOGETHER.</h2>
            <p>
              Share your goals, meet new people, and discover
              opportunities to enjoy sports.
            </p>
            <a class="btn btn-primary" href="#acceso">
              Join PRIME
            </a>
          </div>

          <ul class="check-list">
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Discover sports opportunities.</span></li>
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Share goals and experiences.</span></li>
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Promote respect and fair competition.</span></li>
            <li><i class="fa-solid fa-circle-check"></i>
              <span>Learn from other athletes.</span></li>
          </ul>
        </div>

        <div class="feature-grid" style="margin-top:22px">
          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-handshake-angle"></i>
            </div>
            <h3>Collaboration</h3>
            <p>Connect with people who share your sports interests.</p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-calendar-check"></i>
            </div>
            <h3>Organization</h3>
            <p>Plan your activities and stay active.</p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <h3>Personal Growth</h3>
            <p>Set goals and celebrate your progress.</p>
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
      "IDEAS FOR YOUR PROGRESS",
      "PRIME INSIGHTS",
      "Tips to help you train, work as a team, and enjoy sports."
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
                  Read Tips →
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

      button.textContent = details.hidden
        ? "Read Tips →"
        : "Hide Tips ↑";
    });
  });
}

/* CONTACT */

function contactPage() {
  return `
    ${pageHero(
      "LET'S TALK",
      "HAVE AN IDEA FOR PRIME?",
      "Send us your questions, suggestions, or proposals."
    )}

    <section class="page-content">
      <div class="wrap contact-layout">
        <aside class="info-panel">
          <h2>Let's Connect</h2>
          <p>
            We want to hear your ideas to improve the sports experience.
          </p>

          <div class="contact-details">
            <div>
              <i class="fa-solid fa-envelope"></i>
              <span>Questions and suggestions</span>
            </div>
            <div>
              <i class="fa-solid fa-globe"></i>
              <span>PRIME · Panama</span>
            </div>
            <div>
              <i class="fa-solid fa-lightbulb"></i>
              <span>Ideas and collaborations</span>
            </div>
          </div>
        </aside>

        <form id="contact-form" class="info-panel form-stack">
          <div class="field">
            <label for="contact-name">Name</label>
            <input id="contact-name" name="name" required>
          </div>

          <div class="field">
            <label for="contact-email">Email Address</label>
            <input id="contact-email" name="email"
              type="email" required>
          </div>

          <div class="field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" required></textarea>
          </div>

          <button class="btn btn-primary" type="submit">
            Prepare Message
            <i class="fa-solid fa-paper-plane"></i>
          </button>

          <small class="muted">
            This form prepares an email; it does not send information to a server.
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

    const subject = encodeURIComponent("Message from PRIME");

    const body = encodeURIComponent(
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n\n` +
      `Message:\n${data.get("message")}`
    );

    location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}

/* LOGIN AND REGISTRATION */

function accessPage() {
  return `
    ${pageHero(
      "YOUR PRIME EXPERIENCE",
      "GET IN THE GAME",
      "Create an account or sign in to access user features."
    )}

    <section class="page-content">
      <div class="wrap auth-layout">
        <aside class="info-panel">
          <h2>Your PRIME Account</h2>
          <p>
            Access your profile and explore the platform's features.
          </p>

          <ul class="check-list">
            <li><i class="fa-solid fa-check"></i>
              <span>Find courts.</span></li>
            <li><i class="fa-solid fa-check"></i>
              <span>Explore coaches.</span></li>
            <li><i class="fa-solid fa-check"></i>
              <span>Discover the community.</span></li>
          </ul>

          <p class="note">
            To enable real sign-in, configure Firebase
            in the JavaScript file.
          </p>
        </aside>

        <section class="auth-card">
          <div class="auth-tabs">
            <button class="auth-tab active" id="login-tab" type="button">
              Sign In
            </button>
            <button class="auth-tab" id="register-tab" type="button">
              Create Account
            </button>
          </div>

          <form id="login-form" class="form-stack">
            <div class="field">
              <label for="login-email">Email Address</label>
              <input id="login-email" name="email"
                type="email" autocomplete="email" required>
            </div>

            <div class="field">
              <label for="login-password">Password</label>
              <input id="login-password" name="password"
                type="password" autocomplete="current-password"
                minlength="6" required>
            </div>

            <button class="btn btn-primary" type="submit">
              Sign In
            </button>
          </form>

          <form id="register-form" class="form-stack" hidden>
            <div class="field">
              <label for="register-name">Name</label>
              <input id="register-name" name="name"
                autocomplete="name" required>
            </div>

            <div class="field">
              <label for="register-email">Email Address</label>
              <input id="register-email" name="email"
                type="email" autocomplete="email" required>
            </div>

            <div class="field">
              <label for="register-password">Password</label>
              <input id="register-password" name="password"
                type="password" autocomplete="new-password"
                minlength="6" required>
            </div>

            <button class="btn btn-primary" type="submit">
              Create Account
            </button>
          </form>

          <div class="separator">Or continue with</div>

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
      showToast("Configure Firebase to enable sign-in.");
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
      showToast("Sign-in failed. Please check your details.");
      console.error(error);
    }
  });

  register.addEventListener("submit", async event => {
    event.preventDefault();

    if (!auth) {
      showToast("Configure Firebase to enable registration.");
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
      showToast("Account creation failed. Please check your details.");
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
    showToast("Configure Firebase to enable sign-in.");
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
    showToast("Social sign-in could not be completed.");
    console.error(error);
  }
}

/* PROFILE */

function profilePage() {
  if (!currentUser) {
    return `
      ${pageHero(
        "YOUR ACCOUNT",
        "MY PRIME PROFILE",
        "Sign in to access your profile."
      )}

      <section class="page-content">
        <div class="wrap info-panel">
          <p>You need to sign in to view your profile.</p>
          <a class="btn btn-primary" href="#acceso">My Account</a>
        </div>
      </section>
    `;
  }

  const name = currentUser.displayName || currentUser.email || "PRIME";

  return `
    ${pageHero(
      "YOUR ACCOUNT",
      "MY PRIME PROFILE",
      "View your account information."
    )}

    <section class="page-content">
      <div class="wrap profile-layout">
        <article class="profile-card">
          <div class="profile-avatar">
            <i class="fa-solid fa-user"></i>
          </div>

          <h2>${escapeHTML(name)}</h2>
          <p>Email: ${escapeHTML(currentUser.email || "")}</p>

          <button id="logout-button" class="btn btn-primary">
            Sign Out
          </button>
        </article>

        <aside class="info-panel">
          <h2>Keep Exploring</h2>
          <p>Discover sports facilities and training opportunities.</p>
          <a class="text-link" href="#canchas">Explore Courts →</a>
          <br>
          <a class="text-link" href="#entrenadores">View Coaches →</a>
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
    showToast("You have signed out.");
  });
}

/* PAGE NAVIGATION */

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

/* LIGHT AND DARK THEME */

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
      ? "Switch to light mode"
      : "Switch to dark mode";

    button.setAttribute("aria-label", button.title);
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
        accountLink.textContent = user ? "My Profile" : "My Account";
      }

      if (currentRoute() === "perfil") {
        renderRoute();
      }
    });
  } catch (error) {
    console.error("Firebase error:", error);
  }
}

/* INITIALIZATION */

function initialize() {
  const year = $("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem("prime-theme") || "dark";

  applyTheme(savedTheme);
  initializeFirebase();

  $("#theme-toggle")?.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
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