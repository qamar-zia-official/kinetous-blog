import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface IconTileProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  active?: boolean;
  className?: string;
}

export function IconTile({
  icon: Icon,
  size = "md",
  glow = true,
  active = false,
  className,
}: IconTileProps) {
  const sizes = {
    sm: {
      container: "w-12 h-12 rounded-full",
      icon: "w-5 h-5",
    },
    md: {
      container: "w-14 h-14 rounded-full",
      icon: "w-6 h-6",
    },
    lg: {
      container: "w-16 h-16 rounded-full",
      icon: "w-7 h-7",
    },
  };

  return (
    <div
      className={clsx(
        "relative grid place-items-center overflow-hidden transition-all duration-300",

        sizes[size].container,

        // Main Surface
        "bg-linear-45 from-blue-600 via-blue-900 to-blue-700",

        // Glass Border
        "border border-blue-500/15",

        // Soft Highlight
        "before:absolute before:inset-[1px] before:rounded-full",
        "before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent",

        // Bottom Reflection
        "after:absolute after:bottom-0 after:left-1/2 after:h-8 after:w-[75%]",
        "after:-translate-x-1/2 after:rounded-full after:bg-blue-500/10 after:blur-xl",

        // Depth
        "shadow-[0_18px_30px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.02)]",

        active &&
          "border-blue-400/40 shadow-[0_0_30px_rgba(37,99,235,.35),0_20px_40px_rgba(0,0,0,.6)]",

        className,
      )}
    >
      {glow && (
        <Icon
          className={clsx(
            "absolute text-blue-500/40 blur-md scale-125",
            sizes[size].icon,
          )}
        />
      )}

      <Icon
        className={clsx("relative z-10 text-slate-100", sizes[size].icon)}
        strokeWidth={2}
      />
    </div>
  );
}
