/* ==========================================================================
   Veeva Master Template (MT) 3.0 JavaScript Logic
   Augmentin ABRS Adult eDetailing
   ========================================================================== */

let currentSlide = 0;
const totalSlides = 8;

const slidesWrapper = document.getElementById('slidesWrapper');
const slides = document.querySelectorAll('.slide');

const btnHome = document.getElementById('btnHome');
const btnMenu = document.getElementById('btnMenu');
const btnPI = document.getElementById('btnPI');
const btnRef = document.getElementById('btnRef');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateSlideState();
});

function setupEventListeners() {
  if (btnHome) btnHome.addEventListener('click', () => goToSlide(0));
  if (btnMenu) btnMenu.addEventListener('click', () => openModal('modalMenu'));
  if (btnPI) btnPI.addEventListener('click', () => openModal('modalPI'));
  if (btnRef) btnRef.addEventListener('click', () => openModal('modalRef'));
  if (btnPrev) btnPrev.addEventListener('click', () => prevSlide());
  if (btnNext) btnNext.addEventListener('click', () => nextSlide());

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    if (e.key === 'Escape') {
      closeModal('modalPI');
      closeModal('modalRef');
      closeModal('modalMenu');
    }
  });

  // Touch Swipe Handling for iPad / Tablets
  let touchStartX = 0;
  let touchEndX = 0;
  const edaContainer = document.getElementById('edaContainer');

  edaContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  edaContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 45;
    if (touchEndX < touchStartX - threshold) nextSlide();
    if (touchEndX > touchStartX + threshold) prevSlide();
  }
}

function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  currentSlide = index;
  updateSlideState();
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlideState();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlideState();
  }
}

function updateSlideState() {
  slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  slides.forEach((slide, i) => {
    if (i === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}
