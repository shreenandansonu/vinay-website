const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navAnchors = navLinks.querySelectorAll("a");

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

/* ---------- Demo video cover → fullscreen on play ---------- */
const videoCover = document.getElementById("video-cover");

if (videoCover) {
  videoCover.addEventListener("click", () => {
    const container = videoCover.parentElement;
    const frame = container.querySelector(".video-frame");
    frame.src = frame.dataset.src;
    videoCover.classList.add("hidden");

    const requestFS =
      container.requestFullscreen ||
      container.webkitRequestFullscreen ||
      container.msRequestFullscreen;
    if (requestFS) {
      try {
        requestFS.call(container);
      } catch (err) {}
    }

    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(() => {});
    }
  });
}

/* ---------- Contact form → WhatsApp ---------- */
function sendWhatsApp(form) {
  const name = form.querySelector('[name="name"]').value.trim();
  const cls = form.querySelector('[name="class"]').value;
  const msg = form.querySelector('[name="msg"]').value.trim();

  let text = "Hi Vinay, I want to learn JEE Mathematics from you.\n\n";
  text += "Name: " + name + "\n";
  text += "Class: " + cls + "\n";
  if (msg) text += "Message: " + msg + "\n";

  window.open("https://wa.me/918299639445?text=" + encodeURIComponent(text), "_blank", "noopener");
  return false;
}

/* ---------- Hero photo fallback ---------- */
function photoFallback(img) {
  img.style.display = "none";
  const wrap = document.createElement("span");
  wrap.className = "photo-placeholder";
  wrap.textContent = "Vinay Yadav";
  img.parentElement.appendChild(wrap);
}

/* ---------- Avatar photo fallback ---------- */
function avatarFallback(img, initial) {
  img.style.display = "none";
  const wrap = document.createElement("span");
  wrap.className = "avatar-init";
  wrap.textContent = initial;
  img.parentElement.appendChild(wrap);
}

/* ---------- Testimonial data ---------- */
const testimonials = {
  aryaman: {
    name: "Aryaman",
    institute: "IIT Roorkee · Material Sciences (B.Tech)",
    cred: ["Class of 2026", "JEE Mains 99.4 %ile"],
    photo: "images/Aryaman.png",
    quote:
      "Sir helped me understand the most asked and important concepts with <em>logic-backed explanations instead of memorising formulae</em>, and taught us alternative methods to tackle exceptions along with quick ways to examine questions regarding graphs. He mentored me through all of 11th and 12th and was always open to answering every doubt. My favourite teaching &mdash; <em>&ldquo;whoever has stuck to the end and worked completely towards their goal for JEE Advanced has achieved it.&rdquo;</em> &mdash; stayed with me through the final months, and helped me avoid the most dreadful curse for many JEE students: losing momentum before the exam.",
    advice:
      "whoever stands till the end achieves it. JEE is mostly not about the bulk of marks for top rankers — it is about the last few marks. Please avoid silly mistakes; they affected about 3000 ranks for me personally. Get into the habit of reading every detail clearly and rechecking, and build your speed because it gives you time to re-check."
  },
  mythreyan: {
    name: "M Mythreyan",
    institute: "NIT Tiruchirappalli · Electrical & Electronics Engineering (B.Tech)",
    cred: ["JEE Mains (5080)"],
    photo: "images/mythreyan.jpg",
    quote:
      "Sir guided me like someone who had been through the same exam — a mentor who knew the mistakes I would make even before I made them. Instead of the usual motivation and scolding from faculty, he gave me emotional support as a person who genuinely understood what students feel. So many of his advices stuck with me that I can't pinpoint a single one. His guidance became my main source of confidence and helped me get over my all-or-nothing approach. I would definitely recommend learning under him.",
    advice: ""
  }
};

/* ---------- Testimonial modal ---------- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalInstitute = document.getElementById("modal-institute");
const modalCred = document.getElementById("modal-cred");
const modalQuote = document.getElementById("modal-quote");
const modalAdvice = document.getElementById("modal-advice");
const modalAdviceText = document.getElementById("modal-advice-text");

function openTestimonial(id) {
  const t = testimonials[id];
  if (!t) return;

  modalName.textContent = t.name;
  modalInstitute.textContent = t.institute;

  modalCred.textContent = "";
  t.cred.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalCred.appendChild(li);
  });

  modalQuote.innerHTML = t.quote;

  if (t.advice) {
    modalAdviceText.textContent = t.advice;
    modalAdvice.hidden = false;
  } else {
    modalAdvice.hidden = true;
  }

  modalImg.src = t.photo;
  modalImg.alt = t.name;
  modalImg.onerror = () => avatarFallback(modalImg, t.name.charAt(0));

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".tt-card").forEach((card) => {
  card.addEventListener("click", () => {
    openTestimonial(card.dataset.testimonial);
  });
});

modal.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

/* ---------- Mobile menu ---------- */
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id], footer[id]");

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;

  let currentId = "home";
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + currentId;
    link.classList.toggle("active", isActive);
  });
}

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Animated counters ---------- */
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = (String(el.dataset.count).split(".")[1] || "").length;
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach((el) => statObserver.observe(el));

/* ---------- Wire up ---------- */
window.addEventListener("scroll", updateActiveLink, { passive: true });

updateActiveLink();