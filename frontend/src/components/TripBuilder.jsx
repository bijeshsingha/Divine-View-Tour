import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, RefreshCw, Download } from 'lucide-react';
import staticConfig from '../data.json';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Step0Fork from './TripBuilderSteps/Step0Fork';
import StepPackageCatalog from './TripBuilderSteps/StepPackageCatalog';
import PackageDetailView from './PackageDetailView';
import Step1Destination from './TripBuilderSteps/Step1Destination';
import Step2Logistics from './TripBuilderSteps/Step2Logistics';
import Step3Customization from './TripBuilderSteps/Step3Customization';
import Step4ComfortTransport from './TripBuilderSteps/Step4ComfortTransport';
import StepFinalGuestDetails from './TripBuilderSteps/StepFinalGuestDetails';
import PlaceDetail from './ExploreViews/PlaceDetail';
import { EXPLORE_DATA } from '../exploreData';

import { ItineraryPDF } from './ItineraryPDF';
import { generateSchedule } from '../utils/itineraryEngine';

export default function TripBuilder({ initialData, onComplete }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const pkgParam = searchParams.get('package');
  const pathParam = searchParams.get('path');

  const [step, setStep] = useState(() => {
    if (pkgParam) return 'final';
    if (pathParam === 'readymade') return 'catalog';
    return 'fork';
  });
  
  const [path, setPath] = useState(() => {
    if (pkgParam || pathParam === 'readymade') return 'readymade';
    return null;
  });
  
  const [data, setData] = useState(() => {
    return {
      ...initialData,
      travelerCount: 2,
      childrenCount: 0,
      ...(pkgParam ? { packageId: pkgParam } : {})
    };
  });
  
  const config = staticConfig;
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [explorePlace, setExplorePlaceInternal] = useState(() => {
    const placeId = searchParams.get('place');
    if (placeId) {
      return EXPLORE_DATA.find(p => p.id === placeId) || null;
    }
    return null;
  });

  const setExplorePlace = (place) => {
    setExplorePlaceInternal(place);
    if (place) {
      setSearchParams({ place: place.id }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  useEffect(() => {
    const placeId = searchParams.get('place');
    if (placeId && (!explorePlace || explorePlace.id !== placeId)) {
      setExplorePlaceInternal(EXPLORE_DATA.find(p => p.id === placeId) || null);
    } else if (!placeId && explorePlace) {
      setExplorePlaceInternal(null);
    }
  }, [searchParams, explorePlace]);

  // Ensure shuttle is only available for 1-day guwahati tours
  useEffect(() => {
    if (data.transportType === 'shuttle' && !(data.region === 'guwahati' && data.tripDays === 1)) {
      updateData('transportType', 'private');
    }
  }, [data.region, data.tripDays, data.transportType]);

  // Generate Schedule when hitting Custom Final step
  useEffect(() => {
    if (step === 'final' && path === 'custom') {
      generateSchedule(data.spots, data.checkInDate).then(setSchedule);
    }
  }, [step, path, data.spots, data.checkInDate]);

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateCarCount = (carId, delta) => {
    setData(prev => {
      const currentCars = prev.privateCars || {};
      const currentCount = currentCars[carId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      
      const newCars = { ...currentCars, [carId]: newCount };
      if (newCount === 0) delete newCars[carId];
      
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

  const getPricingBreakdown = () => {
    const regionData = config.regions[data.region] || config.regions['meghalaya'];
    const baseCost = regionData.basePrice * data.travelerCount * data.tripDays;
    
    let carCost = 0;
    let transportDetail = '';
    if (data.transportType === 'shuttle') {
      carCost = 800 * data.travelerCount * data.tripDays;
      transportDetail = 'Daily Shuttle';
    } else {
      const privateCars = data.privateCars || {};
      const carStrs = Object.entries(privateCars)
        .filter(([_, count]) => count > 0)
        .map(([carId, count]) => {
          const car = config.cars.find(c => c.id === carId);
          return `${count}x ${car ? car.label : carId}`;
        });
      transportDetail = carStrs.join(', ') || 'None';
      carCost = Object.entries(privateCars).reduce((total, [carId, count]) => {
        const car = config.cars.find(c => c.id === carId);
        if (!car) return total;
        return total + (1500 * (car.multiplier || 1) * count * data.tripDays);
      }, 0);
    }

    const selectedStay = config.stays.find(s => s.id === data.stayType);
    let stayCost = 0;
    let stayDetail = 'None';
    if (data.stayType !== 'none' && !(data.region === 'guwahati' && data.tripDays === 1)) {
      stayCost = (selectedStay ? selectedStay.rate : config.stays[1].rate) * data.travelerCount * (data.tripDays - 1);
      stayDetail = selectedStay ? selectedStay.label : 'Hotel';
    }

    const totalCost = baseCost + carCost + stayCost;

    return {
      travelerCount: data.travelerCount,
      tripDays: data.tripDays,
      baseCost,
      carCost,
      transportDetail,
      stayCost,
      stayDetail,
      totalCost
    };
  };

  const submitToWhatsApp = () => {
    const phone = "+916026504087";
    
    let message = '';

    if (path === 'readymade') {
      const pkg = config.packages.find(p => p.id === data.packageId);
      message = `*New Package Booking Request*\n\n`;
      message += `*Package:* ${pkg?.title}\n`;
      message += `*Guest Name:* ${data.name || 'Not provided'}\n`;
      message += `*Phone:* ${data.phone || 'Not provided'}\n`;
      if (data.email) message += `*Email:* ${data.email}\n`;
      message += `*Dates:* ${data.checkInDate || 'TBD'}\n`;
      message += `*Headcount:* ${data.travelerCount} Adults, ${data.childrenCount || 0} Children\n`;
    } else {
      const regionName = config.regions[data.region]?.title || data.region;
      message = `*New Custom Booking Request: ${regionName}*\n\n`;
      message += `*Guest Name:* ${data.name || 'Not provided'}\n`;
      message += `*Phone:* ${data.phone || 'Not provided'}\n`;
      if (data.email) message += `*Email:* ${data.email}\n`;
      message += `*Dates:* ${data.checkInDate || 'TBD'} for ${data.tripDays} Days\n`;
      message += `*Headcount:* ${data.travelerCount} Adults, ${data.childrenCount || 0} Children\n`;
      
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
    }

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank');
    onComplete(data);
  };

  // State Machine Navigation
  const handleSelectPath = (selectedPath) => {
    setPath(selectedPath);
    if (selectedPath === 'readymade') {
      setStep('catalog');
    } else {
      setStep(1);
    }
  };

  const nextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
    else if (step === 4) setStep('final');
    else if (step === 'final') submitToWhatsApp();
  };

  const prevStep = () => {
    if (step === 'catalog') setStep('fork');
    else if (step === 1) setStep('fork');
    else if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 'final') {
      if (path === 'readymade') setStep('package_detail');
      else setStep(4);
    }
  };

  const currentRegion = config.regions[data.region] || config.regions['meghalaya'];

  if (loading || !config) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 h-full">
        <RefreshCw className="w-12 h-12 text-brand animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading Options...</h2>
      </div>
    );
  }

  // Calculate generic progress percentage
  let progress = 0;
  if (step === 1) progress = 25;
  if (step === 2) progress = 50;
  if (step === 3) progress = 75;
  if (step === 4) progress = 90;
  if (step === 'final') progress = 100;

  // Render Full Screen Package Detail View independently
  if (step === 'package_detail') {
    const pkg = config.packages.find(p => p.id === data.packageId);
    return (
      <PackageDetailView 
        packageData={pkg}
        onBack={() => setStep('catalog')}
        onBook={() => setStep('final')}
      />
    );
  }

  const renderStep = () => {
    switch (step) {
      case 'fork':
        return <Step0Fork onSelectPath={handleSelectPath} />;
      case 'catalog':
        return (
          <StepPackageCatalog 
            packages={config.packages} 
            onSelectPackage={(pkg) => {
              updateData('packageId', pkg.id);
              setStep('package_detail');
            }} 
            onBack={prevStep}
          />
        );
      case 1:
        return <Step1Destination data={data} updateData={updateData} config={config} />;
      case 2:
        return <Step2Logistics data={data} updateData={updateData} currentRegion={currentRegion} />;
      case 3:
        return <Step3Customization data={data} toggleArrayItem={toggleArrayItem} currentRegion={currentRegion} onOpenExplore={setExplorePlace} />;
      case 4:
        return <Step4ComfortTransport data={data} updateData={updateData} config={config} updateCarCount={updateCarCount} />;
      case 'final':
        return <StepFinalGuestDetails data={data} updateData={updateData} />;
      default:
        return null;
    }
  };
  
  const isStepValid = () => {
    if (step === 'final') return !!data.name && !!data.phone && !!data.checkInDate && data.travelerCount > 0;
    if (step === 1 && !data.region) return false;
    if (step === 4 && data.transportType === 'private') {
       const totalCap = Object.entries(data.privateCars || {}).reduce((acc, [cId, cCount]) => {
         const c = config.cars.find(x => x.id === cId);
         return acc + (c ? c.maxPax * cCount : 0);
       }, 0);
       if (totalCap < data.travelerCount) return false;
    }
    return true;
  };

  // Determine pricing display based on path
  let displayPrice = 0;
  if (path === 'readymade' && data.packageId) {
    const pkg = config.packages.find(p => p.id === data.packageId);
    if (pkg) displayPrice = pkg.price;
  } else if (path === 'custom') {
    displayPrice = Math.round(getPricingBreakdown().totalCost / data.travelerCount) || 0;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 w-full shrink-0">
        <div
          className="h-full bg-brand transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto relative">
        {renderStep()}
      </div>

      {/* Footer Navigation */}
      {step !== 'fork' && step !== 'catalog' && (
        <div className="bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 mt-auto shrink-0 flex flex-col">
          {/* Live Ticker */}
          {step !== 1 && (
            <div className="flex items-center justify-between px-6 py-3 bg-slate-50/80 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-500">Estimated Cost</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-900">₹{displayPrice.toLocaleString()}</span>
                <span className="text-xs font-medium text-slate-500">/person</span>
              </div>
            </div>
          )}

          <div className="p-4 px-6 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={prevStep}
                className="w-14 h-14 flex items-center justify-center border-2 border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex-1 h-14 flex items-center justify-center gap-2 bg-brand text-black font-bold text-lg rounded-2xl shadow-lg shadow-brand/30 hover:bg-brand-dark hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none"
              >
                {step === 'final' ? 'Book on WhatsApp' : 'Continue'}
                {step !== 'final' && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explore Place Modal */}
      {explorePlace && (
        <div className="absolute inset-0 z-50 bg-white overflow-hidden animate-in slide-in-from-bottom-full duration-300">
          <PlaceDetail 
            place={explorePlace} 
            onBack={() => setExplorePlace(null)} 
            onSelectPackageInfo={() => {
               setExplorePlace(null);
               setStep('catalog');
            }} 
          />
        </div>
      )}
    </div>
  );
}
