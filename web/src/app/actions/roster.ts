"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { CURRENT_SEASON } from "@/lib/data/season-calendar";

export type RosterFormState = { error?: string } | undefined;

function optionalInt(value: FormDataEntryValue | null): number | null {
  const str = String(value ?? "").trim();
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

export async function upsertRosterMember(
  _prevState: RosterFormState,
  formData: FormData,
): Promise<RosterFormState> {
  // Defense in depth — RLS on season_members already restricts writes to
  // officers (0001_init.sql).
  await requireRole("officer");

  const memberId = String(formData.get("memberId") ?? "").trim();
  const memberName = String(formData.get("memberName") ?? "").trim();
  const eventCode = String(formData.get("eventCode") ?? "").trim();
  const cluster = String(formData.get("cluster") ?? "").trim();
  const tier = String(formData.get("tier") ?? "").trim();

  if (!memberId || !memberName) {
    return { error: "Member ID and name are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("season_members").upsert(
    {
      member_id: memberId,
      member_name: memberName,
      season: CURRENT_SEASON,
      grade: optionalInt(formData.get("grade")),
      years_in_chapter: optionalInt(formData.get("yearsInChapter")),
      event_code: eventCode || null,
      cluster: cluster || null,
      tier: tier || null,
      baseline_exam_sept: optionalInt(formData.get("baselineExamSept")),
    },
    { onConflict: "member_id,season" },
  );

  if (error) {
    return { error: "Could not save this roster entry. Try again." };
  }

  revalidatePath("/officer/roster");
}

export async function deleteRosterMember(id: string): Promise<void> {
  await requireRole("officer");

  const supabase = await createClient();
  await supabase.from("season_members").delete().eq("id", id);

  revalidatePath("/officer/roster");
}
