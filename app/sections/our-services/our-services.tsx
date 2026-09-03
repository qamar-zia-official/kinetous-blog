"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  XIcon,
} from "lucide-react";
import Markdown from "react-markdown";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bottomHighlightCn } from "@/app/design-system";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import SectionHeading2 from "../section-heading";
import { useReveal } from "../anim/useObserver";
import { Feature, Service, ourServicesData } from "./our-services-data";
import Link from "next/link";

type ActiveFeature = Feature | null;
type ImageSrc = React.ComponentProps<typeof Image>["src"];

// NOTE ON BREAKPOINT: this component's "desktop layout" (floating title
// pill, absolute icon sidebar) now switches at 768px (Tailwind's `md`) to
// match useIsMobile's MOBILE_BREAKPOINT exactly. It previously switched at
// `lg` (1024px) while the rail below used the hook — that mismatch would
// have left a 768–1023px dead zone where the rail's positioning assumed
// desktop spacing that wasn't there yet. If you'd rather keep the visual
// desktop layout starting at 1024px, useIsMobile needs a second breakpoint
// argument or a separate constant — happy to wire that up instead.

export default function OurServices() {
  return (
    <section id="services" className="flex flex-col items-center py-12 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 sm:gap-6 px-4 my-16 sm:my-24 md:my-40 text-center">
        <SectionHeading2>What I Build</SectionHeading2>

        <p className="max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          Automation and AI-driven operations are the core of what I build.
          Storefront and performance work extends those same systems to the
          customer-facing side of the business.
        </p>

        {/* Jump-to-service overview — order mirrors priority: automation first */}
        <nav
          aria-label="Service categories"
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
        >
          {ourServicesData.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors",
                service.anchor
                  ? "border-blue-600/40 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20"
                  : "border-zinc-800 text-zinc-500 hover:text-zinc-300",
              )}
            >
              {service.title}
            </a>
          ))}
        </nav>
      </div>

      {/*
        Gap is intentionally much smaller below `md`: on mobile the card is
        fully self-contained (title and feature nav live inside it, not
        floating outside its edges), so it doesn't need the huge clearance
        the absolutely-positioned desktop layout requires.
      */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-14 md:gap-40 xl:gap-56 px-4 py-12">
        {ourServicesData.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// View Transitions helper
// -----------------------------------------------------------------------------
// Wraps a state update so the DOM change is animated by the browser itself
// instead of hand-rolled CSS keyframes. Falls back to a plain update when the
// API is unsupported or the person prefers reduced motion.

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

function withViewTransition(update: () => void) {
  const doc = document as DocumentWithViewTransitions;
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || prefersReducedMotion) {
    update();
    return;
  }

  // flushSync forces React to commit synchronously inside the callback, which
  // the API needs so it can snapshot the "after" DOM before animating.
  doc.startViewTransition(() => flushSync(update));
}

// -----------------------------------------------------------------------------
// Card
// -----------------------------------------------------------------------------

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const revealRef = useReveal<HTMLDivElement>();
  const isMobile = useIsMobile();

  const [activeFeature, setActiveFeature] = useState<ActiveFeature>(null);
  const [expanded, setExpanded] = useState(true);
  const [mobileFeatureIndex, setMobileFeatureIndex] = useState(0);

  const currentImage = activeFeature?.image ?? service.image;
  const showSplit = Boolean(activeFeature) && expanded;
  const isPrimary = Boolean(service.anchor);

  const selectFeature = useCallback((feature: Feature) => {
    withViewTransition(() => {
      setActiveFeature(feature);
    });
  }, []);

  const toggleExpanded = useCallback(() => {
    withViewTransition(() => setExpanded((prev) => !prev));
  }, []);

  // Tapping the title: closes the active feature and returns to the master
  // (service-level) slide. Also resets the mobile carousel back to the first
  // feature so the next time it's opened it starts from the top.
  const reset = useCallback(() => {
    withViewTransition(() => {
      setActiveFeature(null);
      setExpanded(true);
      setMobileFeatureIndex(0);
    });
  }, []);

  return (
    <div
      ref={revealRef}
      id={service.slug}
      className="reveal-scale-rise scroll-mt-6 md:scroll-mt-28"
      style={{ "--index": (index * 0.08) / 0.07 } as React.CSSProperties}
    >
      <style>{`
::view-transition-group(service-${index}-image),
::view-transition-group(service-${index}-title),
::view-transition-group(service-${index}-desc)
{
  animation-duration: 520ms;
  animation-timing-function: cubic-bezier(.22, 1, .36, 1);
}

@keyframes service-image-out {
  from {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px) brightness(1);
  }

  to {
    opacity: 0;
    transform: scale(.96);
    filter: blur(6px) brightness(.95);
  }
}

@keyframes service-image-in {
  from {
    opacity: 0;
    transform: scale(1.04);
    filter: blur(6px) brightness(1.05);
  }

  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px) brightness(1);
  }
}

::view-transition-old(service-${index}-image),
::view-transition-old(service-${index}-title),
::view-transition-old(service-${index}-desc)
{
  animation:
    service-image-out 520ms cubic-bezier(.4,0,1,1) both;
}

::view-transition-new(service-${index}-image),
::view-transition-new(service-${index}-title),
::view-transition-new(service-${index}-desc)
{
  animation:
    service-image-in 520ms cubic-bezier(.22,1,.36,1) both;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(service-${index}-image),
  ::view-transition-old(service-${index}-image),
  ::view-transition-new(service-${index}-image) {
    animation: none !important;
  }
}


`}</style>
      <Card
        className={cn(
          "relative overflow-visible md:ml-20",
          "rounded-2xl md:rounded-l-none md:rounded-r-2xl",
          "border-zinc-900 bg-zinc-800/50",
          "md:aspect-video",
        )}
      >
        {/*
          Title/badge: in normal document flow on mobile — it sits inside
          the card like a regular header, no overlap math required. Only at
          `md` (768px, matching useIsMobile) does it detach into the
          floating pill above the card.
        */}
        <CardHeader
          className={cn(
            "relative z-20 flex flex-col items-center justify-center gap-2",
            "px-4 pt-6 pb-3",
            "md:absolute md:-top-20 md:left-0 md:right-0 md:overflow-visible md:px-4 md:pt-0 md:pb-0",
          )}
        >
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-xl",
              isPrimary
                ? "bg-blue-600/90 text-white"
                : "bg-zinc-800/70 text-zinc-400",
            )}
          >
            {isPrimary ? "Core Automation Service" : "Also Available"}
          </span>

          <CardTitle
            style={{
              viewTransitionName: `service-${index}-title`,
            }}
            onClick={reset}
            className={cn(
              "flex max-w-full cursor-pointer items-center justify-center gap-2 px-2 py-1 text-center",
              "text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl",
              "md:max-w-[92vw] md:rounded-full md:bg-zinc-800/50 md:px-6 md:py-4 md:text-3xl md:leading-tight md:backdrop-blur-2xl",
              "md:shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.35)]",
              "transition-all duration-500 md:hover:bg-zinc-800/70",
            )}
          >
            {activeFeature?.name ?? service.title}
            {activeFeature && (
              <XIcon className="shrink-0 rounded-full bg-zinc-800 p-2" size={32} />
            )}
          </CardTitle>
        </CardHeader>

        <CardContent
          className={cn(
            "z-10 flex w-full items-center justify-center p-0",
            showSplit
              ? "items-start px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12"
              : "aspect-video",
          )}
        >
          <div
            style={{
              viewTransitionName: `service-${index}-desc`,
            }}
            className={cn(
              "flex w-full",
              showSplit
                ? "flex-col gap-6 md:flex-row md:items-start md:gap-10"
                : "h-full items-center justify-center",
            )}
          >
            <ImageBlock
              src={currentImage}
              alt={activeFeature?.name ?? service.title}
              split={showSplit}
              clickable={Boolean(activeFeature)}
              expanded={expanded}
              onToggle={toggleExpanded}
              priority={index === 0}
              viewTransitionName={`service-${index}-image`}
            />

            {showSplit && activeFeature && (
              <div className="order-2 w-full md:order-1 md:flex-1">
                <div className="max-h-[45vh] sm:max-h-[50vh] overflow-y-scroll max-w-none prose-p:text-zinc-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400 dark:prose-invert md:prose-base">
                  <div className="prose dark:prose-invert">
                    <Markdown>{activeFeature.shortDescription}</Markdown>
                  </div>
                  <p className="mt-4 text-lg font-bold text-blue-600 sm:text-xl">
                    Deliverables
                  </p>
                  <ul>
                    {activeFeature.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-lg font-bold text-blue-600 sm:text-xl">
                    Outcomes
                  </p>
                  <ul>
                    {activeFeature.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-lg font-bold text-blue-600 sm:text-xl">
                    Ideal For
                  </p>
                  <ul>
                    {activeFeature.idealFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  className="mt-4 flex items-center gap-3 font-semibold tracking-wider text-blue-600 md:mt-0"
                  href={"/services"}
                >
                  Learn More... <ExternalLink className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            )}
          </div>

          {/* Feature rail — desktop/tablet (≥768px): absolute icon sidebar to the left of the card */}
          {!isMobile && (
            <div className="absolute -left-22 right-0 top-0 bottom-0 w-fit">
              <ul className="mx-auto flex h-full w-fit flex-col items-end justify-center overflow-hidden rounded-l-full rounded-r-none bg-zinc-800/50 px-1 text-sm text-zinc-200 backdrop-blur-2xl">
                {service.features.map((feature, featureIndex) => (
                  <FeatureItem
                    key={feature.name}
                    feature={feature}
                    index={featureIndex}
                    active={activeFeature?.name === feature.name}
                    onSelect={() => selectFeature(feature)}
                  />
                ))}
              </ul>
            </div>
          )}
        </CardContent>

        {/*
          Feature nav — mobile (<768px): a center icon flanked by arrows
          instead of a full icon rail. Arrows step through features and
          switch the image immediately; the center button (re)selects the
          currently focused feature; the title above closes back to the
          master slide.
        */}
        {isMobile && (
          <MobileFeatureNav
            features={service.features}
            focusedIndex={mobileFeatureIndex}
            activeFeature={activeFeature}
            onFocusChange={setMobileFeatureIndex}
            onSelect={selectFeature}
          />
        )}

        <div className={bottomHighlightCn} />
      </Card>
    </div>
  );
}

interface ImageBlockProps {
  src: ImageSrc;
  alt: string;
  split: boolean;
  clickable: boolean;
  expanded: boolean;
  onToggle: () => void;
  priority?: boolean;
  viewTransitionName: string;
}

function ImageBlock({
  src,
  alt,
  split,
  clickable,
  expanded,
  onToggle,
  priority,
  viewTransitionName,
}: ImageBlockProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      sizes={
        split
          ? "(min-width: 768px) 360px, 100vw"
          : "(min-width: 768px) 60vw, 100vw"
      }
      width={1920}
      height={1080}
      style={{ viewTransitionName } as React.CSSProperties}
      className={cn(
        "contain-layout w-full transition-transform duration-300",
        split
          ? "aspect-video rounded-2xl border border-zinc-800 object-cover object-top md:aspect-[4/3]"
          : "h-full object-contain object-bottom",
        clickable && "group-hover:scale-105",
      )}
    />
  );

  const wrapperClassName = cn(
    "order-1",
    split
      ? "w-full shrink-0 md:order-2 md:w-72 xl:w-80"
      : "flex h-full w-full items-center justify-center",
  );

  if (!clickable) {
    return <div className={wrapperClassName}>{image}</div>;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={expanded ? "Collapse to full image" : "Show details"}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        wrapperClassName,
      )}
    >
      {image}
      <span className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-zinc-300 opacity-100 backdrop-blur-md transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
        {expanded ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}

