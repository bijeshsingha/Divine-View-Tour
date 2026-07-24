import React from 'react';
import { ArrowLeft, Package, CheckCircle, XCircle } from 'lucide-react';
import config from '../../data.json';

export default function PackageInfo({ onBack, onBuildPath, onSelectPackage }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen animate-in fade-in slide-in-from-right-4 duration-300 pb-28">
      
      {/* Header */}
      <div className="bg-slate-900 pt-16 pb-24 px-6 text-center relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-12 h-12 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md rounded-2xl flex items-center justify-center text-white z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Readymade Tour Packages</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          The ultimate hassle-free experience. We've done the research and packed the best spots into perfectly paced itineraries.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-10 w-full -mt-16 relative z-10">
        
        {/* How it works */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works</h2>
          <p className="text-slate-600 leading-relaxed">
            Our Readymade Packages, known as "Signature Routes", are highly curated fixed-itinerary tours. 
            They are designed for travelers who want a complete, uninterrupted experience without the stress of daily planning. 
            Simply pick a package that fits your vibe, and we handle the logistics.
          </p>
        </section>

        {/* Our Signature Packages */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 px-2 md:px-4">Our Signature Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.packages.map(pkg => (
              <div 
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className="group relative rounded-3xl overflow-hidden h-72 shadow-sm border border-slate-200 cursor-pointer"
              >
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">{pkg.duration}</span>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">{pkg.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white font-bold">₹{pkg.price.toLocaleString()} <span className="text-xs font-normal text-slate-300">/ person</span></span>
                    <span className="text-amber-400 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Details &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          className="w-full max-w-sm bg-amber-500 text-slate-900 font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all text-center"
        >
          Book a Package
        </button>
      </div>
    </div>
  );
}
