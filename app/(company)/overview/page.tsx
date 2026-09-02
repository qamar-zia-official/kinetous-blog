import { ArrowRight, Code, Cpu } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-20">
      {/* Hero */}
      <section className="space-y-6 text-center md:text-left py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          High-performance E-Commerce & AI Automations
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          We design and build custom e-commerce storefronts and business
          automations. No generic templates, no agency bloat. You work directly
          with the developer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get an Estimate <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-input bg-background font-medium hover:bg-accent transition-colors"
          >
            See My Work
          </Link>
        </div>
      </section>
      {/* Services Grid */}
      <section className="space-y-8 py-6">
        <h2 className="text-2xl md:text-3xl font-bold">My Core Expertise</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl   bg-zinc-800/50/50 space-y-4">
            <Code className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-semibold">Custom E-Commerce</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fast, Next.js storefronts built on headless Shopify, WooCommerce,
              or entirely custom engines. Fully integrated with secure systems
              like Stripe.
            </p>
          </div>

          <div className="p-6 rounded-xl   bg-zinc-800/50/50 space-y-4">
            <Cpu className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-semibold">AI Tools & Workflows</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Custom AI assistants trained on your internal documentation, order
              workflows, and data pipelines. We build custom dashboards, RAG
              systems, and direct API integrations.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-8 py-6">
        <div className="border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">Our Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "shadcn/ui",
              "Node.js",
              "PostgreSQL",
              "Supabase",
              "Clerk",
              "Shopify",
              "WooCommerce",
              "OpenAI",
              "Claude",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground  "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
