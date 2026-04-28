/* ======= TYPED TEXT EFFECT ======= */
const roles = [
  "Analista de Suporte Técnico",
  "20+ Anos de Experiência 💪",
  "Estudante de Desenvolvimento 📚",
  "Solucionador de Problemas 🚀",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeEffect, delay);
}
typeEffect();

/* ======= NAVBAR SCROLL EFFECT ======= */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(8,12,20,0.97)";
    navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    navbar.style.background = "rgba(8,12,20,0.8)";
    navbar.style.boxShadow = "none";
  }
});

/* ======= SMOOTH ACTIVE NAV LINKS ======= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "#f1f5f9";
    }
  });
});

/* ======= INTERSECTION OBSERVER (fade-in on scroll) ======= */
const observerOptions = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(
  ".skill-category, .project-card, .contact-item, .about-grid, .float-badge"
).forEach((el) => {
  el.classList.add("fade-in-el");
  observer.observe(el);
});

/* Inject fade-in CSS */
const style = document.createElement("style");
style.textContent = `
  .fade-in-el {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .fade-in-el.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .skill-category:nth-child(2).fade-in-el { transition-delay: 0.1s; }
  .skill-category:nth-child(3).fade-in-el { transition-delay: 0.2s; }
  .project-card:nth-child(2).fade-in-el { transition-delay: 0.1s; }
  .project-card:nth-child(3).fade-in-el { transition-delay: 0.15s; }
  .project-card:nth-child(4).fade-in-el { transition-delay: 0.2s; }
`;
document.head.appendChild(style);

/* ======= CONTACT FORM ======= */
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = form.querySelector("button[type=submit]");
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("⚠️ Preencha todos os campos!", "warn");
    return;
  }

  btn.textContent = "Enviando...";
  btn.disabled = true;

  setTimeout(() => {
    showToast("✅ Mensagem enviada com sucesso!", "success");
    form.reset();
    btn.textContent = "Enviar Mensagem 🚀";
    btn.disabled = false;
  }, 1400);
});

/* ======= TOAST NOTIFICATION ======= */
function showToast(msg, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
    padding: 1rem 1.5rem; border-radius: 12px;
    font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 600;
    color: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    animation: slideIn 0.4s ease;
    background: ${type === "success" ? "linear-gradient(135deg,#6366f1,#a855f7)" : "linear-gradient(135deg,#f59e0b,#ef4444)"};
  `;

  const toastStyle = document.createElement("style");
  toastStyle.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(toastStyle);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.4s";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ======= CURSOR GLOW EFFECT (desktop only) ======= */
if (window.innerWidth > 900) {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}
