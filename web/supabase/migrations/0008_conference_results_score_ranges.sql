-- Caps each conference_results score column to 100 points (confirmed
-- with the advisor 2026-08-11 — same for exam, performance, and written
-- across all events and all three conference levels). Same reasoning as
-- 0007_mock_results_score_ranges.sql: without this, a typo could inflate
-- a member's total with nothing catching it.
--
-- Postgres CHECK constraints pass on NULL automatically — not every
-- event has a written component, so written_score staying empty is fine.
--
-- Run this in the Supabase SQL editor after 0001-0007. Safe to re-run:
-- each ALTER drops its constraint first if present.

alter table public.conference_results drop constraint if exists conference_results_exam_score_range;
alter table public.conference_results add constraint conference_results_exam_score_range
  check (exam_score between 0 and 100);

alter table public.conference_results drop constraint if exists conference_results_performance_score_range;
alter table public.conference_results add constraint conference_results_performance_score_range
  check (performance_score between 0 and 100);

alter table public.conference_results drop constraint if exists conference_results_written_score_range;
alter table public.conference_results add constraint conference_results_written_score_range
  check (written_score between 0 and 100);
