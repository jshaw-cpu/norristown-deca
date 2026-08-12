import "server-only";
import { createClient } from "@/lib/supabase/server";
import { CURRENT_SEASON } from "@/lib/data/season-calendar";

export type RosterMember = {
  id: string;
  memberId: string;
  memberName: string;
  grade: number | null;
  yearsInChapter: number | null;
  eventCode: string | null;
  eventName: string | null;
  cluster: string | null;
  tier: string | null;
  baselineExamSept: number | null;
};

type EventRel = { event_name: string } | { event_name: string }[] | null;

function eventName(rel: EventRel): string | null {
  const row = Array.isArray(rel) ? rel[0] : rel;
  return row?.event_name ?? null;
}

// Officer-facing roster for the current season. This is also what the
// Permission Slips officer form (listRosterOptions in permissionSlips.ts)
// and a member's own Personal Progress page depend on having real rows —
// without this, those two features have nothing to work with.
export async function listSeasonRoster(): Promise<RosterMember[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("season_members")
    .select(
      "id, member_id, member_name, grade, years_in_chapter, event_code, cluster, tier, baseline_exam_sept, events(event_name)",
    )
    .eq("season", CURRENT_SEASON)
    .order("member_name", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    memberId: row.member_id,
    memberName: row.member_name,
    grade: row.grade,
    yearsInChapter: row.years_in_chapter,
    eventCode: row.event_code,
    eventName: eventName(row.events as EventRel),
    cluster: row.cluster,
    tier: row.tier,
    baselineExamSept: row.baseline_exam_sept,
  }));
}
