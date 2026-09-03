import { IconType } from "react-icons/lib";
import srvc12 from "@/public/srvc.1.3.png";
import srvc13 from "@/public/srvc.1.4.png";
import srvc14 from "@/public/srvc.1.5.png";
import srvc15 from "@/public/srvc.1.6.png";
import srvc1 from "@/public/srvc.1.png";
import srvc11 from "@/public/srvc.1.2.png";
import srvc21 from "@/public/srvc.2.1.png";
import srvc22 from "@/public/srvc.2.2.png";
import srvc23 from "@/public/srvc.2.3.png";
import srvc24 from "@/public/srvc.2.4.png";
import srvc25 from "@/public/srvc.2.5.png";
import srvc2 from "@/public/srvc.2.png";
import srvc31 from "@/public/srvc.3.1.png";
import srvc32 from "@/public/srvc.3.2.png";
import srvc33 from "@/public/srvc.3.3.png";
import srvc34 from "@/public/srvc.3.4.png";
import srvc35 from "@/public/srvc.3.5.png";
import srvc3 from "@/public/srvc.3.png";
import {
  MdShoppingCart,
  MdDashboard,
  MdIntegrationInstructions,
  MdSupportAgent,
  MdAutoGraph,
  MdStorefront,
  MdCloudQueue,
} from "react-icons/md";

import { FiCheckCircle, FiDatabase, FiCpu, FiZap } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";
import { StaticImageData } from "next/image";

export type Service = {
  title: string;
  slug: string;
  brandIcon: IconType;
  image: StaticImageData;
  anchor?: boolean;
  pipelineSteps?: string[];
  /**
   * Long-form explanation of the service category. Written in Markdown.
   * Intended for dedicated service pages, not for cards.
   */
  markdown: string;
  features: Feature[];
};

export type Feature = {
  icon: IconType;
  image: StaticImageData;
  name: string;
  slug: string;
  /** Short summary for service cards. ~18-25 words. */
  shortDescription: string;
  /**
   * Full explanation of the service. Written in Markdown.
   * Intended for service detail panels and dedicated service pages.
   */
  markdown: string;
  /** What the client actually receives. */
  deliverables: string[];
  /** Who this service is built for. */
  idealFor: string[];
  /** What changes for the business as a result. */
  outcomes: string[];
  /** Only included when specific tools or platforms are genuinely relevant. */
  technologies?: string[];
};

