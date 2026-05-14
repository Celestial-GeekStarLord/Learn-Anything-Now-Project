"use client";
import { useState } from 'react';
import CharacterForm from '@/components/character_form';
import RecommendationList from '@/components/recommendation_list';

export default function Home() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Skill-Sync NLP
          </h1>
          <p className="text-slate-400 mt-2">All-in-one learning personalization engine</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {}
          <section>
            <CharacterForm onResults={(data) => setAnalysisData(data)} />
          </section>

          {/* Section for displaying keywords and links */}
          <section>
            {analysisData ? (
              <RecommendationList data={analysisData} />
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl text-slate-500 p-10 text-center">
                Enter your details to generate your <br/> personalized learning path.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}