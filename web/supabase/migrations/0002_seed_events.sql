-- Extracted from the real Competitive Intelligence workbook's Events
-- tab (2026-07-31-NAHS-DECA-Competitive-Intelligence.xlsx) — these are
-- not hand-typed, they are the actual 37 confirmed event codes (31
-- original DECA codes + 6 added during the Districts/2021-22 backfill:
-- FTDM, PEN, ETDM, FMS, HRM, BSM). If the workbook's Events tab changes,
-- re-extract rather than hand-editing this file out of sync with it.

insert into public.events (event_code, event_name, category, cluster, written_component)
values
  ('MMS', 'Marketing Management Series', 'Individual Series', 'Marketing', false),
  ('RMS', 'Retail Merchandising Series', 'Individual Series', 'Marketing', false),
  ('SEM', 'Sports and Entertainment Marketing Series', 'Individual Series', 'Marketing', false),
  ('MCS', 'Marketing Communications Series', 'Individual Series', 'Marketing', false),
  ('AAM', 'Apparel and Accessories Marketing Series', 'Individual Series', 'Marketing', false),
  ('BTDM', 'Buying and Merchandising Team Decision Making', 'Team Decision Making', 'Marketing', false),
  ('MTDM', 'Marketing Management Team Decision Making', 'Team Decision Making', 'Marketing', false),
  ('STDM', 'Sports and Entertainment Marketing Team Decision Making', 'Team Decision Making', 'Marketing', false),
  ('BFS', 'Business Finance Series', 'Individual Series', 'Finance', false),
  ('ACT', 'Accounting Applications Series', 'Individual Series', 'Finance', false),
  ('FCE', 'Financial Consulting Team Decision Making', 'Team Decision Making', 'Finance', false),
  ('PFL', 'Personal Financial Literacy', 'Individual Series', 'Finance', false),
  ('HLM', 'Hotel and Lodging Management Series', 'Individual Series', 'Hospitality and Tourism', false),
  ('RFSM', 'Restaurant and Food Service Management Series', 'Individual Series', 'Hospitality and Tourism', false),
  ('QSRM', 'Quick Serve Restaurant Management Series', 'Individual Series', 'Hospitality and Tourism', false),
  ('HTDM', 'Hospitality Services Team Decision Making', 'Team Decision Making', 'Hospitality and Tourism', false),
  ('TTDM', 'Travel and Tourism Team Decision Making', 'Team Decision Making', 'Hospitality and Tourism', false),
  ('ENT', 'Entrepreneurship Individual Series', 'Individual Series', 'Entrepreneurship', false),
  ('EIP', 'Innovation Plan', 'Written', 'Entrepreneurship', true),
  ('ESB', 'Start-Up Business Plan', 'Written', 'Entrepreneurship', true),
  ('EIB', 'Independent Business Plan', 'Written', 'Entrepreneurship', true),
  ('IFB', 'Franchise Business Plan', 'Written', 'Entrepreneurship', true),
  ('IMCP', 'Integrated Marketing Campaign, Product', 'Written', 'Marketing', true),
  ('IMCS', 'Integrated Marketing Campaign, Service', 'Written', 'Marketing', true),
  ('IMCB', 'Integrated Marketing Campaign, Business', 'Written', 'Marketing', true),
  ('BORM', 'Business Operations Research, Marketing', 'Written', 'Marketing', true),
  ('BORF', 'Business Operations Research, Finance', 'Written', 'Finance', true),
  ('PMK', 'Principles of Marketing', 'Principles', 'Marketing', false),
  ('PFN', 'Principles of Finance', 'Principles', 'Finance', false),
  ('PHT', 'Principles of Hospitality and Tourism', 'Principles', 'Hospitality and Tourism', false),
  ('PBM', 'Principles of Business Management and Administration', 'Principles', 'Business Management', false),
  ('FTDM', 'Financial Services Team Decision Making', 'Team Decision Making', 'Finance', false),
  ('PEN', 'Principles of Entrepreneurship', 'Principles', 'Entrepreneurship', false),
  ('ETDM', 'Entrepreneurship Team Decision Making', 'Team Decision Making', 'Entrepreneurship', false),
  ('FMS', 'Food Marketing Series', 'Individual Series', 'Marketing', false),
  ('HRM', 'Human Resource Management', 'Individual Series', 'Business Management', false),
  ('BSM', 'Business Services Marketing Series', 'Individual Series', 'Marketing', false)
on conflict (event_code) do update set
  event_name = excluded.event_name,
  category = excluded.category,
  cluster = excluded.cluster,
  written_component = excluded.written_component;
