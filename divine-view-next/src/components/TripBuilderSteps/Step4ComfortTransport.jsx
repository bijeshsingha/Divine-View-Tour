'use client';
import React from 'react';
import { Bed, CarFront, Bus, Car, Minus, Plus, Check } from 'lucide-react';
import Image from 'next/image';

export default function Step4ComfortTransport({ data, updateData, config, updateCarCount }) {
  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="w-12 h-12 bg-primary/10 text-primary-dark rounded-2xl flex items-center justify-center mb-4">
          <Bed className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Comfort & Transport</h2>
        <p className="text-background0 text-base">Choose your ride and stay.</p>
      </div>
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
        <div className="space-y-6">

          {/* Accommodation section */}
          {!(data.region === 'guwahati' && data.tripDays === 1) && (
            <div>
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Bed className="w-5 h-5 text-primary-dark" /> Accommodation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {config.stays.map((stay, idx) => {
                  const isSelected = data.stayType === stay.id;
                  const images = ['/images/placeholder.jpg', '/images/Meghalaya/6809d82be1f015b4b224ff5abe40c006.jpg', '/images/homescreen.jpg'];
                  return (
                    <button
                      key={stay.id}
                      onClick={() => updateData('stayType', stay.id)}
                      className={`relative text-left rounded-2xl overflow-hidden border-2 transition-all group flex flex-col ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-lg scale-[1.02]' : 'border-stone-200 bg-white hover:border-primary/50 shadow-sm hover:shadow-md'}`}
                    >
                      <div className="relative h-32 w-full bg-foreground overflow-hidden">
                        <Image src={images[idx % images.length]} alt={stay.label} fill className={`object-cover transition-transform duration-700 ${isSelected ? 'scale-105 opacity-90' : 'opacity-70 group-hover:scale-105 group-hover:opacity-100'}`} />
                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-white text-primary p-1 rounded-full shadow-md z-10">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <h3 className="absolute bottom-3 left-4 font-serif text-white font-bold text-lg z-10">{stay.label}</h3>
                      </div>
                      <div className="p-4 bg-white flex-1">
                        <p className="text-xs text-stone-600 leading-relaxed">{stay.desc}</p>
                      </div>
                    </button>
                  );
                })}
                <button
                    onClick={() => updateData('stayType', 'none')}
                    className={`relative text-left rounded-2xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center p-6 ${data.stayType === 'none' ? 'border-primary ring-2 ring-primary/20 shadow-lg scale-[1.02]' : 'border-stone-200 bg-stone-50 hover:border-primary/50 shadow-sm hover:shadow-md'}`}
                  >
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${data.stayType === 'none' ? 'bg-primary text-white' : 'bg-stone-200 text-stone-500'}`}>
                        {data.stayType === 'none' ? <Check className="w-5 h-5" /> : <Bed className="w-5 h-5" />}
                      </div>
                      <h3 className={`font-serif font-bold text-lg ${data.stayType === 'none' ? 'text-primary' : 'text-stone-700'}`}>No Stay Needed</h3>
                      <p className="text-xs text-stone-500">I already have my stay sorted.</p>
                    </div>
                </button>
              </div>
            </div>
          )}

          {/* Transport section */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CarFront className="w-5 h-5 text-primary-dark" /> Transport Model
            </h3>

            <div className="space-y-4">
              {/* Shuttle Option */}
              {data.region === 'guwahati' && data.tripDays === 1 && (
                <button
                  onClick={() => updateData('transportType', 'shuttle')}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${data.transportType === 'shuttle' ? 'border-primary bg-primary/5 shadow-md' : 'border-stone-200 bg-white hover:border-primary/30'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-xl ${data.transportType === 'shuttle' ? 'bg-primary text-white' : 'bg-stone-50 text-background0'}`}>
                      <Bus className="w-5 h-5" />
                    </div>
                    <h3 className={`font-bold text-lg ${data.transportType === 'shuttle' ? 'text-foreground' : 'text-stone-700'}`}>Divine View Daily Shuttle</h3>
                  </div>
                  <p className="text-sm text-stone-600 bg-white/50 p-3 rounded-lg border border-stone-100 italic">
                    "Departs daily at 8:00 AM. Fixed route covering top highlights. No custom stops. Priced per seat."
                  </p>
                </button>
              )}

              {/* Private Fleet Option */}
              <div className={`p-4 rounded-2xl border-2 transition-all ${data.transportType === 'private' ? 'border-slate-800 bg-background shadow-md' : 'border-stone-200 bg-white'}`}>
                <button
                  onClick={() => updateData('transportType', 'private')}
                  className="w-full text-left flex items-center gap-3 mb-4"
                >
                  <div className={`p-2 rounded-xl ${data.transportType === 'private' ? 'bg-foreground text-white' : 'bg-stone-50 text-background0'}`}>
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${data.transportType === 'private' ? 'text-foreground' : 'text-stone-700'}`}>Private Fleet</h3>
                </button>

                {/* Private Car Selector */}
                {data.transportType === 'private' && (
                  <div className="space-y-3 mt-2 pt-4 border-t border-stone-200">
                    {(() => {
                       const totalCap = Object.entries(data.privateCars || {}).reduce((acc, [cId, cCount]) => {
                         const c = config.cars.find(x => x.id === cId);
                         return acc + (c ? c.maxPax * cCount : 0);
                       }, 0);
                       const isCapacityMet = totalCap >= data.travelerCount;

                       return (
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {config.cars.filter(c => c.id !== 'pool').map((car, idx) => {
                             const count = (data.privateCars || {})[car.id] || 0;
                             const carImages = ['/images/placeholder.jpg', '/images/placeholder.jpg', '/images/placeholder.jpg'];
                             return (
                               <div 
                                 key={car.id} 
                                 onClick={() => count === 0 && !isCapacityMet && updateCarCount(car.id, 1)}
                                 className={`relative overflow-hidden rounded-2xl border-2 transition-all flex flex-col ${count === 0 && !isCapacityMet ? 'cursor-pointer hover:border-primary/50 shadow-sm hover:shadow-md' : ''} ${count > 0 ? 'border-primary ring-2 ring-primary/20 bg-white shadow-lg scale-[1.02]' : 'border-stone-200 bg-white'}`}
                               >
                                 <div className="relative h-24 w-full bg-foreground overflow-hidden">
                                    <Image src={carImages[idx % carImages.length]} alt={car.label} fill className={`object-cover transition-transform duration-700 ${count > 0 ? 'scale-105 opacity-90' : 'opacity-70 group-hover:scale-105 group-hover:opacity-100'}`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                 </div>
                                 
                                 <div className="p-4 flex items-center justify-between flex-1 bg-white">
                                   <div>
                                     <h4 className={`font-serif font-bold text-base ${count > 0 ? 'text-primary' : 'text-stone-700'}`}>{car.label}</h4>
                                     <p className="text-xs text-stone-500 mt-0.5">Capacity: {car.maxPax} pax</p>
                                   </div>
                                   <div className="flex items-center gap-3">
                                     <button type="button" onClick={(e) => { e.stopPropagation(); updateCarCount(car.id, -1); }} disabled={count === 0} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 disabled:opacity-30 hover:bg-stone-200 transition-all shadow-sm">
                                       <Minus className="w-3 h-3" />
                                     </button>
                                     <span className="font-bold text-foreground w-4 text-center">{count}</span>
                                     <button type="button" onClick={(e) => { e.stopPropagation(); updateCarCount(car.id, 1); }} disabled={isCapacityMet} className="w-8 h-8 rounded-full bg-primary text-white disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed hover:bg-primary-dark transition-all shadow-sm">
                                       <Plus className="w-3 h-3" />
                                     </button>
                                   </div>
                                 </div>
                               </div>
                             );
                           })}
                         </div>
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
