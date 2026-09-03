"use client";
import SetSections from "@/app/components/navbar/set-sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Loader, SparkleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function AuditInput() {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className={cn(
        "flex items-center justify-center gap-4 bg-zinc-800 rounded-2xl rounded-full max-w-5xl mx-auto w-full overflow-hidden my-12",
      )}
      style={{
        boxShadow:
          "0 0 0 1px var(--color-blue-600), 0 0 10px 1px var(--color-blue-600),  0 0 1000px 3px var(--color-blue-600), inset 0 0 10px rgba(0,0,0,.5)",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (URL.canParse(input)) {
          router.push(`/audit/${input}`);
        } else {
          setError("Please enter a valid URL");
          setLoading(false);
        }
      }}
    >
      <Input
        value={input}
        onChange={(e) => {
          setInput(e.currentTarget.value);
        }}
        type="text"
        placeholder="Your Website URL e.g.  https://Kinetous.com"
        alt="Website Audit input"
        className="w-full font-semibold border-0 bg-transparent ring-0 p-2 md:p-8 focus:ring-0 ring-indigo-500 outline-none focus-within:outline-none"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button
        type="submit"
        className={cn("py-2 md:py-8 px-2 md:px-6 group")}
        style={{
          transitionTimingFunction: "var(--ease-glide)",
          boxShadow: "-3px 0px 4px rgba(0,0,0,.5)",
        }}
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            <SparkleIcon
              className="w-6 h-6 group-hover:scale-0 scale-100 transition-all ml-4 group-hover:ml-0 duration-600"
              style={{
                transitionTimingFunction: "var(--ease-glide)",
              }}
              size={24}
              color="white"
              strokeWidth={2}
            />
            Run The Audit
            <ArrowRightIcon
              className="w-6 h-6 group-hover:scale-100 scale-0 transition-all ml-0 group-hover:ml-4 duration-600"
              style={{
                transitionTimingFunction: "var(--ease-glide)",
              }}
              size={24}
              color="white"
              strokeWidth={2}
            />
          </>
        )}
      </Button>
    </form>
  );
}
