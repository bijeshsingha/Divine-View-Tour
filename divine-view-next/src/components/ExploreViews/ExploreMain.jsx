'use client';
import React, { useState, useRef } from 'react';
import { Package, PencilRuler, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PlaceCard from './PlaceCard';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Heading } from '../ui/Typography';

import { useRouter } from 'next/navigation';

export default function ExploreMain({ exploreData }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  // Dynamically generate unique categories/tags
  const allTags = exploreData.flatMap(item => item.tags || []);
  const uniqueTags = Array.from(new Set(allTags)).sort();
  const categories = ['All', ...uniqueTags];

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const filteredData = activeTab === 'All' 
    ? exploreData 
    : exploreData.filter(item => item.tags?.includes(activeTab));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-28 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="bg-foreground text-white py-24 px-4 sm:px-6 md:px-8 text-center relative shrink-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src="/images/Meghalaya/6809d82be1f015b4b224ff5abe40c006.jpg" className="w-full h-full object-cover opacity-20" alt="Hero background" />
        </motion.div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Divine View Tours</span>
          <Heading level={1} className="tracking-tight text-white">Explore the Magic</Heading>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Learn about our beautifully crafted tour packages or discover the hidden gems you can add to your custom itinerary.
          </p>
        </div>
      </section>

      {/* 2. HOW IT WORKS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8 w-full shrink-0">
        <Heading level={2} className="mb-6">How It Works</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Package Info Card */}
          <Card 
            interactive
            onClick={() => router.push('/explore/packages')}
            className="text-left p-6 border-2 border-stone-100 hover:border-primary/50 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-stone-50 text-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Readymade Tour Packages</h3>
              <p className="text-background0 text-sm mb-4">
                Hassle-free, pre-designed itineraries. We handle everything from the vehicle to the stays and driver allowances.
              </p>
            </div>
            <div className="text-secondary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn What's Included <ArrowRight className="w-4 h-4" />
            </div>
          </Card>

          {/* Custom Info Card */}
          <Card 
            interactive
            onClick={() => router.push('/explore/custom')}
            className="text-left p-6 border-2 border-stone-100 hover:border-secondary/50 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-stone-50 text-stone-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PencilRuler className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Custom Itineraries</h3>
              <p className="text-background0 text-sm mb-4">
                For the seasoned traveler. You pick the places, and we calculate the optimal route, days, and cost.
              </p>
            </div>
            <div className="text-stone-700 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn How It Works <ArrowRight className="w-4 h-4" />
            </div>
          </Card>

        </div>
      </section>

      {/* 3. CATEGORY TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12 w-full shrink-0">
        <Heading level={2} className="mb-4">Places to Visit</Heading>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none md:justify-start">
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => setActiveTab(cat)}
              variant={activeTab === cat ? 'primary' : 'outline'}
              size="sm"
              className="rounded-full whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* 4. PLACES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6 w-full flex-1 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredData.map(item => (
            <PlaceCard key={item.id} item={item} onSelectPlace={() => router.push(`/explore/place/${item.id}`)} />
          ))}
        </motion.div>
      </section>

      {/* 5. MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 flex gap-3 md:justify-center">
        <Button 
          variant="ghost"
          onClick={() => router.push('/')}
          className="bg-stone-50"
        >
          Back Home
        </Button>
        <Button 
          variant="primary"
          onClick={() => router.push('/build')}
          className="flex-1 max-w-sm text-white flex items-center justify-center gap-2"
        >
          Start Planning 
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

    </div>
  );
}
