"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toolFormSchema, ToolFormValues } from "./os.schemas";
import { Tool } from "./os.types";

const emptyValues: ToolFormValues = { name: "", url: "" };

interface ToolFormDialogProps {
  tool?: Tool;
  onSubmit: (values: ToolFormValues) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ToolFormDialog({
  tool,
  open,
  setOpen,
  onSubmit,
}: ToolFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: tool ? { name: tool.name, url: tool.url } : emptyValues,
  });

  useEffect(() => {
    if (open) {
      reset(tool ? { name: tool.name, url: tool.url } : emptyValues);
    }
  }, [open, tool, reset]);

  const submit = (values: ToolFormValues) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{tool ? "Edit tool" : "Add tool"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="tool-name">Name</Label>
            <Input
              id="tool-name"
              placeholder="e.g. GitHub"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tool-url">URL</Label>
            <Input
              id="tool-url"
              placeholder="https://github.com"
              {...register("url")}
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {tool ? "Save changes" : "Add tool"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
