const ALUMNI_STATS = [
  { value: "55+", label: "Years of Eagles" },
  { value: "95", label: "Average Members Per Year" },
  { value: "#1", label: "Largest in PA (2005-06)" },
  { value: "54+", label: "State Qualifiers (2025)" },
];

export function AlumniSection() {
  return (
    <section id="alumni" className="bg-blue-night text-white px-6 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-[#4aa3e8] mb-3">
            The Eagle Legacy
          </p>
          <h2 className="font-head font-black uppercase text-4xl tracking-tight leading-tight">
            Once an Eagle,
            <br />
            always an Eagle.
          </h2>
          <p className="text-white/72 text-lg mt-6">
            Norristown DECA alumni don&rsquo;t just remember their time here
            &mdash; they credit it. From scholarship wins to college
            admissions to career-defining interviews, the network stays
            active long after graduation.
          </p>
          <blockquote className="border-l-4 border-[#4aa3e8] pl-6 mt-8 font-head font-bold italic text-white/88">
            &ldquo;I am unable to quantify the social skills and nuances that
            I gained through my participation in various DECA conferences
            around the country.&rdquo;
          </blockquote>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="mailto:jshaw@nasd.k12.pa.us"
              className="btn-skew inline-block bg-white text-blue font-head font-extrabold uppercase text-sm px-8 py-4 hover:bg-blue-night hover:text-white transition"
            >
              Connect With Alumni Network &rarr;
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/10">
          {ALUMNI_STATS.map((stat) => (
            <div key={stat.label} className="bg-blue-night p-7 text-center">
              <b className="block font-head font-black text-3xl text-white">
                {stat.value}
              </b>
              <span className="block font-head font-semibold text-[0.66rem] uppercase tracking-[0.16em] text-silver-light mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
