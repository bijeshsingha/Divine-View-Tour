
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";

export default function TripFinder() {
  const router = useRouter();
  const [destination, setDestination] = useState("all");
  const [month, setMonth] = useState("flexible");
  const [travellers, setTravellers] = useState("2");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination && destination !== "all") params.append("dest", destination);
    if (month && month !== "flexible") params.append("month", month);
    if (travellers) params.append("travellers", travellers);

    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#FFFDF7] rounded-2xl shadow-xl shadow-black/8 border border-[#DEDCCD] p-4 sm:p-6 lg:px-8 lg:py-5 transition-all">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 xl:gap-8">
          {/* Left Title & Description */}
          <div className="xl:max-w-xs shrink-0">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36] leading-tight">
              Find your journey
            </h2>
            <p className="text-xs sm:text-sm text-[#59665E] mt-1 leading-relaxed">
              Discover handpicked experiences or plan a journey that's uniquely yours.
            </p>
          </div>

          {/* Right Segmented Controls Bar */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:flex xl:items-center bg-[#F7F3E9] rounded-xl border border-[#DEDCCD] p-1.5 gap-1.5">
              {/* Destination Segment */}
              <div className="flex-1 px-3 py-2 flex flex-col justify-center bg-transparent rounded-lg hover:bg-white/60 transition-colors">
                <label
                  htmlFor="finder-dest"
                  className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#59665E]"
                >
                  <MapPin className="w-3 h-3 text-[#D9A441]" />
                  <span>Destination</span>
                </label>
                <select
                  id="finder-dest"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-[#172C26] font-semibold text-xs sm:text-sm pt-0.5 focus:outline-none cursor-pointer"
                >
                  <option value="all">Any destination</option>
                  <option value="meghalaya">Meghalaya</option>
                  <option value="arunachal-pradesh">Arunachal Pradesh</option>
                  <option value="assam">Assam</option>
                  <option value="dzukou-valley">Dzukou Valley</option>
                </select>
              </div>

              <div className="hidden xl:block w-[1px] h-8 bg-[#DEDCCD]" />

              {/* Travel Month Segment */}
              <div className="flex-1 px-3 py-2 flex flex-col justify-center bg-transparent rounded-lg hover:bg-white/60 transition-colors">
                <label
                  htmlFor="finder-month"
                  className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#59665E]"
                >
                  <Calendar className="w-3 h-3 text-[#D9A441]" />
                  <span>Travel month</span>
                </label>
                <select
                  id="finder-month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-transparent text-[#172C26] font-semibold text-xs sm:text-sm pt-0.5 focus:outline-none cursor-pointer"
                >
                  <option value="flexible">Any month</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may-sep">Monsoon (Waterfalls)</option>
                </select>
              </div>

              <div className="hidden xl:block w-[1px] h-8 bg-[#DEDCCD]" />

              {/* Travellers Segment */}
              <div className="flex-1 px-3 py-2 flex flex-col justify-center bg-transparent rounded-lg hover:bg-white/60 transition-colors">
                <label
                  htmlFor="finder-travellers"
                  className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#59665E]"
                >
                  <Users className="w-3 h-3 text-[#D9A441]" />
                  <span>Travellers</span>
                </label>
                <select
                  id="finder-travellers"
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="w-full bg-transparent text-[#172C26] font-semibold text-xs sm:text-sm pt-0.5 focus:outline-none cursor-pointer"
                >
                  <option value="1">1 traveller</option>
                  <option value="2">2 travellers</option>
                  <option value="4">3–4 travellers</option>
                  <option value="6">5–6 travellers</option>
                  <option value="8">7+ travellers</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full xl:w-auto bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer min-h-[44px]"
              >
                <span>Find my journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

