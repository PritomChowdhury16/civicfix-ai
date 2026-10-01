import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import {
  chatModel,
  systemPrompt,
} from "@/lib/ai-config";

import {
  analyzeCivicReport,
} from "@/lib/civic-tool";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const result = streamText({
    model: chatModel,

    system: systemPrompt,

    messages:
      await convertToModelMessages(messages),

    tools: {
      analyzeCivicReport,
    },
  });

  return result.toUIMessageStreamResponse();
}