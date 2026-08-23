/* ===========================================================
   Lammah bite — Main JS
   =========================================================== */
'use strict';

/* ── EDIT ME ── */
const WHATSAPP_NUMBER = "9665XXXXXXXX";

/* ─── OFFER DATA ──────────────────────────────────────────── */
const OFFERS_DATA = {
  weddings: {
    label:    'حفلات الزفاف',
    badge:    'الأعراس',
    capacity: 'يناسب من 200 إلى 250 شخص',
    items: [
      'بانكيك مع تشكيلة صوصات',
      'فواكه طازجة وبسكويت',
      'مشروب لكل ضيف',
    ],
    priceOld: 3299,
    priceNew: 1899,
    inclusions: ['شامل التوصيل', 'عاملتين للخدمة'],
  },
  gatherings: {
    label:    'التجمعات',
    badge:    'التجمعات',
    capacity: 'يناسب 40 شخص',
    items: [
      '40 صحن ميني بانكيك',
      'تشكيلة صوصات متنوعة',
      'توصيل مجاني',
    ],
    priceOld: 1899,
    priceNew: 729,
    inclusions: ['شامل التوصيل', 'عاملة للخدمة'],
  },
  kids: {
    label:    'حفلات الأطفال',
    badge:    'الأطفال',
    capacity: 'من 30 إلى 50 طفل',
    items: [
      'بانكيك لكل طفل',
      'عصير + جيلي + مارشميلو',
      'أكياس حلوى غزل البنات على حسب عدد الأطفال',
      'شامل التوصيل والشيف',
    ],
    priceOld: null,
    priceNew: 879,
    inclusions: ['شامل التوصيل', 'شيف متخصص'],
  },
};

