import "server-only";
import { createClient } from "@/lib/supabase/server";

export type AccountabilityLevel = "verbal" | "written" | "suspension";

export type AccountabilityEntry = {
  id: string;
  officerName: string;
  level: AccountabilityLevel;
  reason: string;
  incidentDate: string;
  timelineNote: string | null;
};

export type OfficerAccountabilityGroup = {
  officerName: string;
  entries: AccountabilityEntry[];
};

// Advisor-only (enforced by RLS on officer_accountability — see
// 0003_officer_accountability.sql — and by requireAdvisor() at the page
// level as defense in depth). Groups entries by officer so the review
// queue reads as each officer's ladder progression, not a flat log.
export async function listAccountabilityEntries(): Promise<OfficerAccountabilityGroup[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("officer_accountability")
    .select("id, officer_name, level, reason, incident_date, timeline_note")
    .order("officer_name", { ascending: true })
    .order("incident_date", { ascending: false });

  if (error || !data) {
    return [];
  }

  const groups = new Map<string, AccountabilityEntry[]>();
  for (const row of data) {
    const entry: AccountabilityEntry = {
      id: row.id,
      officerName: row.officer_name,
      level: row.level as AccountabilityLevel,
      reason: row.reason,
      incidentDate: row.incident_date,
      timelineNote: row.timeline_note,
    };
    const bucket = groups.get(entry.officerName) ?? [];
    bucket.push(entry);
    groups.set(entry.officerName, bucket);
  }

  return Array.from(groups.entries()).map(([officerName, entries]) => ({
    officerName,
    entries,
  }));
}
