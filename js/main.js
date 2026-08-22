// ===========================================================
// Lammah bite — main.js
// ===========================================================

const WHATSAPP_NUMBER = "9665XXXXXXXX"; // ← put the real number here

const DEPOSIT_LINE = "تذكير: العربون (نصف المبلغ) يُدفع عند تأكيد الحجز وهو غير مسترجع في حال الإلغاء.";

// ─── SVG ICON HELPERS ─────────────────────────────────────
const ICONS = {
  sauce: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2c0 4-2 5-2 9a4 4 0 0 0 8 0c0-4-2-5-2-9"/><line x1="6" y1="2" x2="8" y2="2"/><path d="M18 8v13M15 21h6"/></svg>`,
  fruit: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><path d="M12 7c1-2.5 3.5-3 5-2"/></svg>`,
  biscuit: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1" fill="var(--gold)"/><circle cx="14.5" cy="9.5" r="1" fill="var(--gold)"/><circle cx="11.5" cy="14.5" r="1" fill="var(--gold)"/></svg>`,
  drink: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h12M6 22V10h8v12M14 12h2a2 2 0 0 1 0 4h-2"/><path d="M9 10V4h2V2"/></svg>`,
  candy: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="6"/><path d="M12 7V2M9 5l3-3 3 3"/></svg>`,
  marshmallow: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="4"/></svg>`,
  juice: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l-2 18H8z"/><path d="M8 9h8M9 14h6"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="13" height="13" rx="2"/><path d="M14 9h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  staff: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`,
  quality: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>`,
  balloon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="9" rx="6" ry="8"/><path d="M12 17v1M10 21h4M12 18c0 0-3 1-3 3"/></svg>`,
  chef: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7a4 4 0 0 1 7.75-1.38A3.5 3.5 0 1 1 17.5 10H6a4 4 0 0 1 0-3z"/><rect x="6" y="10" width="12" height="11" rx="1"/><path d="M9 15h6M12 13v4"/></svg>`,
  delivery: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="13" height="13" rx="2"/><path d="M14 9h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.4.2-.4.7-1.3.1-.2 0-.4 0-.5-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/></svg>`,
  whatsapp_dark: `<svg viewBox="0 0 24 24" fill="var(--brown-dark)"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.4.2-.4.7-1.3.1-.2 0-.4 0-.5-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="var(--brown-dark)"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.24 0 .47.04.69.1V9.01a6.27 6.27 0 0 0-.69-.04 5.681 5.681 0 0 0-5.68 5.68 5.681 5.681 0 0 0 5.68 5.68 5.681 5.681 0 0 0 5.68-5.68V8.95a7.71 7.71 0 0 0 4.5 1.44V7.3a4.302 4.302 0 0 1-3.44-1.48z"/></svg>`,
  tiktok_white: `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.24 0 .47.04.69.1V9.01a6.27 6.27 0 0 0-.69-.04 5.681 5.681 0 0 0-5.68 5.68 5.681 5.681 0 0 0 5.68 5.68 5.681 5.681 0 0 0 5.68-5.68V8.95a7.71 7.71 0 0 0 4.5 1.44V7.3a4.302 4.302 0 0 1-3.44-1.48z"/></svg>`,
  whatsapp_footer: `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.4.2-.4.7-1.3.1-.2 0-.4 0-.5-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/></svg>`,
};

