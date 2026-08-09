-- Member-tier read access to the practice bank catalog built in
-- 0004_practice_bank.sql. Officers already have full access via that
-- migration's "for all" policy; this adds a second, additive policy for
-- members (RLS policies on the same table are OR'd together for SELECT,
-- so this doesn't touch or replace the officer policy).
--
-- Run this in the Supabase SQL editor after 0004_practice_bank.sql.

drop policy if exists "Members can read practice bank items" on public.practice_bank_items;
create policy "Members can read practice bank items"
  on public.practice_bank_items for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'member')
  );
