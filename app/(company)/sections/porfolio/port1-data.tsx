import { IconType } from "react-icons/lib";
import img1 from "@/public/bg.jpg";
import img2 from "@/public/bg.jpg";
import {
  TbBrandNextjs,
  TbBrandFramerMotion,
  TbBrandReact,
  TbBrandTailwind,
} from "react-icons/tb";
import { StaticImageData } from "next/image";

type portDataType = {
  name: string;
  description: string;
  techStack: { icon: IconType; name: string }[];
  images: StaticImageData[];
  link: string;
  details: string;
  caseLink: string;
};
export const port1Data: portDataType[] = [
  {
    name: "AI Website Audit System",
    caseLink: "/cases/audit",
    description:
      "Automated website analysis platform that evaluates performance, extracts business messaging, and generates actionable recommendations using AI.",
    details: `

## Overview

A production-ready AI audit system built to provide instant website evaluations for potential clients.

Instead of filling out a contact form and waiting for feedback, visitors can enter their website and immediately receive an AI-generated analysis.

## What It Does

* Runs performance analysis using Google PageSpeed
* Extracts and understands website content using Jina AI
* Evaluates messaging, positioning, and user experience
* Generates AI-powered recommendations
* Displays mobile and desktop performance metrics
* Produces a structured business and technical audit

## Why It Was Built

Most agencies ask prospects to book a call before delivering value.

This system demonstrates technical capabilities immediately by providing useful insights before any conversation takes place.

## Technologies

* Next.js
* React
* TypeScript
* AI SDK
* GPT-OSS-120B
* Google PageSpeed API
* Jina AI
* Recharts
  `,
    link: "/audit",
    images: [img1, img2, img2, img2],
    techStack: [
      {
        name: "Next.js",
        icon: TbBrandNextjs,
      },
      {
        name: "Motion",
        icon: TbBrandFramerMotion,
      },
      {
        name: "React",
        icon: TbBrandReact,
      },
      {
        name: "Tailwind",
        icon: TbBrandTailwind,
      },
    ],
  },
  {
    name: "AI Audit System",
    caseLink: "/cases/audit",
    description:
      "Automated website analysis platform that evaluates performance, extracts business messaging, and generates actionable recommendations using AI.",
    details: `

## Overview

A production-ready AI audit system built to provide instant website evaluations for potential clients.

Instead of filling out a contact form and waiting for feedback, visitors can enter their website and immediately receive an AI-generated analysis.

## What It Does

* Runs performance analysis using Google PageSpeed
* Extracts and understands website content using Jina AI
* Evaluates messaging, positioning, and user experience
* Generates AI-powered recommendations
* Displays mobile and desktop performance metrics
* Produces a structured business and technical audit

## Why It Was Built

Most agencies ask prospects to book a call before delivering value.

This system demonstrates technical capabilities immediately by providing useful insights before any conversation takes place.

## Technologies

* Next.js
* React
* TypeScript
* AI SDK
* GPT-OSS-120B
* Google PageSpeed API
* Jina AI
* Recharts
  `,
    link: "/audit",
    images: [img1, img2, img2, img2],
    techStack: [
      {
        name: "Next.js",
        icon: TbBrandNextjs,
      },
      {
        name: "Motion",
        icon: TbBrandFramerMotion,
      },
      {
        name: "React",
        icon: TbBrandReact,
      },
      {
        name: "Tailwind",
        icon: TbBrandTailwind,
      },
    ],
  },

  {
    name: "AI Business Assistant",
    caseLink: "/cases/aria",
    description:
      "Retrieval-augmented AI assistant trained on company knowledge, services, processes, and project information.",
    details: `

## Overview

An AI-powered assistant integrated directly into the Kinetous website.

The system allows visitors to ask questions about services, technologies, project workflows, pricing considerations, and business challenges without waiting for a response.

## What It Does

* Answers questions about Kinetous
* Explains services and capabilities
* Provides project guidance
* Assists potential clients with discovery
* Delivers instant responses 24/7
* Maintains contextual conversations

## Why It Was Built

Most agency websites force visitors through forms and sales funnels.

This system reduces friction by allowing visitors to interact directly with an AI assistant before booking a call.

## Technologies

* Next.js
* React
* TypeScript
* AI SDK
* GPT-OSS-120B
* RAG Architecture
* Vector Search
* Streaming Responses
  `,
    link: "#chat",
    images: [img1, img2, img2, img2],
    techStack: [
      {
        name: "Next.js",
        icon: TbBrandNextjs,
      },
      {
        name: "Motion",
        icon: TbBrandFramerMotion,
      },
      {
        name: "React",
        icon: TbBrandReact,
      },
      {
        name: "Tailwind",
        icon: TbBrandTailwind,
      },
    ],
  },

  {
    name: "Automated Lead Qualification System",
    caseLink: "/cases/booking",
    description:
      "A multi-step lead capture and scheduling workflow designed to qualify prospects and automate discovery conversations.",
    details: `

## Overview

An automated lead generation and qualification workflow integrated into the Kinetous website.

The system guides visitors from initial interest to scheduled consultation without requiring manual intervention.

## What It Does

* Captures qualified leads
* Collects project requirements
* Routes visitors toward relevant services
* Automates scheduling through Cal.com
* Reduces friction in the contact process
* Creates a streamlined sales workflow

## Why It Was Built

Many service businesses lose potential clients because of slow response times and complicated contact processes.

This workflow removes unnecessary steps and allows prospects to move directly from interest to conversation.

## Technologies

* Next.js
* React
* TypeScript
* Cal.com
* AI SDK
* Automation Workflows
* Server Actions
* Custom Integrations
  `,
    link: "#contact",
    images: [img1, img2, img1, img2],
    techStack: [
      {
        name: "Next.js",
        icon: TbBrandNextjs,
      },
      {
        name: "Motion",
        icon: TbBrandFramerMotion,
      },
      {
        name: "React",
        icon: TbBrandReact,
      },
      {
        name: "Tailwind",
        icon: TbBrandTailwind,
      },
    ],
  },
];
