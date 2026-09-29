import { google } from "@ai-sdk/google";

/**
 * AI Model Configuration
 *
 * Keep the model and system prompt in one place.
 * This makes the AI configuration easier to maintain.
 */

// The Gemini model used by our chat application
export const chatModel = google("gemini-3.8-flash");

// Instructions that control the AI assistant's behavior
export const systemPrompt =
  "You are a helpful AI assistant. Give clear, concise, and friendly answers.";