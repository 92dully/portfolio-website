/* ================================================================
   Portfolio — script.js
   Responsibilities (and NOTHING else):
     1. Navbar scroll border
     2. Active nav-link highlighting
     3. Mobile hamburger menu toggle
     4. Contact form validation + mailto fallback
   ================================================================ */

(function () {
  'use strict';

  /* ---- Elements ---- */
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('main section[id]');
  const hamburger = document.getElementById('hamburger');
  const navList   = document.getElementById('navLinks');
  const form      = document.getElementById('contactForm');
  const feedback  = document.getElementById('formFeedback');

  /* ================================================================
     1 & 2. NAVBAR: scroll border + active section highlight
     ================================================================ */
  function onScroll() {
    /* Border appears once page scrolls */
    navbar.classList.toggle('scrolled', window.scrollY > 10);

    /* Determine which section is currently in view */
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 80;      /* 80px = comfortable offset */
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* Run once on load */

  /* ================================================================
     3. HAMBURGER MENU
     ================================================================ */
  function closeMobileMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.setAttribute('aria-expanded', 'true');
      navList.classList.add('open');
      document.body.style.overflow = 'hidden'; /* prevent background scroll */
    }
  });

  /* Close menu when a link is tapped */
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* Close menu when clicking outside the navbar */
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMobileMenu(); }
  });

  /* ================================================================
     4. CONTACT FORM — client-side validation + mailto fallback
     ================================================================ */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('cf-name').value.trim();
      var email   = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-msg').value.trim();

      /* Basic validation */
      if (!name || !email || !message) {
        setFeedback('Please fill in all fields.', false);
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setFeedback('Please enter a valid email address.', false);
        return;
      }

      /* Build mailto link and trigger */
      var subject = encodeURIComponent('Portfolio enquiry from ' + name);
      var body    = encodeURIComponent(
        'Hi Muhammad,\n\nName: ' + name +
        '\nEmail: ' + email +
        '\n\n' + message
      );

      window.location.href =
        'mailto:92abdullahahmad@gmail.com?subject=' + subject + '&body=' + body;

      setFeedback('Opening your mail client\u2026', true);
    });
  }

  function setFeedback(message, success) {
    if (!feedback) { return; }
    feedback.textContent = message;
    feedback.className   = 'form-feedback ' + (success ? 'is-ok' : 'is-error');

    /* Auto-clear after 5 seconds */
    setTimeout(function () {
      feedback.textContent = '';
      feedback.className   = 'form-feedback';
    }, 5000);
  }

})();
