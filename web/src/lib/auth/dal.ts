import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Role = "member" | "officer" | "parent";

export type SessionProfile = {
  userId: string;
  email: string;
  role: Role;
  fullName: string | null;
};

// The real, DB-backed check. proxy.ts's role check is optimistic (JWT
// claim only) and exists purely to keep obviously-wrong requests from
// loading a page — this is the check that actually matters. Call it
// from every page/Server Action/Route Handler under (member),
// (officer), (parent), not just once in a shared layout (see the
// Next.js auth guide's note on why layout-only checks aren't enough
// with Partial Rendering).
export const verifySession = cache(async (): Promise<SessionProfile> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    redirect("/not-authorized");
  }

  return {
    userId: data.user.id,
    email: data.user.email ?? "",
    role: profile.role as Role,
    fullName: profile.full_name,
  };
});

// Call from a page/action that requires a specific role. Officers are
// NOT automatically granted member-only pages here on purpose — this
// throws for anyone whose role doesn't match, full stop. Use this for
// anything role-specific; use verifySession() alone for "any signed-in
// user" pages.
export async function requireRole(role: Role): Promise<SessionProfile> {
  const session = await verifySession();
  if (session.role !== role) {
    redirect("/not-authorized");
  }
  return session;
}

// Member-tier pages: officers are also members of the chapter, so they
// get member pages too. Use this instead of requireRole("member") for
// anything that isn't officer-exclusive.
export async function requireMemberTier(): Promise<SessionProfile> {
  const session = await verifySession();
  if (session.role !== "member" && session.role !== "officer") {
    redirect("/not-authorized");
  }
  return session;
}
