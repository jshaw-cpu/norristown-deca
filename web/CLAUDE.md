@AGENTS.md

## Project-specific notes (NAHS DECA)

- This is the new chapter website, replacing the static `index.html` at the repo root over several phases — see `../CLAUDE.md` for the phase plan. Don't touch the repo root's `index.html` from here.
- Auth/authorization is two-layer by design: `proxy.ts` does a fast, cookie-only optimistic check; `src/lib/auth/dal.ts`'s `verifySession`/`requireRole`/`requireMemberTier` do the real DB-backed check and must be called from every tier-gated page, not just once in a shared layout (Next.js's own auth guide explains why layout-only checks aren't sufficient with Partial Rendering).
- Database schema mirrors the Chapter Operations Playbook Section 9.1 (Members/Events/Mock Results/Conference Results) — see `supabase/migrations/`. Keep it in sync with `Cowork OS/Competitions/Competitions Resources/2026-07-31-NAHS-DECA-Competitive-Intelligence.xlsx` rather than diverging.
- Brand tokens (colors, fonts, the skew-button clip-path) live in `src/app/globals.css` — same palette as the legacy site, not a redesign.
- I can't create Supabase/Vercel accounts — see `SETUP.md` for what's on the user to do.
