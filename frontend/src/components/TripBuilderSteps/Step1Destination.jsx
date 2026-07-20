import React from 'react';
import { Map } from 'lucide-react';

export default function Step1Destination({ data, updateData, config }) {
  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="w-12 h-12 bg-brand/10 text-brand-dark rounded-2xl flex items-center justify-center mb-4">
          <Map className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Destination & Vibe</h2>
        <p className="text-slate-500 text-base">Where are we heading?</p>
      </div>
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
        <div className="space-y-4">
          {Object.entries(config.regions).map(([regionId, region]) => (
            <button
              key={regionId}
              onClick={() => {
                updateData('region', regionId);
                updateData('spots', []);
                updateData('restaurants', []);
                if (data.tripDays < region.minDays) updateData('tripDays', region.minDays);
                if (data.tripDays > region.maxDays) updateData('tripDays', region.maxDays);
              }}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-4 items-center ${data.region === regionId ? 'border-brand bg-brand/5 shadow-md' : 'border-slate-200 bg-white hover:border-brand/30'}`}
            >
              <div className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 ${data.region === regionId ? 'ring-2 ring-brand ring-offset-2' : ''}`}>
                <img 
                  src={regionId === 'meghalaya' ? '/assets/dawki_river.webp' : '/assets/guwahati_hero.webp'} 
                  alt={region.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${data.region === regionId ? 'text-slate-900' : 'text-slate-700'}`}>{region.title}</h3>
                <p className="text-sm text-slate-500">{region.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
