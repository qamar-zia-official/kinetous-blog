import {
  BrainCircuit,
  Handshake,
  Layers3,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

const principles = [
  {
    icon: BrainCircuit,
    title: "Engineering Before Everything",
    description:
      "Every project begins by understanding your business, workflows and operational bottlenecks before selecting technologies or writing code.",
  },
  {
    icon: Users,
    title: "Direct Collaboration",
    description:
      "You'll work directly with the people designing and building your software, keeping communication clear, decisions fast and feedback cycles short.",
  },
  {
    icon: Layers3,
    title: "Built Around Your Business",
    description:
      "We don't force businesses into generic software. Every system is designed around the way your team already operates and where automation creates the most value.",
  },
  {
    icon: Rocket,
    title: "Designed to Grow",
    description:
      "Projects are engineered with long-term maintainability in mind so they can evolve naturally as your business, team and requirements grow.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership & Transparency",
    description:
      "You retain ownership of your codebase, infrastructure and data. We build with open technologies that leave your business in control.",
  },
  {
    icon: Handshake,
    title: "Growing With Our Clients",
    description:
      "Kinetous is intentionally growing from an engineering-led studio into a specialized team. As projects expand, we bring in trusted designers and engineers without compromising quality or communication.",
  },
];

export default function WhyDifferent() {
  return (
    <section
      id="why-Kinetous"
      className="border-t border-border/60 scroll-mt-32 bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Why Kinetous
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            A different way of building software.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Great software comes from understanding businesses, maintaining
            close collaboration, and making thoughtful engineering decisions.
            That&apos;s the approach every project follows—today and as
            Kinetous continues to grow.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl   bg-zinc-800/50 p-8 transition-colors hover:border-primary/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl   bg-background">
                <item.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
