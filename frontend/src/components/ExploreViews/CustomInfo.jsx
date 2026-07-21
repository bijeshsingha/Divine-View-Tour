import React from 'react';
import { ArrowLeft, PencilRuler, CheckCircle, Sliders, XCircle } from 'lucide-react';

export default function CustomInfo({ onBack, onBuildPath }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen animate-in fade-in slide-in-from-right-4 duration-300 pb-28">
      
      {/* Header */}
      <div className="bg-slate-900 pt-16 pb-12 px-6 text-center relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-12 h-12 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md rounded-2xl flex items-center justify-center text-white z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-16 h-16 bg-slate-800 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <PencilRuler className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Custom Itineraries</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Take full control of your journey. Handpick your destinations and travel style, and our smart engine will do the math.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8 w-full -mt-6">
        
        {/* How it works */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-brand-dark" /> Total Flexibility
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The Custom Itinerary builder is designed for seasoned travelers who know exactly what they want. 
            You provide the inputs, and we provide a transparent cost estimate and logistical support.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-800 text-lg mb-1">1. Choose Region</div>
              <p className="text-sm text-slate-500">Pick where you want to go and how many days you have.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-800 text-lg mb-1">2. Handpick Spots</div>
              <p className="text-sm text-slate-500">Select only the places you actually want to visit.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-800 text-lg mb-1">3. Select Transport</div>
              <p className="text-sm text-slate-500">Choose between budget shuttles or private fleets.</p>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="bg-brand/10 border border-brand/20 rounded-3xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-brand-dark" /> What to expect
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-slate-800">
              <span className="font-bold text-brand-dark">•</span> 
              <div>
                <strong>Live Pricing Estimator</strong>
                <p className="text-sm text-slate-600 mt-1">As you change your vehicle or stay type, the cost per person updates instantly at the bottom of your screen.</p>
              </div>
            </li>
            <li className="flex gap-3 text-slate-800">
              <span className="font-bold text-brand-dark">•</span> 
              <div>
                <strong>Automated Scheduling</strong>
                <p className="text-sm text-slate-600 mt-1">Once you submit your custom request, our team will review the spots and create an optimized day-by-day route for you.</p>
              </div>
            </li>
            <li className="flex gap-3 text-slate-800">
              <span className="font-bold text-brand-dark">•</span> 
              <div>
                <strong>Pay Only For What You Need</strong>
                <p className="text-sm text-slate-600 mt-1">Don't want our hotels? Just book the transport. Want a mix of everything? We can do that too.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Inclusions / Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-600" /> What's Included
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-emerald-800">
                <span className="font-bold text-emerald-600">•</span> 
                <div>
                  <strong>Dedicated AC Vehicle</strong>
                  <p className="text-sm opacity-80 mt-1">e.g., Sedan, SUV, or Traveler for the entire trip.</p>
                </div>
              </li>
              <li className="flex gap-3 text-emerald-800">
                <span className="font-bold text-emerald-600">•</span> 
                <div>
                  <strong>Professional Driver / Guide Services</strong>
                  <p className="text-sm opacity-80 mt-1">Expert local navigation and assistance.</p>
                </div>
              </li>
              <li className="flex gap-3 text-emerald-800">
                <span className="font-bold text-emerald-600">•</span> 
                <div>
                  <strong>Fuel, Parking, and Toll Taxes</strong>
                  <p className="text-sm opacity-80 mt-1">All road and transit taxes are covered.</p>
                </div>
              </li>
              <li className="flex gap-3 text-emerald-800">
                <span className="font-bold text-emerald-600">•</span> 
                <div>
                  <strong>Driver Allowance</strong>
                  <p className="text-sm opacity-80 mt-1">Driver's meals and accommodations are taken care of.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-rose-50 border border-rose-200 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-rose-900 mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-rose-600" /> What's Not Included
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-rose-800">
                <span className="font-bold text-rose-600">•</span> 
                <div>
                  <strong>Monument, Temple, and Museum Entry Fees</strong>
                  <p className="text-sm opacity-80 mt-1">Tickets are purchased directly at the venues.</p>
                </div>
              </li>
              <li className="flex gap-3 text-rose-800">
                <span className="font-bold text-rose-600">•</span> 
                <div>
                  <strong>Ferry and River Cruise Tickets</strong>
                  <p className="text-sm opacity-80 mt-1">Passes for river and boating activities are paid out-of-pocket.</p>
                </div>
              </li>
              <li className="flex gap-3 text-rose-800">
                <span className="font-bold text-rose-600">•</span> 
                <div>
                  <strong>Camera / Video pass fees at heritage sites</strong>
                  <p className="text-sm opacity-80 mt-1">Paid directly to the local authorities.</p>
                </div>
              </li>
              <li className="flex gap-3 text-rose-800">
                <span className="font-bold text-rose-600">•</span> 
                <div>
                  <strong>Personal meals (Lunch/Dinner)</strong>
                  <p className="text-sm opacity-80 mt-1">We leave food choices to you so you can explore local cafes.</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 flex justify-center">
        <button 
          onClick={onBuildPath}
          className="w-full max-w-sm bg-slate-900 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:bg-slate-800 transition-all text-center"
        >
          Start Custom Builder
        </button>
      </div>
    </div>
  );
}
