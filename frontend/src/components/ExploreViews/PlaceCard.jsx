import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, MapPin } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export default function PlaceCard({ item, onSelectPlace }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      className="text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-xl transition-all group cursor-pointer"
      onClick={() => onSelectPlace(item)}
    >
      <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
        {item.videoPlaceholder ? (
          <div className="relative w-full h-full group">
            {/* Displaying an image placeholder with a play button for better UX on card list */}
            {item.gallery && item.gallery[0] ? (
              <img src={item.gallery[0]} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <span className="text-slate-500">Video</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        ) : item.gallery && item.gallery.length > 1 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full h-full">
            {item.gallery.map((imgUrl, idx) => (
              <img 
                key={idx} 
                src={imgUrl} 
                alt={`${item.title} ${idx + 1}`} 
                className="w-full h-full object-cover shrink-0 snap-center" 
              />
            ))}
          </div>
        ) : (
          <img 
            src={item.gallery && item.gallery[0] ? item.gallery[0] : '/images/placeholder.jpg'} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        )}
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.tags?.map((tag, idx) => (
            <span key={idx} className="bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{item.title}</h3>
          <div className="flex items-center gap-1 text-slate-500 text-sm mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{item.description}</p>
        </div>
        <div className="mt-5 text-amber-600 font-bold text-sm flex items-center gap-1 group-hover:text-amber-700 transition-colors">
          View Details <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
