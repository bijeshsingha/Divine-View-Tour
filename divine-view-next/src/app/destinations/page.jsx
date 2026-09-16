import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Clock, Shield } from "lucide-react";
import destinationsData from "@/data/destinationsData.json";

export const metadata = {
  title: "Northeast India Destinations | Assam, Meghalaya, Arunachal & Dzukou",
  description:
    "Discover the four premier travel regions of Northeast India. Explore Meghalaya waterfalls, Arunachal mountain monasteries, Kaziranga wildlife, and Dzukou Valley trekking.",
};

export default function DestinationsIndexPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] pt-24 pb-20">
      {/* Header Banner */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl">
          <span className="badge-forest mb-2">Regional Exploration</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#103F36]">
            Destinations of the Northeast
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3 leading-relaxed">
            Each region features distinct terrain, local tribal cultures, and road conditions. Compare travel durations, seasonal windows, and permit regulations for routes starting from our Guwahati base.
          </p>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {destinationsData.map((dest, idx) => (
          <div
            key={dest.id}
            className="bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#DEDCCD] shadow-sm flex flex-col lg:flex-row group hover:shadow-xl transition-all"
          >
            {/* Image Column */}
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[420px] bg-[#082D27] overflow-hidden">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="badge-gold text-xs shadow-sm">{dest.regionLabel}</span>
              </div>
              {dest.heroCaption && (
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="caption-bar text-xs bg-black/50 border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                    {dest.heroCaption}
                  </span>
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-[#103F36]">
                    {dest.name}
                  </h2>
                  <p className="text-sm text-[#D9A441] font-semibold tracking-wide mt-1">
                    {dest.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#59665E] leading-relaxed">
                  {dest.summary}
                </p>

                {/* Key Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD]">
                    <div className="flex items-center gap-1.5 font-bold text-[#103F36] mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                      Suggested Duration
                    </div>
                    <div className="text-[#59665E]">{dest.suggestedDays}</div>
                  </div>

                  <div className="bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD]">
                    <div className="flex items-center gap-1.5 font-bold text-[#103F36] mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                      Best Travel Window
                    </div>
                    <div className="text-[#59665E] line-clamp-1">{dest.bestSeason.months}</div>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                    Top Highlights
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 4).map((h, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#E9F0EA] text-[#103F36] font-medium px-2.5 py-1 rounded-lg"
                      >
                        {h.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-[#DEDCCD] flex flex-wrap items-center gap-3">
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="btn-gold !py-2.5 !px-5 text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Explore {dest.name} Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {dest.slug === "dzukou-valley" && (
                  <Link
                    href="/dzukoufieldnotes"
                    className="bg-[#0D241C] hover:bg-[#173B2E] text-[#D9A441] border border-[#D9A441]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Trail Field Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <Link
                  href={`/packages?dest=${dest.slug}`}
                  className="btn-outline-forest !py-2.5 !px-4 text-xs sm:text-sm"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
