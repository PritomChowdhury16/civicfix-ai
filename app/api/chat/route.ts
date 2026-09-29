import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import {
  chatModel,
  systemPrompt,
} from "@/lib/ai-config";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const result = streamText({
    model: chatModel,

    system: systemPrompt,

    messages:
      await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}