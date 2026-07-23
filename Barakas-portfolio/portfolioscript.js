(function () {
  // ---- Navbar / Hamburger (single clean implementation per page) ----
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];

  if (menuBtn && navLinks) {
    // Ensure nav has an id for aria-controls
    if (!navLinks.id) navLinks.id = 'site-nav';

    // State (avoid relying on inline styles)
    navLinks.classList.remove('show-menu');

    const existingAriaLabel = menuBtn.getAttribute('aria-label');
    menuBtn.setAttribute('aria-label', existingAriaLabel || 'Open navigation menu');
    menuBtn.setAttribute('aria-controls', navLinks.id);
    menuBtn.setAttribute('aria-expanded', 'false');

    const isOpen = () => navLinks.classList.contains('show-menu');

    const openMenu = () => {
      navLinks.classList.add('show-menu');
      menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      navLinks.classList.remove('show-menu');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    // Prevent duplicate event listeners.
    // If this script is ever evaluated twice, this guard stops rebinding.
    if (!menuBtn.dataset.bound) {
      menuBtn.dataset.bound = 'true';

      menuBtn.addEventListener('click', () => {
        if (isOpen()) closeMenu();
        else openMenu();
      });

      menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isOpen()) closeMenu();
          else openMenu();
        }
      });

      // Close after clicking any navigation link
      navAnchors.forEach((a) => {
        a.addEventListener('click', closeMenu);
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        const target = e.target;
        if (!menuBtn.contains(target) && !navLinks.contains(target)) {
          closeMenu();
        }
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    }
  }

  // ---- Active link highlighting (URL-based, without changing page markup) ----
  const nav = document.querySelector('.nav-links');
  if (nav) {
    const links = Array.from(nav.querySelectorAll('a'));
    const path = (window.location && window.location.pathname) ? window.location.pathname : '';
    const filename = path.split('/').pop();

    links.forEach((a) => a.classList.remove('active'));

    // Match by href filename (e.g., index.html, about.html, etc.)
    let matched = false;
    links.forEach((a) => {
      const href = a.getAttribute('href') || '';
      const hrefFilename = href.split('/').pop();
      if (filename && hrefFilename && hrefFilename === filename) {
        a.classList.add('active');
        matched = true;
      }
    });

    // Handle empty pathname (some local setups)
    if (!matched && !filename) {
      const home = links.find((a) => (a.getAttribute('href') || '') === 'index.html');
      if (home) home.classList.add('active');
    }
  }

  // ---- Typing effect (existing feature) ----
  const text = ['Full Stack Web Developer', 'Frontend Developer', 'UI/UX Enthusiast'];
  let count = 0;
  let index = 0;

  (function type() {
    const typingElement = document.querySelector('.typing');

    if (typingElement) {
      if (count === text.length) count = 0;

      const currentText = text[count];
      const letter = currentText.slice(0, ++index);
      typingElement.textContent = letter;

      if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1800);
      } else {
        setTimeout(type, 120);
      }
    }
  })();

  // ---- Reveal on scroll (existing feature) ----
  window.addEventListener('scroll', reveal);

  function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    for (let i = 0; i < reveals.length; i++) {
      const revealTop = reveals[i].getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add('active');
      }
    }
  }

  reveal();
})();

// ==============================
// EmailJS Contact Form
// ==============================

// Initialize EmailJS
emailjs.init({
    publicKey: "kIx8f3qys4GStYKWw",
});

const contactForm = document.getElementById("contact-form");
const statusMessage = document.getElementById("status-message");

// Only run on the contact page
if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_ckn6yfa",
            "template_5mx16ci",
            this
        )
        .then(function () {

            statusMessage.textContent = "✅ Your message has been sent successfully!";
            statusMessage.style.color = "#16a34a";

            contactForm.reset();

        })
        .catch(function (error) {

            console.error(error);

            statusMessage.textContent = "❌ Failed to send message. Please try again.";
            statusMessage.style.color = "#dc2626";

        });

    });

}