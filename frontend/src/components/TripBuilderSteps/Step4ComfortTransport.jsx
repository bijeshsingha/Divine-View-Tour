import React from 'react';
import { Bed, CarFront, Bus, Car, Minus, Plus, Check } from 'lucide-react';

export default function Step4ComfortTransport({ data, updateData, config, updateCarCount }) {
  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="w-12 h-12 bg-brand/10 text-brand-dark rounded-2xl flex items-center justify-center mb-4">
          <Bed className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Comfort & Transport</h2>
        <p className="text-slate-500 text-base">Choose your ride and stay.</p>
      </div>
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
        <div className="space-y-6">

          {/* Accommodation section */}
          {!(data.region === 'guwahati' && data.tripDays === 1) && (
            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Bed className="w-5 h-5 text-brand-dark" /> Accommodation
              </h3>
              <div className="space-y-3">
                {config.stays.map(stay => (
                  <button
                    key={stay.id}
                    onClick={() => updateData('stayType', stay.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center ${data.stayType === stay.id ? 'border-brand bg-brand/5 shadow-md' : 'border-slate-200 bg-white hover:border-brand/30'}`}
                  >
                    <div className="flex-1">
                      <h3 className={`font-bold text-base ${data.stayType === stay.id ? 'text-slate-900' : 'text-slate-700'}`}>{stay.label}</h3>
                      <p className="text-xs text-slate-500 mt-1">{stay.desc}</p>
                    </div>
                  </button>
                ))}
                <button
                    onClick={() => updateData('stayType', 'none')}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center ${data.stayType === 'none' ? 'border-brand bg-brand/5 shadow-md' : 'border-slate-200 bg-white hover:border-brand/30'}`}
                  >
                    <div className="flex-1">
                      <h3 className={`font-bold text-base ${data.stayType === 'none' ? 'text-slate-900' : 'text-slate-700'}`}>No Accommodation Needed</h3>
                      <p className="text-xs text-slate-500 mt-1">I already have my stay sorted.</p>
                    </div>
                </button>
              </div>
            </div>
          )}

          {/* Transport section */}
          <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <CarFront className="w-5 h-5 text-brand-dark" /> Transport Model
            </h3>

            <div className="space-y-4">
              {/* Shuttle Option */}
              {data.region === 'guwahati' && data.tripDays === 1 && (
                <button
                  onClick={() => updateData('transportType', 'shuttle')}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${data.transportType === 'shuttle' ? 'border-brand bg-brand/5 shadow-md' : 'border-slate-200 bg-white hover:border-brand/30'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-xl ${data.transportType === 'shuttle' ? 'bg-brand text-black' : 'bg-slate-100 text-slate-500'}`}>
                      <Bus className="w-5 h-5" />
                    </div>
                    <h3 className={`font-bold text-lg ${data.transportType === 'shuttle' ? 'text-slate-900' : 'text-slate-700'}`}>Divine View Daily Shuttle</h3>
                  </div>
                  <p className="text-sm text-slate-600 bg-white/50 p-3 rounded-lg border border-slate-100 italic">
                    "Departs daily at 8:00 AM. Fixed route covering top highlights. No custom stops. Priced per seat."
                  </p>
                </button>
              )}

              {/* Private Fleet Option */}
              <div className={`p-4 rounded-2xl border-2 transition-all ${data.transportType === 'private' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 bg-white'}`}>
                <button
                  onClick={() => updateData('transportType', 'private')}
                  className="w-full text-left flex items-center gap-3 mb-4"
                >
                  <div className={`p-2 rounded-xl ${data.transportType === 'private' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${data.transportType === 'private' ? 'text-slate-900' : 'text-slate-700'}`}>Private Fleet</h3>
                </button>

                {/* Private Car Selector */}
                {data.transportType === 'private' && (
                  <div className="space-y-3 mt-2 pt-4 border-t border-slate-200">
                    {(() => {
                       const totalCap = Object.entries(data.privateCars || {}).reduce((acc, [cId, cCount]) => {
                         const c = config.cars.find(x => x.id === cId);
                         return acc + (c ? c.maxPax * cCount : 0);
                       }, 0);
                       const isCapacityMet = totalCap >= data.travelerCount;

                       return (
                         <>
                           {config.cars.filter(c => c.id !== 'pool').map(car => {
                             const count = (data.privateCars || {})[car.id] || 0;
                             return (
                               <div 
                                 key={car.id} 
                                 onClick={() => count === 0 && !isCapacityMet && updateCarCount(car.id, 1)}
                                 className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between ${count === 0 && !isCapacityMet ? 'cursor-pointer hover:border-brand/50' : ''} ${count > 0 ? 'border-brand bg-white shadow-sm' : 'border-slate-200 bg-white'}`}
                               >
                                 <div>
                                   <h4 className={`font-bold text-sm ${count > 0 ? 'text-slate-900' : 'text-slate-700'}`}>{car.label}</h4>
                                   <p className="text-xs text-slate-500 mt-0.5">Capacity: {car.maxPax} pax</p>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <button type="button" onClick={(e) => { e.stopPropagation(); updateCarCount(car.id, -1); }} disabled={count === 0} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 disabled:opacity-50 hover:bg-slate-200 transition-all">
                                     <Minus className="w-3 h-3" />
                                   </button>
                                   <span className="font-bold text-slate-900 w-4 text-center">{count}</span>
                                   <button type="button" onClick={(e) => { e.stopPropagation(); updateCarCount(car.id, 1); }} disabled={isCapacityMet} className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand-dark disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed hover:bg-brand/40 transition-all">
                                     <Plus className="w-3 h-3" />
                                   </button>
                                 </div>
                               </div>
                             );
                           })}
                           {totalCap < data.travelerCount && (
                             <p className="text-red-500 text-sm mt-3 font-semibold bg-red-50 p-3 rounded-xl">⚠️ Need more capacity. Fits {totalCap} out of {data.travelerCount} travelers.</p>
                           )}
                         </>
                       );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
