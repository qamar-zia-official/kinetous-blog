import { eyebrowCn } from "@/app/design-system";
import ContactFormElement from "./form";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import SectionHeading2 from "../section-heading";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/qamar-zia-32389537b/",
    label: "LinkedIn",
    icon: <FaLinkedin size={28} color="var(--color-blue-500)" />,
    hoverBorder: "hover:border-blue-800/60",
    ariaLabel: "Connect on LinkedIn",
  },
  {
    href: "https://wa.me/923058771054",
    label: "WhatsApp",
    icon: <FaWhatsapp size={28} color="#25D366" />,
    hoverBorder: "hover:border-green-800/60",
    ariaLabel: "Chat on WhatsApp",
  },
];

export default function ContactForm() {
  return (
    <div id="contact">
      <section className="relative m-auto flex justify-center items-center">
        <article className="min-h-screen py-12 flex justify-center flex-col items-center max-w-250 w-full gap-6 px-4">
          {/* Eyebrow */}
          <span className={eyebrowCn}>Free Estimate · No Commitment</span>

          {/* Heading — SectionHeading has its own useInView */}
          <SectionHeading2>Tell Us What You Need Built.</SectionHeading2>

          {/* Sub-copy */}
          <p className="text-center text-zinc-400 text-base md:text-lg max-w-md">
            Most responses within a few hours. No agency run-around — you speak
            directly to the developer who will build your product.
          </p>
          <ContactFormElement />

          {/* Social links — staggered pop-in */}
          <div className="flex justify-center gap-4 mt-2">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className={[
                  "flex items-center gap-3 px-5 py-3 rounded-2xl border",
                  "border-white/10 bg-zinc-700/20 backdrop-blur-sm",
                  "hover:bg-zinc-700/40 shadow-xl group",
                  "transition-colors duration-200",
                  link.hoverBorder,
                ].join(" ")}
              >
                <span>{link.icon}</span>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Fine-print */}
          <p className="text-xs text-zinc-600 text-center">
            Kinetous · Custom web development
          </p>
        </article>
      </section>
    </div>
  );
}
