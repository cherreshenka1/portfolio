const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pagesBase = "https://cherreshenka1.github.io/portfolio";
const repoBase = "https://github.com/cherreshenka1/portfolio/tree/main";

const contact = {
  email: "bychkov.artem.24@gmail.com",
  telegram: "https://t.me/cherreshenkaw",
  telegramLabel: "@cherreshenkaw",
};

const currentYear = "2026";

const oldProjects = [
  {
    slug: "react-store-lab",
    title: "React Store Lab",
    kind: "Интернет-магазин",
    stack: "React, Router, localStorage",
    description: "Каталог, фильтры, корзина и сохранение состояния для небольшого магазина.",
    impact: "Показывает работу с состоянием, карточками товаров и привычным e-commerce flow.",
    live: "https://cherreshenka1.github.io/react-promo-landing/",
    code: "https://github.com/cherreshenka1/react-promo-landing",
    accent: "#2563eb",
    bg: "#eef4ff",
  },
  {
    slug: "marketplace-sales-dashboard",
    title: "Marketplace Sales Dashboard",
    kind: "Дашборд продаж",
    stack: "React, Chart.js, localStorage",
    description: "KPI, графики, заказы, экспорт и уведомления для продавца маркетплейса.",
    impact: "Хороший пример интерфейса, где важны данные, фильтры и быстрое чтение статусов.",
    live: "https://cherreshenka1.github.io/marketplace-sales-dashboard/",
    code: "https://github.com/cherreshenka1/marketplace-sales-dashboard",
    accent: "#0f766e",
    bg: "#eafaf6",
  },
  {
    slug: "optimized-ecommerce-store",
    title: "Optimized E-Commerce Store",
    kind: "Performance shop",
    stack: "Performance, analytics",
    description: "Магазин с корзиной, доставкой, lazy loading, Web Vitals и аналитикой.",
    impact: "Показывает, что интерфейс можно делать не только красивым, но и быстрым.",
    live: "https://cherreshenka1.github.io/optimized-ecommerce-store/",
    code: "https://github.com/cherreshenka1/optimized-ecommerce-store",
    accent: "#7c3aed",
    bg: "#f4efff",
  },
  {
    slug: "interactive-calculator",
    title: "Interactive Calculator",
    kind: "Калькуляторы",
    stack: "Forms, validation, animations",
    description: "Live-расчёт, сохранение результатов и форма заявки с валидацией.",
    impact: "Практичный формат для лендингов, услуг, квизов и коммерческих форм.",
    live: "https://cherreshenka1.github.io/interactive-calculator/",
    code: "https://github.com/cherreshenka1/interactive-calculator",
    accent: "#dc2626",
    bg: "#fff0f0",
  },
  {
    slug: "smart-booking-calendar",
    title: "Smart Booking Calendar",
    kind: "Онлайн-запись",
    stack: "Booking UI, time slots",
    description: "Выбор услуги, даты, свободного слота, клиента и ближайших записей.",
    impact: "Понятный пользовательский сценарий для сервиса записи или личного кабинета.",
    live: "https://cherreshenka1.github.io/smart-booking-calendar/",
    code: "https://github.com/cherreshenka1/smart-booking-calendar",
    accent: "#0891b2",
    bg: "#e8fbff",
  },
  {
    slug: "support-ticket-center",
    title: "Support Ticket Center",
    kind: "Helpdesk",
    stack: "SLA, filters, operator chat",
    description: "Тикеты, поиск, SLA-индикаторы, статусы и чат оператора.",
    impact: "Показывает работу с очередями, приоритетами и состояниями поддержки.",
    live: "https://cherreshenka1.github.io/support-ticket-center/",
    code: "https://github.com/cherreshenka1/support-ticket-center",
    accent: "#ea580c",
    bg: "#fff4ea",
  },
  {
    slug: "email-campaign-studio",
    title: "Email Campaign Studio",
    kind: "Маркетинг",
    stack: "Templates, segments, preview",
    description: "Шаблоны, A/B тема письма, сегменты аудитории и прогноз метрик.",
    impact: "Пример интерфейса для настройки кампаний и быстрого предпросмотра результата.",
    live: "https://cherreshenka1.github.io/email-campaign-studio/",
    code: "https://github.com/cherreshenka1/email-campaign-studio",
    accent: "#9333ea",
    bg: "#fbf0ff",
  },
  {
    slug: "marketplace-ops-crm",
    title: "Marketplace Ops CRM",
    kind: "CRM маркетплейса",
    stack: "React, SQL.js, SQLite/WASM",
    description: "Заказы, продавцы, товары, webhook-события, KPI и SQL-консоль в браузере.",
    impact: "Самый сильный проект для разговора про данные, операции и автоматизацию.",
    live: "https://cherreshenka1.github.io/marketplace-ops-crm/",
    code: "https://github.com/cherreshenka1/marketplace-ops-crm",
    accent: "#0f172a",
    bg: "#edf2f7",
    featured: true,
  },
];

