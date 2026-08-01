'use client';
import React from 'react';
import { Calendar, Minus, Plus } from 'lucide-react';

export default function Step2Logistics({ data, updateData, currentRegion }) {
  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0">
        <div className="w-12 h-12 bg-primary/10 text-primary-dark rounded-2xl flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Core Logistics</h2>
        <p className="text-background0 text-base">How long are you traveling for?</p>
      </div>
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4">
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-stone-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Trip Duration</p>
            <div className="flex items-center justify-between px-2">
              <button type="button" onClick={() => {
                if (data.tripDays > currentRegion.minDays) updateData('tripDays', data.tripDays - 1);
              }} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-stone-100 active:scale-95 transition-all">
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <span className="text-3xl font-extrabold text-foreground">{data.tripDays}</span>
                <span className="block text-background0 text-sm font-medium mt-1">Days</span>
              </div>
              <button type="button" onClick={() => {
                if (data.tripDays < currentRegion.maxDays) updateData('tripDays', data.tripDays + 1);
              }} className="w-10 h-10 rounded-full bg-primary-light/50 flex items-center justify-center text-primary-dark hover:bg-primary-light active:scale-95 transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
