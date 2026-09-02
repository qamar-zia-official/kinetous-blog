"use client";

import { useEffect, useRef, useState, Fragment, useCallback } from "react";
import logo from "@/public/logo3.svg";
import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageSquare, X } from "lucide-react";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

const QUICK_QUESTIONS = [
  "What do you do?",
  "What's your pricing?",
  "Who runs this?",
  "What kind of projects do you take?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  // Auto-focus the textarea as soon as the panel opens, so a returning
  // visitor can start typing immediately instead of having to click in.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus();
    }, 60);
    return () => window.clearTimeout(id);
  }, [open]);

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      // If the submit button is pressed while a reply is in flight, treat it
      // as "stop generating" instead of trying to send whatever's typed.
      if (isBusy) {
        stop();
        return;
      }
      if (message.text?.trim()) {
        sendMessage({ text: message.text });
        setInput("");
      }
    },
    [isBusy, sendMessage, stop],
  );

  const askQuickQuestion = useCallback(
    (question: string) => {
      if (isBusy) return;
      sendMessage({ text: question });
      setInput("");
    },
    [isBusy, sendMessage],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={open ? "Close chat" : "Chat with AI"}
        className={cn(
          "fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full border border-blue-700 bg-zinc-800 px-4 py-4 text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0",
        )}
      >
        {open ? "Close" : "Chat With AI"}
        {open ? (
          <X size={20} />
        ) : (
          <MessageSquare size={20} />
        )}
      </PopoverTrigger>

      <PopoverContent
        ref={panelRef}
        side="top"
        align="end"
        sideOffset={12}
        className={cn(
          "flex w-[92vw] max-w-md flex-col rounded-lg border border-zinc-800/60 bg-zinc-900/85 p-4 text-popover-foreground shadow-2xl backdrop-blur-2xl sm:max-w-lg",
          "max-h-[85vh]",
        )}
      >
        <PopoverHeader className="relative flex flex-col items-center justify-center gap-2 text-center">
          <Image src={logo} alt="Kinetous Logo" width={48} height={48} />
          <PopoverTitle>Aria — QamarQon Labs Support Agent</PopoverTitle>
          <div className="absolute bottom-0 right-0 h-1 w-full bg-linear-90 from-transparent via-blue-600 to-transparent blur-2xl" />
        </PopoverHeader>

        <Conversation className="max-h-[50vh] min-h-[30vh] overflow-y-scroll">
          <ConversationContent>
            {messages.length === 0 && (
              <div>
                <p className="text-2xl font-bold">
                  Hi! I&apos;m Aria, QamarQon Labs&apos; AI assistant.
                </p>
                <p className="text-zinc-300">What can I help you with today?</p>
                <div>
                  <p className="mt-4 mb-1 text-sm font-semibold text-zinc-300">
                    Quick questions
                  </p>
                  <div className="flex flex-col gap-2">
                    {QUICK_QUESTIONS.map((qs) => (
                      <button
                        type="button"
                        onClick={() => askQuickQuestion(qs)}
                        key={qs}
                        className="rounded-full border border-zinc-800 bg-zinc-800/20 p-2 px-4 text-left text-md backdrop-brightness-200 backdrop-blur-2xl transition-transform hover:-translate-y-0.5 hover:bg-zinc-700/20 hover:shadow-xl active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {qs}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <Fragment key={index}>
                {message.role === "user" ? (
                  <Fragment key={index}>
                    {message.parts.map(
                      (part, idx) =>
                        part.type === "text" && (
                          <Message key={idx} from="user">
                            <MessageContent>{part.text}</MessageContent>
                          </Message>
                        ),
                    )}
                  </Fragment>
                ) : (
                  <Fragment key={index}>
                    {message.parts.map(
                      (part, idx) =>
                        part.type === "text" && (
                          <Message from="assistant" key={idx}>
                            <MessageResponse>{part.text}</MessageResponse>
                          </Message>
                        ),
                    )}
                  </Fragment>
                )}
              </Fragment>
            ))}

            {/* Waiting for the first token: shows Aria is working on it
                instead of leaving a silent gap after the user's message. */}
            {status === "submitted" && (
              <Message from="assistant">
                <MessageContent>
                  <span className="inline-flex items-center gap-1 py-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                  </span>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
        </Conversation>

        {error && (
          <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
            <span>Something went wrong sending that.</span>
            <button
              type="button"
              onClick={() => regenerate()}
              className="shrink-0 font-semibold underline underline-offset-2 hover:text-red-200"
            >
              Retry
            </button>
          </div>
        )}

        <PromptInput
          onSubmit={handleSubmit}
          className="relative mt-4 w-full max-w-2xl mx-auto"
        >
          <PromptInputTextarea
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={status}
            disabled={!isBusy && !input.trim()}
            className="absolute bottom-1 right-1"
          />
        </PromptInput>
      </PopoverContent>
    </Popover>
  );
}