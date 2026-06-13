const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pagesBase = "https://cherreshenka1.github.io/portfolio";
const repoBase = "https://github.com/cherreshenka1/portfolio/tree/main";

const existingProjects = [
  {
    title: "React Store Lab",
    stack: "React + Router + localStorage",
    description:
      "Мини-маркетплейс с каталогом, поиском, фильтрами, корзиной, сменой темы и анимацией добавления товара.",
    preview: "previews/react-store-lab.svg",
    live: "https://cherreshenka1.github.io/react-promo-landing/",
    code: "https://github.com/cherreshenka1/react-promo-landing",
  },
  {
    title: "Marketplace Sales Dashboard",
    stack: "React + Chart.js + localStorage",
    description:
      "Дашборд продаж с KPI, графиками, заказами, экспортом в Excel и Telegram-style уведомлениями.",
    preview: "previews/marketplace-dashboard.svg",
    live: "https://cherreshenka1.github.io/marketplace-sales-dashboard/",
    code: "https://github.com/cherreshenka1/marketplace-sales-dashboard",
  },
  {
    title: "Optimized E-Commerce Store",
    stack: "Performance + Analytics",
    description:
      "Интернет-магазин со слайдерами, доставкой, корзиной, lazy loading, Web Vitals и имитацией аналитики.",
    preview: "previews/optimized-store.svg",
    live: "https://cherreshenka1.github.io/optimized-ecommerce-store/",
    code: "https://github.com/cherreshenka1/optimized-ecommerce-store",
  },
  {
    title: "Interactive Calculator",
    stack: "Forms + Validation + Animations",
    description:
      "Несколько типов калькуляторов, live-расчёт, сохранение результатов и форма заявки с валидацией.",
    preview: "previews/interactive-calculator.svg",
    live: "https://cherreshenka1.github.io/interactive-calculator/",
    code: "https://github.com/cherreshenka1/interactive-calculator",
  },
  {
    title: "Smart Booking Calendar",
    stack: "Booking UI + Time Slots",
    description:
      "Онлайн-запись с выбором услуги, дат, свободных слотов, формой клиента и списком ближайших бронирований.",
    preview: "previews/booking-calendar.svg",
    live: "https://cherreshenka1.github.io/smart-booking-calendar/",
    code: "https://github.com/cherreshenka1/smart-booking-calendar",
  },
  {
    title: "Support Ticket Center",
    stack: "Helpdesk UI + SLA + Chat",
    description:
      "Центр обращений с тикетами, поиском, фильтрами, SLA-индикаторами, сменой статуса и чатом оператора.",
    preview: "previews/support-ticket-center.svg",
    live: "https://cherreshenka1.github.io/support-ticket-center/",
    code: "https://github.com/cherreshenka1/support-ticket-center",
  },
  {
    title: "Email Campaign Studio",
    stack: "Email templates + Segments + Preview",
    description:
      "Конструктор email-рассылок с шаблонами, A/B темой письма, сегментами аудитории, preview и прогнозом метрик кампании.",
    preview: "previews/email-campaign-studio.svg",
    live: "https://cherreshenka1.github.io/email-campaign-studio/",
    code: "https://github.com/cherreshenka1/email-campaign-studio",
  },
  {
    title: "Marketplace Ops CRM",
    stack: "React + SQL.js + SQLite/WASM",
    description:
      "Операционная CRM маркетплейса с заказами, продавцами, товарами, webhook/Telegram событиями, KPI и SQL-консолью в браузере.",
    preview: "previews/marketplace-ops-crm.svg",
    live: "https://cherreshenka1.github.io/marketplace-ops-crm/",
    code: "https://github.com/cherreshenka1/marketplace-ops-crm",
    wide: true,
  },
];

