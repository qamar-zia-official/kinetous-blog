import { convertToModelMessages, streamText, UIMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { sysPrompt } from "./system-prompt";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  try {
    const res = await streamText({
      model: groq("openai/gpt-oss-20b"),
      messages: await convertToModelMessages(messages),
      system: sysPrompt,
      providerOptions: {
        groq: {
          reasoningEffort: "medium",
        },
      },
    });
    return res.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
