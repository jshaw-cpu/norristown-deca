import "server-only";
import { createClient } from "@/lib/supabase/server";
import { CURRENT_SEASON } from "@/lib/data/season-calendar";
import { CONFERENCES } from "@/lib/data/permissionSlipTypes";
import type { Conference, SlipStatus } from "@/lib/data/permissionSlipTypes";

export type { Conference, SlipStatus } from "@/lib/data/permissionSlipTypes";
export { CONFERENCES } from "@/lib/data/permissionSlipTypes";

export type SlipRecord = {
  conference: Conference;
  status: SlipStatus;
  updatedAt: string | null;
};

export type OfficerSlipEntry = {
  memberId: string;
  memberName: string;
  conference: Conference;
  status: SlipStatus;
};

export type ConferenceSlipSummary = {
  submittedCount: number;
  rosterSize: number;
  entries: OfficerSlipEntry[];
};

export type RosterOption = {
  memberId: string;
  memberName: string;
};

// Parent-facing: one row per conference for this member, defaulting to
// "not_submitted" when no row exists yet rather than requiring the whole
// roster to be pre-seeded per conference.
export async function listSlipsForMember(memberId: string | null): Promise<SlipRecord[] | null> {
  if (!memberId) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("permission_slips")
    .select("conference, status, updated_at")
    .eq("member_id", memberId);

  const byConference = new Map(
    (data ?? []).map((row) => [row.conference as Conference, row]),
  );

  return CONFERENCES.map((conference) => {
    const row = byConference.get(conference);
    return {
      conference,
      status: (row?.status as SlipStatus) ?? "not_submitted",
      updatedAt: row?.updated_at ?? null,
    };
  });
}

// Officer-facing: explicit records only (not the full roster — a wall of
// "Not Submitted" rows for everyone who hasn't turned anything in yet is
// more noise than signal, especially early season). Each conference also
// gets a submitted/roster-size count so officers still get an at-a-glance
// sense of how much is outstanding without listing every gap individually.
export async function listAllSlips(): Promise<Record<Conference, ConferenceSlipSummary>> {
  const supabase = await createClient();

  const [rosterCountResult, slipsResult] = await Promise.all([
    supabase
      .from("season_members")
      .select("member_id", { count: "exact", head: true })
      .eq("season", CURRENT_SEASON),
    supabase
      .from("permission_slips")
      .select("member_id, member_name, conference, status")
      .order("member_name", { ascending: true }),
  ]);

  const rosterSize = rosterCountResult.count ?? 0;

  const grouped: Record<Conference, ConferenceSlipSummary> = {
    District: { submittedCount: 0, rosterSize, entries: [] },
    State: { submittedCount: 0, rosterSize, entries: [] },
    ICDC: { submittedCount: 0, rosterSize, entries: [] },
  };

  for (const row of slipsResult.data ?? []) {
    const conference = row.conference as Conference;
    const status = row.status as SlipStatus;
    grouped[conference].entries.push({
      memberId: row.member_id,
      memberName: row.member_name,
      conference,
      status,
    });
    if (status === "submitted" || status === "approved") {
      grouped[conference].submittedCount += 1;
    }
  }

  return grouped;
}

export async function listRosterOptions(): Promise<RosterOption[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("season_members")
    .select("member_id, member_name")
    .eq("season", CURRENT_SEASON)
    .order("member_name", { ascending: true });

  return (data ?? []).map((row) => ({ memberId: row.member_id, memberName: row.member_name }));
}