const demos = [
  {
    slug: "cashflow-command-center",
    title: "Cashflow Command Center",
    short: "Финансовый центр заявок и оплат",
    stack: "Finance UI + Invoice Automation",
    icon: "fa-solid fa-coins",
    accent: "#38bdf8",
    accent2: "#0ea5e9",
    description:
      "Визуальная автоматизация движения денег: счета, оплаты, просрочки, прогноз кассы и действия менеджера.",
    audience: "малый бизнес, студии, отдел продаж",
    actionLabel: "Собрать платёжный план",
    primaryMetric: "Деньги в пути",
    unit: "₽",
    base: 1480000,
    sliderLabel: "Новых счетов сегодня",
    sliderMin: 2,
    sliderMax: 18,
    sliderValue: 9,
    multiplier: 42000,
    kpis: ["12 счетов к оплате", "4 риска просрочки", "86% прогноз сбора", "3 авто-напоминания"],
    statuses: ["Новый", "Ожидает оплату", "Риск", "Оплачен"],
    items: [
      ["Счёт №1048", "ООО Прайм", "Ожидает оплату", 76],
      ["Счёт №1049", "Студия Лайт", "Риск", 34],
      ["Счёт №1051", "Маркет Драйв", "Новый", 18],
      ["Счёт №1054", "Поставка Про", "Оплачен", 100],
    ],
    flow: ["Импорт счетов", "Матчинг оплат", "Риск-скоринг", "Напоминания", "Прогноз кассы"],
    chart: [32, 48, 41, 63, 77, 68, 91],
  },
  {
    slug: "hiring-pipeline-lab",
    title: "Hiring Pipeline Lab",
    short: "Воронка найма с авто-сортировкой",
    stack: "HR Pipeline + Candidate Scoring",
    icon: "fa-solid fa-user-check",
    accent: "#22c55e",
    accent2: "#16a34a",
    description:
      "Наглядный конвейер подбора: кандидаты, статусы, скоринг резюме, расписание интервью и узкие места.",
    audience: "HR, рекрутеры, команды разработки",
    actionLabel: "Пересчитать приоритеты",
    primaryMetric: "Кандидатов в работе",
    unit: "",
    base: 46,
    sliderLabel: "Резюме за день",
    sliderMin: 5,
    sliderMax: 70,
    sliderValue: 28,
    multiplier: 1.2,
    kpis: ["8 интервью", "14 сильных резюме", "5 офферов", "2 риска срыва"],
    statuses: ["Новый", "Скрининг", "Интервью", "Оффер"],
    items: [
      ["Frontend Middle", "Анна К.", "Скрининг", 71],
      ["React Junior", "Илья С.", "Новый", 23],
      ["Node.js", "Мария П.", "Интервью", 82],
      ["QA Automation", "Денис Р.", "Оффер", 94],
    ],
    flow: ["Импорт резюме", "Скоринг", "Письмо кандидату", "Слоты интервью", "Оффер"],
    chart: [18, 31, 26, 52, 67, 61, 74],
  },
  {
    slug: "restaurant-prep-planner",
    title: "Restaurant Prep Planner",
    short: "План заготовок для кухни",
    stack: "Food Ops + Demand Forecast",
    icon: "fa-solid fa-kitchen-set",
    accent: "#f97316",
    accent2: "#ea580c",
    description:
      "Автоматизация кухни: прогноз спроса, заготовки, закупки, стоп-лист и сменные задачи для команды.",
    audience: "кафе, dark kitchen, рестораны",
    actionLabel: "Обновить план смены",
    primaryMetric: "Порций к подготовке",
    unit: "",
    base: 186,
    sliderLabel: "Броней на вечер",
    sliderMin: 8,
    sliderMax: 90,
    sliderValue: 42,
    multiplier: 2.6,
    kpis: ["7 позиций в стоп-листе", "91% точность прогноза", "3 закупки сегодня", "12 задач кухни"],
    statuses: ["Нужно", "Готовится", "Критично", "Готово"],
    items: [
      ["Паста соус", "Горячий цех", "Готовится", 58],
      ["Салат база", "Холодный цех", "Готово", 100],
      ["Лосось", "Склад", "Критично", 26],
      ["Десерт крем", "Кондитер", "Нужно", 12],
    ],
    flow: ["Продажи", "Прогноз", "Заготовки", "Закупки", "Стоп-лист"],
    chart: [22, 35, 49, 44, 70, 82, 88],
  },
  {
    slug: "warehouse-dispatch-board",
    title: "Warehouse Dispatch Board",
    short: "Диспетчеризация склада",
    stack: "Warehouse UI + Route Batching",
    icon: "fa-solid fa-boxes-stacked",
    accent: "#a3e635",
    accent2: "#65a30d",
    description:
      "Пульт склада: сборка заказов, маршруты курьеров, приоритеты отгрузки и контроль задержек.",
    audience: "склад, логистика, e-commerce",
    actionLabel: "Собрать рейсы",
    primaryMetric: "Заказов в очереди",
    unit: "",
    base: 138,
    sliderLabel: "Срочных заказов",
    sliderMin: 0,
    sliderMax: 60,
    sliderValue: 21,
    multiplier: 1.8,
    kpis: ["5 рейсов", "17 минут до SLA", "24 ячейки", "6 задержек"],
    statuses: ["Пикинг", "Упаковка", "Срочно", "Отгружен"],
    items: [
      ["Заказ W-881", "Зона A", "Пикинг", 42],
      ["Заказ W-913", "Зона C", "Срочно", 18],
      ["Заказ W-917", "Зона B", "Упаковка", 67],
      ["Заказ W-922", "Док 2", "Отгружен", 100],
    ],
    flow: ["Заказы", "Батчинг", "Пикинг", "Маршруты", "Отгрузка"],
    chart: [42, 45, 58, 72, 61, 83, 96],
  },
  {
    slug: "habit-coach-dashboard",
    title: "Habit Coach Dashboard",
    short: "Трекер привычек и тренировок",
    stack: "Health UI + Personal Automation",
    icon: "fa-solid fa-heart-pulse",
    accent: "#fb7185",
    accent2: "#e11d48",
    description:
      "Персональный план: привычки, тренировки, восстановление, серия дней и автоматические рекомендации.",
    audience: "фитнес-тренеры, wellness, личный кабинет",
    actionLabel: "Собрать план дня",
    primaryMetric: "Баланс дня",
    unit: "%",
    base: 64,
    sliderLabel: "Минут активности",
    sliderMin: 0,
    sliderMax: 120,
    sliderValue: 45,
    multiplier: 0.22,
    kpis: ["18 дней серия", "4 привычки", "72% сон", "2 напоминания"],
    statuses: ["План", "В процессе", "Нужно внимание", "Готово"],
    items: [
      ["Силовая", "45 минут", "В процессе", 62],
      ["Вода", "2.1 л", "Готово", 100],
      ["Сон", "6 ч 40 м", "Нужно внимание", 48],
      ["Растяжка", "12 минут", "План", 8],
    ],
    flow: ["Цель", "План", "Напоминания", "Трек", "Рекомендация"],
    chart: [51, 63, 57, 70, 68, 76, 82],
  },
  {
    slug: "academy-progress-map",
    title: "Academy Progress Map",
    short: "Карта обучения и прогресса",
    stack: "EdTech UI + Learning Analytics",
    icon: "fa-solid fa-graduation-cap",
    accent: "#60a5fa",
    accent2: "#2563eb",
    description:
      "EdTech-кабинет: модули, дедлайны, автопроверка, риск отставания и персональные следующие шаги.",
    audience: "онлайн-школы, курсы, наставники",
    actionLabel: "Выдать следующий урок",
    primaryMetric: "Прогресс потока",
    unit: "%",
    base: 58,
    sliderLabel: "Сданных заданий",
    sliderMin: 0,
    sliderMax: 40,
    sliderValue: 17,
    multiplier: 0.9,
    kpis: ["126 студентов", "19 рисков", "84 проверки", "7 дедлайнов"],
    statuses: ["Открыт", "На проверке", "Риск", "Закрыт"],
    items: [
      ["Модуль React", "Поток A", "Открыт", 41],
      ["Практика API", "Поток B", "На проверке", 66],
      ["Проект финал", "Поток C", "Риск", 24],
      ["HTML/CSS", "Поток A", "Закрыт", 100],
    ],
    flow: ["Урок", "Практика", "Проверка", "Фидбек", "Следующий шаг"],
    chart: [38, 44, 51, 55, 63, 72, 79],
  },
  {
    slug: "real-estate-lead-room",
    title: "Real Estate Lead Room",
    short: "Квалификация заявок на недвижимость",
    stack: "CRM UI + Lead Scoring",
    icon: "fa-solid fa-building",
    accent: "#14b8a6",
    accent2: "#0f766e",
    description:
      "Комната сделок: заявки, бюджет, интересы, авто-скоринг, подбор объектов и задачи менеджера.",
    audience: "риелторы, девелоперы, отдел продаж",
    actionLabel: "Подобрать объекты",
    primaryMetric: "Горячих лидов",
    unit: "",
    base: 23,
    sliderLabel: "Заявок из рекламы",
    sliderMin: 0,
    sliderMax: 80,
    sliderValue: 34,
    multiplier: 0.35,
    kpis: ["9 показов", "4 ипотеки", "18 объектов", "76% match"],
    statuses: ["Новый", "Подбор", "Горячий", "Сделка"],
    items: [
      ["Лид #481", "7.8 млн", "Горячий", 88],
      ["Лид #492", "5.4 млн", "Новый", 22],
      ["Лид #503", "12.0 млн", "Подбор", 61],
      ["Лид #519", "9.1 млн", "Сделка", 100],
    ],
    flow: ["Заявка", "Скоринг", "Подбор", "Показ", "Сделка"],
    chart: [21, 34, 37, 56, 62, 73, 81],
  },
  {
    slug: "clinic-flow-console",
    title: "Clinic Flow Console",
    short: "Поток пациентов и расписание",
    stack: "Healthcare UI + Schedule Automation",
    icon: "fa-solid fa-stethoscope",
    accent: "#2dd4bf",
    accent2: "#0d9488",
    description:
      "Консоль клиники: приём, окна врачей, ожидание, повторные визиты и автоматические напоминания.",
    audience: "медцентры, администраторы, сервис записи",
    actionLabel: "Оптимизировать расписание",
    primaryMetric: "Минут ожидания",
    unit: " мин",
    base: 37,
    sliderLabel: "Записей на сегодня",
    sliderMin: 5,
    sliderMax: 90,
    sliderValue: 41,
    multiplier: 0.32,
    kpis: ["6 врачей", "3 окна", "11 повторов", "92% явка"],
    statuses: ["Записан", "В клинике", "Ожидает", "Завершён"],
    items: [
      ["Пациент 10:20", "Терапевт", "В клинике", 52],
      ["Пациент 10:45", "ЛОР", "Ожидает", 37],
      ["Пациент 11:00", "УЗИ", "Записан", 18],
      ["Пациент 09:40", "Кардио", "Завершён", 100],
    ],
    flow: ["Запись", "Подтверждение", "Приём", "Оплата", "Повторный визит"],
    chart: [44, 39, 35, 31, 28, 24, 21],
  },
  {
    slug: "event-budget-studio",
    title: "Event Budget Studio",
    short: "Бюджет события и подрядчики",
    stack: "Event Ops + Budget Control",
    icon: "fa-solid fa-calendar-check",
    accent: "#facc15",
    accent2: "#ca8a04",
    description:
      "Планировщик мероприятий: смета, подрядчики, дедлайны, платежи и риск выхода за бюджет.",
    audience: "ивент-агентства, продюсеры, проекты",
    actionLabel: "Собрать смету",
    primaryMetric: "Бюджет освоен",
    unit: "%",
    base: 62,
    sliderLabel: "Новых гостей",
    sliderMin: 10,
    sliderMax: 400,
    sliderValue: 180,
    multiplier: 0.06,
    kpis: ["14 подрядчиков", "3 платежа", "6 дедлайнов", "8% резерв"],
    statuses: ["План", "В работе", "Риск бюджета", "Готово"],
    items: [
      ["Площадка", "Договор", "Готово", 100],
      ["Кейтеринг", "Меню", "В работе", 58],
      ["Свет", "Смета", "Риск бюджета", 31],
      ["Ведущий", "Бриф", "План", 15],
    ],
    flow: ["Бриф", "Смета", "Подрядчики", "Платежи", "День события"],
    chart: [28, 36, 45, 53, 66, 72, 81],
  },
  {
    slug: "content-calendar-ops",
    title: "Content Calendar Ops",
    short: "Контент-план и публикации",
    stack: "Marketing Ops + Publishing Queue",
    icon: "fa-solid fa-layer-group",
    accent: "#c084fc",
    accent2: "#9333ea",
    description:
      "Операционный календарь контента: идеи, редактура, публикации, каналы, дедлайны и прогноз охвата.",
    audience: "SMM, редакции, личные бренды",
    actionLabel: "Собрать недельный план",
    primaryMetric: "Постов в пайплайне",
    unit: "",
    base: 32,
    sliderLabel: "Идей за неделю",
    sliderMin: 3,
    sliderMax: 50,
    sliderValue: 18,
    multiplier: 0.8,
    kpis: ["5 каналов", "11 черновиков", "7 публикаций", "64k охват"],
    statuses: ["Идея", "Редактура", "Готовится", "Опубликовано"],
    items: [
      ["Обзор продукта", "Telegram", "Редактура", 63],
      ["Кейс клиента", "VC", "Идея", 18],
      ["Shorts", "YouTube", "Готовится", 71],
      ["Пост недели", "VK", "Опубликовано", 100],
    ],
    flow: ["Идея", "Бриф", "Редактура", "Планирование", "Публикация"],
    chart: [16, 24, 31, 45, 53, 68, 77],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function card(project) {
  const wide = project.wide ? " xl:col-span-2" : "";
  const imgHeight = project.wide ? "h-72" : "h-60";
  return `        <article class="project-card bg-zinc-900/70 border border-zinc-800 rounded-[2rem] overflow-hidden${wide}">
          <img src="${project.preview}" alt="${escapeHtml(project.title)}" class="w-full ${imgHeight} object-cover" />
          <div class="p-8">
            <h3 class="text-2xl font-bold tracking-[-0.06em] mb-3">${escapeHtml(project.title)}</h3>
            <p class="text-zinc-400 text-sm mb-4">${escapeHtml(project.stack)}</p>
            <p class="text-zinc-500 mb-6 leading-7${project.wide ? " max-w-4xl" : ""}">
              ${escapeHtml(project.description)}
            </p>
            <div class="flex flex-wrap gap-5">
              <a href="${project.live}" target="_blank" rel="noreferrer" class="text-blue-400 hover:text-white">Live →</a>
              <a href="${project.code}" target="_blank" rel="noreferrer" class="text-zinc-300 hover:text-white">GitHub →</a>
            </div>
          </div>
        </article>`;
}

function legacyDemoHtml(demo) {
  const json = JSON.stringify(demo).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(demo.description)}" />
    <title>${escapeHtml(demo.title)} | Portfolio demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
      :root { --accent: ${demo.accent}; --accent-2: ${demo.accent2}; }
      * { box-sizing: border-box; }
      body { font-family: "Inter", system-ui, sans-serif; background: #06070b; color: #f8fafc; }
      .page-bg {
        background:
          radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 30%),
          radial-gradient(circle at 92% 12%, rgba(255,255,255,.08), transparent 22%),
          linear-gradient(135deg, #06070b 0%, #0f172a 52%, #090b10 100%);
      }
      .glass { background: rgba(15, 23, 42, .72); border: 1px solid rgba(148, 163, 184, .18); box-shadow: 0 24px 70px rgba(0,0,0,.28); }
      .soft { background: rgba(2, 6, 23, .44); border: 1px solid rgba(148, 163, 184, .14); }
      .accent { color: var(--accent); }
      .accent-bg { background: var(--accent); color: #020617; }
      .accent-border { border-color: color-mix(in srgb, var(--accent) 48%, rgba(148,163,184,.2)); }
      .bar { background: linear-gradient(180deg, var(--accent), var(--accent-2)); border-radius: 999px 999px 10px 10px; min-height: 22px; transition: height .28s ease, opacity .28s ease; }
      .rail-step::after { content: ""; position: absolute; left: calc(100% + 10px); top: 24px; width: 32px; height: 1px; background: rgba(148,163,184,.3); }
      .rail-step:last-child::after { display: none; }
      input[type="range"] { accent-color: var(--accent); }
      .status-button.active { background: var(--accent); color: #020617; border-color: transparent; }
      .item-row { transition: transform .2s ease, opacity .2s ease, border-color .2s ease; }
      .item-row.hide { display: none; }
      .toast { transform: translateY(18px); opacity: 0; pointer-events: none; transition: .24s ease; }
      .toast.show { transform: translateY(0); opacity: 1; }
      @media (max-width: 760px) { .rail-step::after { display: none; } }
    </style>
  </head>
  <body class="page-bg min-h-screen">
    <nav class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <a href="../index.html#projects" class="inline-flex items-center gap-3 text-sm font-semibold text-slate-300 hover:text-white">
          <i class="fa-solid fa-arrow-left"></i>
          Портфолио
        </a>
        <span class="hidden text-sm text-slate-400 md:inline">${escapeHtml(demo.stack)}</span>
      </div>
    </nav>

    <main class="mx-auto max-w-7xl px-5 py-10 md:py-14">
      <section class="grid gap-8 lg:grid-cols-[1fr_430px] lg:items-stretch">
        <div class="glass rounded-[28px] p-7 md:p-10">
          <div class="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl accent-bg text-2xl">
            <i class="${demo.icon}"></i>
          </div>
          <h1 class="max-w-4xl text-4xl font-black leading-[.95] tracking-[-.06em] md:text-7xl">${escapeHtml(demo.title)}</h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-300">${escapeHtml(demo.description)}</p>
          <div class="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span class="rounded-full border border-white/10 px-4 py-2">${escapeHtml(demo.short)}</span>
            <span class="rounded-full border border-white/10 px-4 py-2">${escapeHtml(demo.audience)}</span>
          </div>
        </div>

        <aside class="glass flex flex-col justify-between rounded-[28px] p-7">
          <div>
            <p class="text-sm font-semibold text-slate-400">${escapeHtml(demo.primaryMetric)}</p>
            <div class="mt-3 flex items-end gap-3">
              <strong id="mainMetric" class="text-5xl font-black tracking-[-.06em]"></strong>
              <span id="mainUnit" class="pb-2 text-xl font-bold accent"></span>
            </div>
            <p id="metricHint" class="mt-4 text-sm leading-6 text-slate-400"></p>
          </div>
          <label class="mt-8 block">
            <span class="mb-3 block text-sm font-semibold text-slate-300">${escapeHtml(demo.sliderLabel)}</span>
            <input id="volume" class="w-full" type="range" min="${demo.sliderMin}" max="${demo.sliderMax}" value="${demo.sliderValue}" />
          </label>
          <button id="runButton" class="mt-7 inline-flex items-center justify-center gap-3 rounded-2xl accent-bg px-5 py-4 font-bold transition hover:brightness-110 active:translate-y-px">
            <i class="fa-solid fa-bolt"></i>
            ${escapeHtml(demo.actionLabel)}
          </button>
        </aside>
      </section>

      <section class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        ${demo.kpis
          .map(
            (kpi, index) => `<div class="soft rounded-3xl p-5">
          <p class="text-xs font-bold uppercase tracking-[.2em] text-slate-500">KPI ${index + 1}</p>
          <p class="mt-3 text-2xl font-black tracking-[-.05em]">${escapeHtml(kpi)}</p>
        </div>`
          )
          .join("\n        ")}
      </section>

      <section class="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <div class="glass rounded-[28px] p-6 md:p-7">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-2xl font-black tracking-[-.05em]">Рабочая очередь</h2>
              <p class="mt-2 text-sm text-slate-400">Фильтр меняет список и пересчитывает видимый процесс.</p>
            </div>
            <div id="filters" class="flex flex-wrap gap-2"></div>
          </div>
          <div id="items" class="mt-6 space-y-3"></div>
        </div>

        <div class="glass rounded-[28px] p-6 md:p-7">
          <h2 class="text-2xl font-black tracking-[-.05em]">Динамика недели</h2>
          <p class="mt-2 text-sm text-slate-400">График реагирует на объём входящих задач.</p>
          <div id="chart" class="mt-8 flex h-64 items-end gap-3 rounded-3xl bg-black/20 p-5"></div>
        </div>
      </section>

      <section class="mt-8 glass rounded-[28px] p-6 md:p-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-2xl font-black tracking-[-.05em]">Автоматизированный сценарий</h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Показывает, какие этапы можно собрать в реальный процесс: импорт данных, правила, уведомления и контроль результата.</p>
          </div>
          <p id="selectedStatus" class="text-sm font-semibold accent"></p>
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-5">
          ${demo.flow
            .map(
              (step, index) => `<div class="rail-step relative rounded-3xl border border-white/10 bg-white/[.03] p-5">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl accent-bg text-sm font-black">${index + 1}</span>
            <p class="mt-4 font-bold">${escapeHtml(step)}</p>
          </div>`
            )
            .join("\n          ")}
        </div>
      </section>
    </main>

    <div id="toast" class="toast fixed bottom-5 right-5 z-50 max-w-sm rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl">
      <p class="font-bold">Автоматизация запущена</p>
      <p id="toastText" class="mt-1 text-sm text-slate-400"></p>
    </div>

    <script>
      const demo = ${json};
      let selected = "Все";
      const volume = document.querySelector("#volume");
      const mainMetric = document.querySelector("#mainMetric");
      const mainUnit = document.querySelector("#mainUnit");
      const metricHint = document.querySelector("#metricHint");
      const filters = document.querySelector("#filters");
      const items = document.querySelector("#items");
      const chart = document.querySelector("#chart");
      const selectedStatus = document.querySelector("#selectedStatus");
      const toast = document.querySelector("#toast");
      const toastText = document.querySelector("#toastText");

      function formatNumber(value) {
        return Math.round(value).toLocaleString("ru-RU");
      }

      function currentValue() {
        return demo.base + Number(volume.value) * demo.multiplier;
      }

      function renderMetric() {
        mainMetric.textContent = formatNumber(currentValue());
        mainUnit.textContent = demo.unit;
        metricHint.textContent = demo.sliderLabel + ": " + volume.value + ". Автопрогноз пересчитан по текущей нагрузке.";
      }

      function renderFilters() {
        const all = ["Все", ...demo.statuses];
        filters.innerHTML = all.map((status) => {
          const active = status === selected ? " active" : "";
          return '<button class="status-button' + active + ' rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/30" data-status="' + status + '">' + status + '</button>';
        }).join("");
      }

      function renderItems() {
        const boost = Number(volume.value) / Number(demo.sliderMax);
        const visible = demo.items.filter((item) => selected === "Все" || item[2] === selected);
        items.innerHTML = visible.map((item) => {
          const progress = Math.min(100, Math.round(item[3] + boost * 12));
          return '<article class="item-row rounded-3xl border border-white/10 bg-black/20 p-4">' +
            '<div class="flex items-start justify-between gap-4">' +
              '<div><h3 class="font-bold">' + item[0] + '</h3><p class="mt-1 text-sm text-slate-400">' + item[1] + '</p></div>' +
              '<span class="rounded-full px-3 py-1 text-xs font-bold" style="background: color-mix(in srgb, var(--accent) 18%, transparent); color: var(--accent)">' + item[2] + '</span>' +
            '</div>' +
            '<div class="mt-4 h-2 rounded-full bg-white/10"><div class="h-2 rounded-full" style="width:' + progress + '%; background: linear-gradient(90deg, var(--accent), var(--accent-2));"></div></div>' +
          '</article>';
        }).join("") || '<div class="rounded-3xl border border-dashed border-white/15 p-6 text-slate-400">Нет задач в этом статусе. Переключите фильтр или запустите автоматизацию.</div>';
        selectedStatus.textContent = selected === "Все" ? "Показаны все статусы" : "Фокус: " + selected;
      }

      function renderChart() {
        const lift = Number(volume.value) / Number(demo.sliderMax) * 14;
        chart.innerHTML = demo.chart.map((value, index) => {
          const height = Math.min(100, value + lift);
          return '<div class="flex flex-1 flex-col items-center justify-end gap-3">' +
            '<div class="bar w-full" style="height:' + height + '%; opacity:' + (0.62 + index * .05) + '"></div>' +
            '<span class="text-xs font-bold text-slate-500">' + ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][index] + '</span>' +
          '</div>';
        }).join("");
      }

      function render() {
        renderMetric();
        renderFilters();
        renderItems();
        renderChart();
      }

      filters.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-status]");
        if (!button) return;
        selected = button.dataset.status;
        render();
      });

      volume.addEventListener("input", render);
      document.querySelector("#runButton").addEventListener("click", () => {
        const recommended = demo.flow[Math.min(demo.flow.length - 1, Math.floor(Number(volume.value) / Number(demo.sliderMax) * demo.flow.length))];
        toastText.textContent = "Следующий приоритет: " + recommended + ". Текущий прогноз: " + formatNumber(currentValue()) + demo.unit + ".";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2800);
      });

      render();
    </script>
  </body>
