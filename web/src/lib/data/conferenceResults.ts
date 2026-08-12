import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ConferenceResultEntry = {
  id: string;
  season: string;
  level: string;
  memberId: string;
  memberName: string;
  eventName: string | null;
  examScore: number | null;
  performanceScore: number | null;
  writtenScore: number | null;
  judge: string | null;
  total: number | null;
  placement: string | null;
  advanced: boolean | null;
};

type EventRel = { event_name: string } | { event_name: string }[] | null;

function eventName(rel: EventRel): string | null {
  const row = Array.isArray(rel) ? rel[0] : rel;
  return row?.event_name ?? null;
}

// Officer-facing full log, newest first. RLS already scopes writes to
// officers and reads to anyone (0001_init.sql — this is the same table
// the public Results Showcase reads from) — this just shapes the
// officer's management view of it.
export async function listConferenceResults(): Promise<ConferenceResultEntry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("conference_results")
    .select(
      "id, season, level, member_id, member_name, exam_score, performance_score, written_score, judge, total, placement, advanced, events(event_name)",
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    season: row.season,
    level: row.level,
    memberId: row.member_id,
    memberName: row.member_name,
    eventName: eventName(row.events as EventRel),
    examScore: row.exam_score,
    performanceScore: row.performance_score,
    writtenScore: row.written_score,
    judge: row.judge,
    total: row.total,
    placement: row.placement,
    advanced: row.advanced,
  }));
}
