-- Caps each mock_results rubric category to its real max point value, per
-- the chapter's own scoring scale (confirmed 2026-08-11): 10/10/15/15/15/15/10/10,
-- totaling 100. Before this, the columns had no upper bound at all -- a
-- typo could inflate a member's total with nothing catching it.
--
-- Postgres CHECK constraints pass on NULL automatically, so this doesn't
-- require every score to be filled in — only enforces the range for
-- whatever is actually entered.
--
-- Run this in the Supabase SQL editor after 0001-0006. Safe to re-run:
-- each ALTER drops its constraint first if present.

alter table public.mock_results drop constraint if exists mock_results_opening_range;
alter table public.mock_results add constraint mock_results_opening_range
  check (opening between 0 and 10);

alter table public.mock_results drop constraint if exists mock_results_diagnosis_range;
alter table public.mock_results add constraint mock_results_diagnosis_range
  check (diagnosis between 0 and 10);

alter table public.mock_results drop constraint if exists mock_results_perf_indicators_range;
alter table public.mock_results add constraint mock_results_perf_indicators_range
  check (perf_indicators between 0 and 15);

alter table public.mock_results drop constraint if exists mock_results_specificity_range;
alter table public.mock_results add constraint mock_results_specificity_range
  check (specificity between 0 and 15);

alter table public.mock_results drop constraint if exists mock_results_quantification_range;
alter table public.mock_results add constraint mock_results_quantification_range
  check (quantification between 0 and 15);

alter table public.mock_results drop constraint if exists mock_results_follow_up_range;
alter table public.mock_results add constraint mock_results_follow_up_range
  check (follow_up between 0 and 15);

alter table public.mock_results drop constraint if exists mock_results_presence_range;
alter table public.mock_results add constraint mock_results_presence_range
  check (presence between 0 and 10);

alter table public.mock_results drop constraint if exists mock_results_close_range;
alter table public.mock_results add constraint mock_results_close_range
  check (close between 0 and 10);
