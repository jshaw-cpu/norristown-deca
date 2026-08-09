import "server-only";
import { createClient } from "@/lib/supabase/server";
import { CURRENT_SEASON } from "@/lib/data/season-calendar";

export type ChapterPulse = {
  mockResultsThisWeek: number;
  conferenceResultsThisSeason: number;
  rosterSize: number;
  hasAnyData: boolean;
};

// Officer-only view (RLS on mock_results/season_members already restricts
// these to officers, per 0001_init.sql) into how much of the season's
// activity has actually been logged. Every count degrades to 0 rather than
// throwing — the season hasn't started logging yet as of Phase 3's launch.
export async function getChapterPulse(): Promise<ChapterPulse> {
  const supabase = await createClient();

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoIso = weekAgo.toISOString().slice(0, 10);

  const [mockResults, conferenceResults, rosterMembers] = await Promise.all([
    supabase
      .from("mock_results")
      .select("id", { count: "exact", head: true })
      .gte("performance_date", weekAgoIso),
    supabase
      .from("conference_results")
      .select("id", { count: "exact", head: true })
      .eq("season", CURRENT_SEASON),
    supabase
      .from("season_members")
      .select("id", { count: "exact", head: true })
      .eq("season", CURRENT_SEASON),
  ]);

  const mockResultsThisWeek = mockResults.count ?? 0;
  const conferenceResultsThisSeason = conferenceResults.count ?? 0;
  const rosterSize = rosterMembers.count ?? 0;

  return {
    mockResultsThisWeek,
    conferenceResultsThisSeason,
    rosterSize,
    hasAnyData:
      mockResultsThisWeek > 0 || conferenceResultsThisSeason > 0 || rosterSize > 0,
  };
}