/* ─── UTILS ───────────────────────────────────────────────── */
const qs  = (sel, scope = document) => scope.querySelector(sel);
const qsa = (sel, scope = document) => [...scope.querySelectorAll(sel)];

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
function initScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;
  function update() {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── HEADER SCROLL — only background/blur/border/shadow ──── */
function initHeaderScroll() {
  const hdr = qs('.site-header');
  if (!hdr) return;
  let last = 0;
  function update() {
    const y = window.scrollY || window.pageYOffset;
    if (y > 48 && !hdr.classList.contains('scrolled')) hdr.classList.add('scrolled');
    if (y <= 48 && hdr.classList.contains('scrolled')) hdr.classList.remove('scrolled');
    last = y;
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── NAV OVERLAY ─────────────────────────────────────────── */
function initNav() {
  const overlay   = qs('.nav-overlay');
  const backdrop  = qs('.nav-backdrop');
  const hamburger = qs('.hamburger');
  const closeBtn  = qs('.nav-close');
  if (!overlay) return;

  function open() {
    overlay.classList.add('open');
    document.body.classList.add('nav-open');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
  }
  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('nav-open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger  && hamburger.addEventListener('click', open);
  closeBtn   && closeBtn.addEventListener('click', close);
  backdrop   && backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* Active link highlight */
  const current = location.pathname.split('/').pop() || 'index.html';
  qsa('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });
}

/* ─── WHATSAPP BUTTONS ────────────────────────────────────── */
function initWAButtons() {
  /* floating button */
  const fab = qs('.floating-whatsapp');
  if (fab) fab.href = waLink('مرحباً، أود الاستفسار عن خدمات لمّة بايت 🥞');

  /* CTA buttons with data-wa-offer */
  qsa('[data-wa-offer]').forEach(btn => {
    const key  = btn.dataset.waOffer;
    const data = OFFERS_DATA[key];
    if (!data) return;
    btn.href = waLink(`مرحباً، أود حجز باقة ${data.label}، سعر ${data.priceNew} ريال ✨`);
  });

  /* Generic wa links */
  qsa('[data-wa-msg]').forEach(btn => {
    btn.href = waLink(btn.dataset.waMsg);
  });
}

/* ─── OFFER MODAL ─────────────────────────────────────────── */
function initOfferModal() {
  const modal    = qs('.offer-modal');
  const backdrop = modal && qs('.modal-backdrop', modal);
  const closeBtn = modal && qs('.modal-close-btn', modal);
  if (!modal) return;

  function renderModal(key) {
    const d = OFFERS_DATA[key];
    if (!d) return;
    qs('.modal-offer-badge', modal).textContent  = d.badge;
    qs('#modal-title', modal).textContent        = d.label;
    qs('.modal-capacity', modal).textContent     = d.capacity;
    qs('.modal-price-new', modal).textContent    = d.priceNew.toLocaleString('ar-SA');
    const oldEl = qs('.modal-price-old', modal);
    if (oldEl) { oldEl.textContent = d.priceOld ? d.priceNew.toLocaleString('ar-SA') : ''; oldEl.style.display = d.priceOld ? '' : 'none'; }
    const oldWrap = qs('[data-old-price]', modal);
    if (oldWrap) oldWrap.textContent = d.priceOld ? d.priceOld.toLocaleString('ar-SA') : '';

    /* items list */
    const list = qs('.modal-list', modal);
    list.innerHTML = d.items.map(item => `
      <li>
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        ${item}
      </li>`).join('');

    /* inclusions */
    const inclRow = qs('.modal-incl-row', modal);
    if (inclRow) {
      inclRow.innerHTML = d.inclusions.map(inc => `
        <span class="incl-tag">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${inc}
        </span>`).join('');
    }

    /* WA book link */
    const bookBtn = qs('[data-modal-wa]', modal);
    if (bookBtn) bookBtn.href = waLink(`مرحباً، أود حجز باقة ${d.label}، سعر ${d.priceNew} ريال ✨`);
    const bookPage = qs('[data-modal-booking-page]', modal);
    if (bookPage) bookPage.href = `booking.html?offer=${key}`;
  }

  function openModal(key) {
    renderModal(key);
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.focus();
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  qsa('[data-open-offer]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.openOffer)));
  closeBtn  && closeBtn.addEventListener('click', closeModal);
  backdrop  && backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });
}

/* ─── GALLERY ─────────────────────────────────────────────── */
const GALLERY_IMAGES = [
  { src: 'https://b.top4top.io/p_3886dro0e1.jpeg', alt: 'صورة من لمّة بايت 1' },
  { src: 'https://c.top4top.io/p_3886pc12x2.jpeg', alt: 'صورة من لمّة بايت 2' },
  { src: 'https://d.top4top.io/p_3886b1lcc3.jpeg', alt: 'صورة من لمّة بايت 3' },
  { src: 'https://e.top4top.io/p_3886fusw64.jpeg', alt: 'صورة من لمّة بايت 4' },
  { src: 'https://f.top4top.io/p_3886vk7zh5.jpeg', alt: 'صورة من لمّة بايت 5' },
  { src: 'https://g.top4top.io/p_3886y69ca6.jpeg', alt: 'صورة من لمّة بايت 6' },
];

function buildGalleryItem(imgData, idx) {
  const item = document.createElement('div');
  item.className = 'gallery-item reveal';
  item.dataset.idx = idx;

  const img = document.createElement('img');
  img.src              = imgData.src;
  img.alt              = imgData.alt;
  img.loading          = 'lazy';
  img.setAttribute('referrerpolicy', 'no-referrer');

  /* onerror: retry without referrer-policy override, then hide */
  img.onerror = function() {
    // try crossOrigin anonymous once
    if (!this.dataset.retried) {
      this.dataset.retried = '1';
      const orig = this.src;
      this.src = '';
      this.crossOrigin = 'anonymous';
      this.src = orig;
    } else {
      // hide broken tile
      this.closest('.gallery-item').style.display = 'none';
    }
  };

  item.appendChild(img);
  return item;
}

function initGallery() {
  const grids = qsa('.gallery-js-grid');
  grids.forEach(grid => {
    const limit = parseInt(grid.dataset.limit) || GALLERY_IMAGES.length;
    GALLERY_IMAGES.slice(0, limit).forEach((imgData, idx) => {
      grid.appendChild(buildGalleryItem(imgData, idx));
    });
  });
}

/* ─── LIGHTBOX ────────────────────────────────────────────── */
function initLightbox() {
  const lb    = qs('.lightbox');
  const lbImg = lb && qs('img', lb);
  const lbClose = lb && qs('.lightbox-close', lb);
  const lbPrev  = lb && qs('.lightbox-prev', lb);
  const lbNext  = lb && qs('.lightbox-next', lb);
  if (!lb || !lbImg) return;
  let currentIdx = 0;

  function showIdx(idx) {
    const total = GALLERY_IMAGES.length;
    currentIdx = ((idx % total) + total) % total;
    const src = GALLERY_IMAGES[currentIdx]?.src;
    if (src) { lbImg.src = src; lbImg.setAttribute('referrerpolicy', 'no-referrer'); }
  }
  function open(idx) { showIdx(idx); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close()   { lb.classList.remove('open'); document.body.style.overflow = ''; }

  document.addEventListener('click', e => {
    const gi = e.target.closest('.gallery-item');
    if (gi) { open(parseInt(gi.dataset.idx) || 0); }
  });
  lbClose && lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  lbPrev  && lbPrev.addEventListener('click', () => showIdx(currentIdx - 1));
  lbNext  && lbNext.addEventListener('click', () => showIdx(currentIdx + 1));
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') showIdx(currentIdx - 1);
    if (e.key === 'ArrowLeft')  showIdx(currentIdx + 1);
  });
}

/* ─── CAROUSEL DOTS ───────────────────────────────────────── */
function initCarouselDots() {
  const track = qs('.offers-track');
  if (!track) return;
  const dots = qsa('.carousel-dot');
  if (!dots.length) return;

  const cards = qsa('.offer-card', track);
  function update() {
    const scrollLeft = track.scrollLeft;
    const cardW = cards[0]?.offsetWidth + 16 || 1;
    const idx = Math.round(scrollLeft / cardW);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  track.addEventListener('scroll', update, { passive: true });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const cardW = cards[0]?.offsetWidth + 16 || 1;
      track.scrollTo({ left: i * cardW, behavior: 'smooth' });
    });
  });
  update();
}

/* ─── CARD TILT ───────────────────────────────────────────── */
function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  qsa('.offer-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ─── ACCORDION ───────────────────────────────────────────── */
function initAccordion() {
  qsa('.accordion-item').forEach(item => {
    const btn = qs('.accordion-question', item);
    const ans = qs('.accordion-answer', item);
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      qsa('.accordion-item.open').forEach(o => {
        o.classList.remove('open');
        qs('.accordion-answer', o).style.maxHeight = '';
      });
      if (!open) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}

/* ─── BOOKING FORM ────────────────────────────────────────── */
const OFFER_LABELS = {
  weddings:   'حفلات الزفاف (1899 ريال) — يناسب 200–250 شخص',
  gatherings: 'التجمعات (729 ريال) — يناسب 40 شخص',
  kids:       'حفلات الأطفال (879 ريال) — من 30 إلى 50 طفل',
};

function initBookingForm() {
  const form = qs('#booking-form');
  if (!form) return;

  /* pre-select offer from URL */
  const params    = new URLSearchParams(location.search);
  const offerKey  = params.get('offer');
  const selectEl  = qs('#offer-select', form);
  if (offerKey && selectEl) {
    for (const opt of selectEl.options) { if (opt.value === offerKey) { opt.selected = true; break; } }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    qsa('[required]', form).forEach(field => {
      const err = field.parentElement.querySelector('.form-error');
      if (!field.value.trim()) {
        if (err) err.classList.add('show');
        valid = false;
      } else {
        if (err) err.classList.remove('show');
      }
    });
    if (!valid) return;

    const name   = qs('#name-input', form)?.value  || '';
    const phone  = qs('#phone-input', form)?.value || '';
    const offer  = qs('#offer-select', form)?.value || '';
    const date   = qs('#date-input', form)?.value  || '';
    const extras = qsa('.extras-check:checked', form).map(c => c.value);
    const notes  = qs('#notes-input', form)?.value || '';
    const offerLabel = OFFER_LABELS[offer] || offer;

    const msg = [
      `مرحباً، أود الحجز من موقع لمّة بايت 🥞`,
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `الباقة: ${offerLabel}`,
      `التاريخ: ${date}`,
      extras.length ? `الإضافات: ${extras.join(' - ')}` : '',
      notes ? `ملاحظات: ${notes}` : '',
    ].filter(Boolean).join('\n');

    window.open(waLink(msg), '_blank', 'noopener');
  });
}

/* ─── REVEAL ON SCROLL ────────────────────────────────────── */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    qsa('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  qsa('.reveal').forEach(el => obs.observe(el));
}

/* ─── PRICE COUNT-UP ──────────────────────────────────────── */
function initPriceReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el  = en.target;
      const end = parseInt(el.dataset.price) || 0;
      let start = 0;
      const dur = 700;
      const step = timestamp => {
        if (!start) start = timestamp;
        const p = Math.min((timestamp - start) / dur, 1);
        el.textContent = Math.floor(p * end).toLocaleString('ar-SA');
        if (p < 1) requestAnimationFrame(step);
        else { el.textContent = end.toLocaleString('ar-SA'); el.classList.add('counted'); }
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  qsa('.price-new[data-price]').forEach(el => obs.observe(el));
}

/* ─── PARALLAX ────────────────────────────────────────────── */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layers = qsa('.hero-parallax-layer');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    layers.forEach(l => { l.style.transform = `translateY(${y * 0.15}px)`; });
  }, { passive: true });
}

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initNav();
  initWAButtons();
  initOfferModal();
  initGallery();
  initLightbox();
  initCarouselDots();
  initCardTilt();
  initAccordion();
  initBookingForm();
  initReveal();
  initPriceReveal();
  initParallax();
});
