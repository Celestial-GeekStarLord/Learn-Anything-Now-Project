"use client";
import { useState } from 'react';
import { analyzeUser } from '@/lib/ap_clienti';

export default function CharacterForm({ onResults }: { onResults: (data: any) => void }) {
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Function for Text Analysis
  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeUser(bio);
      onResults(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Function for PDF Analysis
  const handleFileUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze-file', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onResults(data);
    } catch (error) {
      console.error("File scan failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-900 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold text-white">Describe your goals</h2>
      
      {/* Text Area Input */}
      <textarea
        className="w-full h-40 p-4 bg-slate-800 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="e.g., I am an engineering student interested in ..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      
      <button
        onClick={handleAnalyze}
        disabled={loading || !bio}
        className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Generate Learning Path"}
      </button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-700"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
        <div className="flex-grow border-t border-slate-700"></div>
      </div>

      {/* PDF Upload Section */}
      <div className="p-4 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/50">
        <p className="text-xs text-slate-400 mb-2">Upload Resume/PDF for automatic scanning</p>
        <input 
          type="file" 
          accept=".pdf" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"
        />
        {file && !loading && (
          <button 
            onClick={handleFileUpload} 
            className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            Scan {file.name}
          </button>
        )}
      </div>
    </div>
  );
}