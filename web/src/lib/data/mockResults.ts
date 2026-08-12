import "server-only";
import { createClient } from "@/lib/supabase/server";

export type MockResultEntry = {
  id: string;
  performanceDate: string;
  memberId: string;
  memberName: string;
  eventName: string | null;
  judge: string | null;
  total: number | null;
  oneChangeAssigned: string | null;
};

type EventRel = { event_name: string } | { event_name: string }[] | null;

function eventName(rel: EventRel): string | null {
  const row = Array.isArray(rel) ? rel[0] : rel;
  return row?.event_name ?? null;
}

// Officer-facing chronological log. RLS already scopes this table (any
// officer manages all rows; a member reads only their own, per
// 0001_init.sql) — this just shapes the officer's full view of it.
export async function listMockResults(): Promise<MockResultEntry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mock_results")
    .select("id, performance_date, member_id, member_name, judge, total, one_change_assigned, events(event_name)")
    .order("performance_date", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    performanceDate: row.performance_date,
    memberId: row.member_id,
    memberName: row.member_name,
    eventName: eventName(row.events as EventRel),
    judge: row.judge,
    total: row.total,
    oneChangeAssigned: row.one_change_assigned,
  }));
}
