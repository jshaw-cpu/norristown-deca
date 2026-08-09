import "server-only";
import { createClient } from "@/lib/supabase/server";

export type PracticeBankItemType = "role_play_scenario" | "exam_resource" | "study_guide";

export type PracticeBankItem = {
  id: string;
  title: string;
  itemType: PracticeBankItemType;
  cluster: string | null;
  eventCode: string | null;
  driveUrl: string;
  notes: string | null;
};

export type PracticeBankGroup = {
  itemType: PracticeBankItemType;
  items: PracticeBankItem[];
};

export type EventOption = {
  eventCode: string;
  eventName: string;
};

const TYPE_ORDER: PracticeBankItemType[] = ["role_play_scenario", "exam_resource", "study_guide"];

export const PRACTICE_BANK_TYPE_LABEL: Record<PracticeBankItemType, string> = {
  role_play_scenario: "Role-Play Scenarios",
  exam_resource: "Exam Resources",
  study_guide: "Study Guides",
};

// Officer-only (RLS on practice_bank_items restricts writes to officers;
// no member-read policy exists yet, per the deferred-visibility decision).
// This is a catalog of Drive links, not the content itself — Section 8.1
// keeps Drive as the system of record.
export async function listPracticeBankItems(): Promise<PracticeBankGroup[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("practice_bank_items")
    .select("id, title, item_type, cluster, event_code, drive_url, notes")
    .order("item_type", { ascending: true })
    .order("title", { ascending: true });

  if (error || !data) {
    return TYPE_ORDER.map((itemType) => ({ itemType, items: [] }));
  }

  const byType = new Map<PracticeBankItemType, PracticeBankItem[]>();
  for (const row of data) {
    const item: PracticeBankItem = {
      id: row.id,
      title: row.title,
      itemType: row.item_type as PracticeBankItemType,
      cluster: row.cluster,
      eventCode: row.event_code,
      driveUrl: row.drive_url,
      notes: row.notes,
    };
    const bucket = byType.get(item.itemType) ?? [];
    bucket.push(item);
    byType.set(item.itemType, bucket);
  }

  return TYPE_ORDER.map((itemType) => ({
    itemType,
    items: byType.get(itemType) ?? [],
  }));
}

export async function listEventOptions(): Promise<EventOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("event_code, event_name")
    .order("event_name", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({ eventCode: row.event_code, eventName: row.event_name }));
}
