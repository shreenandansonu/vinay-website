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
    photo: "images/Aryaman.jpg",
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
  },
  arnav: {
    name: "Arnav",
    institute: "NIT Warangal · B.Tech",
    cred: ["Class of 2026", "JEE Mains ~41k CRL"],
    photo: "images/Arnav.jpg",
    quote:
      "Sir is the best doubt solver I know. Whenever our faculty rushed through small concepts, I would come to him and he would explain them in an easy-to-understand way. He made topics like conics — which are genuinely hard to grasp — feel simple, and he even explained how the Mains and Advanced exam structure works. This went on for the entire two years of intermediate; we even went out together and I shared a lot about my personal experiences. He truly became a friend in need.",
    advice:
      "Vinay sir is one of the best doubt solvers I've seen — in fact, the best in our college. He has a good grip on all topics, so he'll explain everything in a very easy manner. The best part is that you can share anything with him; he's always ready to help, becomes a friend in need, and you can be completely open with him."
  },
  bhargav: {
    name: "Angothu Bhargav",
    institute: "IIT Delhi · Mathematics and Computing (B.Tech)",
    cred: ["Class of 2026", "JEE Advanced AIR 6678", "JEE Mains 13609"],
    photo: "images/Bhargav.jfif",
    quote:
      "Your insights on complex problems were always unique and intuitive. Your explanations made tough concepts much simpler to grasp and ignited a genuine drive in me to solve more advanced questions. Whenever I reached out with doubts or struggled with difficult topics during my preparation at Sri Chaitanya, your guidance was invaluable and helped clear my foundational basics to tackle high-level JEE Advanced problems. I consider you a great mentor and friend who provided constant support throughout the two-year journey of highs and lows, always motivating me to perform my best and helping me reach IIT Delhi.",
    advice: ""
  },
  karthikeya: {
    name: "M. Krishna Karthikeya",
    institute: "NIT Warangal · Electronics & Communication Engineering (B.Tech)",
    cred: ["Class of 2026", "JEE Advanced AIR 8607", "JEE Mains 4774"],
    photo: "images/krishna.png",
    quote:
      "Your insights on a problem were very unique and creative. It ignited an unknown thirst for solving more and more problems related to that topic. Whenever I talked with you about any subject, your guidance was invaluable and provided me with a lot of knowledge. I wasn't able to understand vectors and 3D geometry with a lot of clarity. When I reached out to you, your explanation provided a lot of clarity and helped me understand its basics and dive into the tougher problems. I would consider you a good friend who provides support during one's two-year journey of highs and lows and motivates you to perform your best.",
    advice: ""
  },
  chandra: {
    name: "Chandra Shekar",
    institute: "IIT BHU · Computer Science & Engineering",
    cred: ["Class of 2026", "JEE Advanced AIR 943"],
    photo: "images/Chandra.jpg",
    quote:
      "Sir helped us a lot — not only as a mentor giving study tips, but also as a friend who always wants to see us perform our best, with advice on exam patterns and how to handle the enormous pressure of competitive exams. He was almost a part of our peer group, but with far more experience of exam questions. The best part is the approachableness — you can go to him anytime, even when our lecturers were busy or unavailable. I still remember our discussion on conic-section properties and probability questions, where I learned how to actually look at a question while solving it. His help mattered a lot in maths, where I could discuss even the highest-level questions that most of my peers didn't dare to look at.",
    advice:
      "For any junior: Vinay sir is the maths mentor you want. Approachable any time, he explains everything simply, and above all he genuinely wants to see you perform your best. Thank you, sir."
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

/* ---------- Show more / show less testimonials ---------- */
const moreBtn = document.getElementById("testimonial-more");
const extraCards = document.querySelectorAll(".tt-card.is-extra");

if (moreBtn && extraCards.length) {
  moreBtn.addEventListener("click", () => {
    const expanded = moreBtn.getAttribute("aria-expanded") === "true";
    extraCards.forEach((card) => (card.hidden = expanded));
    moreBtn.setAttribute("aria-expanded", String(!expanded));
    moreBtn.innerHTML = expanded
      ? 'Show more results<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>'
      : 'Show less<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"></path></svg>';
  });
}

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