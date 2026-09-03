"use client";

import { useEffect, useRef } from "react";
import { observe, unobserve } from "./observer";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    console.log(ref);
    if (!ref.current) return;

    observe(ref.current);

    return () => {
      if (ref.current) unobserve(ref.current);
    };
  }, []);

  return ref;
}
