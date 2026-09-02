const sections = [
  {
    title: "Your software should improve over time.",
    left: `Launch day isn't the finish line. Once your team begins using the
systems every day, new opportunities naturally emerge. Real usage reveals
which workflows can be simplified, which reports become valuable and where
automation creates the biggest impact.`,

    right: `Rather than treating software as a one-time project, we build
systems that can evolve alongside your business. New capabilities can be
introduced incrementally without rebuilding the entire platform.`,
  },
  {
    title: "Knowledge should stay with your business.",
    left: `Every project includes documentation, recorded walkthroughs and
clear handover material. Your team should understand how the systems work,
how they're operated and how to continue using them confidently.`,

    right: `We believe businesses should never feel locked into their own
software. Whether you continue working with us or eventually build an
internal team, the systems should remain understandable and maintainable.`,
  },
  {
    title: "Long-term partnerships create better software.",
    left: `Many clients continue working with us after launch—not because
their systems are unfinished, but because their businesses continue to grow.
As new products, processes and ideas emerge, the software evolves alongside
them.`,

    right: `Our role gradually shifts from implementation to continuous
improvement: refining workflows, expanding automations and identifying the
next opportunities where technology can remove friction from daily
operations.`,
  },
];

export default function LongTermGrowth() {
  return (
    <section
      id="long-term-growth"
      className="border-t border-border scroll-mt-32 flex justify-center items-center"
    >
      <div className="container py-28 max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Built for Long-Term Growth
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl text-balance">
            Great software doesn&apos;t stop evolving after launch.
          </h2>

          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            Every business changes over time. New products are introduced, teams
            grow, processes evolve and customer expectations shift. The systems
            we build are designed to adapt—not become obstacles.
          </p>
        </div>

        <div className="mt-24 space-y-20">
          {sections.map((section) => (
            <article
              key={section.title}
              className="border-t border-border pt-10"
            >
              <h3 className="max-w-3xl text-3xl font-bold tracking-tight text-balance">
                {section.title}
              </h3>

              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                <p className="leading-8 text-muted-foreground">
                  {section.left}
                </p>

                <p className="leading-8 text-muted-foreground">
                  {section.right}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
