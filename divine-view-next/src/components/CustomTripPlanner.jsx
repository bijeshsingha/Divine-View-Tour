"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Users,
  Car,
  BedDouble,
  ShieldCheck,
  Send,
  MapPin
} from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

const DESTINATION_INTERESTS = {
  meghalaya: [
    { id: "roots_waterfalls", label: "Living Root Bridges & Waterfalls", region: "Cherrapunji & Nongriat" },
    { id: "clear_rivers", label: "Crystal Clear River Boating", region: "Dawki & Shnongpdeng" },
    { id: "caves_canyons", label: "Limestone Caves & Canyons", region: "Mawsmai, Arwah & Laitlum" },
    { id: "clean_villages", label: "Cleanest Villages & Khasi Culture", region: "Mawlynnong & Kongthong" },
    { id: "shillong_cafes", label: "Cafe Hopping & Shillong Music", region: "Shillong & Umiam" },
  ],
  assam: [
    { id: "rhino_safari", label: "Rhino Safari & Wildlife Jeep Drives", region: "Kaziranga & Pobitora" },
    { id: "brahmaputra_cruise", label: "Brahmaputra River Cruises & Sunsets", region: "Guwahati & Nimatighat" },
    { id: "tea_estates", label: "Heritage Tea Gardens & Stays", region: "Upper Assam & Jorhat" },
    { id: "kamakhya_spiritual", label: "Kamakhya Temple & Sacred Shrines", region: "Nilachal Hills, Guwahati" },
    { id: "majuli_culture", label: "Majuli River Island & Satra Monasteries", region: "Majuli" },
  ],
  "arunachal-pradesh": [
    { id: "tawang_monasteries", label: "Ancient Monasteries & Tibetan Culture", region: "Tawang & Bomdila" },
    { id: "high_passes", label: "High-Altitude Passes (Sela Pass 13,700 ft)", region: "West Kameng" },
    { id: "glacial_lakes", label: "Glacial Alpine Lakes", region: "Madhuri Lake & PT Tso" },
    { id: "valley_orchards", label: "Apple Orchards & Sub-Himalayan Valleys", region: "Dirang & Sangti Valley" },
  ],
  "dzukou-valley": [
    { id: "dzukou_trek", label: "Dzukou Valley Alpine Trekking", region: "Viswema & Jakhama Trails" },
    { id: "dwarf_bamboo", label: "Dwarf Bamboo Valley Exploration", region: "Dzukou Sanctuary" },
    { id: "ridge_stargazing", label: "High-Ridge Wilderness Stargazing", region: "Valley Rest House" },
    { id: "naga_heritage", label: "Angami Naga Heritage & Village Walks", region: "Khonoma & Kisama" },
  ],
};

const COMMON_INTERESTS = [
  { id: "local_cuisine", label: "Local Food & Tribal Culinary Tasting", region: "Across Northeast" },
  { id: "nature_photography", label: "Landscape & Nature Photography", region: "Scenic Viewpoints" },
  { id: "scenic_drives", label: "Unhurried Mountain Drives", region: "Scenic Byways" },
];

function getInterestsForDestinations(destinations) {
  const result = [];
  const seen = new Set();

  (destinations || []).forEach((dest) => {
    const list = DESTINATION_INTERESTS[dest] || [];
    list.forEach((item) => {
      if (!seen.has(item.label)) {
        seen.add(item.label);
        result.push(item);
      }
    });
  });

  COMMON_INTERESTS.forEach((item) => {
    if (!seen.has(item.label)) {
      seen.add(item.label);
      result.push(item);
    }
  });

  return result;
}

