import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { WhySection } from "@/components/home/WhySection";
import { CompeteLadder } from "@/components/home/CompeteLadder";
import { ResultsShowcase } from "@/components/home/ResultsShowcase";
import { ChampionsSection } from "@/components/home/ChampionsSection";
import { OfficersSection } from "@/components/home/OfficersSection";
import { AdvisorSection } from "@/components/home/AdvisorSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ToolkitSection } from "@/components/home/ToolkitSection";
import { AlumniSection } from "@/components/home/AlumniSection";
import { GetInvolvedSection } from "@/components/home/GetInvolvedSection";
import { AwardsSection } from "@/components/home/AwardsSection";
import { JoinCta } from "@/components/home/JoinCta";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <SiteNav />
      <Hero />
      <WhySection />
      <Pillars />
      <CompeteLadder />
      <ResultsShowcase />
      <ChampionsSection />
      <OfficersSection />
      <AdvisorSection />
      <GallerySection />
      <ToolkitSection />
      <AlumniSection />
      <GetInvolvedSection />
      <AwardsSection />
      <JoinCta />
      <SiteFooter />
    </main>
  );
}
