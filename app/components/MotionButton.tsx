"use client";

import { useEffect, useState } from "react";

export type ButtonState =
  | "idle"
  | "loading"
  | "success"
  | "error";

type MotionButtonProps = {
  label?: string;
  externalTrigger?: ButtonState | null;
  onStateChange?: (state: ButtonState) => void;
};

export default function MotionButton({
  label = "Send",
  externalTrigger,
  onStateChange,
}: MotionButtonProps) {
  const [state, setState] =
    useState<ButtonState>("idle");

  function updateState(newState: ButtonState) {
    setState(newState);
    onStateChange?.(newState);
  }

  useEffect(() => {
    if (!externalTrigger) {
      return;
    }

    if (externalTrigger === "success") {
      updateState("loading");

      const loadingTimer = setTimeout(() => {
        updateState("success");

        const successTimer = setTimeout(() => {
          updateState("idle");
        }, 1200);

        return () => clearTimeout(successTimer);
      }, 1000);

      return () => clearTimeout(loadingTimer);
    }

    if (externalTrigger === "error") {
      updateState("loading");

      const errorTimer = setTimeout(() => {
        updateState("error");
      }, 1000);

      return () => clearTimeout(errorTimer);
    }
  }, [externalTrigger]);

  async function handleClick() {
    if (state === "loading") {
      return;
    }

    if (state === "error") {
      updateState("loading");

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      updateState("success");

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      updateState("idle");

      return;
    }

    updateState("loading");

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    updateState("success");

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    updateState("idle");
  }

  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isError = state === "error";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-live="polite"
      aria-busy={isLoading}
      className={`
        relative min-w-32 overflow-hidden rounded-xl px-6 py-3
        font-semibold text-white

        transition-all duration-300 ease-out
        motion-reduce:transition-none

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2
        focus-visible:ring-offset-slate-950

        active:scale-95
        motion-reduce:active:scale-100

        disabled:cursor-not-allowed
        disabled:opacity-70

        ${
          isSuccess
            ? "bg-green-600"
            : isError
              ? "bg-red-600 motion-safe:animate-[shake_0.35s_ease-in-out]"
              : "bg-blue-600 hover:scale-105 motion-reduce:hover:scale-100"
        }
      `}
    >
      {/* Normal / Success / Error Label */}
      <span
        className={`
          flex items-center justify-center gap-2

          transition-all duration-300 ease-out
          motion-reduce:transition-none

          ${
            isLoading
              ? "translate-y-1 opacity-0 motion-reduce:translate-y-0"
              : "translate-y-0 opacity-100"
          }
        `}
      >
        {isSuccess && "✓"}
        {isError && "⚠"}
        {!isSuccess && !isError && "↑"}

        {isSuccess
          ? "Sent"
          : isError
            ? "Retry"
            : label}
      </span>

      {/* Loading */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center gap-2">
          <span
            className="
              h-4 w-4 rounded-full
              border-2 border-white/30
              border-t-white
              animate-spin
              motion-reduce:animate-none
            "
            aria-hidden="true"
          />

          <span>Sending...</span>
        </span>
      )}
    </button>
  );
}