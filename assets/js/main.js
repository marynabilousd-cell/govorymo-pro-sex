/* ГОВОРИМО ПРО СЕКС — скрипти лендінгу */
(function () {
  'use strict';

  /* ---- Рік у футері ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Мобільне меню ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Тінь хедера при скролі ---- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Каруселі (відгуки та фотогалерея) ----
     Гортання стрілками, свайпом і колесом миші. По колу:
     з останньої картки переходимо на першу і навпаки. */
  Array.prototype.forEach.call(document.querySelectorAll('.slider'), function (slider) {
    var track = slider.querySelector('.slider__track');
    if (!track) return;

    var prevBtn = slider.querySelector('.slider__nav--prev');
    var nextBtn = slider.querySelector('.slider__nav--next');

    var step = function () {
      var card = track.firstElementChild;
      if (!card) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
      return card.getBoundingClientRect().width + gap;
    };

    var maxScroll = function () {
      return track.scrollWidth - track.clientWidth;
    };

    var next = function () {
      if (track.scrollLeft >= maxScroll() - 2) track.scrollTo({ left: 0 });
      else track.scrollBy({ left: step() });
    };

    var prev = function () {
      if (track.scrollLeft <= 2) track.scrollTo({ left: maxScroll() });
      else track.scrollBy({ left: -step() });
    };

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    /* Стрілки на клавіатурі, коли доріжка у фокусі */
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    });

    /* Якщо всі картки вміщаються — стрілки не потрібні */
    var toggleNav = function () {
      var needed = track.scrollWidth > track.clientWidth + 4;
      if (prevBtn) prevBtn.hidden = !needed;
      if (nextBtn) nextBtn.hidden = !needed;
    };
    toggleNav();
    window.addEventListener('resize', toggleNav);
  });

  /* ---- «Читати більше» у відгуках ----
     Текст обрізаний до 5 рядків (CSS). Кнопка з'являється лише там,
     де текст справді не вмістився. */
  Array.prototype.forEach.call(document.querySelectorAll('.review'), function (review) {
    var text = review.querySelector('.review__text');
    var author = review.querySelector('.review__author');
    if (!text || !author) return;

    if (text.scrollHeight <= text.clientHeight + 2) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'review__more';
    btn.textContent = 'Читати більше';
    btn.setAttribute('aria-expanded', 'false');
    review.insertBefore(btn, author);

    btn.addEventListener('click', function () {
      var open = review.classList.toggle('is-open');
      btn.textContent = open ? 'Згорнути' : 'Читати більше';
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---- Поява блоків при скролі ---- */
  var targets = document.querySelectorAll('.feature, .plan, .solution, .guarantee');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

})();
