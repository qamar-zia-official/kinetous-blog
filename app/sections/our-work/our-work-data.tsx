import msmart from "@/public/msmart.png";
import qql from "@/public/msmart.png";
import { StaticImageData } from "next/image";

type OurWork = {
  title: string;
  type: string; // tag pill label
  description: string;
  systems: string[]; // "Systems Built" tags
  link: string;
  caseStudy: string;
  image: StaticImageData[];
}[];

export const ourWorkData: OurWork = [
  {
    title: "MS Mart",
    type: "Shopify + AI Systems",
    description:
      "Full-stack e-commerce store with a custom Shopify storefront, headless WooCommerce CMS, and an AI content engine that auto-generates product posts for Instagram and TikTok directly from the catalogue.",
    systems: [
      "Custom Shopify Storefront",
      "AI Content Engine",
      "Remotion Video Ads",
      "Inventory Automation",
      "Social Auto-Posting",
    ],
    link: "https://msmart.pk",
    caseStudy: "/cases/msmart",
    image: [msmart, msmart],
  },
  {
    title: "Sliboard",
    type: "AI SaaS Product",
    description:
      "Our own SaaS platform — an interactive lesson builder for educators. Teachers compose slides with a live Excalidraw whiteboard overlay and AI-generated lesson content. Launching at our own college.",
    systems: [
      "AI Lesson Generation",
      "Excalidraw Integration",
      "Real-Time Collaboration",
      "Next.js + Supabase",
    ],
    link: "https://sliboard.com",
    caseStudy: "/cases/sliboard",
    image: [qql, qql],
  },
  {
    title: "College Admission Portal",
    type: "Institutional Web App",
    description:
      "Full institutional website with a digital admission management system. Applications, status tracking, staff review dashboard, and applicant communication — built for a Pakistani college launching this month.",
    systems: [
      "Admission Portal",
      "Staff Dashboard",
      "Applicant Tracking",
      "Status Notifications",
    ],
    link: "https://startskills.Kinetous.com",
    caseStudy: "/cases/college-portal",
    image: [qql, qql],
  },
];
