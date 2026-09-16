"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Clock } from "lucide-react";

export default function TripFinder() {
  const router = useRouter();
  const [destination, setDestination] = useState("all");
  const [month, setMonth] = useState("flexible");
  const [travellers, setTravellers] = useState("2");
  const [duration, setDuration] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination && destination !== "all") params.append("dest", destination);
    if (month && month !== "flexible") params.append("month", month);
    if (travellers) params.append("travellers", travellers);
    if (duration && duration !== "all") params.append("duration", duration);

    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#FFFDF7] rounded-2xl shadow-xl border border-[#DEDCCD] p-4 sm:p-6 lg:p-7">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
          {/* Destination */}
          <div className="space-y-1.5">
            <label
              htmlFor="finder-destination"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#59665E]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
              Destination
            </label>
            <select
              id="finder-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#F7F3E9] text-[#172C26] font-medium text-sm rounded-lg px-3.5 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36] cursor-pointer"
            >
              <option value="all">All Destinations / Help me choose</option>
              <option value="meghalaya">Meghalaya (Waterfalls & Roots)</option>
              <option value="arunachal-pradesh">Arunachal Pradesh (Tawang Pass)</option>
              <option value="assam">Assam (Kaziranga & Temples)</option>
              <option value="dzukou-valley">Dzukou Valley Trek (Nagaland)</option>
            </select>
          </div>

          {/* Travel Month */}
          <div className="space-y-1.5">
            <label
              htmlFor="finder-month"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#59665E]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
              Travel Month
            </label>
            <select
              id="finder-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-[#F7F3E9] text-[#172C26] font-medium text-sm rounded-lg px-3.5 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36] cursor-pointer"
            >
              <option value="flexible">Flexible / Any Month</option>
              <option value="october">October 2026</option>
              <option value="november">November 2026 (Clear Waters)</option>
              <option value="december">December 2026 (Winter Snow)</option>
              <option value="january">January 2027</option>
              <option value="february">February 2027</option>
              <option value="march">March 2027 (Rhododendrons)</option>
              <option value="april">April 2027</option>
              <option value="may-sep">Monsoon Season (Waterfalls)</option>
            </select>
          </div>

          {/* Travellers */}
          <div className="space-y-1.5">
            <label
              htmlFor="finder-travellers"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#59665E]"
            >
              <Users className="w-3.5 h-3.5 text-[#D9A441]" />
              Travellers
            </label>
            <select
              id="finder-travellers"
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full bg-[#F7F3E9] text-[#172C26] font-medium text-sm rounded-lg px-3.5 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36] cursor-pointer"
            >
              <option value="1">Solo Traveller (1 person)</option>
              <option value="2">Couple / 2 Travellers</option>
              <option value="4">Small Group / Family (3-4)</option>
              <option value="6">Group (5-6 Travellers)</option>
              <option value="8">Large Group (7+ Travellers)</option>
            </select>
          </div>

          {/* Duration & Search CTA */}
          <div className="space-y-1.5">
            <label
              htmlFor="finder-duration"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#59665E]"
            >
              <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
              Trip Duration
            </label>
            <div className="flex gap-2">
              <select
                id="finder-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#F7F3E9] text-[#172C26] font-medium text-sm rounded-lg px-3.5 py-2.5 border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36] cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="3-5">3 to 5 Days</option>
                <option value="6-8">6 to 8 Days</option>
                <option value="9-12">9 to 12 Days</option>
                <option value="13+">13+ Days Overland</option>
              </select>

              <button
                type="submit"
                aria-label="Find journeys"
                className="btn-gold !min-h-[42px] !py-2 !px-4 shrink-0 shadow-md flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Find</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
