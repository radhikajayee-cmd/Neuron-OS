import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: "You are NeuronOS, a highly advanced AI study assistant. Your goal is to help students understand concepts simply, act as a tutor, generate practice questions, and summarize notes. Be encouraging, precise, and format your answers beautifully in markdown with code blocks where applicable.",
  });
  return result.toTextStreamResponse();
}
