# Phase 1 setup — accounts only you can create

I can't sign up for third-party services on your behalf, so these steps are yours. Everything else (code, schema, auth logic) is already built and waiting on these.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up / sign in.
2. Create a new project (any region close to you; free tier is fine).
3. Once it's provisioned, go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key
4. Copy `.env.local.example` to `.env.local` in this `web/` folder and paste those two values in.

## 2. Run the database migrations

1. In the Supabase dashboard, open **SQL Editor**.
2. Paste and run `supabase/migrations/0001_init.sql` first.
3. Then paste and run `supabase/migrations/0002_seed_events.sql`.
4. Confirm in **Table Editor** that `profiles`, `events` (37 rows), `season_members`, `mock_results`, and `conference_results` all exist.

## 3. Create your own officer account

1. In Supabase, go to **Authentication → Users → Add user**, create yourself with an email/password.
2. In **Table Editor → profiles**, insert a row: `id` = the user ID Supabase just created, `full_name` = your name, `role` = `officer`.
3. That's what makes the JWT-role trigger fire and lets `/officer` recognize you.

## 4. Run it locally

```bash
cd web
npm run dev
```

Visit `http://localhost:3000`, sign in at `/login`, and you should land on `/officer`.

## 5. Deploy to Vercel (when ready to go live)

**The live site:** `https://norristown-deca-nahs-deca.vercel.app` (project: `norristown-deca`, team: `nahs-deca`). The plain `norristown-deca.vercel.app` alias should also work once Vercel's domain cache catches up after a rename — if it 404s with `DEPLOYMENT_NOT_FOUND`, that's just propagation lag, not a real problem.

**Deploy via the CLI, not the dashboard's GitHub import.** We tried the normal "Import Git Repository" flow first and it repeatedly produced a broken project (valid-looking build logs, but every route 404'd at the edge with `Code: NOT_FOUND`, even after fixing Root Directory, branch settings, and deployment protection). Recreating the project from scratch via the CLI fixed it immediately — the dashboard import path for this repo is not trustworthy, don't retry it without a good reason.

To deploy a new build:

```bash
cd web
npx vercel login      # first time only — approves your browser session
npx vercel link       # first time only — links this folder to the norristown-deca project
npx vercel --prod
```

Run this from inside `web/`, not the repo root. Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are already set on the `norristown-deca` project in Vercel — add more with `npx vercel env add <NAME> production`.

Nothing here costs money at chapter scale (Supabase and Vercel free tiers are both generous enough for this).
