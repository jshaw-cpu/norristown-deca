"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/actions/auth";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/member";
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="w-full max-w-sm bg-paper border border-silver-light p-10">
      <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-2">
        NAHS DECA
      </p>
      <h1 className="font-head font-black text-2xl uppercase text-blue-night mb-8">
        Member Sign In
      </h1>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-head font-bold uppercase tracking-wide text-silver mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-silver-light px-3 py-2 font-body focus:outline-none focus:border-blue"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-600 font-body">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-skew w-full bg-blue text-white font-head font-extrabold uppercase text-sm py-3 disabled:opacity-60 hover:bg-blue-deep transition"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
