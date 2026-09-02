"use client";
import { ReactNode } from "react";
import { useReveal } from "./anim/useObserver";

export default function SectionHeading2({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <>
      <span
        ref={ref}
        className="text-3xl reveal-rise-lg sm:text-4xl md:text-4xl lg:text-5xl font-sans font-bold text-zinc-50 reveal-me flex flex-wrap justify-center gap-x-3 gap-y-1"
      >
        {children}
      </span>
      <div className="h-px my-4 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </>
  );
}
