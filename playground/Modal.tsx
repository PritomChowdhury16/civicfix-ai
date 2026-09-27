"use client"

import { useEffect, useRef, useState } from "react"

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) {
      openButtonRef.current?.focus()
      return
    }

    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsOpen(false)
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const firstElement = inputRef.current
      const lastElement = closeButtonRef.current

      if (!firstElement || !lastElement) {
        return
      }

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="mt-6">
      {/* Open Modal Button */}
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white focus:outline-none focus:ring-4 focus:ring-teal-300"
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-problem-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            {/* Modal Title */}
            <h2
              id="report-problem-title"
              className="text-2xl font-bold text-slate-900"
            >
              Report Problem
            </h2>

            {/* Modal Description */}
            <p className="mt-2 text-slate-600">
              Describe the environmental or civic problem you want to report.
            </p>

            {/* Problem Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Describe the problem"
              className="mt-4 block w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-300"
            />

            {/* Submit Button */}
            <button
              type="button"
              className="mt-4 rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              Submit
            </button>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-3 rounded-lg bg-slate-700 px-4 py-2 font-semibold text-white focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}