export default function CustomTripPlanner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL query prefill
  const prefillPkg = searchParams.get("package") || "";
  const prefillDest = searchParams.get("dest") || "";
  const prefillDuration = searchParams.get("duration") || "";
  const prefillMonth = searchParams.get("month") || "";
  const prefillTravellers = searchParams.get("travellers") || "";

  // Convert raw month query to label
  let initialMonth = "October 2026";
  if (prefillMonth && prefillMonth !== "flexible") {
    const capitalized = prefillMonth.charAt(0).toUpperCase() + prefillMonth.slice(1);
    initialMonth = `${capitalized} 2026`;
  }

  // Parse adult count and recommended vehicle from travellers param
  const parsedAdults = prefillTravellers ? parseInt(prefillTravellers, 10) || 2 : 2;
  let initialVehicle = "Comfortable MUV / Ertiga";
  if (parsedAdults <= 2) initialVehicle = "Dedicated AC Sedan (Swift Dzire / Etios)";
  else if (parsedAdults >= 5 && parsedAdults <= 6) initialVehicle = "Toyota Innova Crysta";
  else if (parsedAdults >= 7) initialVehicle = "Tempo Traveller (Group 8+)";

  const initialDests = prefillDest && prefillDest !== "all" ? [prefillDest] : ["meghalaya"];
  const initialAvailable = getInterestsForDestinations(initialDests);
  const initialInterests = [initialAvailable[0]?.label, initialAvailable[1]?.label].filter(Boolean);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Where and when
    destinations: initialDests,
    timingType: "month", // "dates" or "month"
    exactDates: "",
    travelMonth: initialMonth,
    tripDuration: prefillDuration ? `${prefillDuration} days` : "5 to 7 days",
    startingCity: "Guwahati (Airport / Station)",

    // Step 2: Group
    adults: parsedAdults,
    childrenCount: 0,
    seniorCount: 0,
    accessibilityNotes: "",

    // Step 3: Travel style
    interests: initialInterests.length > 0 ? initialInterests : ["Living Root Bridges & Waterfalls", "Crystal Clear River Boating"],
    pace: "Balanced (Comfortable driving & sightseeing)",
    stayPreference: "Boutique & 3-Star Resorts",
    vehiclePreference: initialVehicle,
    budgetRange: "₹20,000 to ₹35,000 per person",
    includesFlights: "Land arrangements only (We book our own flights)",
    specialWishes: prefillPkg ? `Customizing based on package: ${prefillPkg}` : "",

    // Step 4: Contact & Consent
    customerName: "",
    phone: "",
    email: "",
    preferredContact: "whatsapp",
    privacyConsent: true,
  });

  const availableInterests = getInterestsForDestinations(formData.destinations);

  const toggleDestination = (slug) => {
    let nextDests = [];
    if (formData.destinations.includes(slug)) {
      if (formData.destinations.length > 1) {
        nextDests = formData.destinations.filter((d) => d !== slug);
      } else {
        nextDests = formData.destinations;
      }
    } else {
      nextDests = [...formData.destinations, slug];
    }

    const available = getInterestsForDestinations(nextDests);
    const availableLabels = available.map((i) => i.label);
    let nextInterests = formData.interests.filter((i) => availableLabels.includes(i));
    if (nextInterests.length === 0 && available.length > 0) {
      nextInterests = [available[0]?.label, available[1]?.label].filter(Boolean);
    }

    setFormData({
      ...formData,
      destinations: nextDests,
      interests: nextInterests,
    });
  };

  const toggleInterest = (interest) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "custom_trip",
          ...formData,
        }),
      });

      const data = await res.json();
      const ref = data.reference || "DVT-2026-0000";
      router.push(`/enquiry/received?ref=${ref}&type=custom`);
    } catch (err) {
      console.error(err);
      const ref = "DVT-2026-0000";
      router.push(`/enquiry/received?ref=${ref}&type=custom`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#FFFDF7] rounded-3xl border border-[#DEDCCD] shadow-xl overflow-hidden">
      {/* Progress Bar Header */}
      <div className="bg-[#103F36] text-[#F7F3E9] p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441]">
            Step 0{currentStep} of 04
          </span>
          <span className="text-xs text-[#F7F3E9]/80 font-medium">
            {currentStep === 1 && "Where & When"}
            {currentStep === 2 && "Your Group"}
            {currentStep === 3 && "Travel Style & Budget"}
            {currentStep === 4 && "Review & Submit"}
          </span>
        </div>

        {/* 4-Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step <= currentStep ? "bg-[#D9A441]" : "bg-[#082D27]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Wizard Form Body */}
      <div className="p-4 sm:p-8 lg:p-10">
        {/* STEP 1: WHERE AND WHEN */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                Where would you like to explore?
              </h2>
              <p className="text-xs sm:text-sm text-[#59665E] mt-1">
                Select one or multiple regions you wish to combine.
              </p>
            </div>

            {/* Destination checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "meghalaya", label: "Meghalaya", desc: "Shillong, Cherrapunji, Dawki" },
                { id: "arunachal-pradesh", label: "Arunachal Pradesh", desc: "Sela Pass, Dirang, Tawang" },
                { id: "assam", label: "Assam", desc: "Kaziranga Safari, Kamakhya" },
                { id: "dzukou-valley", label: "Dzukou Valley Trek", desc: "High meadow trail in Nagaland" },
              ].map((dest) => {
                const isSelected = formData.destinations.includes(dest.id);
                return (
                  <button
                    type="button"
                    key={dest.id}
                    onClick={() => toggleDestination(dest.id)}
                    className={`p-4 rounded-xl border text-left transition-all min-h-[44px] ${
                      isSelected
                        ? "bg-[#E9F0EA] border-[#103F36] shadow-sm"
                        : "bg-[#F7F3E9] border-[#DEDCCD] opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#103F36]">
                        {dest.label}
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#237A50]" />}
                    </div>
                    <span className="text-xs text-[#59665E] block mt-1">
                      {dest.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Travel timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DEDCCD]">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Expected Travel Month
                </label>
                <select
                  value={formData.travelMonth}
                  onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                >
                  <option>Flexible / Any Season</option>
                  <option>October 2026</option>
                  <option>November 2026 (Clear waters)</option>
                  <option>December 2026 (Winter snow)</option>
                  <option>January 2027</option>
                  <option>February 2027</option>
                  <option>March 2027 (Rhododendrons)</option>
                  <option>April 2027</option>
                  <option>May to September (Monsoon Waterfalls)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Approximate Duration
                </label>
                <select
                  value={formData.tripDuration}
                  onChange={(e) => setFormData({ ...formData, tripDuration: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                >
                  <option>3 to 5 days</option>
                  <option>5 to 7 days (Recommended)</option>
                  <option>8 to 10 days</option>
                  <option>11 to 14 days (Full circuit)</option>
                  <option>15+ days in-depth exploration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Departure & Pickup Base
              </label>
              <input
                type="text"
                value={formData.startingCity}
                onChange={(e) => setFormData({ ...formData, startingCity: e.target.value })}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
              <p className="text-[11px] text-[#59665E] mt-1">
                Most overland circuits start directly from Guwahati Airport (GAU) or Guwahati Railway Station.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: YOUR GROUP */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                Who is travelling in your group?
              </h2>
              <p className="text-xs sm:text-sm text-[#59665E] mt-1">
                Helps us allocate the right vehicle size and suitable hotel room categories.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#F7F3E9] p-4 rounded-xl border border-[#DEDCCD] space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#103F36] block">
                  Adults (12+ years)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease Adults"
                    onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#103F36] w-8 text-center">{formData.adults}</span>
                  <button
                    type="button"
                    aria-label="Increase Adults"
                    onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-[#F7F3E9] p-4 rounded-xl border border-[#DEDCCD] space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#103F36] block">
                  Children (under 12)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease Children"
                    onClick={() => setFormData({ ...formData, childrenCount: Math.max(0, formData.childrenCount - 1) })}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#103F36] w-8 text-center">{formData.childrenCount}</span>
                  <button
                    type="button"
                    aria-label="Increase Children"
                    onClick={() => setFormData({ ...formData, childrenCount: formData.childrenCount + 1 })}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-[#F7F3E9] p-4 rounded-xl border border-[#DEDCCD] space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#103F36] block">
                  Seniors (60+)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease Seniors"
                    onClick={() => setFormData({ ...formData, seniorCount: Math.max(0, formData.seniorCount - 1) })}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#103F36] w-8 text-center">{formData.seniorCount}</span>
                  <button
                    type="button"
                    aria-label="Increase Seniors"
                    onClick={() => setFormData({ ...formData, seniorCount: formData.seniorCount + 1 })}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Mobility or Special Considerations (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Elder guest cannot walk long flights of stairs; require ground floor rooms; need child booster seat."
                value={formData.accessibilityNotes}
                onChange={(e) => setFormData({ ...formData, accessibilityNotes: e.target.value })}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: TRAVEL STYLE & BUDGET */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                What kind of experience do you prefer?
              </h2>
              <p className="text-xs sm:text-sm text-[#59665E] mt-1">
                Tailored options based on your selected destination{formData.destinations.length > 1 ? "s" : ""}.
              </p>
            </div>

            {/* Interests Multi-Select */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block">
                  Trip Interests (Select all that apply)
                </label>
                <span className="text-[11px] text-[#237A50] font-medium">
                  {formData.interests.length} selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableInterests.map((item) => {
                  const isChecked = formData.interests.includes(item.label);
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => toggleInterest(item.label)}
                      className={`text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 min-h-[44px] cursor-pointer ${
                        isChecked
                          ? "bg-[#E9F0EA] text-[#103F36] border-[#103F36] shadow-xs"
                          : "bg-[#F7F3E9] text-[#172C26] border-[#DEDCCD] hover:border-[#103F36]/40"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border text-[10px] font-bold ${
                        isChecked ? "bg-[#103F36] text-white border-[#103F36]" : "border-[#DEDCCD] bg-white"
                      }`}>
                        {isChecked && "✓"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-xs sm:text-sm block leading-snug">
                          {item.label}
                        </span>
                        {item.region && (
                          <span className={`text-[11px] block mt-0.5 ${
                            isChecked ? "text-[#237A50] font-medium" : "text-[#59665E]"
                          }`}>
                            {item.region}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Trip Pace
                </label>
                <select
                  value={formData.pace}
                  onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                >
                  <option>Relaxed (Fewer hotel changes, relaxed mornings)</option>
                  <option>Balanced (Comfortable driving & sightseeing)</option>
                  <option>Active / Fast-Paced (Cover maximum destinations)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Stay Preference
                </label>
                <select
                  value={formData.stayPreference}
                  onChange={(e) => setFormData({ ...formData, stayPreference: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                >
                  <option>Cozy Homestays & Eco-Cottages</option>
                  <option>Boutique & 3-Star Resorts</option>
                  <option>Premium 4-Star / Heritage Properties</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Preferred Vehicle
                </label>
                <select
                  value={formData.vehiclePreference}
                  onChange={(e) => setFormData({ ...formData, vehiclePreference: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                >
                  <option>Compact Sedan (Swift Dzire / Etios)</option>
                  <option>Comfortable MUV / Ertiga</option>
                  <option>Premium Mountain SUV / Innova Crysta</option>
                  <option>Tempo Traveller (Group 8+)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Approximate Budget (Per Person)
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                >
                  <option>Under ₹20,000 (Budget friendly)</option>
                  <option>₹20,000 to ₹35,000 (Standard comfortable)</option>
                  <option>₹35,000 to ₹50,000 (Premium stay & Crysta)</option>
                  <option>₹50,000+ (Luxury & exclusive arrangements)</option>
                  <option>Help me estimate based on itinerary</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Does this budget include flight tickets?
              </label>
              <select
                value={formData.includesFlights}
                onChange={(e) => setFormData({ ...formData, includesFlights: e.target.value })}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              >
                <option>Land arrangements only (We book our own flights to Guwahati)</option>
                <option>Please include flight suggestions / quotes as well</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                Review your request & contact details
              </h2>
              <p className="text-xs sm:text-sm text-[#59665E] mt-1">
                Our Guwahati travel desk will review your preferences and send a detailed custom itinerary quote.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-[#F7F3E9] p-4 sm:p-5 rounded-2xl border border-[#DEDCCD] space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-[#103F36] uppercase tracking-wider text-xs border-b border-[#DEDCCD] pb-2">
                Trip Request Summary
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#59665E]">
                <div>
                  <span className="font-semibold text-[#172C26]">Destinations:</span>{" "}
                  {formData.destinations.join(", ")}
                </div>
                <div>
                  <span className="font-semibold text-[#172C26]">Month / Duration:</span>{" "}
                  {formData.travelMonth} ({formData.tripDuration})
                </div>
                <div>
                  <span className="font-semibold text-[#172C26]">Travellers:</span>{" "}
                  {formData.adults} Adults {formData.childrenCount > 0 ? `, ${formData.childrenCount} Kids` : ""}
                </div>
                <div>
                  <span className="font-semibold text-[#172C26]">Vehicle & Stay:</span>{" "}
                  {formData.vehiclePreference} · {formData.stayPreference}
                </div>
              </div>
            </div>

            {/* Contact Details Form */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditi Sengupta"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {["whatsapp", "phone", "email"].map((method) => (
                    <label key={method} className="flex items-center gap-1.5 text-xs text-[#172C26] cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={() => setFormData({ ...formData, preferredContact: method })}
                        className="text-[#103F36] focus:ring-[#103F36]"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 text-xs text-[#59665E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-0.5"
                    required
                  />
                  <span>
                    I consent to Divine View Tours contacting me regarding this trip enquiry. My information will never be shared with third-party advertisers.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#DEDCCD] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-outline-forest !py-3 !px-5 text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="btn-gold !py-3 !px-6 text-sm flex items-center justify-center gap-2 shadow-md min-h-[44px]"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || !formData.customerName || !formData.phone}
              onClick={handleSubmit}
              className="btn-gold !py-3.5 !px-8 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Request..." : "Send Custom Trip Request"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
