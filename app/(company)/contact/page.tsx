import { MessageSquare, Calendar, Phone } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import ContactFormElement from "../sections/contact/form";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 max-w-375 mx-auto space-y-12"
      id="contact"
    >
      <h1 className="text-4xl font-extrabold tracking-tight text-center">
        Start Your Project
      </h1>
      <ContactFormElement />
      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href="https://wa.me/923058771054"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-xl   bg-zinc-800/50 hover:bg-accent transition-colors space-y-3 block"
        >
          <Phone className="w-5 h-5 text-primary" />
          <h3 className="font-bold">WhatsApp Direct (PK)</h3>
          <p className="text-xs text-muted-foreground">+92 305 8771054</p>
        </a>

        {/* Alternate Contact */}
        <a
          href="https://wa.me/3707475981"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-xl   bg-zinc-800/50 hover:bg-accent transition-colors space-y-3 block"
        >
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-bold">WhatsApp Direct (Alt)</h3>
          <p className="text-xs text-muted-foreground">+370 747 5981</p>
        </a>

        {/* LinkedIn Connection */}
        <a
          href="https://linkedin.com/in/qamar-zia-32389537b"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-xl   bg-zinc-800/50 hover:bg-accent transition-colors space-y-3 block"
        >
          <BsLinkedin className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Connect on LinkedIn</h3>
          <p className="text-xs text-muted-foreground">
            Qamar Zia - Professional Profile
          </p>
        </a>

        {/* Free Call */}
        <div className="p-5 rounded-xl   bg-zinc-800/50/60 space-y-3">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Discovery Call</h3>
          <p className="text-xs text-muted-foreground">
            Book a free 15-minute scoping call directly with us.
          </p>
        </div>
      </div>
    </div>
  );
}