</html>
`;
}

function legacyPreviewSvg(demo) {
  const safeTitle = escapeHtml(demo.title);
  const safeShort = escapeHtml(demo.short);
  const bars = demo.chart
    .map((value, index) => {
      const h = 20 + value * 1.2;
      const x = 72 + index * 34;
      const y = 210 - h;
      return `<rect x="${x}" y="${y}" width="20" height="${h}" rx="8" fill="${demo.accent}" opacity="${0.42 + index * 0.06}"/>`;
    })
    .join("");
  const rows = demo.items
    .slice(0, 3)
    .map((item, index) => {
      const y = 82 + index * 42;
      return `<rect x="330" y="${y}" width="292" height="30" rx="12" fill="#111827" stroke="#253044"/>
<rect x="346" y="${y + 10}" width="${72 + index * 32}" height="7" rx="4" fill="${demo.accent}" opacity=".75"/>
<text x="470" y="${y + 20}" fill="#94a3b8" font-size="10">${escapeHtml(item[2])}</text>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset=".55" stop-color="#111827"/>
      <stop offset="1" stop-color="#06070b"/>
    </linearGradient>
    <radialGradient id="glow" cx=".18" cy=".08" r=".7">
      <stop offset="0" stop-color="${demo.accent}" stop-opacity=".34"/>
      <stop offset="1" stop-color="${demo.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <rect width="800" height="450" fill="url(#glow)"/>
  <rect x="42" y="42" width="716" height="366" rx="34" fill="#0f172a" opacity=".82" stroke="#263244"/>
  <text x="72" y="96" fill="#f8fafc" font-family="Inter, Arial" font-size="36" font-weight="900">${safeTitle}</text>
  <text x="72" y="126" fill="#94a3b8" font-family="Inter, Arial" font-size="15">${safeShort}</text>
  <rect x="72" y="162" width="214" height="172" rx="24" fill="#020617" stroke="#263244"/>
  ${bars}
  <text x="72" y="364" fill="${demo.accent}" font-family="Inter, Arial" font-size="20" font-weight="800">${escapeHtml(demo.primaryMetric)}</text>
  <rect x="310" y="62" width="340" height="220" rx="26" fill="#020617" opacity=".82" stroke="#263244"/>
  ${rows}
  <rect x="330" y="236" width="250" height="18" rx="9" fill="${demo.accent}" opacity=".22"/>
  <rect x="330" y="236" width="174" height="18" rx="9" fill="${demo.accent}"/>
  <rect x="310" y="302" width="340" height="62" rx="24" fill="${demo.accent}" opacity=".95"/>
  <text x="336" y="341" fill="#020617" font-family="Inter, Arial" font-size="18" font-weight="900">${escapeHtml(demo.actionLabel)}</text>
</svg>
`;
}

const visualSystems = {
  "cashflow-command-center": {
    kind: "terminal",
    font: '"IBM Plex Mono", "Inter", monospace',
    import: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap",
    bg: "#030712",
    paper: "#07111f",
    panel: "#0b1628",
    text: "#e0f2fe",
    muted: "#7dd3fc",
    border: "#164e63",
    radius: "6px",
    shadow: "0 28px 90px rgba(8,47,73,.36)",
    buttonText: "#001018",
    chrome: "FIN-OPS TERMINAL",
  },
  "hiring-pipeline-lab": {
    kind: "kanban",
    font: '"Plus Jakarta Sans", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap",
    bg: "#f5f7fb",
    paper: "#ffffff",
    panel: "#ffffff",
    text: "#101828",
    muted: "#667085",
    border: "#d9e2ec",
    radius: "22px",
    shadow: "0 24px 70px rgba(16,24,40,.10)",
    buttonText: "#042713",
    chrome: "Talent desk",
  },
  "restaurant-prep-planner": {
    kind: "tickets",
    font: '"Manrope", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap",
    bg: "#21150f",
    paper: "#fff7ed",
    panel: "#3a2417",
    text: "#fff7ed",
    muted: "#fed7aa",
    border: "#7c3f18",
    radius: "18px",
    shadow: "0 26px 70px rgba(67,20,7,.32)",
    buttonText: "#1f1308",
    chrome: "Kitchen pass",
  },
  "warehouse-dispatch-board": {
    kind: "brutalist",
    font: '"Space Grotesk", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap",
    bg: "#0b0c09",
    paper: "#d9ff3f",
    panel: "#11140e",
    text: "#f8ffe8",
    muted: "#bdc7a4",
    border: "#4d5b20",
    radius: "0px",
    shadow: "8px 8px 0 rgba(217,255,63,.28)",
    buttonText: "#090b06",
    chrome: "Dispatch wall",
  },
  "habit-coach-dashboard": {
    kind: "wellness",
    font: '"Nunito Sans", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&display=swap",
    bg: "#fff5f7",
    paper: "#ffffff",
    panel: "#ffffff",
    text: "#3f1725",
    muted: "#8a4c61",
    border: "#ffd6df",
    radius: "34px",
    shadow: "0 26px 80px rgba(190,18,60,.13)",
    buttonText: "#ffffff",
    chrome: "Daily rhythm",
  },
  "academy-progress-map": {
    kind: "roadmap",
    font: '"Inter", system-ui, sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap",
    bg: "#eff6ff",
    paper: "#ffffff",
    panel: "#f8fbff",
    text: "#0f1b3d",
    muted: "#496085",
    border: "#c7d2fe",
    radius: "16px",
    shadow: "0 28px 80px rgba(37,99,235,.13)",
    buttonText: "#ffffff",
    chrome: "Learning map",
  },
  "real-estate-lead-room": {
    kind: "maproom",
    font: '"Sora", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap",
    bg: "#061815",
    paper: "#10231f",
    panel: "#0b211d",
    text: "#e9fffb",
    muted: "#8fd8cc",
    border: "#1c4f47",
    radius: "12px",
    shadow: "0 30px 100px rgba(20,184,166,.16)",
    buttonText: "#021210",
    chrome: "Lead room",
  },
  "clinic-flow-console": {
    kind: "clinic",
    font: '"Public Sans", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap",
    bg: "#eefdfa",
    paper: "#ffffff",
    panel: "#ffffff",
    text: "#06312d",
    muted: "#4f7571",
    border: "#b8eee6",
    radius: "14px",
    shadow: "0 20px 60px rgba(13,148,136,.12)",
    buttonText: "#042f2e",
    chrome: "Care flow",
  },
  "event-budget-studio": {
    kind: "production",
    font: '"Archivo", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&display=swap",
    bg: "#090908",
    paper: "#191816",
    panel: "#141311",
    text: "#fffce8",
    muted: "#d8c77a",
    border: "#4e4320",
    radius: "10px",
    shadow: "0 26px 80px rgba(250,204,21,.10)",
    buttonText: "#1d1600",
    chrome: "Budget studio",
  },
  "content-calendar-ops": {
    kind: "editorial",
    font: '"Outfit", "Inter", sans-serif',
    import: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap",
    bg: "#fbf7ff",
    paper: "#ffffff",
    panel: "#ffffff",
    text: "#271133",
    muted: "#78558d",
    border: "#ead7ff",
    radius: "26px",
    shadow: "0 24px 80px rgba(126,34,206,.13)",
    buttonText: "#ffffff",
    chrome: "Editorial desk",
  },
};

function visual(demo) {
  return visualSystems[demo.slug] || visualSystems["cashflow-command-center"];
}

function statCards(demo) {
  return demo.kpis
    .map(
      (kpi, index) => `<article class="stat-card">
        <span>0${index + 1}</span>
        <strong>${escapeHtml(kpi)}</strong>
      </article>`
    )
    .join("");
}

function flowSteps(demo) {
  return demo.flow
    .map(
      (step, index) => `<article class="flow-step">
        <span>${index + 1}</span>
        <strong>${escapeHtml(step)}</strong>
      </article>`
    )
    .join("");
}

function heroVisual(demo, cfg) {
  if (cfg.kind === "wellness") {
    return `<div class="phone-visual">
      <div class="phone-top"></div>
      <div class="ring"><span id="visualMetric"></span></div>
      <p>${escapeHtml(demo.primaryMetric)}</p>
      <div class="mini-bars">${demo.chart.map((v) => `<i style="height:${v}%"></i>`).join("")}</div>
    </div>`;
  }
  if (cfg.kind === "maproom") {
    return `<div class="map-visual">
      <div class="map-grid"></div>
      ${demo.items.map((item, index) => `<span style="left:${18 + index * 18}%;top:${28 + (index % 2) * 26}%">${escapeHtml(item[0].split(" ")[0])}</span>`).join("")}
    </div>`;
  }
  if (cfg.kind === "clinic") {
    return `<div class="schedule-visual">
      ${["09:00", "10:00", "11:00", "12:00"].map((time, index) => `<div><span>${time}</span><strong>${escapeHtml(demo.items[index][1])}</strong></div>`).join("")}
    </div>`;
  }
  if (cfg.kind === "roadmap") {
    return `<div class="road-visual">${demo.flow.map((step, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(step)}</strong></div>`).join("")}</div>`;
  }
  return `<div class="dashboard-visual">
    <div class="visual-bars">${demo.chart.map((v) => `<i style="height:${v}%"></i>`).join("")}</div>
    <div class="visual-lines">${demo.items.slice(0, 3).map((item) => `<p><span>${escapeHtml(item[0])}</span><b>${escapeHtml(item[2])}</b></p>`).join("")}</div>
  </div>`;
}

function demoHtml(demo) {
  const cfg = visual(demo);
  const json = JSON.stringify(demo).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(demo.description)}" />
    <title>${escapeHtml(demo.title)} | Portfolio demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <style>
      @import url("${cfg.import}");
      :root {
        --accent: ${demo.accent};
        --accent-2: ${demo.accent2};
        --bg: ${cfg.bg};
        --paper: ${cfg.paper};
        --panel: ${cfg.panel};
        --text: ${cfg.text};
        --muted: ${cfg.muted};
        --border: ${cfg.border};
        --radius: ${cfg.radius};
        --shadow: ${cfg.shadow};
        --button-text: ${cfg.buttonText};
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: ${cfg.font};
        background: var(--bg);
        color: var(--text);
      }
      body::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: -1;
        background:
          radial-gradient(circle at 12% 12%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 30%),
          linear-gradient(135deg, color-mix(in srgb, var(--bg) 92%, white), var(--bg));
      }
      a { color: inherit; text-decoration: none; }
      .topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 18px;
        padding: 18px clamp(18px, 4vw, 54px);
        border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
        background: color-mix(in srgb, var(--bg) 88%, transparent);
        backdrop-filter: blur(18px);
      }
      .back-link, .chrome-label {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 800;
      }
      .page {
        width: min(1440px, calc(100% - 36px));
        margin: 0 auto;
        padding: clamp(24px, 4vw, 56px) 0 64px;
      }
      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(300px, 440px);
        gap: 24px;
        align-items: stretch;
      }
      .hero-copy, .control-panel, .panel, .stat-card, .flow-step {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
      }
      .hero-copy { padding: clamp(28px, 5vw, 60px); }
      .brand-icon {
        width: 58px;
        height: 58px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: calc(var(--radius) * .72 + 10px);
        background: var(--accent);
        color: var(--button-text);
        font-size: 24px;
        margin-bottom: 34px;
      }
      h1 {
        margin: 0;
        max-width: 860px;
        font-size: clamp(42px, 7.2vw, 104px);
        line-height: .9;
        letter-spacing: -.075em;
        font-weight: 900;
      }
      .description {
        max-width: 780px;
        margin: 24px 0 0;
        color: var(--muted);
        font-size: clamp(16px, 2vw, 20px);
        line-height: 1.7;
      }
      .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
      .chips span {
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 10px 14px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 800;
      }
      .control-panel {
        padding: 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 360px;
      }
      .metric-label, label span {
        display: block;
        color: var(--muted);
        font-size: 13px;
        font-weight: 900;
      }
      .metric-line { display: flex; align-items: end; gap: 10px; margin-top: 12px; }
      #mainMetric { font-size: clamp(44px, 5vw, 70px); line-height: .9; letter-spacing: -.07em; font-weight: 900; }
      #mainUnit { color: var(--accent); font-size: 22px; font-weight: 900; padding-bottom: 8px; }
      #metricHint { color: var(--muted); line-height: 1.6; margin-top: 18px; }
      input[type="range"] { width: 100%; accent-color: var(--accent); margin-top: 12px; }
      .run-button {
        border: 0;
        border-radius: calc(var(--radius) * .72 + 10px);
        background: var(--accent);
        color: var(--button-text);
        padding: 16px 18px;
        font: inherit;
        font-weight: 900;
        cursor: pointer;
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
        margin-top: 24px;
      }
      .stat-card { padding: 20px; }
      .stat-card span { color: var(--accent); font-weight: 900; font-size: 12px; }
      .stat-card strong { display: block; margin-top: 12px; font-size: 20px; line-height: 1.15; letter-spacing: -.04em; }
      .workspace {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(300px, .92fr);
        grid-template-areas:
          "queue chart"
          "flow flow";
        gap: 24px;
        margin-top: 24px;
      }
      .queue-panel { grid-area: queue; }
      .chart-panel { grid-area: chart; }
      .flow-panel { grid-area: flow; }
      .panel { padding: 24px; }
      .panel-head { display: flex; align-items: start; justify-content: space-between; gap: 18px; margin-bottom: 22px; }
      h2 { margin: 0; font-size: clamp(24px, 3vw, 34px); letter-spacing: -.05em; }
      .panel-head p { margin: 8px 0 0; color: var(--muted); line-height: 1.6; font-size: 14px; }
      #filters { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
      .status-button {
        border: 1px solid var(--border);
        border-radius: 999px;
        background: transparent;
        color: var(--muted);
        padding: 9px 12px;
        font: inherit;
        font-size: 12px;
        font-weight: 900;
        cursor: pointer;
      }
      .status-button.active { background: var(--accent); border-color: var(--accent); color: var(--button-text); }
      #items { display: grid; gap: 12px; }
      .item-row {
        border: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
        border-radius: calc(var(--radius) * .8 + 8px);
        background: color-mix(in srgb, var(--paper) 72%, transparent);
        padding: 16px;
      }
      .row-top { display: flex; justify-content: space-between; gap: 16px; }
      .item-row h3 { margin: 0; font-size: 17px; letter-spacing: -.02em; }
      .item-row p { margin: 5px 0 0; color: var(--muted); font-size: 13px; }
      .item-row em {
        align-self: flex-start;
        border-radius: 999px;
        background: color-mix(in srgb, var(--accent) 17%, transparent);
        color: var(--accent);
        padding: 7px 10px;
        font-style: normal;
        font-size: 11px;
        font-weight: 900;
        white-space: nowrap;
      }
      .progress { height: 8px; border-radius: 999px; background: color-mix(in srgb, var(--border) 42%, transparent); margin-top: 14px; overflow: hidden; }
      .progress b { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--accent), var(--accent-2)); }
      #chart { height: 280px; display: flex; align-items: end; gap: 12px; padding-top: 18px; }
      .chart-col { display: flex; flex: 1; flex-direction: column; justify-content: end; align-items: center; gap: 10px; height: 100%; }
      .bar { width: 100%; min-height: 20px; border-radius: calc(var(--radius) * .45 + 5px) calc(var(--radius) * .45 + 5px) 4px 4px; background: linear-gradient(180deg, var(--accent), var(--accent-2)); }
      .chart-col span { color: var(--muted); font-size: 11px; font-weight: 900; }
      .flow-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px; }
      .flow-step { padding: 18px; box-shadow: none; }
      .flow-step span { display: inline-flex; width: 34px; height: 34px; align-items: center; justify-content: center; border-radius: 999px; background: var(--accent); color: var(--button-text); font-weight: 900; }
      .flow-step strong { display: block; margin-top: 14px; line-height: 1.25; }
      .dashboard-visual, .phone-visual, .map-visual, .schedule-visual, .road-visual {
        min-height: 260px;
        margin-top: 30px;
        border: 1px solid var(--border);
        border-radius: calc(var(--radius) * .9 + 8px);
        background: color-mix(in srgb, var(--paper) 72%, transparent);
        overflow: hidden;
      }
      .dashboard-visual { display: grid; grid-template-columns: .85fr 1.15fr; gap: 18px; padding: 22px; }
      .visual-bars { display: flex; align-items: end; gap: 8px; height: 100%; }
      .visual-bars i, .mini-bars i { flex: 1; border-radius: 999px 999px 4px 4px; background: var(--accent); opacity: .78; }
      .visual-lines { display: grid; gap: 10px; align-content: center; }
      .visual-lines p { margin: 0; display: flex; justify-content: space-between; gap: 12px; border: 1px solid var(--border); border-radius: calc(var(--radius) * .65 + 6px); padding: 12px; color: var(--muted); }
      .visual-lines b { color: var(--accent); }
      .phone-visual { width: min(330px, 100%); margin-left: auto; margin-right: auto; padding: 22px; text-align: center; border-radius: 42px; }
      .phone-top { width: 82px; height: 8px; margin: 0 auto 24px; border-radius: 999px; background: var(--border); }
      .ring { width: 150px; height: 150px; display: grid; place-items: center; margin: 0 auto; border-radius: 50%; background: conic-gradient(var(--accent) 72%, color-mix(in srgb, var(--border) 55%, transparent) 0); }
      .ring span { width: 112px; height: 112px; display: grid; place-items: center; border-radius: 50%; background: var(--paper); font-size: 30px; font-weight: 900; }
      .mini-bars { height: 72px; display: flex; align-items: end; gap: 7px; margin-top: 22px; }
      .map-visual { position: relative; min-height: 300px; background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, transparent), transparent), var(--paper); }
      .map-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 38px 38px; opacity: .42; }
      .map-visual span { position: absolute; display: inline-flex; border-radius: 999px; background: var(--accent); color: var(--button-text); padding: 10px 12px; font-weight: 900; box-shadow: 0 12px 30px color-mix(in srgb, var(--accent) 28%, transparent); }
      .schedule-visual { display: grid; gap: 10px; padding: 18px; }
      .schedule-visual div { display: grid; grid-template-columns: 80px 1fr; gap: 12px; border-left: 6px solid var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); border-radius: 12px; padding: 16px; }
      .schedule-visual span { color: var(--muted); font-weight: 900; }
      .road-visual { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; padding: 18px; align-items: stretch; }
      .road-visual div { border: 1px dashed var(--border); border-radius: 18px; padding: 16px; background: color-mix(in srgb, var(--accent) 7%, transparent); }
      .road-visual span { color: var(--accent); font-weight: 900; }
      .road-visual strong { display: block; margin-top: 12px; line-height: 1.2; }
      .toast {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 50;
        max-width: 360px;
        padding: 18px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--panel);
        box-shadow: var(--shadow);
        transform: translateY(18px);
        opacity: 0;
        pointer-events: none;
        transition: .24s ease;
      }
      .toast.show { transform: translateY(0); opacity: 1; }
      .toast p { margin: 0; }
      .toast .muted { margin-top: 6px; color: var(--muted); font-size: 13px; line-height: 1.5; }

      body.terminal .page { border-left: 1px solid var(--border); border-right: 1px solid var(--border); padding-left: 20px; padding-right: 20px; }
      body.terminal h1 { text-transform: uppercase; max-width: 760px; }
      body.terminal .workspace { grid-template-columns: 1fr 1fr; }
      body.terminal .hero-copy::after { content: "auto reconciliation / risk watch / cash forecast"; display: block; margin-top: 28px; color: var(--accent); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }

      body.kanban .hero { grid-template-columns: 300px 1fr; grid-template-areas: "control copy"; }
      body.kanban .hero-copy { grid-area: copy; }
      body.kanban .control-panel { grid-area: control; }
      body.kanban .workspace { grid-template-columns: 1fr; grid-template-areas: "queue" "chart" "flow"; }
      body.kanban #items { grid-template-columns: repeat(4, minmax(190px, 1fr)); align-items: start; }
      body.kanban .item-row { min-height: 150px; }

      body.tickets::before { background: linear-gradient(90deg, rgba(255,247,237,.05) 1px, transparent 1px), linear-gradient(var(--bg), var(--bg)); background-size: 28px 28px; }
      body.tickets .hero { grid-template-columns: 1fr; }
      body.tickets .hero-copy { display: grid; grid-template-columns: 1fr minmax(280px, 430px); gap: 34px; align-items: center; }
      body.tickets .control-panel { min-height: auto; }
      body.tickets .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      body.tickets #items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      body.tickets .item-row { background: #fff7ed; color: #24130b; border-style: dashed; }
      body.tickets .item-row p { color: #8a4b24; }

      body.brutalist .hero-copy, body.brutalist .control-panel, body.brutalist .panel, body.brutalist .stat-card, body.brutalist .flow-step { border-width: 2px; text-transform: uppercase; }
      body.brutalist .hero { grid-template-columns: .9fr 1.1fr; }
      body.brutalist h1 { letter-spacing: -.045em; }
      body.brutalist .workspace { grid-template-columns: .9fr 1.1fr; }
      body.brutalist .status-button, body.brutalist .run-button { border-radius: 0; }

      body.wellness .hero { grid-template-columns: minmax(280px, 430px) 1fr; grid-template-areas: "control copy"; }
      body.wellness .hero-copy { grid-area: copy; }
      body.wellness .control-panel { grid-area: control; }
      body.wellness .workspace { grid-template-columns: .8fr 1.2fr; }
      body.wellness h1 { letter-spacing: -.06em; }

      body.roadmap .hero { grid-template-columns: 1fr; }
      body.roadmap .hero-copy { display: grid; grid-template-columns: 1fr minmax(320px, 560px); gap: 30px; }
      body.roadmap .stats { grid-template-columns: repeat(4, 1fr); }
      body.roadmap .workspace { grid-template-columns: 1fr; grid-template-areas: "flow" "queue" "chart"; }
      body.roadmap .flow-grid { grid-template-columns: repeat(5, 1fr); }

      body.maproom .hero { grid-template-columns: 1.05fr .95fr; }
      body.maproom .workspace { grid-template-columns: .95fr 1.05fr; }
      body.maproom .panel, body.maproom .hero-copy, body.maproom .control-panel { backdrop-filter: blur(16px); }

      body.clinic .hero { grid-template-columns: 1fr 390px; }
      body.clinic .workspace { grid-template-columns: 1.1fr .9fr; }
      body.clinic .item-row { border-left: 6px solid var(--accent); }
      body.clinic #chart { background: color-mix(in srgb, var(--accent) 5%, white); border-radius: 18px; padding: 16px; }

      body.production .page { width: min(1320px, calc(100% - 28px)); }
      body.production .hero { grid-template-columns: 1fr; }
      body.production .hero-copy { border-top: 8px solid var(--accent); }
      body.production .workspace { grid-template-columns: 1.2fr .8fr; }
      body.production .stat-card strong { color: var(--accent); }

      body.editorial .hero { grid-template-columns: 1fr; }
      body.editorial .hero-copy { display: grid; grid-template-columns: minmax(0, .9fr) minmax(320px, 1.1fr); gap: 34px; align-items: center; }
      body.editorial .workspace { grid-template-columns: .75fr 1.25fr; }
      body.editorial #items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      body.editorial .panel-head { border-bottom: 1px solid var(--border); padding-bottom: 18px; }

      @media (max-width: 980px) {
        .hero, body.kanban .hero, body.tickets .hero-copy, body.wellness .hero, body.roadmap .hero-copy, body.editorial .hero-copy, .workspace {
          display: block;
        }
        .control-panel, .panel, .stats, .workspace { margin-top: 18px; }
        .stats, .flow-grid, body.tickets #items, body.kanban #items, body.editorial #items, .road-visual { grid-template-columns: 1fr; }
        .panel-head { display: block; }
        #filters { justify-content: flex-start; margin-top: 14px; }
        h1 { font-size: clamp(40px, 14vw, 76px); }
      }
    </style>
  </head>
  <body class="${cfg.kind}">
    <nav class="topbar">
      <a href="../index.html#projects" class="back-link"><i class="fa-solid fa-arrow-left"></i> Портфолио</a>
      <span class="chrome-label">${escapeHtml(cfg.chrome)} · ${escapeHtml(demo.stack)}</span>
    </nav>

    <main class="page">
      <section class="hero">
        <article class="hero-copy">
          <div>
            <div class="brand-icon"><i class="${demo.icon}"></i></div>
            <h1>${escapeHtml(demo.title)}</h1>
            <p class="description">${escapeHtml(demo.description)}</p>
            <div class="chips">
              <span>${escapeHtml(demo.short)}</span>
              <span>${escapeHtml(demo.audience)}</span>
            </div>
          </div>
          ${heroVisual(demo, cfg)}
        </article>

        <aside class="control-panel">
          <div>
            <span class="metric-label">${escapeHtml(demo.primaryMetric)}</span>
            <div class="metric-line">
              <strong id="mainMetric"></strong>
              <span id="mainUnit"></span>
            </div>
            <p id="metricHint"></p>
          </div>
          <label>
            <span>${escapeHtml(demo.sliderLabel)}</span>
            <input id="volume" type="range" min="${demo.sliderMin}" max="${demo.sliderMax}" value="${demo.sliderValue}" />
          </label>
          <button id="runButton" class="run-button"><i class="fa-solid fa-bolt"></i> ${escapeHtml(demo.actionLabel)}</button>
        </aside>
      </section>

      <section class="stats">${statCards(demo)}</section>

      <section class="workspace">
        <article class="panel queue-panel">
          <div class="panel-head">
            <div>
              <h2>Рабочая очередь</h2>
              <p>Фильтр меняет список и пересчитывает видимый процесс.</p>
            </div>
            <div id="filters"></div>
          </div>
          <div id="items"></div>
        </article>

        <article class="panel chart-panel">
          <div class="panel-head">
            <div>
              <h2>Динамика недели</h2>
              <p>График реагирует на объём входящих задач.</p>
            </div>
          </div>
          <div id="chart"></div>
        </article>

        <article class="panel flow-panel">
          <div class="panel-head">
            <div>
              <h2>Автоматизированный сценарий</h2>
              <p>Импорт данных, правила, уведомления и контроль результата.</p>
            </div>
            <p id="selectedStatus"></p>
          </div>
          <div class="flow-grid">${flowSteps(demo)}</div>
        </article>
      </section>
    </main>

    <div id="toast" class="toast">
      <p><strong>Автоматизация запущена</strong></p>
      <p id="toastText" class="muted"></p>
    </div>

    <script>
      const demo = ${json};
      let selected = "Все";
      const volume = document.querySelector("#volume");
      const mainMetric = document.querySelector("#mainMetric");
      const mainUnit = document.querySelector("#mainUnit");
      const visualMetric = document.querySelector("#visualMetric");
      const metricHint = document.querySelector("#metricHint");
      const filters = document.querySelector("#filters");
      const items = document.querySelector("#items");
      const chart = document.querySelector("#chart");
      const selectedStatus = document.querySelector("#selectedStatus");
      const toast = document.querySelector("#toast");
      const toastText = document.querySelector("#toastText");

      function formatNumber(value) {
        return Math.round(value).toLocaleString("ru-RU");
      }

      function currentValue() {
        return demo.base + Number(volume.value) * demo.multiplier;
      }

      function renderMetric() {
        const value = formatNumber(currentValue());
        mainMetric.textContent = value;
        mainUnit.textContent = demo.unit;
        if (visualMetric) visualMetric.textContent = value + demo.unit;
        metricHint.textContent = demo.sliderLabel + ": " + volume.value + ". Автопрогноз пересчитан по текущей нагрузке.";
      }

      function renderFilters() {
        const all = ["Все", ...demo.statuses];
        filters.innerHTML = all.map((status) => {
          const active = status === selected ? " active" : "";
          return '<button class="status-button' + active + '" data-status="' + status + '">' + status + '</button>';
        }).join("");
      }

      function renderItems() {
        const boost = Number(volume.value) / Number(demo.sliderMax);
        const visible = demo.items.filter((item) => selected === "Все" || item[2] === selected);
        items.innerHTML = visible.map((item) => {
          const progress = Math.min(100, Math.round(item[3] + boost * 12));
          return '<article class="item-row">' +
            '<div class="row-top">' +
              '<div><h3>' + item[0] + '</h3><p>' + item[1] + '</p></div>' +
              '<em>' + item[2] + '</em>' +
            '</div>' +
            '<div class="progress"><b style="width:' + progress + '%"></b></div>' +
          '</article>';
        }).join("") || '<div class="item-row"><h3>Нет задач</h3><p>Переключите фильтр или запустите автоматизацию.</p></div>';
        selectedStatus.textContent = selected === "Все" ? "Показаны все статусы" : "Фокус: " + selected;
      }

      function renderChart() {
        const lift = Number(volume.value) / Number(demo.sliderMax) * 14;
        chart.innerHTML = demo.chart.map((value, index) => {
          const height = Math.min(100, value + lift);
          return '<div class="chart-col">' +
            '<div class="bar" style="height:' + height + '%; opacity:' + (0.62 + index * .05) + '"></div>' +
            '<span>' + ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][index] + '</span>' +
          '</div>';
        }).join("");
      }

      function render() {
        renderMetric();
        renderFilters();
        renderItems();
        renderChart();
      }

      filters.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-status]");
        if (!button) return;
        selected = button.dataset.status;
        render();
      });

      volume.addEventListener("input", render);
      document.querySelector("#runButton").addEventListener("click", () => {
        const recommended = demo.flow[Math.min(demo.flow.length - 1, Math.floor(Number(volume.value) / Number(demo.sliderMax) * demo.flow.length))];
        toastText.textContent = "Следующий приоритет: " + recommended + ". Текущий прогноз: " + formatNumber(currentValue()) + demo.unit + ".";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2800);
      });

      render();
    </script>
  </body>
