"""Two-page, searchable resume with a matching editable HTML source."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from html import escape

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'resume'; OUT.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial',normal='Arial',bold='ArialBold',italic='Arial',boldItalic='ArialBold')
W,H=595.28,841.89
c=canvas.Canvas(str(OUT/'artem-bychkov-resume.pdf'),pagesize=(W,H))
c.setTitle('Артём Бычков | Frontend-разработчик'); c.setAuthor('Артём Бычков')
style=ParagraphStyle('body',fontName='Arial',fontSize=10.2,leading=14.2,textColor=HexColor('#303a42'))
small=ParagraphStyle('small',parent=style,fontSize=8.8,leading=12,textColor=HexColor('#68727b'))
left=44; width=W-88; y=H-44; html=[]

def p(text,st=style,gap=7):
    global y
    a=Paragraph(text,st); _,h=a.wrap(width,1000)
    if y-h<43:raise ValueError('Resume content overflows page')
    a.drawOn(c,left,y-h);y-=h+gap
    html.append('<p>'+text+'</p>')
def title(text,size=15,gap=12):
    global y
    c.setFillColor(HexColor('#152730'));c.setFont('ArialBold',size);c.drawString(left,y-size,text);y-=size+gap
    html.append('<h2>'+escape(text)+'</h2>')
def job(company,role,dates,bullets):
    p('<b>'+company+' · '+role+'</b>',gap=3);p(dates,small,gap=7)
    for b in bullets:p('• '+b,gap=4)
    global y
    y-=8
def footer(n):
    c.setStrokeColor(HexColor('#d8dee2'));c.line(left,35,W-left,35)
    c.setFont('Arial',8);c.setFillColor(HexColor('#68727b'));c.drawString(left,22,'Артём Бычков · Frontend / цифровые продукты');c.drawRightString(W-left,22,str(n)+' / 2')

title('Артём Бычков',27,7)
p('<b>Frontend-разработчик</b> · интерфейсы, дизайн и рост продукта',gap=11)
p('<link href="mailto:bychkov.artem.24@gmail.com" color="#234f72">bychkov.artem.24@gmail.com</link> · <link href="https://t.me/cherreshenkaw" color="#234f72">@cherreshenkaw</link>',small,4)
p('<link href="https://cherreshenka1.github.io/portfolio/" color="#234f72">Портфолио и работающие проекты</link> · <link href="https://github.com/cherreshenka1" color="#234f72">GitHub</link> · Удалённая работа',small,16)
p('Разрабатываю интерфейсы на React и JavaScript: кабинеты, CRM, дашборды, магазины и формы. Соединяю разработку с дизайном, аналитикой и маркетингом: продумываю путь пользователя, подключаю события, работаю над скоростью страниц и конверсией. Есть опыт автоматизации процессов и Telegram-ботов.',gap=17)
title('Опыт работы')
job('Karton Pay','маркетинг и оптимизация продукта','Июль 2026 - настоящее время',[
'Отвечаю за рекламу, контент, аналитику, воронку, SEO и оптимизацию сайта. Работаю с привлечением, активацией и удержанием пользователей.',
'Подготовил исследование рынка и конкурентов, сегментацию аудитории, позиционирование и контентную стратегию. Разработал сценарии коротких видео и план рекламных тестов.',
'Прорабатываю путь от рекламного контакта и посадочной страницы до Telegram-бота; связываю гипотезы, события аналитики и критерии оценки.',
'Масштаб продукта: около 24 тыс. пользователей бота за месяц по публичной карточке, проверенной 02.10.2026. Это показатель сервиса и результат команды.'
])
job('Первый Селлер','разработчик ботов и автоматизаций','Сентябрь 2025 - март 2026',[
'Разработал Telegram-бота с уведомлениями о новых заказах и изменениях карточек товаров для продавцов маркетплейса.',
'Автоматизировал ежедневные отчёты о продажах в Google Таблицах и Excel. Собирал открытые цены и ассортимент конкурентов.',
'Настроил webhook-интеграции с внутренними системами маркетплейса.'
])
job('Digital Agency St','frontend-разработчик','Январь - сентябрь 2025',[
'Разрабатывал калькуляторы стоимости, слайдеры и формы для клиентских сайтов; дорабатывал интернет-магазины и корпоративные страницы.',
'Подключал Яндекс Метрику и Google Analytics. Оптимизировал загрузку и LCP; согласовывал задачи с дизайнерами и менеджерами.'
])
footer(1);c.showPage();y=H-44;html.append('<div class="page-break"></div>')
title('Опыт и проекты',21,16)
job('Prostudio','стажёр frontend-разработки','Сентябрь - декабрь 2024',[
'Разрабатывал React-лендинги и промо-страницы, подключал товары и отправку форм через REST API.',
'Переносил компоненты с jQuery на React, писал модульные тесты на Jest, адаптировал UI-киты агентства под клиентские задачи.'
])
job('D-project','проектная работа по вёрстке','Дополнительный опыт',[
'Верстал по Figma и адаптировал страницы для мобильных устройств. Дорабатывал WordPress-шаблоны, WebP и lazy loading; исправлял ошибки вёрстки.'
])
title('Навыки')
for t in [
'<b>Frontend:</b> JavaScript ES6+, React, компоненты и состояние, HTML5, CSS3, Flexbox, Grid. Адаптивная вёрстка по Figma, формы и валидация, REST API, обработка ошибок и состояний загрузки. Git, Jest, WordPress.',
'<b>Автоматизация и данные:</b> Python, SQL, Telegram-боты, webhooks, Google Таблицы, Excel. Сбор открытых данных, автоматизация отчётности; поиск, фильтры, localStorage и экспорт CSV в веб-приложениях.',
'<b>Производительность:</b> оптимизация загрузки и LCP, Core Web Vitals, WebP, lazy loading, адаптация изображений и проверка интерфейсов на мобильных экранах.',
'<b>Маркетинг и аналитика:</b> сегментация аудитории, анализ конкурентов, позиционирование, контент-стратегия, рекламные гипотезы и тесты. Воронки привлечения и активации, SEO, оптимизация конверсии, события в Яндекс Метрике и Google Analytics.',
'<b>UI/UX и графика:</b> Figma, Photoshop, пользовательские сценарии, прототипирование, UI-киты, типографика и композиция. Айдентика, товарная графика, афиши и редакционная вёрстка.',
'<b>3D:</b> Blender — моделирование, материалы, постановка света, композиция сцены и предметная визуализация.'
]:p(t,gap=6)
y-=3
title('Избранные самостоятельные работы')
p('<b>19 веб-проектов:</b> USDT Desk, CRM, аналитика, магазины, запись и поддержка. Рабочие прототипы с демо и исходниками в портфолио.',gap=6)
p('<b>Дизайн и 3D:</b> самостоятельные концепции ТИХО, КРУГ, СДВИГ; новые Blender-этюды FIELD / 02 и Quiet Workspace. Макеты, рендеры и исходники доступны в портфолио.',gap=12)
title('Образование')
p('<b>Казанский федеральный университет</b><br/>Незаконченное высшее, ожидаемое окончание - 2027.',gap=8)
p('Дополнительное обучение: Яндекс Практикум, 2026; «Код будущего», вёрстка и веб-разработка, ТГУ, 2025.',gap=10)
footer(2);c.save()
css='body{max-width:760px;margin:48px auto;padding:0 24px;font:16px/1.55 Arial;color:#303a42}h2{color:#152730;margin:28px 0 12px}a{color:#234f72}.page-break{border-top:1px solid #ddd;margin-top:40px}@media print{body{margin:0}.page-break{break-before:page;border:0}a{color:inherit}}'
(OUT/'artem-bychkov-resume.html').write_text('<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Артём Бычков — резюме</title><style>'+css+'</style><main>'+''.join(html).replace('<link ','<a ').replace('</link>','</a>')+'</main></html>',encoding='utf-8')
print('Created resume PDF and editable HTML')
