import { Card } from "@/components/ui/card";
import {
    Contact,
    Contact2,
    ExternalLink,
    HomeIcon,
    Projector,
} from "lucide-react";
import { FaBlog, FaShopify } from "react-icons/fa";
import {
    MdShoppingCart,
    MdDashboard,
    MdSupportAgent,
    MdStorefront,
    MdAutoGraph,
} from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { FiZap, FiCheckCircle, FiDatabase, FiCpu } from "react-icons/fi";
import Link from "next/link";
import { linkType } from "./nav.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "cn";
import ContactFormElement from "@/app/sections/header/form";
import { Button } from "@/components/ui/button";

// Expanded to cover the full spectrum of your core services for clean routing/mobile menus
export const services = [
    {
        label: "Custom E-commerce Storefronts",
        link: "/services/ecommerce",
        icon: MdStorefront,
    },
    {
        label: "Performance Optimization",
        link: "/services/ecommerce",
        icon: MdAutoGraph,
    },
    {
        label: "AI Customer Support Automation",
        link: "/services/automation",
        icon: BsRobot,
    },
    {
        label: "Operations Command Centers",
        link: "/services/operations",
        icon: MdDashboard,
    },
    {
        label: "Workflow Automation Systems",
        link: "/services/operations",
        icon: FiZap,
    },
    {
        label: "Continuous Technical Partnership",
        link: "/services/partnership",
        icon: MdSupportAgent,
    },
];

export const links: linkType[] = [
    {
        label: "Posts",
        link: "/posts",
        icon: HomeIcon,
        drop: false,
    },
];
