"use client";
import * as motion from "motion/react-client";
import { ourProcess } from "./our-process-data";
import { ProcessItem } from "./process-item";
import SectionHeading2 from "../section-heading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OurProcess() {
  return (
    <section
      className="relative m-auto flex justify-center items-center py-6"
      id="process"
    >
      <article className="min-h-screen py-8 flex flex-col items-center w-full gap-4">
        {/* ── Intro block ── */}
        <div className="flex flex-col items-center gap-4">
          {/* Eyebrow — slides in from left */}
          <motion.span
            initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-400"
          >
            No black boxes. No surprises.
          </motion.span>

          {/* Heading — handled by SectionHeading's own scroll trigger */}
          <SectionHeading2>How It Works</SectionHeading2>

          {/* Sub-copy — fades up after heading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
            className="text-zinc-400 text-base md:text-lg max-w-xl text-center leading-relaxed px-4"
          >
            From first message to live AI systems — here is exactly what happens
            at every step, and what you have in your hands at the end of each
            one.
          </motion.p>
        </div>

        {/* ── Sticky-stack grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-12 perspective-distant transform-3d max-w-5xl mx-auto w-full"
        >
          {ourProcess.map((step, index) => (
            <ProcessItem key={step.heading} i={step} index={index} />
          ))}
        </motion.div>
      </article>
    </section>
  );
}
