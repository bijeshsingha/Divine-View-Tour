import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Plus, Minus, Calendar, Users, Map, Navigation, Bed, Utensils, CarFront, Car, Bus, Share2, Mountain, Building2, Check, RefreshCw } from 'lucide-react';
import staticConfig from '../data.json';



export default function TripBuilder({ initialData, onComplete }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const config = staticConfig;
  const [loading, setLoading] = useState(false);

  // Ensure shuttle is only available for 1-day guwahati tours
  useEffect(() => {
    if (data.transportType === 'shuttle' && !(data.region === 'guwahati' && data.tripDays === 1)) {
      updateData('transportType', 'private');
    }
  }, [data.region, data.tripDays, data.transportType]);

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateCarCount = (carId, delta) => {
    setData(prev => {
      const currentCars = prev.privateCars || {};
      const currentCount = currentCars[carId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      
      const newCars = { ...currentCars, [carId]: newCount };
      
      // Clean up 0 counts
      if (newCount === 0) {
        delete newCars[carId];
      }
      
      return { ...prev, privateCars: newCars };
    });
  };

  const toggleArrayItem = (field, item, limit = null) => {
    setData(prev => {
      const arr = prev[field];
      if (arr.includes(item)) {
        return { ...prev, [field]: arr.filter(i => i !== item) };
      } else {
        if (limit && arr.length >= limit) return prev;
        return { ...prev, [field]: [...arr, item] };
      }
    });
  };

  const submitToWhatsApp = () => {
    const phone = "+917002449198";
    const regionName = config.regions[data.region]?.title || data.region;

    let message = `*New Booking Request: ${regionName}*\n\n`;
    message += `*Guest Name:* ${data.name || 'Not provided'}\n`;
    if (data.isDivineGuest) {
      message += `*Pickup Location:* Divine View Hotel (Room: ${data.roomNumber || 'TBD'})\n`;
    } else {
      message += `*Pickup Location(s):* ${data.roomNumber || 'Not provided'}\n`;
    }
    message += `*Dates:* ${data.checkInDate} for ${data.tripDays} Days\n`;
    message += `*Headcount:* ${data.travelerCount} Travelers\n`;
    
    let transportDetail = '';
    if (data.transportType === 'shuttle') {
      transportDetail = 'Daily Shuttle';
    } else {
      const privateCars = data.privateCars || {};
      const carStrs = Object.entries(privateCars)
        .filter(([_, count]) => count > 0)
        .map(([carId, count]) => {
          const car = config.cars.find(c => c.id === carId);
          return `${count}x ${car ? car.label : carId}`;
        });
      transportDetail = `Private Fleet (${carStrs.join(', ') || 'None'})`;
    }
    message += `*Transport:* ${transportDetail}\n`;
    
    message += `*Spots Selected:* ${data.spots.length > 0 ? data.spots.join(', ') : 'None'}\n`;
    message += `*Restaurants:* ${data.restaurants.length > 0 ? data.restaurants.join(', ') : 'None'}\n`;

    if (data.customRequest) {
      message += `\n*Custom Requests:*\n${data.customRequest}\n`;
    }

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank');
    onComplete(data);
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      submitToWhatsApp();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateLiveCost = () => {
    if (!config || !data.region || !config.regions[data.region]) return 0;
    const regionData = config.regions[data.region];
    const regionBase = regionData.basePrice;

    let carCost = 0;
    if (data.transportType === 'shuttle') {
      // Fixed budget price for shuttle
      carCost = 800 * data.travelerCount * data.tripDays;
    } else {
      const privateCars = data.privateCars || {};
      carCost = Object.entries(privateCars).reduce((total, [carId, count]) => {
        const car = config.cars.find(c => c.id === carId);
        if (!car) return total;
        return total + (1500 * (car.multiplier || 1) * count * data.tripDays);
      }, 0);
    }

    const selectedStay = config.stays.find(s => s.id === data.stayType);

    const stayCost = (data.stayType === 'none' || (data.region === 'guwahati' && data.tripDays === 1))
      ? 0
      : (selectedStay ? selectedStay.rate : config.stays[1].rate) * data.travelerCount * (data.tripDays - 1);

    const totalCost = Math.round(carCost + stayCost + (regionBase * data.travelerCount * data.tripDays));
    return Math.round(totalCost / data.travelerCount); // Per person cost
  };

  if (loading || !config) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 h-full">
        <RefreshCw className="w-12 h-12 text-brand animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading Options...</h2>
        <p className="text-slate-500 text-center">Fetching the latest trips from the server.</p>
      </div>
    );
  }

  const currentRegion = config.regions[data.region] || config.regions['meghalaya'];

  const renderStep = () => {
    const renderStepContent = (title, subtitle, Icon, content) => (
      <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="mb-6 shrink-0">
          <div className="w-12 h-12 bg-brand/10 text-brand-dark rounded-2xl flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 text-base">{subtitle}</p>
        </div>
        <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
          {content}
        </div>
      </div>
    );

    switch (step) {
      case 1:
        return renderStepContent(
          "Destination & Vibe",
          "Where are we heading?",
          Map,
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
        );
      case 2:
        return renderStepContent(
          "Core Logistics",
          "When, how long, and who's coming?",
          Calendar,
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Check-in Date</p>
                <input
                  type="date"
                  className="w-full text-lg p-3 border-2 border-slate-200 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 font-semibold bg-white shadow-sm transition-all text-center"
                  value={data.checkInDate}
                  onChange={(e) => updateData('checkInDate', e.target.value)}
                />
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Duration</p>
                <div className="flex items-center justify-between px-2">
                  <button type="button" onClick={() => {
                    if (data.tripDays > currentRegion.minDays) updateData('tripDays', data.tripDays - 1);
                  }} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-95 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-slate-900">{data.tripDays}</span>
                    <span className="block text-slate-500 text-sm font-medium mt-1">Days</span>
                  </div>
                  <button type="button" onClick={() => {
                    if (data.tripDays < currentRegion.maxDays) updateData('tripDays', data.tripDays + 1);
                  }} className="w-10 h-10 rounded-full bg-brand-light/50 flex items-center justify-center text-brand-dark hover:bg-brand-light active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Group Size</p>
                <div className="flex items-center justify-between px-2">
                  <button type="button" onClick={() => data.travelerCount > 1 && updateData('travelerCount', data.travelerCount - 1)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-95 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-slate-900">{data.travelerCount}</span>
                    <span className="block text-slate-500 text-sm font-medium mt-1">Travelers</span>
                  </div>
                  <button type="button" onClick={() => updateData('travelerCount', data.travelerCount + 1)} className="w-10 h-10 rounded-full bg-brand-light/50 flex items-center justify-center text-brand-dark hover:bg-brand-light active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
        );
      case 3:
        const availableSpots = currentRegion?.spots || [];
        const restaurants = currentRegion?.restaurants || [];

        return renderStepContent(
          "Direct Customization",
          "Select must-see spots and local food to try.",
          Navigation,
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
        );
      case 4:
        return renderStepContent(
          "Comfort & Transport",
          "Choose your ride and stay.",
          Bed,
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
                        {config.cars.filter(c => c.id !== 'pool').map(car => {
                          const count = (data.privateCars || {})[car.id] || 0;
                          return (
                            <div 
                              key={car.id} 
                              onClick={() => count === 0 && updateCarCount(car.id, 1)}
                              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between ${count === 0 ? 'cursor-pointer hover:border-brand/50' : ''} ${count > 0 ? 'border-brand bg-white shadow-sm' : 'border-slate-200 bg-white'}`}
                            >
                              <div>
                                <h4 className={`font-bold text-sm ${count > 0 ? 'text-slate-900' : 'text-slate-700'}`}>{car.label}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Capacity: {car.maxPax} pax</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button type="button" onClick={() => updateCarCount(car.id, -1)} disabled={count === 0} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 disabled:opacity-50 hover:bg-slate-200 transition-all">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-slate-900 w-4 text-center">{count}</span>
                                <button type="button" onClick={() => updateCarCount(car.id, 1)} className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand-dark hover:bg-brand/40 transition-all">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {(() => {
                           const totalCap = Object.entries(data.privateCars || {}).reduce((acc, [cId, cCount]) => {
                             const c = config.cars.find(x => x.id === cId);
                             return acc + (c ? c.maxPax * cCount : 0);
                           }, 0);
                           if (totalCap < data.travelerCount) {
                             return <p className="text-red-500 text-sm mt-3 font-semibold bg-red-50 p-3 rounded-xl">⚠️ Need more capacity. Fits {totalCap} out of {data.travelerCount} travelers.</p>;
                           }
                           return null;
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white border-2 border-slate-200 rounded-xl cursor-pointer hover:border-brand/30 transition-all" onClick={() => updateData('isDivineGuest', !data.isDivineGuest)}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${data.isDivineGuest ? 'bg-brand text-black' : 'border-2 border-slate-300 bg-slate-50'}`}>
                    {data.isDivineGuest && <Check className="w-4 h-4" />}
                  </div>
                  <span className="font-bold text-slate-700 text-sm select-none">I am staying at Divine View Hotel</span>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Guest Name</h3>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 text-sm transition-all"
                    placeholder="Enter your full name"
                    value={data.name || ''}
                    onChange={(e) => updateData('name', e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">
                    {data.isDivineGuest ? 'Room Number' : 'Pickup Location(s)'}
                  </h3>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 text-sm transition-all"
                    placeholder={data.isDivineGuest ? 'Your room number' : 'Hotel name(s) or addresses'}
                    value={data.roomNumber || ''}
                    onChange={(e) => updateData('roomNumber', e.target.value)}
                  />
                </div>
              </div>

              {/* Custom Request */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Custom Requests?</h3>
                <textarea
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 text-sm resize-none transition-all"
                  rows="3"
                  placeholder="Any unlisted locations or special requirements?"
                  value={data.customRequest || ''}
                  onChange={(e) => updateData('customRequest', e.target.value)}
                />
              </div>

            </div>
        );
      default:
        return null;
    }
  };

  const currentCostPerPerson = calculateLiveCost();
  
  const isStepValid = () => {
    if (step === 2 && !data.checkInDate) return false;
    if (step === 4 && data.transportType === 'private') {
       const totalCap = Object.entries(data.privateCars || {}).reduce((acc, [cId, cCount]) => {
         const c = config.cars.find(x => x.id === cId);
         return acc + (c ? c.maxPax * cCount : 0);
       }, 0);
       if (totalCap < data.travelerCount) return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 w-full shrink-0">
        <div
          className="h-full bg-brand transition-all duration-500 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto relative">
        {renderStep()}
      </div>

      {/* Live Cost Ticker & Navigation */}
      <div className="bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 mt-auto shrink-0 flex flex-col">
        {/* Live Ticker */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50/80 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-500">Estimated Cost</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900">₹{currentCostPerPerson.toLocaleString()}</span>
            <span className="text-xs font-medium text-slate-500">/person</span>
          </div>
        </div>

        <div className="p-4 px-6 flex gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="w-14 h-14 flex items-center justify-center border-2 border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex-1 h-14 flex items-center justify-center gap-2 bg-brand text-black font-bold text-lg rounded-2xl shadow-lg shadow-brand/30 hover:bg-brand-dark hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none"
          >
            {step === 4 ? 'Book via WhatsApp' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
