import "server-only";
import { createClient } from "@/lib/supabase/server";

export type SeasonSnapshot = {
  season: string;
  eventCode: string | null;
  eventName: string | null;
  cluster: string | null;
  tier: string | null;
  grade: number | null;
  baselineExamSept: number | null;
};

export type MockResultEntry = {
  id: string;
  performanceDate: string;
  eventName: string | null;
  judge: string | null;
  total: number | null;
  oneChangeAssigned: string | null;
};

export type ConferenceResultEntry = {
  id: string;
  season: string;
  level: string;
  eventName: string | null;
  total: number | null;
  placement: string | null;
  advanced: boolean | null;
};

export type MemberProgress = {
  hasMemberId: boolean;
  seasonSnapshot: SeasonSnapshot | null;
  mockResults: MockResultEntry[];
  conferenceResults: ConferenceResultEntry[];
};

const EMPTY_LINKED: MemberProgress = {
  hasMemberId: true,
  seasonSnapshot: null,
  mockResults: [],
  conferenceResults: [],
};

const NOT_LINKED: MemberProgress = {
  hasMemberId: false,
  seasonSnapshot: null,
  mockResults: [],
  conferenceResults: [],
};

type EventRel = { event_name: string } | { event_name: string }[] | null;

function eventName(rel: EventRel): string | null {
  const row = Array.isArray(rel) ? rel[0] : rel;
  return row?.event_name ?? null;
}

// Reads a member's own performance history. RLS already scopes
// mock_results/season_members to "member_id = the caller's own profile
// member_id" (0001_init.sql) — this just shapes that for the UI. Returns
// the NOT_LINKED sentinel when the caller's profile has no member_id yet,
// so the page can prompt "ask an officer to link your account" instead of
// silently showing an empty progress page.
export async function getMemberProgress(memberId: string | null): Promise<MemberProgress> {
  if (!memberId) {
    return NOT_LINKED;
  }

  const supabase = await createClient();

  const [seasonRow, mockRows, conferenceRows] = await Promise.all([
    supabase
      .from("season_members")
      .select("season, event_code, cluster, tier, grade, baseline_exam_sept, events(event_name)")
      .eq("member_id", memberId)
      .order("season", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("mock_results")
      .select("id, performance_date, judge, total, one_change_assigned, events(event_name)")
      .eq("member_id", memberId)
      .order("performance_date", { ascending: false }),
    supabase
      .from("conference_results")
      .select("id, season, level, total, placement, advanced, events(event_name)")
      .eq("member_id", memberId)
      .order("created_at", { ascending: false }),
  ]);

  const seasonSnapshot: SeasonSnapshot | null = seasonRow.data
    ? {
        season: seasonRow.data.season,
        eventCode: seasonRow.data.event_code,
        eventName: eventName(seasonRow.data.events as EventRel),
        cluster: seasonRow.data.cluster,
        tier: seasonRow.data.tier,
        grade: seasonRow.data.grade,
        baselineExamSept: seasonRow.data.baseline_exam_sept,
      }
    : null;

  const mockResults: MockResultEntry[] = (mockRows.data ?? []).map((row) => ({
    id: row.id,
    performanceDate: row.performance_date,
    eventName: eventName(row.events as EventRel),
    judge: row.judge,
    total: row.total,
    oneChangeAssigned: row.one_change_assigned,
  }));

  const conferenceResults: ConferenceResultEntry[] = (conferenceRows.data ?? []).map((row) => ({
    id: row.id,
    season: row.season,
    level: row.level,
    eventName: eventName(row.events as EventRel),
    total: row.total,
    placement: row.placement,
    advanced: row.advanced,
  }));

  if (!seasonSnapshot && mockResults.length === 0 && conferenceResults.length === 0) {
    return EMPTY_LINKED;
  }

  return { hasMemberId: true, seasonSnapshot, mockResults, conferenceResults };
}
