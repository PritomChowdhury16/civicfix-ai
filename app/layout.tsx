import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CivicFix AI",
  description: "Report and manage local environmental and civic problems.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href="/"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#0f766e",
                textDecoration: "none",
              }}
            >
              CivicFix AI
            </a>

            <div
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "center",
              }}
            >
              <a href="/" style={{ textDecoration: "none", color: "#334155" }}>
                Home
              </a>

              <a
                href="/report"
                style={{ textDecoration: "none", color: "#334155" }}
              >
                Report Problem
              </a>

              <a
                href="/reports"
                style={{ textDecoration: "none", color: "#334155" }}
              >
                Reports
              </a>

              <a
                href="/dashboard"
                style={{ textDecoration: "none", color: "#334155" }}
              >
                Dashboard
              </a>

              <a
                href="/about"
                style={{ textDecoration: "none", color: "#334155" }}
              >
                About
              </a>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}