const demos = [
  {
    slug: "cashflow-command-center",
    title: "Cashflow Command Center",
    kind: "Финансы",
    stack: "Invoice automation, forecast",
    description: "Пульт для счетов, оплат, просрочек и прогноза кассы.",
    story: "Менеджер видит, какие счета зависли, кому надо напомнить об оплате и сколько денег реально придёт на этой неделе.",
    accent: "#1d4ed8",
    bg: "#f3f7ff",
    ink: "#10233f",
    theme: "finance",
    primaryMetric: "Деньги в пути",
    unit: "₽",
    base: 1480000,
    sliderLabel: "Новых счетов сегодня",
    sliderMin: 2,
    sliderMax: 18,
    sliderValue: 9,
    multiplier: 42000,
    statuses: ["Новый", "Ожидает оплату", "Риск", "Оплачен"],
    items: [
      ["Счёт №1048", "ООО Прайм", "Ожидает оплату", 76],
      ["Счёт №1049", "Студия Лайт", "Риск", 34],
      ["Счёт №1051", "Маркет Драйв", "Новый", 18],
      ["Счёт №1054", "Поставка Про", "Оплачен", 100],
    ],
    flow: ["Счета", "Оплаты", "Риски", "Напоминания"],
    chart: [32, 48, 41, 63, 77, 68, 91],
    before: "Оплаты ищут вручную в почте и таблицах.",
    after: "Очередь показывает риск, сумму и следующий шаг.",
  },
  {
    slug: "hiring-pipeline-lab",
    title: "Hiring Pipeline Lab",
    kind: "HR",
    stack: "Candidate scoring, kanban",
    description: "Воронка найма с кандидатами, интервью и приоритетами.",
    story: "Рекрутер быстро понимает, кого сегодня двигать дальше, где кандидат застрял и какие интервью надо назначить.",
    accent: "#15803d",
    bg: "#f2fbf5",
    ink: "#102719",
    theme: "hiring",
    primaryMetric: "Кандидатов в работе",
    unit: "",
    base: 46,
    sliderLabel: "Резюме за день",
    sliderMin: 5,
    sliderMax: 70,
    sliderValue: 28,
    multiplier: 1.2,
    statuses: ["Новый", "Скрининг", "Интервью", "Оффер"],
    items: [
      ["Frontend Middle", "Анна К.", "Скрининг", 71],
      ["React Junior", "Илья С.", "Новый", 23],
      ["Node.js", "Мария П.", "Интервью", 82],
      ["QA Automation", "Денис Р.", "Оффер", 94],
    ],
    flow: ["Резюме", "Скоринг", "Письмо", "Интервью"],
    chart: [18, 31, 26, 52, 67, 61, 74],
    before: "Кандидаты теряются между чатами и таблицами.",
    after: "Все этапы видны в одной воронке с приоритетом.",
  },
  {
    slug: "restaurant-prep-planner",
    title: "Restaurant Prep Planner",
    kind: "Ресторан",
    stack: "Prep list, demand forecast",
    description: "План заготовок, закупок и стоп-листа для смены.",
    story: "Шеф видит, что готовить заранее, чего не хватит к вечеру и какие задачи нужно распределить по цехам.",
    accent: "#c2410c",
    bg: "#fff7ed",
    ink: "#3a2115",
    theme: "restaurant",
    primaryMetric: "Порций к подготовке",
    unit: "",
    base: 186,
    sliderLabel: "Броней на вечер",
    sliderMin: 8,
    sliderMax: 90,
    sliderValue: 42,
    multiplier: 2.6,
    statuses: ["Нужно", "Готовится", "Критично", "Готово"],
    items: [
      ["Паста соус", "Горячий цех", "Готовится", 58],
      ["Салат база", "Холодный цех", "Готово", 100],
      ["Лосось", "Склад", "Критично", 26],
      ["Десерт крем", "Кондитер", "Нужно", 12],
    ],
    flow: ["Продажи", "Прогноз", "Заготовки", "Закупки"],
    chart: [22, 35, 49, 44, 70, 82, 88],
    before: "Смена готовится по ощущениям и прошлым заметкам.",
    after: "План сам пересчитывается от брони и спроса.",
  },
  {
    slug: "warehouse-dispatch-board",
    title: "Warehouse Dispatch Board",
    kind: "Склад",
    stack: "Dispatch, route batching",
    description: "Отгрузки, сборка заказов, маршруты и задержки.",
    story: "Диспетчер видит срочные заказы, собирает их в рейсы и держит SLA под контролем.",
    accent: "#4d7c0f",
    bg: "#f7fbe8",
    ink: "#202713",
    theme: "warehouse",
    primaryMetric: "Заказов в очереди",
    unit: "",
    base: 138,
    sliderLabel: "Срочных заказов",
    sliderMin: 0,
    sliderMax: 60,
    sliderValue: 21,
    multiplier: 1.8,
    statuses: ["Пикинг", "Упаковка", "Срочно", "Отгружен"],
    items: [
      ["Заказ W-881", "Зона A", "Пикинг", 42],
      ["Заказ W-913", "Зона C", "Срочно", 18],
      ["Заказ W-917", "Зона B", "Упаковка", 67],
      ["Заказ W-922", "Док 2", "Отгружен", 100],
    ],
    flow: ["Заказы", "Батчинг", "Пикинг", "Рейс"],
    chart: [42, 45, 58, 72, 61, 83, 96],
    before: "Срочность видно только в комментариях.",
    after: "Очередь подсвечивает SLA и готовит рейсы.",
  },
  {
    slug: "habit-coach-dashboard",
    title: "Habit Coach Dashboard",
    kind: "Wellness",
    stack: "Habits, daily plan",
    description: "Личный план привычек, тренировок и восстановления.",
    story: "Пользователь открывает день и видит не графики ради графиков, а понятный план: что уже сделано и что поможет не сорваться.",
    accent: "#be123c",
    bg: "#fff4f6",
    ink: "#3f1725",
    theme: "wellness",
    primaryMetric: "Баланс дня",
    unit: "%",
    base: 64,
    sliderLabel: "Минут активности",
    sliderMin: 0,
    sliderMax: 120,
    sliderValue: 45,
    multiplier: 0.22,
    statuses: ["План", "В процессе", "Нужно внимание", "Готово"],
    items: [
      ["Силовая", "45 минут", "В процессе", 62],
      ["Вода", "2.1 л", "Готово", 100],
      ["Сон", "6 ч 40 м", "Нужно внимание", 48],
      ["Растяжка", "12 минут", "План", 8],
    ],
    flow: ["Цель", "План", "Трек", "Совет"],
    chart: [51, 63, 57, 70, 68, 76, 82],
    before: "Привычки живут в разных приложениях.",
    after: "День собирается в один спокойный план.",
  },
  {
    slug: "academy-progress-map",
    title: "Academy Progress Map",
    kind: "EdTech",
    stack: "Progress, review queue",
    description: "Карта обучения, дедлайны и риск отставания.",
    story: "Наставник видит, кому нужен фидбек, где группа замедлилась и какой следующий урок лучше открыть.",
    accent: "#2563eb",
    bg: "#eff6ff",
    ink: "#172554",
    theme: "academy",
    primaryMetric: "Прогресс потока",
    unit: "%",
    base: 58,
    sliderLabel: "Сданных заданий",
    sliderMin: 0,
    sliderMax: 40,
    sliderValue: 17,
    multiplier: 0.9,
    statuses: ["Открыт", "На проверке", "Риск", "Закрыт"],
    items: [
      ["Модуль React", "Поток A", "Открыт", 41],
      ["Практика API", "Поток B", "На проверке", 66],
      ["Проект финал", "Поток C", "Риск", 24],
      ["HTML/CSS", "Поток A", "Закрыт", 100],
    ],
    flow: ["Урок", "Практика", "Проверка", "Фидбек"],
    chart: [38, 44, 51, 55, 63, 72, 79],
    before: "Наставник узнаёт о рисках слишком поздно.",
    after: "Карта показывает, где группе нужна помощь.",
  },
  {
    slug: "real-estate-lead-room",
    title: "Real Estate Lead Room",
    kind: "Недвижимость",
    stack: "Lead scoring, property match",
    description: "Квалификация заявок и подбор объектов под клиента.",
    story: "Менеджер видит горячих лидов, бюджет, интересы и какие объекты предложить первыми.",
    accent: "#0f766e",
    bg: "#eefbf8",
    ink: "#102c28",
    theme: "estate",
    primaryMetric: "Горячих лидов",
    unit: "",
    base: 23,
    sliderLabel: "Заявок из рекламы",
    sliderMin: 0,
    sliderMax: 80,
    sliderValue: 34,
    multiplier: 0.35,
    statuses: ["Новый", "Подбор", "Горячий", "Сделка"],
    items: [
      ["Лид #481", "7.8 млн", "Горячий", 88],
      ["Лид #492", "5.4 млн", "Новый", 22],
      ["Лид #503", "12.0 млн", "Подбор", 61],
      ["Лид #519", "9.1 млн", "Сделка", 100],
    ],
    flow: ["Заявка", "Скоринг", "Подбор", "Показ"],
    chart: [21, 34, 37, 56, 62, 73, 81],
    before: "Менеджер вручную сопоставляет заявки и объекты.",
    after: "Система предлагает следующий лучший показ.",
  },
  {
    slug: "clinic-flow-console",
    title: "Clinic Flow Console",
    kind: "Клиника",
    stack: "Schedule, patient flow",
    description: "Расписание врачей, ожидание и повторные визиты.",
    story: "Администратор видит, где образуется очередь, какие окна свободны и кому нужно отправить напоминание.",
    accent: "#0d9488",
    bg: "#ecfdf9",
    ink: "#06312d",
    theme: "clinic",
    primaryMetric: "Минут ожидания",
    unit: " мин",
    base: 37,
    sliderLabel: "Записей на сегодня",
    sliderMin: 5,
    sliderMax: 90,
    sliderValue: 41,
    multiplier: 0.32,
    statuses: ["Записан", "В клинике", "Ожидает", "Завершён"],
    items: [
      ["Пациент 10:20", "Терапевт", "В клинике", 52],
      ["Пациент 10:45", "ЛОР", "Ожидает", 37],
      ["Пациент 11:00", "УЗИ", "Записан", 18],
      ["Пациент 09:40", "Кардио", "Завершён", 100],
    ],
    flow: ["Запись", "Подтверждение", "Приём", "Повтор"],
    chart: [44, 39, 35, 31, 28, 24, 21],
    before: "Окна врачей видны, но поток пациентов не управляется.",
    after: "Расписание подсказывает, где разгрузить очередь.",
  },
  {
    slug: "event-budget-studio",
    title: "Event Budget Studio",
    kind: "Ивенты",
    stack: "Budget, vendors, deadlines",
    description: "Смета, подрядчики, платежи и риск выхода за бюджет.",
    story: "Продюсер видит, какие подрядчики ждут оплаты, где перерасход и что критично закрыть до дня события.",
    accent: "#b45309",
    bg: "#fff8e7",
    ink: "#33280c",
    theme: "event",
    primaryMetric: "Бюджет освоен",
    unit: "%",
    base: 62,
    sliderLabel: "Новых гостей",
    sliderMin: 10,
    sliderMax: 400,
    sliderValue: 180,
    multiplier: 0.06,
    statuses: ["План", "В работе", "Риск бюджета", "Готово"],
    items: [
      ["Площадка", "Договор", "Готово", 100],
      ["Кейтеринг", "Меню", "В работе", 58],
      ["Свет", "Смета", "Риск бюджета", 31],
      ["Ведущий", "Бриф", "План", 15],
    ],
    flow: ["Бриф", "Смета", "Подрядчики", "Платежи"],
    chart: [28, 36, 45, 53, 66, 72, 81],
    before: "Смета и дедлайны живут отдельно.",
    after: "Бюджет, задачи и риски сходятся в один план.",
  },
  {
    slug: "content-calendar-ops",
    title: "Content Calendar Ops",
    kind: "Контент",
    stack: "Publishing queue, calendar",
    description: "Контент-план, публикации, каналы и прогноз охвата.",
    story: "Редактор видит идеи, статусы, дедлайны и понимает, чем закрыть неделю без хаоса в чатах.",
    accent: "#7e22ce",
    bg: "#fbf5ff",
    ink: "#2f1640",
    theme: "content",
    primaryMetric: "Постов в пайплайне",
    unit: "",
    base: 32,
    sliderLabel: "Идей за неделю",
    sliderMin: 3,
    sliderMax: 50,
    sliderValue: 18,
    multiplier: 0.8,
    statuses: ["Идея", "Редактура", "Готовится", "Опубликовано"],
    items: [
      ["Обзор продукта", "Telegram", "Редактура", 63],
      ["Кейс клиента", "VC", "Идея", 18],
      ["Shorts", "YouTube", "Готовится", 71],
      ["Пост недели", "VK", "Опубликовано", 100],
    ],
    flow: ["Идея", "Бриф", "Редактура", "Публикация"],
    chart: [16, 24, 31, 45, 53, 68, 77],
    before: "Контент-план распадается на заметки и чаты.",
    after: "Редакция видит очередь, канал и готовность.",
  },
];

