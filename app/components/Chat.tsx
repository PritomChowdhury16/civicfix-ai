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

  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
    stop,
  } = useChat();

  const isLoading =
    status === "submitted" || status === "streaming";

  const isThinking = status === "submitted";

  const messagesContainerRef =
    useRef<HTMLDivElement>(null);

  const shouldAutoScrollRef = useRef(true);

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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!input.trim() || isLoading) {
      return;
    }

    const message = input.trim();

    setInput("");

    shouldAutoScrollRef.current = true;

    await sendMessage({
      text: message,
    });
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
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

          {/* Empty State */}
          {messages.length === 0 && !error && (
            <div className="flex min-h-[55vh] items-center justify-center">
              <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center sm:p-8">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                  🤖
                </div>

                <h2 className="text-lg font-bold sm:text-xl">
                  Start a conversation
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Ask a question or describe a civic problem.
                  The AI can analyze reports and provide a structured result.
                </p>

                <div className="mt-6 text-left">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Try an example
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleExampleClick(
                        "Chattogram এ একটি রাস্তায় অনেক পানি জমে আছে। Location: Agrabad."
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-blue-500 hover:bg-slate-900"
                  >
                    💧 Analyze a waterlogging report
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Chat Messages */}
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
                  className={`max-w-[92%] rounded-2xl px-3 py-2.5 sm:max-w-[85%] sm:px-4 sm:py-3 ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  <div className="mb-1 text-[11px] font-semibold opacity-70 sm:text-xs">
                    {isUser ? "You" : "AI"}
                  </div>

                  <div className="space-y-3">

                    {message.parts.map(
                      (part, index) => {

                        /* Text */
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

                        /* Civic Tool */
                        if (
                          part.type ===
                          "tool-analyzeCivicReport"
                        ) {

                          /* Input streaming */
                          if (
                            part.state ===
                            "input-streaming"
                          ) {
                            return (
                              <div
                                key={index}
                                className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400" />

                                  <div>
                                    <div className="font-semibold text-blue-300">
                                      Preparing Civic Analysis
                                    </div>

                                    <p className="mt-1 text-xs text-slate-400">
                                      Preparing the report information...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          /* Input available */
                          if (
                            part.state ===
                            "input-available"
                          ) {
                            return (
                              <div
                                key={index}
                                className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-yellow-400" />

                                  <div>
                                    <div className="font-semibold text-yellow-300">
                                      Analyzing Civic Report
                                    </div>

                                    <p className="mt-1 text-xs text-slate-400">
                                      Report received. Running analysis...
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          /* Output available */
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

                          /* Tool error */
                          if (
                            part.state ===
                            "output-error"
                          ) {
                            return (
                              <div
                                key={index}
                                className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                                    ⚠️
                                  </div>

                                  <div>
                                    <div className="font-semibold text-red-300">
                                      Analysis failed
                                    </div>

                                    <p className="mt-1 text-xs text-slate-400">
                                      The report could not be analyzed.
                                    </p>
                                  </div>
                                </div>

                                <p className="mt-3 rounded-lg bg-slate-950/50 p-3 text-xs text-red-300">
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

          {/* Thinking Skeleton */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="w-full max-w-[85%] rounded-2xl bg-slate-800 px-4 py-4">

                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400" />

                  <span className="text-xs font-semibold text-slate-300">
                    AI is thinking...
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="h-3 w-4/5 animate-pulse rounded bg-slate-700" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-700" />
                  <div className="h-3 w-3/5 animate-pulse rounded bg-slate-700" />
                </div>

              </div>
            </div>
          )}

          {/* Chat Request Error */}
          {error && (
            <div className="flex justify-start">
              <div className="w-full max-w-[92%] rounded-2xl border border-red-500/30 bg-red-500/10 p-4 sm:max-w-[85%]">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                    ⚠️
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-red-300">
                      We couldn't complete that response
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Your message is still here. You can retry the failed response without starting the conversation again.
                    </p>

                    <button
                      type="button"
                      onClick={() => regenerate()}
                      disabled={isLoading}
                      className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading
                        ? "Retrying..."
                        : "Retry response"}
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-800 pt-3 sm:pt-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row">

            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask something..."
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 disabled:opacity-50"
            />

            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 sm:w-auto"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Send
              </button>
            )}

          </div>
        </form>

      </div>
    </main>
  );
}