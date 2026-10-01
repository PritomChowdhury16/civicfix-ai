import { tool } from "ai";
import { z } from "zod";

export const analyzeCivicReport = tool({
  description:
    "Analyze a civic problem report and determine its severity, priority, and recommended action.",

  inputSchema: z.object({
    category: z.enum([
      "waste",
      "pothole",
      "waterlogging",
      "streetlight",
      "other",
    ]),

    description: z
      .string()
      .min(5)
      .describe("A short description of the reported civic problem."),

    location: z
      .string()
      .min(2)
      .describe("The location where the problem was reported."),
  }),

  execute: async ({
    category,
    description,
    location,
  }) => {
    let severity: "Low" | "Medium" | "High";
    let priority: number;
    let recommendation: string;

    if (category === "waterlogging") {
      severity = "High";
      priority = 90;
      recommendation =
        "Immediate inspection is recommended because waterlogging can disrupt roads and public movement.";
    } else if (category === "pothole") {
      severity = "High";
      priority = 85;
      recommendation =
        "Road inspection and repair should be prioritized to reduce accident risk.";
    } else if (category === "streetlight") {
      severity = "Medium";
      priority = 65;
      recommendation =
        "Inspect the streetlight and restore lighting as soon as possible.";
    } else if (category === "waste") {
      severity = "Medium";
      priority = 60;
      recommendation =
        "Schedule waste collection and inspect the area for accumulated waste.";
    } else {
      severity = "Medium";
      priority = 50;
      recommendation =
        "Review the report and assign it to the appropriate civic service team.";
    }

    return {
      category,
      description,
      location,
      severity,
      priority,
      recommendation,
    };
  },
});