const allProjects = [
  ...oldProjects.map((project) => ({
    ...project,
    preview: `previews/${project.slug}.svg`,
    casePath: `projects/${project.slug}/`,
    group: "project",
  })),
  ...demos.map((demo) => ({
    ...demo,
    preview: `previews/${demo.slug}.svg`,
    casePath: `projects/${demo.slug}/`,
    live: `${pagesBase}/${demo.slug}/`,
    code: `${repoBase}/${demo.slug}`,
    group: "demo",
  })),
];

const featuredSlugs = [
  "marketplace-ops-crm",
  "cashflow-command-center",
  "clinic-flow-console",
  "restaurant-prep-planner",
  "academy-progress-map",
  "warehouse-dispatch-board",
];

const projectProfiles = {
  "react-store-lab": {
    audience: "Небольшой магазин, которому нужен понятный каталог без тяжёлой админки.",
    problem: "Пользователь должен быстро найти товар, собрать корзину и не потерять выбор после обновления страницы.",
    solution: "Каталог разбит на понятные карточки, фильтры и корзину с сохранением состояния в браузере.",
    features: ["Каталог с карточками товаров", "Фильтрация и быстрый просмотр", "Корзина с пересчётом суммы", "Сохранение выбранных товаров"],
    states: ["Пустая корзина", "Добавленный товар", "Изменение количества", "Возврат к сохранённой сессии"],
  },
  "marketplace-sales-dashboard": {
    audience: "Продавец маркетплейса или менеджер, который следит за продажами каждый день.",
    problem: "KPI, заказы и просадки часто лежат в разных таблицах, поэтому риск видно слишком поздно.",
    solution: "Дашборд собирает ключевые показатели, графики, статусы заказов и быстрые действия в одном рабочем экране.",
    features: ["KPI-панель", "Графики динамики", "Фильтры заказов", "Экспорт и уведомления"],
    states: ["Рост продаж", "Падение конверсии", "Новый заказ", "Заказ требует внимания"],
  },
  "optimized-ecommerce-store": {
    audience: "Интернет-магазин, где важны скорость загрузки, удобная покупка и измеримая аналитика.",
    problem: "Медленные страницы и тяжёлые изображения снижают конверсию даже при хорошем дизайне.",
    solution: "Интерфейс выстроен вокруг быстрых карточек, lazy loading, Web Vitals и понятного checkout flow.",
    features: ["Оптимизированные изображения", "Корзина и доставка", "Lazy loading", "Аналитика пользовательского пути"],
    states: ["Первый визит", "Добавление в корзину", "Оформление доставки", "Проверка Web Vitals"],
  },
  "interactive-calculator": {
    audience: "Лендинг услуги, где посетителю нужно быстро понять цену и оставить заявку.",
    problem: "Статичный прайс не отвечает на индивидуальные вопросы и плохо доводит пользователя до контакта.",
    solution: "Калькулятор считает результат вживую, объясняет стоимость и аккуратно ведёт к форме заявки.",
    features: ["Live-расчёт", "Валидация формы", "Сохранение результата", "Мягкая анимация переходов"],
    states: ["Начальный расчёт", "Ошибка в форме", "Успешная заявка", "Возврат к сохранённому результату"],
  },
  "smart-booking-calendar": {
    audience: "Сервис записи, салон, специалист или небольшой кабинет услуг.",
    problem: "Клиенту трудно выбрать свободное время, а менеджеру приходится подтверждать всё вручную.",
    solution: "Календарь показывает услугу, дату, свободные слоты, данные клиента и ближайшие записи.",
    features: ["Выбор услуги", "Свободные слоты", "Карточка клиента", "Список ближайших записей"],
    states: ["Нет свободных слотов", "Выбранное время", "Запись создана", "Перенос записи"],
  },
  "support-ticket-center": {
    audience: "Команда поддержки, которой важно не пропустить срочные обращения.",
    problem: "Тикеты без приоритета и SLA превращаются в общую очередь, где сложно понять следующий шаг.",
    solution: "Центр поддержки показывает статусы, SLA, поиск, приоритеты и чат оператора рядом с задачей.",
    features: ["Очередь тикетов", "SLA-индикаторы", "Поиск и фильтры", "Чат оператора"],
    states: ["Просроченный SLA", "Новый тикет", "Ответ оператора", "Закрытие обращения"],
  },
  "email-campaign-studio": {
    audience: "Маркетолог, который собирает рассылку и хочет видеть прогноз до отправки.",
    problem: "Шаблоны, сегменты и метрики часто настраиваются в разных местах, из-за чего легко ошибиться.",
    solution: "Студия кампаний объединяет шаблоны, A/B тему письма, сегменты и предпросмотр результата.",
    features: ["Шаблоны писем", "A/B тема", "Сегменты аудитории", "Прогноз открытий и кликов"],
    states: ["Черновик", "Сегмент выбран", "Предпросмотр", "Готово к отправке"],
  },
  "marketplace-ops-crm": {
    audience: "Операционная команда маркетплейса, продавцы и менеджеры ассортимента.",
    problem: "Заказы, товары, продавцы и webhook-события живут отдельно, поэтому сложно быстро найти причину проблемы.",
    solution: "CRM собирает операционные данные, KPI и SQL-консоль в браузере, чтобы быстро проверять гипотезы.",
    features: ["Заказы и продавцы", "KPI и статусы", "Webhook-события", "SQL-консоль на SQLite/WASM"],
    states: ["Новый заказ", "Проблема продавца", "SQL-запрос", "Операционный отчёт"],
  },
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function projectCard(project, featured = false) {
  const sizeClass = featured ? "case-card featured-case" : "case-card";
  const casePath = project.casePath || project.live;
  return `<article class="${sizeClass}">
    <a href="${casePath}" class="case-media" aria-label="Открыть кейс ${esc(project.title)}">
      <img src="${project.preview}" alt="${esc(project.title)} preview" loading="lazy" />
    </a>
    <div class="case-body">
      <div class="case-meta">
        <span>${esc(project.kind)}</span>
        <span>${esc(project.stack)}</span>
      </div>
      <h3><a href="${casePath}">${esc(project.title)}</a></h3>
      <p>${esc(project.description)}</p>
      <p class="case-impact">${esc(project.impact || project.story || "")}</p>
      <div class="case-actions">
        <a href="${casePath}">Кейс</a>
        <a href="${project.live}" target="_blank" rel="noreferrer">Live</a>
        <a href="${project.code}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  </article>`;
}

function serviceCard(title, text, icon) {
  return `<article class="service-card">
    <i class="${icon}"></i>
    <h3>${esc(title)}</h3>
    <p>${esc(text)}</p>
  </article>`;
}

function indexHtml() {
  const featured = featuredSlugs.map((slug) => allProjects.find((project) => project.slug === slug));
  const rest = allProjects.filter((project) => !featuredSlugs.includes(project.slug));
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Портфолио Артёма Бычкова: frontend-разработка, React-интерфейсы, CRM, личные кабинеты, дашборды и автоматизация бизнес-процессов." />
    <meta property="og:title" content="Артём Бычков | Frontend-разработчик" />
    <meta property="og:description" content="Делаю понятные интерфейсы для бизнеса: кабинеты, CRM, дашборды, формы и автоматизацию рутины." />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#f7f3ea" />
    <title>Артём Бычков | Frontend-разработчик</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <style>
      :root {
        --paper: #f7f3ea;
        --paper-2: #fffaf1;
        --ink: #171717;
        --muted: #6b6258;
        --line: #ded4c4;
        --card: #fffdf7;
        --accent: #2457d6;
        --accent-2: #163a92;
        --green: #2f6d55;
        --radius: 22px;
        --shadow: 0 24px 80px rgba(57, 47, 35, .12);
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        font-family: "Manrope", system-ui, sans-serif;
        color: var(--ink);
        background:
          linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px),
          linear-gradient(var(--paper), var(--paper));
        background-size: 40px 40px;
      }
      body::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: .38;
        background-image:
          radial-gradient(circle at 20% 10%, rgba(36,87,214,.12), transparent 26%),
          radial-gradient(circle at 86% 0%, rgba(47,109,85,.11), transparent 26%);
      }
      a { color: inherit; text-decoration: none; }
      img { display: block; max-width: 100%; }
      .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
      .skip-link {
        position: absolute;
        left: 18px;
        top: -48px;
        background: var(--ink);
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        z-index: 100;
      }
      .skip-link:focus { top: 18px; }
      .nav {
        position: sticky;
        top: 0;
        z-index: 40;
        border-bottom: 1px solid rgba(23,23,23,.1);
        background: rgba(247,243,234,.86);
        backdrop-filter: blur(18px);
      }
      .nav-inner {
        min-height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
      }
      .brand {
        font-family: "Onest", system-ui, sans-serif;
        font-weight: 800;
        letter-spacing: -.04em;
        font-size: 23px;
      }
      .nav-links { display: flex; align-items: center; gap: 24px; color: var(--muted); font-weight: 700; font-size: 14px; }
      .nav-links a:hover { color: var(--ink); }
      .nav-cta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: 1px solid var(--ink);
        border-radius: 999px;
        padding: 11px 16px;
        font-weight: 800;
      }
      .hero {
        min-height: calc(100dvh - 72px);
        padding: 72px 0 48px;
        display: grid;
        align-items: center;
      }
      .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(310px, .72fr);
        gap: 52px;
        align-items: center;
      }
      .availability {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--green);
        font-weight: 800;
        margin-bottom: 26px;
      }
      .availability::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--green);
        box-shadow: 0 0 0 6px rgba(47,109,85,.12);
      }
      h1 {
        margin: 0;
        max-width: 820px;
        font-family: "Onest", system-ui, sans-serif;
        font-size: clamp(44px, 7.3vw, 96px);
        line-height: .92;
        letter-spacing: -.075em;
        text-wrap: balance;
      }
      .hero-copy {
        max-width: 690px;
        margin: 28px 0 0;
        color: var(--muted);
        font-size: clamp(17px, 2vw, 21px);
        line-height: 1.7;
      }
      .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border-radius: 999px;
        padding: 15px 20px;
        font-weight: 900;
        transition: transform .2s ease, background .2s ease, color .2s ease;
      }
      .button:active { transform: translateY(1px) scale(.99); }
      .button.primary { background: var(--ink); color: white; }
      .button.primary:hover { background: var(--accent); }
      .button.secondary { border: 1px solid var(--line); background: rgba(255,255,255,.45); color: var(--ink); }
      .button.secondary:hover { border-color: var(--ink); }
      .portrait-wrap {
        position: relative;
        border-radius: 34px;
        padding: 12px;
        background: var(--card);
        border: 1px solid var(--line);
        box-shadow: var(--shadow);
      }
      .portrait-wrap img {
        aspect-ratio: 4 / 5;
        width: 100%;
        object-fit: cover;
        border-radius: 26px;
      }
      .portrait-note {
        position: absolute;
        left: -28px;
        bottom: 28px;
        width: min(270px, 78%);
        padding: 18px;
        border-radius: 18px;
        background: #fff;
        border: 1px solid var(--line);
        box-shadow: 0 18px 40px rgba(57,47,35,.14);
        font-weight: 800;
        line-height: 1.35;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        border: 1px solid var(--line);
        border-radius: 24px;
        overflow: hidden;
        background: var(--line);
        margin-top: 54px;
      }
      .metric {
        background: rgba(255,253,247,.78);
        padding: 22px;
      }
      .metric strong {
        display: block;
        font-family: "Onest", system-ui, sans-serif;
        font-size: 34px;
        letter-spacing: -.06em;
      }
      .metric span { color: var(--muted); font-size: 13px; font-weight: 800; }
      section { padding: 92px 0; }
      .section-head {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(260px, .6fr);
        gap: 32px;
        align-items: end;
        margin-bottom: 36px;
      }
      .section-head h2 {
        margin: 0;
        font-family: "Onest", system-ui, sans-serif;
        font-size: clamp(36px, 5vw, 68px);
        line-height: .96;
        letter-spacing: -.065em;
        text-wrap: balance;
      }
      .section-head p { margin: 0; color: var(--muted); line-height: 1.7; }
      .services {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
      .service-card {
        min-height: 250px;
        padding: 24px;
        border-radius: var(--radius);
        background: var(--card);
        border: 1px solid var(--line);
        box-shadow: 0 14px 45px rgba(57,47,35,.07);
      }
      .service-card i { color: var(--accent); font-size: 26px; }
      .service-card h3 { margin: 28px 0 12px; font-size: 21px; letter-spacing: -.04em; }
      .service-card p { margin: 0; color: var(--muted); line-height: 1.62; }
      .case-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px;
      }
      .case-card {
        overflow: hidden;
        border-radius: 28px;
        background: var(--card);
        border: 1px solid var(--line);
        box-shadow: 0 18px 60px rgba(57,47,35,.08);
      }
      .case-card:hover .case-media img { transform: scale(1.025); }
      .case-media {
        display: block;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: #ebe1d1;
      }
      .case-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .35s ease;
      }
      .case-body { padding: 24px; }
      .case-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
      .case-meta span {
        padding: 7px 10px;
        border-radius: 999px;
        background: #f1eadf;
        color: var(--muted);
        font-size: 12px;
        font-weight: 900;
      }
      .case-body h3 {
        margin: 0;
        font-family: "Onest", system-ui, sans-serif;
        font-size: 28px;
        letter-spacing: -.055em;
      }
      .case-body p { color: var(--muted); line-height: 1.62; }
      .case-impact {
        color: var(--ink) !important;
        font-weight: 700;
        border-left: 3px solid var(--accent);
        padding-left: 14px;
      }
      .case-actions { display: flex; gap: 18px; margin-top: 20px; font-weight: 900; }
      .case-actions a:first-child { color: var(--accent); }
      .project-shelf {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .project-shelf .case-body h3 { font-size: 22px; }
      .process {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 22px;
        align-items: start;
      }
      .profile-card, .timeline {
        border: 1px solid var(--line);
        border-radius: 28px;
        background: var(--card);
        box-shadow: 0 18px 60px rgba(57,47,35,.07);
      }
      .profile-card { padding: 26px; position: sticky; top: 100px; }
      .profile-card h3 { margin: 0 0 12px; font-size: 25px; letter-spacing: -.04em; }
      .profile-card p { color: var(--muted); line-height: 1.65; }
      .timeline { padding: 8px; }
      .timeline-item {
        display: grid;
        grid-template-columns: 210px 1fr;
        gap: 24px;
        padding: 24px;
        border-radius: 22px;
      }
      .timeline-item + .timeline-item { border-top: 1px solid var(--line); }
      .timeline-item time { color: var(--muted); font-weight: 900; }
      .timeline-item h3 { margin: 0 0 8px; font-size: 23px; letter-spacing: -.04em; }
      .timeline-item p { margin: 0; color: var(--muted); line-height: 1.65; }
      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .skills span {
        padding: 12px 15px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255,255,255,.45);
        font-weight: 800;
        color: #4d463f;
      }
      .contact {
        padding-bottom: 36px;
      }
      .contact-card {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 24px;
        align-items: end;
        padding: clamp(28px, 5vw, 56px);
        border-radius: 34px;
        background: #171717;
        color: #fffaf1;
        box-shadow: var(--shadow);
      }
      .contact-card h2 { color: inherit; margin: 0; font-size: clamp(38px, 6vw, 78px); line-height: .95; letter-spacing: -.07em; }
      .contact-card p { max-width: 620px; color: #d8cfc0; line-height: 1.7; }
      .contact-links { display: flex; flex-wrap: wrap; gap: 12px; }
      .contact-links a { background: #fffaf1; color: #171717; }
      footer {
        padding: 28px 0 42px;
        color: var(--muted);
        font-size: 13px;
      }
      @media (max-width: 980px) {
        .hero-grid, .section-head, .process, .contact-card { grid-template-columns: 1fr; }
        .services, .metrics { grid-template-columns: repeat(2, 1fr); }
        .case-grid, .project-shelf { grid-template-columns: 1fr; }
        .portrait-note { position: static; width: auto; margin-top: 12px; }
        .profile-card { position: static; }
        .timeline-item { grid-template-columns: 1fr; gap: 10px; }
      }
      @media (max-width: 680px) {
        .container { width: min(100% - 24px, 1180px); }
        .nav-links { display: none; }
        .hero { padding-top: 42px; }
        .services, .metrics { grid-template-columns: 1fr; }
        section { padding: 64px 0; }
      }
    </style>
  </head>
  <body>
    <a class="skip-link" href="#main">К контенту</a>
    <nav class="nav">
      <div class="container nav-inner">
        <a class="brand" href="#main">Артём Бычков</a>
        <div class="nav-links">
          <a href="#work">Проекты</a>
          <a href="#services">Что закрываю</a>
          <a href="#experience">Опыт</a>
          <a href="#contact">Контакты</a>
        </div>
        <a class="nav-cta" href="${contact.telegram}" target="_blank" rel="noreferrer">Telegram <i class="fa-brands fa-telegram"></i></a>
      </div>
    </nav>

    <main id="main">
      <header class="hero">
        <div class="container hero-grid">
          <div>
            <div class="availability">Открыт к frontend-задачам и проектной работе</div>
            <h1>Делаю понятные интерфейсы для бизнеса, где важны данные, скорость и аккуратность.</h1>
            <p class="hero-copy">Я frontend-разработчик с коммерческим опытом. Собираю кабинеты, CRM, дашборды, формы, калькуляторы и автоматизацию рутинных процессов: от первого прототипа до адаптива и публикации.</p>
            <div class="hero-actions">
              <a class="button primary" href="#work">Смотреть кейсы</a>
              <a class="button secondary" href="mailto:${contact.email}">Написать на email</a>
            </div>
            <div class="metrics">
              <div class="metric"><strong>2+</strong><span>года коммерческого опыта</span></div>
              <div class="metric"><strong>18</strong><span>живых демо и проектов</span></div>
              <div class="metric"><strong>10</strong><span>сценариев автоматизации</span></div>
              <div class="metric"><strong>1</strong><span>человек, который доводит до результата</span></div>
            </div>
          </div>
          <aside class="portrait-wrap" aria-label="Фото Артёма Бычкова">
            <img src="IMG_6567.JPG" alt="Артём Бычков" />
            <div class="portrait-note">Не просто верстаю экраны. Помогаю превратить задачу бизнеса в интерфейс, которым реально можно пользоваться.</div>
          </aside>
        </div>
      </header>

      <section id="services">
        <div class="container">
          <div class="section-head">
            <h2>Что я могу закрыть для команды</h2>
            <p>Работодателю важно не только знание React, а способность брать понятную часть продукта и доводить её до рабочего состояния.</p>
          </div>
          <div class="services">
            ${serviceCard("Кабинеты и CRM", "Списки, фильтры, карточки, статусы, формы, роли и понятные рабочие очереди.", "fa-solid fa-table-columns")}
            ${serviceCard("Дашборды и данные", "KPI, графики, таблицы, экспорт, подсветка рисков и интерфейсы для принятия решений.", "fa-solid fa-chart-line")}
            ${serviceCard("Формы и заявки", "Калькуляторы, квизы, валидация, сохранение состояния и аккуратный путь до отправки.", "fa-solid fa-pen-to-square")}
            ${serviceCard("Автоматизация рутины", "Telegram/webhook-сценарии, таблицы, уведомления, парсинг и интерфейсы поверх процессов.", "fa-solid fa-bolt")}
          </div>
        </div>
      </section>

      <section id="work">
        <div class="container">
          <div class="section-head">
            <h2>Избранные кейсы</h2>
            <p>Я оставил проекты не как абстрактную сетку, а как набор сценариев: что болит у пользователя и как интерфейс помогает это решить.</p>
          </div>
          <div class="case-grid">
            ${featured.map((project) => projectCard(project, true)).join("\n")}
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <h2>Ещё проекты и прототипы</h2>
            <p>Разные домены, чтобы было видно: я могу менять визуальный язык под задачу, а не красить один шаблон.</p>
          </div>
          <div class="project-shelf">
            ${rest.map((project) => projectCard(project)).join("\n")}
          </div>
        </div>
      </section>

      <section id="experience">
        <div class="container process">
          <aside class="profile-card">
            <h3>Как я работаю</h3>
            <p>Беру задачу, уточняю сценарий пользователя, собираю понятную структуру, делаю адаптив, проверяю состояния и оставляю код так, чтобы его можно было продолжать.</p>
            <div class="skills">
              <span>React</span><span>JavaScript</span><span>HTML/CSS</span><span>REST API</span><span>SQL</span><span>Python</span><span>Figma</span><span>Git</span><span>Analytics</span><span>WordPress</span>
            </div>
          </aside>
          <div class="timeline">
            <article class="timeline-item">
              <time>Маркетплейс «Первый Селлер»</time>
              <div><h3>Автоматизация и боты</h3><p>Telegram-уведомления, webhook-интеграции, выгрузки в таблицы, парсинг конкурентов и рабочие дашборды для продавцов.</p></div>
            </article>
            <article class="timeline-item">
              <time>Digital Agency St</time>
              <div><h3>Frontend для коммерческих проектов</h3><p>Калькуляторы, формы, слайдеры, аналитика, e-commerce интерфейсы и оптимизация Core Web Vitals.</p></div>
            </article>
            <article class="timeline-item">
              <time>Prostudio</time>
              <div><h3>React, API и рефакторинг</h3><p>Промо-страницы, REST API, перенос legacy jQuery-поведения в React и поддержка UI-китов.</p></div>
            </article>
            <article class="timeline-item">
              <time>D-project</time>
              <div><h3>Адаптивная вёрстка</h3><p>Figma-to-HTML, WordPress-шаблоны, WebP, lazy loading и исправление мобильных UI-проблем.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="contact">
        <div class="container">
          <div class="contact-card">
            <div>
              <h2>Давайте обсудим задачу</h2>
              <p>Если вам нужен frontend-разработчик, который умеет делать интерфейсы для реальных процессов, напишите мне в Telegram или на почту. Я быстро пойму контекст и предложу следующий шаг.</p>
            </div>
            <div class="contact-links">
              <a class="button" href="${contact.telegram}" target="_blank" rel="noreferrer">Telegram</a>
              <a class="button" href="mailto:${contact.email}">Email</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">© ${currentYear} Артём Бычков. Frontend, интерфейсы и автоматизация процессов. ${contact.email}</div>
    </footer>
  </body>
</html>
`;
}

function previewSvg(project) {
  const title = esc(project.title);
  const kind = esc(project.kind);
  const accent = project.accent || "#2457d6";
  const bg = project.bg || "#f7f3ea";
  const ink = project.ink || "#171717";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="506" viewBox="0 0 900 506">
  <rect width="900" height="506" fill="${bg}"/>
  <rect x="36" y="34" width="828" height="438" rx="34" fill="#fffdf7" stroke="#ded4c4"/>
  <circle cx="760" cy="92" r="118" fill="${accent}" opacity=".12"/>
  <text x="72" y="92" fill="${ink}" font-family="Arial" font-size="38" font-weight="900">${title}</text>
  <text x="72" y="126" fill="#6b6258" font-family="Arial" font-size="18" font-weight="700">${kind}</text>
  <rect x="72" y="166" width="290" height="218" rx="24" fill="${bg}" stroke="#ded4c4"/>
  <rect x="398" y="166" width="394" height="58" rx="18" fill="${accent}" opacity=".14"/>
  <rect x="422" y="187" width="178" height="15" rx="8" fill="${accent}" opacity=".76"/>
  <rect x="398" y="246" width="394" height="58" rx="18" fill="#f7f3ea" stroke="#ded4c4"/>
  <rect x="422" y="267" width="248" height="15" rx="8" fill="${accent}" opacity=".52"/>
  <rect x="398" y="326" width="394" height="58" rx="18" fill="#f7f3ea" stroke="#ded4c4"/>
  <rect x="422" y="347" width="132" height="15" rx="8" fill="${accent}" opacity=".42"/>
  <path d="M102 334 C146 248 190 302 232 220 C272 142 306 210 336 178" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
  <circle cx="102" cy="334" r="11" fill="${accent}"/><circle cx="232" cy="220" r="11" fill="${accent}"/><circle cx="336" cy="178" r="11" fill="${accent}"/>
  <text x="72" y="430" fill="${accent}" font-family="Arial" font-size="22" font-weight="900">${esc(project.stack || "Portfolio case")}</text>
</svg>
`;
}

function demoVisual(demo) {
  const compactRows = demo.items
    .map(
      (item) => `<article class="work-row" data-status="${esc(item[2])}">
        <div><strong>${esc(item[0])}</strong><span>${esc(item[1])}</span></div>
        <em>${esc(item[2])}</em>
        <i><b style="width:${item[3]}%"></b></i>
      </article>`
    )
    .join("");
  const steps = demo.flow.map((step, index) => `<li><span>${index + 1}</span>${esc(step)}</li>`).join("");
  const opsCards = [
    ["Входные данные", demo.flow[0], `Система собирает события из процесса: ${demo.sliderLabel.toLowerCase()}, статусы и текущую очередь.`],
    ["Автоматическое решение", demo.flow[1], `Пересчитывает ${demo.primaryMetric.toLowerCase()} и поднимает в фокус самые важные элементы.`],
    ["Контроль менеджера", demo.flow[2], `Фильтры, прогресс и уведомление помогают понять, что делать прямо сейчас.`],
    ["Результат", demo.flow[3], demo.after],
  ]
    .map((card) => `<article><span>${esc(card[0])}</span><strong>${esc(card[1])}</strong><p>${esc(card[2])}</p></article>`)
    .join("");
  const checkRows = demo.statuses
    .map((status, index) => `<li><b>${esc(status)}</b><span>${esc(demo.items[index % demo.items.length][0])}</span></li>`)
    .join("");
  return { compactRows, steps, opsCards, checkRows };
}

function demoHtml(demo) {
  const data = JSON.stringify(demo).replace(/</g, "\\u003c");
  const { compactRows, steps, opsCards, checkRows } = demoVisual(demo);
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(demo.description)}" />
    <title>${esc(demo.title)} | Portfolio demo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Onest:wght@500;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <style>
      :root { --bg:${demo.bg}; --ink:${demo.ink}; --muted:#6b6258; --line:#ded4c4; --card:#fffdf7; --accent:${demo.accent}; --soft: color-mix(in srgb, var(--accent) 10%, white); }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin:0; font-family:"Manrope", system-ui, sans-serif; color:var(--ink); background:var(--bg); }
      body::before { content:""; position:fixed; inset:0; z-index:-1; opacity:.55; background: radial-gradient(circle at 12% 10%, color-mix(in srgb, var(--accent) 15%, transparent), transparent 26%), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px); background-size:auto, 38px 38px; }
      a { color:inherit; text-decoration:none; }
      .container { width:min(1160px, calc(100% - 36px)); margin:0 auto; }
      .topbar { position:sticky; top:0; z-index:20; background:color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter:blur(16px); border-bottom:1px solid color-mix(in srgb, var(--accent) 16%, var(--line)); }
      .topbar .container { min-height:68px; display:flex; align-items:center; justify-content:space-between; gap:18px; font-weight:800; }
      .topbar a { color:var(--muted); }
      .topbar a:hover { color:var(--ink); }
      .hero { padding:70px 0 40px; }
      .hero-grid { display:grid; grid-template-columns:minmax(0, 1fr) minmax(320px,.72fr); gap:38px; align-items:stretch; }
      .story-card, .control-card, .panel, .before-after article { background:var(--card); border:1px solid color-mix(in srgb, var(--accent) 16%, var(--line)); border-radius:30px; box-shadow:0 22px 70px rgba(57,47,35,.10); }
      .story-card { padding:clamp(28px,5vw,56px); }
      .domain { display:inline-flex; gap:10px; align-items:center; font-weight:900; color:var(--accent); margin-bottom:26px; }
      .domain::before { content:""; width:11px; height:11px; border-radius:50%; background:var(--accent); box-shadow:0 0 0 7px color-mix(in srgb, var(--accent) 13%, transparent); }
      h1 { margin:0; font-family:"Onest", system-ui, sans-serif; font-size:clamp(42px,7vw,92px); line-height:.92; letter-spacing:-.07em; text-wrap:balance; }
      .lead { max-width:760px; margin:24px 0 0; color:var(--muted); font-size:19px; line-height:1.7; }
      .story { margin-top:28px; padding:18px; border-radius:20px; background:var(--soft); color:var(--ink); font-weight:700; line-height:1.55; }
      .control-card { padding:28px; display:flex; flex-direction:column; justify-content:space-between; gap:26px; }
      .metric-label, label span { color:var(--muted); font-weight:900; font-size:13px; }
      .metric { display:flex; align-items:end; gap:8px; margin-top:10px; }
      #mainMetric { font-family:"Onest"; font-size:54px; line-height:.9; letter-spacing:-.06em; font-weight:800; }
      #mainUnit { color:var(--accent); font-weight:900; padding-bottom:7px; }
      #metricHint { color:var(--muted); line-height:1.5; }
      input[type=range] { width:100%; accent-color:var(--accent); margin-top:10px; }
      button { font:inherit; }
      .run-button { border:0; border-radius:999px; padding:15px 18px; background:var(--ink); color:white; font-weight:900; cursor:pointer; transition:.2s ease; }
      .run-button:hover { background:var(--accent); }
      .workspace { display:grid; grid-template-columns:1.08fr .92fr; gap:22px; margin-top:28px; }
      .panel { padding:24px; }
      .panel-head { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:20px; }
      h2 { margin:0; font-family:"Onest"; font-size:34px; letter-spacing:-.05em; }
      .panel-head p { margin:8px 0 0; color:var(--muted); line-height:1.55; }
      #filters { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; }
      .status-button { border:1px solid var(--line); border-radius:999px; background:white; padding:8px 11px; color:var(--muted); font-size:12px; font-weight:900; cursor:pointer; }
      .status-button.active { border-color:var(--accent); background:var(--accent); color:white; }
      #items { display:grid; gap:12px; }
      .work-row { display:grid; grid-template-columns:1fr auto; gap:10px; align-items:center; padding:15px; border:1px solid var(--line); border-radius:18px; background:color-mix(in srgb, var(--bg) 35%, white); }
      .work-row strong { display:block; }
      .work-row span { display:block; margin-top:4px; color:var(--muted); font-size:13px; }
      .work-row em { font-style:normal; color:var(--accent); font-weight:900; font-size:12px; white-space:nowrap; }
      .work-row i { grid-column:1 / -1; height:7px; border-radius:999px; background:color-mix(in srgb, var(--accent) 12%, white); overflow:hidden; }
      .work-row b { display:block; height:100%; background:var(--accent); border-radius:inherit; }
      #chart { height:260px; display:flex; align-items:end; gap:12px; margin-top:16px; }
      .chart-col { flex:1; display:flex; height:100%; flex-direction:column; justify-content:end; align-items:center; gap:9px; }
      .bar { width:100%; min-height:20px; border-radius:14px 14px 4px 4px; background:linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 72%, black)); }
      .chart-col span { color:var(--muted); font-size:12px; font-weight:900; }
      .before-after { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin-top:24px; }
      .before-after article { padding:22px; box-shadow:none; }
      .before-after h3 { margin:0 0 10px; font-size:18px; }
      .before-after p { margin:0; color:var(--muted); line-height:1.55; }
      .flow { margin:28px 0 0; padding:0; list-style:none; display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
      .flow li { padding:18px; border:1px solid var(--line); border-radius:20px; background:var(--card); font-weight:900; }
      .flow span { display:inline-flex; width:30px; height:30px; align-items:center; justify-content:center; border-radius:999px; margin-right:8px; background:var(--accent); color:white; }
      .demo-section { margin-top:28px; }
      .section-kicker { margin:0 0 10px; color:var(--accent); font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:.12em; }
      .ops-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:18px; }
      .ops-grid article, .quality-panel { border:1px solid color-mix(in srgb, var(--accent) 16%, var(--line)); border-radius:22px; background:var(--card); padding:18px; }
      .ops-grid span { color:var(--muted); font-size:12px; font-weight:900; }
      .ops-grid strong { display:block; margin-top:12px; font-size:18px; }
      .ops-grid p, .quality-panel p { margin:10px 0 0; color:var(--muted); line-height:1.55; font-size:14px; }
      .quality-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:18px; }
      .quality-panel ul { margin:16px 0 0; padding:0; list-style:none; display:grid; gap:10px; }
      .quality-panel li { display:flex; justify-content:space-between; gap:12px; padding:12px; border-radius:14px; background:color-mix(in srgb, var(--bg) 45%, white); }
      .quality-panel b { color:var(--ink); }
      .quality-panel span { color:var(--muted); text-align:right; }
      .toast { position:fixed; right:20px; bottom:20px; max-width:360px; padding:18px; border-radius:22px; background:var(--ink); color:white; box-shadow:0 22px 70px rgba(23,23,23,.22); transform:translateY(18px); opacity:0; pointer-events:none; transition:.24s ease; }
      .toast.show { transform:translateY(0); opacity:1; }
      .toast p { margin:0; }
      .toast p + p { margin-top:6px; color:rgba(255,255,255,.76); font-size:13px; line-height:1.5; }
      footer { padding:44px 0; color:var(--muted); }
      @media (max-width:900px) { .hero-grid,.workspace,.before-after,.quality-grid { grid-template-columns:1fr; } .flow,.ops-grid { grid-template-columns:repeat(2,1fr); } }
      @media (max-width:620px) { .container { width:min(100% - 24px, 1160px); } .panel-head { display:block; } #filters { justify-content:flex-start; margin-top:12px; } .flow,.ops-grid { grid-template-columns:1fr; } }
    </style>
  </head>
  <body class="${demo.theme}">
    <nav class="topbar">
      <div class="container">
        <a href="../index.html#work"><i class="fa-solid fa-arrow-left"></i> Портфолио</a>
        <span>${esc(demo.kind)} · ${esc(demo.stack)}</span>
      </div>
    </nav>
    <main>
      <section class="hero">
        <div class="container hero-grid">
          <article class="story-card">
            <div class="domain">${esc(demo.kind)}</div>
            <h1>${esc(demo.title)}</h1>
            <p class="lead">${esc(demo.description)}</p>
            <p class="story">${esc(demo.story)}</p>
          </article>
          <aside class="control-card">
            <div>
              <span class="metric-label">${esc(demo.primaryMetric)}</span>
              <div class="metric"><strong id="mainMetric"></strong><span id="mainUnit"></span></div>
              <p id="metricHint"></p>
            </div>
            <label><span>${esc(demo.sliderLabel)}</span><input id="volume" type="range" min="${demo.sliderMin}" max="${demo.sliderMax}" value="${demo.sliderValue}" /></label>
            <button id="runButton" class="run-button">Запустить сценарий</button>
          </aside>
        </div>
      </section>
      <section class="container workspace">
        <article class="panel">
          <div class="panel-head">
            <div><h2>Рабочая очередь</h2><p>Фильтр показывает, как меняется фокус менеджера в течение дня.</p></div>
            <div id="filters"></div>
          </div>
          <div id="items">${compactRows}</div>
        </article>
        <article class="panel">
          <h2>Динамика</h2>
          <p class="lead">Слайдер меняет нагрузку и пересчитывает прогноз.</p>
          <div id="chart"></div>
        </article>
      </section>
      <section class="container">
        <div class="before-after">
          <article><h3>До</h3><p>${esc(demo.before)}</p></article>
          <article><h3>После</h3><p>${esc(demo.after)}</p></article>
        </div>
        <ol class="flow">${steps}</ol>
      </section>
      <section class="container demo-section">
        <p class="section-kicker">Что автоматизирует</p>
        <h2>Мини-продукт, который закрывает весь рабочий цикл</h2>
        <div class="ops-grid">${opsCards}</div>
      </section>
      <section class="container demo-section">
        <p class="section-kicker">Проверяемые состояния</p>
        <div class="quality-grid">
          <article class="quality-panel">
            <h2>Сценарии пользователя</h2>
            <p>Интерфейс показывает не только идеальный экран, но и разные статусы очереди, пересчёт нагрузки, пустой результат фильтра и подтверждение запуска сценария.</p>
            <ul>${checkRows}</ul>
          </article>
          <article class="quality-panel">
            <h2>Почему это похоже на реальную работу</h2>
            <p>Есть понятная роль пользователя, KPI, изменяемая нагрузка, список задач, статусы, прогресс, график и обратная связь после действия. Такой прототип можно обсуждать с заказчиком и развивать в полноценный продукт.</p>
            <p>Главная идея: человек не должен искать следующий шаг в чатах и таблицах. Интерфейс сам собирает контекст и подсказывает, куда смотреть.</p>
          </article>
        </div>
      </section>
    </main>
    <div id="toast" class="toast"><p><strong>Сценарий запущен</strong></p><p id="toastText"></p></div>
    <footer><div class="container"><a href="../index.html#contact">Вернуться к контактам</a></div></footer>
    <script>
      const demo = ${data};
      let selected = "Все";
      const volume = document.querySelector("#volume");
      const mainMetric = document.querySelector("#mainMetric");
      const mainUnit = document.querySelector("#mainUnit");
      const metricHint = document.querySelector("#metricHint");
      const filters = document.querySelector("#filters");
      const items = document.querySelector("#items");
      const chart = document.querySelector("#chart");
      const toast = document.querySelector("#toast");
      const toastText = document.querySelector("#toastText");
      function formatNumber(value) { return Math.round(value).toLocaleString("ru-RU"); }
      function currentValue() { return demo.base + Number(volume.value) * demo.multiplier; }
      function renderMetric() {
        mainMetric.textContent = formatNumber(currentValue());
        mainUnit.textContent = demo.unit;
        metricHint.textContent = demo.sliderLabel + ": " + volume.value + ". Прогноз обновлён.";
      }
      function renderFilters() {
        filters.innerHTML = ["Все", ...demo.statuses].map((status) => '<button class="status-button' + (status === selected ? ' active' : '') + '" data-status="' + status + '">' + status + '</button>').join("");
      }
      function renderItems() {
        const boost = Number(volume.value) / Number(demo.sliderMax);
        const visible = demo.items.filter((item) => selected === "Все" || item[2] === selected);
        items.innerHTML = visible.map((item) => {
          const progress = Math.min(100, Math.round(item[3] + boost * 10));
          return '<article class="work-row"><div><strong>' + item[0] + '</strong><span>' + item[1] + '</span></div><em>' + item[2] + '</em><i><b style="width:' + progress + '%"></b></i></article>';
        }).join("") || '<article class="work-row"><div><strong>Нет задач</strong><span>Выберите другой статус.</span></div><em>Пусто</em><i><b style="width:0%"></b></i></article>';
      }
      function renderChart() {
        const lift = Number(volume.value) / Number(demo.sliderMax) * 12;
        chart.innerHTML = demo.chart.map((value, index) => {
          const height = Math.min(100, value + lift);
          return '<div class="chart-col"><div class="bar" style="height:' + height + '%"></div><span>' + ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][index] + '</span></div>';
        }).join("");
      }
      function render() { renderMetric(); renderFilters(); renderItems(); renderChart(); }
      filters.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-status]");
        if (!button) return;
        selected = button.dataset.status;
        render();
      });
      volume.addEventListener("input", render);
      document.querySelector("#runButton").addEventListener("click", () => {
        const step = demo.flow[Math.min(demo.flow.length - 1, Math.floor(Number(volume.value) / Number(demo.sliderMax) * demo.flow.length))];
        toastText.textContent = "Следующий шаг: " + step + ". Текущий прогноз: " + formatNumber(currentValue()) + demo.unit + ".";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2800);
      });
      render();
    </script>
  </body>