// ─── OFFERS DATA ───────────────────────────────────────────
const OFFERS_DATA = {
  weddings: {
    title: 'عرض الأعراس والشبكات',
    capacity: 'من 200 إلى 250 شخص',
    items: [
      { icon: 'sauce',   text: '3 أنواع من الصوصات: نوتيلا — بستاشيو — لوتس' },
      { icon: 'fruit',   text: '3 أنواع من الفواكه الطازجة: فراولة — توت أزرق — توت أحمر' },
      { icon: 'biscuit', text: 'نوعين من البسكويت للتزيين: لوتس — دايجستف' },
      { icon: 'drink',   text: 'اختيار مشروب: قهوة سوداء أو قهوة سعودية' },
    ],
    priceOld: '3299', priceNew: '1899',
    inclusions: ['شامل التوصيل', 'عاملتين للخدمة'],
    slug: 'weddings',
  },
  gatherings: {
    title: 'عرض الجمعات',
    capacity: 'عربة البانكيك لـ 40 شخص — 40 صحن ميني بانكيك',
    items: [
      { icon: 'sauce',   text: '3 أنواع من الصوصات: نوتيلا — بستاشيو — لوتس' },
      { icon: 'fruit',   text: 'نوعين من الفواكه الطازجة (تختار نوعين من: فراولة — توت أزرق — توت أحمر)' },
      { icon: 'biscuit', text: 'نوعين من بسكويت التزيين: بسكويت لوتس — بسكويت دايجستف' },
      { icon: 'drink',   text: 'اختيار مشروب: قهوة سوداء أو قهوة سعودية' },
    ],
    priceOld: '1899', priceNew: '729',
    inclusions: ['شامل التوصيل', 'عاملة للخدمة'],
    slug: 'gatherings',
  },
  kids: {
    title: 'عرض مناسبات الأطفال والمدارس',
    capacity: 'حسب عدد الأطفال',
    items: [
      { icon: 'fruit',       text: 'البانكيك ونوع عصير' },
      { icon: 'candy',       text: 'حلاوة جيلي' },
      { icon: 'marshmallow', text: 'مارشميلو' },
      { icon: 'balloon',     text: 'أكياس حلوى غزل البنات على حسب عدد الأطفال' },
      { icon: 'juice',       text: 'نوع عصير' },
    ],
    priceOld: null, priceNew: '879',
    inclusions: ['شامل التوصيل', 'شامل الشيف'],
    slug: 'kids',
  },
};

const OFFER_LABELS = {
  weddings: OFFERS_DATA.weddings.title,
  gatherings: OFFERS_DATA.gatherings.title,
  kids: OFFERS_DATA.kids.title,
};

// ─── GALLERY IMAGES ────────────────────────────────────────
const GALLERY_IMAGES = [
  { src: 'https://b.top4top.io/p_3886dro0e1.jpeg', alt: 'عربة بانكيك Lammah bite في مناسبة' },
  { src: 'https://c.top4top.io/p_3886pc12x2.jpeg', alt: 'صحن ميني بانكيك مع صوصات وفواكه' },
  { src: 'https://d.top4top.io/p_3886b1lcc3.jpeg', alt: 'تجهيزات عربة البانكيك للمناسبات' },
  { src: 'https://e.top4top.io/p_3886fusw64.jpeg', alt: 'ضيافة بانكيك في حفل زفاف' },
  { src: 'https://f.top4top.io/p_3886vk7zh5.jpeg', alt: 'بانكيك مزين بالفواكه الطازجة' },
  { src: 'https://g.top4top.io/p_3886y69ca6.jpeg', alt: 'خدمة عربة البانكيك في المدينة المنورة' },
];

// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  injectScrollProgress();
  initHeader();
  initMobileNav();
  initWhatsAppLinks();
  initScrollReveal();
  initTilt();
  initParallax();
  initGallery();
  initLightbox();
  initModal();
  initCarouselDots();
  initAccordion();
  initBookingForm();
  initPriceReveal();
});

// ─── SCROLL PROGRESS ───────────────────────────────────────
function injectScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ─── HEADER SCROLL EFFECT ──────────────────────────────────
function initHeader() {
  const hdr = document.getElementById('site-header');
  if (!hdr) return;
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── MOBILE NAV ────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('nav-overlay');
  const closeBtn  = document.getElementById('nav-close');
  const backdrop  = document.getElementById('nav-backdrop');
  if (!hamburger || !overlay) return;

  function open() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
    closeBtn && closeBtn.focus();
  }
  function close() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  hamburger.addEventListener('click', open);
  closeBtn  && closeBtn.addEventListener('click', close);
  backdrop  && backdrop.addEventListener('click', close);
  overlay.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
}

