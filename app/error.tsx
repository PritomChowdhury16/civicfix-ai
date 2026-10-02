"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-slate-900 p-6 text-center sm:p-8">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
          ⚠️
        </div>

        <h1 className="mt-5 text-xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          We couldn't load this page correctly.
          You can try loading it again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Try again
        </button>

      </div>
    </main>
  );
}