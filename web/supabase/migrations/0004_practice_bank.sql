-- Role-play/test bank content management — Chapter Operations Playbook
-- Section 8.1 (Google Drive is the system of record) + Section 8.2 (the
-- "02 Competitions" folder holds role-play banks, exam resources, study
-- guides). This table is a CATALOG that indexes that Drive content — it
-- does not duplicate scenario/exam text into Supabase, on purpose.
--
-- Run this in the Supabase SQL editor after 0001-0003. Safe to re-run:
-- uses IF NOT EXISTS / DROP POLICY IF EXISTS throughout.

create table if not exists public.practice_bank_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  item_type text not null check (item_type in ('role_play_scenario', 'exam_resource', 'study_guide')),
  cluster text,                        -- Marketing | Finance | Hospitality and Tourism | Entrepreneurship | Business Management
  event_code text references public.events(event_code),
  drive_url text not null,             -- the content itself lives in Drive; this is the pointer
  notes text,
  created_at timestamptz not null default now()
);

alter table public.practice_bank_items enable row level security;

-- Officer-wide, not advisor-gated — content curation isn't sensitive the
-- way the accountability queue is. Same shape as the events/conference_results
-- officer policies in 0001_init.sql. No member-read policy yet: member-facing
-- browsing is a separate future slice.
drop policy if exists "Officers can manage practice bank items" on public.practice_bank_items;
create policy "Officers can manage practice bank items"
  on public.practice_bank_items for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'officer')
  );
