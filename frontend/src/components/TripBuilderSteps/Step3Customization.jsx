import React from 'react';
import { Navigation, Utensils, Check, Info } from 'lucide-react';
import { EXPLORE_DATA } from '../../exploreData';

export default function Step3Customization({ data, toggleArrayItem, currentRegion, onOpenExplore }) {
  const availableSpots = currentRegion?.spots || [];
  const restaurants = currentRegion?.restaurants || [];

  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="w-12 h-12 bg-primary/10 text-primary-dark rounded-2xl flex items-center justify-center mb-4">
          <Navigation className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Direct Customization</h2>
        <p className="text-background0 text-base">Select your must-see spots. (Optional - skip this and we'll curate the best route for you!)</p>
      </div>
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary-dark" /> Spots
              </h3>
              <span className="text-xs font-bold text-background0 bg-stone-50 px-2 py-1 rounded-md">
                Max {data.tripDays + 1} spots for {data.tripDays} days
              </span>
            </div>
            <div className="space-y-2">
              {availableSpots.map(spot => {
                const isSelected = data.spots.includes(spot);
                const isAtLimit = !isSelected && data.spots.length >= (data.tripDays + 1);
                
                // Find matching rich info
                const placeInfo = EXPLORE_DATA.find(p => p.title.toLowerCase().includes(spot.toLowerCase()) || spot.toLowerCase().includes(p.title.toLowerCase()));

                return (
                  <div key={spot} className="flex items-center gap-2">
                    <button
                      disabled={isAtLimit}
                      onClick={() => toggleArrayItem('spots', spot, data.tripDays + 1)}
                      className={`flex-1 text-left rounded-xl border-2 transition-all flex items-center p-3 gap-3 outline-none 
                        ${isSelected ? 'border-primary bg-primary/10 shadow-sm' :
                          isAtLimit ? 'border-stone-100 bg-background opacity-50 cursor-not-allowed' :
                            'border-stone-200 bg-white hover:border-primary/30'}`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary text-white' : 'border-2 border-stone-200 bg-background'}`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <span className={`font-semibold text-sm md:text-base leading-tight ${isSelected ? 'text-foreground' : 'text-stone-600'}`}>{spot}</span>
                    </button>
                    {placeInfo && (
                      <button 
                        onClick={() => onOpenExplore(placeInfo)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl border border-stone-200 bg-white text-background0 hover:text-primary-dark hover:border-primary-dark transition-colors shrink-0"
                        title="View Details"
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
