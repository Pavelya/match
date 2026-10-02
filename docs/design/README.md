# Design

The October 2026 design audit and the design system proposed for the refresh.

| Path | What |
| --- | --- |
| [`design-audit-report-2026-10.md`](design-audit-report-2026-10.md) | Findings, measurements, proposal, before/after images |
| [`../tasks/DESIGN_tasks.md`](../tasks/DESIGN_tasks.md) | The refresh as tasks, one Claude session each |
| `tokens/theme.css` | Tailwind 4 theme to adopt in `app/globals.css` (task DS-1) |
| `tokens/ibmatch.tokens.json` | The same tokens in the W3C Design Tokens format (2025.10) |
| `tokens/tokens.css` | Plain CSS variables and type classes used by the mockups |
| `tokens/contrast.md` | Every text and control pair checked against WCAG 2.2 AA, light and dark |
| `tokens/ds-tokens.json` | The tokens in the shape the Design System artifact reads |
| `mockups/*.html` | 14 static reference screens; open them in a browser (fonts load from Google Fonts) |
| `mockups/components.css` | Reference CSS for every component in the mockups (hand-written) |
| `images/before/` | The live site on 2 October 2026 |
| `images/after/` | The mockups rendered at 1440px and 390px |
| `source/` | Scripts that generate the tokens, the contrast table and the mockups |

Design system with live component previews: <https://claude.ai/artifact/AQnBycr6vVF2BopeyuR9kv>

## Regenerating

Change the palette or the scales in `source/palette.py` and `source/build_tokens.py`, then:

```bash
cd docs/design/source
python3 palette.py        # resolves OKLCH to hex, writes palette.json and ../tokens/contrast.md
python3 build_tokens.py   # writes ../tokens/*
python3 mockups.py        # writes ../mockups/*.html (components.css is edited by hand)
npx prettier --write ../tokens ../mockups
```

The scripts need Python 3.11 and nothing else. To re-render the PNGs, open a mockup in Chromium at
1440px (desktop) or 390px with device scale factor 2 (phones) and take a full-page screenshot.

## Status

Proposal only. The app still runs the old theme. Each task in `DESIGN_tasks.md` moves part of the
product onto this system; DS-23 updates this file with what has been implemented.
