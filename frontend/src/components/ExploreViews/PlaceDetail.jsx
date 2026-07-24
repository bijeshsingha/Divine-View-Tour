import React from 'react';
import { ArrowLeft, MapPin, ExternalLink, Camera, PlayCircle, Calendar, Clock, IndianRupee, Info } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PlaceDetail({ place, onBack, onSelectPackageInfo }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  if (!place) return null;

  const isNohkalikai = place.id === 'p1';
  const isWariChora = place.id === 'p8';
  const isDzukou = place.id === 'p12';

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen animate-in fade-in duration-300 pb-28">
      
      {/* Floating Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-50"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Hero Media Section (Parallax) */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-slate-900 overflow-hidden shrink-0">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src={place.gallery && place.gallery[0] ? place.gallery[0] : '/images/placeholder.jpg'} 
            alt={place.title} 
            className="w-full h-full object-cover opacity-80" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {place.tags?.map((tag, idx) => (
                <span key={idx} className="bg-amber-500 text-slate-950 text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                  {tag}
                </span>
              ))}
              <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 border border-white/10">
                <MapPin className="w-3.5 h-3.5" /> {place.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{place.title}</h1>
          </div>
        </div>
      </div>

      {/* Content Section (2-Column Grid) */}
      <div className="max-w-7xl w-full mx-auto p-6 md:p-8 md:px-12 relative z-20 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column */}
          <div className="md:col-span-8 space-y-10">
            
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this spot</h2>
              {isNohkalikai ? (
                <>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    Cascading from a staggering height of 1,115 feet, Nohkalikai Falls is India's tallest plunge waterfall and one of Meghalaya's most awe-inspiring sights. Fed purely by rainwater collected on a small upland plateau, the waterfall plunges dramatically off a cliff into a deep pool below. During the drier winter months, this plunge pool settles to reveal a stunning, vivid turquoise or gemstone-blue color.
                  </p>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">The Legend of Ka Likai</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    The name Nohkalikai translates to "The Leap of Likai" in the local Khasi language. The falls are named after a tragic local legend involving a young widowed mother named Ka Likai, adding a deep emotional and cultural layer to the site's natural beauty.
                  </p>
                </>
              ) : isWariChora ? (
                <>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    Wari Chora is a hidden paradise nestled in the deep jungles of the South Garo Hills. Surrounded by towering canyons, visitors can paddle through the tranquil, crystal-clear turquoise waters of the Rongdik River. It is highly remote, requiring a thrilling 45-minute off-road 4x4 drive and a hike to reach the gorge.
                  </p>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">The Legend</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    According to Garo legends, Wari Chora is a sacred resting ground for seven giant serpent gods who protect the region.
                  </p>
                </>
              ) : isDzukou ? (
                <>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    Often called the "Valley of Flowers of the Northeast," Dzukou Valley sits right on the border of Nagaland and Manipur. It features otherworldly, vast rolling green hills and deep winding streams.
                  </p>
                </>
              ) : (
                <p className="text-slate-600 leading-relaxed text-lg">
                  {place.description}
                </p>
              )}
            </section>

            {/* Masonry Media Grid */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[400px]">
                <div className="md:col-span-2 h-[300px] md:h-full rounded-2xl overflow-hidden relative group">
                  {place.videoPlaceholder ? (
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src={place.videoPlaceholder} 
                      title="Video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  ) : (
                    <img src={place.gallery?.[0] || '/images/placeholder.jpg'} alt="Main gallery" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                </div>
                <div className="hidden md:flex flex-col gap-4 h-full">
                  <div className="flex-1 rounded-2xl overflow-hidden relative group">
                    <img src={place.gallery?.[1] || place.gallery?.[0] || '/images/placeholder.jpg'} alt="Gallery 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden relative group">
                    <img src={place.gallery?.[2] || place.gallery?.[0] || '/images/placeholder.jpg'} alt="Gallery 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </section>

            {isNohkalikai && (
              <section className="bg-emerald-50 rounded-3xl p-6 md:p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-emerald-600" /> Best Time to Visit
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-bold text-emerald-800">Monsoon (June to September):</span>
                    <span className="text-emerald-700 ml-2">This is the best time to witness the raw, roaring power of the falls as the water volume is at its peak. However, dense fog can occasionally obscure the view.</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800">Post-Monsoon & Winter (October to April):</span>
                    <span className="text-emerald-700 ml-2">The water flow decreases, but you are rewarded with clear blue skies, excellent visibility for photography, and the distinct turquoise color of the plunge pool.</span>
                  </div>
                </div>
              </section>
            )}

            {isDzukou && (
              <section className="bg-emerald-50 rounded-3xl p-6 md:p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-emerald-600" /> Best Time to Visit
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-bold text-emerald-800">June to September (Monsoon):</span>
                    <span className="text-emerald-700 ml-2">The monsoon season when the valley turns lush green and the rare, endemic pink-white Dzukou Lily is in full bloom.</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800">October to November:</span>
                    <span className="text-emerald-700 ml-2">Offers clear skies, crisp weather, and golden landscapes.</span>
                  </div>
                </div>
              </section>
            )}

            {isNohkalikai && (
              <section className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-100">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-amber-600" /> Pro-Tips for Visitors
                </h3>
                <ul className="space-y-2 list-disc list-inside text-amber-800">
                  <li>Cherrapunji's weather is highly unpredictable; carrying a light rain jacket or umbrella is highly recommended.</li>
                  <li>Mornings are generally better for visiting to avoid afternoon clouds and to capture the best photography lighting.</li>
                  <li>The viewing gallery area is well-maintained and features small local stalls selling tea, snacks, and traditional handmade souvenirs.</li>
                </ul>
              </section>
            )}

            <section className="flex flex-col sm:flex-row gap-4 pt-4">
              {place.googleMapsUrl && (
                <a 
                  href={place.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MapPin className="w-5 h-5" /> Open in Google Maps
                </a>
              )}
              {place.instagramUrl && (
                <a 
                  href={place.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl hover:border-pink-400 hover:text-pink-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Camera className="w-5 h-5" /> View on Instagram
                </a>
              )}
            </section>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-8 space-y-6">
              
              {/* Quick Facts Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Facts</h3>
                
                {isNohkalikai ? (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Info className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Height & Record</div>
                        <div className="font-medium text-slate-900 mt-1">1,115 feet (340 meters). The tallest plunge waterfall in India.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Entry & Camera Fee</div>
                        <div className="font-medium text-slate-900 mt-1">₹20 per person. ₹20 additional charge for cameras.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Timings & Duration</div>
                        <div className="font-medium text-slate-900 mt-1">9:00 AM to 5:00 PM. Typically spend 1 to 2 hours here.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Location</div>
                        <div className="font-medium text-slate-900 mt-1">5 km from Cherrapunji town.</div>
                      </div>
                    </div>
                  </div>
                ) : isWariChora ? (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Info className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Activity</div>
                        <div className="font-medium text-slate-900 mt-1">Kayaking, Canoeing, Short Trek.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Terrain & Base</div>
                        <div className="font-medium text-slate-900 mt-1">Rugged off-road drive followed by 30-45 min steep trek. Base: Emangre.</div>
                      </div>
                    </div>
                  </div>
                ) : isDzukou ? (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Duration & Difficulty</div>
                        <div className="font-medium text-slate-900 mt-1">2 Days / 1 Night. Easy-Moderate (steep initial climb of 1.5–3 hours).</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Altitude & Start</div>
                        <div className="font-medium text-slate-900 mt-1">~8,000 ft. Starts from Viswema (gentler) or Zakhama (steeper).</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-5 h-5 text-brand-dark" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Entry Fee</div>
                        <div className="font-medium text-slate-900 mt-1">~₹30 per person.</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <p className="text-slate-500 text-sm italic">Quick facts specific to this location are coming soon.</p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button 
                    onClick={onSelectPackageInfo}
                    className="w-full bg-slate-900 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-center"
                  >
                    View Tour Packages
                  </button>
                </div>
              </div>

              {/* Package Badge */}
              {place.packageLinked && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-amber-900 mb-2">Want to visit here without the hassle?</h3>
                  <p className="text-amber-800 text-sm">
                    This spot is included in our <strong>{place.packageLinked}</strong>. Select the "Readymade Tour Packages" option on the Explore page to learn more.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
