"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";

import CivicAnalysisCard from "./CivicAnalysisCard";

type CivicAnalysisResult = {
  category: string;
  description: string;
  location: string;
  severity: "Low" | "Medium" | "High";
  priority: number;
  recommendation: string;
};

export default function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, stop } = useChat();

  const isLoading =
    status === "submitted" || status === "streaming";

  const isThinking = status === "submitted";

  const messagesContainerRef =
    useRef<HTMLDivElement>(null);

  const shouldAutoScrollRef = useRef(true);

  // Detect whether the user has manually scrolled up
  const handleScroll = () => {
    const container =
      messagesContainerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    shouldAutoScrollRef.current =
      distanceFromBottom < 100;
  };

  // Automatically scroll to the newest message
  useEffect(() => {
    const container =
      messagesContainerRef.current;

    if (!container) {
      return;
    }

    if (shouldAutoScrollRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Send a new message
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!input.trim() || isLoading) {
      return;
    }

    const message = input;

    setInput("");

    // New message means we should follow the conversation
    shouldAutoScrollRef.current = true;

    await sendMessage({
      text: message,
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-3 py-4 sm:px-4 sm:py-6">

        {/* Header */}

        <header className="mb-4 sm:mb-6">
          <h1 className="text-xl font-bold sm:text-2xl">
            AI Streaming Chat
          </h1>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Chat with an AI assistant in real time.
          </p>
        </header>

        {/* Messages */}

        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 space-y-3 overflow-y-auto pb-4 sm:space-y-4 sm:pb-6"
        >
          {messages.map((message) => {
            const isUser =
              message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2.5 sm:max-w-[85%] sm:px-4 sm:py-3 ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {/* Sender */}

                  <div className="mb-1 text-[11px] font-semibold opacity-70 sm:text-xs">
                    {isUser ? "You" : "AI"}
                  </div>

                  {/* Message Parts */}

                  <div className="space-y-3">

                    {message.parts.map(
                      (part, index) => {

                        /* =========================
                           NORMAL AI TEXT
                        ========================= */

                        if (
                          part.type === "text"
                        ) {
                          return (
                            <div
                              key={index}
                              className="prose prose-invert max-w-none text-sm leading-6"
                            >
                              <ReactMarkdown>
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          );
                        }

                        /* =========================
                           CIVIC ANALYSIS TOOL
                        ========================= */

                        if (
                          part.type ===
                          "tool-analyzeCivicReport"
                        ) {

                          /* =====================
                             INPUT STREAMING
                          ===================== */

                          if (
                            part.state ===
                            "input-streaming"
                          ) {
                            return (
                              <div
                                key={index}
                                className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4"
                              >
                                <div className="font-semibold text-blue-300">
                                  🔵 Preparing Civic Analysis
                                </div>

                                <p className="mt-1 text-sm text-slate-400">
                                  The AI is preparing the report information...
                                </p>
                              </div>
                            );
                          }

                          /* =====================
                             INPUT AVAILABLE
                          ===================== */

                          if (
                            part.state ===
                            "input-available"
                          ) {
                            return (
                              <div
                                key={index}
                                className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
                              >
                                <div className="font-semibold text-yellow-300">
                                  🟡 Analyzing Civic Report
                                </div>

                                <p className="mt-1 text-sm text-slate-400">
                                  Report information received. Running analysis...
                                </p>
                              </div>
                            );
                          }

                          /* =====================
                             OUTPUT AVAILABLE
                          ===================== */

                          if (
                            part.state ===
                            "output-available"
                          ) {
                            const result =
                              part.output as CivicAnalysisResult;

                            return (
                              <CivicAnalysisCard
                                key={index}
                                result={result}
                              />
                            );
                          }

                          /* =====================
                             OUTPUT ERROR
                          ===================== */

                          if (
                            part.state ===
                            "output-error"
                          ) {
                            return (
                              <div
                                key={index}
                                className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
                              >
                                <div className="font-semibold text-red-300">
                                  🔴 Analysis Failed
                                </div>

                                <p className="mt-1 text-sm text-slate-400">
                                  The civic report could not be analyzed.
                                </p>

                                <p className="mt-2 text-xs text-red-400">
                                  {part.errorText}
                                </p>
                              </div>
                            );
                          }
                        }

                        return null;
                      }
                    )}

                  </div>
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}

          {isThinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-slate-800 px-3 py-2.5 text-sm text-slate-300 sm:px-4 sm:py-3">
                <span className="font-semibold">
                  AI
                </span>

                <span className="ml-2 animate-pulse">
                  Thinking...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 border-t border-slate-800 pt-3 sm:flex-row sm:pt-4"
        >

          {/* Input */}

          <input
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Ask something..."
            disabled={isLoading}
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-50"
          />

          {/* Stop / Send */}

          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 sm:w-auto"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Send
            </button>
          )}

        </form>
      </div>
    </main>
  );
}