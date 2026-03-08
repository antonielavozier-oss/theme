/* ══════════════════════════════════════════════
   ARCHETYPE® — archetype.js  v3.0
══════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Hero Slideshow ── */
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.hero-dot');
  var cur = 0, heroTimer;

  function gotoHero(n) {
    if (!slides.length) return;
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = n;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  if (slides.length) {
    heroTimer = setInterval(function () { gotoHero((cur + 1) % slides.length); }, 6200);
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        clearInterval(heroTimer);
        gotoHero(i);
        heroTimer = setInterval(function () { gotoHero((cur + 1) % slides.length); }, 6200);
      });
    });
  }

  /* ── Sticky Nav — transparent → solid on scroll ── */
  var header = document.querySelector('.site-header');
  if (header) {
    function onScroll() {
      var y = window.scrollY;
      var isScrolled = y > 10;
      header.classList.toggle('scrolled', isScrolled);
      document.body.classList.toggle('scrolled-body', isScrolled);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

  
  /* ── Search Overlay ── */
  var searchTrigger   = document.getElementById('search-trigger');
  var searchOverlay   = document.getElementById('search-overlay');
  var searchBackdrop  = document.getElementById('search-backdrop');
  var searchClose     = document.getElementById('search-close');
  var searchInput     = document.getElementById('search-input');
  var drawerSearchTrigger = document.getElementById('drawer-search-trigger');

  function openSearch() {
    searchOverlay.classList.add('open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    if (searchTrigger) searchTrigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus input after animation
    setTimeout(function() { if (searchInput) searchInput.focus(); }, 120);
  }

  function closeSearch() {
    searchOverlay.classList.remove('open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    if (searchTrigger) searchTrigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (searchInput) searchInput.blur();
  }

  if (searchTrigger)  searchTrigger.addEventListener('click', openSearch);
  if (searchClose)    searchClose.addEventListener('click', closeSearch);
  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);
  if (drawerSearchTrigger) {
    drawerSearchTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      // Close drawer first then open search
      var drawer  = document.getElementById('nav-drawer');
      var overlay = document.getElementById('nav-overlay');
      if (drawer)  drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(openSearch, 300);
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) {
      closeSearch();
    }
  });

  /* ── Mobile drawer ── */
    var hamburger = document.getElementById('nav-hamburger');
    var drawer    = document.getElementById('nav-drawer');
    var overlay   = document.getElementById('nav-overlay');
    var closeBtn  = document.getElementById('nav-drawer-close');

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (closeBtn)  closeBtn.addEventListener('click', closeDrawer);
    if (overlay)   overlay.addEventListener('click', closeDrawer);

    // Close drawer on nav link click
    var drawerLinks = document.querySelectorAll('.drawer-nav a, .drawer-footer a');
    drawerLinks.forEach(function(l) { l.addEventListener('click', closeDrawer); });
  }

  /* ── Reveal on scroll ── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('visible'); }, i * 100);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { obs.observe(el); });
  }

  /* ── Coming Soon Slideshow ── */
  var csSlides = document.querySelectorAll('.cs-slide');
  var csDots   = document.querySelectorAll('.cs-sdot');
  var csBadge  = document.getElementById('cs-badge-name');
  var csBadges = window.AT_BADGES || ['Foundation & Trinity', 'Nectar Booster', 'The Collection'];
  var csCur = 0, csTimer;

  function gotoCS(n) {
    if (!csSlides.length) return;
    csSlides[csCur].classList.remove('active');
    if (csDots[csCur]) csDots[csCur].classList.remove('active');
    csCur = n;
    csSlides[csCur].classList.add('active');
    if (csDots[csCur]) csDots[csCur].classList.add('active');
    if (csBadge) csBadge.textContent = csBadges[csCur];
  }

  if (csSlides.length) {
    csTimer = setInterval(function () { gotoCS((csCur + 1) % csSlides.length); }, 5800);
    csDots.forEach(function (d) {
      d.addEventListener('click', function () {
        clearInterval(csTimer);
        gotoCS(parseInt(d.dataset.n, 10));
        csTimer = setInterval(function () { gotoCS((csCur + 1) % csSlides.length); }, 5800);
      });
    });
  }

  /* ── Countdown ── */
  var launchStr = window.AT_LAUNCH || '2025-09-15T00:00:00';
  var launch = new Date(launchStr);
  var dEl = document.getElementById('cs-cd-d'),
      hEl = document.getElementById('cs-cd-h'),
      mEl = document.getElementById('cs-cd-m'),
      sEl = document.getElementById('cs-cd-s');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = Math.max(launch - new Date(), 0);
    if (dEl) dEl.textContent = pad(Math.floor(diff / 86400000));
    if (hEl) hEl.textContent = pad(Math.floor(diff % 86400000 / 3600000));
    if (mEl) mEl.textContent = pad(Math.floor(diff % 3600000  / 60000));
    if (sEl) sEl.textContent = pad(Math.floor(diff % 60000    / 1000));
  }

  if (dEl || hEl) { tick(); setInterval(tick, 1000); }

  /* ── Stagger CS lang cells ── */
  document.querySelectorAll('.cs-lang-cell').forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.animation = 'at-fade-up 0.5s ' + (1.2 + i * 0.06) + 's ease forwards';
  });

})();


