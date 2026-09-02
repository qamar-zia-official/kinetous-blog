import {
  ClipboardList,
  Compass,
  Hammer,
  MessagesSquare,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const process = [
  {
    icon: ClipboardList,
    title: "01 · Discovery",
    description:
      "We begin by understanding your business, workflows, current systems and goals. Before discussing technology, we identify where software can create the most meaningful improvements.",
  },
  {
    icon: Compass,
    title: "02 · Architecture & Planning",
    description:
      "The project is translated into a clear technical plan covering user experience, system architecture, integrations, timelines and future scalability.",
  },
  {
    icon: Hammer,
    title: "03 · Design & Development",
    description:
      "Development happens iteratively with regular milestones. You'll always be able to review progress through a live staging environment instead of waiting until the end.",
  },
  {
    icon: MessagesSquare,
    title: "04 · Review & Refinement",
    description:
      "Every milestone is refined through feedback and testing. Small improvements made throughout development lead to a more polished final product.",
  },
  {
    icon: Rocket,
    title: "05 · Launch",
    description:
      "Deployment, infrastructure configuration, performance optimization and production rollout are handled carefully to ensure a smooth launch.",
  },
  {
    icon: ShieldCheck,
    title: "06 · Long-Term Partnership",
    description:
      "After launch, I continue helping clients improve, extend and maintain their systems as their businesses evolve and new opportunities emerge.",
  },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            How We Work
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Every project follows
            <br />a transparent engineering process.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Whether it&apos;s a Shopify storefront, an AI automation platform or
            an internal business system, every engagement follows the same
            structured workflow. This keeps communication clear, reduces risk
            and ensures we&apos;re always solving the right problems.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border lg:block" />

          <div className="space-y-10">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl   bg-zinc-800/50 p-8 lg:ml-12"
              >
                <div className="absolute -left-12.5 top-16 hidden h-12 w-12 items-center justify-center rounded-full   bg-background lg:flex">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl   bg-background lg:hidden">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 leading-8 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="text-5xl font-black text-muted/15">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
