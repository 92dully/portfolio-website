/* ================================================================
   Portfolio — script.js
   Responsibilities (and nothing else):
     1. Navbar scroll border
     2. Active nav-link highlighting
     3. Mobile hamburger menu toggle
   ================================================================ */

(function () {
  'use strict';

  var navbar    = document.getElementById('navbar');
  var navLinks  = document.querySelectorAll('.nav-link');
  var sections  = document.querySelectorAll('main section[id]');
  var hamburger = document.getElementById('hamburger');
  var navList   = document.getElementById('navLinks');

  /* ---- 1 & 2. Navbar scroll border + active section highlight ---- */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);

    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 90;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 3. Hamburger menu ---- */
  function closeMobileMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.setAttribute('aria-expanded', 'true');
      navList.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMobileMenu(); }
  });

})();
