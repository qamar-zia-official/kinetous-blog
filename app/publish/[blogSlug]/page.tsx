"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { articleMetaDefaults } from "./article-meta-schema";
import "highlight.js/styles/github-dark.css";
import { CldImage, CldUploadButton } from "next-cloudinary"
import { use, useEffect, useState, useTransition } from "react";
import { addBlog } from "@/db/blog/add-blog";
import { updateBlog } from "@/db/blog/update-blog";
import { getBlog } from "@/db/blog/get-blog";

import MyBubbleMenu from "./components/bubble-menu";
import Toolbar from "./components/toolbar";
import CommandPallete from "./components/command-pallete";

import { editorExtensions, editorProseClassName } from "../../../lib/editor-extensions";

import { EDITOR_DEFAULT_CONTENT } from "./constants";
import { useCommandPaletteShortcut } from "./use-command-palette-shortcut";
import { ArticleMetaForm } from "./article-meta-form";
import { EditorFooter } from "./editor-footer";
import { useRouter, useSearchParams } from "next/navigation";
import { blogTable } from "@/db/schemas/schema";
import { image } from "motion/react-client";
import { EditIcon } from "lucide-react";

export default function Editor({
  params
}: { params: Promise<{ blogSlug: string }> }) {
  const { blogSlug } = use(params);

  const [cmdOpen, setCmdOpen] = useState(false);
  useCommandPaletteShortcut(setCmdOpen);

  // TODO: coverImageFile is captured but nothing uploads it yet. Wire this
  // to whatever storage you're using (S3/Cloudinary/UploadThing/etc), then
  // set the resulting URL onto meta.values.coverImage before save() runs —
  // the schema requires coverImage to be a non-empty string.
  const [coverImageFile, setCoverImageFile] = useState<string | null>(null);

  const [meta, setMeta] = useState<{
    values: typeof blogTable.$inferInsert;
  }>({ values: articleMetaDefaults });
  const [isValid, setIsValid] = useState<boolean>(false)

  const [slug, setSlug] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const [isSaving, startSaving] = useTransition();



  useEffect(() => {
    async function get() {
      console.log("before")
      if (!blogSlug || blogSlug === "new") return;
      console.log("after")
      if (await !blogSlug) return;
      const result = await getBlog(blogSlug);
      if (!result.success || !result.data) {
        setSaveError(result.success ? "Blog not found" : result.error);
        return;
      }

      setMeta({ values: {...result.data, body: JSON.parse(result.data.body || "") } });
      console.log(meta.values.body)
      setIsValid(true)
      setCoverImageFile(result.data.coverImage.toString());
      setSlug(result.data.slug);
      console.log("getting meta", result)
      console.log("meta", JSON.parse(result.data.body || ""))
    }
    get();
  }, [slug]);
  const editor = useEditor({
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log(meta)
    },
 content: meta.values.body || EDITOR_DEFAULT_CONTENT,
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        spellcheck: "true",
        autocorrect: "on",
        autocapitalize: "sentences",
        autocomplete: "on",
        class: editorProseClassName,
      },
    },
  });

  // useEditor's `content` option only applies on first mount — it won't pick
  // up meta.values.body once it arrives asynchronously from getBlog(). This
  // pushes the fetched content into the editor once it's actually available.
  useEffect(() => {
    if (editor && meta.values.body) {
      editor.commands.setContent(meta.values.body);
    }
    // Only re-run when the loaded post id changes, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, slug]);
  const router = useRouter();
  const save = (status: "publish" | "draft") => {
    setSaveError(null);
    setSaveStatus("idle");

    startSaving(async () => {
      const payload = {
        ...meta.values,
        status: status === "publish" ? ("published" as const) : ("draft" as const),
        image: coverImageFile?.toString() ?? "",
        body: JSON.stringify(editor?.getJSON()) ?? "",
        ...(status === "publish" ? { publishedAt: new Date() } : {}),
      };

      console.log("[save] payload", payload);

      const result = slug
        ? await updateBlog({ ...payload, id: meta.values.id as string, coverImage: coverImageFile?.toString() || "" })
        : await addBlog({ ...payload, coverImage: coverImageFile?.toString() || "" });
       router.push(`/publish/${meta.values.slug}`);
      // Leave this in until save is reliably working — it tells you exactly
      // what came back from the server action (validation error, thrown DB
      // error, or the actual inserted/updated row).
      console.log("[save]", status, result);

      if (!result.success) {
        setSaveError(result.error);
        return;
      }

      if (!slug) setSlug(result.data.slug);
      setSaveStatus("saved");
    });
  };

  const canSave = isValid && !isSaving;

  if (!editor) return null;

  return (
    <section className="flex flex-col  pt-24 overflow-hidden rounded-3xl border border-border bg-background shadow-2xl w-full">
      <CommandPallete
        editor={editor}
        open={cmdOpen}
        setOpen={setCmdOpen}
        save={save}
        canSave={canSave}
        isSaving={isSaving}
        slug={slug}
      />

      <header className="flex  z-50 h-14 fixed top-16 items-center justify-between border-b border-border px-6 left-0 right-0">
        <Toolbar save={save} editor={editor} canSave={canSave} isSaving={isSaving} />
      </header>

      {(isSaving || saveStatus === "saved" || saveError) && (
        <div className="mx-auto max-w-6xl w-full px-6 pt-4 text-sm">
          {isSaving && <span className="text-muted-foreground">Saving…</span>}
          {!isSaving && saveError && (
            <span className="text-destructive">Failed to save: {saveError}</span>
          )}
          {!isSaving && !saveError && saveStatus === "saved" && (
            <span className="text-emerald-500">
              Saved{slug ? ` (id: ${slug})` : ""}
            </span>
          )}
        </div>
      )}

      <div className="border-ll
      b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl p-6">
          {coverImageFile ? (
            <div className="flex relative justify-center items-center w-fit mx-auto">
              <CldUploadButton
                className="mx-auto my-2 bg-primary text-primary-foreground hover:bg-primary/80 p-2 px-4 rounded-2xl absolute top-0 right-4 flex justify-center items-center gap-2"
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                options={{
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
                  publicId: JSON.parse(coverImageFile).public_id,
                }}
                onSuccess={(result) => {
                  if (result.info && typeof result.info !== 'string') {
                    setCoverImageFile(JSON.stringify(result.info));
                    setMeta({ values: { ...meta.values, coverImage: JSON.stringify(result.info) } });
                    console.log('Upload successful:', result.info);
                  }
                }}
                onQueuesEnd={(result, { widget }) => {
                  widget.close();
                }}
              >
                <EditIcon /> Change Image
              </CldUploadButton>
              <CldImage
                src={JSON.parse(coverImageFile).public_id}
                alt={meta.values.title}
                width={1200}
                height={630}
                className="aspect-video rounded-2xl border border-zinc-800 object-cover object-top max-w-6xl"
              />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <CldUploadButton
                className="mx-auto my-2 bg-primary text-primary-foreground hover:bg-primary/80 p-2 px-4 rounded-2xl"
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                options={{
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
                  theme: "minimal",
                }}
                onSuccess={(result) => {
                  if (result.info && typeof result.info !== 'string') {
                    setCoverImageFile(JSON.stringify(result.info));
                    console.log('Upload successful:', result.info);
                  }
                }}
                onQueuesEnd={(result, { widget }) => {
                  widget.close();
                }}
              >
                Upload Image
              </CldUploadButton>
            </div>
          )}
          <ArticleMetaForm
            key={slug ?? "new"}
            defaultValues={meta.values}
            onChange={(meta, isValid) => {
              setMeta({ values: meta })
              setIsValid(isValid)
              console.log(meta, isValid)
            }}
          />
        </div>
        <div>

        </div>
      </div>

      <div className="flex-1">
        <div className="mx-auto w-full min-h-screen max-w-195 px-12 py-16">
          <MyBubbleMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>

      <EditorFooter editor={editor} />
    </section>
  );
}