"""Build the same two-page resume as a searchable PDF, semantic HTML and text."""
import json
import re
from html import escape, unescape
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'resume'
OUT.mkdir(exist_ok=True)
content = json.loads((ROOT / 'tools/resume-content.json').read_text(encoding='utf-8'))
pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='ArialBold', italic='Arial', boldItalic='ArialBold')
W, H = 595.28, 841.89
LEFT, WIDTH = 42, W - 84
c = canvas.Canvas(str(OUT / 'artem-bychkov-resume.pdf'), pagesize=(W, H))
c.setTitle(content['name'] + ' | ' + content['role'])
c.setAuthor(content['name'])
body = ParagraphStyle('body', fontName='Arial', fontSize=10.2, leading=13.7, textColor=HexColor('#303a42'))
small = ParagraphStyle('small', parent=body, fontSize=8.8, leading=11.8, textColor=HexColor('#5b6973'))
heading = ParagraphStyle('heading', parent=body, fontName='ArialBold', textColor=HexColor('#152730'))
html, plain = [], []
y = H - 40
page_number = 1


def clean(text):
    return unescape(re.sub(r'<[^>]+>', '', text.replace('<br/>', '\n')))


def link(label, url):
    return f'<link href="{escape(url, quote=True)}" color="#234f72">{escape(label)}</link>'


def p(text, style=body, gap=5):
    global y
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(WIDTH, 1000)
    if y - height < 46:
        raise ValueError(f'Resume page {page_number} overflows at: {clean(text)[:70]}')
    paragraph.drawOn(c, LEFT, y - height)
    y -= height + gap
    html.append('<p>' + text.replace('<link ', '<a ').replace('</link>', '</a>') + '</p>')
    plain.append(clean(text))


def title(text, size=13.6, gap=9, level=2):
    global y
    text_style = ParagraphStyle('section', parent=heading, fontSize=size, leading=size + 3)
    paragraph = Paragraph(escape(text), text_style)
    _, height = paragraph.wrap(WIDTH, 1000)
    if y - height < 46:
        raise ValueError(f'Resume page {page_number} overflows at section {text}')
    paragraph.drawOn(c, LEFT, y - height)
    y -= height + gap
    html.append(f'<h{level}>' + escape(text) + f'</h{level}>')
    plain.extend(['', text])


def job(job_id):
    global y
    item = next(item for item in content['jobs'] if item['id'] == job_id)
    html.append('<article class="job">')
    p('<b>' + escape(item['company']) + ' · ' + escape(item['role']) + '</b>', gap=2)
    p(escape(item['dates']), small, gap=6)
    for bullet in item['bullets']:
        p('• ' + escape(bullet), gap=3.5)
    if item.get('context'):
        p(escape(item['context']), small, gap=4)
    y -= 5
    html.append('</article>')


def footer(number):
    c.setStrokeColor(HexColor('#d8dee2'))
    c.line(LEFT, 34, W - LEFT, 34)
    c.setFont('Arial', 8)
    c.setFillColor(HexColor('#5b6973'))
    c.drawString(LEFT, 21, content['name'] + ' · ' + content['role'])
    c.drawRightString(W - LEFT, 21, str(number) + ' / 2')


html.append('<section class="resume-page">')
title(content['name'], size=26, gap=3, level=1)
p('<b>' + escape(content['role']) + '</b>', gap=3)
p(escape(content['focus']), gap=8)
p(link(content['email'], 'mailto:' + content['email']) + ' · ' + link('@cherreshenkaw', content['telegram']), small, gap=3)
p(link('Портфолио', content['portfolio']) + ' · ' + link('GitHub', content['github']) + ' · Удалённая работа', small, gap=12)
plain.extend([content['portfolio'], content['github'], content['telegram']])
p(escape(content['summary']), gap=10)
p('<b>Посмотреть работу:</b> ' + ' · '.join(link(item['name'], item['demo']) for item in content['projects']), small, gap=16)
title('Опыт работы')
for job_id in ['karton', 'mts', 'seller', 'agency']:
    job(job_id)
print(f'Page 1 content bottom: {y:.1f} pt')
footer(1)
c.showPage()
page_number = 2
y = H - 40
html.append('</section><section class="resume-page">')

title('Избранные проекты', size=17, gap=5)
p('Самостоятельные рабочие прототипы из портфолио: демо и исходники доступны по ссылкам.', small, gap=8)
for item in content['projects']:
    p('<b>' + escape(item['name']) + '</b> · ' + escape(item['stack']) + ' · ' + link('Демо', item['demo']) + ' / ' + link('Код', item['code']), gap=2)
    p(escape(item['description']), gap=8)
    plain.extend(['Демо: ' + item['demo'], 'Код: ' + item['code']])

title('Ранний опыт')
for job_id in ['prostudio', 'dproject']:
    job(job_id)
title('Ключевые навыки')
for item in content['skills']:
    p('<b>' + escape(item['label']) + ':</b> ' + escape(item['text']), gap=5)
p(escape(content['visual_work']), small, gap=9)
title('Образование и дополнительное обучение')
p(escape(content['education']), gap=5)
for item in content['courses']:
    course = escape(item['name'])
    if item.get('url'):
        course = link(item['name'], item['url'])
    suffix = str(item['year']) if item['year'] else item.get('status', '')
    p(course + ' · ' + escape(item['provider']) + ((' · ' + escape(suffix)) if suffix else ''), small, gap=2)
p('<b>Языки:</b> ' + escape(content['languages']), small, gap=3)
print(f'Page 2 content bottom: {y:.1f} pt')
footer(2)
c.save()
html.append('</section>')

css = '''
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#edf1f4;color:#303a42;font:16px/1.5 Arial,sans-serif}
main{max-width:850px;margin:32px auto}.resume-page{padding:42px 48px;background:#fff;margin-bottom:24px;border:1px solid #d8dee2}
h1,h2{color:#152730;line-height:1.2}h1{font-size:34px;margin:0 0 12px}h2{font-size:21px;margin:26px 0 12px}
p{margin:0 0 10px}a{color:#234f72;text-underline-offset:3px}.job{margin-bottom:18px}.job p{margin-bottom:6px}
@media(max-width:600px){main{margin:0}.resume-page{padding:28px 22px;border:0}h1{font-size:30px}p{overflow-wrap:anywhere}}
@media print{@page{size:A4;margin:14mm}body{background:#fff;font-size:10.2pt;line-height:1.34}main{margin:0;max-width:none}.resume-page{border:0;padding:0;margin:0}.resume-page+.resume-page{break-before:page}.job{break-inside:avoid;margin-bottom:10px}h1{font-size:26pt}h2{font-size:13.6pt;margin:15px 0 8px}p{margin-bottom:5px}a{color:inherit}}
'''
document = '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escape(content['name'] + ' - резюме') + '</title><style>' + css + '</style></head><body><main>' + ''.join(html) + '</main></body></html>'
(OUT / 'artem-bychkov-resume.html').write_text(document, encoding='utf-8')
(OUT / 'artem-bychkov-resume.txt').write_text('\n\n'.join(plain).strip() + '\n', encoding='utf-8')
print('Created resume PDF, HTML and text from tools/resume-content.json')
