/* =====================================================================
   PORTFOLIO SCRIPT.JS
   Plain (vanilla) JavaScript — no libraries or frameworks.

   Sections in this file:
   1. Mobile navigation menu toggle
   2. Active navigation link on scroll
   3. Hero typing animation
   4. Contact form validation
   5. Dynamic current year in footer
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. MOBILE NAVIGATION MENU TOGGLE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu automatically after a link is clicked
  const allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 2. ACTIVE NAVIGATION LINK ON SCROLL ---------- */
  // Uses IntersectionObserver to detect which section is currently visible
  // and highlights the matching link in the navigation bar.
  const sections = document.querySelectorAll("main section[id]");

  const navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          allNavLinks.forEach(function (link) {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === "#" + id) {
              link.classList.add("active-link");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" } // triggers when a section is roughly centered
  );

  sections.forEach(function (section) {
    navObserver.observe(section);
  });

  /* ---------- 3. HERO TYPING ANIMATION ---------- */
  // A single, simple page-load animation that types out different roles.
  const typingTarget = document.getElementById("typingText");
  const roles = [
    "Aspiring Data Analyst",
    "BCA Student",
    "Python | SQL | Power BI"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingTarget.textContent = currentRole.substring(0, charIndex);

    let typingSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the full word before deleting
      typingSpeed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();

  /* ---------- 4. CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  function showError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
  }

  function clearErrors() {
    ["name", "email", "subject", "message"].forEach(function (fieldId) {
      showError(fieldId, "");
    });
  }

  function isValidEmail(value) {
    // Simple pattern good enough for client-side checking
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading (no backend to send data to)

    clearErrors();
    formSuccess.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    }

    if (email === "") {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    }

    if (subject === "") {
      showError("subject", "Please enter a subject.");
      isValid = false;
    }

    if (message === "") {
      showError("message", "Please write a message.");
      isValid = false;
    }

    if (isValid) {
      // This is a frontend-only form: no server or database is connected.
      // In a real deployment this is where a fetch() call to a backend
      // or an email service (like EmailJS or Formspree) would go.
      formSuccess.textContent = "Thank you, " + name + "! Your message has been received.";
      contactForm.reset();
    }
  });

  /* ---------- 5. DYNAMIC CURRENT YEAR IN FOOTER ---------- */
  document.getElementById("currentYear").textContent = new Date().getFullYear();

});
