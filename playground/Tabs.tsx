"use client"

import { useRef, useState } from "react"

const tabs = [
  {
    id: "overview",
    label: "Overview",
    content:
      "CivicFix AI helps citizens report local environmental and civic problems.",
  },
  {
    id: "reports",
    label: "Reports",
    content:
      "Citizens can view reported problems and track their current status.",
  },
  {
    id: "statistics",
    label: "Statistics",
    content:
      "Statistics can show the number of reports, priorities, and resolved problems.",
  },
]

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function moveToTab(index: number) {
    const tab = tabs[index]

    setActiveTab(tab.id)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) {
    let nextIndex: number | null = null

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1
    }

    if (nextIndex !== null) {
      event.preventDefault()
      moveToTab(nextIndex)
    }
  }

  const activeTabData = tabs.find(
    (tab) => tab.id === activeTab
  )

  return (
    <section className="mt-10 max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        CivicFix Information
      </h2>

      <div
        role="tablist"
        aria-label="CivicFix information"
        className="mt-4 flex border-b border-slate-300"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={`${tab.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
              className={`px-5 py-3 font-semibold focus:outline-none focus:ring-4 focus:ring-teal-300 ${
                isActive
                  ? "border-b-2 border-teal-700 text-teal-700"
                  : "text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTabData && (
        <div
          role="tabpanel"
          id={`${activeTabData.id}-panel`}
          aria-labelledby={`${activeTabData.id}-tab`}
          tabIndex={0}
          className="rounded-b-xl border border-t-0 border-slate-300 bg-white p-6"
        >
          <h3 className="text-xl font-bold text-slate-900">
            {activeTabData.label}
          </h3>

          <p className="mt-2 text-slate-600">
            {activeTabData.content}
          </p>
        </div>
      )}
    </section>
  )
}