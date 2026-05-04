"use client";
import { useState } from 'react';
import { analyzeUser } from '@/lib/ap_clienti';

export default function CharacterForm({ onResults }: { onResults: (data: any) => void }) {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeUser(bio); // Sending raw text to Python
      onResults(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-900 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold text-white">Describe your goals</h2>
      <textarea
        className="w-full h-40 p-4 bg-slate-800 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="e.g., I am a computer engineering student interested in Robotics. I want to learn about ROS2 and object detection using YOLO..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all"
      >
        {loading ? "Analyzing..." : "Generate Learning Path"}
      </button>
    </div>
  );
}