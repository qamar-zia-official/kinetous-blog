"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { links } from "./nav-data";
import logo from "@/public/logo mark white.svg";

// Retracts the primary row when the secondary (section) nav is hidden.
// These match the row's own vertical padding/line-height, so they only
// need to change if that row's typography or padding changes.
const NAV_RETRACT_OFFSET = { mobile: "-44px", desktop: "-61px" } as const;

// ---------------------------------------------------------------------------
// Breadcrumbs — collapses middle segments into a dropdown past 4 crumbs
// ---------------------------------------------------------------------------

const MAX_VISIBLE_CRUMBS = 4;

type Crumb = { label: string; href: string };

function useBreadcrumbs() {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const all: Crumb[] = segments.map((label, idx) => ({
      label,
      href: "/" + segments.slice(0, idx + 1).join("/"),
    }));

    if (all.length <= MAX_VISIBLE_CRUMBS) {
      return { visible: all, hidden: [] as Crumb[] };
    }

    // Keep first + last two visible, stash the rest behind a dropdown.
    return {
      visible: [all[0], ...all.slice(-2)],
      hidden: all.slice(1, -2),
    };
  }, [pathname]);
}

function CrumbLink({ crumb, isLast }: { crumb: Crumb; isLast: boolean }) {
  return (
    <BreadcrumbItem>
      {isLast ? (
        <BreadcrumbPage aria-current="page">{crumb.label}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink
          render={
            <Link
              href={crumb.href}
              className="rounded-sm px-1 text-zinc-400 hover:bg-zinc-700"
            >
              {crumb.label}
            </Link>
          }
        />
      )}
    </BreadcrumbItem>
  );
}

function HiddenCrumbsDropdown({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger
        className="rounded-sm px-1 text-zinc-400 hover:bg-zinc-700"
        aria-label={`${crumbs.length} more path segments`}
      >
        …
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-200 flex w-max min-w-32 flex-col gap-1 p-1"
      >
        {crumbs.map((crumb) => (
          <Link
            key={crumb.href}
            href={crumb.href}
            className="rounded-sm px-2 py-1.5 text-sm text-zinc-400 hover:bg-zinc-700"
          >
            {crumb.label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function Breadcrumbs() {
  const { visible, hidden } = useBreadcrumbs();
  // visible[0] is the first path segment after home; the dropdown (if any)
  // sits right after it, then the remaining visible crumbs follow.
  const [first, ...rest] = visible;

  return (
    <Breadcrumb className="flex h-full items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link
                href="/"
                className="rounded-sm px-1 text-zinc-400 hover:bg-zinc-700"
              >
                home
              </Link>
            }
          />
        </BreadcrumbItem>

        {first && (
          <span className="flex items-center">
            <BreadcrumbSeparator />
            <CrumbLink crumb={first} isLast={visible.length === 1} />
          </span>
        )}

        {hidden.length > 0 && (
          <span className="flex items-center">
            <BreadcrumbSeparator />
            <HiddenCrumbsDropdown crumbs={hidden} />
          </span>
        )}

        {rest.map((crumb, idx) => (
          <span className="flex items-center" key={crumb.href}>
            <BreadcrumbSeparator />
            <CrumbLink crumb={crumb} isLast={idx === rest.length - 1} />
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// ---------------------------------------------------------------------------
// Brand mark — logo swaps to breadcrumb trail on hover
// ---------------------------------------------------------------------------
/**
 * Provides a link to the home page, with a logo and breadcrumb trail.
 **/
function BrandMark() {
  return (
    <div
      className="group flex h-8 items-start gap-1 overflow-hidden"
      aria-label="Kinetous — home"
    >
      <Image src={logo} alt="" width={24} height={24} aria-hidden />
      <div className="relative h-[200%] font-sans font-semibold text-zinc-400 transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="flex h-1/2 items-center text-2xl">inetous Blog</span>
        <span className="flex h-1/2 items-center text-base">
          <Breadcrumbs />
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop link row
// ---------------------------------------------------------------------------

function DesktopLinks() {
  return (
    <NavigationMenuList className="max-w-max">
      {links.map((link) =>
        link.drop ? (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuTrigger className="flex items-center justify-center gap-2">
              {link.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-100">
              {link.children}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuLink key={link.label} href={link.link}>
            {link.label}
          </NavigationMenuLink>
        ),
      )}
    </NavigationMenuList>
  );
}

// ---------------------------------------------------------------------------
// Mobile sheet — links close the sheet on tap
// ---------------------------------------------------------------------------

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger aria-label="Open navigation menu">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="z-200">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

// ---------------------------------------------------------------------------
// Section nav — pure CSS collapse (grid-template-rows trick), no JS animation
// ---------------------------------------------------------------------------

function SectionNav({
  sections,
  visible,
}: {
  sections: { label: string; link: string }[];
  visible: boolean;
}) {
  if (sections.length === 0) return null;

  return (
    <div
      className={cn(
        "grid w-full justify-center overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
        visible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mx-auto flex w-full max-w-300 flex-wrap justify-center gap-4 p-2">
          {sections.map((sec) => (
            <a key={sec.link} href={sec.link} className="text-blue-600">
              {sec.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export default function Navbar() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu
      className={cn(
        "sticky z-100 mx-auto flex flex-col justify-between overflow-hidden",
        "border-b border-white/30 bg-zinc-800/50/60 px-4 shadow-2xl",
        "backdrop-blur-xl backdrop-brightness-150 backdrop-saturate-150",
      )}
    >
      <div className="mx-auto flex w-full max-w-300 items-center justify-between py-2">
        <NavigationMenuList className="max-w-max">
          <NavigationMenuItem>
            <BrandMark />
          </NavigationMenuItem>
        </NavigationMenuList>

        {isMobile ? <MobileNav /> : <DesktopLinks />}
      </div>
    </NavigationMenu>
  );
}
