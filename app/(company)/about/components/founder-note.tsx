import img from "@/public/image.png";
import Image from "next/image";

export default function FounderNote() {
  return (
    <section
      id="founder-note"
      className="border-t border-border scroll-mt-32 flex justify-center items-center"
    >
      <div className="container py-28 max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-[280px_1fr]">
          <aside>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              A Note From the Founder
            </p>

            <div className="mt-10 space-y-3">
              <div className="h-48 w-48 rounded-full   bg-muted overflow-hidden">
                <Image src={img} alt="Qamar Zia" width={400} height={400} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Qamar Zia</h3>

                <p className="text-sm text-muted-foreground">
                  Founder · Software Engineer
                </p>
              </div>
            </div>
          </aside>

          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight text-balance md:text-5xl">
              I didn&apos;t start Kinetous to build websites.
            </h2>

            <div className="prose prose-zinc dark:prose-invert prose-lg mt-10 max-w-none">
              <p>
                I started Kinetous because I saw too many businesses paying
                for software that looked impressive but created more complexity
                than it removed. Expensive agency retainers, unnecessary
                rebuilds, proprietary platforms and disconnected tools have
                become surprisingly common—and businesses are usually the ones
                left dealing with the consequences.
              </p>

              <p>
                My belief is simple: software should make running a business
                easier. It should remove repetitive work, connect the systems
                your team already uses and give you complete ownership of what
                gets built. Technology should support your operations—not force
                your business to adapt to the technology.
              </p>

              <p>
                That&apos;s why every project begins with understanding how your
                business actually works before discussing frameworks or AI. The
                objective isn&apos;t to deliver the largest feature list.
                It&apos;s to build systems that quietly become part of your
                team&apos;s everyday workflow while remaining fast, maintainable
                and easy to extend.
              </p>

              <p>
                Today, Kinetous is a founder-led engineering studio. As we
                continue to grow, the goal isn&apos;t to become a large agency
                with layers of account managers and handoffs. The goal is to
                build a small, highly capable team of engineers and specialists
                who care about thoughtful software, clear communication and
                long-term partnerships just as much as I do.
              </p>

              <p>
                If you&apos;re looking for a team that values craftsmanship over
                shortcuts and engineering over marketing, I think we&apos;ll
                work well together.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="font-medium">— Qamar Zia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