</html>
`;
}

function previewSvg(demo) {
  const cfg = visual(demo);
  const title = escapeHtml(demo.title);
  const short = escapeHtml(demo.short);
  const square = cfg.kind === "brutalist" ? "0" : cfg.kind === "wellness" ? "38" : cfg.kind === "terminal" ? "8" : "24";
  const bars = demo.chart
    .map((value, index) => `<rect x="${70 + index * 28}" y="${244 - value * 1.35}" width="18" height="${value * 1.35}" rx="${cfg.kind === "brutalist" ? 0 : 8}" fill="${demo.accent}" opacity="${0.45 + index * 0.06}"/>`)
    .join("");
  const rows = demo.items
    .slice(0, 4)
    .map((item, index) => {
      const y = 116 + index * 46;
      return `<rect x="384" y="${y}" width="292" height="34" rx="${cfg.kind === "brutalist" ? 0 : 12}" fill="${cfg.paper}" stroke="${cfg.border}"/>
<rect x="400" y="${y + 12}" width="${64 + index * 34}" height="8" rx="4" fill="${demo.accent}"/>
<text x="520" y="${y + 22}" fill="${cfg.muted}" font-size="10" font-family="Arial">${escapeHtml(item[2])}</text>`;
    })
    .join("");
  const extra =
    cfg.kind === "maproom"
      ? `<path d="M70 300 C160 250 210 340 310 285 S470 260 560 325" fill="none" stroke="${demo.accent}" stroke-width="5" opacity=".75"/>`
      : cfg.kind === "clinic"
        ? `<rect x="70" y="286" width="606" height="44" rx="12" fill="${demo.accent}" opacity=".16"/><rect x="112" y="286" width="82" height="44" rx="12" fill="${demo.accent}" opacity=".7"/><rect x="254" y="286" width="118" height="44" rx="12" fill="${demo.accent}" opacity=".42"/>`
        : cfg.kind === "wellness"
          ? `<circle cx="250" cy="300" r="54" fill="none" stroke="${demo.accent}" stroke-width="18"/><circle cx="250" cy="300" r="30" fill="${cfg.paper}"/>`
          : cfg.kind === "roadmap"
            ? `<path d="M80 306 H640" stroke="${cfg.border}" stroke-width="4"/><circle cx="110" cy="306" r="18" fill="${demo.accent}"/><circle cx="250" cy="306" r="18" fill="${demo.accent}"/><circle cx="390" cy="306" r="18" fill="${demo.accent}"/><circle cx="530" cy="306" r="18" fill="${demo.accent}"/>`
            : `<rect x="70" y="286" width="260" height="58" rx="${square}" fill="${demo.accent}" opacity=".92"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <rect width="800" height="450" fill="${cfg.bg}"/>
  <circle cx="96" cy="72" r="180" fill="${demo.accent}" opacity=".18"/>
  <rect x="38" y="38" width="724" height="374" rx="${square}" fill="${cfg.panel}" stroke="${cfg.border}"/>
  <text x="70" y="92" fill="${cfg.text}" font-family="Arial" font-size="34" font-weight="900">${title}</text>
  <text x="70" y="122" fill="${cfg.muted}" font-family="Arial" font-size="15">${short}</text>
  <rect x="70" y="150" width="250" height="104" rx="${square}" fill="${cfg.paper}" stroke="${cfg.border}"/>
  ${bars}
  <rect x="362" y="84" width="336" height="218" rx="${square}" fill="${cfg.bg}" opacity=".78" stroke="${cfg.border}"/>
  ${rows}
  ${extra}
  <text x="70" y="382" fill="${demo.accent}" font-family="Arial" font-size="18" font-weight="900">${escapeHtml(cfg.chrome)}</text>
