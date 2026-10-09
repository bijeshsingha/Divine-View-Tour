"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TripFinder() {
  const router = useRouter();

  // Mode: "packages" | "car-rental" | "custom-trip"
  const [tripMode, setTripMode] = useState("packages");
  const [destination, setDestination] = useState("all");
  const [month, setMonth] = useState("flexible");
  const [travellers, setTravellers] = useState("2");

  // Dynamic recommendations based on user selections
  const dynamicInsight = useMemo(() => {
    let destText = "";
    if (destination === "meghalaya") {
      destText = "Meghalaya: Cherrapunji waterfalls, Dawki crystal river & living root bridges.";
    } else if (destination === "arunachal-pradesh") {
      destText = "Arunachal: Sela Pass (13,700 ft) & Tawang Monastery. Inner Line Permit assisted.";
    } else if (destination === "assam") {
      destText = "Assam: Kaziranga rhino jeep & elephant safaris, Majuli island.";
    } else if (destination === "dzukou-valley") {
      destText = "Dzukou Valley: High-altitude seasonal trekking and camping.";
    }

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

    return {
      destText,
      vehicleText,
      hasDetails: Boolean(destText || vehicleText),
    };
  }, [destination, travellers]);

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
    <div className="w-full">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Standardised Understated Mode Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 border-b border-[#DDD7CA] text-sm overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            type="button"
            onClick={() => setTripMode("packages")}
            className={`pb-2.5 transition-colors cursor-pointer font-medium relative focus-ring-forest rounded-sm shrink-0 ${
              tripMode === "packages"
                ? "text-[#173D35] font-semibold"
                : "text-[#59665E] hover:text-[#173D35]"
            }`}
          >
            <span>Holiday Packages</span>
            {tripMode === "packages" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#173D35]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setTripMode("car-rental")}
            className={`pb-2.5 transition-colors cursor-pointer font-medium relative focus-ring-forest rounded-sm shrink-0 ${
              tripMode === "car-rental"
                ? "text-[#173D35] font-semibold"
                : "text-[#59665E] hover:text-[#173D35]"
            }`}
          >
            <span>Private Car Hire</span>
            {tripMode === "car-rental" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#173D35]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setTripMode("custom-trip")}
            className={`pb-2.5 transition-colors cursor-pointer font-medium relative focus-ring-forest rounded-sm shrink-0 ${
              tripMode === "custom-trip"
                ? "text-[#173D35] font-semibold"
                : "text-[#59665E] hover:text-[#173D35]"
            }`}
          >
            <span>Custom Trip</span>
            {tripMode === "custom-trip" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#173D35]" />
            )}
          </button>
        </div>

        {/* Controls and Helper Group */}
        <div>
          {/* Form Controls Aligned along Bottom Edge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-3.5 lg:gap-4">
            {/* Destination Field */}
            <div>
              <label htmlFor="finder-dest" className="form-label">
                Destination
              </label>
              <select
                id="finder-dest"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="form-control cursor-pointer"
              >
                <option value="all">All Destinations</option>
                <option value="meghalaya">Meghalaya (Shillong, Cherrapunji)</option>
                <option value="arunachal-pradesh">Arunachal Pradesh (Tawang)</option>
                <option value="assam">Assam (Kaziranga, Majuli)</option>
                <option value="dzukou-valley">Dzukou Valley Trek</option>
              </select>
            </div>

            {/* Travel Month Field */}
            <div>
              <label htmlFor="finder-month" className="form-label">
                Travel Month
              </label>
              <select
                id="finder-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="form-control cursor-pointer"
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

            {/* Travellers & Vehicle Field */}
            <div>
              <label htmlFor="finder-travellers" className="form-label">
                Travellers & Vehicle
              </label>
              <select
                id="finder-travellers"
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="form-control cursor-pointer"
              >
                <option value="1">1 Solo Traveller (Sedan)</option>
                <option value="2">2 Travellers (Sedan)</option>
                <option value="4">3 to 4 Travellers (Ertiga MUV)</option>
                <option value="6">5 to 6 Travellers (Innova Crysta)</option>
                <option value="8">7+ Travellers (Tempo Traveller)</option>
              </select>
            </div>

            {/* Submit Action: Aligned with controls */}
            <div>
              <span className="form-label invisible select-none hidden lg:block" aria-hidden="true">
                &nbsp;
              </span>
              <button
                type="submit"
                className="btn-primary w-full group"
              >
                <span>{getButtonText()}</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Vehicle recommendation: directly beneath column 3 on desktop, beneath field group on mobile */}
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-4 gap-3.5 lg:gap-4">
            <div className="lg:col-start-3 lg:col-span-2">
              <p className="text-[12px] sm:text-xs text-[#173D35] font-medium leading-tight">
                {dynamicInsight.vehicleText}
              </p>
            </div>
          </div>
        </div>

        {/* Concise Single Vehicle-Hire Link */}
        <div className="pt-3 border-t border-[#DDD7CA]/70 flex items-center">
          <Link
            href="/vehicle-hire"
            className="group inline-flex items-center text-xs sm:text-[13px] text-[#173D35] hover:text-[#C69A45] font-medium transition-colors"
          >
            <span>Looking for a car? View vehicle hire</span>
            <span className="ml-1 text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
