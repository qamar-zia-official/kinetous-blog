import {
  ArrowRightLeft,
  Bot,
  Database,
  LayoutDashboard,
  ShoppingBag,
  Workflow,
} from "lucide-react";

const capabilities = [
  {
    icon: ShoppingBag,
    title: "Commerce Engineering",
    description:
      "Custom Shopify storefronts, ecommerce architecture, customer experiences, checkout optimization and high-performance shopping experiences built specifically for your brand.",
    items: [
      "Custom Shopify Storefronts",
      "Custom Woocommerce Storefronts",
      "Headless Commerce",
      "Store Performance",
      "Customer Journey Optimization",
    ],
  },
  {
    icon: Bot,
    title: "AI & Business Automation",
    description:
      "Practical AI systems that automate repetitive work instead of adding another tool your team has to learn.",
    items: [
      "AI Customer Support",
      "Knowledge Base Assistants",
      "Lead Qualification",
      "Workflow Automation",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Internal Business Software",
    description:
      "Operational dashboards and internal tools that replace spreadsheets and disconnected workflows with software designed around your business.",
    items: [
      "Operations Dashboards",
      "Admin Panels",
      "Reporting Systems",
      "Custom Internal Tools",
    ],
  },
  {
    icon: ArrowRightLeft,
    title: "System Integrations",
    description:
      "Connect inventory, CRM, accounting, communication platforms and third-party services into one reliable workflow.",
    items: [
      "API Development",
      "ERP & CRM Integration",
      "Payment Systems",
      "Business Automation",
    ],
  },
  {
    icon: Workflow,
    title: "Operational Workflows",
    description:
      "Designing systems that remove manual bottlenecks and allow teams to focus on higher-value work.",
    items: [
      "Approval Workflows",
      "Document Processing",
      "Inventory Automation",
      "Notifications",
    ],
  },
  {
    icon: Database,
    title: "Backend & Infrastructure",
    description:
      "Scalable backend systems, APIs, databases and deployment infrastructure engineered for long-term maintainability.",
    items: [
      "REST & GraphQL APIs",
      "Database Design",
      "Authentication",
      "Cloud Deployment",
    ],
  },
];

export default function EngineeringCapabilities() {
  return (
    <section
      id="engineering-capabilities"
      className="scroll-mt-32 border-t border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Engineering Capabilities
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Building software around
            <br />
            your business—not the other way around.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Every engagement is different, but most projects fall into one or
            more of these engineering disciplines. Rather than selling isolated
            services, I design complete systems that solve operational problems
            across the business.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="group rounded-3xl   bg-zinc-800/50 p-8 transition-all hover:border-primary/25 hover:bg-zinc-800/50/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl   bg-background">
                <capability.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mt-6 text-xl font-bold">{capability.title}</h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {capability.description}
              </p>

              <ul className="mt-8 space-y-3">
                {capability.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
