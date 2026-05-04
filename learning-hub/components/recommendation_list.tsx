export default function RecommendationList({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="mt-8 p-6 bg-slate-800 rounded-lg">
      <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm">Analysis Results</h3>
      <div className="flex flex-wrap gap-2 my-4">
        {data.detected_keywords.map((kw: string) => (
          <span key={kw} className="px-3 py-1 bg-blue-900/50 border border-blue-700 text-blue-200 rounded-full text-sm">
            #{kw}
          </span>
        ))}
      </div>
      <p className="text-slate-300">Target Level: <strong>{data.suggested_level}</strong></p>
    </div>
  );
}