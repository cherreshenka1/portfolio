const briefs = require('./project-briefs');
const fs = require('fs');
const path = require('path');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

module.exports = function domainDemo(demo, oldHtml) {
  const brief = briefs[demo.slug];
  const intro = {
    'cashflow-command-center':'Сроки, оплаты и договорённости — чтобы ни один счёт не потерялся.',
    'hiring-pipeline-lab':'Вся воронка перед глазами. Откройте карточку и запишите следующий шаг.',
    'restaurant-prep-planner':'Сколько подготовить к смене и что уже готово. Начните с числа гостей.',
    'warehouse-dispatch-board':'Соберите, упакуйте и передайте заказ перевозчику. Каждый этап виден в очереди.',
    'habit-coach-dashboard':'План, в котором есть место обычной жизни. Выберите день и отметьте сделанное.',
    'academy-progress-map':'Кому нужен ответ сегодня? Работы, комментарии и прогресс группы в одном месте.',
    'real-estate-lead-room':'Пожелания клиента рядом с подходящими объектами. От первой заявки до показа.',
    'clinic-flow-console':'Кто уже пришёл, какой кабинет свободен и когда следующий приём.',
    'event-budget-studio':'Договорённости с подрядчиками, предстоящие расходы и фактические оплаты.',
    'content-calendar-ops':'От идеи до согласованного текста. Подготовьте публикации на ближайшие дни.'
  }[demo.slug];
  const existingStyle = oldHtml.match(/<style>([\s\S]*?)<\/style>/)[1];
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(brief.title)} · ${esc(demo.title)}</title><meta name="description" content="${esc(intro)}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Onest:wght@500;700;800&display=swap" rel="stylesheet"><style>${existingStyle}</style><link rel="stylesheet" href="../assets/workspace.css"></head><body class="${demo.theme}"><a class="skip-link" href="#workspace">К рабочей области</a><nav class="topbar"><div class="container"><a href="../index.html#work">← Портфолио</a><span>${esc(demo.title)}</span><a href="../projects/${demo.slug}/">О проекте ↗</a></div></nav><main><section class="hero"><div class="container hero-grid"><article class="story-card"><div class="domain">${esc(demo.kind)}</div><h1>${esc(brief.title)}</h1><p class="lead">${esc(intro)}</p><p class="demo-label">Интерактивный прототип · изменения сохраняются в браузере</p></article><aside class="control-card" id="summary" aria-live="polite"></aside></div></section><section class="container workspace" id="workspace"><article class="panel main-panel"><div id="workspace-toolbar"></div><div id="records"></div></article><aside class="panel detail-panel"><div id="details"></div></aside></section><section class="container workspace-footer"><div class="notice">${esc(brief.limit)}</div><details><summary>Как проверить сценарий</summary><ol>${brief.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></details><div class="utility"><button type="button" id="export">Скачать CSV</button><button type="button" id="reset">Начать заново</button><span id="save-status" role="status">Готово к работе</span></div><section class="activity"><h2>Последние действия</h2><ul id="activity"></ul></section></section></main><script id="demo-config" type="application/json">${JSON.stringify({slug:demo.slug,theme:demo.theme}).replace(/</g,'\\u003c')}</script><script src="../assets/workspace.js" defer></script></body></html>`;
};
