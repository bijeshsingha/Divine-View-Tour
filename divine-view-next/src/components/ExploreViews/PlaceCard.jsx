'use client';
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, PlayCircle, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export default function PlaceCard({ item, onSelectPlace }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      setActiveIndex(Math.round(scrollLeft / width));
    }
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        variants={cardVariants}
        style={{ rotateX, rotateY }}
        whileHover={{ y: -6 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 flex flex-col hover:shadow-2xl transition-shadow group cursor-pointer"
        onClick={() => onSelectPlace(item)}
      >
        <div className="relative h-56 w-full bg-foreground overflow-hidden">
          {item.videoPlaceholder ? (
            <div className="relative w-full h-full group">
              {item.gallery && item.gallery[0] ? (
                <Image src={item.gallery[0]} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              ) : (
                <div className="w-full h-full bg-foreground flex items-center justify-center">
                  <span className="text-background0">Video</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-secondary group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
          ) : item.gallery && item.gallery.length > 1 ? (
            <div className="relative w-full h-full">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full h-full"
              >
                {item.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="relative w-full h-full shrink-0 snap-center">
                    <Image 
                      src={imgUrl} 
                      alt={`${item.title} ${idx + 1}`} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>
              {/* Indicator Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                {item.gallery.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm ${activeIndex === idx ? 'bg-white scale-125' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image 
                src={item.gallery && item.gallery[0] ? item.gallery[0] : '/images/placeholder.jpg'} 
                alt={item.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20 pointer-events-none">
            {item.tags?.map((tag, idx) => (
              <span key={idx} className="bg-foreground/80 backdrop-blur-md text-secondary border border-secondary/30 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground line-clamp-1">{item.title}</h3>
          <div className="flex items-center gap-1 text-background0 text-sm mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">{item.description}</p>
        </div>
        <div className="mt-5 text-secondary font-bold text-sm flex items-center gap-1 group-hover:text-secondary-dark transition-colors">
          View Details <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
    </div>
  );
}
