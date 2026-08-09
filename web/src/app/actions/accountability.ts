"use server";

import { revalidatePath } from "next/cache";
import { requireAdvisor } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export type LogAccountabilityState = { error?: string } | undefined;

export async function logAccountabilityEntry(
  _prevState: LogAccountabilityState,
  formData: FormData,
): Promise<LogAccountabilityState> {
  // Defense in depth — RLS on officer_accountability already restricts
  // this to advisor accounts, but failing fast here avoids a wasted
  // round trip and gives a clean error instead of a raw RLS rejection.
  await requireAdvisor();

  const officerName = String(formData.get("officerName") ?? "").trim();
  const level = String(formData.get("level") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  const incidentDate = String(formData.get("incidentDate") ?? "");
  const timelineNote = String(formData.get("timelineNote") ?? "").trim();

  if (!officerName || !reason || !incidentDate) {
    return { error: "Officer name, reason, and incident date are required." };
  }
  if (!["verbal", "written", "suspension"].includes(level)) {
    return { error: "Select a valid level." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("officer_accountability").insert({
    officer_name: officerName,
    level,
    reason,
    incident_date: incidentDate,
    timeline_note: timelineNote || null,
  });

  if (error) {
    return { error: "Could not save the entry. Try again." };
  }

  revalidatePath("/officer/accountability");
}