/* ── Product Page: Image Switcher ── */
var mainImg = document.getElementById('pdp-main');
var thumbBtns = document.querySelectorAll('.pdp-thumb');
thumbBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    thumbBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    if (mainImg) {
      mainImg.style.opacity = '0';
      setTimeout(function() {
        mainImg.src = btn.dataset.src;
        mainImg.style.opacity = '1';
      }, 220);
    }
  });
});

/* ── Product Page: Accordions ── */
document.querySelectorAll('.acc-hd').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    var panel = btn.nextElementSibling;
    var icon  = btn.querySelector('.acc-icon');
    btn.setAttribute('aria-expanded', !expanded);
    panel.style.display = expanded ? 'none' : 'block';
    if (icon) icon.textContent = expanded ? '+' : '−';
  });
});

/* ── Product Page: Quantity ── */
var qtyN = document.getElementById('qty-n');
var qtyM = document.getElementById('qty-m');
var qtyP = document.getElementById('qty-p');
if (qtyN) {
  qtyM && qtyM.addEventListener('click', function() {
    var v = parseInt(qtyN.value, 10);
    if (v > 1) qtyN.value = v - 1;
  });
  qtyP && qtyP.addEventListener('click', function() {
    qtyN.value = parseInt(qtyN.value, 10) + 1;
  });
}

/* ══════════════════════════════════════════════
   ADD TO CART — AJAX + Popup
══════════════════════════════════════════════ */
(function () {
  var form    = document.getElementById('pdp-form');
  var popup   = document.getElementById('atc-popup');
  var backdrop = document.getElementById('atc-popup-backdrop');
  var closeBtn = document.getElementById('atc-popup-close');
  var keepBtn  = document.getElementById('atc-popup-keep');
  var countEl  = document.getElementById('atc-cart-count');
  var atcBtn   = form ? form.querySelector('.pdp-atc-btn') : null;

  if (!form || !popup) return;

  function openPopup(cartData) {
    // Update cart count badge
    if (countEl && cartData && cartData.item_count) {
      countEl.textContent = cartData.item_count;
    }
    // Update global header cart count
    var headerCount = document.querySelector('.cart-count');
    if (headerCount && cartData) {
      headerCount.textContent = cartData.item_count;
      headerCount.style.display = cartData.item_count > 0 ? '' : 'none';
    }
    popup.classList.add('is-open');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus trap — focus close button
    if (closeBtn) closeBtn.focus();
  }

  function closePopup() {
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (atcBtn) atcBtn.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Loading state
    if (atcBtn) {
      atcBtn.classList.add('is-loading');
      atcBtn.setAttribute('aria-busy', 'true');
    }

    var formData = new FormData(form);
    formData.append('sections', 'cart-icon-bubble');

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        id: formData.get('id'),
        quantity: parseInt(formData.get('quantity') || 1, 10)
      })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('Cart error');
      return res.json();
    })
    .then(function () {
      // Fetch updated cart for item count
      return fetch('/cart.js');
    })
    .then(function (res) { return res.json(); })
    .then(function (cart) {
      if (atcBtn) {
        atcBtn.classList.remove('is-loading');
        atcBtn.removeAttribute('aria-busy');
      }
      openPopup(cart);
    })
    .catch(function (err) {
      console.error('ATC error:', err);
      if (atcBtn) {
        atcBtn.classList.remove('is-loading');
        atcBtn.removeAttribute('aria-busy');
      }
      // Fallback: native form submit
      form.submit();
    });
  });

  // Close on backdrop, close button, keep shopping, or Escape
  if (backdrop)  backdrop.addEventListener('click', closePopup);
  if (closeBtn)  closeBtn.addEventListener('click', closePopup);
  if (keepBtn)   keepBtn.addEventListener('click', closePopup);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('is-open')) {
      closePopup();
    }
  });
})();

