"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const items = [
  "Reduce Errors",
  "Accelerate Work",
  "Ensure Consistency",
  "Operate 24/7",
  "Drive Revenue",
];

const INTERVAL = 2200;

export default function Strip() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 sm:mt-28 bg-zinc-950  lg:mt-32 flex flex-col items-center gap-4">
      {/* Mobile: single rotating word — avoids the wrap/clutter of the full strip on narrow screens */}
      <div className="sm:hidden h-9 flex items-center justify-center overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={items[active]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-light text-white"
          >
            {items[active]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Mobile progress dots — a real sequence (which word is showing now), so dots earn their place here */}
      <div className="sm:hidden flex items-center gap-1.5">
        {items.map((item, index) => (
          <span
            key={item}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active ? "w-4 bg-blue-500" : "w-1.5 bg-zinc-700"
            }`}
          />
        ))}
      </div>

      {/* Tablet/desktop: full strip with animated emphasis on the active word */}
      <motion.div className="hidden sm:flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mask-b-[55%] max-w-3xl">
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <div key={item} className="flex items-center gap-3">
              <motion.span
                animate={{
                  color: isActive ? "#ffffff" : "#52525b",
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block py-2 text-xl md:text-2xl font-light"
              >
                {item}
              </motion.span>

              {index < items.length - 1 && (
                <span className="text-zinc-700">•</span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}