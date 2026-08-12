"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export type MockResultFormState = { error?: string } | undefined;

// Max points per category, confirmed 2026-08-11 — totals to 100. Also
// enforced at the database level (0007_mock_results_score_ranges.sql);
// checking here first gives a clear message instead of a raw DB error.
const RUBRIC_MAX: Record<string, number> = {
  opening: 10,
  diagnosis: 10,
  perfIndicators: 15,
  specificity: 15,
  quantification: 15,
  followUp: 15,
  presence: 10,
  close: 10,
};

function optionalInt(value: FormDataEntryValue | null): number | null {
  const str = String(value ?? "").trim();
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

function validateRubricScores(formData: FormData): string | null {
  for (const [field, max] of Object.entries(RUBRIC_MAX)) {
    const value = optionalInt(formData.get(field));
    if (value != null && (value < 0 || value > max)) {
      return `Score out of range: ${field} must be between 0 and ${max}.`;
    }
  }
  return null;
}

// Each mock is a distinct performance, so this always inserts a new row
// rather than upserting — unlike the roster, there's no natural "same
// entry, corrected" key here.
export async function addMockResult(
  _prevState: MockResultFormState,
  formData: FormData,
): Promise<MockResultFormState> {
  // Defense in depth — RLS on mock_results already restricts writes to
  // officers (0001_init.sql).
  await requireRole("officer");

  const memberId = String(formData.get("memberId") ?? "").trim();
  const memberName = String(formData.get("memberName") ?? "").trim();
  const performanceDate = String(formData.get("performanceDate") ?? "");
  const eventCode = String(formData.get("eventCode") ?? "").trim();
  const judge = String(formData.get("judge") ?? "").trim();
  const scenario = String(formData.get("scenario") ?? "").trim();
  const oneChangeAssigned = String(formData.get("oneChangeAssigned") ?? "").trim();

  if (!memberId || !memberName) {
    return { error: "Select a member." };
  }
  if (!performanceDate) {
    return { error: "Performance date is required." };
  }

  const rangeError = validateRubricScores(formData);
  if (rangeError) {
    return { error: rangeError };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("mock_results").insert({
    performance_date: performanceDate,
    member_id: memberId,
    member_name: memberName,
    event_code: eventCode || null,
    judge: judge || null,
    scenario: scenario || null,
    opening: optionalInt(formData.get("opening")),
    diagnosis: optionalInt(formData.get("diagnosis")),
    perf_indicators: optionalInt(formData.get("perfIndicators")),
    specificity: optionalInt(formData.get("specificity")),
    quantification: optionalInt(formData.get("quantification")),
    follow_up: optionalInt(formData.get("followUp")),
    presence: optionalInt(formData.get("presence")),
    close: optionalInt(formData.get("close")),
    one_change_assigned: oneChangeAssigned || null,
  });

  if (error) {
    return { error: "Could not save this mock result. Try again." };
  }

  revalidatePath("/officer/mock-results");
}

export async function deleteMockResult(id: string): Promise<void> {
  await requireRole("officer");

  const supabase = await createClient();
  await supabase.from("mock_results").delete().eq("id", id);

  revalidatePath("/officer/mock-results");
}
