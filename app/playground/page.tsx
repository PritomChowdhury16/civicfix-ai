import Modal from "@/playground/Modal"
import Tabs from "@/playground/Tabs"
import Disclosure from "@/playground/Disclosure"

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            CivicFix AI
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Accessibility Playground
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Custom accessible interactive components built
            with React and TypeScript.
          </p>
        </header>

        {/* Modal Section */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            1. Modal Dialog
          </h2>

          <p className="mt-2 text-slate-600">
            A keyboard-accessible modal with focus management
            and Escape-to-close support.
          </p>

          <Modal />
        </section>

        {/* Tabs Section */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            2. Tabs
          </h2>

          <p className="mt-2 text-slate-600">
            A keyboard-accessible tab interface using arrow
            keys, Home, and End.
          </p>

          <Tabs />
        </section>

        {/* Disclosure Section */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            3. Disclosure
          </h2>

          <p className="mt-2 text-slate-600">
            An expandable section that can be controlled with
            both mouse and keyboard.
          </p>

          <Disclosure />
        </section>
      </div>
    </main>
  )
}