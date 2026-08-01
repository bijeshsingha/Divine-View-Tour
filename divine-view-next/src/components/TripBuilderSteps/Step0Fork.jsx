'use client';
import React from 'react';
import { Package, PencilRuler, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Step0Fork({ onSelectPath }) {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="shrink-0 flex justify-start mb-2">
        <button onClick={() => router.push('/')} className="w-12 h-12 flex items-center justify-center border-2 border-stone-200 text-stone-600 rounded-2xl hover:bg-background transition-all active:scale-95 bg-white shrink-0">
          <Home className="w-5 h-5" />
        </button>
      </div>
      <div className="mb-8 shrink-0 text-center mt-2">
        <h2 className="font-serif text-3xl font-extrabold text-foreground mb-3 tracking-tight">How would you like to plan?</h2>
        <p className="text-background0 text-base max-w-sm mx-auto">Choose a hassle-free readymade package, or craft your own custom itinerary from scratch.</p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6 pb-4">
        
        {/* Readymade Path */}
        <button 
          onClick={() => onSelectPath('readymade')}
          className="w-full bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-xl shadow-stone-100 hover:scale-[1.02] hover:border-secondary transition-all flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 rounded-full bg-stone-50 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Divine Signature Routes</h3>
          <p className="text-background0 text-sm">Choose from our perfectly curated, hassle-free tour packages. Best for first-timers.</p>
        </button>

        <div className="flex items-center justify-center gap-4 py-2">
          <div className="h-px bg-stone-100 flex-1"></div>
          <span className="text-slate-400 font-bold uppercase text-xs">OR</span>
          <div className="h-px bg-stone-100 flex-1"></div>
        </div>

        {/* Custom Path */}
        <button 
          onClick={() => onSelectPath('custom')}
          className="w-full bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-lg shadow-slate-100 hover:scale-[1.02] hover:border-slate-400 transition-all flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 rounded-full bg-stone-50 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-white transition-colors">
            <PencilRuler className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Build Custom Itinerary</h3>
          <p className="text-background0 text-sm">Hand-pick your destinations and let us calculate the route. Best for seasoned travelers.</p>
        </button>

      </div>
    </div>
  );
}