// ─── WHATSAPP LINKS ────────────────────────────────────────
function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const msg = el.getAttribute('data-whatsapp-msg') || '';
    const url = `https://wa.me/${WHATSAPP_NUMBER}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
    el.setAttribute('href', url);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

// ─── SCROLL REVEAL ─────────────────────────────────────────
function initScrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ─── 3D TILT ───────────────────────────────────────────────
function initTilt() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduced) return;
  document.querySelectorAll('.offer-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top)  / r.height;
      const rY =  (x - 0.5) * 10;
      const rX = -(y - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-4px)`;
      card.style.boxShadow = `${-rY * 2}px ${10 - rX}px 32px rgba(69,43,24,0.22)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// ─── PARALLAX HERO ─────────────────────────────────────────
function initParallax() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layer = document.querySelector('.hero-parallax-layer');
  if (!layer || isTouch || reduced) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.25;
    layer.style.transform = `translateY(${y}px)`;
  }, { passive: true });
}

// ─── GALLERY ───────────────────────────────────────────────
function initGallery() {
  document.querySelectorAll('[data-gallery-grid]').forEach(grid => {
    const limit = grid.getAttribute('data-limit');
    const items = limit ? GALLERY_IMAGES.slice(0, parseInt(limit, 10)) : GALLERY_IMAGES;
    grid.innerHTML = items.map((img, i) => `
      <div class="gallery-item reveal" data-index="${i}">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" width="400" height="300">
      </div>`).join('');
    initScrollReveal();
  });
}

// ─── LIGHTBOX ──────────────────────────────────────────────
let lbIndex = 0;
function initLightbox() {
  const lb      = document.querySelector('.lightbox');
  if (!lb) return;
  const imgEl   = lb.querySelector('img');
  const closeEl = lb.querySelector('.lightbox-close');
  const prevEl  = lb.querySelector('.lightbox-prev');
  const nextEl  = lb.querySelector('.lightbox-next');

  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    lbIndex = parseInt(item.getAttribute('data-index'), 10);
    showLb();
  });

  function showLb() {
    const img = GALLERY_IMAGES[lbIndex];
    imgEl.src = img.src; imgEl.alt = img.alt;
    lb.classList.add('open');
    document.body.classList.add('modal-open');
  }
  function closeLb() { lb.classList.remove('open'); document.body.classList.remove('modal-open'); }
  function move(d) { lbIndex = (lbIndex + d + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; showLb(); }

  closeEl && closeEl.addEventListener('click', closeLb);
  prevEl  && prevEl.addEventListener('click', () => move(-1));
  nextEl  && nextEl.addEventListener('click', () => move(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft')  move(-1);
  });
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
  lb.addEventListener('touchend',   e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) move(d > 0 ? -1 : 1); });
}

// ─── OFFER MODAL ───────────────────────────────────────────
let modalTrigger = null;
function initModal() {
  // inject modal into DOM once
  const existing = document.getElementById('offer-modal');
  if (!existing) {
    const el = document.createElement('div');
    el.id = 'offer-modal';
    el.className = 'offer-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'modal-title');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop"></div>
      <div class="modal-panel" id="modal-panel" tabindex="-1">
        <div class="modal-drag-handle"></div>
        <button class="modal-close-btn" id="modal-close-btn" aria-label="إغلاق">&times;</button>
        <div id="modal-body"></div>
      </div>`;
    document.body.appendChild(el);
  }

  const modal   = document.getElementById('offer-modal');
  const closeBtn= document.getElementById('modal-close-btn');
  const backdrop= document.getElementById('modal-backdrop');
  const panel   = document.getElementById('modal-panel');

  // open on "التفاصيل" buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-offer-modal]');
    if (!btn) return;
    const slug = btn.getAttribute('data-offer-modal');
    openModal(slug, btn);
  });

  function openModal(slug, trigger) {
    const offer = OFFERS_DATA[slug];
    if (!offer) return;
    modalTrigger = trigger;
    document.getElementById('modal-body').innerHTML = buildModalHTML(offer);
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    // Swipe-down to dismiss on mobile
    let startY = 0;
    panel.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { once: true });
    panel.addEventListener('touchend', e => {
      const dy = e.changedTouches[0].clientY - startY;
      if (dy > 80) closeModal();
    }, { once: true });
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (modalTrigger) { modalTrigger.focus(); modalTrigger = null; }
  }

  closeBtn  && closeBtn.addEventListener('click', closeModal);
  backdrop  && backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
}

