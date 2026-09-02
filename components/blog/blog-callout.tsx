import { cn } from "@/lib/utils";
import { CALLOUT_STYLES, type CalloutVariant } from "@/components/editor-extensions/callout";

export function BlogCallout({ variant, children }: { variant: CalloutVariant; children: React.ReactNode }) {
  const { icon: Icon, className } = CALLOUT_STYLES[variant] ?? CALLOUT_STYLES.info;

  return (
    <div className={cn("not-prose my-4 flex gap-3 rounded-2xl border p-4", className)} data-callout>
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="flex-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>
    </div>
  );
}