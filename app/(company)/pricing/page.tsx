import React from "react";
import Link from "next/link";
import { Check, Calendar } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Flexible Project Pricing
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We do not offer flat-rate fixed pricing. Every project is scoped
          individually based on complexity, integrations, and performance goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-8">
        {/* E-Commerce Tier */}
        <div className="p-8 rounded-xl   bg-zinc-800/50 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Custom E-Commerce</h2>
            <p className="text-muted-foreground text-sm">
              Next.js storefronts, headless commerce API integrations, custom
              dashboard setups, and tailored checkout flows.
            </p>
            <div className="text-3xl font-extrabold text-primary">
              $500 - $10,000+
              <span className="text-sm font-normal text-muted-foreground block mt-1">
                depending on scope
              </span>
            </div>
            <ul className="space-y-3 pt-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Staging access from
                day one
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Direct developer
                access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Core Web Vitals
                optimization
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> 3-6+ weeks timeline
              </li>
            </ul>
          </div>
        </div>

        {/* Maintenance Tier */}
        <div className="p-8 rounded-xl   bg-zinc-800/50 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Monthly Maintenance</h2>
            <p className="text-muted-foreground text-sm">
              Continuous monitoring, system package updates, quick feature
              iterations, bug fixes, and security patches.
            </p>
            <div className="text-3xl font-extrabold text-primary">
              $100 - $2,000+
              <span className="text-sm font-normal text-muted-foreground block mt-1">
                depending on scope / month
              </span>
            </div>
            <ul className="space-y-3 pt-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Regular security
                audits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Dedicated development
                hours
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Real-time error
                monitoring
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Monthly reports
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-secondary/50   text-center max-w-2xl mx-auto space-y-4">
        <h3 className="font-semibold text-lg">Need an exact quote?</h3>
        <p className="text-sm text-muted-foreground">
          We need to understand your current systems, required integrations, and
          launch timeline to give you an accurate cost breakdown.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity text-sm"
          >
            <Calendar className="w-4 h-4" /> Book a Discovery Call
          </Link>
        </div>
      </div>
    </div>
  );
}
