import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading2 from "../section-heading";
import Strip from "./strip";
import { GrArticle } from "react-icons/gr";

// ── Shared spring config ──────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  return (
    <header className="min-h-screen flex flex-col items-center relative overflow-hidden bg-zinc-950">
      {/* Blueprint grid — signature texture that reads as "systems", not decoration */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Soft glow anchoring the headline */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[420px] w-[420px] sm:h-[600px] sm:w-[600px] lg:h-[720px] lg:w-[720px] rounded-full bg-blue-600/20 blur-[100px] sm:blur-[120px]"
      />

      <div className="max-w-375 px-5 sm:px-8 pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 w-full gap-12 mx-auto relative">
        <motion.div className="flex flex-col justify-center gap-5 sm:gap-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-400/60 text-center"
          >
AI-NATIVE E-COMMERCE SYSTEMS STUDIO
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-400/60 text-center"
          >
          Building in public
          </motion.span>
          <div className="flex flex-col gap-1 sm:gap-2 leading-[1.05] font-sans font-light text-center">
            {[
              {
                text: "Building the systems behind",
                color: "text-white",
              },
              {
                text: "an AI-native Shopify business.",
                color: "text-blue-600",
              },
            ].map((line, i) => (
              <h1
                key={i}
                className="overflow-hidden text-[clamp(1.75rem,6vw,3.75rem)]"
              >
                <SectionHeading2>{line.text}</SectionHeading2>
              </h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed text-center max-w-md sm:max-w-2xl md:max-w-4xl mx-auto"
          >
I document the engineering, automation,
experiments, and decisions behind building
and scaling the business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62, ease: EASE }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch sm:items-center mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-0"
          >
            <motion.a
              href="https://wa.me/923707475981?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20Shopify%20store"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl  flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 border-none">
              <GrArticle />
                Read The Latest Post 
              </Button>
            </motion.a>
            <motion.a
              href="#our-work"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="w-full sm:w-auto"
            >
            </motion.a>
          </motion.div>
        </motion.div>

        <Strip />
      </div>
    </header>
  );
}