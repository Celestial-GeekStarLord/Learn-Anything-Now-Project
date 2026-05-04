export default function RecommendationList({ data }: { data: any }) {
  if (!data || !data.recommendations) return null;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-800 rounded-lg border border-blue-500/30">
        <h3 className="text-blue-400 font-bold text-sm uppercase">Persona Identified</h3>
        <p className="text-slate-300">Level: <span className="text-white font-mono">{data.suggested_level}</span></p>
      </div>

      <div className="grid gap-4">
        {data.recommendations.map((res: any, index: number) => (
          <a 
            key={index} 
            href={res.url} 
            target="_blank" 
            className="block p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-blue-500 transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-blue-500 mb-1 block">#{res.tag}</span>
                <h4 className="text-white font-medium group-hover:text-blue-400">{res.title}</h4>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{res.type}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}