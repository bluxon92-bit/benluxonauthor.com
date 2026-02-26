// Sticky header on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.nav-mobile');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Reviews carousel
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

// Blog search filter
const searchInput = document.querySelector('#blog-search');
const postItems   = document.querySelectorAll('.post-list-item');
if (searchInput && postItems.length) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    postItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// Smooth page entry animation
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
