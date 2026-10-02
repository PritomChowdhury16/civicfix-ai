"use client";

import { useState } from "react";

import MotionButton, {
  type ButtonState,
} from "@/app/components/MotionButton";

export default function MotionPage() {
  const [trigger, setTrigger] =
    useState<ButtonState | null>(null);

  const [currentState, setCurrentState] =
    useState<ButtonState>("idle");

  function testSuccess() {
    setTrigger(null);

    setTimeout(() => {
      setTrigger("success");
    }, 50);
  }

  function testError() {
    setTrigger(null);

    setTimeout(() => {
      setTrigger("error");
    }, 50);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-blue-400">
            Motion with Intent
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            AI Send Button
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            A button that communicates what is happening
            through intentional motion.
          </p>
        </div>

        {/* Button Demo */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex min-h-40 items-center justify-center">
            <MotionButton
              externalTrigger={trigger}
              onStateChange={setCurrentState}
            />
          </div>
        </section>

        {/* Test Controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={testSuccess}
            className="
              flex-1 rounded-xl
              border border-green-500/30
              bg-green-500/10
              px-4 py-3
              text-sm font-semibold
              text-green-400
              transition
              hover:bg-green-500/20
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-green-400
            "
          >
            Test Success
          </button>

          <button
            type="button"
            onClick={testError}
            className="
              flex-1 rounded-xl
              border border-red-500/30
              bg-red-500/10
              px-4 py-3
              text-sm font-semibold
              text-red-400
              transition
              hover:bg-red-500/20
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-400
            "
          >
            Test Error
          </button>
        </div>

        {/* Current State */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Current State
          </p>

          <p className="mt-2 text-lg font-semibold capitalize">
            {currentState}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {currentState === "idle" &&
              "Ready to send a message."}

            {currentState === "loading" &&
              "The message is being processed."}

            {currentState === "success" &&
              "The message was sent successfully."}

            {currentState === "error" &&
              "Something went wrong. Retry the action."}
          </p>
        </div>

        {/* Lifecycle */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Button Lifecycle
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="rounded-lg bg-blue-500/10 px-3 py-2 text-blue-400">
              Idle
            </span>

            <span className="text-slate-600">→</span>

            <span className="rounded-lg bg-yellow-500/10 px-3 py-2 text-yellow-400">
              Loading
            </span>

            <span className="text-slate-600">→</span>

            <span className="rounded-lg bg-green-500/10 px-3 py-2 text-green-400">
              Success
            </span>

            <span className="text-slate-600">/</span>

            <span className="rounded-lg bg-red-500/10 px-3 py-2 text-red-400">
              Error
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}