"use client";
import * as motion from "motion/react-client";

export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  // Split into words if children is a string, otherwise wrap as-is
  const words = typeof children === "string" ? children.split(" ") : [children];

  return (
    <div className="py-6 w-full flex flex-col justify-center items-center gap-3 pt-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-zinc-50 flex flex-wrap justify-center gap-x-3 gap-y-1">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Animated underline */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "4rem", opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: words.length * 0.08 + 0.1,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
