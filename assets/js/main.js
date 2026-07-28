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

  /* ---- Поява блоків при скролі ---- */
  var targets = document.querySelectorAll('.feature, .plan, .review, .gallery__item, .solution, .guarantee');

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

  /* ---- Вибір формату участі підставляється у форму ----
     Кнопки тарифів та лекції ведуть на #join і одразу обирають потрібний варіант. */
  var interest = document.getElementById('interest');
  var presets = {
    'btn-tripwire': 'lecture',
    'btn-join': 'club'
  };

  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href="#join"]') : null;
    if (!link || !interest) return;

    var value = presets[link.id];
    if (!value) {
      var text = (link.textContent || '').toLowerCase();
      if (text.indexOf('vip') !== -1) value = 'vip';
      else if (text.indexOf('лекц') !== -1) value = 'lecture';
      else value = 'club';
    }
    interest.value = value;
  });

  /* ---- Форма заявки ----
     GitHub Pages — статичний хостинг, тому справжня відправка неможлива.
     Підключіть сюди Formspree / Google Forms / Telegram-бота / власний API. */
  var form = document.getElementById('signup-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = form.querySelector('input[name="name"]');
      var emailInput = form.querySelector('input[name="email"]');

      var nameOk = nameInput.value.trim().length >= 2;
      var emailValue = emailInput.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue);

      note.classList.remove('is-error', 'is-ok');
      nameInput.classList.toggle('is-invalid', !nameOk);
      emailInput.classList.toggle('is-invalid', !emailOk);

      if (!nameOk) {
        note.textContent = 'Вкажіть, будь ласка, ваше ім’я.';
        note.classList.add('is-error');
        nameInput.focus();
        return;
      }

      if (!emailOk) {
        note.textContent = 'Введіть коректну email-адресу.';
        note.classList.add('is-error');
        emailInput.focus();
        return;
      }

      note.textContent = 'Дякуємо! Ми зв’яжемося з вами протягом 24 годин на ' + emailValue;
      note.classList.add('is-ok');
      form.reset();
    });
  }
})();
