import React from "react";
import { User, PhoneCall } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 max-w-3xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">The Team</h1>
        <p className="text-muted-foreground">
          A development operations team built with direct communication loops.
        </p>
      </div>

      <div className="p-6 rounded-xl   bg-zinc-800/50/40 flex flex-col md:flex-row gap-6 items-start">
        <div className="p-4 rounded-xl bg-secondary   flex items-center justify-center">
          <User className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-3 flex-1">
          <div>
            <h2 className="text-xl font-bold">Qamar Zia</h2>
            <p className="text-sm text-primary">
              Lead Developer & AI Automation Engineer
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Qamar handles system design, API architectural frameworks, database
            engineering, and UI development personally. Based in Lahore,
            Pakistan, he coordinates on all project pipelines from early
            conceptual layouts to deployment.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://linkedin.com/in/qamar-zia-32389537b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <BsLinkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="https://wa.me/923058771054"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Direct
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-secondary/30 border border-dashed border-border text-center">
        <p className="text-sm text-muted-foreground">
          When larger workloads or dedicated design workflows are required,
          Qamar coordinates directly with a trusted collective of specialized
          developers and designers.
        </p>
      </div>
    </div>
  );
}
