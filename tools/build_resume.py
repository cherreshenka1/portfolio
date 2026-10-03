"""Build PDF, HTML and text using the standard hh.ru resume structure."""
import json
import re
from html import escape
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'resume'
OUT.mkdir(exist_ok=True)
content = json.loads((ROOT / 'tools/resume-content.json').read_text(encoding='utf-8'))
pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='ArialBold', italic='Arial', boldItalic='ArialBold')
W, H = 595.28, 841.89
MARGIN, WIDTH, DATE_WIDTH = 42, W - 84, 85
body = ParagraphStyle('body', fontName='Arial', fontSize=10, leading=13, textColor=HexColor('#222222'), spaceAfter=2)
small = ParagraphStyle('small', parent=body, fontSize=8.8, leading=11.5, textColor=HexColor('#707070'))
company = ParagraphStyle('company', parent=body, fontName='ArialBold', fontSize=11.3, leading=14.4, spaceAfter=2)
role = ParagraphStyle('role', parent=body, fontSize=10.2, leading=13.2, spaceAfter=3)
section_style = ParagraphStyle('section', parent=body, fontSize=11.5, leading=14, textColor=HexColor('#777777'), spaceBefore=10, spaceAfter=3, keepWithNext=True)
name_style = ParagraphStyle('name', parent=company, fontSize=26, leading=30, spaceAfter=9)
position_style = ParagraphStyle('position', parent=company, fontSize=15, leading=19, spaceAfter=5)
story, html, plain = [], [], []


def link(label, url):
    return f'<link href="{escape(url, quote=True)}" color="#234f72">{escape(label)}</link>'


def html_text(text):
    return text.replace('<link ', '<a ').replace('</link>', '</a>')


def section(label):
    story.append(Paragraph(escape(label), section_style))
    rule = HRFlowable(width='100%', thickness=0.5, color=HexColor('#cecece'), spaceAfter=6)
    rule.keepWithNext = True
    story.append(rule)
    html.append('<h2>' + escape(label) + '</h2>')
    plain.extend(['', label])


