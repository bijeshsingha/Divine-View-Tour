import React, { useState } from 'react';
import { Package, ArrowRight, ArrowLeft } from 'lucide-react';

export default function StepPackageCatalog({ packages, onSelectPackage, onBack }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Meghalaya', 'Guwahati', 'Theme'];
  
  const filteredPackages = packages.filter(pkg => {
    if (filter === 'All') return true;
    return pkg.category === filter;
  });

  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-12 h-12 flex items-center justify-center border-2 border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 bg-white shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Signature Routes</h2>
        <p className="text-slate-500 text-base">Select a pre-designed package to view details.</p>

        {/* Filter Bar */}
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4 gap-4">
        {filteredPackages.map(pkg => (
          <button 
            key={pkg.id}
            onClick={() => { if (!pkg.isDisabled) onSelectPackage(pkg); }}
            className={`w-full text-left bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md transition-all group ${pkg.isDisabled ? 'opacity-60 cursor-not-allowed grayscale' : 'hover:shadow-xl'}`}
          >
            <div className="h-32 w-full relative">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              {pkg.isDisabled && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] z-10">
                  <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-xs shadow-lg border border-red-400">Closed for Monsoon</span>
                </div>
              )}
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                  {pkg.duration}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{pkg.title}</h3>
              <p className="text-sm text-slate-500 mb-3 line-clamp-2">{pkg.subtitle}</p>
              
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="font-bold text-brand-dark">₹{pkg.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ pax</span></span>
                <span className="text-brand flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  View <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
