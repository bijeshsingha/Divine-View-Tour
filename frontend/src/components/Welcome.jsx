import React from 'react';
import { Sparkles, Map, Star, ChevronRight } from 'lucide-react';

export default function Welcome({ onStart }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white selection:bg-brand selection:text-black">
      
      {/* Background Image with slow scale effect for dynamism */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop")',
        }}
      />
      
      {/* Dark Overlay Gradient (Darker on the left for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent sm:bg-gradient-to-r sm:from-black/90 sm:via-black/50 sm:to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 md:py-12 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 h-full">
        
        {/* Left Side: Hero Text */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-2xl mt-4 md:mt-0">
          
          {/* Mobile Logo (Shown only on small screens) */}
          <div className="flex justify-center lg:hidden z-20 mb-4 md:mb-8 animate-in fade-in zoom-in duration-700">
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center">
                <img src="/logo.svg" alt="Divine View Tours Logo" className="w-full h-full scale-110 object-contain drop-shadow-2xl" />
              </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-slate-200">The Ultimate Northeast Experience</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Discover the <br className="hidden sm:block" />
            <span className="text-brand inline-block drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]">Divine View</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-10 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Curated journeys through the misty hills of Meghalaya and the vibrant heart of Guwahati. Build your perfect custom itinerary in under 60 seconds.
          </p>

          <div className="w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
             <button 
                onClick={onStart}
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-brand hover:bg-brand-light text-black font-black text-xl py-5 px-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Planning <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
          </div>

          <div className="mt-6 md:mt-10 flex items-center justify-center md:justify-start gap-8 animate-in fade-in duration-700 delay-500">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-brand fill-brand" />
              <div className="text-left">
                <p className="font-bold text-white text-sm">4.9/5</p>
                <p className="text-xs text-slate-400">Guest Ratings</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-brand" />
              <div className="text-left">
                <p className="font-bold text-white text-sm">100%</p>
                <p className="text-xs text-slate-400">Local Experts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Floating Logo Glass Card */}
        <div className="hidden lg:flex flex-1 justify-center items-center animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="w-80 h-80 xl:w-[28rem] xl:h-[28rem] flex items-center justify-center relative group shrink-0">
            {/* Ambient glow behind logo */}
            <div className="absolute inset-0 bg-brand/20 rounded-full blur-3xl group-hover:bg-brand/30 transition-colors duration-500 opacity-50"></div>
            <img src="/logo.svg" alt="Divine View" className="w-full h-full scale-110 object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        
        
      </div>
    </div>
  );
}
