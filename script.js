const floatingLayer = document.getElementById("floatingLayer");
const heroBurst = document.getElementById("heroBurst");
const finalBurst = document.getElementById("finalBurst");
const openLetter = document.getElementById("openLetter");
const letterCard = document.getElementById("letterCard");
const yesBtn = document.getElementById("yesBtn");
const timeBtn = document.getElementById("timeBtn");
const answerResponse = document.getElementById("answerResponse");

const floatIcons = ["♡", "♥", "✦", "✧", "❀", "🎀"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function burstHearts(amount = 18) {
  if (reduceMotion || !floatingLayer) return;

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    piece.className = "floaty";
    piece.setAttribute("aria-hidden", "true");
    piece.textContent = floatIcons[Math.floor(Math.random() * floatIcons.length)];
    piece.style.left = `${5 + Math.random() * 90}%`;
    piece.style.fontSize = `${14 + Math.random() * 20}px`;
    piece.style.animationDuration = `${5 + Math.random() * 3}s`;
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    piece.style.setProperty("--drift", `${-75 + Math.random() * 150}px`);
    floatingLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function seedFloaties(count = 10) {
  if (reduceMotion || !floatingLayer) return;

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "floaty floaty--ambient";
    piece.setAttribute("aria-hidden", "true");
    piece.textContent = floatIcons[Math.floor(Math.random() * floatIcons.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${12 + Math.random() * 14}px`;
    piece.style.animationDuration = `${12 + Math.random() * 10}s`;
    piece.style.animationDelay = `${Math.random() * 10}s`;
    piece.style.setProperty("--drift", `${-50 + Math.random() * 100}px`);
    floatingLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function toggleLetter() {
  const isOpen = openLetter.getAttribute("aria-expanded") === "true";
  openLetter.setAttribute("aria-expanded", String(!isOpen));
  letterCard.hidden = isOpen;
  openLetter.textContent = isOpen ? "Read my letter ♡" : "Close the letter ♡";

  if (!isOpen) {
    burstHearts(9);
    letterCard.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }
}

function answerYes() {
  answerResponse.textContent = "Thank you for giving me this chance. ♡ I’ll do my best to show you through my actions that I’m sincere. We can take things one step at a time, at a pace that feels comfortable for both of us.";
  burstHearts(24);
}

function answerNeedsTime() {
  answerResponse.textContent = "Of course. Take all the time you need. ♡ I made this to be honest about how I feel, not to rush you into an answer. Whatever you decide, I’ll respect it.";
}

function observeSections() {
  const sections = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach((section) => observer.observe(section));
}

heroBurst?.addEventListener("click", () => burstHearts(22));
finalBurst?.addEventListener("click", () => burstHearts(28));
openLetter?.addEventListener("click", toggleLetter);
yesBtn?.addEventListener("click", answerYes);
timeBtn?.addEventListener("click", answerNeedsTime);

seedFloaties();
observeSections();