</html>
`;
}

function caseProfile(project) {
  if (project.group === "demo") {
    return {
      audience: `Команда или специалист в домене «${project.kind}», которому нужен быстрый рабочий экран вместо ручного контроля.`,
      problem: project.before,
      solution: project.after,
      features: [
        `Изменяемый показатель: ${project.sliderLabel}`,
        `KPI: ${project.primaryMetric}`,
        `Статусы: ${project.statuses.join(", ")}`,
        `Сценарий: ${project.flow.join(" → ")}`,
      ],
      states: [
        "Фильтрация очереди по статусу",
        "Пересчёт KPI от нагрузки",
        "Пустой результат фильтра",
        "Toast-подтверждение запуска сценария",
      ],
    };
  }
  return projectProfiles[project.slug] || {
    audience: "Команда, которой нужен понятный интерфейс для конкретного рабочего сценария.",
    problem: project.description,
    solution: project.impact,
    features: ["Понятная структура экрана", "Работа с состояниями", "Адаптивная верстка", "Живая ссылка и исходный код"],
    states: ["Первый экран", "Основной сценарий", "Изменение данных", "Проверка на мобильном"],
  };
}

function listMarkup(items) {
  return items.map((item) => `<li>${esc(item)}</li>`).join("");
}

function caseHtml(project) {
  const profile = caseProfile(project);
  const preview = `../../${project.preview}`;
  const liveText = project.group === "demo" ? "Открыть интерактив" : "Открыть Live";
  const demoNote =
    project.group === "demo"
      ? `<a class="button primary" href="../../${project.slug}/">Интерактивный прототип</a>`
      : "";
  const flow =
    project.group === "demo"
      ? project.flow
      : ["Контекст", "Структура", "Интерфейс", "Публикация"];
  const flowMarkup = flow
    .map((step, index) => `<article><span>0${index + 1}</span><strong>${esc(step)}</strong><p>${esc(index === 0 ? "Понимаю, что пользователь пытается сделать." : index === 1 ? "Разбиваю процесс на понятные зоны и состояния." : index === 2 ? "Собираю экран, который можно проверить руками." : "Оставляю рабочую ссылку, код и понятное продолжение.")}</p></article>`)
    .join("");
  const rows =
    project.group === "demo"
      ? project.items
          .map((item) => `<tr><td>${esc(item[0])}</td><td>${esc(item[1])}</td><td>${esc(item[2])}</td><td>${item[3]}%</td></tr>`)
          .join("")
      : profile.states.map((state, index) => `<tr><td>${index + 1}</td><td>${esc(state)}</td><td>Проверяемый UI-state</td><td>Готово</td></tr>`).join("");
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(project.title)}: кейс портфолио Артёма Бычкова." />
    <title>${esc(project.title)} | Кейс Артёма Бычкова</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Onest:wght@500;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <style>
      :root { --paper:${project.bg || "#f7f3ea"}; --ink:${project.ink || "#171717"}; --muted:#6b6258; --line:#ded4c4; --card:#fffdf7; --accent:${project.accent || "#2457d6"}; }
      * { box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body { margin:0; font-family:"Manrope",system-ui,sans-serif; color:var(--ink); background:linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px), var(--paper); background-size:40px 40px; }
      body::before { content:""; position:fixed; inset:0; z-index:-1; pointer-events:none; opacity:.45; background:radial-gradient(circle at 14% 10%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 25%), radial-gradient(circle at 90% 4%, rgba(47,109,85,.10), transparent 24%); }
      a { color:inherit; text-decoration:none; }
      img { max-width:100%; display:block; }
      .container { width:min(1160px, calc(100% - 36px)); margin:0 auto; }
      .nav { position:sticky; top:0; z-index:20; border-bottom:1px solid rgba(23,23,23,.1); background:color-mix(in srgb, var(--paper) 88%, transparent); backdrop-filter:blur(18px); }
      .nav .container { min-height:68px; display:flex; align-items:center; justify-content:space-between; gap:18px; font-weight:900; }
      .nav a { color:var(--muted); }
      .nav a:hover { color:var(--ink); }
      .hero { padding:70px 0 48px; }
      .hero-grid { display:grid; grid-template-columns:minmax(0, .95fr) minmax(330px, .82fr); gap:34px; align-items:stretch; }
      .hero-copy, .media-card, .panel, .flow article, .state-table { border:1px solid color-mix(in srgb, var(--accent) 14%, var(--line)); background:var(--card); border-radius:30px; box-shadow:0 22px 70px rgba(57,47,35,.10); }
      .hero-copy { padding:clamp(28px,5vw,56px); }
      .kicker { display:inline-flex; align-items:center; gap:10px; color:var(--accent); font-weight:900; margin-bottom:24px; }
      .kicker::before { content:""; width:10px; height:10px; border-radius:50%; background:var(--accent); box-shadow:0 0 0 7px color-mix(in srgb, var(--accent) 12%, transparent); }
      h1 { margin:0; font-family:"Onest",system-ui,sans-serif; font-size:clamp(44px,7vw,92px); line-height:.92; letter-spacing:-.07em; text-wrap:balance; }
      h2 { margin:0; font-family:"Onest",system-ui,sans-serif; font-size:clamp(32px,4vw,54px); line-height:1; letter-spacing:-.055em; text-wrap:balance; }
      h3 { margin:0; font-size:20px; letter-spacing:-.035em; }
      p { color:var(--muted); line-height:1.68; }
      .lead { font-size:19px; margin:22px 0 0; }
      .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:30px; }
      .button { display:inline-flex; align-items:center; justify-content:center; gap:10px; border-radius:999px; padding:14px 18px; font-weight:900; border:1px solid var(--line); background:rgba(255,255,255,.54); }
      .button.primary { border-color:var(--ink); background:var(--ink); color:white; }
      .button:hover { border-color:var(--accent); color:var(--accent); }
      .button.primary:hover { background:var(--accent); color:white; }
      .media-card { overflow:hidden; }
      .media-card img { width:100%; aspect-ratio:16 / 9; object-fit:cover; background:var(--paper); }
      .meta-strip { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--line); border-top:1px solid var(--line); }
      .meta-strip div { background:var(--card); padding:18px; }
      .meta-strip span { display:block; color:var(--muted); font-size:12px; font-weight:900; }
      .meta-strip strong { display:block; margin-top:6px; font-size:18px; }
      section { padding:38px 0; }
      .section-head { display:grid; grid-template-columns:minmax(0,.82fr) minmax(260px,.58fr); gap:28px; align-items:end; margin-bottom:22px; }
      .panels { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
      .panel { padding:24px; box-shadow:0 14px 45px rgba(57,47,35,.07); }
      .panel span { color:var(--accent); font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:.1em; }
      .panel ul { margin:18px 0 0; padding:0; list-style:none; display:grid; gap:10px; }
      .panel li { padding:12px 0; border-top:1px solid var(--line); color:#3d3730; font-weight:700; }
      .flow { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
      .flow article { padding:20px; box-shadow:none; }
      .flow span { color:var(--accent); font-weight:900; }
      .flow strong { display:block; margin-top:14px; font-size:19px; }
      .state-table { overflow:hidden; box-shadow:none; }
      table { width:100%; border-collapse:collapse; background:var(--card); }
      th, td { padding:16px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; }
      th { color:var(--muted); font-size:12px; text-transform:uppercase; letter-spacing:.1em; }
      td { font-weight:700; }
      .footer-cta { margin:40px 0 56px; padding:clamp(28px,5vw,52px); border-radius:34px; background:#171717; color:#fffaf1; display:grid; grid-template-columns:1fr auto; gap:22px; align-items:end; }
      .footer-cta p { color:#d8cfc0; max-width:660px; }
      .footer-cta .button { background:#fffaf1; color:#171717; }
      footer { padding:0 0 36px; color:var(--muted); font-size:13px; }
      @media (max-width:920px) { .hero-grid,.section-head,.panels,.flow,.footer-cta { grid-template-columns:1fr; } .media-card { order:-1; } }
      @media (max-width:620px) { .container { width:min(100% - 24px, 1160px); } .nav .container { align-items:flex-start; flex-direction:column; padding:14px 0; } .meta-strip { grid-template-columns:1fr; } th,td { padding:12px; } }
    </style>
  </head>
  <body>
    <nav class="nav">
      <div class="container">
        <a href="../../index.html#work"><i class="fa-solid fa-arrow-left"></i> Все проекты</a>
        <span>${esc(project.kind)} · ${esc(project.stack)}</span>
      </div>
    </nav>
    <main>
      <header class="hero">
        <div class="container hero-grid">
          <article class="hero-copy">
            <div class="kicker">${project.group === "demo" ? "Интерактивная автоматизация" : "Проект портфолио"}</div>
            <h1>${esc(project.title)}</h1>
            <p class="lead">${esc(project.description)}</p>
            <p>${esc(project.impact || project.story || profile.solution)}</p>
            <div class="actions">
              ${demoNote}
              <a class="button primary" href="${project.live}" target="_blank" rel="noreferrer">${liveText}</a>
              <a class="button" href="${project.code}" target="_blank" rel="noreferrer">GitHub</a>
              <a class="button" href="../../index.html#contact">Связаться</a>
            </div>
          </article>
          <aside class="media-card">
            <img src="${preview}" alt="${esc(project.title)} preview" />
            <div class="meta-strip">
              <div><span>Роль</span><strong>Frontend + UX логика</strong></div>
              <div><span>Формат</span><strong>${project.group === "demo" ? "Статический интерактив" : "Live-проект"}</strong></div>
              <div><span>Домен</span><strong>${esc(project.kind)}</strong></div>
              <div><span>Стек</span><strong>${esc(project.stack)}</strong></div>
            </div>
          </aside>
        </div>
      </header>
      <section>
        <div class="container">
          <div class="section-head">
            <h2>Зачем нужен этот проект</h2>
            <p>${esc(profile.audience)}</p>
          </div>
          <div class="panels">
            <article class="panel"><span>Проблема</span><p>${esc(profile.problem)}</p></article>
            <article class="panel"><span>Решение</span><p>${esc(profile.solution)}</p></article>
            <article class="panel"><span>Что демонстрирует</span><p>Умение разложить пользовательский процесс на интерфейс, состояния, данные и понятный следующий шаг.</p></article>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="section-head">
            <h2>Что внутри</h2>
            <p>Каждый кейс описывает не только внешний вид, но и рабочие состояния, которые можно проверить руками.</p>
          </div>
          <div class="panels">
            <article class="panel"><span>Функции</span><ul>${listMarkup(profile.features)}</ul></article>
            <article class="panel"><span>Состояния</span><ul>${listMarkup(profile.states)}</ul></article>
            <article class="panel"><span>Качество</span><ul>${listMarkup(["Адаптивная структура", "Понятные CTA", "Живая публикация", "Исходный код рядом с демо"])}</ul></article>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="section-head">
            <h2>Пользовательский сценарий</h2>
            <p>Кейс читается как маленький продукт: от контекста до результата, а не как одиночный скриншот.</p>
          </div>
          <div class="flow">${flowMarkup}</div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="section-head">
            <h2>Данные и состояния</h2>
            <p>Таблица фиксирует, какие элементы интерфейса стоит проверять при просмотре проекта.</p>
          </div>
          <div class="state-table">
            <table>
              <thead><tr><th>Элемент</th><th>Контекст</th><th>Статус</th><th>Прогресс</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </section>
      <div class="container">
        <section class="footer-cta">
          <div>
            <h2>Этот кейс можно развивать дальше</h2>
            <p>Если задача похожа на ваш процесс, я могу собрать прототип, довести интерфейс до адаптива и подключить реальные данные или API.</p>
          </div>
          <a class="button" href="../../index.html#contact">Обсудить задачу</a>
        </section>
      </div>
    </main>
    <footer><div class="container">© ${currentYear} Артём Бычков · ${contact.email}</div></footer>
  </body>
</html>
`;
}

