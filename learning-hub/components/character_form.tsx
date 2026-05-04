"use client";
import React, { useState } from 'react';

export default function UserCharacterizationForm() {
  const [formData, setFormData] = useState({
    learningGoal: '',
    experienceLevel: 'Beginner',
    interests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This will eventually call your FastAPI backend
    console.log("Analyzing user characterization:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Tell us about yourself</h2>
      
      <label className="block mb-2">What do you want to learn?</label>
      <input 
        type="text" 
        className="w-full p-2 border rounded mb-4"
        placeholder="e.g. Robotics, NLP, React..."
        onChange={(e) => setFormData({...formData, learningGoal: e.target.value})}
      />

      <label className="block mb-2">Your current level:</label>
      <select 
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Generate Learning Path
      </button>
    </form>
  );
}