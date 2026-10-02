"""Generate the proposal mockups (static HTML) from shared parts and real catalogue data.

Writes docs/design/mockups/*.html. Each page links ../tokens/tokens.css and components.css (hand-written).
Data: real programs from www.ibmatch.com (public search API, 2 Oct 2026). Student data is an example.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "mockups")
os.makedirs(OUT, exist_ok=True)

CUR = ' aria-current="page"'

# lucide icons (ISC) — the same set the app uses through lucide-react
ICONS = {
    "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "bookmark": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    "sliders": '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    "pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    "cap": '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "alert": '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    "warn": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    "right": '<path d="m9 18 6-6-6-6"/>', "down": '<path d="m6 9 6 6 6-6"/>', "left": '<path d="m15 18-6-6 6-6"/>',
    "arrow": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "info": '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    "ext": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    "menu": '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    "spark": '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    "book": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    "globe": '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    "plus": '<path d="M5 12h14"/><path d="M12 5v14"/>',
    "trash": '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    "uni": '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    "sort": '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>',
    "cal": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    "flask": '<path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>',
    "scale": '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    "cpu": '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    "steth": '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "brief": '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    "ruler": '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
    "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    "school": '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10"/><path d="M18 5v17"/><path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>',
    "building": '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    "palette": '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/>',
    "login": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>',
    "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
    "heart": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
}


def i(name, extra=""):
    return f'<svg class="i{(" " + extra) if extra else ""}" viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>'


FIELD_ICON = {"Social Sciences": "users", "Computer Science": "cpu", "Law": "scale", "Natural Sciences": "flask",
              "Medicine & Health": "steth", "Business & Economics": "brief", "Engineering": "ruler", "Education": "school",
              "Arts & Humanities": "palette", "Architecture": "building", "Environmental Studies": "leaf"}
FLAG = {"United Kingdom": "🇬🇧", "Netherlands": "🇳🇱", "Singapore": "🇸🇬", "Ireland": "🇮🇪", "Canada": "🇨🇦", "Spain": "🇪🇸",
        "Hong Kong": "🇭🇰", "Switzerland": "🇨🇭", "Czech Republic": "🇨🇿", "Australia": "🇦🇺", "United States": "🇺🇸", "Germany": "🇩🇪"}

# Real programs (www.ibmatch.com, 2 October 2026). match = example student with 38 points.
P = [
    dict(name="Psychology BSc (Hons)", uni="University of Edinburgh", mono="UoE", city="Edinburgh", country="United Kingdom",
         field="Social Sciences", degree="Bachelor of Science", years="4 years", pts=34,
         match=dict(pct=86, tier="strong", label="Strong match", reasons=[("yes", "38 of 34 points"), ("yes", "3 of 3 subjects"), ("yes", "Preferred country")])),
    dict(name="Psychology", uni="University of Amsterdam", mono="UvA", city="Amsterdam", country="Netherlands",
         field="Social Sciences", degree="Bachelor of Science", years="3 years", pts=24,
         match=dict(pct=92, tier="excellent", label="Excellent match", reasons=[("yes", "38 of 24 points"), ("yes", "No subject requirements"), ("yes", "Preferred country")])),
    dict(name="Psychology (BSc)", uni="University College Dublin", mono="UCD", city="Dublin", country="Ireland",
         field="Social Sciences", degree="Bachelor of Science", years="3 years", pts=37,
         match=dict(pct=71, tier="good", label="Good match", reasons=[("yes", "38 of 37 points"), ("part", "1 subject close"), ("no", "Outside your countries")])),
    dict(name="Psychological and Behavioural Sciences, BA (Hons)", uni="University of Cambridge", mono="Cam", city="Cambridge", country="United Kingdom",
         field="Social Sciences", degree="Bachelor of Arts", years="3 years", pts=41,
         match=dict(pct=48, tier="fair", label="Possible", reasons=[("no", "3 points short"), ("yes", "2 of 2 subjects"), ("yes", "Preferred country")])),
    dict(name="Psychology", uni="McGill University", mono="McG", city="Montreal", country="Canada",
         field="Social Sciences", degree="Bachelor of Arts", years="3 years", pts=33,
         match=dict(pct=64, tier="good", label="Good match", reasons=[("yes", "38 of 33 points"), ("yes", "2 of 2 subjects"), ("no", "Outside your countries")])),
    dict(name="Psychology", uni="Leiden University", mono="LU", city="Leiden", country="Netherlands",
         field="Social Sciences", degree="Bachelor of Science", years="3 years", pts=24,
         match=dict(pct=90, tier="excellent", label="Excellent match", reasons=[("yes", "38 of 24 points"), ("yes", "1 of 1 subject"), ("yes", "Preferred country")])),
    dict(name="Computing (MEng)", uni="Imperial College London", mono="ICL", city="London", country="United Kingdom",
         field="Computer Science", degree="Master of Engineering", years="4 years", pts=41, match=None),
    dict(name="Bachelor of Laws (LLB)", uni="National University of Singapore", mono="NUS", city="Singapore", country="Singapore",
         field="Law", degree="Bachelor of Laws", years="4 years", pts=43, match=None),
]


def pcard(p, logged_in=False, saved=False, compact=False):
    flag = FLAG.get(p["country"], "")
    facts = (f'<span class="ib-pcard__fact">{i(FIELD_ICON.get(p["field"], "book"))}{p["field"]}</span>'
             f'<span class="ib-pcard__fact">{i("cap")}{p["degree"]}</span>'
             f'<span class="ib-pcard__fact">{i("clock")}{p["years"]}</span>')
    match = ""
    if logged_in and p.get("match"):
        m = p["match"]
        rs = "".join(f'<span class="ib-pcard__reason" data-ok="{ok}">{i("check" if ok == "yes" else "alert" if ok == "part" else "x")}{t}</span>' for ok, t in m["reasons"])
        match = (f'<div class="ib-pcard__match"><div class="ib-score" data-tier="{m["tier"]}" style="--pct:{m["pct"]}">'
                 f'<span class="ib-score__ring" data-value="{m["pct"]}%" role="img" aria-label="{m["pct"]} percent"></span>'
                 f'<span class="ib-score__label">{m["label"]}</span></div>{rs}'
                 f'<a class="ib-pcard__why" href="#">Why this score{i("right")}</a></div>')
    pressed = "true" if saved else "false"
    return f'''<article class="ib-pcard{' ib-pcard--compact' if compact else ''}"><div class="ib-pcard__grid">
  <div class="ib-pcard__logo" aria-hidden="true">{p["mono"]}</div>
  <h3 class="ib-pcard__title"><a href="#">{p["name"]}</a></h3>
  <div class="ib-pcard__aside"><div class="ib-pcard__points"><b>IB {p["pts"]}+</b><span>minimum points</span></div>
    <button class="ib-iconbtn ib-pcard__save" aria-pressed="{pressed}" aria-label="{'Saved' if saved else 'Save'} {p["name"]}">{i("bookmark")}</button></div>
  <p class="ib-pcard__uni"><a href="#">{p["uni"]}</a> · {p["city"]}, {p["country"]} <span class="flag">{flag}</span></p>
  <div class="ib-pcard__facts"><span class="ib-pcard__fact ib-pcard__fact--points">IB {p["pts"]}+</span>{facts}</div>
  {match}
</div></article>'''


def pcard_mobile(p, logged_in=False, saved=False):
    """Same component: the container query moves points into the facts row on narrow widths."""
    return pcard(p, logged_in, saved)


HEAD = '''<!doctype html><html lang="en" data-theme="{theme}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Atkinson+Hyperlegible+Next:ital,wght@0,400..800;1,400&display=swap">
<link rel="stylesheet" href="../tokens/tokens.css"><link rel="stylesheet" href="components.css">
<style>{css}</style></head><body class="ib">'''


def page(fname, title, body, css="", theme="light"):
    with open(os.path.join(OUT, fname), "w") as f:
        f.write(HEAD.format(title=title, css=css, theme=theme) + body + "</body></html>")


def logo():
    return '<a class="ib-logo" href="#"><span class="ib-logo__mark">IB</span>IB Match</a>'


def header_public(active=None, mobile=False):
    if mobile:
        return f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}
<div class="ib-header__actions"><a class="ib-btn ib-btn--outline ib-btn--sm" href="#">Sign in</a>
<button class="ib-iconbtn" aria-label="Open menu" aria-expanded="false">{i("menu")}</button></div></div></header>'''
    links = [("Find programs", "search"), ("Country guides", "guides"), ("How it works", "how"), ("For IB schools", "schools")]
    nav = "".join(f'<a href="#"{CUR if k == active else ""}>{t}</a>' for t, k in links)
    return f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}<nav class="ib-nav" aria-label="Main">{nav}</nav>
<div class="ib-header__actions"><a class="ib-btn ib-btn--ghost ib-btn--sm" href="#">Sign in</a><a class="ib-btn ib-btn--primary ib-btn--sm" href="#">Get my matches</a></div></div></header>'''


def header_app(active="matches", mobile=False, incomplete=False):
    if mobile:
        return f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}
<div class="ib-header__actions"><span class="ib-avatar" role="img" aria-label="Account">M</span></div></div></header>'''
    links = [("Matches", "matches"), ("Search", "search"), ("Saved", "saved"), ("Country guides", "guides")]
    nav = "".join(f'<a href="#"{CUR if k == active else ""}>{t}</a>' for t, k in links)
    warn = f'<a class="ib-pill-warn" href="#">{i("warn")}Finish your profile</a>' if incomplete else ""
    return f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}<nav class="ib-nav" aria-label="Main">{nav}</nav>
<div class="ib-header__actions">{warn}<button class="ib-btn ib-btn--ghost ib-btn--sm" aria-haspopup="menu">My profile{i("down")}</button><span class="ib-avatar" role="img" aria-label="Account">M</span></div></div></header>'''


def tabbar(active="matches"):
    items = [("Matches", "spark", "matches"), ("Search", "search", "search"), ("Saved", "bookmark", "saved"), ("Profile", "user", "profile")]
    return '<nav class="ib-tabbar" aria-label="Main">' + "".join(
        f'<a href="#"{CUR if k == active else ""}>{i(ic)}{t}</a>' for t, ic, k in items) + "</nav>"


def footer():
    return f'''<footer class="ib-footer"><div class="wrap"><div class="ib-footer__grid">
<div><div>{logo()}</div><p style="margin-top:14px;max-width:30ch;opacity:.8;font-size:.9375rem">University matching built for the IB Diploma. Free for students, built by an IB graduate.</p></div>
<div><h4>Students</h4><ul><li><a href="#">Find programs</a></li><li><a href="#">Get my matches</a></li><li><a href="#">How matching works</a></li><li><a href="#">FAQs</a></li></ul></div>
<div><h4>Country guides</h4><ul><li><a href="#">United Kingdom</a></li><li><a href="#">Netherlands</a></li><li><a href="#">Canada</a></li><li><a href="#">All 22 countries</a></li></ul></div>
<div><h4>IB schools</h4><ul><li><a href="#">For coordinators</a></li><li><a href="#">Coordinator sign-in</a></li><li><a href="#">Request a program</a></li></ul></div>
<div><h4>About</h4><ul><li><a href="#">Support IB Match</a></li><li><a href="#">Contact</a></li><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li></ul></div>
</div><div class="ib-footer__base"><span>© 2026 IB Match. Not affiliated with the International Baccalaureate Organization.</span><span>support@ibmatch.com</span></div></div></footer>'''


# ===================== 1. program card states =====================
cards_css = """.board{display:grid;grid-template-columns:1fr;gap:28px;padding:32px;max-width:900px}
.cap{font:700 .75rem/1 var(--font-sans);letter-spacing:.08em;text-transform:uppercase;color:var(--fg-muted);margin-bottom:10px}
"""
body = '<main class="board">'
body += '<section><div class="cap">Search result · signed out</div>' + pcard(P[0]) + '</section>'
body += '<section><div class="cap">Match result · signed in, strong match, saved</div>' + pcard(P[0], logged_in=True, saved=True) + '</section>'
body += '<section><div class="cap">Match result · signed in, possible (points short)</div>' + pcard(P[3], logged_in=True) + '</section>'
body += '<section><div class="cap">Compact · university page, country guide, coordinator lists</div>' + pcard(P[6], compact=True) + '</section>'
body += '</main>'
page("program-card.html", "Program card", body, cards_css)

mob_css = """.board{display:flex;flex-direction:column;gap:20px;padding:16px;width:390px}
.cap{font:700 .75rem/1 var(--font-sans);letter-spacing:.08em;text-transform:uppercase;color:var(--fg-muted);margin-bottom:8px}"""
body = '<main class="board">'
body += '<section><div class="cap">Signed out</div>' + pcard_mobile(P[0]) + '</section>'
body += '<section><div class="cap">Signed in</div>' + pcard_mobile(P[0], logged_in=True, saved=True) + '</section>'
body += '<section><div class="cap">Signed in · possible</div>' + pcard_mobile(P[3], logged_in=True) + '</section></main>'
page("program-card-mobile.html", "Program card mobile", body, mob_css)

# ===================== 2. search desktop =====================
search_css = """
.layout{display:grid;grid-template-columns:280px 1fr;gap:32px;align-items:start;padding-block:28px 64px}
.facets{position:sticky;top:88px;display:flex;flex-direction:column;gap:22px;padding:20px;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface)}
.facet h3{font:700 .9375rem/1.3 var(--font-sans);margin-bottom:10px;display:flex;justify-content:space-between}
.facet h3 a{font-weight:600;font-size:.8125rem}
.opts{display:flex;flex-direction:column;gap:2px}
.opt{display:flex;align-items:center;gap:10px;min-height:36px;font-size:.9375rem;color:var(--fg)}
.box{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border-strong);display:grid;place-items:center;flex:none;background:var(--surface)}
.opt[data-on] .box{background:var(--primary);border-color:var(--primary);color:var(--on-primary)}
.opt .box svg.i{width:14px;height:14px}
.opt .n{margin-left:auto;color:var(--fg-muted);font-size:.8125rem;font-variant-numeric:tabular-nums}
.range{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center}
.hist{display:flex;align-items:flex-end;gap:2px;height:40px;margin-bottom:6px}
.hist span{flex:1;background:var(--blue-200,#c3dbff);border-radius:2px 2px 0 0}
.hist span.on{background:var(--primary)}
.head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;padding-top:36px}
.toolbar{display:flex;gap:12px;align-items:center;margin-top:20px}
.toolbar .ib-search{flex:1}
.resmeta{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin-bottom:14px}
.results{display:flex;flex-direction:column;gap:14px}
"""
facet_fields = [("Social Sciences", 214, True), ("Computer Science", 168, False), ("Engineering", 141, False), ("Business & Economics", 133, False), ("Medicine & Health", 97, False), ("Law", 74, False)]
facet_countries = [("United Kingdom", "🇬🇧", 312, True), ("Netherlands", "🇳🇱", 118, True), ("Canada", "🇨🇦", 104, False), ("Australia", "🇦🇺", 87, False), ("Ireland", "🇮🇪", 61, False)]
hist = [3, 5, 8, 14, 22, 30, 41, 52, 60, 66, 58, 49, 44, 37, 30, 24, 17, 12, 8, 5, 3, 2]
facets = f'''<aside class="facets" aria-label="Filters">
<div class="facet"><h3>Field of study <a href="#">Clear</a></h3><div class="opts">''' + "".join(
    f'<label class="opt"{" data-on" if on else ""}><span class="box">{i("check") if on else ""}</span>{i(FIELD_ICON[n])}{n}<span class="n">{c}</span></label>' for n, c, on in facet_fields) + \
    f'''<a href="#" style="font-size:.875rem;font-weight:600;margin-top:6px">Show all 11 fields</a></div></div>
<div class="facet"><h3>Country</h3><div class="opts">''' + "".join(
    f'<label class="opt"{" data-on" if on else ""}><span class="box">{i("check") if on else ""}</span><span>{fl}</span>{n}<span class="n">{c}</span></label>' for n, fl, c, on in facet_countries) + \
    f'''<a href="#" style="font-size:.875rem;font-weight:600;margin-top:6px">Show all 22 countries</a></div></div>
<div class="facet"><h3>Minimum IB points</h3><div class="hist" aria-hidden="true">''' + "".join(
    f'<span class="{"on" if 6 <= k <= 17 else ""}" style="height:{v * 100 // 66}%"></span>' for k, v in enumerate(hist)) + \
    f'''</div><div class="range"><input class="ib-input num" value="30" aria-label="From"><span class="muted">to</span><input class="ib-input num" value="41" aria-label="To"></div>
<p class="ib-hint" style="margin-top:8px">The IB Diploma scale runs from 24 to 45.</p></div>
<div class="facet"><h3>Degree</h3><div class="row"><button class="ib-chip" aria-pressed="true">Bachelor's</button><button class="ib-chip" aria-pressed="false">Integrated master's</button></div></div>
</aside>'''
results = "".join(pcard(p) for p in [P[0], P[1], P[5], P[2], P[4]])
body = header_public("search") + f'''<main class="wrap-app">
<div class="head"><div><h1 class="t-display-lg">Find programs</h1><p class="muted" style="margin-top:6px">1,273 programs at universities in 22 countries, each with its IB requirements.</p></div></div>
<div class="toolbar"><div class="ib-search">{i("search")}<input class="ib-input" value="psychology" aria-label="Search programs, universities or cities"></div>
<label class="sr" for="sort">Sort</label><select id="sort" class="ib-select" style="height:52px;border-radius:var(--radius-lg)"><option>Best match first</option></select></div>
<div class="layout">{facets}
<section aria-label="Results"><div class="resmeta"><p><b class="num">47 programs</b> <span class="muted">for “psychology”</span></p>
<div class="row"><span class="ib-chip ib-chip--remove">Social Sciences{i("x")}</span><span class="ib-chip ib-chip--remove">🇬🇧 United Kingdom{i("x")}</span><span class="ib-chip ib-chip--remove">🇳🇱 Netherlands{i("x")}</span><span class="ib-chip ib-chip--remove">30–41 points{i("x")}</span><a href="#" style="font-size:.875rem;font-weight:600">Clear all</a></div></div>
<div class="results">{results}</div>
<nav class="ib-pages" aria-label="Pages" style="margin-top:24px"><span class="muted num">Showing 1–20 of 47</span><div class="ib-pages__nums"><a href="#" aria-current="page">1</a><a href="#">2</a><a href="#">3</a><a href="#" aria-label="Next page">{i("right")}</a></div></nav>
</section></div></main>'''
page("search-desktop.html", "Search desktop", body, search_css)

# ===================== 3. search mobile =====================
sm_css = """.top{padding-block:20px 8px;display:flex;flex-direction:column;gap:12px}
.tools{display:flex;gap:8px}.tools .ib-btn{flex:1}
.list{display:flex;flex-direction:column;gap:12px;padding-block:8px 32px}
.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}"""
body = header_public(mobile=True) + f'''<main class="wrap"><div class="top"><h1 class="t-display-lg">Find programs</h1>
<div class="ib-search">{i("search")}<input class="ib-input" value="psychology" aria-label="Search programs"></div>
<div class="tools"><button class="ib-btn ib-btn--outline">{i("sliders")}Filters <span class="ib-badge ib-badge--brand">4</span></button><button class="ib-btn ib-btn--outline">{i("sort")}Best match</button></div>
<div class="chips"><span class="ib-chip ib-chip--remove">Social Sciences{i("x")}</span><span class="ib-chip ib-chip--remove">🇬🇧 UK{i("x")}</span><span class="ib-chip ib-chip--remove">🇳🇱 NL{i("x")}</span></div>
<p class="ib-hint"><b class="num" style="color:var(--fg)">47 programs</b> for “psychology”</p></div>
<div class="list">{pcard_mobile(P[0])}{pcard_mobile(P[1])}{pcard_mobile(P[5])}{pcard_mobile(P[2])}</div></main>'''
page("search-mobile.html", "Search mobile", body, sm_css)

# ===================== 4. filter sheet (mobile) =====================
sheet_css = """body{overflow:hidden;height:844px}.scrim{position:fixed;inset:0;background:rgb(5 8 16 / .45)}
.ib-sheet{position:fixed;left:0;right:0;bottom:0;max-height:88%;display:flex;flex-direction:column}
.sheet-h{display:flex;align-items:center;justify-content:space-between;padding:6px 16px 12px;border-bottom:1px solid var(--border)}
.sheet-b{padding:16px;display:flex;flex-direction:column;gap:22px;overflow:auto}
.sheet-f{display:flex;gap:10px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--border)}
.sheet-f .ib-btn{flex:1}
h3{font:700 1rem/1.3 var(--font-sans);margin-bottom:10px}"""
body = f'''<div class="scrim"></div><div class="ib-sheet" role="dialog" aria-modal="true" aria-labelledby="ft"><div class="ib-sheet__grab"></div>
<div class="sheet-h"><h2 id="ft" class="t-heading-md">Filters</h2><button class="ib-iconbtn" aria-label="Close filters">{i("x")}</button></div>
<div class="sheet-b">
<section><h3>Field of study</h3><div class="row"><button class="ib-chip" aria-pressed="true">{i("users")}Social Sciences</button><button class="ib-chip" aria-pressed="false">{i("cpu")}Computer Science</button><button class="ib-chip" aria-pressed="false">{i("ruler")}Engineering</button><button class="ib-chip" aria-pressed="false">{i("brief")}Business</button><button class="ib-chip" aria-pressed="false">{i("steth")}Medicine</button><button class="ib-chip" aria-pressed="false">{i("scale")}Law</button></div></section>
<section><h3>Country</h3><div class="row"><button class="ib-chip" aria-pressed="true"><span class="flag">🇬🇧</span>United Kingdom</button><button class="ib-chip" aria-pressed="true"><span class="flag">🇳🇱</span>Netherlands</button><button class="ib-chip" aria-pressed="false"><span class="flag">🇨🇦</span>Canada</button><button class="ib-chip" aria-pressed="false"><span class="flag">🇦🇺</span>Australia</button><button class="ib-chip" aria-pressed="false"><span class="flag">🇮🇪</span>Ireland</button><button class="ib-chip" aria-pressed="false">+17 more</button></div></section>
<section><h3>Minimum IB points</h3><div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center"><input class="ib-input num" value="30" aria-label="From"><span class="muted">to</span><input class="ib-input num" value="41" aria-label="To"></div></section>
</div><div class="sheet-f"><button class="ib-btn ib-btn--outline">Clear all</button><button class="ib-btn ib-btn--primary">Show 47 programs</button></div></div>'''
page("filters-sheet-mobile.html", "Filters sheet", '<div style="filter:saturate(.9)">' + header_public(mobile=True) + '</div>' + body, sheet_css)

# ===================== 5. program detail desktop (signed in) =====================
req_rows = f'''<ul class="ib-reqs">
<li class="ib-req" data-status="met"><span class="ib-req__icon">{i("check")}</span><span class="ib-req__name">Total IB points<small>Including TOK and EE bonus points</small></span><span class="ib-req__need">34 points</span><span class="ib-req__status">{i("check")}You have 38: 4 to spare</span></li>
<li class="ib-req" data-status="met"><span class="ib-req__icon">{i("check")}</span><span class="ib-req__name"><span class="ib-or">One of</span>Mathematics: Analysis and Approaches or Applications and Interpretation<small>HL 5, or SL 6</small></span><span class="ib-req__need">HL 5 · SL 6</span><span class="ib-req__status">{i("check")}Your Mathematics AA HL 6 counts</span></li>
<li class="ib-req" data-status="met"><span class="ib-req__icon">{i("check")}</span><span class="ib-req__name"><span class="ib-or">One of</span>10 science or maths subjects<small>Biology, Chemistry, Physics, Psychology, Geography and 5 more · <a href="#">Show all</a></small></span><span class="ib-req__need">HL 5</span><span class="ib-req__status">{i("check")}Your Biology HL 6 counts</span></li>
<li class="ib-req" data-status="partial"><span class="ib-req__icon">{i("alert")}</span><span class="ib-req__name"><span class="ib-or">One of</span>English B, English A: Literature, or English A: Language &amp; Literature</span><span class="ib-req__need">SL 5</span><span class="ib-req__status">{i("alert")}Not in your subjects. An English test (IELTS 6.5) is accepted instead.</span></li>
</ul>'''
pd_css = """.crumb{padding-top:24px}
.hero{display:grid;grid-template-columns:72px 1fr;gap:20px;padding-block:20px 28px;align-items:start}
.hero .ib-pcard__logo{width:72px;height:72px;font-size:1.25rem}
.hero .meta{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--fg-muted);margin-top:8px}
.hero .meta span{display:inline-flex;gap:6px;align-items:center}
.cols{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:40px;align-items:start;padding-bottom:64px}
.panel{border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface);padding:22px}
.sec{display:flex;flex-direction:column;gap:14px;margin-top:36px}
.sec:first-child{margin-top:0}
.prose{max-width:var(--container-prose);color:var(--fg)}
.prose p{margin:0 0 14px}
.prose ul{margin:0 0 14px;padding-left:20px}
.side{position:sticky;top:88px;display:flex;flex-direction:column;gap:16px}
.match{display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center}
"""
body = header_app("search") + f'''<main class="wrap-app">
<nav class="crumb" aria-label="Breadcrumb"><ol class="ib-crumbs"><li><a href="#">Programs</a></li><li><a href="#">United Kingdom</a></li><li><a href="#">University of Edinburgh</a></li><li aria-current="page">Psychology BSc (Hons)</li></ol></nav>
<div class="hero"><div class="ib-pcard__logo" aria-hidden="true">UoE</div><div>
<div class="row" style="margin-bottom:8px"><span class="ib-badge ib-badge--highlight">{i("check")}Checked for 2027 entry</span><span class="ib-badge">{i("users")}Social Sciences</span></div>
<h1 class="t-display-lg">Psychology BSc (Hons)</h1>
<div class="meta"><span>{i("uni")}<a href="#">University of Edinburgh</a></span><span>{i("pin")}Edinburgh, United Kingdom 🇬🇧</span><span>{i("cap")}Bachelor of Science</span><span>{i("clock")}4 years</span></div></div></div>
<div class="cols"><div>
<section class="sec panel"><div class="match"><div class="ib-score ib-score--lg" data-tier="strong" style="--pct:86"><span class="ib-score__ring" data-value="86%"></span></div>
<div><h2 class="t-heading-md" style="color:var(--success)">Strong match</h2><p class="muted" style="margin-top:4px">You meet the points and every subject requirement except English, which a language test can replace. Edinburgh is in a country you chose.</p></div></div>
<div><div class="ib-scale" aria-hidden="true"><div class="ib-scale__track"></div><div class="ib-scale__fill" style="left:47.6%;width:19.1%"></div><div class="ib-scale__req" style="left:47.6%"></div><div class="ib-scale__you" style="left:66.7%"></div></div>
<div class="ib-scale__ticks"><span style="left:0">24</span><span style="left:47.6%">Required <b>34</b></span><span style="left:66.7%">You <b>38</b></span><span style="left:100%">45</span></div></div></section>
<section class="sec"><h2 class="t-heading-lg">IB requirements</h2>{req_rows}<p class="ib-hint">{i("info")} Source: University of Edinburgh admissions page, checked September 2026. <a href="#">Confirm on the university's site</a>.</p></section>
<section class="sec"><h2 class="t-heading-lg">About this program</h2><div class="prose"><p>The scientific study of the mind, brain and behaviour. You build and test theories that explain how people interact with each other and the world around them, using experimental and observational methods.</p>
<ul><li>Four-year Scottish honours degree</li><li>Optional year abroad in year 3</li><li>Accredited by the British Psychological Society</li></ul></div></section>
<section class="sec"><h2 class="t-heading-lg">More psychology programs</h2>{pcard(P[1], compact=True)}{pcard(P[5], compact=True)}</section>
</div>
<aside class="side"><div class="panel stack"><dl class="ib-facts"><div><dt>Minimum points</dt><dd>34</dd></div><div><dt>Duration</dt><dd>4 years</dd></div><div><dt>Intake</dt><dd>September</dd></div><div><dt>Language</dt><dd>English</dd></div></dl>
<a class="ib-btn ib-btn--primary ib-btn--block" href="#">Visit program website{i("ext")}</a><button class="ib-btn ib-btn--outline ib-btn--block" aria-pressed="true">{i("bookmark", "")}Saved</button></div>
<div class="ib-callout"><svg class="i" viewBox="0 0 24 24" aria-hidden="true">{ICONS["info"]}</svg><div><b>UCAS deadline: 14 January 2027</b><span class="muted" style="font-size:.9375rem">UK programs are applied for through UCAS. <a href="#">UK guide</a></span></div></div></aside>
</div></main>''' + footer()
page("program-detail-desktop.html", "Program detail", body, pd_css)

# ===================== 6. program detail mobile =====================
pdm_css = pd_css + """.hero{grid-template-columns:56px 1fr;gap:14px}.hero .ib-pcard__logo{width:56px;height:56px}
.cols{grid-template-columns:1fr;gap:28px}.side{position:static}
.actionbar{position:fixed;left:0;right:0;bottom:64px;display:flex;gap:10px;padding:10px 16px;background:var(--surface);border-top:1px solid var(--border);box-shadow:var(--shadow-md)}
.actionbar .ib-btn{flex:1}"""
body = header_app(mobile=True) + f'''<main class="wrap" style="padding-bottom:160px">
<nav class="crumb" aria-label="Breadcrumb"><ol class="ib-crumbs"><li><a href="#">Programs</a></li><li><a href="#">University of Edinburgh</a></li></ol></nav>
<div class="hero"><div class="ib-pcard__logo" aria-hidden="true">UoE</div><div><span class="ib-badge ib-badge--highlight">{i("check")}Checked for 2027</span>
<h1 class="t-display-lg" style="margin-top:6px">Psychology BSc (Hons)</h1><div class="meta"><span><a href="#">University of Edinburgh</a></span><span>Edinburgh, UK 🇬🇧</span></div></div></div>
<dl class="ib-facts" style="grid-template-columns:repeat(3,minmax(0,1fr))"><div><dt>Min. points</dt><dd>34</dd></div><div><dt>Duration</dt><dd>4 years</dd></div><div><dt>Degree</dt><dd>BSc</dd></div></dl>
<section class="sec panel" style="margin-top:20px"><div class="match"><div class="ib-score ib-score--lg" data-tier="strong" style="--pct:86"><span class="ib-score__ring" data-value="86%"></span></div>
<div><h2 class="t-heading-md" style="color:var(--success)">Strong match</h2><p class="muted" style="margin-top:4px;font-size:.9375rem">38 points, 4 to spare. English can be replaced by IELTS.</p></div></div></section>
<section class="sec"><h2 class="t-heading-lg">IB requirements</h2>{req_rows}</section></main>
<div class="actionbar"><button class="ib-btn ib-btn--outline" aria-pressed="true">{i("bookmark")}Saved</button><a class="ib-btn ib-btn--primary" href="#">Program site{i("ext")}</a></div>''' + tabbar("search")
page("program-detail-mobile.html", "Program detail mobile", body, pdm_css)

# ===================== 7. onboarding step 1 (mobile) =====================
fields = [("Social Sciences", "users", "Psychology, politics, sociology", True), ("Computer Science", "cpu", "Software, AI, data", True),
          ("Business & Economics", "brief", "Economics, management, finance", False), ("Engineering", "ruler", "Mechanical, civil, electrical", False),
          ("Medicine & Health", "steth", "Medicine, nursing, dentistry", False), ("Natural Sciences", "flask", "Biology, chemistry, physics", True),
          ("Law", "scale", "Law, legal studies", False), ("Arts & Humanities", "palette", "History, languages, music", False)]
ob_css = """.ob{padding-block:20px 120px;display:flex;flex-direction:column;gap:20px}
.tiles{display:flex;flex-direction:column;gap:10px}
.bottom{position:fixed;left:0;right:0;bottom:0;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:var(--surface);border-top:1px solid var(--border);display:flex;align-items:center;gap:12px}
.bottom .ib-btn{flex:1}"""
tiles = "".join(f'<button class="ib-tile" role="checkbox" aria-checked="{"true" if on else "false"}"><span class="ib-tile__icon">{i(ic)}</span><span>{n}<small>{d}</small></span><span class="ib-tile__check">{i("check")}</span></button>' for n, ic, d, on in fields)
body = f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}<div class="ib-header__actions"><a href="#" style="font-weight:600;font-size:.9375rem">Save and exit</a></div></div></header>
<main class="wrap ob"><div class="ib-stepper"><div class="ib-stepper__meta"><span><b>Step 1 of 3</b> · Study interests</span><span>About 3 minutes</span></div>
<div class="ib-stepper__bar"><span data-state="current"></span><span></span><span></span></div></div>
<div><h1 class="t-display-lg">What would you like to study?</h1><p class="muted" style="margin-top:8px">Choose up to 5 fields. You can change them at any time.</p></div>
<div class="tiles" role="group" aria-label="Fields of study">{tiles}</div></main>
<div class="bottom"><span class="ib-hint"><b class="num" style="color:var(--fg)">3 of 5</b> chosen</span><button class="ib-btn ib-btn--primary">Continue{i("arrow")}</button></div>'''
page("onboarding-fields-mobile.html", "Onboarding fields", body, ob_css)

# ===================== 8. onboarding step 3 (desktop) =====================
subjects = [("1", "Studies in language and literature", "English A: Literature", "HL", 6),
            ("2", "Language acquisition", "Spanish B", "SL", 6),
            ("3", "Individuals and societies", "Psychology", "HL", 7),
            ("4", "Sciences", "Biology", "HL", 6),
            ("5", "Mathematics", "Mathematics: Analysis and Approaches", "SL", 5),
            ("6", "The arts, or a second subject from groups 1–4", "Chemistry", "SL", 6)]


def seg(options, checked, danger=False, label=""):
    return f'<div class="ib-seg{" ib-seg--danger" if danger else ""}" role="radiogroup" aria-label="{label}">' + "".join(
        f'<button class="ib-seg__opt" role="radio" aria-checked="{"true" if str(o) == str(checked) else "false"}">{o}</button>' for o in options) + "</div>"


rows = "".join(f'''<div class="subj"><div class="ib-field"><div class="grp"><span class="gnum">{g}</span><span>Group {g} · {gname}</span></div><select class="ib-select" style="width:100%" aria-label="Group {g} subject"><option>{s}</option></select></div>
{seg(["HL", "SL"], lvl, label="Level")}{seg([1, 2, 3, 4, 5, 6, 7], gr, label="Predicted grade")}</div>''' for g, gname, s, lvl, gr in subjects)
st3_css = """.ob{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:40px;align-items:start;padding-block:28px 64px}
.subjs{display:flex;flex-direction:column;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface)}
.subj{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:14px;align-items:end;padding:14px 16px;border-top:1px solid var(--border)}
.subj:first-child{border-top:0}
.grp{display:flex;gap:10px;align-items:center;font-size:.8125rem;color:var(--fg-muted);line-height:1.3}
.gnum{width:26px;height:26px;border-radius:50%;background:var(--primary-soft);color:var(--primary-soft-fg);display:grid;place-items:center;font-weight:800;font-size:.8125rem;flex:none}
.core{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}
.corecard{border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface);padding:16px;display:flex;flex-direction:column;gap:10px}
.sum{position:sticky;top:88px;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface);padding:22px;display:flex;flex-direction:column;gap:16px}
.total{display:flex;align-items:baseline;gap:8px}
.checks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;font-size:.9375rem}
.checks li{display:flex;gap:8px;align-items:flex-start}.checks svg.i{color:var(--success);margin-top:3px}
.break{display:grid;grid-template-columns:1fr auto;gap:6px;font-size:.9375rem;font-variant-numeric:tabular-nums}
.break span:nth-child(even){font-weight:700;text-align:right}"""
body = f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}<div class="ib-header__actions"><a href="#" style="font-weight:600;font-size:.9375rem">Save and exit</a></div></div></header>
<main class="wrap-app"><div class="ib-stepper" style="padding-top:24px;max-width:720px"><div class="ib-stepper__meta"><span><b>Step 3 of 3</b> · Your IB Diploma</span><span><a href="#">{i("left")}Back to locations</a></span></div>
<div class="ib-stepper__bar"><span data-state="done"></span><span data-state="done"></span><span data-state="current"></span></div>
<div class="ib-stepper__labels"><span>Study interests</span><span>Locations</span><span aria-current="step">Your IB Diploma</span></div></div>
<div class="ob"><div><h1 class="t-display-lg">Your subjects and predicted grades</h1><p class="muted" style="margin:8px 0 20px">One subject from each group. Most students take three at Higher Level (HL).</p>
<div class="subjs">{rows}</div>
<div class="core"><div class="corecard"><div><b>Theory of Knowledge</b><p class="ib-hint">Predicted grade</p></div>{seg(["A", "B", "C", "D", "E"], "B", label="TOK grade")}</div>
<div class="corecard"><div><b>Extended Essay</b><p class="ib-hint">Predicted grade</p></div>{seg(["A", "B", "C", "D", "E"], "A", label="EE grade")}</div></div></div>
<aside class="sum" aria-live="polite"><div><p class="ib-hint">Predicted total</p><div class="total"><span class="t-stat-xl">39</span><span class="muted num">of 45</span></div></div>
<div class="break"><span>Six subjects</span><span>36</span><span>TOK B + EE A</span><span>+3</span><span>Higher Level</span><span>19 (need 12)</span><span>Standard Level</span><span>17 (need 9)</span></div>
<ul class="checks"><li>{i("check")}Three subjects at Higher Level</li><li>{i("check")}No grade 1, at most two grade 2s</li><li>{i("check")}Meets every diploma rule</li></ul>
<button class="ib-btn ib-btn--primary ib-btn--block ib-btn--lg">See my matches{i("arrow")}</button><p class="ib-hint" style="text-align:center">Saved automatically as you go.</p></aside></div></main>'''
page("onboarding-grades-desktop.html", "Onboarding grades", body, st3_css)

# ===================== 9. onboarding step 3 (mobile) =====================
st3m_css = """.ob{padding-block:20px 140px;display:flex;flex-direction:column;gap:16px}
.subj{border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface);padding:14px;display:flex;flex-direction:column;gap:10px}
.grp{display:flex;gap:8px;align-items:center;font-size:.8125rem;color:var(--fg-muted)}
.gnum{width:24px;height:24px;border-radius:50%;background:var(--primary-soft);color:var(--primary-soft-fg);display:grid;place-items:center;font-weight:800;font-size:.75rem}
.two{display:grid;grid-template-columns:1fr;gap:8px}.two .ib-seg{width:100%}.two .ib-seg__opt{min-width:0;padding:0}
.bottom{position:fixed;left:0;right:0;bottom:0;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:var(--surface);border-top:1px solid var(--border);display:flex;align-items:center;gap:14px}
.bottom .ib-btn{flex:1}"""
mrows = "".join(f'''<div class="subj"><div class="grp"><span class="gnum">{g}</span>{gname}</div><select class="ib-select" style="width:100%"><option>{s}</option></select>
<div class="two">{seg(["HL", "SL"], lvl, label="Level")}{seg([1, 2, 3, 4, 5, 6, 7], gr, label="Grade")}</div></div>''' for g, gname, s, lvl, gr in subjects[:3])
body = f'''<header class="ib-header"><div class="wrap ib-header__in">{logo()}<div class="ib-header__actions"><a href="#" style="font-weight:600;font-size:.9375rem">Save and exit</a></div></div></header>
<main class="wrap ob"><div class="ib-stepper"><div class="ib-stepper__meta"><span><b>Step 3 of 3</b> · Your IB Diploma</span></div><div class="ib-stepper__bar"><span data-state="done"></span><span data-state="done"></span><span data-state="current"></span></div></div>
<h1 class="t-display-lg">Subjects and predicted grades</h1>{mrows}</main>
<div class="bottom"><div><p class="ib-hint" style="line-height:1.2">Total</p><p class="num" style="font:700 1.5rem/1 var(--font-display)">39<span class="muted" style="font:400 .875rem var(--font-sans)"> /45</span></p></div><button class="ib-btn ib-btn--primary">See my matches</button></div>'''
page("onboarding-grades-mobile.html", "Onboarding grades mobile", body, st3m_css)

# ===================== 10. landing desktop =====================
countries = [("🇬🇧", "United Kingdom", 312), ("🇳🇱", "Netherlands", 118), ("🇨🇦", "Canada", 104), ("🇦🇺", "Australia", 87), ("🇮🇪", "Ireland", 61), ("🇭🇰", "Hong Kong", 58), ("🇸🇬", "Singapore", 52), ("🇺🇸", "United States", 49)]
land_css = """.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;padding-block:64px 72px}
.lead{font-size:1.1875rem;line-height:1.6;color:var(--fg-muted);max-width:34rem;margin-top:20px}
.try{margin-top:28px;display:grid;grid-template-columns:150px 1fr auto;gap:10px;align-items:end;padding:14px;border:1px solid var(--border);border-radius:var(--radius-xl);background:var(--surface);box-shadow:var(--shadow-md);max-width:560px}
.try .ib-label{font-size:.8125rem}
.trust{display:flex;gap:18px;margin-top:16px;font-size:.875rem;color:var(--fg-muted)}
.trust span{display:inline-flex;gap:6px;align-items:center}.trust svg.i{color:var(--success)}
.preview{position:relative;padding:28px;border-radius:28px;background:linear-gradient(160deg,var(--primary-soft),var(--surface-muted));border:1px solid var(--border)}
.preview .ib-pcard{box-shadow:var(--shadow-md)}
.preview .float{position:absolute;right:-18px;top:-22px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);padding:12px 14px;display:flex;gap:10px;align-items:center}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);border-radius:var(--radius-xl);background:var(--surface)}
.stats div{padding:22px 24px;border-left:1px solid var(--border)}.stats div:first-child{border-left:0}
.stats b{display:block;font:700 2rem/1 var(--font-display);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.stats span{color:var(--fg-muted);font-size:.9375rem}
.sec{padding-block:88px}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:36px}
.step{border:1px solid var(--border);border-radius:var(--radius-xl);background:var(--surface);padding:24px;display:flex;flex-direction:column;gap:12px}
.step .n{font:800 .8125rem/1 var(--font-sans);color:var(--primary);letter-spacing:.08em}
.guides{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:32px}
.guide{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface);text-decoration:none;color:var(--fg)}
.guide .fl{font-size:1.75rem}.guide small{display:block;color:var(--fg-muted)}
.band{background:var(--surface-inverse);color:var(--fg-on-inverse);border-radius:28px;padding:48px;display:grid;grid-template-columns:1.2fr .8fr;gap:32px;align-items:center}
.band p{opacity:.82}
.note{max-width:44rem;margin:0 auto;text-align:left;border-left:0;padding:0}
.note blockquote{margin:0;font:500 1.375rem/1.5 var(--font-display);letter-spacing:-.01em}
"""
body = header_public() + f'''<main><div class="wrap"><section class="hero"><div>
<span class="ib-badge ib-badge--highlight">{i("check")}Requirements updated for 2027 entry</span>
<h1 class="t-display-2xl" style="margin-top:18px">Find university programs that fit your <span class="hl">IB Diploma</span></h1>
<p class="lead">Enter your predicted grades once. We check the minimum points, HL and SL subject requirements and TOK/EE bonus for 1,273 programs in 22 countries.</p>
<form class="try" aria-label="Try it"><div class="ib-field"><label class="ib-label" for="pts">Predicted points</label><input id="pts" class="ib-input num" value="36" inputmode="numeric"></div>
<div class="ib-field"><label class="ib-label" for="fld">Field</label><select id="fld" class="ib-select" style="width:100%"><option>Psychology</option></select></div>
<button class="ib-btn ib-btn--primary" type="submit">See programs{i("arrow")}</button></form>
<div class="trust"><span>{i("check")}Free for students</span><span>{i("check")}No account needed to browse</span><span>{i("check")}Official university sources</span></div></div>
<div class="preview">{pcard(P[0], logged_in=True, saved=True)}<div style="height:14px"></div>{pcard(P[1], logged_in=True)}
<div class="float"><div class="ib-score" data-tier="strong" style="--pct:86"><span class="ib-score__ring" data-value="86%"></span><span class="ib-score__label">Strong match<small>for your 38 points</small></span></div></div></div></section></div>
<div class="wrap"><div class="stats"><div><b>1,273</b><span>programs with IB requirements</span></div><div><b>22</b><span>countries</span></div><div><b>24–45</b><span>the full points range</span></div><div><b>Free</b><span>for every student</span></div></div></div>
<section class="sec"><div class="wrap"><p class="t-overline" style="color:var(--primary)">How it works</p><h2 class="t-display-xl" style="margin-top:10px;max-width:22ch">Three steps from predicted grades to a shortlist</h2>
<div class="steps"><div class="step"><span class="n">STEP 1</span><h3 class="t-heading-md">Choose what to study</h3><p class="muted">Pick up to five fields, from Psychology to Engineering.</p></div>
<div class="step"><span class="n">STEP 2</span><h3 class="t-heading-md">Pick where</h3><p class="muted">Choose countries, or leave it open and see everywhere.</p></div>
<div class="step"><span class="n">STEP 3</span><h3 class="t-heading-md">Add your subjects</h3><p class="muted">HL and SL subjects, predicted grades, TOK and EE. We do the maths.</p></div></div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="row" style="justify-content:space-between;align-items:end"><div><p class="t-overline" style="color:var(--primary)">Country guides</p><h2 class="t-display-xl" style="margin-top:10px">How each country reads the IB</h2></div><a href="#" style="font-weight:600">All 22 guides{i("arrow")}</a></div>
<div class="guides">''' + "".join(f'<a class="guide" href="#"><span class="fl">{fl}</span><span><b>{n}</b><small>{c} programs</small></span></a>' for fl, n, c in countries) + f'''</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="band"><div><p class="t-overline" style="opacity:.7">For IB coordinators</p><h2 class="t-display-xl" style="margin-top:10px">See every student's shortlist in one place</h2><p style="margin-top:14px;max-width:44ch">Invite your cohort, review their matches and spot students who need a safer option. Free while we build it with schools.</p></div>
<div class="row" style="justify-content:flex-end"><a class="ib-btn ib-btn--inverse ib-btn--lg" href="#">Talk to us{i("arrow")}</a></div></div></div></section>
</main>''' + footer()
page("landing-desktop.html", "Landing", body, land_css)

# ===================== 11. landing mobile =====================
lm_css = land_css + """.hero{grid-template-columns:1fr;gap:28px;padding-block:28px 36px}
.try{grid-template-columns:1fr 1fr;}.try .ib-btn{grid-column:1/-1}
.trust{flex-direction:column;gap:6px}
.preview{padding:14px;border-radius:20px}.preview .float{display:none}
.stats{grid-template-columns:1fr 1fr}.stats div:nth-child(3){border-left:0}.stats div{border-top:1px solid var(--border)}
.stats b{font-size:1.5rem}"""
body = header_public(mobile=True) + f'''<main><div class="wrap"><section class="hero"><div>
<span class="ib-badge ib-badge--highlight">{i("check")}Updated for 2027 entry</span>
<h1 class="t-display-2xl" style="margin-top:14px">Find programs that fit your <span class="hl">IB Diploma</span></h1>
<p class="lead" style="font-size:1.0625rem">Enter your predicted grades once. We check points, HL/SL subjects and TOK/EE bonus for 1,273 programs in 22 countries.</p>
<form class="try" aria-label="Try it"><div class="ib-field"><label class="ib-label" for="p2">Predicted points</label><input id="p2" class="ib-input num" value="36"></div>
<div class="ib-field"><label class="ib-label" for="f2">Field</label><select id="f2" class="ib-select" style="width:100%"><option>Psychology</option></select></div>
<button class="ib-btn ib-btn--primary ib-btn--lg" type="submit">See programs{i("arrow")}</button></form>
<div class="trust"><span>{i("check")}Free for students</span><span>{i("check")}No account needed to browse</span></div></div>
<div class="preview">{pcard_mobile(P[0], logged_in=True, saved=True)}</div></section></div>
<div class="wrap"><div class="stats"><div><b>1,273</b><span>programs</span></div><div><b>22</b><span>countries</span></div><div><b>24–45</b><span>points range</span></div><div><b>Free</b><span>for students</span></div></div></div><div style="height:40px"></div></main>'''
page("landing-mobile.html", "Landing mobile", body, lm_css)

# ===================== 12. matches mobile (signed in) =====================
mm_css = """.top{padding-block:20px 8px;display:flex;flex-direction:column;gap:14px}
.profile{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface)}
.profile b{font-variant-numeric:tabular-nums}
.tiers{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
.list{display:flex;flex-direction:column;gap:12px;padding-block:8px 100px}"""
body = header_app(mobile=True) + f'''<main class="wrap"><div class="top"><h1 class="t-display-lg">Your matches</h1>
<div class="profile"><div style="flex:1"><b>39 points</b> <span class="muted">· 3 HL · Psychology, CS · UK, NL</span></div><a class="ib-btn ib-btn--ghost ib-btn--sm" href="#">{i("pencil")}Edit</a></div>
<div class="tiers" role="group" aria-label="Filter by match"><button class="ib-chip" aria-pressed="true">All <span class="count">48</span></button><button class="ib-chip" aria-pressed="false">Strong <span class="count">14</span></button><button class="ib-chip" aria-pressed="false">Good <span class="count">21</span></button><button class="ib-chip" aria-pressed="false">Possible <span class="count">13</span></button></div></div>
<div class="list">{pcard_mobile(P[1], logged_in=True)}{pcard_mobile(P[0], logged_in=True, saved=True)}{pcard_mobile(P[2], logged_in=True)}</div></main>''' + tabbar("matches")
page("matches-mobile.html", "Matches mobile", body, mm_css)

# dark-theme sample of the search page (shows the dark tokens)
page("search-mobile-dark.html", "Search mobile dark", header_public(mobile=True) + f'''<main class="wrap"><div class="top" style="padding-block:20px 8px;display:flex;flex-direction:column;gap:12px"><h1 class="t-display-lg">Your matches</h1>
<div class="row"><button class="ib-chip" aria-pressed="true">All <span class="count">48</span></button><button class="ib-chip" aria-pressed="false">Strong <span class="count">14</span></button><button class="ib-chip" aria-pressed="false">Good <span class="count">21</span></button></div></div>
<div style="display:flex;flex-direction:column;gap:12px;padding-block:8px 100px">{pcard_mobile(P[0], logged_in=True, saved=True)}{pcard_mobile(P[3], logged_in=True)}</div></main>''' + tabbar("matches"), "", theme="dark")
print("wrote", sorted(os.listdir(OUT)))