export const ourServicesData: Service[] = [
  {
    title: "Internal Operations & Dashboards",
    slug: "internal-operations-and-dashboards",
    anchor: true,
    brandIcon: MdDashboard,
    image: srvc3,
    markdown: `## The Problem

As businesses grow, operations tend to run on an accumulation of spreadsheets, email threads, and disconnected software that worked fine at a smaller scale but breaks down under real volume. Nobody chose this system deliberately, it grew one workaround at a time, and by the time it becomes a real problem, untangling it feels harder than living with it.

## How These Systems Work Together

We build internal tooling as a connected set: a command centre that gives the team a single view of operations, automation that removes repetitive manual work, document processing that extracts information without manual data entry, integrations that connect the systems the business already depends on, and custom tools built for workflows that don't fit generic software.

None of these work well in isolation. A dashboard is only useful if the data behind it is current, which requires the integrations and automation to actually be in place. Document processing feeds structured data into that same dashboard rather than existing as a separate tool nobody checks.

## Why Companies Invest Here

Businesses usually invest here after noticing the same pattern: a task that should take minutes takes hours because it involves manually checking multiple systems, or a decision gets delayed because nobody has a current, trustworthy view of what's actually happening operationally.

Generic software solves generic problems. Once a business has specific enough workflows, forcing that operation into a tool built for a different kind of company creates more friction than it removes. Custom internal tools, built around how the business actually works rather than how a template assumes it should work, remove that friction directly.`,
    features: [
      {
        icon: MdDashboard,
        image: srvc31,
        name: "Operations Command Centers",
        slug: "operations-command-centers",
        shortDescription:
          "A single operational dashboard that replaces scattered spreadsheets and disconnected tools with one accurate, real-time view of the business.",
        markdown: `## What This Solves

Operational visibility often lives in a dozen different places: a spreadsheet someone updates manually, a dashboard from one platform that doesn't include data from another, and institutional knowledge that exists only because someone on the team remembers it. Getting an accurate picture of what's actually happening requires checking all of them, and the answer is often already out of date by the time it's assembled.

## Why It Matters

Decisions made on incomplete or outdated information are decisions made with unnecessary risk. When leadership or operations staff have to piece together a picture from multiple sources before they can act, response time slows down exactly when speed matters most, during a supply issue, a demand spike, or a process breaking down somewhere in the business.

## Our Approach

We build a command centre that pulls live data directly from the systems the business already runs on, inventory, orders, support, finance, whichever are relevant, into a single view designed around the decisions the team actually needs to make. This isn't a generic BI dashboard template with every metric available; it's built around a specific set of questions the business needs answered quickly.

Because the data is pulled live rather than manually updated, the dashboard reflects what's actually happening rather than what was true when someone last had time to update a spreadsheet. Access and views are structured around who needs to see what, so operations staff and leadership each get the picture relevant to their decisions.

## Typical Deliverables

Custom dashboard architecture, live data integrations, role-based views, key metric definition, and alerting for thresholds that need attention.`,
        deliverables: [
          "Custom dashboard architecture",
          "Live data integrations",
          "Role-based access and views",
          "Key metric definition",
          "Threshold alerting",
          "Historical trend views",
        ],
        idealFor: [
          "Operations teams relying on spreadsheets",
          "Leadership needing real-time visibility",
          "Multi-department businesses with siloed data",
          "Fast-growing companies outgrowing manual reporting",
        ],
        outcomes: [
          "Single source of operational truth",
          "Faster decision-making",
          "Reduced manual reporting work",
          "Better visibility across departments",
        ],
        technologies: [
          "Next.js",
          "PostgreSQL",
          "REST/Webhook integrations",
          "Recharts",
        ],
      },
      {
        icon: FiZap,
        image: srvc32,
        name: "Workflow Automation",
        slug: "workflow-automation",
        shortDescription:
          "Automating repetitive manual tasks and clearing operational bottlenecks so your team spends time on work that actually needs judgement.",
        markdown: `## What This Solves

Many operational tasks are repetitive by nature: moving data between systems, generating the same report every week, updating a status when a predictable event happens. Done manually, these tasks consume hours that scale directly with volume, and they're also where human error tends to creep in, since repetitive work invites mistakes exactly because it doesn't require much attention.

## Why It Matters

Time spent on repetitive manual work is time not spent on the parts of the job that actually require judgement. As a business grows, the volume of repetitive tasks grows with it, and without automation, that usually means hiring more people to do the same manual work rather than solving the underlying inefficiency.

## Our Approach

We identify the specific tasks consuming the most repetitive manual effort and automate them individually, rather than attempting a wholesale automation platform that tries to cover everything at once. This usually starts with the highest-volume, lowest-judgement tasks: status updates, data transfers, recurring reports, notification triggers, and works outward from there.

Automation is built to fail safely. When a task hits an edge case it wasn't designed for, it flags for a human rather than proceeding on a bad assumption. This matters more than raw automation coverage: a system that automates ninety percent of a task correctly and handles the remaining ten percent gracefully is more valuable than one that tries to automate everything and fails silently on the edge cases.

## Typical Deliverables

Task automation architecture, workflow mapping, exception handling and human handoff, and monitoring for automated processes.`,
        deliverables: [
          "Repetitive task automation",
          "Workflow mapping and documentation",
          "Exception handling logic",
          "Human handoff for edge cases",
          "Automated reporting",
          "Process monitoring and alerts",
        ],
        idealFor: [
          "Operations teams doing repetitive manual work",
          "Businesses scaling without proportional headcount growth",
          "Teams generating recurring reports manually",
          "Companies with high error rates in manual processes",
        ],
        outcomes: [
          "Reduced manual work",
          "Fewer process errors",
          "Faster task completion",
          "More team time on judgement-based work",
        ],
      },
      {
        icon: TbFileInvoice,
        image: srvc33,
        name: "Document Processing",
        slug: "document-processing",
        shortDescription:
          "Automatically extracting information from invoices, forms, and business documents so your team stops manually re-typing data into other systems.",
        markdown: `## What This Solves

Invoices, purchase orders, shipping documents, and forms arrive in every format imaginable, PDFs, scanned images, emails with attachments, and someone on the team has to read each one and manually enter the relevant data into whatever system tracks it. This is slow, error-prone, and scales badly as document volume grows.

## Why It Matters

Manual data entry is one of the most common sources of operational errors: a transposed number on an invoice, a missed line item, a delay because documents pile up faster than someone can process them. These errors are individually small but collectively expensive, especially in finance and logistics workflows where accuracy compounds downstream.

## Our Approach

We build document processing that extracts structured data directly from invoices, forms, and other business documents, regardless of format, and feeds it into the systems that need it, an accounting platform, an inventory system, an operations dashboard, without a person retyping anything. This includes handling variation: documents from different vendors rarely follow the same layout, and the extraction logic is built to handle that variation rather than assuming a single template.

Extracted data is validated before it's committed anywhere important. Where confidence is low, the document is flagged for a human to check rather than allowing a bad extraction to silently enter the system and cause a downstream error.

## Typical Deliverables

Document extraction pipeline, format and layout handling, validation and confidence scoring, and integration with downstream systems.`,
        deliverables: [
          "Document extraction pipeline",
          "Multi-format and multi-vendor handling",
          "Data validation and confidence scoring",
          "Integration with accounting or inventory systems",
          "Exception flagging for low-confidence extractions",
        ],
        idealFor: [
          "Finance teams processing high invoice volume",
          "Logistics operations handling shipping documents",
          "Businesses with manual data entry backlogs",
          "Companies receiving documents in varied formats",
        ],
        outcomes: [
          "Reduced manual data entry",
          "Fewer invoice and form errors",
          "Faster document turnaround",
          "Cleaner downstream data",
        ],
        technologies: ["OCR", "LLM-based extraction", "Node.js", "PostgreSQL"],
      },
      {
        icon: MdIntegrationInstructions,
        image: srvc34,
        name: "Cross-System Integrations",
        slug: "cross-system-integrations",
        shortDescription:
          "Connecting inventory, CRM, support, accounting, and communication platforms into one workflow that updates everywhere automatically without duplicate manual entry.",
        markdown: `## What This Solves

Internal operations rarely run on a single system. Inventory lives in one platform, customer relationships in another, support tickets somewhere else, and accounting in a fourth. When these systems don't talk to each other, staff end up as the integration layer, manually copying information between tools, and that manual copying is where inconsistencies and delays creep in.

## Why It Matters

A CRM that doesn't reflect current order status, an accounting system that's a week behind actual sales, a support team without visibility into inventory, each of these creates friction for whoever has to work across the gap. At scale, this friction adds up to a meaningful drag on how quickly the business can operate and respond.

## Our Approach

We connect the specific systems a business runs on using their APIs, mapping data so that the same customer, order, or product means the same thing everywhere it appears. Integration is scoped around the actual operational needs of the business, connecting what genuinely needs to be connected rather than building unnecessary complexity linking every tool that exists.

We pay particular attention to what happens when systems disagree, network failures, sync delays, conflicting updates, since these edge cases are usually where integrations break down in practice. Built correctly, the integration handles them without silently losing or duplicating data.

## Typical Deliverables

Cross-system integration architecture, API-based data mapping, conflict and error handling, and monitoring for sync reliability.`,
        deliverables: [
          "Integration architecture across core systems",
          "API-based data mapping",
          "Conflict and error handling logic",
          "Sync reliability monitoring",
          "Documentation of connected workflows",
        ],
        idealFor: [
          "Businesses running disconnected internal tools",
          "Operations teams manually bridging systems",
          "Companies scaling past spreadsheet workflows",
          "Multi-department businesses needing shared data",
        ],
        outcomes: [
          "Consistent data across internal systems",
          "Less manual copying between tools",
          "Fewer sync errors",
          "Faster cross-team operations",
        ],
      },
      {
        icon: FiCpu,
        image: srvc35,
        name: "Custom Internal Tools",
        slug: "custom-internal-tools",
        shortDescription:
          "Internal software built around how your business actually operates, instead of forcing your team to adapt to a generic tool.",
        markdown: `## What This Solves

Generic software is built for the average case across thousands of businesses, which means it's rarely a precise fit for any single one. Teams end up working around the limitations of a tool that almost fits, using spreadsheets to cover the gaps, or maintaining manual processes for the parts of their workflow the software simply doesn't support.

## Why It Matters

Working around software limitations has a real cost, even when it's not immediately visible. Every workaround is a point of manual effort, a place where errors can enter, and a process that new team members have to be taught separately from the tool itself. Over time, these workarounds accumulate into an operation that's harder to run than it should be.

## Our Approach

We build internal tools specifically for how a business actually operates: its terminology, its approval processes, its edge cases, rather than adapting the business to fit a generic tool's assumptions. This starts with understanding the actual workflow in detail, including the exceptions and edge cases that generic software usually ignores, since those are often where the real operational cost lives.

Custom tools are built to be maintained and extended over time, not as a one-off project. That means clean, documented code and a structure the team can build on as the business's needs change, rather than a rigid tool that needs to be replaced the next time the process shifts.

## Typical Deliverables

Custom internal tool design and build, workflow-specific feature development, role-based access, and documentation for ongoing maintenance.`,
        deliverables: [
          "Custom internal tool design and build",
          "Workflow-specific feature development",
          "Role-based access control",
          "Edge case and exception handling",
          "Ongoing maintenance documentation",
          "Team onboarding support",
        ],
        idealFor: [
          "Businesses with workflows generic software can't fit",
          "Teams maintaining spreadsheet workarounds",
          "Operations with unique approval or process needs",
          "Companies planning to scale internal processes",
        ],
        outcomes: [
          "Software that fits actual workflows",
          "Fewer manual workarounds",
          "Easier onboarding for new staff",
          "A tool that scales with the business",
        ],
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
      },
    ],
  },

  {
    title: "Customer Support Automation",
    slug: "customer-support-automation",
    anchor: true,
    brandIcon: BsRobot,
    image: srvc2,
    markdown: `## The Problem

Support volume grows faster than support teams can scale. Customers expect answers within minutes, at any hour, but hiring and training staff to cover every time zone and repeat the same answers to the same questions is expensive and difficult to sustain as a business grows.

## How These Systems Work Together

We build a support layer made of five connected parts: an AI assistant that answers questions directly using the business's own knowledge, coverage that extends support beyond office hours, a knowledge base integration that keeps the assistant accurate as policies change, lead qualification that filters serious prospects from casual browsers, and analytics that show what customers are actually asking about.

Each part depends on the others to work well. An AI assistant is only as good as the knowledge base behind it, and a knowledge base is only useful if it's actually integrated into where customers ask questions. Analytics close the loop by showing which questions the assistant handles well and where a human still needs to step in.

## Why Companies Invest Here

Support automation done well doesn't replace a support team, it removes the repetitive share of their workload so they can spend time on the issues that actually need a person. Businesses that invest here are usually seeing support volume grow ahead of headcount, or losing sales to slow response times outside business hours.

The alternative, hiring further into a support team to cover the same repeat questions around the clock, is expensive and doesn't scale cleanly. A well-built support system handles the predictable volume automatically and routes anything that needs judgement to a human, which keeps response times low without proportionally increasing headcount.`,
    features: [
      {
        icon: BsRobot,
        name: "AI Support Assistant",
        image: srvc21,
        slug: "ai-support-assistant",
        shortDescription:
          "An AI assistant trained on your products, policies, and support history that answers customer questions instantly and accurately.",
        markdown: `## What This Solves

Most customer questions are repeats of questions already answered dozens of times before. Shipping timelines, return policies, sizing, product compatibility. Answering these manually, one conversation at a time, ties up support staff who could be handling the harder cases that actually need judgement.

## Why It Matters

Customers expect an immediate response, and a delay of even a few hours can be the difference between a completed purchase and an abandoned one, especially for pre-sale questions. A support assistant that answers accurately and instantly removes that delay without requiring a person to be available around the clock.

## Our Approach

We build the assistant around the business's actual product catalogue, policies, and support history rather than a generic chatbot script. That means the assistant is trained on real documentation, existing support tickets, and product data, and is scoped to know what it can answer confidently and when to hand a conversation to a human instead of guessing.

Accuracy matters more than coverage. An assistant that answers every question but gets some of them wrong causes more damage than one that only answers what it's confident about and escalates the rest. We build in that judgement from the start, along with clear handoff points to human support when a conversation needs one.

The assistant connects directly to the support channels customers already use, so it fits into the existing experience rather than becoming a separate tool customers have to learn.

## Typical Deliverables

Assistant training on product and policy data, escalation logic to human support, integration with existing support channels, and ongoing accuracy monitoring.`,
        deliverables: [
          "Assistant trained on product and policy data",
          "Escalation logic to human agents",
          "Integration with existing support channels",
          "Conversation logging and review",
          "Accuracy monitoring and retraining",
          "Custom tone and response guidelines",
        ],
        idealFor: [
          "Brands with high repeat-question volume",
          "Support teams stretched across time zones",
          "Ecommerce stores with pre-sale questions",
          "Teams wanting faster first response times",
        ],
        outcomes: [
          "Instant responses to common questions",
          "Reduced repetitive workload for staff",
          "Faster first response times",
          "More consistent answers across conversations",
        ],
        technologies: ["Vercel AI SDK", "LLM APIs", "Vector search", "Node.js"],
      },
      {
        icon: MdSupportAgent,
        name: "24/7 Customer Coverage",
        image: srvc22,
        slug: "24-7-customer-coverage",
        shortDescription:
          "Support coverage that continues after hours and on weekends, reducing repetitive requests waiting for your team each morning.",
        markdown: `## What This Solves

Customers don't stop asking questions when the support team logs off. A question asked at midnight either waits until morning or goes unanswered entirely, and by the time a team returns, they're often working through a backlog of the same handful of question types instead of the issues that actually need their attention.

## Why It Matters

Response time affects both customer satisfaction and sales. A customer with a pre-purchase question who doesn't get an answer within a reasonable window often simply leaves. Across time zones and weekends, that gap in coverage represents a consistent, measurable amount of lost business and delayed resolutions, even if no single instance feels significant on its own.

## Our Approach

We extend support coverage using the same AI assistant built on the business's actual knowledge base, so that after-hours questions get accurate answers rather than an automated message asking the customer to wait. Anything the assistant can't handle confidently is queued and flagged for the team, so nothing that needs a human is silently lost.

This isn't about replacing a team's working hours with automation entirely. It's about making sure the predictable, answerable questions get handled immediately regardless of when they arrive, while everything else is ready and prioritised for the team when they're back online, rather than buried in an inbox.

## Typical Deliverables

After-hours response coverage, escalation queue for unresolved issues, priority flagging for the support team, and reporting on after-hours volume and resolution.`,
        deliverables: [
          "After-hours response coverage",
          "Escalation queue for complex issues",
          "Priority flagging for returning staff",
          "Weekend and holiday coverage",
          "After-hours volume reporting",
        ],
        idealFor: [
          "Global customer bases across time zones",
          "Small support teams without night coverage",
          "Brands with high weekend order volume",
          "Teams wanting to reduce morning backlog",
        ],
        outcomes: [
          "Coverage outside business hours",
          "Fewer questions left unanswered overnight",
          "Reduced morning ticket backlog",
          "More consistent response times",
        ],
      },
      {
        icon: FiDatabase,
        name: "Knowledge Base Integration",
        image: srvc23,
        slug: "knowledge-base-integration",
        shortDescription:
          "Bringing FAQs, policies, documentation, and support content together into one source the AI assistant can draw on accurately.",
        markdown: `## What This Solves

Support knowledge is usually scattered across a help centre, internal documents, old email threads, and whatever individual agents happen to remember. An AI assistant, or a new hire for that matter, can only be as accurate as the information it has access to, and scattered knowledge produces inconsistent answers.

## Why It Matters

An assistant that gives a wrong answer because it was working from outdated documentation causes more harm than one that says it doesn't know. Keeping a single, accurate, current source of support knowledge is what makes automated answers trustworthy rather than a liability.

## Our Approach

We consolidate the business's existing FAQs, policy documents, product information, and historical support conversations into a structured knowledge base the assistant can query directly. This isn't a one-time export, it's built with a process for keeping content current as policies, products, and pricing change, so the assistant doesn't drift out of date the way static documentation usually does.

We also structure the content specifically for how an AI system retrieves and reasons over it, which is different from how a help centre article is written for a human reader. That distinction matters for accuracy: content that reads well to a person doesn't always retrieve well for a system answering a specific question.

## Typical Deliverables

Knowledge base consolidation, content structuring for AI retrieval, update workflows for changing policies, and version tracking for support content.`,
        deliverables: [
          "Knowledge base consolidation",
          "Content structuring for AI retrieval",
          "Policy and pricing update workflow",
          "Version tracking for support content",
          "Gap analysis for missing documentation",
        ],
        idealFor: [
          "Businesses with scattered support documentation",
          "Teams updating policies frequently",
          "Brands scaling their FAQ and help centre",
          "Support teams onboarding new agents often",
        ],
        outcomes: [
          "More accurate assistant responses",
          "Consistent answers across support content",
          "Faster updates when policies change",
          "Reduced reliance on individual agent memory",
        ],
      },
      {
        icon: FiZap,
        image: srvc24,
        name: "Lead Qualification",
        slug: "lead-qualification",
        shortDescription:
          "Automatically screening inbound conversations to identify qualified prospects so your sales team spends time on leads worth pursuing.",
        markdown: `## What This Solves

Not every inbound conversation is a sales opportunity, but sorting genuine prospects from casual browsers usually falls to the sales team itself, which means time spent on conversations that were never going to convert. At volume, that filtering work becomes a meaningful drain on a team that should be focused on closing.

## Why It Matters

Sales capacity is finite and expensive. A team that spends its time qualifying leads has less time to spend actually selling to the ones worth pursuing. The cost isn't always visible in a single conversation, but it shows up over a quarter as a lower close rate relative to the hours the team put in.

## Our Approach

We build qualification directly into the support and sales conversation flow, using the same assistant infrastructure already answering customer questions. The assistant asks the right clarifying questions early, based on criteria the business defines, budget, timeline, use case, company size, whatever actually predicts a good fit, and routes conversations accordingly.

Qualified leads are passed to sales with the context already gathered, so the first human conversation starts further along than a cold introduction would. Unqualified conversations are still handled respectfully, just without consuming sales team time they don't need to.

## Typical Deliverables

Qualification criteria definition, conversational qualification flow, lead scoring and routing logic, and CRM handoff integration.`,
        deliverables: [
          "Qualification criteria definition",
          "Conversational qualification flow",
          "Lead scoring logic",
          "Automated routing to sales",
          "CRM handoff integration",
          "Reporting on qualified vs unqualified volume",
        ],
        idealFor: [
          "Sales teams with high inbound volume",
          "B2B businesses with longer sales cycles",
          "Teams wanting a more efficient pipeline",
          "Businesses qualifying leads manually today",
        ],
        outcomes: [
          "More efficient sales team time",
          "Higher quality pipeline",
          "Faster lead response times",
          "Better context for the first sales conversation",
        ],
      },
      {
        icon: MdDashboard,
        image: srvc25,
        name: "Support Analytics",
        slug: "support-analytics",
        shortDescription:
          "Clear reporting on customer issues, common questions, and support trends that turns conversation data into decisions your team can use.",
        markdown: `## What This Solves

Every support conversation contains information about what's actually going wrong with a product or process, but that information is usually locked inside individual tickets and never aggregated into something a team can act on. Without visibility into patterns, the same product issue can generate support tickets for months before anyone notices it's systemic.

## Why It Matters

Support data is one of the most direct signals a business has about where products, policies, or processes are causing friction for customers. Teams that can see patterns in that data, not just individual tickets, can fix root causes instead of repeatedly treating the same symptom one conversation at a time.

## Our Approach

We build reporting that aggregates conversation data into clear, usable views: which questions come up most often, where the assistant is escalating to humans and why, how resolution times trend over time, and which issues correlate with specific products or periods. This is built around the specific metrics that matter to the business, not a generic analytics template.

The goal is a dashboard the team actually checks, not a report that gets generated and ignored. That means keeping it focused on a small number of metrics that drive decisions, with the ability to drill into specifics when a trend needs investigating further.

## Typical Deliverables

Support conversation analytics, trend and pattern reporting, escalation rate tracking, and a dashboard built around the team's actual decision-making needs.`,
        deliverables: [
          "Conversation analytics dashboard",
          "Common question and trend tracking",
          "Escalation rate reporting",
          "Resolution time tracking",
          "Product or issue correlation reporting",
        ],
        idealFor: [
          "Support leads tracking team performance",
          "Product teams needing customer feedback signals",
          "Businesses scaling support operations",
          "Teams wanting data-backed process improvements",
        ],
        outcomes: [
          "Visibility into support trends",
          "Faster identification of systemic issues",
          "Data-backed process improvements",
          "Clearer reporting for leadership",
        ],
      },
    ],
  },

  {
    title: "Revenue Systems For Ecommerce Brands",
    slug: "revenue-systems-for-ecommerce-brands",
    brandIcon: MdShoppingCart,
    image: srvc1,
    markdown: `## The Problem

Most ecommerce brands run on a patchwork of storefront themes, plugins, and disconnected tools that were never designed to work together. Each addition solves one problem while creating three more: slower page loads, inconsistent data between systems, and a checkout flow that leaks revenue at every step.

## How These Systems Work Together

A storefront is only as good as what sits behind it. We build and connect five layers that together form a single revenue system: the storefront itself, the performance work that keeps it fast under real traffic, the customer journey that carries a visitor from landing page to purchase, the inventory and fulfilment logic that keeps promises accurate, and the integrations that tie ecommerce to CRM, support, and logistics.

Each layer is engineered to support the others. A fast storefront means little if checkout friction turns visitors away. A smooth checkout means little if inventory data is wrong and orders can't be fulfilled. We treat revenue as the output of a system, not a single feature.

## Why Companies Invest Here

Off-the-shelf platforms get a brand to launch. They rarely get a brand past the point where growth exposes their limits: slow pages under load, manual reconciliation between systems, support teams answering the same fulfilment questions daily. Custom engineering removes these ceilings by building around how the business actually operates instead of forcing operations to fit a template.

Brands that invest in this area are usually past their first year of trading and have outgrown the tools that got them started. They need a storefront and back office built to their own margins, catalogue complexity, and order volume, not a generic implementation shared with thousands of other stores.`,
    features: [
      {
        icon: MdStorefront,
        image: srvc11,
        name: "High-Converting Storefronts",
        slug: "high-converting-storefronts",
        shortDescription:
          "Custom-built storefronts engineered to increase conversion rates, raise average order value, and build lasting customer trust throughout the buying experience.",
        markdown: `## What This Solves

A storefront built from a generic theme communicates generic. It loads slower than it should, presents products in a layout that wasn't designed for your catalogue, and asks customers to trust a brand that looks like a thousand others running the same template. For ecommerce brands competing on more than price, that gap shows up directly in conversion rate.

## Why It Matters

Customers decide within seconds whether a store feels credible. Page structure, image quality, load speed, and checkout clarity all contribute to that decision before a single word of copy is read. A storefront that is slow, cluttered, or inconsistent with the rest of the brand experience loses buyers who would otherwise have purchased, regardless of how good the product is.

## Our Approach

We design and build storefronts around the specific catalogue, price point, and buying behaviour of the business, not a template's assumptions. That means custom product layouts for how items are actually browsed and compared, checkout flows with the fewest possible steps between intent and purchase, and a visual system consistent with the brand across every page.

Every storefront is built with the same engineering discipline as the systems behind it: clean code, sensible component structure, and performance considered from the first commit rather than patched in afterward.

## Typical Deliverables

Custom storefront architecture, product and category page design, checkout flow design, responsive layouts across devices, and a component system the team can extend without rebuilding pages from scratch.`,
        deliverables: [
          "Custom storefront architecture",
          "Product and category page design",
          "Checkout flow design and build",
          "Responsive layouts for all devices",
          "Reusable component library",
          "Brand-consistent visual system",
          "Page speed budget built into design",
          "Analytics and conversion tracking setup",
        ],
        idealFor: [
          "Growing ecommerce brands",
          "DTC companies scaling past their first platform",
          "Brands outgrowing template themes",
          "Retailers with complex product catalogues",
        ],
        outcomes: [
          "Higher conversion rates",
          "Increased average order value",
          "Faster page load times",
          "Stronger brand credibility at checkout",
        ],
        technologies: ["Next.js", "Shopify", "TypeScript", "Tailwind CSS"],
      },
      {
        icon: MdAutoGraph,
        name: "Performance Optimisation",
        image: srvc12,
        slug: "performance-optimisation",
        shortDescription:
          "Technical performance work that reduces load times, prevents abandoned sessions, and keeps checkout fast even during high-traffic sales events.",
        markdown: `## What This Solves

Every additional second a page takes to load costs conversions. Slow product pages, bloated checkout scripts, and unoptimised images push visitors to abandon before they buy, and that cost compounds during high-traffic periods like sales events, when performance problems that go unnoticed on a quiet day become checkout failures under load.

## Why It Matters

Performance is not a cosmetic concern. Search rankings, ad quality scores, and conversion rates are all directly affected by how fast pages load and respond. A storefront that performs well under normal traffic can still fail during a promotion or product launch if it was never engineered to handle spikes in concurrent users.

## Our Approach

We treat performance as a measurable engineering target, not a vague goal. That means auditing render-blocking scripts, image delivery, third-party tags, and server response times, then addressing each bottleneck individually rather than applying generic optimisation checklists. Where a platform's defaults are the constraint, we work around them with custom caching, lazy loading, and code-splitting strategies suited to the store's actual traffic patterns.

Testing happens under realistic load, not just on a developer's machine with an empty cart and no competing scripts. The goal is a storefront that stays fast at checkout, during a flash sale, and on the slowest device a real customer is likely to use.

## Typical Deliverables

Performance audits, image and asset optimisation, script loading strategy, caching configuration, and load testing before major sales events.`,
        deliverables: [
          "Full performance audit",
          "Image and asset optimisation",
          "Script loading and third-party tag review",
          "Caching and CDN configuration",
          "Code splitting and lazy loading setup",
          "Load testing for peak traffic events",
          "Core Web Vitals improvements",
        ],
        idealFor: [
          "Stores with high cart abandonment",
          "Brands running seasonal sales campaigns",
          "Sites with heavy third-party scripts",
          "High-traffic ecommerce catalogues",
        ],
        outcomes: [
          "Faster page load times",
          "Fewer abandoned sessions",
          "Improved search rankings",
          "Stable performance during traffic spikes",
        ],
        technologies: [
          "Next.js",
          "Lighthouse",
          "CDN caching",
          "Image optimisation pipelines",
        ],
      },
      {
        icon: FiCheckCircle,
        name: "Customer Journey Optimisation",
        image: srvc13,
        slug: "customer-journey-optimisation",
        shortDescription:
          "Mapping and refining every step from landing page to checkout to remove friction, reduce drop-off, and increase completed purchases.",
        markdown: `## What This Solves

Most conversion loss doesn't happen at checkout, it happens earlier, in the small points of friction a customer hits before ever reaching the payment page: confusing navigation, unclear shipping information, an extra form field that didn't need to exist. Each of these is minor on its own. Together they explain why a store with decent traffic still converts poorly.

## Why It Matters

Customers rarely abandon a purchase because of one dramatic failure. They abandon because the path from interest to purchase asked more of them than it needed to. Identifying exactly where that happens requires looking at real behaviour, not assumptions about what customers want.

## Our Approach

We map the actual path customers take through the store using session data, funnel analysis, and direct observation of the checkout flow, then identify the specific steps causing drop-off. From there we redesign the journey around removing unnecessary decisions and inputs rather than adding more content or persuasion elements.

This often means simplifying navigation, reducing checkout fields to what's genuinely required, clarifying shipping and return information earlier in the journey, and making sure the path from product page to purchase is as short as the business model allows. Changes are validated against real conversion data rather than shipped on instinct.

## Typical Deliverables

Customer journey mapping, funnel analysis, checkout flow redesign, friction audits, and A/B testing of key conversion points.`,
        deliverables: [
          "Customer journey mapping",
          "Funnel and drop-off analysis",
          "Checkout flow redesign",
          "Form and field reduction audit",
          "Navigation and information architecture review",
          "A/B testing of conversion points",
        ],
        idealFor: [
          "Stores with high traffic but low conversion",
          "Brands with complex checkout flows",
          "Multi-step purchase journeys",
          "Teams lacking behavioural data on customers",
        ],
        outcomes: [
          "Higher checkout completion rates",
          "Reduced cart abandonment",
          "Clearer purchase paths",
          "Data-backed conversion improvements",
        ],
      },
      {
        icon: MdCloudQueue,
        name: "Inventory & Fulfilment Sync",
        image: srvc14,
        slug: "inventory-fulfilment-sync",
        shortDescription:
          "Connecting product, inventory, order, and fulfilment data into one reliable workflow so stock levels and shipping stay accurate.",
        markdown: `## What This Solves

Selling across a storefront, a warehouse system, and one or more fulfilment partners creates constant risk of the numbers not matching. A product sells out in the warehouse but still shows as available online. An order ships but the storefront never updates. Each mismatch becomes a customer service problem, and at volume these problems compound quickly.

## Why It Matters

Customers expect stock levels and delivery estimates to be accurate. When they aren't, the cost isn't just a single bad order, it's a support ticket, a refund, and often a customer who doesn't order again. Manual reconciliation between systems doesn't scale past a certain order volume, and errors tend to increase exactly when the business is growing fastest.

## Our Approach

We build direct integrations between the storefront, inventory system, and fulfilment partners so that stock, order status, and shipping information stay synchronised without manual intervention. This includes handling the edge cases that generic integrations miss, such as partial fulfilment, backorders, multi-warehouse stock, and returns that need to update inventory correctly.

The goal is a workflow where an order placed on the storefront reflects accurately in the warehouse within moments, and a change in stock or fulfilment status reflects back on the storefront just as quickly. This is engineered around the specific systems the business already uses rather than requiring a switch to a new platform.

## Typical Deliverables

Inventory sync architecture, order and fulfilment integration, multi-warehouse stock logic, backorder and returns handling, and monitoring for sync failures.`,
        deliverables: [
          "Inventory sync architecture",
          "Order and fulfilment integrations",
          "Multi-warehouse stock logic",
          "Backorder handling",
          "Returns and refund inventory updates",
          "Sync failure monitoring and alerts",
        ],
        idealFor: [
          "Brands selling across multiple channels",
          "Businesses with third-party fulfilment partners",
          "Multi-warehouse operations",
          "High-volume order processing",
        ],
        outcomes: [
          "Accurate stock levels across channels",
          "Fewer fulfilment errors",
          "Reduced manual reconciliation",
          "Better delivery estimate accuracy",
        ],
        technologies: [
          "ShipStation",
          "Shopify",
          "REST/Webhook integrations",
          "PostgreSQL",
        ],
      },
      {
        icon: MdIntegrationInstructions,
        name: "Business System Integrations",
        image: srvc15,
        slug: "business-system-integrations",
        shortDescription:
          "Linking ecommerce, CRM, support, email, and logistics platforms so data moves automatically across the entire business operation without manual re-entry.",
        markdown: `## What This Solves

Growing ecommerce businesses tend to accumulate tools faster than they connect them. The storefront runs on one platform, customer data lives in a CRM, support runs through a separate helpdesk, and logistics is tracked in yet another system. Without integration, staff spend hours a week manually moving information between them, and that information drifts out of sync almost immediately.

## Why It Matters

Disconnected systems create invisible operational cost. A support agent without order history takes longer to resolve a ticket. A marketing team without accurate customer data sends the wrong offer to the wrong segment. None of these failures show up as a single obvious problem, but together they slow the business down and introduce errors that are hard to trace back to their source.

## Our Approach

We build integrations between the specific systems a business already relies on, using each platform's API rather than forcing a migration to new software. Data is mapped carefully so that a customer record, an order, or a support ticket means the same thing in every system it touches, and updates in one place propagate automatically to the others.

This work is scoped around what the business actually needs connected, not every system that could theoretically be linked. The result is fewer manual handoffs, fewer data entry errors, and a team that can trust the numbers in front of them without checking three other tools first.

## Typical Deliverables

System integration architecture, API-based data mapping, automated sync between platforms, error handling and monitoring, and documentation for the connected workflow.`,
        deliverables: [
          "Integration architecture across systems",
          "API-based data mapping",
          "Automated data sync",
          "Error handling and retry logic",
          "Sync monitoring and alerts",
          "Integration documentation",
        ],
        idealFor: [
          "Businesses running multiple disconnected tools",
          "Operations teams doing manual data entry",
          "Support teams needing order context",
          "Growing teams scaling past spreadsheets",
        ],
        outcomes: [
          "Less manual data entry",
          "Consistent data across systems",
          "Faster support resolution times",
          "Better operational visibility",
        ],
        technologies: [
          "REST APIs",
          "Webhooks",
          "Custom middleware",
          "PostgreSQL",
        ],
      },
    ],
  },
];