function buildModalHTML(offer) {
  const priceOldHTML = offer.priceOld
    ? `<span class="price-old">${offer.priceOld} ريال</span>` : '';
  const itemsHTML = offer.items.map(item =>
    `<li>${ICONS[item.icon] || ''}<span>${item.text}</span></li>`).join('');
  const inclHTML = offer.inclusions.map(i =>
    `<span class="incl-tag">${ICONS.delivery}${i}</span>`).join('');
  return `
    <span class="modal-offer-badge">${offer.title}</span>
    <h2 class="modal-title" id="modal-title">${offer.title}</h2>
    <p class="modal-capacity">${offer.capacity}</p>
    <ul class="modal-list">${itemsHTML}</ul>
    <div class="modal-price-row">
      ${priceOldHTML}
      <div class="price-new-wrap">
        <span class="price-new">${offer.priceNew}</span>
        <span class="price-currency">ريال</span>
      </div>
    </div>
    <div class="modal-incl-row">${inclHTML}</div>
    <div class="modal-policy-note">الحجز قبل 24 ساعة على الأقل · العربون (نصف المبلغ) عند التأكيد · الإلغاء قبل 48 ساعة · العربون غير مسترجع</div>
    <a href="booking.html?offer=${offer.slug}" class="btn btn-primary btn-block">احجز هذا العرض</a>
  `;
}

// ─── CAROUSEL DOTS ─────────────────────────────────────────
function initCarouselDots() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const tracks = document.querySelectorAll('.offers-track');
  tracks.forEach(track => {
    const dotsContainer = track.nextElementSibling;
    if (!dotsContainer || !dotsContainer.classList.contains('carousel-dots')) return;

    const cards = track.querySelectorAll('.offer-card');
    if (cards.length === 0) return;

    // Only show on mobile
    function refreshDots() {
      const w = window.innerWidth;
      if (w >= 768) { dotsContainer.innerHTML = ''; return; }
      if (dotsContainer.children.length === cards.length) return;
      dotsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `الشريحة ${i + 1}`);
        dot.addEventListener('click', () => {
          cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
        dotsContainer.appendChild(dot);
      });
    }
    refreshDots();
    window.addEventListener('resize', refreshDots);

    track.addEventListener('scroll', () => {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      if (!dots.length) return;
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - track.getBoundingClientRect().left);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === closest));
    }, { passive: true });
  });
}

