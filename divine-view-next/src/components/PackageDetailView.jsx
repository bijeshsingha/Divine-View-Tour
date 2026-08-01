'use client';
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, MapPin, Clock, ArrowRight, Download, RefreshCw } from 'lucide-react';

import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Heading } from './ui/Typography';

export default function PackageDetailView({ packageData, onBack, onBook }) {
  const [activeTab, setActiveTab] = useState('itinerary');

  if (!packageData) return null;

  return (
    <div className="flex-1 flex flex-col h-full bg-background w-full animate-in fade-in slide-in-from-right-4 duration-300 z-50 absolute inset-0">
      
      {/* Header / Hero */}
      <div className="relative h-64 shrink-0 bg-foreground">
        <img src={packageData.image} alt={packageData.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4 z-10">
          <Button variant="icon" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>



        <div className="absolute bottom-4 left-6 right-6">
          <Badge variant="secondary" className="mb-2">
            {packageData.duration}
          </Badge>
          <Heading level={1} className="text-white mb-1">{packageData.title}</Heading>
          <p className="text-primary-dark font-bold text-lg">₹{packageData.price.toLocaleString()} <span className="text-sm font-normal text-slate-300">/ person</span></p>
        </div>
      </div>

      {/* Disabled Banner */}
      {packageData.isDisabled && (
        <div className="bg-red-50 border-b border-red-100 p-4 shrink-0">
          <p className="text-red-800 text-sm font-bold">{packageData.disabledReason || "This package is currently closed due to the monsoon season."}</p>
          <p className="text-red-700 text-xs mt-1">You can still explore the itinerary and routes for future reference.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white shrink-0">
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'itinerary' ? 'border-primary text-primary-dark' : 'border-transparent text-background0 hover:text-stone-700'}`}
        >
          Itinerary & Route
        </button>
        <button 
          onClick={() => setActiveTab('inclusions')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'inclusions' ? 'border-primary text-primary-dark' : 'border-transparent text-background0 hover:text-stone-700'}`}
        >
          Inclusions & Exclusions
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-28">
        
        {activeTab === 'itinerary' && (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {packageData.itinerary.map((day, idx) => (
              <div key={idx} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-stone-50 text-background0 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <span className="font-bold text-sm">{idx + 1}</span>
                </div>
                
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary-dark font-extrabold text-sm uppercase tracking-wider">Day {idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-3">{day.route}</h3>
                  <ul className="space-y-2">
                    {day.stops.map((stop, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-sm text-stone-600">
                        <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{stop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inclusions' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> What's Included
              </h3>
              <ul className="space-y-3">
                {packageData.inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-stone-700 text-sm">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-500" /> What's Excluded
              </h3>
              <ul className="space-y-3">
                {packageData.exclusions.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="text-stone-700 text-sm">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* Sticky Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20">
        {packageData.isDisabled ? (
          <Button 
            disabled
            variant="ghost"
            size="lg"
            className="w-full bg-stone-100 flex items-center justify-center gap-2 cursor-not-allowed text-stone-500"
          >
            Currently Unavailable (Monsoon)
          </Button>
        ) : (
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full text-white flex items-center justify-center gap-2"
            onClick={onBook}
          >
            Continue to Booking <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
      
    </div>
  );
}
