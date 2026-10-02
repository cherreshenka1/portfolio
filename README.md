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
У каждого демо собственный сценарий: реестр счетов, канбан найма, техкарты кухни,
последовательность отгрузки, недельные отметки, проверка работ, подбор объектов,
расписание врачей, смета или редактор публикаций. Изменения сохраняются в браузере.

Всего 19 веб-приложений, включая USDT Desk. Превью `previews/*.png` — снимки работающих
интерфейсов, а не макеты. Опыт работы описан отдельно от самостоятельных проектов.

Дополнительно: коммерческий кейс Karton Pay по маркетингу и оптимизации,
шесть графических концепций в одном кейсе и два новых Blender-этюда с `.blend`.
Итого 23 страницы кейсов. [Резюме PDF](resume/artem-bychkov-resume.pdf) и
[редактируемая HTML-версия](resume/artem-bychkov-resume.html) основаны на опыте из hh.ru
и уточнениях владельца. Цифры Karton Pay — показатели продукта, без вымышленной
атрибуции индивидуального роста; источники в `data/karton-public-evidence.json`.

[Индивидуальные промпты и референсы](PROJECT_PROMPTS.md) · [Проверки](QA_REPORT.md) · [Дизайн и источники материалов](DESIGN_SOURCES.md)

## Пересборка статики

```bash
node tools/rebrand_portfolio.js
node tools/write-project-prompts.js
```

## Локальный запуск

```bash
node tools/local_static_server.js
```

После запуска сайт доступен на `http://127.0.0.1:4177/`.

Источники содержания: `tools/project-briefs.js`, `tools/project-solutions.js`.
Разметка кейсов: `tools/case-render.js`; оболочка встроенных демо: `tools/domain-demo.js`;
поведение и стили: `assets/workspace.js`, `assets/workspace.css`, `assets/product-shell.css`, `assets/domain-layouts.css`.
Новые направления: `tools/portfolio-expansion.js`; Blender: `tools/build_blender_studies.py`;
резюме: `tools/build_resume.py` (ReportLab и Arial в Windows).
Снимки открытых данных: `data/open-data.json`; источники изображений: `data/photo-sources.json`.
Скриншоты обновляются вручную в браузере после проверки загрузки данных.
