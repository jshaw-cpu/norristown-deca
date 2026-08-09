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
  id: string;
  memberId: string;
  memberName: string;
  conference: Conference;
  status: SlipStatus;
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

// Officer-facing: every explicit record that's been entered, grouped by
// conference for display.
export async function listAllSlips(): Promise<Record<Conference, OfficerSlipEntry[]>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("permission_slips")
    .select("id, member_id, member_name, conference, status")
    .order("member_name", { ascending: true });

  const grouped: Record<Conference, OfficerSlipEntry[]> = {
    District: [],
    State: [],
    ICDC: [],
  };

  for (const row of data ?? []) {
    grouped[row.conference as Conference].push({
      id: row.id,
      memberId: row.member_id,
      memberName: row.member_name,
      conference: row.conference as Conference,
      status: row.status as SlipStatus,
    });
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
