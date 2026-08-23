/* ===========================================================
   Lammah bite — Main JS
   =========================================================== */
'use strict';

/* ── EDIT ME ── */
const WHATSAPP_NUMBER = "966593822656";

/* ─── OFFERS — SINGLE SOURCE OF TRUTH ─────────────────────── */
const OFFERS = {
  weddings: {
    slug:     'weddings',
    title:    'عرض الأعراس والشبكات',
    capacity: 'من 200 إلى 250 شخص',
    sub:      '',
    intro:    'يشمل العرض التالي:',
    items: [
      '3 أنواع من الصوصات: نوتيلا — بستاشيو — لوتس',
      '3 أنواع من الفواكه الطازجة: فراولة — توت أزرق — توت أحمر',
      'نوعين من البسكويت للتزيين: لوتس — دايجستف',
      'اختيار مشروب: قهوة سوداء أو قهوة سعودية',
    ],
    priceOld:   3299,
    priceNew:   1899,
    inclusions: ['شامل التوصيل', 'عاملتين للخدمة'],
  },
  gatherings: {
    slug:     'gatherings',
    title:    'عرض الجمعات',
    capacity: 'عربة البانكيك لـ 40 شخص',
    sub:      'تشمل 40 صحن ميني بانكيك',
    intro:    'مع الإضافات التالية:',
    items: [
      '3 أنواع من الصوصات: نوتيلا — بستاشيو — لوتس',
      'نوعين من الفواكه الطازجة (العميل يختار نوعين من: فراولة — توت أزرق — توت أحمر)',
      'نوعين من بسكويت التزيين: بسكويت لوتس — بسكويت دايجستف',
      'اختيار مشروب: قهوة سوداء أو قهوة سعودية',
    ],
    priceOld:   1899,
    priceNew:   729,
    inclusions: ['شامل التوصيل', 'عاملة للخدمة'],
  },
  kids: {
    slug:     'kids',
    title:    'عرض مناسبات الأطفال والمدارس',
    capacity: 'من 30 إلى 50 طفل',
    sub:      'يشمل البانكيك ونوع عصير',
    intro:    'مع الإضافات التالية:',
    items: [
      'حلاوة جيلي',
      'مارشميلو',
      'أكياس حلوى غزل البنات على حسب عدد الأطفال',
      'نوع عصير',
    ],
    priceOld:   null,
    priceNew:   879,
    inclusions: ['شامل التوصيل والشيف'],
  },
};

const OFFER_ORDER = ['weddings', 'gatherings', 'kids'];

/* ─── INGREDIENT PHOTOS ─────────────────────────────────── */
const THUMB_PHOTOS = {
  'نوتيلا':                 'https://up6.cc/2026/08/178752035441961.png',
  'بستاشيو':                'https://up6.cc/2026/08/178752035443472.png',
  'لوتس':                   'https://up6.cc/2026/08/178752035445213.png',
  'فراولة':                 'https://up6.cc/2026/08/178752035445694.png',
  'توت أزرق':               'https://up6.cc/2026/08/178752062868521.png',
  'توت أحمر':               'https://up6.cc/2026/08/17875206287022.png',
  'بسكويت لوتس':            'https://up6.cc/2026/08/178752062872623.png',
  'بسكويت دايجستف':        'https://up6.cc/2026/08/178752062873124.png',
  'قهوة سعودية':            'https://up6.cc/2026/08/178752091145341.png',
  'قهوة سوداء':             'https://up6.cc/2026/08/178752091149142.png',
  'حلاوة جيلي':             'https://up6.cc/2026/08/178752091150663.png',
  'مارشميلو':               'https://up6.cc/2026/08/178752091152644.png',
  'أكياس حلوى غزل البنات':  'https://up6.cc/2026/08/178752146226241.png',
  'نوع عصير':               'https://up6.cc/2026/08/17875214622982.png',
};
const OFFER_INGREDIENTS = {
  weddings: [
    { heading: 'الصوصات',         keys: ['نوتيلا', 'بستاشيو', 'لوتس'] },
    { heading: 'الفواكه الطازجة', keys: ['فراولة', 'توت أزرق', 'توت أحمر'] },
    { heading: 'البسكويت',        keys: ['بسكويت لوتس', 'بسكويت دايجستف'] },
    { heading: 'المشروب',         keys: ['قهوة سوداء', 'قهوة سعودية'] },
  ],
  gatherings: [
    { heading: 'الصوصات',         keys: ['نوتيلا', 'بستاشيو', 'لوتس'] },
    { heading: 'الفواكه الطازجة', keys: ['فراولة', 'توت أزرق', 'توت أحمر'] },
    { heading: 'البسكويت',        keys: ['بسكويت لوتس', 'بسكويت دايجستف'] },
    { heading: 'المشروب',         keys: ['قهوة سوداء', 'قهوة سعودية'] },
  ],
  kids: [
    { heading: 'الإضافات', keys: ['حلاوة جيلي', 'مارشميلو', 'أكياس حلوى غزل البنات', 'نوع عصير'] },
  ],
};
function buildIngThumbs(key) {
  const groups = OFFER_INGREDIENTS[key];
  if (!groups || !groups.length) return '';
  return '<div class="ing-section">'
    + groups.map((g, gi) =>
        (gi > 0 ? '<hr class="ing-divider"/>' : '')
        + '<p class="ing-group-heading">' + esc(g.heading) + '</p>'
        + '<div class="ing-row">'
        + g.keys.map(k => {
            const src = THUMB_PHOTOS[k] || '';
            return '<div class="ing-thumb">'
              + (src ? '<img src="' + src + '" alt="' + esc(k) + '" width="88" height="88" loading="lazy" decoding="async" referrerpolicy="no-referrer" />' : '')
              + '<span class="ing-name">' + esc(k) + '</span>'
              + '</div>';
          }).join('')
        + '</div>'
      ).join('')
    + '</div>';
}

