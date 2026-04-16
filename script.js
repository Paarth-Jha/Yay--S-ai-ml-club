/* AI-ML CLUB — GECA | script.js */
(function () {
  'use strict';

  /* SVG initials fallback */
  function svgFallback(initials) {
    var s = (initials || '??').slice(0, 2).toUpperCase();
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">'
      + '<rect width="200" height="200" fill="#0f0f0f"/>'
      + '<rect x="0" y="0" width="3" height="200" fill="#39ff8a" opacity="0.7"/>'
      + '<text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" '
      + 'font-family="Space Mono,IBM Plex Mono,monospace" font-size="64" font-weight="700" '
      + 'fill="#39ff8a" opacity="0.9">' + s + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  document.querySelectorAll('img.member-photo').forEach(function (img) {
    function fb() { img.src = svgFallback(img.dataset.initials); }
    if (img.complete && img.naturalWidth === 0) fb();
    img.addEventListener('error', fb, { once: true });
  });

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && window.IntersectionObserver) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 0.07 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Hamburger */
  var ham = document.getElementById('ham');
  var menu = document.getElementById('nav-menu');
  if (ham && menu) {
    ham.addEventListener('click', function () { menu.classList.toggle('open'); });
    document.addEventListener('click', function (e) {
      if (!ham.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
    });
  }

  /* Active nav link */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* Homepage events */
  var ec = document.getElementById('events-container');
  if (ec) {
    var events = [
      { day: '12', month: 'APR', title: 'AI Hackathon 2025', loc: 'GECA Campus · 9:00 AM', tag: 'Hackathon' },
      { day: '28', month: 'APR', title: 'Guest Talk: GenAI in Industry', loc: 'Seminar Hall · 4:00 PM', tag: 'Talk' },
      { day: '10', month: 'MAY', title: 'End-of-Semester Project Showcase', loc: 'Main Hall · 11:00 AM', tag: 'Showcase' },
    ];
    ec.style.cssText = 'display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);';
    ec.innerHTML = events.map(function (ev) {
      return '<a href="events.html" class="event-item">'
        + '<div class="event-date"><strong>' + ev.day + '</strong>' + ev.month + '</div>'
        + '<div><div class="event-title">' + ev.title + '</div><div class="event-loc">' + ev.loc + '</div></div>'
        + '<span class="tag amber">' + ev.tag + '</span></a>';
    }).join('');
  }
})();
