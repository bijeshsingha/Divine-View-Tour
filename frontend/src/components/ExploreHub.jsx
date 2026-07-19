import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mountain, Droplets, Sun, Compass } from 'lucide-react';

export default function ExploreHub() {
  const packages = [
    {
      title: "Cherrapunji (Sohra) Circuit",
      desc: "Witness the majestic Nohsngithiang Falls plunging down limestone cliffs and explore the wettest place on earth.",
      image: "/assets/cherrapunji.webp",
      icon: <Sun className="w-5 h-5 text-brand" />
    },
    {
      title: "Dawki & Crystal River",
      desc: "Float on the transparent, turquoise waters of the Umngot River surrounded by steep, moss-covered gorges.",
      image: "/assets/dawki_river.webp",
      icon: <Droplets className="w-5 h-5 text-brand" />
    },
    {
      title: "Adventure & Caving",
      desc: "Go off the beaten path into hidden grottos and Asia's deepest cave systems for a thrilling expedition.",
      image: "/assets/adventure_caving.webp",
      icon: <Compass className="w-5 h-5 text-brand" />
    },
    {
      title: "Shillong Viewpoints",
      desc: "Take in the sweeping views of valleys and green hills from the famous Laitlum Canyons.",
      image: "/assets/shillong_viewpoints.webp",
      icon: <Mountain className="w-5 h-5 text-brand" />
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col items-center">
      {/* Hero Header */}
      <div className="w-full h-72 bg-slate-800 relative overflow-hidden flex items-center justify-center">
        <img 
          src="/assets/cherrapunji.webp" 
          alt="Cherrapunji Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="z-20 text-center px-6 mt-12">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Divine View Tours</h1>
          <p className="text-slate-200 text-lg font-medium">Discover the untouched beauty of the Northeast.</p>
        </div>
      </div>
      
      <div className="w-full max-w-md -mt-10 z-30 px-4 space-y-6 pb-24">
        
        {/* Showcase Cards */}
        <div className="space-y-5">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden group">
              <div className="h-48 w-full relative overflow-hidden bg-slate-200">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <h2 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                  {pkg.icon} {pkg.title}
                </h2>
              </div>
              <div className="p-5">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pkg.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-brand-dark p-6 rounded-3xl shadow-lg text-center mt-8">
           <h3 className="text-2xl font-bold text-white mb-2">Ready to plan?</h3>
           <p className="text-brand-light/80 mb-6 text-sm">Build your custom itinerary in 60 seconds.</p>
           <Link 
             to="/build"
             className="flex w-full h-14 items-center justify-center gap-2 bg-brand text-black font-bold text-lg rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all"
           >
             Build My Trip <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </div>
    </div>
  );
}
