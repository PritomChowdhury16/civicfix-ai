export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-3 py-4 text-white sm:px-4 sm:py-6">
      <div className="mx-auto w-full max-w-3xl">

        <div className="mb-6">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-800" />

          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-900" />
        </div>

        <div className="flex min-h-[55vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">

            <div className="mx-auto h-14 w-14 animate-pulse rounded-2xl bg-slate-800" />

            <div className="mx-auto mt-5 h-6 w-48 animate-pulse rounded bg-slate-800" />

            <div className="mx-auto mt-3 h-4 w-full max-w-md animate-pulse rounded bg-slate-900" />

            <div className="mx-auto mt-2 h-4 w-4/5 max-w-md animate-pulse rounded bg-slate-900" />

            <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-slate-800" />

          </div>
        </div>

      </div>
    </main>
  );
}
