import Image from "next/image";
import me from "@/public/image.png";

import SectionHeading2 from "../section-heading";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const points = [
  {
    title: "Direct Access",
    description:
      "Work directly with the person designing and building the solution. No account managers, outsourcing, or communication layers.",
  },
  {
    title: "Business First",
    description:
      "Every technical decision is evaluated through its business impact, scalability, efficiency, and long-term value.",
  },
  {
    title: "AI & Automation",
    description:
      "Leverage modern AI systems and automation to eliminate repetitive work and create operational leverage.",
  },
  {
    title: "Design + Engineering",
    description:
      "Products should feel intuitive and trustworthy. Strong UX and solid engineering go hand in hand.",
  },
  {
    title: "Built To Last",
    description:
      "Clean architecture, maintainability, and scalability are considered from day one to reduce future technical debt.",
  },
  {
    title: "End-To-End Ownership",
    description:
      "From planning and architecture to deployment and iteration, there is a single accountable owner throughout the project.",
  },
];

export default function About() {
  return (
    <section className="max-w-7xl mx-auto py-32 px-4" id="why">
      <SectionHeading2>Why Work With Me</SectionHeading2>

      {/* Hero Row */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-center mb-20">
        {/* Photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-64 h-64 overflow-hidden rounded-3xl border border-white/10">
            <Image src={me} alt="Qamar Zia" fill className="object-cover" />
          </div>
        </div>

        {/* Positioning */}
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl md:text-5xl font-bold text-zinc-50 leading-tight">
            A Technical Partner,
            <br />
            Not Just Another Developer
          </h3>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Hi, I&apos;m{" "}
            <span className="text-zinc-100 font-semibold">Qamar Zia</span>.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
            I help businesses{" "}
            <strong className="text-white">design, build, and automate</strong>{" "}
            the systems that power their growth—from customer-facing
            applications and ecommerce platforms to internal tools, AI
            workflows, and operational automations.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Unlike traditional agencies, you work directly with the person
            designing and building the solution. No account managers, no
            outsourced teams, and no communication layers between your business
            requirements and implementation.
          </p>

          <p className="text-zinc-100 text-xl font-medium max-w-3xl leading-relaxed">
            Build systems that create leverage, reduce complexity, and scale
            with the business.
          </p>
        </div>
      </div>

      {/* Trust Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 border-t border-t-zinc-700 pt-4">
        {points.map((item) => (
          <Card
            key={item.title}
            className="bg-zinc-800/50 backdrop-blur-xl border-none"
          >
            <CardHeader>
              <CardTitle className="text-zinc-50">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
