/* ================================================================
   VOUSSOIR v4 — Main JS
   Pure B&W. No category colors. Just animations.
   ================================================================ */

(function () {
  'use strict';

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.anim');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ── Stagger article cards ── */
  function staggerCards() {
    document.querySelectorAll('.articles-grid').forEach(function (grid) {
      grid.querySelectorAll('.article-card').forEach(function (card, i) {
        card.classList.add('anim');
        card.style.transitionDelay = (i * 0.07) + 's';
      });
    });

    document.querySelectorAll('.article-list-item').forEach(function (item, i) {
      item.classList.add('anim');
      item.style.transitionDelay = (i * 0.05) + 's';
    });
  }

  /* ── Stagger number cells ── */
  function staggerNumbers() {
    document.querySelectorAll('.number-cell').forEach(function (cell, i) {
      cell.classList.add('anim');
      cell.style.transitionDelay = (i * 0.07) + 's';
    });
  }

  /* ── Reveal page sections ── */
  function animateSections() {
    ['.feature-block', '.section-bar', '.bottom-strip', '.page-header-desc'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('anim');
      });
    });
  }

  /* ── Marquee pause on hover ── */
  function initMarquee() {
    var track = document.querySelector('.marquee-track');
    if (!track) return;
    var marquee = track.closest('.marquee');
    if (!marquee) return;
    marquee.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }

  /* ── Reading progress bar (article pages only) ── */
  function initReadingProgress() {
    var content = document.querySelector('.article-content');
    if (!content) return;

    var bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:54px;left:0;right:0;height:2px;background:#0D0D0D;transform-origin:left;transform:scaleX(0);transition:transform 0.1s linear;z-index:99;pointer-events:none;';
    document.body.appendChild(bar);

    window.addEventListener('scroll', function () {
      var rect = content.getBoundingClientRect();
      var total = content.offsetHeight;
      var scrolled = -rect.top;
      var progress = Math.max(0, Math.min(1, scrolled / total));
      bar.style.transform = 'scaleX(' + progress + ')';
    }, { passive: true });
  }

  /* ── Cite button ── */
  function initCiteButton() {
    var btn = document.getElementById('cite-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var box = document.querySelector('.cite-box');
      if (!box) return;
      var text = box.innerText;
      var orig = btn.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copied \u2713';
          setTimeout(function () { btn.textContent = orig; }, 2000);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copied \u2713';
        setTimeout(function () { btn.textContent = orig; }, 2000);
      }
    });
  }

  /* ── Init ── */
  function init() {
    staggerCards();
    staggerNumbers();
    animateSections();
    initScrollReveal();
    initMarquee();
    initReadingProgress();
    initCiteButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
