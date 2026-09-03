import React from "react";
import { Sparkles, ExternalLink } from "lucide-react";

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 max-w-3xl mx-auto space-y-12">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Internal Experiments
        </h1>
        <p className="text-muted-foreground max-w-xl">
          We prototype tools and test modern APIs internally before integrating
          them into production environments for clients.
        </p>
      </div>
    </div>
  );
}
