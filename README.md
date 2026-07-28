# Симулятор бізнесу — лендінг

Статичний односторінковий сайт (HTML + CSS + JS, без збірки). Готовий до публікації на GitHub Pages.

## Структура

```
landing/
├── index.html                  # головна сторінка
├── 404.html                    # сторінка помилки
├── assets/
│   ├── css/style.css           # усі стилі + адаптив
│   ├── js/main.js              # меню, скрол-ефекти, валідація форми
│   └── img/
│       ├── favicon.svg
│       └── og-image.svg        # прев'ю для соцмереж
├── .nojekyll                   # вимикає обробку Jekyll на Pages
├── robots.txt
├── .gitignore
└── .github/workflows/deploy.yml  # автодеплой на Pages
```

## Локальний запуск

Достатньо відкрити `index.html` у браузері. Або підняти локальний сервер:

```bash
python -m http.server 8000
```

## Публікація на GitHub Pages

1. Створи репозиторій на GitHub і залий код:

```bash
git init
git add .
git commit -m "Initial landing page"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

2. У репозиторії відкрий **Settings → Pages** і в полі **Source** обери **GitHub Actions**.
3. Після пушу в `main` воркфлоу задеплоїть сайт автоматично.

Сайт буде доступний за адресою `https://USERNAME.github.io/REPO/`.

> Альтернатива без Actions: у **Settings → Pages** обрати *Deploy from a branch* → `main` / `root`. Файл `.nojekyll` уже додано, тож нічого не зламається.

## Що варто змінити перед публікацією

- Тексти, тарифи й контакти в [index.html](index.html).
- Кольори та шрифт — блок `:root` у [style.css](assets/css/style.css).
- Форма підписки зараз лише валідує email на клієнті. GitHub Pages — статичний хостинг,
  тому для реального збору заявок підключи зовнішній сервіс (Formspree, Google Forms, власний API)
  у блоці «Форма підписки» в [main.js](assets/js/main.js).
- В `og:image` вкажи абсолютний URL після деплою — соцмережі не бачать відносні шляхи.

## Власний домен

Створи файл `CNAME` у корені з доменом (одним рядком), напр. `simulator.example.com`,
і додай DNS-запис у реєстратора.
