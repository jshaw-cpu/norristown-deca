import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4 text-center">
      <div>
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-4">
          NAHS DECA
        </p>
        <h1 className="font-head font-black text-3xl uppercase text-blue-night mb-3">
          Not Authorized
        </h1>
        <p className="text-silver font-body mb-8 max-w-sm mx-auto">
          Your account doesn&apos;t have access to this page. If you think
          this is wrong, ask an officer to check your profile role.
        </p>
        <Link
          href="/"
          className="btn-skew inline-block bg-blue text-white font-head font-extrabold uppercase text-sm px-8 py-3 hover:bg-blue-deep transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
