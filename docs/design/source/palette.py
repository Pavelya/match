"""IB Match proposed palette: OKLCH source of truth -> sRGB hex, gamut-mapped, with WCAG checks.

Outputs (next to this file):
  palette.json         resolved tokens per theme (oklch string + hex)
  ../tokens/contrast.md every text/ground pair checked, light and dark
"""
import json, math, os

HERE = os.path.dirname(os.path.abspath(__file__))


# ---------- colour maths ----------
def oklch_to_linear_srgb(L, C, H):
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return (
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def in_gamut(rgb, eps=1e-6):
    return all(-eps <= c <= 1 + eps for c in rgb)


def gamut_map(L, C, H):
    """Reduce chroma until the colour fits sRGB (keeps lightness and hue)."""
    if in_gamut(oklch_to_linear_srgb(L, C, H)):
        return C
    lo, hi = 0.0, C
    for _ in range(40):
        mid = (lo + hi) / 2
        if in_gamut(oklch_to_linear_srgb(L, mid, H)):
            lo = mid
        else:
            hi = mid
    return lo


def lin_to_srgb(c):
    c = min(max(c, 0.0), 1.0)
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def to_hex(L, C, H):
    C2 = gamut_map(L, C, H)
    r, g, b = (lin_to_srgb(x) for x in oklch_to_linear_srgb(L, C2, H))
    return "#%02x%02x%02x" % tuple(round(v * 255) for v in (r, g, b)), C2


def hex_to_lin(hx):
    hx = hx.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(hx[i:i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return out


def luminance(hx):
    r, g, b = hex_to_lin(hx)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


# ---------- the palette (primitives) ----------
BRAND_H = 259  # the logo's hue family (#3573E5 sits at ~259)
P = {
    # brand blue ramp
    "blue-50": (0.972, 0.016, BRAND_H), "blue-100": (0.940, 0.036, BRAND_H),
    "blue-200": (0.885, 0.070, BRAND_H), "blue-300": (0.800, 0.115, BRAND_H),
    "blue-400": (0.705, 0.160, BRAND_H), "blue-500": (0.600, 0.190, BRAND_H),
    "blue-600": (0.530, 0.200, 261), "blue-700": (0.465, 0.185, 263),
    "blue-800": (0.390, 0.150, 264), "blue-900": (0.310, 0.110, 265), "blue-950": (0.225, 0.070, 266),
    # cool neutral "ink" ramp, biased toward the brand hue
    "ink-0": (1.000, 0.000, 0), "ink-25": (0.985, 0.004, 255), "ink-50": (0.967, 0.007, 255),
    "ink-100": (0.937, 0.011, 256), "ink-200": (0.895, 0.015, 257), "ink-300": (0.820, 0.020, 258),
    "ink-400": (0.700, 0.024, 258), "ink-500": (0.600, 0.026, 259), "ink-600": (0.490, 0.028, 260),
    "ink-700": (0.395, 0.028, 261), "ink-800": (0.300, 0.028, 262), "ink-900": (0.220, 0.026, 263),
    "ink-950": (0.165, 0.022, 264), "ink-975": (0.135, 0.018, 264),
    # semantic hues
    "green-50": (0.965, 0.030, 158), "green-200": (0.880, 0.080, 158), "green-500": (0.680, 0.150, 156),
    "green-700": (0.500, 0.120, 156), "green-300d": (0.800, 0.130, 156), "green-950": (0.260, 0.045, 158),
    "amber-50": (0.975, 0.045, 85), "amber-200": (0.900, 0.110, 85), "amber-500": (0.780, 0.160, 75),
    "amber-700": (0.520, 0.120, 60), "amber-300d": (0.840, 0.140, 80), "amber-950": (0.270, 0.045, 70),
    "red-50": (0.965, 0.022, 25), "red-200": (0.880, 0.065, 25), "red-500": (0.640, 0.200, 27),
    "red-700": (0.520, 0.190, 27), "red-300d": (0.780, 0.120, 25), "red-950": (0.270, 0.060, 25),
    # the one accent: highlighter yellow (marketing highlights, "updated" badges)
    "sun-200": (0.950, 0.120, 102),
    "blue-logo": None, "sun-300": (0.915, 0.160, 100), "sun-800": (0.420, 0.080, 90),
}
HEX = {}
for k, v in P.items():
    if v is None:
        continue
    L, C, H = v
    hx, c2 = to_hex(L, C, H)
    HEX[k] = {"oklch": f"oklch({L:.3f} {c2:.3f} {H})", "hex": hx}
# the logo tile keeps its exact current colour (an existing brand asset)
HEX["blue-logo"] = {"oklch": "oklch(0.576 0.185 259)", "hex": "#3573e5"}

# ---------- semantic tokens per theme (alias -> primitive) ----------
SEM = {
    # surfaces
    "bg":             ("ink-25", "ink-975", "Page background."),
    "surface":        ("ink-0", "ink-950", "Cards, header, inputs: the default raised surface on `bg`."),
    "surface-muted":  ("ink-50", "ink-900", "Sunken areas: filter panels, quick-facts rows, table stripes."),
    "surface-strong": ("ink-100", "ink-800", "Hover fill for neutral controls, skeletons, chips at rest."),
    "surface-inverse": ("ink-950", "ink-50", "Footer and dark bands. Pair with `fg-on-inverse`."),
    # text
    "fg":             ("ink-900", "ink-50", "Primary text and headings on `bg`, `surface`, `surface-muted`."),
    "fg-muted":       ("ink-600", "ink-400", "Secondary text: university names, meta lines, hints. On `bg`, `surface`, `surface-muted`."),
    "fg-subtle":      ("ink-500", "ink-500", "Placeholder and disabled text only; never for information that must be read."),
    "fg-on-inverse":  ("ink-50", "ink-900", "Text on `surface-inverse`."),
    # lines
    "border":         ("ink-200", "ink-800", "Dividers and card outlines (decorative)."),
    "border-strong":  ("ink-500", "ink-500", "Input and selectable-tile outlines: 3:1 against `surface`."),
    # brand
    "primary":        ("blue-600", "blue-400", "Primary buttons, links, selected states, focus ring. Text on `surface` and `bg`."),
    "primary-hover":  ("blue-700", "blue-300", "Hover and pressed state of `primary` fills."),
    "on-primary":     ("ink-0", "ink-975", "Text and icons on `primary` fills."),
    "primary-soft":   ("blue-50", "blue-950", "Selected tiles, active nav pill, info callouts."),
    "primary-soft-fg": ("blue-700", "blue-200", "Text on `primary-soft`."),
    "brand-mark":     ("blue-logo", "blue-logo", "The logo tile and large brand graphics only (not text)."),
    "focus":          ("blue-600", "blue-300", "Focus outline: 2px solid, 2px offset, on every interactive element."),
    # status
    "success":        ("green-700", "green-300d", "Requirement met, strong match: text and icons on `surface`."),
    "success-soft":   ("green-50", "green-950", "Background of success callouts and met-requirement rows."),
    "warning":        ("amber-700", "amber-300d", "Partly met, deadlines, data that needs checking: text and icons."),
    "warning-soft":   ("amber-50", "amber-950", "Background of warning callouts."),
    "danger":         ("red-700", "red-300d", "Requirement not met, errors, destructive actions: text and icons."),
    "danger-soft":    ("red-50", "red-950", "Background of error callouts and unmet-requirement rows."),
    # accent
    "highlight":      ("sun-300", "sun-300", "Highlighter marker behind a key word in marketing headlines, and the 'Updated' badge. Always with `ink-900` text."),
    "on-highlight":   ("ink-900", "ink-900", "Text on `highlight`."),
}

themes = {"light": {}, "dark": {}}
for name, (lt, dk, usage) in SEM.items():
    themes["light"][name] = HEX[lt]["hex"]
    themes["dark"][name] = HEX[dk]["hex"]

# ---------- checks ----------
TEXT_PAIRS = [
    ("fg", ["bg", "surface", "surface-muted", "surface-strong"], 4.5),
    ("fg-muted", ["bg", "surface", "surface-muted"], 4.5),
    ("fg-on-inverse", ["surface-inverse"], 4.5),
    ("primary", ["bg", "surface", "surface-muted"], 4.5),
    ("on-primary", ["primary", "primary-hover"], 4.5),
    ("primary-soft-fg", ["primary-soft"], 4.5),
    ("success", ["surface", "success-soft"], 4.5),
    ("warning", ["surface", "warning-soft"], 4.5),
    ("danger", ["surface", "danger-soft"], 4.5),
    ("on-highlight", ["highlight"], 4.5),
    ("border-strong", ["surface", "bg"], 3.0),
    ("focus", ["surface", "bg", "surface-muted"], 3.0),
    ("brand-mark", ["surface"], 3.0),
]
rows, fails = [], []
for theme in ("light", "dark"):
    t = themes[theme]
    for fg, grounds, need in TEXT_PAIRS:
        for g in grounds:
            r = contrast(t[fg], t[g])
            ok = r >= need
            rows.append((theme, fg, g, t[fg], t[g], r, need, ok))
            if not ok:
                fails.append((theme, fg, g, round(r, 2), need))

# current colours, for the report
CURRENT = {
    "app primary #3573E5 on white": contrast("#3573e5", "#ffffff"),
    "marketing blue-600 #155DFC on white": contrast("#155dfc", "#ffffff"),
    "muted-foreground on white": None,
}

with open(os.path.join(HERE, "palette.json"), "w") as f:
    json.dump({"primitives": HEX, "semantic": {k: {"light": SEM[k][0], "dark": SEM[k][1], "usage": SEM[k][2]} for k in SEM},
               "themes": themes}, f, indent=2)

with open(os.path.join(os.path.dirname(HERE), "tokens", "contrast.md"), "w") as f:
    f.write("| Theme | Text token | Ground | Text | Ground | Ratio | Needs | Pass |\n|---|---|---|---|---|---|---|---|\n")
    for theme, fg, g, a, b, r, need, ok in rows:
        f.write(f"| {theme} | `{fg}` | `{g}` | `{a}` | `{b}` | {r:.2f}:1 | {need}:1 | {'yes' if ok else '**NO**'} |\n")

print("primitives:")
for k, v in HEX.items():
    print(f"  {k:12s} {v['hex']}  {v['oklch']}")
print("\nFAILS:", fails if fails else "none")
print("\ncurrent: app primary #3573E5 on white = %.2f:1, marketing #155DFC on white = %.2f:1" % (
    contrast("#3573e5", "#ffffff"), contrast("#155dfc", "#ffffff")))
for name in ("primary", "fg-muted", "border-strong", "success", "warning", "danger"):
    print(f"  {name:14s} light {themes['light'][name]}  dark {themes['dark'][name]}")
