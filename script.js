const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

const typingText = document.querySelector("#typing-text");

const message = "Teaching INDIA's future";
let characterIndex = 0;
let deleting = false;

function typeMessage() {
  typingText.textContent = deleting
    ? message.slice(0, characterIndex--)
    : message.slice(0, characterIndex++);

  if (!deleting && characterIndex > message.length) {
    deleting = true;
    setTimeout(typeMessage, 1800);
    return;
  }

  if (deleting && characterIndex < 0) {
    deleting = false;
    characterIndex = 0;
    setTimeout(typeMessage, 500);
    return;
  }

  setTimeout(typeMessage, deleting ? 55 : 100);
}

typeMessage();