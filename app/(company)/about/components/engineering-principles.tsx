const principles = [
  {
    number: "01",
    title: "Business Before Technology",
    body: "Every project begins by understanding your business objectives, operational bottlenecks and growth plans. Technologies are selected because they solve measurable problems—not because they're trending on social media.",
  },
  {
    number: "02",
    title: "Build Systems You Own",
    body: "Your software should belong to your business. We build using open standards and modern frameworks so you're never locked into proprietary platforms or dependent on a single vendor.",
  },
  {
    number: "03",
    title: "Performance Is a Feature",
    body: "Fast software creates better customer experiences and more efficient teams. Performance, accessibility and maintainability are considered from the first architectural decision—not treated as afterthoughts.",
  },
  {
    number: "04",
    title: "Automation Should Remove Work",
    body: "AI should reduce repetitive tasks, eliminate manual processes and help your team focus on decisions that actually require human judgment. Automation should create leverage—not complexity.",
  },
  {
    number: "05",
    title: "Build for the Next Five Years",
    body: "Businesses evolve. New products launch, teams grow and workflows change. Every system is designed with extensibility in mind so future improvements don't require expensive rewrites.",
  },
  {
    number: "06",
    title: "Clarity Beats Complexity",
    body: "The best software isn't the one with the most features—it's the one your team actually understands. Clear architecture, thoughtful interfaces and maintainable code always outperform unnecessary complexity.",
  },
];

export default function EngineeringPrinciples() {
  return (
    <section
      id="engineering-principles"
      className="border-t border-border flex justify-center items-center"
    >
      <div className="container py-28">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Engineering Principles
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl text-balance">
            How we think is just as important as what we build.
          </h2>

          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            Every project is guided by a small set of engineering principles.
            They influence how systems are architected, how decisions are made
            and ultimately how software continues delivering value long after
            launch.
          </p>
        </div>

        <div className="mt-24 divide-y divide-border max-w-7xl mx-auto">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="grid gap-8 py-12 md:grid-cols-[100px_1fr]"
            >
              <span className="text-3xl font-black tracking-tight text-primary/35">
                {principle.number}
              </span>

              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold tracking-tight">
                  {principle.title}
                </h3>

                <p className="mt-4 leading-8 text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
