import { IconTile } from "@/components/icon-tile";
import {
  ClipboardList,
  FileText,
  Handshake,
  Monitor,
  Rocket,
  ShieldCheck,
} from "lucide-react";

export const ourProcess = [
  {
    heading: "Discover & Plan",
    paragraph:
      "Every successful project starts by understanding your business—not choosing technologies. We learn how your team works, identify operational bottlenecks, define success, and translate everything into a clear engineering roadmap before development begins.",

    details: [
      {
        label: "Business Discovery",
        icon: <IconTile size="lg" icon={Handshake} />,
        description:
          "We begin by understanding your workflows, goals, existing systems and operational challenges before making technical decisions.",
      },
      {
        label: "Technical Roadmap",
        icon: <IconTile size="lg" icon={ClipboardList} />,
        description:
          "Architecture, integrations, milestones and deliverables are clearly documented so everyone understands the path forward.",
      },
      {
        label: "Transparent Proposal",
        icon: <IconTile size="lg" icon={FileText} />,
        description:
          "You'll receive a clear scope, timeline and pricing with no hidden surprises or unnecessary complexity.",
      },
    ],

    image: <IconTile icon={ClipboardList} size="lg" />,
  },

  {
    heading: "Build With Complete Visibility",

    paragraph:
      "Development happens in small, reviewable milestones instead of disappearing behind closed doors. You'll always know what's being built, what's coming next and where the project stands.",

    details: [
      {
        label: "Live Development Environment",
        icon: <IconTile icon={Monitor} size="lg" />,
        description:
          "Review progress through a live staging environment throughout development instead of waiting until launch day.",
      },
      {
        label: "Regular Progress Updates",
        icon: <IconTile icon={Rocket} size="lg" />,
        description:
          "Frequent updates keep you informed about completed work, upcoming milestones and any decisions that need your input.",
      },
      {
        label: "Direct Collaboration",
        icon: <IconTile icon={Handshake} size="lg" />,
        description:
          "Communicate directly with the people designing and building your software, keeping feedback fast and decisions efficient.",
      },
    ],

    image: <IconTile icon={Monitor} size="lg" />,
  },

  {
    heading: "Launch With Confidence",

    paragraph:
      "Before deployment, every system is reviewed, tested and optimized. Once everything is production-ready, deployment, documentation and knowledge transfer ensure your team can confidently operate the software.",

    details: [
      {
        label: "Production Deployment",
        icon: <IconTile icon={Rocket} size="lg" />,
        description:
          "Deployment, infrastructure configuration and production rollout are handled carefully to ensure a smooth launch.",
      },
      {
        label: "Knowledge Transfer",
        icon: <IconTile icon={Monitor} size="lg" />,
        description:
          "Recorded walkthroughs and practical guidance help your team understand how the system works and how to use it effectively.",
      },
      {
        label: "Documentation",
        icon: <IconTile icon={FileText} size="lg" />,
        description:
          "Clear documentation makes future maintenance, onboarding and long-term ownership much easier.",
      },
    ],

    image: <IconTile icon={Rocket} size="lg" />,
  },

  {
    heading: "Grow Beyond Launch",

    paragraph:
      "Software should continue improving as your business evolves. Many clients continue working with Kinetous to expand capabilities, automate new workflows, improve performance and support long-term growth.",

    details: [
      {
        label: "Continuous Improvements",
        icon: <IconTile icon={Rocket} size="lg" />,
        description:
          "Add new capabilities, integrations and workflow improvements as your business grows and new opportunities emerge.",
      },
      {
        label: "Priority Support",
        icon: <IconTile icon={Handshake} size="lg" />,
        description:
          "Receive responsive technical support, faster issue resolution and dependable assistance whenever it's needed.",
      },
      {
        label: "Long-Term Partnership",
        icon: <IconTile icon={ShieldCheck} size="lg" />,
        description:
          "Kinetous is built around lasting client relationships, helping businesses continuously improve their software rather than treating launch as the finish line.",
      },
    ],

    image: <IconTile icon={ShieldCheck} size="lg" />,
  },
];
