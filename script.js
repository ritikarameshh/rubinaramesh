/* ============================================
   RUBINA RAMESH — Minimal JavaScript
   Smooth scroll, nav toggle, fade-in, form
   ============================================ */

(function () {
  'use strict';

  // ---- Elements ----
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');

  // ---- Navbar: scroll effect ----
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ---- Mobile nav toggle ----
  function toggleNav() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  function closeNav() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', closeNav);

  // Close mobile nav when a link is clicked
  var navItems = navLinks.querySelectorAll('a');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', closeNav);
  }

  // ---- Fade-in on scroll (IntersectionObserver) ----
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Contact form handler (placeholder) ----
  window.handleFormSubmit = function (e) {
    e.preventDefault();

    var note = document.getElementById('formNote');
    var form = e.target;

    // Simple feedback — replace with real form handler later
    note.textContent = 'Thank you for your message! Rubina will get back to you soon.';
    note.style.color = '#6B1D3A';

    // Reset form after short delay
    setTimeout(function () {
      form.reset();
    }, 500);

    // Clear message after a few seconds
    setTimeout(function () {
      note.textContent = '';
    }, 5000);
  };

})();
