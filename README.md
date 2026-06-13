# Portfolio — Артём Бычков

Персональный сайт-портфолио frontend-разработчика с подборкой проектов,
самостоятельными страницами кейсов, живыми демо-ссылками, GitHub-ссылками
и коротким описанием опыта.

## Живая версия

[https://cherreshenka1.github.io/portfolio/](https://cherreshenka1.github.io/portfolio/)

## Упаковка

Портфолио упаковано как спокойная продуктовая витрина: первый экран объясняет пользу,
избранные проекты оформлены как кейсы, а демо показывают реальные сценарии пользователей.
У каждого проекта есть отдельная страница `projects/<slug>/` с контекстом, проблемой,
решением, функциями, состояниями интерфейса и ссылками на Live/GitHub.

## Встроенные демо

В портфолио добавлены 10 самостоятельных статических демо-автоматизаций с живыми сценариями:
Cashflow Command Center, Hiring Pipeline Lab, Restaurant Prep Planner,
Warehouse Dispatch Board, Habit Coach Dashboard, Academy Progress Map,
Real Estate Lead Room, Clinic Flow Console, Event Budget Studio и Content Calendar Ops.
Каждое демо содержит интерактивный KPI, фильтры статусов, рабочую очередь,
график, before/after, сценарий автоматизации и проверяемые состояния.

## Пересборка статики

```bash
node tools/rebrand_portfolio.js
```

## Локальный запуск

```bash
node tools/local_static_server.js
```

После запуска сайт доступен на `http://127.0.0.1:4177/`.
