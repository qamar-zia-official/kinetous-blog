"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { priorityValues, slotFormSchema, SlotFormValues } from "./os.schemas";
import { Slot } from "./os.types";
import { DAY_ABBREVIATIONS, tupleToTimeString } from "./os.utils";

const emptyValues: SlotFormValues = {
  name: "",
  duration: "",
  priority: "Moderate",
  details: "",
  days: [],
  from: "09:00",
  to: "10:00",
};

function slotToFormValues(slot: Slot): SlotFormValues {
  return {
    name: slot.name,
    duration: slot.duration,
    priority: slot.priority,
    details: slot.details,
    days: slot.days,
    from: tupleToTimeString(slot.from),
    to: tupleToTimeString(slot.to),
  };
}

interface SlotFormDialogProps {
  trigger: ReactNode;
  /** Present when editing an existing slot; omit to add a new one. */
  slot?: Slot;
  onSubmit: (values: SlotFormValues) => void;
}

export function SlotFormDialog({
  trigger,
  slot,
  onSubmit,
}: SlotFormDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SlotFormValues>({
    resolver: zodResolver(slotFormSchema),
    defaultValues: slot ? slotToFormValues(slot) : emptyValues,
  });

  // Re-sync the form whenever the dialog opens, so editing a different
  // slot (or re-opening "add") always starts from the right values.
  useEffect(() => {
    if (open) {
      reset(slot ? slotToFormValues(slot) : emptyValues);
    }
  }, [open, slot, reset]);

  const submit = (values: SlotFormValues) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{slot ? "Edit slot" : "Add slot"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="slot-name">Name</Label>
            <Input
              id="slot-name"
              placeholder="e.g. Deep Work — Build"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="slot-from">Start time</Label>
              <Input id="slot-from" type="time" {...register("from")} />
              {errors.from && (
                <p className="text-sm text-red-500">{errors.from.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slot-to">End time</Label>
              <Input id="slot-to" type="time" {...register("to")} />
              {errors.to && (
                <p className="text-sm text-red-500">{errors.to.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="slot-duration">Duration label</Label>
            <Input
              id="slot-duration"
              placeholder="e.g. 7:00 AM – 10:00 AM"
              {...register("duration")}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityValues.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Days</Label>
            <Controller
              control={control}
              name="days"
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {DAY_ABBREVIATIONS.map((label, index) => {
                    const checked = field.value.includes(index);
                    return (
                      <label
                        key={index}
                        className="flex items-center gap-1.5 text-sm"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => {
                            const next = value
                              ? [...field.value, index]
                              : field.value.filter((d) => d !== index);
                            field.onChange(next.sort((a, b) => a - b));
                          }}
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.days && (
              <p className="text-sm text-red-500">{errors.days.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="slot-details">Details (Markdown supported)</Label>
            <Textarea id="slot-details" rows={5} {...register("details")} />
            {errors.details && (
              <p className="text-sm text-red-500">{errors.details.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {slot ? "Save changes" : "Add slot"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
