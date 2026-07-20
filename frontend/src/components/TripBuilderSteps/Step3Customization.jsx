import React from 'react';
import { Navigation, Utensils, Check } from 'lucide-react';

export default function Step3Customization({ data, toggleArrayItem, currentRegion }) {
  const availableSpots = currentRegion?.spots || [];
  const restaurants = currentRegion?.restaurants || [];

  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="w-12 h-12 bg-brand/10 text-brand-dark rounded-2xl flex items-center justify-center mb-4">
          <Navigation className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Direct Customization</h2>
        <p className="text-slate-500 text-base">Select must-see spots and local food to try.</p>
      </div>
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-brand-dark" /> Spots
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                Max {data.tripDays + 1} spots for {data.tripDays} days
              </span>
            </div>
            <div className="space-y-2">
              {availableSpots.map(spot => {
                const isSelected = data.spots.includes(spot);
                const isAtLimit = !isSelected && data.spots.length >= (data.tripDays + 1);
                return (
                  <button
                    key={spot}
                    disabled={isAtLimit}
                    onClick={() => toggleArrayItem('spots', spot, data.tripDays + 1)}
                    className={`w-full text-left rounded-xl border-2 transition-all flex items-center p-3 gap-3 outline-none 
                      ${isSelected ? 'border-brand bg-brand/10 shadow-sm' :
                        isAtLimit ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed' :
                          'border-slate-200 bg-white hover:border-brand/30'}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-brand text-black' : 'border-2 border-slate-200 bg-slate-50'}`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <span className={`font-semibold text-sm md:text-base leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{spot}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-brand-dark" /> Trending Food
            </h3>
            <p className="text-xs text-slate-500 italic mb-3">
              * Note: Food and restaurant bills are expensed by the customer and are not included in the package.
            </p>
            <div className="space-y-2">
              {restaurants.map(rest => {
                const isSelected = data.restaurants.includes(rest);
                return (
                  <button
                    key={rest}
                    onClick={() => toggleArrayItem('restaurants', rest)}
                    className={`w-full text-left rounded-xl border-2 transition-all flex items-center p-3 gap-3 outline-none ${isSelected ? 'border-brand bg-brand/10 shadow-sm' : 'border-slate-200 bg-white hover:border-brand/30'}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-brand text-black' : 'border-2 border-slate-200 bg-slate-50'}`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <span className={`font-semibold text-sm md:text-base leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{rest}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
