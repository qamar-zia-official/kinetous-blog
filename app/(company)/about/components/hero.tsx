import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-24">
        <div className="max-w-6xl">
          <Badge
            variant="outline"
            className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase"
          >
            About Kinetous
          </Badge>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight leading-[1.05] md:text-7xl">
            Engineering software that becomes part of{" "}
            <span className="text-primary">how your business operates.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            I&apos;m <strong className="text-foreground">Qamar Zia</strong>, a
            full-stack software engineer focused on building custom Shopify
            storefronts, AI automation, internal operational software, and
            business systems that eliminate repetitive work instead of creating
            more of it.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg">
              <Link
                href="/contact"
                className="text-white flex gap-2 items-center justify-center"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="secondary" size="lg">
              <Link href="/work">View Case Studies</Link>
            </Button>
          </div>

          <div className="mt-16 grid gap-6 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Custom engineered solutions. No templates or page builders.
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">AI Native</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Automation, RAG systems, AI assistants and operational tooling
                built from day one.
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">Direct</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Work directly with the engineer designing and building your
                software.
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">Open</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You own your code, infrastructure, deployment and data after
                delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
