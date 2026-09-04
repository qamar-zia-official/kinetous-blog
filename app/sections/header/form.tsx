"use client";

import { useEffect } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

import { Button } from "@/components/ui/button";

export default function ContactFormElement() {
    useEffect(() => {
        (async () => {
            const cal = await getCalApi({ namespace: "30min" });

            cal("ui", {
                theme: "dark",
                layout: "week_view",
                cssVarsPerTheme: {
                    light: {
                        "cal-brand": "#1347e6",
                    },
                    dark: {
                        "cal-brand": "#1347e6",
                        "cal-text": "#fff",
                        "cal-bg": "#000",
                        "cal-bg-muted": "#000",
                    },
                },
            });
        })();
    }, []);

    return (
        <div className="relative flex items-center justify-center overflow-hidden rounded-[2rem]">
            <Button
                size="lg"
                className={"w-full"}
                data-cal-namespace="30min"
                data-cal-link="qamar-zia-w3kbwp/quick-meeting"
                data-cal-config='{"layout":"week_view","theme":"dark"}'
            >
                <PhoneCall />
                Book a call
            </Button>
        </div>
    );
}
