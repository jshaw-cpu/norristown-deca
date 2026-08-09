// Shared types/constants for permission slips that need to be importable
// from Client Components (e.g. the officer update form) — kept separate
// from permissionSlips.ts because that module imports "server-only" and
// can't be pulled into a client bundle at all, even just for a constant.

export type Conference = "District" | "State" | "ICDC";
export type SlipStatus = "not_submitted" | "submitted" | "approved";

export const CONFERENCES: Conference[] = ["District", "State", "ICDC"];