def row(left, paragraphs, css_class='record'):
    table = Table([[Paragraph(left, small), paragraphs]], colWidths=[DATE_WIDTH, WIDTH - DATE_WIDTH], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (0, -1), 9),
        ('RIGHTPADDING', (1, 0), (1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(table)
    html.append(f'<article class="{css_class}"><div class="period">' + html_text(left) + '</div><div class="details">')


def finish_row():
    html.append('</div></article>')


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Arial', 8)
    canvas.setFillColor(HexColor('#8a8a8a'))
    canvas.drawString(MARGIN, 22, content['name'] + ' · Резюме обновлено 3 октября 2026')
    canvas.drawRightString(W - MARGIN, 22, str(doc.page))
    canvas.restoreState()


story.append(Paragraph(escape(content['name']), name_style))
html.append('<header><h1>' + escape(content['name']) + '</h1>')
plain.append(content['name'])
contact_rows = [
    link(content['email'], 'mailto:' + content['email']) + ' · ' + link('@cherreshenkaw', content['telegram']),
    link('Портфолио', content['portfolio']) + ' · ' + link('GitHub', content['github']),
]
for text in contact_rows:
    story.append(Paragraph(text, body))
    html.append('<p>' + html_text(text) + '</p>')
plain.extend([content['email'], content['telegram'], content['portfolio'], content['github']])
html.append('</header>')

section('Желаемая должность')
story.append(Paragraph(escape(content['role']), position_style))
html.append('<h3 class="position">' + escape(content['role']) + '</h3>')
plain.append(content['role'])
for text in ['Специализация: программист, разработчик', 'Тип занятости: полная, частичная, проектная работа', 'Формат работы: удалённо']:
    story.append(Paragraph(escape(text), body))
    html.append('<p>' + escape(text) + '</p>')
    plain.append(text)

section('Опыт работы')
html.append('<section class="experience">')
durations = {'karton': '4 месяца', 'mts': '1 год 5 месяцев', 'seller': '7 месяцев', 'agency': '9 месяцев', 'prostudio': '4 месяца', 'dproject': '8 месяцев'}
for item in content['jobs']:
    start, end = item['dates'].split(' - ', 1)
    if not re.search(r'\d{4}', start):
        start += ' ' + re.search(r'\d{4}', end).group()
    date_text = escape(start) + ' -<br/>' + escape(end) + '<br/>' + durations[item['id']]
    right = [Paragraph(escape(item['company']), company), Paragraph(escape(item['role']), role)]
    right.extend(Paragraph('• ' + escape(bullet), body) for bullet in item['bullets'])
    if item.get('context'):
        right.append(Paragraph(escape(item['context']), small))
    row(date_text, right, css_class='job record')
    html.extend(['<h3>' + escape(item['company']) + '</h3>', '<p class="job-role">' + escape(item['role']) + '</p>', '<ul>'])
    html.extend('<li>' + escape(bullet) + '</li>' for bullet in item['bullets'])
    html.append('</ul>')
    if item.get('context'):
        html.append('<p class="muted">' + escape(item['context']) + '</p>')
    finish_row()
    plain.extend(['', item['dates'], item['company'], item['role']])
    plain.extend('• ' + bullet for bullet in item['bullets'])
    if item.get('context'):
        plain.append(item['context'])
html.append('</section>')

section('Образование')
education_parts = content['education'].split(' · ', 1)
right = [Paragraph(escape(education_parts[0]), company), Paragraph(escape(education_parts[1]), body)]
row('2027', right)
html.extend(['<h3>' + escape(education_parts[0]) + '</h3>', '<p>' + escape(education_parts[1]) + '</p>'])
finish_row()
plain.append(content['education'])

section('Повышение квалификации, курсы')
for item in content['courses']:
    course_title = link(item['name'], item['url']) if item.get('url') else escape(item['name'])
    period = str(item['year']) if item['year'] else item.get('status', '')
    right = [Paragraph(course_title, company), Paragraph(escape(item['provider']), body)]
    row(escape(period), right)
    html.extend(['<h3>' + html_text(course_title) + '</h3>', '<p>' + escape(item['provider']) + '</p>'])
    finish_row()
    plain.append(item['name'] + ' · ' + item['provider'] + ' · ' + period)

section('Навыки')
languages = content['languages'].split(' · ')
row('Знание<br/>языков', [Paragraph(escape(text), body) for text in languages])
html.extend('<p>' + escape(text) + '</p>' for text in languages)
finish_row()
plain.extend(['Знание языков', *languages])
right = [Paragraph('<b>' + escape(item['label']) + ':</b> ' + escape(item['text']), body) for item in content['skills']]
row('Ключевые<br/>навыки', right)
for item in content['skills']:
    html.append('<p><b>' + escape(item['label']) + ':</b> ' + escape(item['text']) + '</p>')
    plain.append(item['label'] + ': ' + item['text'])
finish_row()

section('Дополнительная информация')
row('Обо мне', [Paragraph(escape(content['summary']), body)])
html.append('<p>' + escape(content['summary']) + '</p>')
finish_row()
plain.extend(['Обо мне', content['summary']])

doc = SimpleDocTemplate(str(OUT / 'artem-bychkov-resume.pdf'), pagesize=(W, H), leftMargin=MARGIN, rightMargin=MARGIN, topMargin=35, bottomMargin=43, title=content['name'] + ' | ' + content['role'], author=content['name'])
doc.build(story, onFirstPage=footer, onLaterPages=footer)

css = '''
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f3f3f3;color:#222;font:16px/1.45 Arial,sans-serif}
main{max-width:880px;margin:32px auto;background:#fff;padding:42px 48px}h1{font-size:34px;line-height:1.2;margin:0 0 14px}
h2{font-size:18px;line-height:1.3;color:#777;font-weight:400;border-bottom:1px solid #cecece;margin:26px 0 14px;padding-bottom:4px}
h3{font-size:18px;line-height:1.3;margin:0 0 5px}.position{font-size:23px}p{margin:0 0 5px}a{color:#234f72;text-underline-offset:3px}
.record{display:grid;grid-template-columns:125px minmax(0,1fr);gap:14px;margin-bottom:16px}.period,.muted{font-size:14px;color:#707070}.job-role{margin-bottom:8px}ul{margin:0;padding-left:18px}li{margin-bottom:4px}.muted{margin-top:6px}
@media(max-width:600px){main{margin:0;padding:28px 22px}h1{font-size:29px}.record{grid-template-columns:1fr;gap:6px}p,li{overflow-wrap:anywhere}}
@media print{@page{size:A4;margin:14mm}body{background:#fff;font-size:10.2pt;line-height:1.32}main{margin:0;max-width:none;padding:0}h1{font-size:26pt}h2{font-size:11.5pt;margin:16px 0 8px;break-after:avoid}h3{font-size:11.3pt}.position{font-size:15pt}.record{grid-template-columns:85px minmax(0,1fr);gap:10px;break-inside:avoid;margin-bottom:10px}.period,.muted{font-size:8.8pt}}
'''
document = '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escape(content['name'] + ' - резюме') + '</title><style>' + css + '</style></head><body><main>' + ''.join(html) + '</main></body></html>'
(OUT / 'artem-bychkov-resume.html').write_text(document, encoding='utf-8')
(OUT / 'artem-bychkov-resume.txt').write_text('\n\n'.join(plain).strip() + '\n', encoding='utf-8')
print('Created resume PDF, HTML and text in hh.ru format')
