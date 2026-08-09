"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export type PermissionSlipFormState = { error?: string } | undefined;

const VALID_CONFERENCES = ["District", "State", "ICDC"];
const VALID_STATUSES = ["not_submitted", "submitted", "approved"];

export async function upsertPermissionSlip(
  _prevState: PermissionSlipFormState,
  formData: FormData,
): Promise<PermissionSlipFormState> {
  // Defense in depth alongside RLS — see 0006_permission_slips.sql.
  await requireRole("officer");

  const memberId = String(formData.get("memberId") ?? "");
  const memberName = String(formData.get("memberName") ?? "");
  const conference = String(formData.get("conference") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!memberId || !memberName) {
    return { error: "Select a member." };
  }
  if (!VALID_CONFERENCES.includes(conference)) {
    return { error: "Select a valid conference." };
  }
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Select a valid status." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("permission_slips")
    .upsert(
      { member_id: memberId, member_name: memberName, conference, status, updated_at: new Date().toISOString() },
      { onConflict: "member_id,conference" },
    );

  if (error) {
    return { error: "Could not save the status. Try again." };
  }

  revalidatePath("/officer/permission-slips");
}
