// =============================================
// STICKY HEADER
// =============================================
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// =============================================
// MOBILE NAV
// =============================================
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.nav-mobile');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// =============================================
// REVIEWS CAROUSEL
// =============================================
const slides = document.querySelectorAll('.review-slide');
const dots   = document.querySelectorAll('.review-dot');
let current  = 0;
let timer;

function showSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  current = (n + slides.length) % slides.length;
  if (slides[current]) slides[current].classList.add('active');
  if (dots[current])   dots[current].classList.add('active');
}

if (slides.length) {
  dots.forEach((d, i) => d.addEventListener('click', () => { showSlide(i); resetTimer(); }));
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5000);
  }
  showSlide(0);
  resetTimer();
}

// =============================================
// BLOG SEARCH FILTER
// =============================================
const searchInput = document.querySelector('#blog-search');
const postItems   = document.querySelectorAll('.post-list-item');
if (searchInput && postItems.length) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    postItems.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// Category filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.post-list-item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
    });
  });
});

// =============================================
// COOKIE BANNER
// =============================================
const banner      = document.getElementById('cookie-banner');
const acceptBtn   = document.getElementById('cookie-accept');
const declineBtn  = document.getElementById('cookie-decline');
const COOKIE_KEY  = 'bl_cookie_consent';

function hideBanner() {
  if (banner) {
    banner.classList.remove('visible');
    setTimeout(() => { banner.style.display = 'none'; }, 400);
  }
}

if (banner) {
  const consent = localStorage.getItem(COOKIE_KEY);
  if (!consent) {
    // Show after short delay
    setTimeout(() => banner.classList.add('visible'), 1200);
  }

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    hideBanner();
  });

  declineBtn?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    hideBanner();
  });
}

// =============================================
// SMOOTH PAGE ENTRY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});
