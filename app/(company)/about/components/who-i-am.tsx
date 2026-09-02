import Image from "next/image";

import profileImage from "@/public/image.png"; // replace later

export default function WhoIAm() {
  return (
    <section id="who-i-am" className="scroll-mt-32 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[380px_1fr]">
        {/* Left */}

        <div className="space-y-6">
          <div className="overflow-hidden bg-transparent">
            <Image
              src={profileImage}
              alt="Qamar Zia"
              className=" rounded-3xl m-auto"
            />
          </div>

          <div className="rounded-3xl bg-zinc-800/50 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Founder
            </p>

            <h3 className="mt-2 text-2xl font-bold">Qamar Zia</h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Software Engineer focused on Shopify, AI systems, backend
              architecture and operational software.
            </p>
          </div>
        </div>

        {/* Right */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Who I Am
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            I don&apos;t build websites.
            <br />I build the systems that businesses run on.
          </h2>

          <div className="prose prose-lg prose-invert mt-10 max-w-none text-muted-foreground">
            <p>
              Kinetous is an engineering studio built around a simple
              philosophy: <br />
              <strong className="font-bold text-white text-2xl">
                software should remove operational friction instead of
                introducing more of it.
              </strong>
            </p>

            <p>
              My work spans custom Shopify storefronts, AI-powered customer
              support, internal operational dashboards, business workflow
              automation, APIs, backend systems and infrastructure. Every
              project starts by understanding how a business actually works
              before a single component is designed or a database table is
              created.
            </p>

            <p>
              Rather than adapting businesses to rigid software, I engineer
              software around existing workflows. That often means replacing
              spreadsheets, connecting disconnected platforms, automating manual
              processes and building internal tools that quietly improve daily
              operations.
            </p>

            <p>
              I work directly with founders and decision makers throughout the
              project. There are no account managers translating technical
              conversations, no outsourced development teams, and no unnecessary
              communication layers. The person designing the architecture is the
              same person writing the code.
            </p>

            <p>
              When projects require branding, illustration, animation or other
              specialized expertise, I collaborate with a trusted network of
              professionals while remaining the technical lead and primary point
              of contact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
