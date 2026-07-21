import React from 'react';
import { ArrowLeft, MapPin, ExternalLink, Camera } from 'lucide-react';

export default function PlaceDetail({ place, onBack }) {
  if (!place) return null;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen animate-in fade-in slide-in-from-right-4 duration-300 pb-28">
      
      {/* Floating Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-20"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Hero Media Section */}
      <div className="relative w-full h-72 md:h-96 bg-slate-900">
        <img 
          src={place.image} 
          alt={place.title} 
          className="w-full h-full object-cover opacity-80" 
        />
        {/* Placeholder for video play icon if video existed */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-500 text-slate-950 text-xs px-2.5 py-1 rounded-full font-bold">
              {place.category}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {place.region}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">{place.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">About this spot</h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            {place.description}
          </p>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mt-4">
            This stunning location is a must-see for anyone traveling through the region. It offers a perfect blend of natural beauty and cultural significance. 
            (Note: This is a placeholder description since full content is pending).
          </p>
        </section>

        {/* Video Placeholder */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Experience It</h2>
          <div className="w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden relative group">
            {/* Using a stock video iframe placeholder */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </section>

        {/* Links Section */}
        <section className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
          <a 
            href={place.googleMapsUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex-1 bg-blue-50 text-blue-700 font-bold py-4 px-6 rounded-2xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" /> Open in Google Maps
          </a>
          <a 
            href={place.instagramUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex-1 bg-pink-50 text-pink-700 font-bold py-4 px-6 rounded-2xl hover:bg-pink-100 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" /> View on Instagram
          </a>
        </section>

        {/* Pro Tip Badge */}
        {place.proTip && (
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              {place.proTip}
            </p>
          </section>
        )}

        {/* Package Badge */}
        {place.packageLinked && (
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-amber-900 mb-2">💡 Want to visit here without the hassle?</h3>
            <p className="text-amber-800 text-sm">
              This spot is included in our <strong>{place.packageLinked}</strong>. Select the "Readymade Tour Packages" option to learn more.
            </p>
          </section>
        )}

      </div>
    </div>
  );
}
