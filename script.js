/* ============================================================
   Muhammad Abdullah Ahmad — Portfolio Scripts
   Navbar scroll, active section highlighting, mobile menu,
   scroll reveal animations, contact form handling.
   ============================================================ */

/* ---- DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------
  // 1. NAVBAR — scroll border + active link tracking
  // ------------------------------------------------
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    // Add border when scrolled
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section
    let current = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 90;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run once on load

  // ------------------------------------------------
  // 2. MOBILE HAMBURGER MENU
  // ------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });

  // ------------------------------------------------
  // 3. SCROLL REVEAL — Intersection Observer
  // ------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.section-header, .about-grid, .skills-grid, .learning-bar, ' +
    '.projects-grid, .timeline-item, .education-grid, .volunteer-card, ' +
    '.contact-grid, .stat-card'
  );

  // Add reveal class to elements we want to animate in
  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal so it doesn't re-animate
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ------------------------------------------------
  // 4. STAGGERED CHILDREN (timeline items, stat cards)
  // ------------------------------------------------
  const staggerGroups = {
    '.timeline-item': 80,
    '.stat-card':     60,
    '.project-card':  60,
    '.edu-card':      60,
    '.skill-group':   50,
  };

  Object.entries(staggerGroups).forEach(([selector, delay]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * delay}ms`;
    });
  });

  // ------------------------------------------------
  // 5. CONTACT FORM — mailto fallback
  // ------------------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showFormFeedback('Please fill in all fields.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showFormFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Construct mailto link
      const subject  = encodeURIComponent(`Portfolio contact from ${name}`);
      const body     = encodeURIComponent(
        `Hi Muhammad,\n\nName: ${name}\nEmail: ${email}\n\n${message}`
      );
      const mailto   = `mailto:92abdullahahmad@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailto;
      showFormFeedback('Opening your mail client...', 'success');
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormFeedback(message, type) {
    // Remove any existing feedback
    const existing = contactForm.querySelector('.form-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('p');
    feedback.className = 'form-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
      font-size: 0.82rem;
      padding: 10px 14px;
      border-radius: 8px;
      margin-top: -8px;
      border: 1px solid ${type === 'success' ? 'rgba(62,207,142,0.3)' : 'rgba(255,100,100,0.3)'};
      background: ${type === 'success' ? 'rgba(62,207,142,0.08)' : 'rgba(255,100,100,0.08)'};
      color: ${type === 'success' ? '#3ecf8e' : '#ff6464'};
    `;
    contactForm.appendChild(feedback);

    // Auto-remove after 5s
    setTimeout(() => feedback.remove(), 5000);
  }

  // ------------------------------------------------
  // 6. SMOOTH SCROLL for anchor links (polyfill safety)
  // ------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ------------------------------------------------
  // 7. TYPING EFFECT (optional — terminal card cursor)
  // ------------------------------------------------
  // Subtle cursor blink on the terminal card — pure CSS handles this,
  // but we add a blinking caret after the last JSON line for polish.
  const terminalCode = document.querySelector('.terminal-body code');
  if (terminalCode) {
    const caret = document.createElement('span');
    caret.style.cssText = `
      display: inline-block;
      width: 8px;
      height: 14px;
      background: #5b8dee;
      margin-left: 2px;
      vertical-align: text-bottom;
      animation: blink 1.1s step-end infinite;
    `;
    // Add keyframes dynamically
    const style = document.createElement('style');
    style.textContent = '@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }';
    document.head.appendChild(style);
    terminalCode.appendChild(caret);
  }

});
