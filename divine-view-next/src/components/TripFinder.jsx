"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Car,
  Compass,
  Info,
  CheckCircle2
} from "lucide-react";

export default function TripFinder() {
  const router = useRouter();

  // Mode: "packages" | "car-rental" | "custom-trip"
  const [tripMode, setTripMode] = useState("packages");
  const [destination, setDestination] = useState("all");
  const [month, setMonth] = useState("flexible");
  const [travellers, setTravellers] = useState("2");

  // Dynamic recommendations based on selections
  const dynamicInsight = useMemo(() => {
    // Destination micro-insight
    let destText = "";
    if (destination === "meghalaya") {
      destText = "Meghalaya: Cherrapunji waterfalls, Dawki crystal river & living root bridges.";
    } else if (destination === "arunachal-pradesh") {
      destText = "Arunachal: Sela Pass (13,700 ft) & Tawang Monastery. Inner Line Permit assisted by us.";
    } else if (destination === "assam") {
      destText = "Assam: Kaziranga rhino jeep/elephant safaris, Majuli island & tea estates.";
    } else if (destination === "dzukou-valley") {
      destText = "Dzukou Valley: High-altitude border trek. Ideal for active hikers.";
    }

    // Vehicle recommendation based on travellers
    let vehicleText = "";
    if (travellers === "1" || travellers === "2") {
      vehicleText = "Recommended: Dedicated AC Sedan (Swift Dzire / Etios)";
    } else if (travellers === "4") {
      vehicleText = "Recommended: Maruti Ertiga MUV (Comfortable for 3 to 4 with luggage)";
    } else if (travellers === "6") {
      vehicleText = "Recommended: Toyota Innova Crysta (Spacious captain seats for hills)";
    } else if (travellers === "8") {
      vehicleText = "Recommended: Luxury 13-Seater Tempo Traveller";
    }

    // Seasonal insight
    let seasonText = "";
    if (month === "october" || month === "november") {
      seasonText = "Peak Autumn: Clear mountain views & pleasant weather.";
    } else if (month === "december" || month === "january" || month === "february") {
      seasonText = "Winter season: Snow at Sela Pass & Kaziranga wildlife safari in full swing.";
    } else if (month === "march" || month === "april") {
      seasonText = "Spring bloom: Orchids & rhododendrons across the hills.";
    } else if (month === "may-sep") {
      seasonText = "Monsoon season: Meghalaya waterfalls at maximum power.";
    }

    return {
      destText,
      vehicleText,
      seasonText,
      hasDetails: Boolean(destText || seasonText || vehicleText),
    };
  }, [destination, month, travellers]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (destination && destination !== "all") params.append("dest", destination);
    if (month && month !== "flexible") params.append("month", month);
    if (travellers) params.append("travellers", travellers);

    if (tripMode === "car-rental") {
      router.push(`/vehicle-hire?${params.toString()}`);
    } else if (tripMode === "custom-trip") {
      router.push(`/custom-trip?${params.toString()}`);
    } else {
      router.push(`/packages?${params.toString()}`);
    }
  };

  const getButtonText = () => {
    if (tripMode === "car-rental") return "View Car Tariffs";
    if (tripMode === "custom-trip") return "Plan Custom Trip";
    return "Find Journeys";
  };

  return (
    <div className="w-full bg-[#FFFDF7] rounded-3xl shadow-xl shadow-black/8 border border-[#DEDCCD] p-4 sm:p-6 lg:p-7 transition-all">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Top Header & Mode Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#DEDCCD]/70">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36] leading-tight flex items-center gap-2">
              <span>Find your journey</span>
              <span className="text-xs font-sans font-normal text-[#59665E] hidden sm:inline">
                Guwahati, Assam and Northeast India
              </span>
            </h2>
          </div>

          {/* Service Mode Selector */}
          <div className="inline-flex bg-[#F7F3E9] p-1 rounded-xl border border-[#DEDCCD] text-xs font-semibold text-[#59665E] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setTripMode("packages")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                tripMode === "packages"
                  ? "bg-[#103F36] text-[#F7F3E9] shadow-sm font-bold"
                  : "hover:text-[#172C26]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Holiday Packages</span>
            </button>

            <button
              type="button"
              onClick={() => setTripMode("car-rental")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                tripMode === "car-rental"
                  ? "bg-[#103F36] text-[#F7F3E9] shadow-sm font-bold"
                  : "hover:text-[#172C26]"
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Private Car Hire</span>
            </button>

            <button
              type="button"
              onClick={() => setTripMode("custom-trip")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                tripMode === "custom-trip"
                  ? "bg-[#103F36] text-[#F7F3E9] shadow-sm font-bold"
                  : "hover:text-[#172C26]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Custom Trip</span>
            </button>
          </div>
        </div>

        {/* Segmented Inputs Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 bg-[#F7F3E9] rounded-2xl border border-[#DEDCCD] p-2">
          {/* Destination Segment */}
          <div className="px-3.5 py-2 flex flex-col justify-center bg-white/70 hover:bg-white rounded-xl border border-[#DEDCCD]/50 transition-colors">
            <label
              htmlFor="finder-dest"
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#59665E]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Destination</span>
            </label>
            <select
              id="finder-dest"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-[#172C26] font-semibold text-xs sm:text-sm pt-0.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All Destinations</option>
              <option value="meghalaya">Meghalaya (Shillong, Cherrapunji)</option>
              <option value="arunachal-pradesh">Arunachal Pradesh (Tawang)</option>
              <option value="assam">Assam (Kaziranga, Majuli)</option>
              <option value="dzukou-valley">Dzukou Valley Trek</option>
            </select>
          </div>

          {/* Travel Month Segment */}
          <div className="px-3.5 py-2 flex flex-col justify-center bg-white/70 hover:bg-white rounded-xl border border-[#DEDCCD]/50 transition-colors">
            <label
              htmlFor="finder-month"
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#59665E]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Travel Month</span>
            </label>
            <select
              id="finder-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-transparent text-[#172C26] font-semibold text-xs sm:text-sm pt-0.5 focus:outline-none cursor-pointer"
            >
              <option value="flexible">Any Month (Flexible)</option>
              <option value="october">October (Autumn Peak)</option>
              <option value="november">November</option>
              <option value="december">December (Winter Snow)</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March (Spring Bloom)</option>
              <option value="april">April</option>
              <option value="may-sep">May to Sep (Monsoon Waterfalls)</option>
            </select>
          </div>

          {/* Travellers Segment */}
          <div className="px-3.5 py-2 flex flex-col justify-center bg-white/70 hover:bg-white rounded-xl border border-[#DEDCCD]/50 transition-colors">
            <label
              htmlFor="finder-travellers"
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#59665E]"
            >
              <Users className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Travellers & Vehicle</span>
            </label>
            <select
              id="finder-travellers"
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full bg-transparent text-[#172C26] font-semibold text-xs sm:text-sm pt-0.5 focus:outline-none cursor-pointer"
            >
              <option value="1">1 Solo Traveller (Sedan)</option>
              <option value="2">2 Travellers (Sedan)</option>
              <option value="4">3 to 4 Travellers (Ertiga MUV)</option>
              <option value="6">5 to 6 Travellers (Innova Crysta)</option>
              <option value="8">7+ Travellers (Tempo Traveller)</option>
            </select>
          </div>

          {/* Action CTA Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="w-full h-full min-h-[48px] bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>{getButtonText()}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Live Dynamic Helper Bar */}
        <div className="bg-[#103F36]/5 rounded-xl p-3 border border-[#103F36]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#103F36]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#237A50] shrink-0" />
            <span className="font-semibold text-[#103F36]">
              {dynamicInsight.vehicleText}
            </span>
          </div>

          {dynamicInsight.destText && (
            <div className="text-[11px] text-[#59665E] sm:text-right">
              {dynamicInsight.destText}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