/* ─── UTILS ───────────────────────────────────────────────── */
const qs  = (sel, scope = document) => scope.querySelector(sel);
const qsa = (sel, scope = document) => [...scope.querySelectorAll(sel)];

function esc(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const ICON_CHECK = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const ICON_SPARK = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="9 12 11 14 15 10"/></svg>';

/* ─── FOOTER YEAR ─────────────────────────────────────────── */
function initFooterYear() {
  qsa('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
function initScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const denom = h.scrollHeight - h.clientHeight;
    bar.style.width = (denom > 0 ? (h.scrollTop / denom) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── HEADER SCROLL — background only, height never changes ─ */
function initHeaderScroll() {
  const hdr = qs('.site-header');
  if (!hdr) return;
  const update = () => hdr.classList.toggle('scrolled', (window.scrollY || 0) > 48);
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
    closeBtn && closeBtn.focus();
  }
  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('nav-open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger && hamburger.addEventListener('click', open);
  closeBtn  && closeBtn.addEventListener('click', close);
  backdrop  && backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  const current = location.pathname.split('/').pop() || 'index.html';
  qsa('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

/* ─── WHATSAPP LINKS ──────────────────────────────────────── */
function initWALinks() {
  qsa('[data-wa-msg]').forEach(el => { el.href = waLink(el.dataset.waMsg); });
}

/* ─── OFFER CARDS ─────────────────────────────────────────── */
function cardHTML(o) {
  const oldPrice = o.priceOld ? `<span class="price-old">${o.priceOld}</span>` : '';
  const chips = o.inclusions
    .map(inc => `<span class="incl-tag">${ICON_CHECK}${esc(inc)}</span>`).join('');

  return `
    <article class="offer-card reveal">
      <div class="card-body">
        <span class="offer-badge">${esc(o.title)}</span>
        <p class="offer-capacity">${esc(o.capacity)}</p>
        ${o.sub ? `<p class="offer-sub">${esc(o.sub)}</p>` : ''}
        <div class="offer-price">
          ${oldPrice}
          <span class="price-new-wrap">
            <span class="price-new">${o.priceNew}</span>
            <span class="price-currency">ريال</span>
          </span>
        </div>
        <div class="offer-inclusions">${chips}</div>
      </div>
      <div class="card-footer">
        <a class="btn btn-primary" href="booking.html?offer=${o.slug}">احجز الآن</a>
        <button type="button" class="btn btn-secondary" data-open-offer="${o.slug}">عرض التفاصيل</button>
      </div>
    </article>`;
}

function renderOfferCards() {
  qsa('[data-offers-grid]').forEach(grid => {
    grid.innerHTML = OFFER_ORDER.map(k => cardHTML(OFFERS[k])).join('');
  });
}

/* ─── OFFER MODAL ─────────────────────────────────────────── */
function initOfferModal() {
  const modal = qs('#offer-modal');
  if (!modal) return;

  const panel    = qs('.modal-panel', modal);
  const backdrop = qs('.modal-backdrop', modal);
  const closeBtn = qs('.modal-close-btn', modal);
  const body     = qs('.modal-body', modal);

  let lastTrigger = null;
  let savedScroll = 0;

  function render(key) {
    const o = OFFERS[key];
    if (!o) return false;

    const oldPrice = o.priceOld ? `<span class="price-old">${o.priceOld}</span>` : '';
    const rows  = o.items.map(i => `<li>${ICON_SPARK}<span>${esc(i)}</span></li>`).join('');
    const chips = o.inclusions.map(i => `<span class="incl-tag">${ICON_CHECK}${esc(i)}</span>`).join('');
    const thumbs = buildIngThumbs(key);

    body.innerHTML = `
      <span class="modal-offer-pill" id="offer-modal-title">${esc(o.title)}</span>
      <h2 class="modal-capacity">${esc(o.capacity)}</h2>
      ${o.sub ? `<p class="modal-sub">${esc(o.sub)}</p>` : ''}
      <div class="gold-divider"></div>
      ${thumbs ? thumbs + '<div class="gold-divider"></div>' : ''}
      <h3 class="modal-intro">${esc(o.intro)}</h3>
      <ul class="modal-list">${rows}</ul>
      <div class="gold-divider"></div>
      <div class="modal-price-row">
        ${oldPrice}
        <span class="price-new-wrap">
          <span class="price-new modal-price-new">${o.priceNew}</span>
          <span class="price-currency">ريال</span>
        </span>
      </div>
      <div class="modal-incl-row">${chips}</div>
      <div class="modal-policy-note">
        <p>الحجز قبل المناسبة بـ 24 ساعة على الأقل</p>
        <p>العربون نصف المبلغ عند تأكيد الحجز</p>
      </div>
      <a class="btn btn-primary btn-block" href="booking.html?offer=${o.slug}">احجز هذا العرض</a>`;
    return true;
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusables = qsa(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      panel
    ).filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open(key, trigger) {
    if (!render(key)) return;
    lastTrigger = trigger || null;
    savedScroll = window.scrollY || 0;
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => modal.classList.add('open'));
    closeBtn.focus();
    document.addEventListener('keydown', trapFocus);
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScroll);
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-open-offer]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.dataset.openOffer, trigger);
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  /* Mobile: swipe the sheet down to dismiss */
  let startY = null, deltaY = 0;
  panel.addEventListener('touchstart', e => {
    if (window.innerWidth >= 768 || panel.scrollTop > 0) return;
    startY = e.touches[0].clientY;
    deltaY = 0;
  }, { passive: true });
  panel.addEventListener('touchmove', e => {
    if (startY === null) return;
    deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) panel.style.transform = `translateY(${deltaY}px)`;
  }, { passive: true });
  panel.addEventListener('touchend', () => {
    if (startY === null) return;
    panel.style.transform = '';
    if (deltaY > 110) close();
    startY = null; deltaY = 0;
  });
}

let loadedGalleryImages = [];

/* ─── GALLERY ─────────────────────────────────────────────── */
const GALLERY_IMAGES = [
  { src: 'https://up6.cc/2026/08/178752155160161.jpeg', alt: 'من مناسبات Lammah bite 1' },
  { src: 'https://up6.cc/2026/08/178752155167392.jpeg', alt: 'من مناسبات Lammah bite 2' },
  { src: 'https://up6.cc/2026/08/178752155171823.jpeg', alt: 'من مناسبات Lammah bite 3' },
  { src: 'https://up6.cc/2026/08/178752155178544.jpeg', alt: 'من مناسبات Lammah bite 4' },
];

function initGallery() {
  loadedGalleryImages = [];
  qsa('[data-gallery-grid]').forEach(grid => {
    const limit = parseInt(grid.dataset.limit, 10) || GALLERY_IMAGES.length;
    GALLERY_IMAGES.slice(0, limit).forEach(imgData => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-item reveal';
      btn.setAttribute('aria-label', imgData.alt);

      const img = document.createElement('img');
      img.alt = imgData.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.setAttribute('referrerpolicy', 'no-referrer');
      img.width = 400;
      img.height = 300;

      img.onerror = function() {
        if (!this.dataset.retried) {
          this.dataset.retried = '1';
          this.src = imgData.src + '?v=1';
        } else {
          btn.style.display = 'none';
        }
      };
      img.onload = function() {
        if (!loadedGalleryImages.some(x => x.src === imgData.src)) {
          loadedGalleryImages.push(imgData);
        }
      };

      img.src = imgData.src;
      btn.appendChild(img);
      grid.appendChild(btn);
    });
  });
}

/* ─── LIGHTBOX ────────────────────────────────────────────── */
function initLightbox() {
  const lb = qs('.lightbox');
  if (!lb) return;
  const lbImg   = qs('img', lb);
  const lbClose = qs('.lightbox-close', lb);
  const lbPrev  = qs('.lightbox-prev', lb);
  const lbNext  = qs('.lightbox-next', lb);
  let currentIdx  = 0;
  let savedScroll = 0;

  const getList = () => loadedGalleryImages.length ? loadedGalleryImages : GALLERY_IMAGES;

  function show(idx) {
    const list = getList();
    if (!list.length) return;
    currentIdx = ((idx % list.length) + list.length) % list.length;
    lbImg.src = list[currentIdx].src;
    lbImg.alt = list[currentIdx].alt;
    lbImg.setAttribute('referrerpolicy', 'no-referrer');
  }
  function openLb(src) {
    const list = getList();
    const idx = list.findIndex(img => img.src === src || img.src + '?v=1' === src);
    savedScroll = window.scrollY || 0;
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add('modal-open');
    lb.classList.add('open');
    show(idx >= 0 ? idx : 0);
  }
  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScroll);
  }

  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const imgEl = item.querySelector('img');
    if (imgEl && imgEl.src) openLb(imgEl.src);
  });
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  lbPrev.addEventListener('click', () => show(currentIdx - 1));
  lbNext.addEventListener('click', () => show(currentIdx + 1));
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') show(currentIdx - 1);
    if (e.key === 'ArrowLeft')  show(currentIdx + 1);
  });
}

