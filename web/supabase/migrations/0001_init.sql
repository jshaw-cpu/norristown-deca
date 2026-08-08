-- NAHS DECA website — initial schema
-- Run this in the Supabase project's SQL editor (Database > SQL Editor)
-- once the project exists. Mirrors the Competitive Intelligence workbook's
-- Members / Events / Mock Results / Conference Results tabs (Chapter
-- Operations Playbook Section 9.1) so the site can read the same data
-- model the chapter already uses, not a second, divergent one.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Roles and profiles
-- ---------------------------------------------------------------------

create type public.app_role as enum ('member', 'officer', 'parent');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null,
  member_id text,               -- links to the DECA Member ID used in the workbook, nullable for parents/new members
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Officers can read every profile"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'officer'
    )
  );

create policy "Officers can update any profile"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'officer'
    )
  );

-- Sync role into the JWT's app_metadata so proxy.ts can do a cheap,
-- cookie-only optimistic check without a DB round trip on every request.
-- The DAL (src/lib/auth/dal.ts) still re-checks against this table for
-- every real page load — this trigger only feeds the fast path.
create or replace function public.sync_role_to_jwt()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update auth.users
  set raw_app_meta_data =
    coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', new.role)
  where id = new.id;
  return new;
end;
$$;

create trigger on_profile_role_change
  after insert or update of role on public.profiles
  for each row
  execute function public.sync_role_to_jwt();

-- ---------------------------------------------------------------------
-- Events (Playbook 9.1 "Events" tab)
-- ---------------------------------------------------------------------

create table public.events (
  event_code text primary key,
  event_name text not null,
  category text not null,            -- Individual Series | Team Decision Making | Principles | Written
  cluster text not null,             -- Marketing | Finance | Hospitality and Tourism | Entrepreneurship | Business Management
  written_component boolean not null default false
);

alter table public.events enable row level security;

create policy "Anyone can read events"
  on public.events for select
  using (true);

create policy "Officers can manage events"
  on public.events for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'officer')
  );

-- ---------------------------------------------------------------------
-- Members (Playbook 9.1 "Members" tab — one row per member per season)
-- ---------------------------------------------------------------------

create table public.season_members (
  id uuid primary key default gen_random_uuid(),
  member_id text not null,
  member_name text not null,
  grade int,
  years_in_chapter int,
  season text not null,              -- e.g. '2026-27'
  event_code text references public.events(event_code),
  cluster text,
  tier text,
  baseline_exam_sept int,
  returned_next_year boolean,
  unique (member_id, season)
);

alter table public.season_members enable row level security;

create policy "Members can read their own season rows"
  on public.season_members for select
  using (
    member_id = (select p.member_id from public.profiles p where p.id = auth.uid())
  );

create policy "Officers can read and manage all season rows"
  on public.season_members for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'officer')
  );

-- ---------------------------------------------------------------------
-- Mock Results (Playbook 9.1 "Mock Results" tab)
-- ---------------------------------------------------------------------

create table public.mock_results (
  id uuid primary key default gen_random_uuid(),
  performance_date date not null,
  member_id text not null,
  member_name text not null,
  event_code text references public.events(event_code),
  judge text,                        -- real judge name, required per Playbook 9.3 entry discipline
  scenario text,
  opening int, diagnosis int, perf_indicators int, specificity int,
  quantification int, follow_up int, presence int, close int,
  total int generated always as (
    coalesce(opening,0) + coalesce(diagnosis,0) + coalesce(perf_indicators,0) +
    coalesce(specificity,0) + coalesce(quantification,0) + coalesce(follow_up,0) +
    coalesce(presence,0) + coalesce(close,0)
  ) stored,
  one_change_assigned text,
  created_at timestamptz not null default now()
);

alter table public.mock_results enable row level security;

create policy "Members can read their own mock results"
  on public.mock_results for select
  using (
    member_id = (select p.member_id from public.profiles p where p.id = auth.uid())
  );

create policy "Officers can read and manage all mock results"
  on public.mock_results for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'officer')
  );

-- ---------------------------------------------------------------------
-- Conference Results (Playbook 9.1 "Conference Results" tab)
-- NOTE: includes a `judge` column the original workbook was missing —
-- the competitive-intelligence-analyst agent is adding the same column
-- to the .xlsx in parallel with this migration so both stay in sync.
-- ---------------------------------------------------------------------

create table public.conference_results (
  id uuid primary key default gen_random_uuid(),
  season text not null,
  level text not null,                -- District | State | ICDC
  member_id text not null,
  member_name text not null,
  event_code text references public.events(event_code),
  exam_score int,
  performance_score int,
  written_score int,
  judge text,                         -- nullable: many historical rows only have "Judge 1", no real name
  total int generated always as (
    coalesce(exam_score,0) + coalesce(performance_score,0) + coalesce(written_score,0)
  ) stored,
  placement text,
  advanced boolean,
  created_at timestamptz not null default now()
);

alter table public.conference_results enable row level security;

-- Public results are a deliberate recruiting feature (Phase 2) — readable
-- by anyone, not just signed-in users. Writes stay officer-only.
create policy "Anyone can read conference results"
  on public.conference_results for select
  using (true);

create policy "Officers can manage conference results"
  on public.conference_results for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'officer')
  );

-- ---------------------------------------------------------------------
-- Seed the Events table with the 37 codes already confirmed in the
-- workbook (31 original DECA codes + 6 added during the Competitive
-- Intelligence backfill). Run 0002_seed_events.sql after this file.
-- ---------------------------------------------------------------------
