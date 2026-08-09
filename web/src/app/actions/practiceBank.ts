"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export type PracticeBankFormState = { error?: string } | undefined;

const VALID_TYPES = ["role_play_scenario", "exam_resource", "study_guide"];

export async function addPracticeBankItem(
  _prevState: PracticeBankFormState,
  formData: FormData,
): Promise<PracticeBankFormState> {
  // Defense in depth alongside RLS — see 0004_practice_bank.sql.
  await requireRole("officer");

  const title = String(formData.get("title") ?? "").trim();
  const itemType = String(formData.get("itemType") ?? "");
  const cluster = String(formData.get("cluster") ?? "").trim();
  const eventCode = String(formData.get("eventCode") ?? "").trim();
  const driveUrl = String(formData.get("driveUrl") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!title || !driveUrl) {
    return { error: "Title and Drive link are required." };
  }
  if (!VALID_TYPES.includes(itemType)) {
    return { error: "Select a valid type." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("practice_bank_items").insert({
    title,
    item_type: itemType,
    cluster: cluster || null,
    event_code: eventCode || null,
    drive_url: driveUrl,
    notes: notes || null,
  });

  if (error) {
    return { error: "Could not save the item. Try again." };
  }

  revalidatePath("/officer/practice-bank");
}

export async function deletePracticeBankItem(id: string): Promise<void> {
  await requireRole("officer");

  const supabase = await createClient();
  await supabase.from("practice_bank_items").delete().eq("id", id);

  revalidatePath("/officer/practice-bank");
}
