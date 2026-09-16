"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Filter, RotateCcw, Search, ArrowRight, Sparkles } from "lucide-react";
import PackageCard from "@/components/PackageCard";

export default function PackagesFilterClient({ initialPackages }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL query params
  const initialDest = searchParams.get("dest") || "all";
  const initialDuration = searchParams.get("duration") || "all";
  const initialStyle = searchParams.get("style") || "all";

  const [selectedDest, setSelectedDest] = useState(initialDest);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);

  // Filter packages
  const filtered = useMemo(() => {
    return initialPackages.filter((pkg) => {
      // Destination filter
      if (selectedDest !== "all" && pkg.destination !== selectedDest) {
        return false;
      }

      // Duration filter
      if (selectedDuration === "3-5" && (pkg.durationDays < 3 || pkg.durationDays > 5)) {
        return false;
      }
      if (selectedDuration === "6-8" && (pkg.durationDays < 6 || pkg.durationDays > 8)) {
        return false;
      }
      if (selectedDuration === "9-12" && (pkg.durationDays < 9 || pkg.durationDays > 12)) {
        return false;
      }
      if (selectedDuration === "13+" && pkg.durationDays < 13) {
        return false;
      }

      // Style filter
      if (selectedStyle !== "all" && !pkg.travelStyles.includes(selectedStyle)) {
        return false;
      }

      return true;
    });
  }, [initialPackages, selectedDest, selectedDuration, selectedStyle]);

  const resetFilters = () => {
    setSelectedDest("all");
    setSelectedDuration("all");
    setSelectedStyle("all");
    router.push("/packages");
  };

  return (
    <div className="space-y-10">
      {/* Filter Bar */}
      <div className="bg-[#FFFDF7] p-5 sm:p-6 rounded-2xl border border-[#DEDCCD] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#DEDCCD]">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#D9A441]" />
            <h2 className="font-serif text-lg font-bold text-[#103F36]">
              Filter Holiday Packages
            </h2>
            <span className="badge-forest text-xs ml-2">
              {filtered.length} {filtered.length === 1 ? "tour" : "tours"} available
            </span>
          </div>

          {(selectedDest !== "all" || selectedDuration !== "all" || selectedStyle !== "all") && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#59665E] hover:text-[#D9A441] inline-flex items-center gap-1 self-start lg:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Destination */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
              Destination
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-sm rounded-lg px-3 py-2 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="all">All Destinations</option>
              <option value="meghalaya">Meghalaya</option>
              <option value="arunachal-pradesh">Arunachal Pradesh</option>
              <option value="assam">Assam</option>
              <option value="dzukou-valley">Dzukou Valley Trek</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-sm rounded-lg px-3 py-2 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="all">Any Duration</option>
              <option value="3-5">3 to 5 Days</option>
              <option value="6-8">6 to 8 Days</option>
              <option value="9-12">9 to 12 Days</option>
              <option value="13+">13+ Days</option>
            </select>
          </div>

          {/* Travel Style */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
              Travel Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-sm rounded-lg px-3 py-2 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="all">All Travel Styles</option>
              <option value="Scenic">Scenic & Waterfalls</option>
              <option value="Nature">Nature & Living Roots</option>
              <option value="Wildlife">Wildlife & Safari</option>
              <option value="Mountain">High Himalayan Passes</option>
              <option value="Trek">Adventure Trekking</option>
              <option value="Culture">Culture & Monasteries</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        /* Friendly Empty State with Custom Trip Route */
        <div className="bg-[#FFFDF7] rounded-3xl p-10 sm:p-14 text-center border border-[#DEDCCD] shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E9F0EA] text-[#103F36] flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7 text-[#D9A441]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#103F36]">
            No pre-packaged itinerary matches this exact combination
          </h3>
          <p className="text-sm text-[#59665E] leading-relaxed">
            Don't worry — our Guwahati travel desk can customize any route, duration, or pace specifically for your group.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/custom-trip" className="btn-gold !py-2.5 !px-6 text-sm">
              Create a Custom Itinerary
            </Link>
            <button
              onClick={resetFilters}
              className="btn-outline-forest !py-2.5 !px-5 text-sm"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
