/* Симулятор бізнесу — landing scripts */
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

  /* ---- Поява блоків при скролі ---- */
  var targets = document.querySelectorAll('.feature, .step, .plan, .faq__item');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ---- Форма підписки ----
     GitHub Pages — статичний хостинг, тому справжня відправка неможлива.
     Підключи сюди Formspree / Google Forms / власний API. */
  var form = document.getElementById('signup-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var input = form.querySelector('input[name="email"]');
      var value = input.value.trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      note.classList.remove('is-error', 'is-ok');
      input.classList.toggle('is-invalid', !valid);

      if (!valid) {
        note.textContent = 'Введіть коректну email-адресу.';
        note.classList.add('is-error');
        input.focus();
        return;
      }

      note.textContent = 'Дякуємо! Доступ надішлемо на ' + value;
      note.classList.add('is-ok');
      form.reset();
    });
  }
})();
