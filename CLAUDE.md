# CLAUDE.md — Norristown DECA Website

## Project status: mid-migration

This repo is moving from a single static `index.html` to a full Next.js app with a real backend (Supabase), on a branch called `website-rebuild-nextjs`. The migration is phased so nothing public-facing breaks mid-build:

- **`main` branch, root `index.html`** — the live public recruitment site, still served by GitHub Pages. Leave this alone unless explicitly asked to edit the legacy site.
- **`website-rebuild-nextjs` branch, `web/` folder** — the new app. This is where new feature work happens.

Phases (see `2026-08-05-briefing-and-next-steps.md`-style planning docs in Cowork OS for the full plan):
0. New app built alongside the live site — done, no disruption.
1. Next.js + Vercel + Supabase foundation, auth, workbook data migrated in — done. Live at `https://norristown-deca-nahs-deca.vercel.app`.
2. Public tier: revamped recruitment site + live results/trends showcase.
3. Member/officer/parent tier feature work.
4. Retire GitHub Pages once 2–3 are stable.

## Stack (new app, `web/`)

- **Next.js 16** (App Router, TypeScript, Tailwind v4) — see `web/AGENTS.md` and `web/node_modules/next/dist/docs/` before assuming any convention from training data; this version has real breaking changes (e.g. `middleware.ts` → `proxy.ts`).
- **Supabase** — Postgres database + auth. Schema lives in `web/supabase/migrations/`, run manually in the Supabase SQL editor (see `web/SETUP.md`).
- **Vercel** — project `norristown-deca` (team `nahs-deca`). Deploy via the CLI from inside `web/` (`npx vercel --prod`) — the dashboard's GitHub-import flow reliably produced a broken deployment for this repo (build succeeded, every route 404'd), so don't use it. See `web/SETUP.md` for the exact commands.
- Four access tiers: public (no login), `member`, `officer`, `parent` — see `web/src/lib/auth/dal.ts` for the real (DB-backed) checks and `web/proxy.ts` for the fast optimistic check. Officers get member-tier access too; nobody else crosses tiers.

## Data model

The new app's tables mirror the Chapter Operations Playbook's Section 9.1 Competitive Intelligence schema (Members / Events / Mock Results / Conference Results), not a new invented model — the site is a frontend onto the same data the chapter already tracks in `2026-07-31-NAHS-DECA-Competitive-Intelligence.xlsx`. Keep them in sync rather than letting the site's schema drift from the workbook's.

## Legacy stack (`main` branch, root `index.html`) — still applies there

- Pure HTML/CSS/JS, no build step, no framework, no package.json.
- Google Fonts: Archivo (headings) and Source Sans 3 (body).
- All styles inline `<style>`, all scripts inline `<script>`.

## Brand constraints (apply to BOTH the legacy site and the new app)

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
- Clip-path `polygon(Npx 0, 100% 0, calc(100% - Npx) 100%, 0 100%)` is the chapter's signature parallelogram/skew button shape (`.btn-skew` in the new app, `.btn`/`.navbtn` in the legacy site) — preserve it.

## What NOT to do

- Don't edit the legacy `index.html` and the new `web/` app in the same change unless the task explicitly spans both — they're on different branches for a reason.
- Don't change the font stack or color palette without confirmation, in either codebase.
- Don't invent a data model for the new app that diverges from the Playbook Section 9.1 schema without confirmation.
- Don't create Vercel/Supabase/GitHub accounts — that's explicitly the user's step (see `web/SETUP.md`).
