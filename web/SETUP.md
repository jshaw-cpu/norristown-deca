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

1. Push this branch (`website-rebuild-nextjs`) to GitHub.
2. Go to [vercel.com](https://vercel.com), sign up with your GitHub account, and import this repo.
3. Set the **Root Directory** to `web` in the import settings (the repo root is the old static site, not this app).
4. Add the same two environment variables from `.env.local` in Vercel's project settings.
5. Deploy. Vercel gives you a live URL immediately; a custom domain can be added later in Vercel's domain settings.

Nothing in steps 1–5 costs money at chapter scale (Supabase and Vercel free tiers are both generous enough for this).
