"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { Priority, Slot, Tool } from "./os.types";
import { SlotFormValues, ToolFormValues } from "./os.schemas";
import { defaultSlots, defaultTools } from "./os.data";
import {
  ensureSeeded,
  loadSlots,
  loadTools,
  saveSlots,
  saveTools,
} from "./os.storage";
import {
  faviconUrl,
  formatDays,
  generateId,
  timeStringToTuple,
} from "./os.utils";
import { SlotFormDialog } from "./slot-form-dialog";
import { ToolFormDialog } from "./tool-form-dialog";
import { ConfirmDialog } from "./confirm-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const priorityColor: Record<Priority, string> = {
  Severe: "bg-red-500",
  High: "bg-orange-500",
  Moderate: "bg-yellow-500",
  Low: "bg-green-500",
};

const POLL_INTERVAL_MS = 15_000;

// ---------------------------------------------------------------------------
// Active-slot detection
// ---------------------------------------------------------------------------

function toMinutes(time: [number, number]): number {
  return time[0] * 60 + time[1];
}

/** Range check that also handles slots crossing midnight (e.g. 22:30 -> 01:00). */
function isWithinRange(
  nowMinutes: number,
  from: [number, number],
  to: [number, number],
): boolean {
  const fromM = toMinutes(from);
  const toM = toMinutes(to);

  if (fromM === toM) return false;
  if (fromM < toM) return nowMinutes >= fromM && nowMinutes < toM;
  return nowMinutes >= fromM || nowMinutes < toM;
}

function findActiveSlot(
  slotList: Slot[],
  day: number,
  hour: number,
  minutes: number,
): Slot | null {
  const nowMinutes = hour * 60 + minutes;
  return (
    slotList.find(
      (slot) =>
        slot.days.includes(day) &&
        isWithinRange(nowMinutes, slot.from, slot.to),
    ) ?? null
  );
}

function slotFormToStored(values: SlotFormValues): Omit<Slot, "id"> {
  return {
    name: values.name,
    duration: values.duration,
    priority: values.priority,
    details: values.details,
    days: values.days,
    from: timeStringToTuple(values.from),
    to: timeStringToTuple(values.to),
  };
}

