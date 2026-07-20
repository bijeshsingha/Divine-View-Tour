import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import staticConfig from '../data.json';

import Step1Destination from './TripBuilderSteps/Step1Destination';
import Step2Logistics from './TripBuilderSteps/Step2Logistics';
import Step3Customization from './TripBuilderSteps/Step3Customization';
import Step4ComfortTransport from './TripBuilderSteps/Step4ComfortTransport';

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
      message += `*Pickup Location:* Hotel Divine View (Room: ${data.roomNumber || 'TBD'})\n`;
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
    switch (step) {
      case 1:
        return <Step1Destination data={data} updateData={updateData} config={config} />;
      case 2:
        return <Step2Logistics data={data} updateData={updateData} currentRegion={currentRegion} />;
      case 3:
        return <Step3Customization data={data} toggleArrayItem={toggleArrayItem} currentRegion={currentRegion} />;
      case 4:
        return <Step4ComfortTransport data={data} updateData={updateData} config={config} updateCarCount={updateCarCount} />;
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
