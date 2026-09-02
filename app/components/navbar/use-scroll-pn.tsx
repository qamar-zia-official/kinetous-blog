import { useEffect, useRef, useState } from "react";

export const useScrollPN = () => {
  const [fixed, setFixed] = useState(true);
  const [y, setY] = useState(0);
  const lastScroll = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setY(currentScroll);
      const thresh_hold = 10;
      const difference = Math.abs(lastScroll.current - currentScroll);
      if (difference >= thresh_hold) {
        if (lastScroll.current > currentScroll) {
          setFixed(true);
        } else {
          setFixed(false);
        }
      }
      lastScroll.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { fixed, y };
};
