"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

import { Button } from "@/components/ui/button";

export default function ContactFormElement() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });

      cal("ui", {
        theme: "dark",
        layout: "week_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#1347e6",
          },
          dark: {
            "cal-brand": "#1347e6",
            "cal-text": "#fff",
            "cal-bg": "#000",
            "cal-bg-muted": "#000",
          },
        },
      });
    })();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (canvas !== null) {
      const ctx = canvas.getContext("2d")!;
      if (!ctx) return;

      let width = 0;
      let height = 0;
      let animationFrame = 0;

      const DPR = Math.min(window.devicePixelRatio, 2);

      const particles: {
        angle: number;
        radius: number;
        size: number;
        phase: number;
      }[] = [];

      function resize() {
        width = canvas.clientWidth;
        height = canvas.clientHeight;

        canvas.width = width * DPR;
        canvas.height = height * DPR;

        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }

      resize();

      const GOLDEN = Math.PI * (3 - Math.sqrt(5));

      const COUNT = 420;

      for (let i = 0; i < COUNT; i++) {
        const t = i / COUNT;

        particles.push({
          angle: i * GOLDEN * 1.2,
          radius: Math.pow(t, 0.85) * Math.min(width, height) * 0.42,
          size: 0.8 + Math.random() * 2.4,
          phase: Math.random() * Math.PI * 2,
        });
      }

      const start = performance.now();

      function draw(now: number) {
        const time = (now - start) / 1000;

        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        // center glow
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220);

        glow.addColorStop(0, "rgba(19,71,230,.28)");
        glow.addColorStop(0.5, "rgba(19,71,230,.08)");
        glow.addColorStop(1, "rgba(19,71,230,0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          const a =
            p.angle + time * 0.025 + Math.sin(time * 0.4 + p.phase) * 0.03;

          const r = p.radius + Math.sin(time * 0.8 + p.phase) * 2.5;

          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;

          const alpha =
            0.04 +
            (1 - p.radius / 240) * 0.12 +
            Math.sin(time * 1.5 + p.phase) * 0.015;

          const blue = Math.max(0, 1 - p.radius / 180) * 0.9;

          ctx.beginPath();

          ctx.fillStyle = `rgba(${19},${71},${230},${blue * alpha})`;

          ctx.arc(x, y, p.size, 0, Math.PI * 2);

          ctx.fill();

          ctx.beginPath();

          ctx.fillStyle = `rgba(255,255,255,${alpha})`;

          ctx.arc(x, y, p.size * 0.55, 0, Math.PI * 2);

          ctx.fill();
        }

        animationFrame = requestAnimationFrame(draw);
      }

      animationFrame = requestAnimationFrame(draw);

      const observer = new ResizeObserver(resize);

      observer.observe(canvas);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="relative flex h-[520px] w-full items-center justify-center overflow-hidden rounded-[2rem]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />

      <Button
        size="lg"
        className="relative z-10 h-14 rounded-2xl px-8 backdrop-blur-xl shadow-[0_0_80px_rgba(19,71,230,.2)]"
        data-cal-namespace="30min"
        data-cal-link="Kinetous/30min"
        data-cal-config='{"layout":"week_view","theme":"dark"}'
      >
        Book a Discovery Call
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
