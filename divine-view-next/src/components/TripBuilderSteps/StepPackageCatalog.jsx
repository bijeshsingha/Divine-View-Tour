'use client';
import React, { useState } from 'react';
import { Package, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Typography';
import { Badge } from '../ui/Badge';

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
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-12 h-12 bg-stone-50 text-secondary rounded-2xl flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>
        <Heading level={2} className="mb-2 tracking-tight">Signature Routes</Heading>
        <p className="text-stone-500 text-base">Select a pre-designed package to view details.</p>

        {/* Filter Bar */}
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? 'primary' : 'outline'}
              size="sm"
              className="rounded-full whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start overflow-y-auto pb-4 gap-4">
        {filteredPackages.map(pkg => (
          <button 
            key={pkg.id}
            onClick={() => onSelectPackage(pkg)}
            className="w-full shrink-0 text-left bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md transition-all group hover:shadow-xl relative"
          >
            <div className="h-32 w-full relative overflow-hidden">
              <Image 
                src={pkg.image} 
                alt={pkg.title} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              {pkg.isDisabled && (
                <div className="absolute inset-0 bg-foreground/30 flex flex-col items-center justify-center backdrop-blur-[1px] z-10 transition-colors group-hover:bg-foreground/10">
                  <Badge variant="warning" className="shadow-lg group-hover:opacity-80 transition-opacity">Closed for Monsoon</Badge>
                </div>
              )}
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <Badge variant="secondary">{pkg.duration}</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <Heading level={3} className="text-lg mb-1 leading-tight">{pkg.title}</Heading>
              <p className="text-sm text-stone-500 mb-3 line-clamp-2">{pkg.subtitle}</p>
              
              <div className="flex justify-between items-center pt-3 border-t border-stone-100">
                <span className="font-bold text-primary-dark">₹{pkg.price.toLocaleString()} <span className="text-xs font-normal text-background0">/ pax</span></span>
                <span className="text-primary flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform">
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
