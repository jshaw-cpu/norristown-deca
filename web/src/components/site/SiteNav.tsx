"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "#why", label: "Why DECA" },
  { href: "#pillars", label: "Clusters" },
  { href: "#compete", label: "Compete" },
  { href: "#champions", label: "Champions" },
  { href: "#officers", label: "Leadership" },
  { href: "#alumni", label: "Alumni" },
  { href: "#gallery", label: "Gallery" },
  { href: "#toolkit", label: "Resources" },
  { href: "#advisor", label: "Advisor" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-mist">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <a
          href="#top"
          className="shrink-0 font-head font-black text-lg uppercase tracking-tight text-blue-night"
        >
          NAHS&nbsp;DECA
        </a>

        <div className="hidden lg:flex items-center gap-4 overflow-x-auto">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-head font-bold text-xs uppercase tracking-wide text-ink hover:text-blue transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Link
            href="/login"
            className="whitespace-nowrap font-head font-bold text-xs uppercase tracking-wide text-silver hover:text-blue transition"
          >
            Member Sign In
          </Link>
          <a
            href="#join"
            className="btn-skew inline-block bg-blue text-white font-head font-extrabold uppercase text-xs px-6 py-3 hover:bg-blue-deep transition"
          >
            Join
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-0.5 bg-blue-night" />
          <span className="block w-6 h-0.5 bg-blue-night" />
          <span className="block w-6 h-0.5 bg-blue-night" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-mist px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-head font-bold text-sm text-ink"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="font-head font-bold text-sm text-silver"
          >
            Member Sign In
          </Link>
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="btn-skew inline-block text-center bg-blue text-white font-head font-extrabold uppercase text-xs px-6 py-3"
          >
            Join
          </a>
        </div>
      )}
    </nav>
  );
}
