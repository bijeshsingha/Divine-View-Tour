import React from 'react';
import { User, Users, Calendar } from 'lucide-react';

export default function StepFinalGuestDetails({ data, updateData }) {
  return (
    <div className="flex-1 flex flex-col pt-8 pb-12 px-6 h-full grow animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 shrink-0 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Almost There!</h2>
        <p className="text-slate-500 text-base">We just need a few details to finalize your quote.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4 space-y-5">
        
        {/* Name */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-brand-dark" />
            <h3 className="font-bold text-slate-800">Lead Guest Name</h3>
          </div>
          <input
            type="text"
            className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 text-base font-medium transition-all"
            placeholder="Enter your full name"
            value={data.name || ''}
            onChange={(e) => updateData('name', e.target.value)}
          />
        </div>

        {/* Travelers */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-brand-dark" />
            <h3 className="font-bold text-slate-800">Number of Travelers</h3>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Adults</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 text-center font-bold transition-all"
                value={data.travelerCount || 1}
                onChange={(e) => updateData('travelerCount', Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Children</label>
              <input
                type="number"
                min="0"
                className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 text-center font-bold transition-all"
                value={data.childrenCount || 0}
                onChange={(e) => updateData('childrenCount', Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-brand-dark" />
            <h3 className="font-bold text-slate-800">Preferred Travel Date</h3>
          </div>
          <input
            type="date"
            className="w-full text-base p-3 border-2 border-slate-200 rounded-xl focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none text-slate-700 font-semibold bg-white shadow-sm transition-all"
            value={data.checkInDate || ''}
            onChange={(e) => updateData('checkInDate', e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