// -----------------------------------------------------------------------------
// Feature Item — desktop/tablet icon rail entry
// -----------------------------------------------------------------------------

interface FeatureItemProps {
  feature: Feature;
  index: number;
  active: boolean;
  onSelect: () => void;
}

function FeatureItem({ feature, index, active, onSelect }: FeatureItemProps) {
  const revealRef = useReveal<HTMLLIElement>();

  return (
    <li
      ref={revealRef}
      style={
        {
          "--index": index + 2,
          "--reveal-stagger": "55ms",
        } as React.CSSProperties
      }
      className="reveal-slide-bottom flex w-fit max-w-fit flex-col"
    >
      <button
        type="button"
        aria-pressed={active}
        aria-label={feature.name}
        onClick={onSelect}
        className={cn(
          "group flex w-fit cursor-pointer gap-4 rounded-2xl px-4 py-3",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        )}
      >
        <div className="flex w-fit items-center gap-1 rounded-2xl bg-black/40 p-2 backdrop-blur-2xl">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl p-2 transition-all duration-300",
              active
                ? "scale-110 bg-blue-600 text-white"
                : "text-blue-500 group-hover:scale-105 group-hover:bg-zinc-800",
            )}
          >
            <feature.icon className="h-5 w-5" />
          </div>
        </div>
      </button>
    </li>
  );
}

