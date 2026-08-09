-- Officer accountability review queue — Chapter Operations Playbook
-- Section 1, Discipline Process: verbal warning -> written warning ->
-- suspension/removal. Advisor-only tool (not visible to the officer an
-- entry is about) tracking real disciplinary records, so access is
-- deliberately narrow.
--
-- Run this in the Supabase SQL editor after 0001_init.sql and
-- 0002_seed_events.sql. Safe to re-run: uses IF NOT EXISTS / OR REPLACE /
-- DROP POLICY IF EXISTS throughout.

-- ---------------------------------------------------------------------
-- Advisor flag
-- ---------------------------------------------------------------------
--
-- "Advisor" isn't a distinct value in app_role (member | officer | parent)
-- because today the only officer account IS the advisor's. That won't
-- stay true once real student officers get accounts, so this flag is
-- what actually gates the review queue rather than role = 'officer' alone.

alter table public.profiles
  add column if not exists is_advisor boolean not null default false;

-- ---------------------------------------------------------------------
-- MANUAL STEP — run this once, after the ALTER above, with your own
-- Supabase auth user ID (Authentication -> Users -> copy the UUID):
--
--   update public.profiles set is_advisor = true where id = '<YOUR_AUTH_USER_ID>';
--
-- ---------------------------------------------------------------------

-- ---------------------------------------------------------------------
-- Officer Accountability
-- ---------------------------------------------------------------------

create table if not exists public.officer_accountability (
  id uuid primary key default gen_random_uuid(),
  officer_name text not null,          -- typed name, not linked to a profiles row —
                                        -- directors may not have an app account yet
  level text not null check (level in ('verbal', 'written', 'suspension')),
  reason text not null,
  incident_date date not null default current_date,
  timeline_note text,                  -- the Playbook's "agreed course of action
                                        -- with a timeline, generally two weeks"
  created_at timestamptz not null default now()
);

alter table public.officer_accountability enable row level security;

drop policy if exists "Advisor can manage accountability entries" on public.officer_accountability;
create policy "Advisor can manage accountability entries"
  on public.officer_accountability for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'officer' and p.is_advisor = true
    )
  );
