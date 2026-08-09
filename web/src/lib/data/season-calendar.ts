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

export type TrainingMonth = {
  monthKeys: string[]; // "YYYY-MM"
  label: string;
  focus: string;
};

// Section 7.2: Master Calendar — the "Competition and training" column
// only (Membership/Campaigns and Leadership/Culture columns aren't
// member-relevant for a training calendar).
export const TRAINING_MONTHS: TrainingMonth[] = [
  {
    monthKeys: ["2026-07", "2026-08"],
    label: "July–August: Foundation",
    focus: "Advisor builds the season plan and confirms the event list with PA DECA. Practice schedule published in August.",
  },
  {
    monthKeys: ["2026-09"],
    label: "September: Declare & Baseline",
    focus: "Sept 15: every member has a declared event. Sept 15–30: diagnostic cluster exam, scored and recorded.",
  },
  {
    monthKeys: ["2026-10"],
    label: "October: Training Camp Begins",
    focus: "Cluster content blocks. Role-play mechanics. Partner matching locked. First full mock for every competitor. Judge's Lens Lab 1, mid-October.",
  },
  {
    monthKeys: ["2026-11"],
    label: "November: Simulation",
    focus: "Weekly mock cycles. Districts simulation under full timing and dress. Written events: research Oct 27, first draft Nov 6, second draft Nov 20.",
  },
  {
    monthKeys: ["2026-12"],
    label: "December: District Conference",
    focus: "Dec 1: written reports locked. Dec 8: two rehearsals in front of fresh judges. Taper Nov 26–Dec 10. Dec 11: District Conference. Debriefs within 48 hours.",
  },
  {
    monthKeys: ["2027-01"],
    label: "January: State Push",
    focus: "Score analysis. State cohort named. Written events rebuilt against actual score sheets. Higher difficulty scenarios. Exam retest. Judge's Lens Lab 2, early January.",
  },
  {
    monthKeys: ["2027-02"],
    label: "February: State Conference",
    focus: "Taper Feb 7–16. Hershey logistics, materials check, mental performance work. Feb 17–19: State Conference. Debriefs within 48 hours. Feb 20: ICDC cohort forms begin.",
  },
  {
    monthKeys: ["2027-03"],
    label: "March: ICDC Peak",
    focus: "Highest difficulty drills, outside judges only, full dress rehearsals. Judge's Lens Lab 3, mid-March.",
  },
  {
    monthKeys: ["2027-04"],
    label: "April: ICDC",
    focus: "Apr 11–15: taper and travel prep. Apr 16–21: ICDC, Anaheim. Debriefs within 48 hours of return.",
  },
  {
    monthKeys: ["2027-05"],
    label: "May: Legacy Capture",
    focus: "Every ICDC competitor teaches their event to an underclassman. Event prep guides updated for next year.",
  },
  {
    monthKeys: ["2027-06"],
    label: "June: Season Close",
    focus: "Competition results log finalized and filed.",
  },
];

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getCurrentTrainingMonth(now: Date): TrainingMonth | null {
  const key = monthKey(now);
  return TRAINING_MONTHS.find((m) => m.monthKeys.includes(key)) ?? null;
}

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

export function daysBetween(from: Date, to: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((to.getTime() - fromMidnight.getTime()) / msPerDay);
}
