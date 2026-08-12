const WAYS = [
  {
    num: "01",
    title: "Sponsor the Chapter",
    description:
      "Fund competition travel, materials, and scholarships for members heading to Districts, States, and ICDC.",
    linkLabel: "Become a Sponsor",
    href: "mailto:jshaw@nasd.k12.pa.us?subject=DECA%20Sponsorship",
  },
  {
    num: "02",
    title: "Judge or Mentor",
    description:
      "Industry professionals evaluate mock role-plays and coach members through the judge's lens before competition day.",
    linkLabel: "Volunteer to Judge",
    href: "mailto:jshaw@nasd.k12.pa.us?subject=DECA%20Judge%20or%20Mentor",
  },
  {
    num: "03",
    title: "Reconnect as Alumni",
    description:
      "Once an Eagle, always an Eagle. Join the alumni network and mentor the next class of competitors.",
    linkLabel: "Meet the Alumni Network",
    href: "#alumni",
  },
];

export function GetInvolvedSection() {
  return (
    <section id="involved" className="bg-paper px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            Beyond Membership
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Three ways to back the chapter.
          </h2>
          <p className="text-silver text-lg mt-6">
            You don&rsquo;t have to be a student to help build the next
            generation of Norristown DECA leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {WAYS.map((way) => (
            <div key={way.num} className="bg-mist border-t-4 border-blue p-8">
              <p className="font-head font-black text-3xl text-[#c7ccd1] mb-3">
                {way.num}
              </p>
              <h3 className="font-head font-black text-xl uppercase text-blue-night mb-3">
                {way.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed mb-5">
                {way.description}
              </p>
              <a
                href={way.href}
                className="font-head font-bold text-sm text-blue hover:text-blue-deep transition"
              >
                {way.linkLabel} &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
