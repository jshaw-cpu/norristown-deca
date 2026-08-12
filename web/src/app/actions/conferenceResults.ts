"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { CURRENT_SEASON } from "@/lib/data/season-calendar";

export type ConferenceResultFormState = { error?: string } | undefined;

const VALID_LEVELS = ["District", "State", "ICDC"];
const SCORE_FIELDS = ["examScore", "performanceScore", "writtenScore"];

function optionalInt(value: FormDataEntryValue | null): number | null {
  const str = String(value ?? "").trim();
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

function validateScores(formData: FormData): string | null {
  for (const field of SCORE_FIELDS) {
    const value = optionalInt(formData.get(field));
    if (value != null && (value < 0 || value > 100)) {
      return `Score out of range: ${field} must be between 0 and 100.`;
    }
  }
  return null;
}

// Each conference result is a distinct performance at a distinct level,
// so this always inserts a new row rather than upserting.
export async function addConferenceResult(
  _prevState: ConferenceResultFormState,
  formData: FormData,
): Promise<ConferenceResultFormState> {
  // Defense in depth — RLS on conference_results already restricts
  // writes to officers (0001_init.sql).
  await requireRole("officer");

  const memberId = String(formData.get("memberId") ?? "").trim();
  const memberName = String(formData.get("memberName") ?? "").trim();
  const level = String(formData.get("level") ?? "");
  const eventCode = String(formData.get("eventCode") ?? "").trim();
  const judge = String(formData.get("judge") ?? "").trim();
  const placement = String(formData.get("placement") ?? "").trim();
  const advanced = formData.get("advanced") === "on";

  if (!memberId || !memberName) {
    return { error: "Select a member." };
  }
  if (!VALID_LEVELS.includes(level)) {
    return { error: "Select a valid conference level." };
  }

  const rangeError = validateScores(formData);
  if (rangeError) {
    return { error: rangeError };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("conference_results").insert({
    season: CURRENT_SEASON,
    level,
    member_id: memberId,
    member_name: memberName,
    event_code: eventCode || null,
    exam_score: optionalInt(formData.get("examScore")),
    performance_score: optionalInt(formData.get("performanceScore")),
    written_score: optionalInt(formData.get("writtenScore")),
    judge: judge || null,
    placement: placement || null,
    advanced,
  });

  if (error) {
    return { error: "Could not save this conference result. Try again." };
  }

  revalidatePath("/officer/conference-results");
}

export async function deleteConferenceResult(id: string): Promise<void> {
  await requireRole("officer");

  const supabase = await createClient();
  await supabase.from("conference_results").delete().eq("id", id);

  revalidatePath("/officer/conference-results");
}
