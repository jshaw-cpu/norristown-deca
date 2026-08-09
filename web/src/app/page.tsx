import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { ResultsShowcase } from "@/components/home/ResultsShowcase";
import { AlumniSection } from "@/components/home/AlumniSection";
import { AwardsSection } from "@/components/home/AwardsSection";
import { JoinCta } from "@/components/home/JoinCta";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <SiteNav />
      <Hero />
      <ResultsShowcase />
      <AlumniSection />
      <AwardsSection />
      <JoinCta />
      <SiteFooter />
    </main>
  );
}
