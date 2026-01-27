
import React, { useState } from 'react';
import { Category } from '../types';

export const CampaignForm: React.FC = () => {
  const [category, setCategory] = useState<Category>(Category.ESCORT);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6">
        <h3 className="text-xl font-bold mb-4">Create New Posting Campaign</h3>
        
        <div className="space-y-2">
          <label className="text-sm text-slate-400 font-medium">Target Category</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setCategory(Category.ESCORT)}
              className={`p-4 rounded-xl border text-sm font-bold transition-all ${category === Category.ESCORT ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-700 bg-slate-900 text-slate-500'}`}
            >
              Escorts Services
            </button>
            <button 
              onClick={() => setCategory(Category.CASUAL)}
              className={`p-4 rounded-xl border text-sm font-bold transition-all ${category === Category.CASUAL ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-700 bg-slate-900 text-slate-500'}`}
            >
              Casual Encounters
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400 font-medium">Titles (One per line for randomization)</label>
          <textarea 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none h-32"
            placeholder="Amazing massage service...&#10;Friendly company available...&#10;Best rates in town..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400 font-medium">Description (Supports [links])</label>
          <textarea 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none h-48"
            placeholder="Enter your ad description here. Use [http://mysite.com] for automatic linking."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">Ages (Comma separated)</label>
            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none" placeholder="21, 25, 30" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">Cities</label>
            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none" placeholder="Sydney, Melbourne, Perth" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-bold mb-4">Media Assets</h3>
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-indigo-500 transition-all cursor-pointer">
            <span className="text-4xl block mb-2">📸</span>
            <p className="text-slate-400 text-sm">Drag & drop images or click to browse</p>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                <img src={`https://picsum.photos/200/200?random=${i}`} alt="Uploaded" className="w-full h-full object-cover opacity-50" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-2xl shadow-xl shadow-indigo-500/20">
          <h3 className="text-lg font-bold text-white mb-2">Ready to Launch?</h3>
          <p className="text-indigo-100 text-sm mb-6">This campaign will be distributed across all online PC nodes. IP rotation will be handled automatically.</p>
          <button className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
            DEPLOY TO WORKERS
          </button>
        </div>
      </div>
    </div>
  );
};
