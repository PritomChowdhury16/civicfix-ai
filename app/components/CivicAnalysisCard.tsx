type CivicAnalysisResult = {
  category: string;
  description: string;
  location: string;
  severity: "Low" | "Medium" | "High";
  priority: number;
  recommendation: string;
};

type CivicAnalysisCardProps = {
  result: CivicAnalysisResult;
};

export default function CivicAnalysisCard({
  result,
}: CivicAnalysisCardProps) {
  return (
    <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
      <div className="mb-4">
        <div className="font-bold text-green-300">
          🟢 Civic Report Analysis
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Analysis completed successfully.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">

        {/* Severity */}
        <div className="rounded-lg bg-slate-900/70 p-3">
          <div className="text-xs text-slate-400">
            Severity
          </div>

          <div className="mt-1 font-bold text-red-400">
            {result.severity}
          </div>
        </div>

        {/* Priority */}
        <div className="rounded-lg bg-slate-900/70 p-3">
          <div className="text-xs text-slate-400">
            Priority
          </div>

          <div className="mt-1 text-xl font-bold text-white">
            {result.priority}
            <span className="text-sm text-slate-500">
              /100
            </span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-3 rounded-lg bg-slate-900/70 p-3">
        <div className="text-xs text-slate-400">
          Location
        </div>

        <div className="mt-1 text-sm font-medium">
          📍 {result.location}
        </div>
      </div>

      {/* Category */}
      <div className="mt-3 rounded-lg bg-slate-900/70 p-3">
        <div className="text-xs text-slate-400">
          Category
        </div>

        <div className="mt-1 text-sm font-medium capitalize">
          {result.category}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-3 rounded-lg bg-slate-900/70 p-3">
        <div className="text-xs text-slate-400">
          Recommended Action
        </div>

        <p className="mt-1 text-sm leading-6 text-slate-200">
          {result.recommendation}
        </p>
      </div>
    </div>
  );
}