/* ══════════════════════════════════════════════
   PRODUCT CAROUSEL
══════════════════════════════════════════════ */
(function () {
  var carousel = document.getElementById('prod-carousel');
  if (!carousel) return;

  var dotsWrap  = document.getElementById('prod-carousel-dots');
  var btnPrev   = document.querySelector('.prod-carousel-arrow--prev');
  var btnNext   = document.querySelector('.prod-carousel-arrow--next');
  var slides    = carousel.querySelectorAll('.prod-slide');
  var slideW    = 0;
  var visCount  = 0;
  var dotBtns   = [];

  function getSlideWidth() {
    if (!slides.length) return 0;
    var s = slides[0];
    return s.offsetWidth + parseInt(getComputedStyle(carousel).gap || 24);
  }

  function getVisibleCount() {
    return Math.round(carousel.offsetWidth / getSlideWidth()) || 1;
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    dotBtns = [];
    slideW   = getSlideWidth();
    visCount = getVisibleCount();
    var pageCount = Math.ceil(slides.length / visCount);
    for (var i = 0; i < pageCount; i++) {
      var btn = document.createElement('button');
      btn.className = 'prod-carousel-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Go to page ' + (i + 1));
      btn.dataset.page = i;
      btn.addEventListener('click', function () { goToPage(parseInt(this.dataset.page)); });
      dotsWrap.appendChild(btn);
      dotBtns.push(btn);
    }
  }

  function goToPage(page) {
    slideW   = getSlideWidth();
    visCount = getVisibleCount();
    var padLeft = parseInt(getComputedStyle(carousel).paddingLeft || 60);
    carousel.scrollTo({ left: page * visCount * slideW, behavior: 'smooth' });
    dotBtns.forEach(function (d, i) { d.classList.toggle('active', i === page); });
  }

  function getCurrentPage() {
    slideW   = getSlideWidth();
    visCount = getVisibleCount();
    return Math.round(carousel.scrollLeft / (visCount * slideW)) || 0;
  }

  if (btnPrev) btnPrev.addEventListener('click', function () { goToPage(Math.max(0, getCurrentPage() - 1)); });
  if (btnNext) btnNext.addEventListener('click', function () {
    var maxPage = Math.ceil(slides.length / getVisibleCount()) - 1;
    goToPage(Math.min(maxPage, getCurrentPage() + 1));
  });

  carousel.addEventListener('scroll', function () {
    var cur = getCurrentPage();
    dotBtns.forEach(function (d, i) { d.classList.toggle('active', i === cur); });
  }, { passive: true });

  buildDots();
  window.addEventListener('resize', buildDots);
})();

/* ══════════════════════════════════════════════
   LIVE SEARCH
══════════════════════════════════════════════ */
(function () {
  var input     = document.getElementById('search-input');
  var results   = document.getElementById('search-live-results');
  var spinner   = document.getElementById('search-spinner');
  var hint      = document.getElementById('search-hint');
  if (!input || !results) return;

  var debounceT = null;
  var lastQ     = '';

  function formatMoney(cents) {
    return (cents / 100).toLocaleString('en-EU', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
  }

  function renderResults(items, q) {
    results.innerHTML = '';
    if (!items || items.length === 0) {
      results.innerHTML = '<p class="search-no-results">No products found for &ldquo;' + q + '&rdquo;</p>';
      results.classList.add('has-results');
      if (hint) hint.style.display = 'none';
      return;
    }
    items.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = item.url;
      a.setAttribute('role', 'option');
      var imgHtml = item.featured_image
        ? '<div class="search-result-img"><img src="' + item.featured_image.url.replace(/(\.\w+)$/, '_100x100$1') + '" alt="' + (item.featured_image.alt || item.title) + '" width="52" height="52" loading="lazy"></div>'
        : '<div class="search-result-img"></div>';
      a.innerHTML = imgHtml +
        '<div>' +
          '<p class="search-result-type">' + (item.product_type || '') + '</p>' +
          '<p class="search-result-title">' + item.title + '</p>' +
          '<p class="search-result-price">' + formatMoney(item.price_min) + '</p>' +
        '</div>';
      results.appendChild(a);
    });
    // View all link
    var viewAll = document.createElement('a');
    viewAll.className = 'search-view-all-result';
    viewAll.href = '/search?type=product&q=' + encodeURIComponent(q);
    viewAll.textContent = 'View all results for "' + q + '"';
    results.appendChild(viewAll);

    results.classList.add('has-results');
    if (hint) hint.style.display = 'none';
  }

  function clearResults() {
    results.innerHTML = '';
    results.classList.remove('has-results');
    if (hint) hint.style.display = '';
  }

  function doSearch(q) {
    if (q === lastQ) return;
    lastQ = q;
    if (!q || q.length < 2) { clearResults(); return; }

    if (spinner) spinner.classList.add('is-visible');

    fetch('/search/suggest.json?q=' + encodeURIComponent(q) + '&resources[type]=product&resources[limit]=6')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (spinner) spinner.classList.remove('is-visible');
        var items = data && data.resources && data.resources.results && data.resources.results.products;
        renderResults(items, q);
      })
      .catch(function () {
        if (spinner) spinner.classList.remove('is-visible');
        clearResults();
      });
  }

  input.addEventListener('input', function () {
    var q = this.value.trim();
    clearTimeout(debounceT);
    if (!q) { clearResults(); lastQ = ''; return; }
    debounceT = setTimeout(function () { doSearch(q); }, 280);
  });

  // Reset on close
  var closeBtn = document.getElementById('search-close');
  if (closeBtn) {
    var origClose = closeBtn.onclick;
    closeBtn.addEventListener('click', function () { clearResults(); lastQ = ''; input.value = ''; });
  }
})();

/* sticky layout — no JS offset needed */