// -----------------------------------------------------------------------------
// Mobile Feature Nav — center icon + arrows carousel
// -----------------------------------------------------------------------------

interface MobileFeatureNavProps {
  features: Feature[];
  focusedIndex: number;
  activeFeature: ActiveFeature;
  onFocusChange: (index: number) => void;
  onSelect: (feature: Feature) => void;
}

function MobileFeatureNav({
  features,
  focusedIndex,
  activeFeature,
  onFocusChange,
  onSelect,
}: MobileFeatureNavProps) {
  if (features.length === 0) return null;

  const safeIndex = ((focusedIndex % features.length) + features.length) % features.length;
  const focused = features[safeIndex];
  const isFocusedActive = activeFeature?.name === focused.name;
  const canCycle = features.length > 1;

  // Arrows both move the carousel AND select the newly-focused feature
  // immediately, so the image updates as you press — no separate confirm tap.
  const step = (direction: 1 | -1) => {
    const nextIndex = (safeIndex + direction + features.length) % features.length;
    onFocusChange(nextIndex);
    onSelect(features[nextIndex]);
  };

  return (
    <div className="flex items-center justify-center gap-5 border-t border-zinc-900 px-4 py-4 md:hidden">
      {canCycle && (
        <button
          type="button"
          aria-label="Previous feature"
          onClick={() => step(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800/70 text-zinc-300 transition-colors active:bg-zinc-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <button
        type="button"
        aria-label={`Show ${focused.name}`}
        aria-pressed={isFocusedActive}
        onClick={() => onSelect(focused)}
        className="flex flex-col items-center gap-1.5 rounded-2xl px-3 py-1"
      >
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
            isFocusedActive
              ? "scale-105 bg-blue-600 text-white"
              : "bg-zinc-800/70 text-blue-500",
          )}
        >
          <focused.icon className="h-5 w-5" />
        </span>
        <span
          className={cn(
            "max-w-[10rem] truncate text-xs font-medium",
            isFocusedActive ? "text-white" : "text-zinc-400",
          )}
        >
          {focused.name}
        </span>
      </button>

      {canCycle && (
        <button
          type="button"
          aria-label="Next feature"
          onClick={() => step(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800/70 text-zinc-300 transition-colors active:bg-zinc-800"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}