// ─── FAQ ACCORDION ─────────────────────────────────────────
function initAccordion() {
  document.querySelectorAll('.accordion-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.accordion-item');
      const answer = item.querySelector('.accordion-answer');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ─── PRICE REVEAL ──────────────────────────────────────────
function initPriceReveal() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('counted'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.price-new').forEach(p => obs.observe(p));
}

// ─── BOOKING FORM ──────────────────────────────────────────
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Pre-select from URL param
  const offer = new URLSearchParams(window.location.search).get('offer');
  const sel   = document.getElementById('offer');
  if (offer && sel) { sel.value = offer; toggleConditional(offer); }

  sel && sel.addEventListener('change', () => toggleConditional(sel.value));

  // Disable dates < 24h from now
  const dateInput = document.getElementById('event-date');
  if (dateInput) {
    const min = new Date(Date.now() + 24 * 60 * 60 * 1000);
    dateInput.min = min.toISOString().split('T')[0];
  }

  // Max 2 fruits
  document.querySelectorAll('input[name="fruits"]').forEach(box => {
    box.addEventListener('change', () => {
      const checked = document.querySelectorAll('input[name="fruits"]:checked');
      if (checked.length > 2) box.checked = false;
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateBooking(form)) sendToWhatsApp(form);
  });
}

function toggleConditional(offer) {
  const fruitsGroup = document.getElementById('fruits-group');
  const drinkGroup  = document.getElementById('drink-group');
  if (fruitsGroup) fruitsGroup.style.display = offer === 'gatherings' ? 'block' : 'none';
  if (drinkGroup)  drinkGroup.style.display  = (offer === 'weddings' || offer === 'gatherings') ? 'block' : 'none';
}

function showErr(id, msg) {
  const el = document.getElementById(id + '-error');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}
function clearErr(id) {
  const el = document.getElementById(id + '-error');
  if (el) { el.textContent = ''; el.classList.remove('show'); }
}

function validateBooking(form) {
  let ok = true;
  ['name','phone','offer','event-date','event-time','location','count'].forEach(clearErr);

  const name = form.querySelector('#name');
  if (!name.value.trim()) { showErr('name', 'الرجاء إدخال الاسم'); ok = false; }

  const phone = form.querySelector('#phone');
  if (!phone.value.trim()) { showErr('phone', 'الرجاء إدخال رقم الجوال'); ok = false; }
  else if (!/^[0-9+\s]{9,15}$/.test(phone.value.trim())) { showErr('phone', 'رقم الجوال غير صحيح'); ok = false; }

  const offer = form.querySelector('#offer');
  if (!offer.value) { showErr('offer', 'الرجاء اختيار العرض المطلوب'); ok = false; }

  const date = form.querySelector('#event-date');
  if (!date.value) { showErr('event-date', 'الرجاء اختيار تاريخ المناسبة'); ok = false; }

  const time = form.querySelector('#event-time');
  if (!time.value) { showErr('event-time', 'الرجاء اختيار وقت المناسبة'); ok = false; }

  const loc = form.querySelector('#location');
  if (!loc.value.trim()) { showErr('location', 'الرجاء إدخال الحي أو الموقع'); ok = false; }

  const count = form.querySelector('#count');
  if (!count.value.trim()) { showErr('count', 'الرجاء إدخال العدد'); ok = false; }

  if (offer.value === 'gatherings') {
    const c = document.querySelectorAll('input[name="fruits"]:checked');
    if (c.length !== 2) { showErr('fruits', 'الرجاء اختيار نوعين من الفواكه بالضبط'); ok = false; }
    else clearErr('fruits');
  }
  if (offer.value === 'weddings' || offer.value === 'gatherings') {
    const d = form.querySelector('input[name="drink"]:checked');
    if (!d) { showErr('drink', 'الرجاء اختيار نوع المشروب'); ok = false; }
    else clearErr('drink');
  }
  return ok;
}

function sendToWhatsApp(form) {
  const v  = id => form.querySelector('#' + id)?.value?.trim() || '';
  const offer = form.querySelector('#offer').value;
  let msg  = `طلب حجز جديد — Lammah bite\n`;
  msg += `----------------------------\n`;
  msg += `الاسم: ${v('name')}\n`;
  msg += `رقم الجوال: ${v('phone')}\n`;
  msg += `العرض المطلوب: ${OFFER_LABELS[offer] || offer}\n`;
  msg += `تاريخ المناسبة: ${v('event-date')}\n`;
  msg += `وقت المناسبة: ${v('event-time')}\n`;
  msg += `الحي / الموقع: ${v('location')}\n`;
  msg += `عدد الأشخاص / الأطفال: ${v('count')}\n`;
  if (offer === 'gatherings') {
    const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(f => f.value);
    msg += `الفواكه المختارة: ${fruits.join(' — ')}\n`;
  }
  if (offer === 'weddings' || offer === 'gatherings') {
    const dk = document.querySelector('input[name="drink"]:checked');
    if (dk) msg += `نوع المشروب: ${dk.value}\n`;
  }
  const notes = v('notes');
  if (notes) msg += `ملاحظات: ${notes}\n`;
  msg += `----------------------------\n${DEPOSIT_LINE}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}
