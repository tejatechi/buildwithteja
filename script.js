const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");
const cursorGlow = document.querySelector(".cursor-glow");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const mailForm = document.querySelector("#mail-form");
const copyEmailButton = document.querySelector("#copy-email");
const mailStatus = document.querySelector("#mail-status");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((section) => revealObserver.observe(section));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isMatch);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-10% 0px -40% 0px",
  }
);

sections.forEach((section) => navObserver.observe(section));

document.addEventListener("pointermove", (event) => {
  if (!cursorGlow) {
    return;
  }

  cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (mailForm) {
  mailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const senderName = document.querySelector("#sender-name")?.value.trim() || "";
    const senderEmail = document.querySelector("#sender-email")?.value.trim() || "";
    const subject = document.querySelector("#mail-subject")?.value.trim() || "";
    const message = document.querySelector("#mail-message")?.value.trim() || "";

    const bodyLines = [
      `Name: ${senderName}`,
      `Email: ${senderEmail}`,
      "",
      message,
    ];

    const mailto = `mailto:ravitejaragam503@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.assign(mailto);

    if (mailStatus) {
      mailStatus.textContent =
        "Trying to open your email app. If nothing opens, use Copy Message and send it manually to ravitejaragam503@gmail.com.";
    }
  });
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const senderName = document.querySelector("#sender-name")?.value.trim() || "";
    const senderEmail = document.querySelector("#sender-email")?.value.trim() || "";
    const subject = document.querySelector("#mail-subject")?.value.trim() || "";
    const message = document.querySelector("#mail-message")?.value.trim() || "";

    const composedMessage = [
      `To: ravitejaragam503@gmail.com`,
      `Subject: ${subject}`,
      "",
      `Name: ${senderName}`,
      `Email: ${senderEmail}`,
      "",
      message,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(composedMessage);
      if (mailStatus) {
        mailStatus.textContent =
          "Email details copied. Paste them into your email app and send them to ravitejaragam503@gmail.com.";
      }
    } catch (error) {
      if (mailStatus) {
        mailStatus.textContent =
          "Copy was blocked by the browser. Please copy the message manually and send it to ravitejaragam503@gmail.com.";
      }
    }
  });
}
