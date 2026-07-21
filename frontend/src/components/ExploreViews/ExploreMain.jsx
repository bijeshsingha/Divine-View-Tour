import React, { useState } from 'react';
import { Package, PencilRuler, ArrowRight } from 'lucide-react';

export default function ExploreMain({ exploreData, onSelectPlace, onSelectPackageInfo, onSelectCustomInfo, onBackHome, onBuildCustom }) {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'Waterfalls', 'Adventure', 'Food', 'Culture'];

  const filteredData = activeTab === 'All' 
    ? exploreData 
    : exploreData.filter(item => item.category === activeTab);

  return (
    <div className="flex-1 flex flex-col pb-28 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white py-12 px-4 text-center relative shrink-0">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">Divine View Tours</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Explore the Magic</h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Learn about our beautifully crafted tour packages or discover the hidden gems you can add to your custom itinerary.
          </p>
        </div>
      </section>

      {/* 2. HOW IT WORKS CARDS */}
      <section className="max-w-7xl mx-auto px-4 mt-8 w-full shrink-0">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Package Info Card */}
          <button 
            onClick={onSelectPackageInfo}
            className="text-left bg-white rounded-2xl p-6 border-2 border-amber-100 shadow-md hover:shadow-xl hover:border-amber-300 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Readymade Tour Packages</h3>
              <p className="text-slate-500 text-sm mb-4">
                Hassle-free, pre-designed itineraries. We handle everything from the vehicle to the stays and driver allowances.
              </p>
            </div>
            <div className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn What's Included <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Custom Info Card */}
          <button 
            onClick={onSelectCustomInfo}
            className="text-left bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl hover:border-slate-400 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PencilRuler className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Itineraries</h3>
              <p className="text-slate-500 text-sm mb-4">
                For the seasoned traveler. You pick the places, and we calculate the optimal route, days, and cost.
              </p>
            </div>
            <div className="text-slate-700 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn How It Works <ArrowRight className="w-4 h-4" />
            </div>
          </button>

        </div>
      </section>

      {/* 3. CATEGORY TABS */}
      <div className="max-w-7xl mx-auto px-4 mt-12 w-full shrink-0">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Places to Visit</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none md:justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. PLACES GRID */}
      <section className="max-w-7xl mx-auto px-4 mt-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(item => (
            <button 
              key={item.id} 
              onClick={() => onSelectPlace(item)}
              className="text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                  {item.region}
                </span>
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs px-2.5 py-1 rounded-full font-bold">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-4 text-brand-dark font-bold text-sm flex items-center gap-1">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 flex gap-3 md:justify-center">
        <button 
          onClick={onBackHome}
          className="bg-slate-100 text-slate-800 font-bold py-3 px-6 rounded-2xl hover:bg-slate-200 transition-colors"
        >
          Back Home
        </button>
        <button 
          onClick={onBuildCustom}
          className="flex-1 max-w-sm bg-brand text-black font-extrabold py-3 px-6 rounded-2xl shadow-lg shadow-brand/30 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
        >
          Start Planning 
          <span className="text-xl leading-none">→</span>
        </button>
      </div>

    </div>
  );
}
