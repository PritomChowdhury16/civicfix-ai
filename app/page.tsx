export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
              CivicFix AI
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Report local problems.
              <br />
              Make your community better.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              CivicFix AI helps people report environmental and civic problems
              such as waste, potholes, waterlogging, and broken streetlights.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/report"
                className="rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
              >
                Report a Problem
              </a>

              <a
                href="/reports"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Reports
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              How CivicFix AI works
            </h2>

            <p className="mt-2 text-slate-600">
              A simple process for reporting and managing local problems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-4 text-2xl">📸</div>

              <h3 className="text-lg font-semibold text-slate-900">
                1. Report
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Submit a photo, description, and location of a local problem.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-4 text-2xl">🤖</div>

              <h3 className="text-lg font-semibold text-slate-900">
                2. AI Analysis
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                AI can help identify the problem category and estimate its
                severity and priority.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-4 text-2xl">📊</div>

              <h3 className="text-lg font-semibold text-slate-900">
                3. Track
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Monitor reported problems and track their progress toward
                resolution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}