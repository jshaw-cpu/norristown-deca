const GROUPS = [
  {
    label: "Executive Board",
    officers: [
      { initials: "NG", role: "President", name: "Nataly Galeana-Trejo" },
      { initials: "CW", role: "Executive Vice President", name: "Chloe Wang" },
    ],
  },
  {
    label: "Cluster Vice Presidents",
    officers: [
      { initials: "GC", role: "VP of Marketing", name: "Guadalupe Ceja Rios" },
      { initials: "NA", role: "VP of Finance", name: "Nataly Acosta" },
      { initials: "HT", role: "VP of Hospitality", name: "Halimah Taylor" },
      { initials: "AY", role: "VP of Career Development", name: "Airyanah York" },
      { initials: "NH", role: "VP of Leadership", name: "Nyah Humphries" },
    ],
  },
  {
    label: "Operations Directors",
    officers: [
      { initials: "MB", role: "Exam Director", name: "Madiiha Bhuiyan" },
      { initials: "JF", role: "Role-Play Presentation Director", name: "Joshua Falk" },
      { initials: "EO", role: "Creative Director", name: "Eduardo Olmos Chavez" },
    ],
  },
  {
    label: "Digital & Communications",
    officers: [
      { initials: "JM", role: "Social Media Director", name: "Julie Merino" },
      { initials: "TF", role: "Social Media Director", name: "Teegan Farrell" },
      { initials: "BV", role: "Member Relations Director", name: "Brady Vetter" },
    ],
  },
  {
    label: "Strategic Development",
    officers: [
      { initials: "AC", role: "Fundraising Director", name: "Alvin Castro Castro" },
      { initials: "YG", role: "Partnership Director", name: "Yasmin Gomez-Vasquez" },
    ],
  },
];

export function OfficersSection() {
  return (
    <section id="officers" className="bg-mist px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-blue mb-3">
            2026-2027 Officer Team
          </p>
          <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-blue-night">
            Fifteen leaders. One mission.
          </h2>
          <p className="text-silver text-lg mt-6">
            Our chapter runs on a student led leadership pipeline, where
            experienced officers mentor the next generation of Eagles.
          </p>
        </div>

        <div className="grid gap-10">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-head font-bold text-xs uppercase tracking-[0.2em] text-silver mb-4">
                {group.label}
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {group.officers.map((officer) => (
                  <div
                    key={officer.name}
                    className="bg-paper border border-silver-light p-5 flex items-center gap-4"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-full bg-blue-night text-white flex items-center justify-center font-head font-black text-sm">
                      {officer.initials}
                    </div>
                    <div>
                      <p className="font-head font-bold text-blue-night text-sm">
                        {officer.name}
                      </p>
                      <p className="text-silver text-xs uppercase tracking-wide">
                        {officer.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