</svg>
`;
}

function updateIndex() {
  const indexPath = path.join(root, "index.html");
  const index = fs.readFileSync(indexPath, "utf8");
  const newProjects = demos.map((demo) => ({
    title: demo.title,
    stack: demo.stack,
    description: demo.description,
    preview: `previews/${demo.slug}.svg`,
    live: `${pagesBase}/${demo.slug}/`,
    code: `${repoBase}/${demo.slug}`,
  }));
  const allCards = [...existingProjects, ...newProjects].map(card).join("\n\n");
  const section = `    <section id="projects" class="max-w-7xl mx-auto px-6 py-24">
      <h2 class="text-5xl font-black tracking-[-0.07em] mb-5">Проекты</h2>
      <p class="text-zinc-400 max-w-3xl mb-12 leading-8">
        Рабочие pet-проекты, сайты и наглядные автоматизации с live demo и исходным кодом на GitHub.
      </p>

      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
${allCards}
      </div>
    </section>

`;
  const start = index.indexOf('    <section id="projects"');
  const end = index.indexOf('    <section id="skills"', start);
  if (start === -1 || end === -1) {
    throw new Error("Projects section was not replaced");
  }
  const updated = index.slice(0, start) + section + index.slice(end);
  fs.writeFileSync(indexPath, updated, "utf8");
}

for (const demo of demos) {
  const folder = path.join(root, demo.slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, "index.html"), demoHtml(demo), "utf8");
  fs.writeFileSync(path.join(root, "previews", `${demo.slug}.svg`), previewSvg(demo), "utf8");
}

updateIndex();
console.log(`Generated ${demos.length} demos and updated portfolio project list.`);
