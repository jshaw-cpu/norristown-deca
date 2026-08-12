import Image from "next/image";

export function LeadersSection() {
  return (
    <section id="leaders" className="bg-mist px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Beyond The Chapter
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Norristown Eagles leading DECA statewide.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          <div className="bg-paper border border-silver-light p-8">
            <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-blue mb-3">
              Pennsylvania DECA State President
            </p>
            <h3 className="font-head font-black text-2xl text-blue-night mb-1">
              Jack Falk
            </h3>
            <p className="text-silver text-sm mb-4">
              2025&ndash;2026 &middot; previously VP of Member Development on
              the 2024&ndash;2025 PA DECA State Officer Team
            </p>
            <p className="text-ink text-sm leading-relaxed">
              Jack&rsquo;s DECA journey started at NAHS&rsquo;s student club
              fair his freshman year. He went on to campaign successfully
              for State President, focused on bridging the gap between
              larger and smaller chapters across Pennsylvania.
            </p>
          </div>

          <div className="bg-paper border border-silver-light p-8">
            <div className="flex gap-5 items-start mb-4">
              <Image
                src="/alumni/dons-nguyen.jpg"
                alt="Dons Nguyen"
                width={200}
                height={200}
                className="w-20 h-20 object-cover shrink-0 border border-silver-light"
              />
              <div>
                <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-blue mb-2">
                  Sponsor &amp; Judge Since 2012
                </p>
                <h3 className="font-head font-black text-2xl text-blue-night">
                  Dons Nguyen
                </h3>
              </div>
            </div>
            <p className="text-ink text-sm leading-relaxed">
              A Norristown DECA alum, Dons now volunteers as a judge in
              business case competitions at the Regional, State, and
              International levels. He also directs community outreach for
              Norristown Dreamers, a nonprofit providing scholarships to
              graduating NAHS seniors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
