# CLAUDE.md — Norristown DECA Recruitment Site

## Project
Single-file HTML recruitment website for Norristown Area High School DECA chapter, served via GitHub Pages at the repo root (`index.html`).

## Stack
- Pure HTML/CSS/JS — no build step, no framework, no package.json
- Google Fonts: Archivo (headings) and Source Sans 3 (body)
- All styles are inline `<style>` in `index.html`; all scripts are inline `<script>`

## Brand constraints
- Primary blue: `#0072ce`
- Deep blue: `#005ba8`
- Night blue: `#003562`
- Silver (UI/text): `#52677c`
- Silver light: `#c7ccd1`
- Paper: `#ffffff`
- Mist (section bg): `#eef3f8`
- Ink (body text): `#0a2740`
- Heading font: Archivo — weights 500/600/700/800/900
- Body font: Source Sans 3 — regular, semibold, bold, italic
- Do NOT introduce new colors outside this palette without asking.
- Favicon uses `#0072ce` blue with white "D" in Archivo/Montserrat.

## Conventions
- CSS custom properties defined in `:root` — reference variables, don't hardcode hex values.
- Clip-path `polygon(Npx 0, 100% 0, calc(100% - Npx) 100%, 0 100%)` is the chapter's signature parallelogram/skew button shape — preserve it on `.btn` and `.navbtn`.
- Scroll-reveal uses `.reveal` + `.reveal.in` classes toggled by IntersectionObserver.
- Marquee/ticker animations use `@keyframes scroll` with `translateX(-50%)`.

## Deployment
- GitHub Pages serves `index.html` from repo root.
- Large video files are git-ignored (see `.gitignore`).
- No CI pipeline; push to `main` deploys automatically.

## Assets
- `assets/Images/` is a legacy archive (chapter media back to ~2015) — nothing in `index.html` references it. All images actually shown on the live site are embedded inline as base64 in `index.html`.
- If a request mentions "gallery," "photos," or "images" without saying which, ask whether it means the embedded base64 images or the `assets/Images/` archive before touching either.

## Working practices
Follow these automatically, without being asked, on every change to this repo:
- Before editing, identify the target by its section `id` or exact heading text. If a request doesn't make that clear, ask or grep to pin it down before editing — don't guess from a vague description.
- For a single-fact change (a link, date, name, stat), quote the exact current text and confirm via grep whether it appears more than once in `index.html` before changing it.
- For a request with multiple unrelated parts (e.g. a design change plus a tooling change, or content plus brand), do them as separate steps and summarize each one before moving to the next — don't fold them into one silent edit.
- Before committing a brand/visual fix, list the specific off-palette colors, fonts, or shapes found. Get confirmation, then fix — don't auto-fix silently.
- After any edit, state what changed and where (section id, line range) instead of just saying "done." Since there's no CI, also state how you verified it (grep for stale references, local `serve.ps1` check, visual read of the diff).

## What NOT to do
- Don't split into multiple files or introduce a bundler unless explicitly asked.
- Don't add npm/node tooling.
- Don't change the font stack or color palette without confirmation.
