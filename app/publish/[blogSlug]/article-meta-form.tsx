"use client";

import {  useEffect, useState } from "react";
import {cn} from "@/lib/utils"
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  articleMetaSchema,
  articleMetaDefaults,
} from "./article-meta-schema";
import { TagInput } from "./tag-input";
import { CanonicalUrlList } from "./canonical-url-list";
import { CoverImageInput } from "./cover-image-input";
import {blogTable} from "@/db/schemas/schema"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {insertBlogSchema} from "@/db/blog/blog-schema"

interface ArticleMetaFormProps {
  defaultValues?: Partial<typeof blogTable.$inferInsert>;
  /** Fires on every change with the live values and current validity. */
  onChange: (meta: typeof blogTable.$inferInsert, isValid: boolean) => void;
}

export function ArticleMetaForm({ defaultValues, onChange }: ArticleMetaFormProps) {
  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<typeof blogTable.$inferInsert>({
    resolver: zodResolver(articleMetaSchema) as Resolver<typeof blogTable.$inferInsert>,
    mode: "onChange",
    defaultValues: { ...articleMetaDefaults, ...defaultValues },
  });

  const values = watch();

  // Bubble live values up to the parent (which owns the editor body
  // and the eventual save action) without making this a controlled
  // form — react-hook-form manages its own state internally.

  useEffect(() => {
    if (onChange) {
      console.log(Object.keys(errors).length)
    const { success, error } = insertBlogSchema.safeParse(values);
     onChange(values, success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values), isValid]);

  return (
    <div>
        <Field label="Article title" error={errors.title?.message} className="lg:col-span-2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Textarea placeholder="Article title" {...field} style={{fontSize: "4rem"}} className="w-full bg-transparent border-0 outline-0 h-fit rounded-none col-span-2 text-7xl font-bold" />}
          />
        </Field>

        <Field label="Excerpt" className="lg:col-span-2" error={errors.excerpt?.message}>
          <Controller
            name="excerpt"
            control={control}
            render={({ field }) => <Input placeholder="Short excerpt" {...field} />}
          />
        </Field>

  <Accordion className="mt-4">
<AccordionItem value="Cover Image">
  <AccordionTrigger>Meta Data</AccordionTrigger>
  <AccordionContent>
<div className="grid gap-6 lg:grid-cols-2 py-2">

        <Field label="Meta title" error={errors.metaTitle?.message}>
          <Controller
            name="metaTitle"
            control={control}
            render={({ field }) => <Input placeholder="Meta title" {...field} />}
          />
        </Field>

        <Field label="Meta description" error={errors.metaDescription?.message}>
          <Controller
            name="metaDescription"
            control={control}
            render={({ field }) => <Input placeholder="Meta description" {...field} />}
          />
        </Field>

        <Field label="Slug" error={errors.slug?.message}>
          <Controller
            name="slug"
            control={control}
            render={({ field }) => <Input placeholder="article-slug" {...field} />}
          />
       <p className="text-xs text-muted-foreground">Warning: Changing Slug will reload the page.</p>
        </Field>



        <Field label="Tags">
          <Controller name="tags" control={control} render={({ field }) => <TagInput tags={field.value as string[]} onChange={field.onChange} />} />
        </Field>

        <div className="flex flex-wrap gap-6 pt-2 lg:col-span-2 grid grid-cols-2">
          <Controller
            name="visible"
            control={control}
            render={({ field }) => (
              <Label className="flex bg-zinc-800 px-2 rounded-full items-center gap-2 text-sm">
                <Input className="w-fit" type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                Visible
              </Label>
            )}
          />

          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <Label className="flex bg-zinc-800 px-2 rounded-full items-center gap-2 text-sm">
                <Input type="checkbox" checked={field.value} className="w-fit" onChange={(e) => field.onChange(e.target.checked)} />
Featured
              </Label>
            )}
          />
        </div>
        <Field label="Canonical URLs" className="lg:col-span-2" error={errors.canonicalUrls?.message as string | undefined}>
          <Controller
            name="canonicalUrls"
            control={control}
            render={({ field }) => <CanonicalUrlList urls={field.value as string[]} onChange={field.onChange} />}
          />
        </Field>
</div>
  </AccordionContent>
</AccordionItem>
  </Accordion>
    </div>
  );
}

function Field({ label, error, children, className }: { label: string; className?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}