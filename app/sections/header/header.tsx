import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading2 from "../section-heading";
import Strip from "./strip";

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
            AI-Native E-Commerce Systems Studio
          </motion.span>

          <div className="flex flex-col gap-1 sm:gap-2 leading-[1.05] font-sans font-[100] text-center">
            {[
              {
                text: "Build Systems That Move Your Business.",
                color: "text-white",
              },
              {
                text: "Engineered for Velocity.",
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
            I design and build AI-powered systems for Shopify businesses that
            automate repetitive operations, turn customer and product data
            into action, and keep your business running around the clock.
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
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 border-none">
                <FaWhatsapp size={18} />
                Start a Conversation
              </Button>
            </motion.a>

            <motion.a
              href="#our-work"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white/10 text-zinc-300 font-bold px-6 py-3 rounded-2xl text-base flex items-center justify-center gap-2 hover:bg-white/5"
              >
                See What I Build
                <ArrowRight size={16} />
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>

        <Strip />
      </div>
    </header>
  );
}