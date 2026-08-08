import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed middleware.ts to proxy.ts — same runtime, same job.
// This is an OPTIMISTIC check only (reads the session cookie/JWT claim,
// no database round-trip, per Next.js's own auth guidance). Every page
// under (member)/(officer)/(parent) must still call the DAL
// (src/lib/auth/dal.ts) for the real, DB-backed authorization check —
// this proxy just keeps obviously-wrong requests from reaching a page
// at all.

const TIER_PREFIXES = ["/member", "/officer", "/parent"] as const;

function tierForPath(pathname: string) {
  return TIER_PREFIXES.find((prefix) => pathname.startsWith(prefix));
}

// Officers get member access too; nobody else crosses tiers.
function roleCanAccessTier(role: string | undefined, tier: string) {
  if (!role) return false;
  if (tier === "/member") return role === "member" || role === "officer";
  if (tier === "/officer") return role === "officer";
  if (tier === "/parent") return role === "parent";
  return false;
}

export default async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const tier = tierForPath(request.nextUrl.pathname);
  if (!tier) return supabaseResponse;

  if (!user) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = user.app_metadata?.role as string | undefined;
  if (!roleCanAccessTier(role, tier)) {
    return NextResponse.redirect(new URL("/not-authorized", request.nextUrl));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