function notFoundHtml() {
  return `<!doctype html><html lang="ru"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Страница не найдена | Артём Бычков</title><style>body{margin:0;font-family:system-ui,sans-serif;background:#f7f3ea;color:#171717;display:grid;min-height:100dvh;place-items:center}.box{width:min(680px,calc(100% - 40px));padding:40px;border:1px solid #ded4c4;border-radius:28px;background:#fffdf7}h1{font-size:64px;line-height:.95;letter-spacing:-.06em;margin:0 0 18px}p{color:#6b6258;line-height:1.6}a{display:inline-flex;margin-top:20px;color:white;background:#171717;border-radius:999px;padding:14px 18px;text-decoration:none;font-weight:800}</style></head><body><main class="box"><h1>Такой страницы нет</h1><p>Возможно, ссылка устарела или GitHub Pages ещё обновляет публикацию. Вернитесь в портфолио и выберите проект из списка.</p><a href="/portfolio/">В портфолио</a></main></body></html>`;
}

function run() {
  write(path.join(root, "index.html"), indexHtml());
  write(path.join(root, "404.html"), notFoundHtml());
  for (const project of allProjects) {
    write(path.join(root, "previews", `${project.slug}.svg`), previewSvg(project));
    write(path.join(root, "projects", project.slug, "index.html"), caseHtml(project));
  }
  for (const demo of demos) {
    write(path.join(root, demo.slug, "index.html"), demoHtml(demo));
  }
  console.log(`Rebranded portfolio with ${allProjects.length} projects, ${allProjects.length} case pages and ${demos.length} demos.`);
}

run();
