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

## What NOT to do
- Don't split into multiple files or introduce a bundler unless explicitly asked.
- Don't add npm/node tooling.
- Don't change the font stack or color palette without confirmation.
