import "server-only";
import { createClient } from "@/lib/supabase/server";

export type SeasonTrend = {
  season: string;
  count: number;
  avgTotal: number;
  advanced: number;
};

export type RecentResult = {
  memberName: string;
  eventName: string | null;
  level: string;
  placement: string | null;
  total: number | null;
  season: string;
};

export type ResultsShowcase = {
  hasData: boolean;
  totalResults: number;
  advancedCount: number;
  seasonCount: number;
  bySeason: SeasonTrend[];
  recent: RecentResult[];
};

const EMPTY: ResultsShowcase = {
  hasData: false,
  totalResults: 0,
  advancedCount: 0,
  seasonCount: 0,
  bySeason: [],
  recent: [],
};

type ConferenceResultRow = {
  season: string;
  level: string;
  member_name: string;
  placement: string | null;
  advanced: boolean | null;
  total: number | null;
  created_at: string;
  events: { event_name: string } | { event_name: string }[] | null;
};

// Public-facing recruiting feature: conference_results has an "anyone can
// read" RLS policy specifically so this can render without auth. The table
// is empty until officers start entering conference-season data, so every
// aggregate here must degrade to the EMPTY shape rather than NaN/divide-by-zero.
export async function getResultsShowcase(): Promise<ResultsShowcase> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("conference_results")
    .select(
      "season, level, member_name, placement, advanced, total, created_at, events(event_name)",
    )
    .order("created_at", { ascending: false })
    .returns<ConferenceResultRow[]>();

  if (error || !data || data.length === 0) {
    return EMPTY;
  }

  const bySeasonMap = new Map<
    string,
    { count: number; totalSum: number; advanced: number }
  >();

  for (const row of data) {
    const bucket = bySeasonMap.get(row.season) ?? {
      count: 0,
      totalSum: 0,
      advanced: 0,
    };
    bucket.count += 1;
    bucket.totalSum += row.total ?? 0;
    bucket.advanced += row.advanced ? 1 : 0;
    bySeasonMap.set(row.season, bucket);
  }

  const bySeason: SeasonTrend[] = Array.from(bySeasonMap.entries())
    .map(([season, bucket]) => ({
      season,
      count: bucket.count,
      avgTotal: bucket.count ? Math.round(bucket.totalSum / bucket.count) : 0,
      advanced: bucket.advanced,
    }))
    .sort((a, b) => a.season.localeCompare(b.season));

  const recent: RecentResult[] = data.slice(0, 6).map((row) => {
    const eventRel = Array.isArray(row.events) ? row.events[0] : row.events;
    return {
      memberName: row.member_name,
      eventName: eventRel?.event_name ?? null,
      level: row.level,
      placement: row.placement,
      total: row.total,
      season: row.season,
    };
  });

  return {
    hasData: true,
    totalResults: data.length,
    advancedCount: data.filter((row) => row.advanced).length,
    seasonCount: bySeasonMap.size,
    bySeason,
    recent,
  };
}
