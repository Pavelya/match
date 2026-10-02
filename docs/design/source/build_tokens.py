"""Generate every token file from one source.

Reads palette.json (from palette.py) and the scales below. Writes:
  ../tokens/tokens.css          CSS custom properties, light + dark (used by the mockups)
  ../tokens/ibmatch.tokens.json W3C DTCG 2025.10 format (tooling-neutral)
  ../tokens/theme.css           Tailwind v4 proposal for app/globals.css (task DS-1)
  ../tokens/ds-tokens.json      list-shaped tokens for the Design System artifact
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "tokens")
os.makedirs(OUT, exist_ok=True)
pal = json.load(open(os.path.join(HERE, "palette.json")))
PRIM, SEM = pal["primitives"], pal["semantic"]

FONTS = {
    "display": "'Bricolage Grotesque', 'Atkinson Hyperlegible Next', ui-sans-serif, system-ui, sans-serif",
    "sans": "'Atkinson Hyperlegible Next', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
    "mono": "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
}

# name, family, size (rem or clamp), line-height, weight, tracking, usage
TYPE = [
    ("display-2xl", "display", "clamp(2.5rem, 1.85rem + 2.6vw, 4rem)", "1.02", 700, "-0.025em", "Marketing hero H1 only. 40px on phones to 64px on desktop."),
    ("display-xl", "display", "clamp(2rem, 1.6rem + 1.6vw, 3rem)", "1.06", 700, "-0.02em", "Marketing section headings (H2) and country-guide H1."),
    ("display-lg", "display", "clamp(1.75rem, 1.55rem + 0.8vw, 2.25rem)", "1.1", 650, "-0.015em", "App page titles (H1): Search programs, Your matches, program name."),
    ("heading-lg", "display", "1.5rem", "1.25", 650, "-0.01em", "Section headings (H2) inside app pages and guides."),
    ("heading-md", "sans", "1.25rem", "1.3", 700, "0", "Card titles in detail views, dialog titles (H3)."),
    ("heading-sm", "sans", "1.125rem", "1.35", 700, "0", "Program card title, sub-sections (H3/H4)."),
    ("body-lg", "sans", "1.125rem", "1.6", 400, "0", "Lead paragraphs on marketing pages and guides."),
    ("body", "sans", "1rem", "1.6", 400, "0", "Default running text, form values. Max line length 68ch."),
    ("body-sm", "sans", "0.875rem", "1.5", 400, "0", "Secondary text: university name, meta lines, hints, table cells."),
    ("label", "sans", "0.9375rem", "1.25", 600, "0", "Buttons, form labels, nav items, chips."),
    ("caption", "sans", "0.8125rem", "1.4", 500, "0.005em", "Badges, timestamps, footnotes. Never the only place essential information appears."),
    ("overline", "sans", "0.75rem", "1.3", 700, "0.08em", "Uppercase eyebrows above a heading. One per section, at most."),
    ("stat-xl", "display", "2.75rem", "1", 700, "-0.02em", "Big numbers: match score, total IB points. Tabular figures."),
    ("stat-md", "display", "1.375rem", "1.1", 700, "-0.01em", "Points requirement on program cards (IB 37+). Tabular figures."),
]

SPACE = [("space-0.5", "2px", "Hairline gaps (icon to badge text)."), ("space-1", "4px", "Tight inline gaps."),
         ("space-2", "8px", "Gap inside chips and buttons; between label and input."),
         ("space-3", "12px", "Gap between related rows (meta lines in a card)."),
         ("space-4", "16px", "Mobile page gutter; card padding on phones; default stack gap."),
         ("space-5", "20px", "Card padding on desktop."), ("space-6", "24px", "Desktop gutter; gap between cards."),
         ("space-8", "32px", "Gap between page sections in the app."), ("space-12", "48px", "Marketing section padding on phones."),
         ("space-16", "64px", "Marketing section padding on tablet."), ("space-24", "96px", "Marketing section padding on desktop.")]

RADIUS = [("radius-sm", "6px", "Badges, small tags, the grade buttons inside a segmented control."),
          ("radius-md", "10px", "Buttons, inputs, selects, segmented controls, menu items."),
          ("radius-lg", "14px", "Cards, program cards, callouts, dropdown panels."),
          ("radius-xl", "20px", "Dialogs, bottom sheets, marketing feature panels."),
          ("radius-full", "9999px", "Chips, avatars, switches and the score ring only. Not buttons.")]

SHADOW = [("shadow-xs", "0 1px 2px rgb(16 24 40 / 0.06)", "Inputs and buttons at rest (outline variants)."),
          ("shadow-sm", "0 1px 3px rgb(16 24 40 / 0.08), 0 1px 2px rgb(16 24 40 / 0.04)", "Cards at rest."),
          ("shadow-md", "0 8px 20px -6px rgb(16 24 40 / 0.14), 0 2px 6px -2px rgb(16 24 40 / 0.06)", "Card hover, sticky bars, dropdowns."),
          ("shadow-lg", "0 24px 48px -16px rgb(16 24 40 / 0.24)", "Dialogs and bottom sheets.")]

LAYOUT = [("container-app", "1200px", "Max width of app pages (search, matches, program detail)."),
          ("container-wide", "1280px", "Max width of marketing pages and the header."),
          ("container-prose", "42rem", "Max width of running text: descriptions, guides, legal pages (about 68 characters)."),
          ("header-height", "64px", "Site and app header."), ("tabbar-height", "64px", "Mobile bottom tab bar, plus the safe-area inset."),
          ("tap-target", "44px", "Minimum height of buttons, chips and tab-bar items on touch screens.")]

MOTION = [("duration-fast", "150ms"), ("duration-base", "250ms"), ("duration-slow", "400ms"),
          ("ease-out", "cubic-bezier(0.2, 0.8, 0.2, 1)"), ("ease-in-out", "cubic-bezier(0.65, 0, 0.35, 1)")]

ZINDEX = [("z-sticky", "20", "Sticky filter bar, sticky summary."), ("z-header", "30", "Header and bottom tab bar."),
          ("z-overlay", "40", "Sheet and dialog scrim."), ("z-modal", "50", "Dialog, sheet."), ("z-toast", "60", "Toasts.")]


def css_vars(theme):
    lines = []
    for name, d in SEM.items():
        lines.append(f"  --{name}: {PRIM[d[theme]]['hex']};")
    return "\n".join(lines)


# ---------- tokens.css (mockups, previews) ----------
css = ["/* IB Match design tokens (proposal, October 2026). Generated by build_tokens.py: edit the source, not this file. */",
       ":root, [data-theme=\"light\"] {", css_vars("light"), "  color-scheme: light;", "}",
       "[data-theme=\"dark\"] {", css_vars("dark"), "  color-scheme: dark;", "}",
       ":root {"]
for k, v in FONTS.items():
    css.append(f"  --font-{k}: {v};")
for n, fam, size, lh, w, tr, _ in TYPE:
    css.append(f"  --text-{n}: {size}; --text-{n}--line-height: {lh}; --text-{n}--weight: {w}; --text-{n}--tracking: {tr};")
for n, v, _ in SPACE:
    css.append(f"  --{n.replace('.', '_')}: {v};")
for n, v, _ in RADIUS:
    css.append(f"  --{n}: {v};")
for n, v, _ in SHADOW:
    css.append(f"  --{n}: {v};")
for n, v, _ in LAYOUT:
    css.append(f"  --{n}: {v};")
for n, v in MOTION:
    css.append(f"  --{n}: {v};")
for n, v, _ in ZINDEX:
    css.append(f"  --{n}: {v};")
css.append("}")
for n, fam, size, lh, w, tr, _ in TYPE:
    extra = " font-variant-numeric: tabular-nums;" if n.startswith("stat") else ""
    extra += " text-transform: uppercase;" if n == "overline" else ""
    extra += " text-wrap: balance;" if n.startswith(("display", "heading")) else ""
    css.append(f".t-{n} {{ font-family: var(--font-{fam}); font-size: {size}; line-height: {lh}; font-weight: {w}; letter-spacing: {tr};{extra} }}")
open(os.path.join(OUT, "tokens.css"), "w").write("\n".join(css) + "\n")


# ---------- DTCG 2025.10 ----------
def dtcg_color(hx, oklch):
    L, C, H = oklch.replace("oklch(", "").replace(")", "").split()
    return {"colorSpace": "oklch", "components": [float(L), float(C), float(H)], "alpha": 1, "hex": hx}


dt = {"$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
      "$description": "IB Match design tokens, proposal of October 2026. Primitives, then semantic tokens per theme (light, dark). Source: docs/design/design-audit-report-2026-10.md.",
      "primitive": {"color": {"$type": "color"}},
      "semantic": {"light": {"$type": "color"}, "dark": {"$type": "color"}},
      "font": {"$type": "fontFamily"}, "typography": {"$type": "typography"},
      "space": {"$type": "dimension"}, "radius": {"$type": "dimension"}, "shadow": {}, "duration": {"$type": "duration"}}
for k, v in PRIM.items():
    dt["primitive"]["color"][k] = {"$value": dtcg_color(v["hex"], v["oklch"])}
for name, d in SEM.items():
    for theme in ("light", "dark"):
        dt["semantic"][theme][name] = {"$value": "{primitive.color.%s}" % d[theme], "$description": d["usage"]}
for k, v in FONTS.items():
    dt["font"][k] = {"$value": [s.strip().strip("'") for s in v.split(",")]}
for n, fam, size, lh, w, tr, usage in TYPE:
    px = size if not size.endswith("rem") else str(float(size[:-3]) * 16) + "px"
    dt["typography"][n] = {"$value": {"fontFamily": "{font.%s}" % fam, "fontSize": size if size.startswith("clamp") else {"value": float(px[:-2]), "unit": "px"},
                                      "fontWeight": w, "lineHeight": float(lh), "letterSpacing": {"value": float(tr.replace("em", "") or 0), "unit": "em"} if tr != "0" else {"value": 0, "unit": "px"}},
                           "$description": usage}
for n, v, usage in SPACE:
    dt["space"][n] = {"$value": {"value": float(v[:-2]), "unit": "px"}, "$description": usage}
for n, v, usage in RADIUS:
    dt["radius"][n] = {"$value": {"value": float(v[:-2]), "unit": "px"}, "$description": usage}
for n, v, usage in SHADOW:
    dt["shadow"][n] = {"$type": "shadow", "$value": v, "$description": usage + " (CSS string; convert to DTCG shadow objects if a tool needs them)"}
for n, v in MOTION:
    if v.endswith("ms"):
        dt["duration"][n] = {"$value": {"value": float(v[:-2]), "unit": "ms"}}
json.dump(dt, open(os.path.join(OUT, "ibmatch.tokens.json"), "w"), indent=2)

# ---------- Tailwind v4 theme proposal ----------
tw = ["/*",
      " * IB Match theme — PROPOSAL (October 2026). Not wired into the app yet.",
      " * Task DS-1 in docs/tasks/DESIGN_tasks.md replaces the colour/radius block of app/globals.css with this.",
      " * Semantic variables switch per theme; Tailwind utilities read them through @theme inline,",
      " * so `bg-surface`, `text-fg-muted`, `border-border-strong`, `bg-primary` etc. work in light and dark.",
      " */",
      "", ":root {"]
for name, d in SEM.items():
    tw.append(f"  --{name}: {PRIM[d['light']]['oklch']}; /* {PRIM[d['light']]['hex']} */")
tw.append("}")
tw.append("")
tw.append(".dark {")
for name, d in SEM.items():
    tw.append(f"  --{name}: {PRIM[d['dark']]['oklch']}; /* {PRIM[d['dark']]['hex']} */")
tw.append("}")
tw.append("")
tw.append("@theme inline {")
for name in SEM:
    tw.append(f"  --color-{name}: var(--{name});")
tw.append("  --font-sans: var(--font-atkinson), ui-sans-serif, system-ui, sans-serif;")
tw.append("  --font-display: var(--font-bricolage), var(--font-atkinson), ui-sans-serif, system-ui, sans-serif;")
for n, v, _ in RADIUS:
    if n != "radius-full":
        tw.append(f"  --{n}: {v};")
for n, v, _ in SHADOW:
    tw.append(f"  --{n}: {v};")
for n, fam, size, lh, w, tr, _ in TYPE:
    tw.append(f"  --text-{n}: {size};")
    tw.append(f"  --text-{n}--line-height: {lh};")
    tw.append(f"  --text-{n}--font-weight: {w};")
    if tr != "0":
        tw.append(f"  --text-{n}--letter-spacing: {tr};")
tw.append("}")
open(os.path.join(OUT, "theme.css"), "w").write("\n".join(tw) + "\n")

# ---------- Design System artifact tokens.json (list-shaped) ----------
ds = {"name": "IB Match", "version": 1,
      "meta": {"source": "proposal", "basis": "github pavelya/match app/globals.css + live audit, 2 October 2026"},
      "color": {"themes": [{"id": "light", "name": "Light"}, {"id": "dark", "name": "Dark"}], "tokens": []},
      "type": {"fonts": [], "families": {"display": "\"Bricolage Grotesque\", \"Atkinson Hyperlegible Next\", system-ui, sans-serif",
                                         "sans": "\"Atkinson Hyperlegible Next\", system-ui, -apple-system, \"Segoe UI\", sans-serif"},
               "groups": []},
      "spacing": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in SPACE]},
      "radius": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in RADIUS]},
      "shadow": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in SHADOW]},
      "layout": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in LAYOUT]},
      "zIndex": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in ZINDEX]}}
for name, d in SEM.items():
    ds["color"]["tokens"].append({"name": name, "value": {"light": PRIM[d["light"]]["hex"], "dark": PRIM[d["dark"]]["hex"]}, "usage": d["usage"]})
# brand ramp + ink ramp as reference primitives (same in both themes)
for k in ["blue-50", "blue-100", "blue-200", "blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800", "blue-900", "blue-950",
          "ink-25", "ink-50", "ink-100", "ink-200", "ink-300", "ink-400", "ink-500", "ink-600", "ink-700", "ink-800", "ink-900", "ink-950"]:
    ds["color"]["tokens"].append({"name": k, "value": PRIM[k]["hex"], "usage": "Primitive. Use the semantic tokens above in components; primitives are for illustrations and charts."})


def rem_to_px(s):
    if s.startswith("clamp"):
        # use the max for the specimen; the clamp is in usage
        mx = s.split(",")[-1].strip(" )")
        return str(round(float(mx[:-3]) * 16)) + "px"
    return str(round(float(s[:-3]) * 16, 2)).rstrip("0").rstrip(".") + "px"


groups = {"Display": [], "Headings": [], "Text": [], "Numbers": []}
for n, fam, size, lh, w, tr, usage in TYPE:
    g = "Display" if n.startswith("display") else "Headings" if n.startswith("heading") else "Numbers" if n.startswith("stat") else "Text"
    st = {"name": n, "family": fam, "fontSize": rem_to_px(size), "lineHeight": lh, "fontWeight": w,
          "usage": usage + (f" Fluid: {size}." if size.startswith("clamp") else "")}
    if tr != "0":
        st["letterSpacing"] = tr
    samples = {"display-2xl": "Find programs that fit your IB Diploma", "display-xl": "Study in the Netherlands with the IB Diploma",
               "display-lg": "Psychology (BSc Hons)", "heading-lg": "Academic requirements", "heading-md": "Why this is a strong match",
               "heading-sm": "Bachelor of Laws (LLB)", "body-lg": "Enter your predicted grades once. We check HL and SL requirements for 1,273 programs.",
               "body": "Applicants need 37 points with HL 6 6 5, including Mathematics: Analysis and Approaches.",
               "body-sm": "University of Edinburgh · Edinburgh, United Kingdom", "label": "Find my matches",
               "caption": "Checked for 2027 entry", "overline": "Country guide", "stat-xl": "86%", "stat-md": "IB 37+"}
    st["sample"] = samples[n]
    groups[g].append(st)
for g, styles in groups.items():
    ds["type"]["groups"].append({"name": g, "family": "display" if g in ("Display", "Numbers") else "sans", "styles": styles})
json.dump(ds, open(os.path.join(OUT, "ds-tokens.json"), "w"), indent=2)
print("wrote", sorted(os.listdir(OUT)))