export default function TimeTable() {
  const [slots, setSlots] = useState<Slot[]>(defaultSlots);
  const [tools, setTools] = useState<Tool[]>(defaultTools);
  const [hydrated, setHydrated] = useState(false);

  const [active, setActive] = useState<Slot | null>(null);
  const [today, setToday] = useState<number>(() => new Date().getDay());
  const [showAllSlots, setShowAllSlots] = useState(false);

  // First-run seed, then hydrate from localStorage.
  useEffect(() => {
    ensureSeeded();
    setSlots(loadSlots());
    setTools(loadTools());
    setHydrated(true);
  }, []);

  const updateActive = useCallback((slotList: Slot[]) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();

    setToday((prev) => (prev !== day ? day : prev));
    setActive(findActiveSlot(slotList, day, hour, minutes));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    updateActive(slots);
    const interval = setInterval(() => updateActive(slots), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [hydrated, slots, updateActive]);

  const todaySlots = useMemo(
    () => slots.filter((slot) => slot.days.includes(today)),
    [slots, today],
  );

  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => {
      const aDay = a.days.length ? Math.min(...a.days) : 7;
      const bDay = b.days.length ? Math.min(...b.days) : 7;
      if (aDay !== bDay) return aDay - bDay;
      return toMinutes(a.from) - toMinutes(b.from);
    });
  }, [slots]);

  // ---------------------------------------------------------------------
  // Persistence + CRUD
  // ---------------------------------------------------------------------

  const persistSlots = useCallback((next: Slot[]) => {
    setSlots(next);
    saveSlots(next);
  }, []);

  const persistTools = useCallback((next: Tool[]) => {
    setTools(next);
    saveTools(next);
  }, []);

  const handleAddSlot = (values: SlotFormValues) => {
    const newSlot: Slot = { id: generateId(), ...slotFormToStored(values) };
    persistSlots([...slots, newSlot]);
  };

  const handleUpdateSlot = (id: string, values: SlotFormValues) => {
    persistSlots(
      slots.map((s) => (s.id === id ? { id, ...slotFormToStored(values) } : s)),
    );
  };

  const handleRemoveSlot = (id: string) => {
    persistSlots(slots.filter((s) => s.id !== id));
  };

  const handleAddTool = (values: ToolFormValues) => {
    const newTool: Tool = { id: generateId(), ...values };
    persistTools([...tools, newTool]);
  };

  const handleUpdateTool = (id: string, values: ToolFormValues) => {
    persistTools(tools.map((t) => (t.id === id ? { id, ...values } : t)));
  };

  const handleRemoveTool = (id: string) => {
    persistTools(tools.filter((t) => t.id !== id));
  };
  const [addTool, setAddTool] = useState(false);
  return (
    <main className="container mx-auto py-10 space-y-6 pt-20 min-h-screen">
      <Tabs defaultValue="timetable">
        <TabsList>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {/* ---------------------------------------------------------- */}
        {/* Timetable                                                   */}
        {/* ---------------------------------------------------------- */}
        <TabsContent value="timetable" className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-semibold text-6xl font-sans text-center">
              Qamar Operating System
            </h1>
            <p className="text-muted-foreground mt-2 text-center">
              Focus on income, learning, networking and long term leverage.
            </p>
          </div>

          {active ? (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle className="text-3xl">
                  Active Now: {active.name}
                </CardTitle>
                <p>{active.duration}</p>
                <Badge
                  className={cn(
                    "w-fit text-white",
                    priorityColor[active.priority] ?? "bg-muted",
                  )}
                >
                  {active.priority}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <Markdown>{active.details}</Markdown>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Active Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <Markdown>
                    {`
### Use This Time For:

- Client Outreach
- Mathematics
- CS Fundamentals
- Networking

Never default to random browsing.
`}
                  </Markdown>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAllSlots((v) => !v)}
            >
              {showAllSlots ? "Hide all slots" : "Manage all slots"}
            </Button>
          </div>

          {todaySlots.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground">
                No slots scheduled for today.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {todaySlots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isActive={active?.id === slot.id}
                  onUpdate={(values) => handleUpdateSlot(slot.id, values)}
                  onDelete={() => handleRemoveSlot(slot.id)}
                />
              ))}
            </div>
          )}

          {showAllSlots && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">All slots</h3>
                <SlotFormDialog
                  trigger={
                    <Button size="sm">
                      <IconPlus className="mr-1.5 size-4" /> Add slot
                    </Button>
                  }
                  onSubmit={handleAddSlot}
                />
              </div>

              {sortedSlots.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">
                  No slots yet. Add one to build out your week.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {sortedSlots.map((slot) => (
                    <SlotCard
                      key={slot.id}
                      slot={slot}
                      isActive={active?.id === slot.id}
                      showDays
                      onUpdate={(values) => handleUpdateSlot(slot.id, values)}
                      onDelete={() => handleRemoveSlot(slot.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* ---------------------------------------------------------- */}
        {/* Tools                                                       */}
        {/* ---------------------------------------------------------- */}
        <TabsContent value="tools" className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <Button size="lg" onClick={() => setAddTool(true)}>
              <IconPlus className="mr-1.5 size-4" /> Add tool
            </Button>
            <ToolFormDialog
              open={addTool}
              setOpen={setAddTool}
              onSubmit={handleAddTool}
            />
          </div>
          <p className="text-4xl text-muted-foreground mx-auto my-2">
            <q className="font-semibold">Keep it simple small but useful.</q>
          </p>
          {tools.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground">
                No tools saved yet. Add a link to get started.
              </CardContent>
            </Card>
          ) : (
            <div className="flex gap-4 justify-center items-center flex-wrap">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onUpdate={(values) => handleUpdateTool(tool.id, values)}
                  onDelete={() => handleRemoveTool(tool.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}

// ---------------------------------------------------------------------------
// SlotCard
// ---------------------------------------------------------------------------

function SlotCard({
  slot,
  isActive,
  showDays = false,
  onUpdate,
  onDelete,
}: {
  slot: Slot;
  isActive: boolean;
  showDays?: boolean;
  onUpdate: (values: SlotFormValues) => void;
  onDelete: () => void;
}) {
  const [confOpen, setConfirmOpen] = useState(false);
  return (
    <Card className={cn(isActive && "border-2 border-blue-500")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>{slot.name}</CardTitle>
            {showDays && (
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDays(slot.days)}
              </p>
            )}
          </div>

          <div className="flex shrink-0 gap-1">
            <SlotFormDialog
              trigger={
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Edit ${slot.name}`}
                >
                  <IconPencil className="size-4" />
                </Button>
              }
              slot={slot}
              onSubmit={onUpdate}
            />
            <Button
              size="icon"
              variant="ghost"
              aria-label={`Delete ${slot.name}`}
            >
              <IconTrash className="size-4" />
            </Button>
            <ConfirmDialog
              open={confOpen}
              setOpen={setConfirmOpen}
              title="Delete this slot?"
              description={`"${slot.name}" will be removed from your timetable. This can't be undone.`}
              onConfirm={onDelete}
            />
          </div>
        </div>

        <p>{slot.duration}</p>

        <Badge
          className={cn(
            "w-fit text-white",
            priorityColor[slot.priority] ?? "bg-muted",
          )}
        >
          {slot.priority}
        </Badge>
      </CardHeader>

      <CardContent>
        <Accordion>
          <AccordionItem value="details">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent>
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{slot.details}</Markdown>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// ToolCard + ToolIcon
// ---------------------------------------------------------------------------

function ToolCard({
  tool,
  onUpdate,
  onDelete,
}: {
  tool: Tool;
  onUpdate: (values: ToolFormValues) => void;
  onDelete: () => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Tooltip>
            <TooltipTrigger delay={100}>
              <CardContent className="flex flex-col items-center gap-3 pt-6">
                <ToolIcon url={tool.url} name={tool.name} />
              </CardContent>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 text-white">
              <div>
                <p>Name: {tool.name}</p>
                <p>URL: {tool.url}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <ContextMenuItem>Open</ContextMenuItem>
          </a>
          <ContextMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </ContextMenuItem>
          <ContextMenuItem onClick={() => setConfirmOpen(true)}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <ToolFormDialog
        open={editOpen}
        setOpen={setEditOpen}
        tool={tool}
        onSubmit={onUpdate}
      />
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Delete this tool?"
        description={`"${tool.name}" will be removed from your tools list.`}
        onConfirm={onDelete}
      />
    </>
  );
}

function ToolIcon({ url, name }: { url: string; name: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
        {name.charAt(0).toUpperCase() || "?"}
      </div>
    );
  }

  return (
    // Google's S2 favicon endpoint. Plain <img>, not next/image — the
    // domain is dynamic and would need allow-listing per-site in
    // next.config otherwise.
    // eslint-disable-next-line @next/next/no-img-element
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 flex-col gap-2 border-1 border-zinc-800 hover:bg-zinc-800 p-2 rounded-md"
    >
      <img
        src={faviconUrl(url, 128)}
        alt=""
        width={120}
        height={120}
        className="size-20 shrink-0 rounded-md object-contain p-1"
        loading="lazy"
        onError={() => setErrored(true)}
      />
    </a>
  );
}
