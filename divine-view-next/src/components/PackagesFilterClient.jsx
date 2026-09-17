"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Filter,
  RotateCcw,
  Search,
  ArrowRight,
  Compass,
  MapPin,
  Calendar,
  Users,
  X,
  CheckCircle2
} from "lucide-react";
import PackageCard from "@/components/PackageCard";

export default function PackagesFilterClient({ initialPackages }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL query params
  const initialDest = searchParams.get("dest") || "all";
  const initialMonth = searchParams.get("month") || "flexible";
  const initialTravellers = searchParams.get("travellers") || "2";
  const initialDuration = searchParams.get("duration") || "all";
  const initialStyle = searchParams.get("style") || "all";

  const [selectedDest, setSelectedDest] = useState(initialDest);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedTravellers, setSelectedTravellers] = useState(initialTravellers);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);

  // Keep state in sync if URL query changes
  useEffect(() => {
    setSelectedDest(searchParams.get("dest") || "all");
    setSelectedMonth(searchParams.get("month") || "flexible");
    setSelectedTravellers(searchParams.get("travellers") || "2");
    setSelectedDuration(searchParams.get("duration") || "all");
    setSelectedStyle(searchParams.get("style") || "all");
  }, [searchParams]);

  // Destination labels dictionary
  const destNames = {
    meghalaya: "Meghalaya",
    "arunachal-pradesh": "Arunachal Pradesh",
    assam: "Assam & Kaziranga",
    "dzukou-valley": "Dzukou Valley",
  };

  const monthNames = {
    october: "October",
    november: "November",
    december: "December",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    "may-sep": "Monsoon (May to Sep)",
  };

  const travellerLabels = {
    "1": "1 Traveller (Solo)",
    "2": "2 Travellers (Couple)",
    "4": "3 to 4 Travellers",
    "6": "5 to 6 Travellers",
    "8": "7+ Travellers (Group)",
  };

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

  const updateFilters = (newParams) => {
    const params = new URLSearchParams();
    const currentDest = newParams.dest !== undefined ? newParams.dest : selectedDest;
    const currentMonth = newParams.month !== undefined ? newParams.month : selectedMonth;
    const currentTravellers = newParams.travellers !== undefined ? newParams.travellers : selectedTravellers;
    const currentDuration = newParams.duration !== undefined ? newParams.duration : selectedDuration;
    const currentStyle = newParams.style !== undefined ? newParams.style : selectedStyle;

    if (currentDest && currentDest !== "all") params.append("dest", currentDest);
    if (currentMonth && currentMonth !== "flexible") params.append("month", currentMonth);
    if (currentTravellers && currentTravellers !== "2") params.append("travellers", currentTravellers);
    if (currentDuration && currentDuration !== "all") params.append("duration", currentDuration);
    if (currentStyle && currentStyle !== "all") params.append("style", currentStyle);

    router.push(`/packages${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const resetFilters = () => {
    setSelectedDest("all");
    setSelectedMonth("flexible");
    setSelectedTravellers("2");
    setSelectedDuration("all");
    setSelectedStyle("all");
    router.push("/packages");
  };

  const hasActiveFilters =
    selectedDest !== "all" ||
    selectedMonth !== "flexible" ||
    selectedTravellers !== "2" ||
    selectedDuration !== "all" ||
    selectedStyle !== "all";

  return (
    <div className="space-y-8">
      {/* Active Filter Chips Banner */}
      {hasActiveFilters && (
        <div className="bg-[#103F36]/5 border border-[#103F36]/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#103F36] mr-1">
              Active search:
            </span>

            {selectedDest !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-[#103F36] text-[#F7F3E9] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                <MapPin className="w-3 h-3 text-[#D9A441]" />
                <span>{destNames[selectedDest] || selectedDest}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDest("all");
                    updateFilters({ dest: "all" });
                  }}
                  className="hover:text-[#D9A441] ml-0.5"
                  aria-label="Remove destination filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedMonth !== "flexible" && (
              <span className="inline-flex items-center gap-1.5 bg-[#103F36] text-[#F7F3E9] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                <Calendar className="w-3 h-3 text-[#D9A441]" />
                <span>{monthNames[selectedMonth] || selectedMonth}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMonth("flexible");
                    updateFilters({ month: "flexible" });
                  }}
                  className="hover:text-[#D9A441] ml-0.5"
                  aria-label="Remove month filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedTravellers !== "2" && (
              <span className="inline-flex items-center gap-1.5 bg-[#103F36] text-[#F7F3E9] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                <Users className="w-3 h-3 text-[#D9A441]" />
                <span>{travellerLabels[selectedTravellers] || `${selectedTravellers} Travellers`}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTravellers("2");
                    updateFilters({ travellers: "2" });
                  }}
                  className="hover:text-[#D9A441] ml-0.5"
                  aria-label="Reset travellers count"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedDuration !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-[#103F36] text-[#F7F3E9] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                <span>Duration: {selectedDuration} Days</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDuration("all");
                    updateFilters({ duration: "all" });
                  }}
                  className="hover:text-[#D9A441] ml-0.5"
                  aria-label="Remove duration filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedStyle !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-[#103F36] text-[#F7F3E9] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                <span>Style: {selectedStyle}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStyle("all");
                    updateFilters({ style: "all" });
                  }}
                  className="hover:text-[#D9A441] ml-0.5"
                  aria-label="Remove style filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-[#59665E] hover:text-[#103F36] inline-flex items-center gap-1 shrink-0 self-start sm:self-auto underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all
          </button>
        </div>
      )}

      {/* Main Filter Bar */}
      <div className="bg-[#FFFDF7] p-5 sm:p-6 rounded-3xl border border-[#DEDCCD] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DEDCCD]">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#D9A441]" />
            <h2 className="font-serif text-lg font-bold text-[#103F36]">
              Filter Holiday Packages
            </h2>
            <span className="badge-forest text-xs ml-2">
              {filtered.length} {filtered.length === 1 ? "tour" : "tours"} available
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#59665E] hover:text-[#D9A441] inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Destination */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#59665E]">
              Destination
            </label>
            <select
              value={selectedDest}
              onChange={(e) => {
                setSelectedDest(e.target.value);
                updateFilters({ dest: e.target.value });
              }}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="all">All Destinations</option>
              <option value="meghalaya">Meghalaya</option>
              <option value="arunachal-pradesh">Arunachal Pradesh</option>
              <option value="assam">Assam & Kaziranga</option>
              <option value="dzukou-valley">Dzukou Valley Trek</option>
            </select>
          </div>

          {/* Travel Month */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#59665E]">
              Travel Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                updateFilters({ month: e.target.value });
              }}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="flexible">Any Month (Flexible)</option>
              <option value="october">October (Autumn)</option>
              <option value="november">November</option>
              <option value="december">December (Winter Snow)</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March (Spring)</option>
              <option value="april">April</option>
              <option value="may-sep">Monsoon (Waterfalls)</option>
            </select>
          </div>

          {/* Travellers */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#59665E]">
              Group Size
            </label>
            <select
              value={selectedTravellers}
              onChange={(e) => {
                setSelectedTravellers(e.target.value);
                updateFilters({ travellers: e.target.value });
              }}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="1">1 Solo Traveller</option>
              <option value="2">2 Travellers (Couple)</option>
              <option value="4">3 to 4 Travellers</option>
              <option value="6">5 to 6 Travellers</option>
              <option value="8">7+ Travellers</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#59665E]">
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => {
                setSelectedDuration(e.target.value);
                updateFilters({ duration: e.target.value });
              }}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
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
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#59665E]">
              Travel Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => {
                setSelectedStyle(e.target.value);
                updateFilters({ style: e.target.value });
              }}
              className="w-full bg-[#F7F3E9] text-[#172C26] text-xs font-medium rounded-xl px-3 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <option value="all">All Styles</option>
              <option value="Scenic">Scenic & Waterfalls</option>
              <option value="Nature">Nature & Living Roots</option>
              <option value="Wildlife">Wildlife & Safari</option>
              <option value="Mountain">High Passes & Snow</option>
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
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              travellers={selectedTravellers}
              month={selectedMonth}
            />
          ))}
        </div>
      ) : (
        /* Friendly Empty State with Custom Trip Route */
        <div className="bg-[#FFFDF7] rounded-3xl p-10 sm:p-14 text-center border border-[#DEDCCD] shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E9F0EA] text-[#103F36] flex items-center justify-center mx-auto">
            <Compass className="w-7 h-7 text-[#D9A441]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#103F36]">
            No standard tour matches this combination
          </h3>
          <p className="text-sm text-[#59665E] leading-relaxed">
            Our Guwahati travel desk can customize any route, duration, or pace specifically for your group.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={`/custom-trip?dest=${selectedDest !== "all" ? selectedDest : "meghalaya"}&month=${selectedMonth !== "flexible" ? selectedMonth : "October"}&travellers=${selectedTravellers}`}
              className="btn-gold !py-2.5 !px-6 text-sm"
            >
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
