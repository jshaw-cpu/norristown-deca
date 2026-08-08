import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";

// Same two typefaces as the current index.html — Archivo for headings,
// Source Sans 3 for body copy (CLAUDE.md brand rule: don't swap fonts
// without confirmation, so this is a port, not a redesign).
const archivo = Archivo({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Norristown Area High School DECA",
  description:
    "Norristown Area High School DECA chapter — recruitment, results, and member portal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-ink bg-paper">
        {children}
      </body>
    </html>
  );
}
