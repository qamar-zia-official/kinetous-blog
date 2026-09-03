"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";

import { tagCn } from "@/app/design-system";
import { ourWorkData } from "./our-work-data";
import { cn } from "@/lib/utils";
import SectionHeading2 from "../section-heading";

export default function OurWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef(null);

  const next = () => {
    if (api?.canScrollNext()) {
      api.scrollNext();
      setActiveIndex((i) => Math.min(i + 1, ourWorkData.length - 1));
    }
  };

  const previous = () => {
    if (api?.canScrollPrev()) {
      api.scrollPrev();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
  };

  return (
    <section
      id="port2"
      ref={sectionRef}
      className="flex relative flex-col justify-center items-center"
    >
      <div className="w-full">
        <SectionHeading2>Our Work</SectionHeading2>
      </div>

      <div className="min-h-screen flex flex-col overflow-visible justify-center items-center max-w-5xl px-6 pb-16 m-auto w-full">
        <div className="flex flex-col justify-center items-center w-full gap-6">
          {/* ── Carousel ── */}
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              watchDrag: false,
            }}
          >
            <CarouselContent>
              {ourWorkData.map((project, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card
                    key={index}
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-2 gap-8 p-8 overflow-hidden rounded-3xl border-white/10 backdrop-blur-xl",
                    )}
                  >
                    {/* ── Text column ── */}
                    <div className="flex flex-col gap-5 justify-between">
                      <div className="flex flex-col gap-3">
                        {/* Tag */}
                        <span className={tagCn}>
                          {project.type ?? "Full Build"}
                        </span>

                        {/* Title */}
                        <div className="overflow-hidden">
                          <h3 className="text-3xl font-black tracking-tight text-zinc-50">
                            {project.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {project.description}
                        </p>
                      </div>

                      {/* Systems tags — staggered */}
                      {project.systems && (
                        <div className="flex flex-col gap-2">
                          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-semibold">
                            Systems Built
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.systems.map((sys, si) => (
                              <span
                                key={sys}
                                className="text-xs font-mono px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-white/5"
                              >
                                {sys}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold gap-2">
                              Live Demo
                              <ExternalLink size={14} />
                            </Button>
                          </div>
                        </Link>
                        <Link href={project.caseStudy}>
                          <div>
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-white/10 hover:bg-zinc-800 font-semibold"
                            >
                              Case Study
                            </Button>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* ── Image column: hover-tilt perspective ── */}
                    <TiltImageCard project={project} index={index} />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* ── Navigation ── */}
          <div
            style={{
              boxShadow:
                "inset 0px 1px 2px 1px rgba(255,255,255,.1), 2px 1px 2px rgba(0,0,0,.4)",
            }}
            className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full"
          >
            <div>
              <Button
                size="lg"
                className="aspect-square rounded-full"
                onClick={previous}
                aria-label="Previous project"
                style={{
                  boxShadow:
                    "inset 0 1px 2px rgba(255,255,255,.1), 1px 1px 2px rgba(0,0,0,.4)",
                }}
              >
                <ArrowLeft size={16} />
              </Button>
            </div>

            {ourWorkData.map((_, i) => (
              <div key={i} className="h-2.5 rounded-full" />
            ))}

            <div>
              <Button
                size="lg"
                className="aspect-square rounded-full"
                onClick={next}
                aria-label="Next project"
                style={{
                  boxShadow:
                    "inset 0 1px 2px rgba(255,255,255,.1), 1px 1px 2px rgba(0,0,0,.4)",
                }}
              >
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tilt image card ──────────────────────────────────────────────────────────
function TiltImageCard({
  project,
  index,
}: {
  project: (typeof ourWorkData)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `
      perspective(700px)
      translateX(${(index + 1) * 28}px)
      translateZ(${(index + 1) * 28}px)
      translateY(${(index + 1) * 8}px)
      rotateX(${55 - dy * 4}deg)
      rotateY(${-10 + dx * 5}deg)
      rotateZ(-20deg)
    `;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = `
      translateX(${(index + 1) * 28}px)
      translateZ(${(index + 1) * 28}px)
      translateY(${(index + 1) * 8}px)
      rotateX(55deg)
      rotateY(-10deg)
      rotateZ(-20deg)
    `;
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 600);
  };

  return (
    <div
      className="hidden md:flex items-center justify-center overflow-hidden perspective-[700px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={ref}
        style={{
          transform: `translateX(${(index + 1) * 28}px) translateZ(${(index + 1) * 28}px) translateY(${(index + 1) * 8}px) rotateX(55deg) rotateY(-10deg) rotateZ(-20deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          src={project.image[0].src}
          alt={project.title}
          width={560}
          height={380}
          className="rounded-2xl w-full object-cover shadow-2xl shadow-black/60"
        />
      </div>
    </div>
  );
}
