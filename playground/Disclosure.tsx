"use client"

import { useState } from "react"

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="mt-10 max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Disclosure Example
      </h2>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white">
        {/* Disclosure Button */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="civicfix-description"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          <span>What is CivicFix AI?</span>

          <span aria-hidden="true">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>

        {/* Disclosure Content */}
        {isOpen && (
          <div
            id="civicfix-description"
            className="border-t border-slate-300 px-5 py-4 text-slate-600"
          >
            <p>
              CivicFix AI is a platform that helps citizens
              report and manage local environmental and civic
              problems.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}