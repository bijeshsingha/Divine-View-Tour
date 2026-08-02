'use client';
import React from 'react';
import { User, Users, Calendar, Phone, Mail, FileText, BadgeCheck } from 'lucide-react';

export default function StepFinalGuestDetails({ data, updateData, displayPrice, config, path }) {
  const isCustom = path === 'custom' || (!path && !!data.region);
  let title = '';
  let duration = '';
  if (!isCustom && data.packageId && config) {
    const pkg = config.packages.find(p => p.id === data.packageId);
    title = pkg?.title || 'Readymade Package';
    duration = pkg?.duration || '';
  } else {
    const regionTitle = config?.regions?.[data.region]?.title || data.region;
    title = `Custom ${regionTitle} Tour`;
    duration = `${data.tripDays} Days`;
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Left Column: The Receipt */}
      <div className="w-full md:w-1/2 bg-[#F4F4F0] border-r border-stone-200 p-6 md:p-10 flex flex-col overflow-y-auto">
        <div className="max-w-sm mx-auto w-full pt-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Trip Summary
            </h2>
            <BadgeCheck className="w-6 h-6 text-emerald-600" />
          </div>
          
          <div className="bg-white p-8 shadow-sm border border-stone-200 relative rounded-sm">
            
            <div className="text-center border-b-2 border-dashed border-stone-200 pb-6 mb-6">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Divine View Tours</p>
              <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">{title}</h3>
              <p className="text-sm text-stone-500 mt-2">{duration}</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Travelers</span>
                <span className="text-sm font-bold text-foreground text-right">{data.travelerCount} Adults{data.childrenCount > 0 ? `, ${data.childrenCount} Ch` : ''}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Accommodation</span>
                <span className="text-sm font-bold text-foreground text-right">{data.stayType === 'none' ? 'Self-arranged' : (typeof data.stayType === 'string' ? data.stayType.replace('_', ' ').toUpperCase() : 'Standard')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Transport</span>
                <span className="text-sm font-bold text-foreground text-right">{data.transportType === 'shuttle' ? 'Daily Shuttle' : 'Private Fleet'}</span>
              </div>
              {data.spots && data.spots.length > 0 && (
                <div className="flex justify-between items-start pt-2">
                  <span className="text-sm text-stone-500">Key Stops</span>
                  <span className="text-xs font-bold text-foreground text-right max-w-[150px] leading-relaxed">{data.spots.length} Selected</span>
                </div>
              )}
            </div>
            
            <div className="border-t-[3px] border-stone-800 pt-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Estimated Total</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-wide">Per Person (Adult)</p>
                </div>
                <div className="text-right">
                  <h2 className="font-serif text-4xl font-extrabold text-primary tracking-tight">
                    ₹{displayPrice.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Right Column: Guest Details Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white">
        <div className="max-w-md mx-auto w-full pt-4">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Guest Details</h2>
            <p className="text-stone-500 text-sm">Where should we send your booking confirmation?</p>
          </div>
          
          <div className="space-y-6 pb-10">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-bold text-sm text-foreground">
                <User className="w-4 h-4 text-primary-dark" /> Lead Guest Name
              </label>
              <input
                type="text"
                className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-stone-700 text-base font-medium transition-all"
                placeholder="Enter your full name"
                value={data.name || ''}
                onChange={(e) => updateData('name', e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-bold text-sm text-foreground">
                <Phone className="w-4 h-4 text-primary-dark" /> Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-stone-700 text-base font-medium transition-all"
                placeholder="WhatsApp enabled number preferred"
                value={data.phone || ''}
                onChange={(e) => updateData('phone', e.target.value)}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-bold text-sm text-foreground">
                <Mail className="w-4 h-4 text-primary-dark" /> Email Address <span className="text-stone-400 font-normal text-xs ml-1">(Optional)</span>
              </label>
              <input
                type="email"
                className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-stone-700 text-base font-medium transition-all"
                placeholder="Enter your email address"
                value={data.email || ''}
                onChange={(e) => updateData('email', e.target.value)}
              />
            </div>

            {/* Travelers & Dates Row */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-2 font-bold text-sm text-foreground">
                  <Users className="w-4 h-4 text-primary-dark" /> Travelers
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    placeholder="Adults"
                    className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-stone-700 text-center font-bold transition-all"
                    value={data.travelerCount !== undefined ? data.travelerCount : 2}
                    onChange={(e) => updateData('travelerCount', e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value, 10)))}
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Kids"
                    className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-stone-700 text-center font-bold transition-all"
                    value={data.childrenCount !== undefined ? data.childrenCount : 0}
                    onChange={(e) => updateData('childrenCount', e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10)))}
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-1.5 mb-2">
                  <label className="flex items-center gap-2 font-bold text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-primary-dark" /> When are you planning to escape?
                  </label>
                  <label className="flex items-center gap-2 text-sm text-stone-500 cursor-pointer w-max">
                    <input 
                      type="checkbox" 
                      className="accent-primary w-4 h-4 rounded" 
                      checked={data.flexibleDates || false} 
                      onChange={(e) => {
                         updateData('flexibleDates', e.target.checked);
                         if (e.target.checked) updateData('checkInDate', 'Flexible');
                         else updateData('checkInDate', '');
                      }} 
                    />
                    I'm flexible on dates
                  </label>
                </div>
                <input
                  type="date"
                  disabled={data.flexibleDates}
                  className={`w-full p-3.5 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-stone-700 font-semibold transition-all ${data.flexibleDates ? 'opacity-50 cursor-not-allowed' : ''}`}
                  value={data.checkInDate !== 'Flexible' ? data.checkInDate : ''}
                  onChange={(e) => updateData('checkInDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
