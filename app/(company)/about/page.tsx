import Hero from "./components/hero";
import WhoIAm from "./components/who-i-am";
import EngineeringCapabilities from "./components/engineering-capabilities";
import WhyDifferent from "./components/why-different";
import Process from "./components/process";
import SetSections from "@/app/components/navbar/set-sections";
import EngineeringPrinciples from "./components/engineering-principles";
import LongTermGrowth from "./components/long-term-growth";
import FounderNote from "./components/founder-note";
import ContactPage from "../contact/page";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 mx-auto space-y-10">
      <SetSections
        sections={[
          { label: "Top", link: "#" },
          { label: "Who I Am", link: "#wia" },
          { label: "Eng.. Capabilities", link: "#engc" },
          { label: "Why Me", link: "#wm" },
          { label: "Process", link: "#pr" },
          { label: "Eng... Principles", link: "#bopt" },
          { label: "Long Term", link: "#ltg" },
          { label: "Founder Note", link: "#fn" },
          { label: "CTA", link: "#cta" },
        ]}
      />
      <Hero />
      <div id="wia">
        <WhoIAm />
      </div>
      <div id="engc">
        <EngineeringCapabilities />
      </div>
      <div id="wm">
        <WhyDifferent />
      </div>
      <div id="pr">
        <Process />
      </div>
      <div id="bopt">
        <EngineeringPrinciples />
      </div>
      <div id="ltg">
        <LongTermGrowth />
      </div>
      <div id="fn">
        <FounderNote />
      </div>
      <div id="cta">
        <ContactPage />
      </div>
    </main>
  );
}