/* ─── ACCORDION ───────────────────────────────────────────── */
function initAccordion() {
  qsa('.accordion-item').forEach(item => {
    const btn = qs('.accordion-question', item);
    const ans = qs('.accordion-answer', item);
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      qsa('.accordion-item.open').forEach(o => {
        o.classList.remove('open');
        qs('.accordion-question', o).setAttribute('aria-expanded', 'false');
        qs('.accordion-answer', o).style.maxHeight = '';
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}

/* ─── BOOKING FORM ────────────────────────────────────────── */
function initBookingForm() {
  const form = qs('#booking-form');
  if (!form) return;

  const selectEl = qs('#offer-select', form);
  if (selectEl) {
    selectEl.innerHTML =
      '<option value="">اختر العرض</option>' +
      OFFER_ORDER.map(k => {
        const o = OFFERS[k];
        return `<option value="${o.slug}">${esc(o.title)} — ${o.priceNew} ريال</option>`;
      }).join('');

    const offerKey = new URLSearchParams(location.search).get('offer');
    if (offerKey && OFFERS[offerKey]) selectEl.value = offerKey;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    qsa('[required]', form).forEach(field => {
      const err = field.closest('.form-group')?.querySelector('.form-error');
      const ok  = field.value.trim() !== '';
      if (err) err.classList.toggle('show', !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;

    const name  = qs('#name-input', form)?.value.trim()  || '';
    const phone = qs('#phone-input', form)?.value.trim() || '';
    const date  = qs('#date-input', form)?.value         || '';
    const notes = qs('#notes-input', form)?.value.trim() || '';
    const offer = OFFERS[selectEl?.value || ''];

    const msg = [
      'مرحباً، أود الحجز من موقع Lammah bite',
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      offer ? `العرض: ${offer.title} — ${offer.priceNew} ريال` : '',
      `التاريخ: ${date}`,
      notes ? `ملاحظات: ${notes}` : '',
    ].filter(Boolean).join('\n');

    window.open(waLink(msg), '_blank', 'noopener');
  });
}

/* ─── REVEAL ON SCROLL ────────────────────────────────────── */
function initReveal() {
  const els = qsa('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFooterYear();
  initScrollProgress();
  initHeaderScroll();
  initNav();
  initWALinks();
  renderOfferCards();
  initOfferModal();
  initGallery();
  initLightbox();
  initAccordion();
  initBookingForm();
  initReveal();
});
