import { Card } from "@/components/ui/card";
import { Contact, HomeIcon, Projector } from "lucide-react";
import { FaBlog, FaShopify } from "react-icons/fa";
import {
  MdShoppingCart,
  MdDashboard,
  MdSupportAgent,
  MdStorefront,
  MdAutoGraph,
} from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { FiZap, FiCheckCircle, FiDatabase, FiCpu } from "react-icons/fi";
import Link from "next/link";
import { linkType } from "./nav.types";

// Expanded to cover the full spectrum of your core services for clean routing/mobile menus
export const services = [
  {
    label: "Custom E-commerce Storefronts",
    link: "/services/ecommerce",
    icon: MdStorefront,
  },
  {
    label: "Performance Optimization",
    link: "/services/ecommerce",
    icon: MdAutoGraph,
  },
  {
    label: "AI Customer Support Automation",
    link: "/services/automation",
    icon: BsRobot,
  },
  {
    label: "Operations Command Centers",
    link: "/services/operations",
    icon: MdDashboard,
  },
  {
    label: "Workflow Automation Systems",
    link: "/services/operations",
    icon: FiZap,
  },
  {
    label: "Continuous Technical Partnership",
    link: "/services/partnership",
    icon: MdSupportAgent,
  },
];

export const links: linkType[] = [
  {
    label: "Posts",
    link: "/",
    icon: HomeIcon,
    drop: false,
  },
  {
    label: "Services",
    link: "/services",
    icon: Contact,
    drop: true,
    children: (
      <Card className="p-6 shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 grid grid-cols-12 gap-6 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
        {/* Left Side: Main Core Offerings (8-column grid layout) */}
        <div className="col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-r border-zinc-100 dark:border-zinc-900 pr-6">
          {/* 1. Revenue Systems */}
          <a
            href="/services/ecommerce"
            className="group flex flex-col gap-1.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <MdShoppingCart className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">E-commerce Revenue Systems</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Custom high-converting storefronts, performance optimizations, and
              inventory or fulfillment integrations.
            </p>
          </a>

          {/* 2. Customer Support Automation */}
          <a
            href="/services/automation"
            className="group flex flex-col gap-1.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              <BsRobot className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Customer Support Automation</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              24/7 AI-powered support assistants, automated lead qualification,
              and contextual knowledge base syncs.
            </p>
          </a>

          {/* 3. Internal Operations & Dashboards */}
          <a
            href="/services/operations"
            className="group flex flex-col gap-1.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <MdDashboard className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Internal Tools & Dashboards</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Operations command centers, custom workflows, document extraction,
              and cross-system integrations.
            </p>
          </a>

          {/* 4. Long-Term Technical Partner */}
          <a
            href="/services/partnership"
            className="group flex flex-col gap-1.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              <MdSupportAgent className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Long-Term Technical Partner</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Continuous performance monitoring, monthly maintenance updates,
              security protocols, and engineering advice.
            </p>
          </a>
        </div>

        {/* Right Side: Visual High-Converting CTA Area (4-column container) */}
        <div className="col-span-4 flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900/60 dark:to-zinc-900/20 border border-blue-100/50 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 mb-3">
              <FiZap className="w-3 h-3 animate-pulse text-blue-500" />
              <span>Instant Value Loop</span>
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Free Website Audit
            </h4>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Analyze your current architecture, performance, and business
              messaging metrics using our AI scanner.
            </p>
          </div>
          <Link
            href="/audit"
            className="mt-4 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow transition-colors w-full text-center font-semibold"
          >
            <span>Run Free Audit</span>
            <FiCheckCircle className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>
    ),
  },
  {
    label: "Portfolio",
    link: "/portfolio",
    icon: Projector,
    drop: true,
    children: (
      <Card className="p-6 shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
        {/* Left Side Column: Live Client Systems Built (6-column layout) */}
        <div className="flex flex-col gap-3.5 border-r border-zinc-100 dark:border-zinc-900 pr-6">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
            Featured Client Deployments
          </div>

          {/* Case 1: MS Mart */}
          <a
            href="/cases/msmart"
            className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-500 transition-colors">
              <FaShopify className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                <span>MS Mart</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full font-normal">
                  Shopify + AI
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Headless WooCommerce core matched with AI social automation.
              </p>
            </div>
          </a>

          {/* Case 2: Sliboard */}
          <a
            href="/cases/sliboard"
            className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-500 transition-colors">
              <BsRobot className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                <span>Sliboard</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full font-normal">
                  AI SaaS
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Lesson orchestration platform backed by real-time canvas layers.
              </p>
            </div>
          </a>

          {/* Case 3: College Admission Portal */}
          <a
            href="/cases/college-portal"
            className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 group-hover:text-emerald-500 transition-colors">
              <MdDashboard className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>Admission Portal</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full font-normal">
                  Web App
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Institutional CRM with live review dashboards and tracking
                loops.
              </p>
            </div>
          </a>
        </div>

        {/* Right Side Column: Interactive AI & Systems Labs (6-column layout) */}
        <div className="flex flex-col gap-3.5 pl-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
            Active Capability Demos
          </div>

          {/* Audit Demo */}
          <a
            href="/cases/audit"
            className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/40 group-hover:text-amber-500 transition-colors">
              <FiZap className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                AI Website Audit System
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Runs instant PageSpeed integrations alongside Jina AI extraction
                filters.
              </p>
            </div>
          </a>

          {/* Assistant Demo */}
          <a
            href="/cases/aria"
            className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/40 group-hover:text-purple-500 transition-colors">
              <FiDatabase className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                AI Business Assistant
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Advanced RAG engine configured with streaming vectors for
                instant answer lookups.
              </p>
            </div>
          </a>

          {/* Lead Qualification Demo */}
          <a
            href="/cases/booking"
            className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 group-hover:text-red-500 transition-colors">
              <FiCpu className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Automated Lead Qualification
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Multi-step intelligent funnel capturing requirements and
                matching to Cal.com.
              </p>
            </div>
          </a>
        </div>
      </Card>
    ),
  },
];
