import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import SectionHeading2 from "../section-heading";
import { GrArticle } from "react-icons/gr";
import Strip from "./strip";
import Silk from "@/components/Silk";
import ContactFormElement from "./form";
import { ExternalLink } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ── Shared spring config ──────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
    return (
        <header className="min-h-screen flex flex-col items-center relative overflow-hidden bg-zinc-950">
            <div className="absolute top-0 left-0 w-full h-full">
                <Silk color="#07164F" />
            </div>
            <div
                aria-hidden
                className="absolute inset-0 -z-20 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />
            {/* Soft glow anchoring the headline */}
            <div
                aria-hidden
                className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[420px] w-[420px] sm:h-[600px] sm:w-[600px] lg:h-[720px] lg:w-[720px] rounded-full bg-blue-600/20 blur-[100px] sm:blur-[120px]"
            />

            <div className="max-w-375 px-5 sm:px-8 pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 w-full gap-12 mx-auto relative">
                <motion.div className="flex flex-col justify-center gap-5 sm:gap-6">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-400/60 text-center"
                    >
                        AI-NATIVE E-COMMERCE SYSTEMS STUDIO
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-400/60 text-center"
                    >
                        Building in public
                    </motion.span>
                    <div className="flex flex-col gap-1 sm:gap-2 leading-[1.05] font-sans font-light text-center">
                        {[
                            {
                                text: "Documenting the journey",
                                color: "text-white",
                            },
                            {
                                text: "of building an AI-native business.",
                                color: "text-blue-600",
                            },
                        ].map((line, i) => (
                            <h1
                                key={i}
                                className="overflow-hidden text-[clamp(1.75rem,6vw,3.75rem)]"
                            >
                                <SectionHeading2>{line.text}</SectionHeading2>
                            </h1>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                        className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed text-center max-w-md sm:max-w-2xl md:max-w-4xl mx-auto"
                    >
                        I document the engineering, automation, experiments, and
                        decisions behind building and scaling the business.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.62, ease: EASE }}
                        className="flex flex-col items-center sm:flex-row flex-wrap gap-3 justify-center sm:items-center mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-0"
                    >
                        <motion.a
                            href="/posts"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 22,
                            }}
                        >
                            <Button size="lg">
                                <GrArticle />
                                Read The Latest Post
                            </Button>
                        </motion.a>
                        <Dialog>
                            <DialogTrigger
                                className={cn(
                                    "rounded-full border-1 border-zinc-800 p-2 px-4",
                                )}
                            >
                                Want Something Built
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className={"text-center"}>
                                        How would you like to work with us?
                                    </DialogTitle>
                                </DialogHeader>
                                <ContactFormElement />
                                <a href="https://kinetous.com" target="_blank">
                                    <Button size="lg" className="w-full">
                                        Visit Our Website <ExternalLink />
                                    </Button>
                                </a>
                            </DialogContent>
                        </Dialog>
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
}
