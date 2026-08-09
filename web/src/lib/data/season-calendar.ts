// Static season content from the Chapter Operations Playbook
// (Section 7: Chapter Operations Calendar). Edited by hand once a year at
// the Annual Culture Audit — not worth a Supabase table for ~10 dates.

export const CURRENT_SEASON = "2026-27";

export type HardDeadline = {
  date: string; // ISO yyyy-mm-dd
  label: string;
  note: string;
};

// Section 7.3: The Six Dates That Cannot Slip. Registration deadlines are
// pinned to PA DECA's typical month per the Playbook, minus the two-week
// internal buffer it calls for — confirm the exact day with PA DECA each
// September and update here.
export const HARD_DEADLINES: HardDeadline[] = [
  {
    date: "2026-09-05",
    label: "Dues & DECA Inc. Registration",
    note: "A member not registered is a member not eligible — no appeal in December.",
  },
  {
    date: "2026-09-15",
    label: "Event Declaration",
    note: "Miss this and the compressed pre-season has no time to absorb a late placement.",
  },
  {
    date: "2026-11-13",
    label: "District Registration Deadline (internal)",
    note: "Confirm the exact PA DECA date each September; this is 2 weeks earlier by design.",
  },
  {
    date: "2026-12-11",
    label: "District Conference — St. Joseph's University",
    note: "The first test of the season.",
  },
  {
    date: "2027-01-16",
    label: "State Registration Deadline (internal)",
    note: "The deadline most chapters lose a competitor to. Confirm exact date with PA DECA.",
  },
  {
    date: "2027-02-17",
    label: "State Career Development Conference — Hershey, PA",
    note: "Runs Feb 17–19.",
  },
  {
    date: "2027-03-19",
    label: "ICDC Registration Deadline (internal)",
    note: "Travel and payment logistics stack behind this one. Confirm exact date with PA DECA.",
  },
  {
    date: "2027-04-16",
    label: "ICDC — Anaheim",
    note: "Runs Apr 16–21.",
  },
  {
    date: "2027-04-11",
    label: "Six-Week Officer Shadow Start",
    note: "No incoming officer assumes full duties without it. Starting late compresses the shadow.",
  },
];

export type TaperWindow = {
  start: string; // ISO yyyy-mm-dd
  end: string; // ISO yyyy-mm-dd
  label: string;
};

// Section 7.4: Buffer Rules — no new commitments inside these windows.
export const TAPER_WINDOWS: TaperWindow[] = [
  { start: "2026-11-26", end: "2026-12-10", label: "Pre-District Taper" },
  { start: "2027-02-07", end: "2027-02-16", label: "Pre-State Taper" },
  { start: "2027-04-11", end: "2027-04-15", label: "Pre-ICDC Taper" },
];

export type CadenceItem = {
  item: string;
  cadence: string;
  owner: string;
};

// Section 7.1: Recurring Cadence.
export const WEEKLY_CADENCE: CadenceItem[] = [
  { item: "Practice Session A — content", cadence: "Weekly, Oct to final conference", owner: "Madiiha Bhuiyan" },
  { item: "Practice Session B — performance", cadence: "Weekly, Oct to final conference", owner: "Joshua Falk" },
  { item: "Judge's Lens Lab", cadence: "3 times per season", owner: "Joshua Falk" },
  { item: "Officer roster group check-ins", cadence: "Monthly", owner: "Brady Vetter" },
  { item: "DECA-DO List review", cadence: "Weekly, at officer council", owner: "Chloe Wang" },
];

export function getNextDeadline(now: Date): (HardDeadline & { daysUntil: number }) | null {
  const upcoming = HARD_DEADLINES
    .map((d) => ({ ...d, daysUntil: daysBetween(now, new Date(d.date)) }))
    .filter((d) => d.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return upcoming[0] ?? null;
}

export function getActiveTaperWindow(now: Date): TaperWindow | null {
  return (
    TAPER_WINDOWS.find(
      (w) => now >= new Date(w.start) && now <= new Date(`${w.end}T23:59:59`),
    ) ?? null
  );
}

function daysBetween(from: Date, to: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((to.getTime() - fromMidnight.getTime()) / msPerDay);
}
