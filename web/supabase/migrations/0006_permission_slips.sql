-- Permission slip status — parent tier. Tracks the travel/permission
-- forms the Playbook's Section 7.2 State Prep logistics row mentions
-- distributing, but doesn't define a tracking system for, so this is a
-- new addition rather than a port of something already decided.
--
-- Run this in the Supabase SQL editor after 0001-0005. Safe to re-run:
-- uses IF NOT EXISTS / DROP POLICY IF EXISTS throughout.

-- ---------------------------------------------------------------------
-- Parent -> child link
-- ---------------------------------------------------------------------
--
-- Mirrors profiles.member_id (how a MEMBER's own account links to their
-- workbook record) — this is the same idea for a PARENT's account,
-- pointing at their child's member_id instead of their own.

alter table public.profiles
  add column if not exists child_member_id text;

-- ---------------------------------------------------------------------
-- MANUAL STEP — for each parent account, once you know the child's
-- member ID from the Competitive Intelligence workbook:
--
--   update public.profiles set child_member_id = '<CHILD_MEMBER_ID>' where id = '<PARENT_AUTH_USER_ID>';
--
-- ---------------------------------------------------------------------

-- ---------------------------------------------------------------------
-- Permission Slips
-- ---------------------------------------------------------------------

create table if not exists public.permission_slips (
  id uuid primary key default gen_random_uuid(),
  member_id text not null,
  member_name text not null,           -- duplicated alongside member_id, same
                                        -- convention as mock_results/conference_results
  conference text not null check (conference in ('District', 'State', 'ICDC')),
  status text not null default 'not_submitted' check (status in ('not_submitted', 'submitted', 'approved')),
  updated_at timestamptz not null default now(),
  unique (member_id, conference)
);

alter table public.permission_slips enable row level security;

-- Officer-wide, same shape as practice_bank_items — operational
-- tracking, not sensitive like the accountability queue.
drop policy if exists "Officers can manage permission slips" on public.permission_slips;
create policy "Officers can manage permission slips"
  on public.permission_slips for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'officer')
  );

drop policy if exists "Parents can read their child's permission slips" on public.permission_slips;
create policy "Parents can read their child's permission slips"
  on public.permission_slips for select
  using (
    member_id = (select p.child_member_id from public.profiles p where p.id = auth.uid())
  );
