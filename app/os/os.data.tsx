import { Slot, Tool } from "./os.types";

/**
 * Seed data. This is only ever written to localStorage once, the very first
 * time someone opens the page on a given browser (see os.storage.ts ->
 * ensureSeeded). After that, everything is driven by whatever the user has
 * added/edited/removed via the UI, and this file is never read again — so
 * feel free to adjust it to taste, or just edit the entries from the
 * Timetable / Tools tabs after your first load.
 */

export const defaultSlots: Slot[] = [
  {
    id: "default-deep-work",
    name: "Deep Work — Build",
    duration: "7:00 AM – 10:00 AM",
    priority: "Severe",
    details:
      "### Focus\n\n- Ship on Kinetous / Sliboard / qode\n- No email, no Twitter, phone in another room",
    days: [1, 2, 3, 4, 5],
    from: [7, 0],
    to: [10, 0],
  },
  {
    id: "default-client-outreach",
    name: "Client Outreach",
    duration: "10:00 AM – 11:00 AM",
    priority: "High",
    details:
      "### Outreach\n\n- Follow up on open leads\n- Send a few cold DMs / emails\n- Update the pipeline",
    days: [1, 2, 3, 4, 5],
    from: [10, 0],
    to: [11, 0],
  },
  {
    id: "default-teaching",
    name: "Teaching — Matric CS",
    duration: "2:00 PM – 4:00 PM",
    priority: "Moderate",
    details:
      "### Class\n\n- Review lesson plan\n- Teach\n- Grade / give feedback",
    days: [1, 2, 3, 4, 5],
    from: [14, 0],
    to: [16, 0],
  },
  {
    id: "default-fundamentals",
    name: "Mathematics + CS Fundamentals",
    duration: "5:00 PM – 6:30 PM",
    priority: "High",
    details: "### Fundamentals\n\n- DSA practice\n- Math",
    days: [1, 2, 3, 4, 5],
    from: [17, 0],
    to: [18, 30],
  },
  {
    id: "default-networking",
    name: "Networking + Writing",
    duration: "8:00 PM – 9:00 PM",
    priority: "Moderate",
    details:
      "### Build in public\n\n- Post progress on X / LinkedIn\n- Reply to comments and DMs\n- A few minutes on the poetry book",
    days: [0, 1, 2, 3, 4, 5, 6],
    from: [20, 0],
    to: [21, 0],
  },
];

export const defaultTools: Tool[] = [
  { id: "default-github", name: "GitHub", url: "https://github.com" },
  { id: "default-vercel", name: "Vercel", url: "https://vercel.com" },
  { id: "default-npm", name: "npm", url: "https://www.npmjs.com" },
  { id: "default-neon", name: "Neon", url: "https://neon.tech" },
  { id: "default-figma", name: "Figma", url: "https://figma.com" },
  { id: "default-x", name: "X", url: "https://x.com" },
  { id: "default-linkedin", name: "LinkedIn", url: "https://linkedin.com" },
  { id: "default-claude", name: "Claude", url: "https://claude.ai" },
];
