"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Send
} from "lucide-react";
import PhoneInput from "@/components/PhoneInput";

const DESTINATIONS = [
  { id: "meghalaya", label: "Meghalaya", desc: "Shillong, Cherrapunji & Dawki River" },
  { id: "assam", label: "Assam", desc: "Kaziranga Safari, Kamakhya & Brahmaputra" },
  { id: "arunachal-pradesh", label: "Arunachal Pradesh", desc: "Sela Pass, Dirang & Tawang Monasteries" },
  { id: "dzukou-valley", label: "Dzukou Valley Trek", desc: "High meadow trail on Nagaland border" },
];

const DESTINATION_INTERESTS = {
  meghalaya: [
    { id: "roots_waterfalls", label: "Living Root Bridges & Waterfalls", region: "Cherrapunji & Nongriat" },
    { id: "clear_rivers", label: "Crystal Clear River Boating", region: "Dawki & Shnongpdeng" },
    { id: "caves_canyons", label: "Limestone Caves & Canyons", region: "Mawsmai & Laitlum" },
    { id: "clean_villages", label: "Clean Villages & Khasi Culture", region: "Mawlynnong & Kongthong" },
    { id: "shillong_cafes", label: "Cafe Hopping & Shillong Music", region: "Shillong & Umiam" },
  ],
  assam: [
    { id: "rhino_safari", label: "Rhino Safari & Wildlife Drives", region: "Kaziranga & Pobitora" },
    { id: "brahmaputra_cruise", label: "Brahmaputra Sunset Cruises", region: "Guwahati & Nimatighat" },
    { id: "tea_estates", label: "Heritage Tea Gardens & Stays", region: "Upper Assam & Jorhat" },
    { id: "kamakhya_spiritual", label: "Kamakhya Temple & Sacred Shrines", region: "Guwahati" },
    { id: "majuli_culture", label: "Majuli River Island Culture", region: "Majuli" },
  ],
  "arunachal-pradesh": [
    { id: "tawang_monasteries", label: "Ancient Monasteries & Culture", region: "Tawang & Bomdila" },
    { id: "high_passes", label: "High-Altitude Passes (Sela 13,700 ft)", region: "West Kameng" },
    { id: "glacial_lakes", label: "Glacial Alpine Lakes", region: "Sangetsar Lake" },
    { id: "valley_orchards", label: "Apple Orchards & Valleys", region: "Dirang & Sangti" },
  ],
  "dzukou-valley": [
    { id: "dzukou_trek", label: "Dzukou Valley Alpine Trekking", region: "Viswema & Jakhama" },
    { id: "dwarf_bamboo", label: "Dwarf Bamboo Basin Walks", region: "Dzukou Sanctuary" },
    { id: "ridge_stargazing", label: "High-Ridge Wilderness Stargazing", region: "Valley Rest House" },
    { id: "naga_heritage", label: "Angami Naga Heritage Walks", region: "Khonoma & Kisama" },
  ],
};

const COMMON_INTERESTS = [
  { id: "local_cuisine", label: "Local Food & Culinary Tasting", region: "Regional Specialties" },
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

const STEPS = [
  { number: 1, title: "Where & When" },
  { number: 2, title: "Your Group" },
  { number: 3, title: "Travel Style" },
  { number: 4, title: "Contact & Details" },
];

export default function CustomTripPlanner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const headingRef = useRef(null);

  // URL query prefill
  const prefillPkg = searchParams.get("package") || "";
  const prefillDest = searchParams.get("dest") || "";
  const prefillDuration = searchParams.get("duration") || "";
  const prefillMonth = searchParams.get("month") || "";
  const prefillTravellers = searchParams.get("travellers") || "";

  let initialMonth = "Flexible / Not sure yet";
  if (prefillMonth && prefillMonth !== "flexible") {
    const capitalized = prefillMonth.charAt(0).toUpperCase() + prefillMonth.slice(1);
    initialMonth = `${capitalized} 2026`;
  }

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
  const [fieldErrors, setFieldErrors] = useState({});

  // Form State (preserved across steps)
  const [formData, setFormData] = useState({
    destinations: initialDests,
    travelMonth: initialMonth,
    tripDuration: prefillDuration ? `${prefillDuration} days` : "5 to 7 days",
    startingCity: "Guwahati (Airport / Station)",

    adults: parsedAdults,
    childrenCount: 0,
    seniorCount: 0,
    accessibilityNotes: "",

    interests: initialInterests.length > 0 ? initialInterests : ["Living Root Bridges & Waterfalls", "Crystal Clear River Boating"],
    pace: "Balanced (Comfortable driving & sightseeing)",
    stayPreference: "Boutique & 3-Star Resorts",
    vehiclePreference: initialVehicle,
    budgetRange: "₹20,000 to ₹35,000 per person",
    includesFlights: "Land arrangements only (We book our own flights)",
    specialWishes: prefillPkg ? `Customizing based on package: ${prefillPkg}` : "",

    customerName: "",
    countryCode: "+91",
    phone: "",
    email: "",
    preferredContact: "whatsapp",
    privacyConsent: true,
  });

  const availableInterests = getInterestsForDestinations(formData.destinations);

  // Focus header on step change for accessibility
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [currentStep]);

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

  const handleNextStep = () => {
    setFieldErrors({});
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setFieldErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = "Please enter your name";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Please enter your phone number";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const cleanPhone = (formData.phone || "").trim();
    const fullPhone = cleanPhone.startsWith("+")
      ? cleanPhone
      : `${formData.countryCode || "+91"} ${cleanPhone}`.trim();

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "custom_trip",
          ...formData,
          phone: fullPhone,
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
    <div className="max-w-[800px] mx-auto bg-[#FFFDF7] rounded-[12px] border border-[#DDD7CA] overflow-hidden shadow-none">
      {/* Compact Stepper Header */}
      <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-[#DDD7CA] bg-[#FFFDF7]">
        {/* Desktop Stepper */}
        <nav aria-label="Planner Progress" className="hidden sm:flex items-center justify-between">
          {STEPS.map((step, idx) => {
            const isCurrent = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      isCompleted
                        ? "bg-[#173D35] text-[#F5F1E8]"
                        : isCurrent
                        ? "bg-[#173D35] text-[#F5F1E8]"
                        : "border border-[#DDD7CA] text-[#59665E] bg-[#FFFDF7]"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      isCurrent
                        ? "text-[#173D35] font-semibold"
                        : isCompleted
                        ? "text-[#202A25]"
                        : "text-[#59665E]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`h-[1px] flex-1 mx-3 sm:mx-4 transition-colors ${
                      currentStep > step.number ? "bg-[#173D35]/40" : "bg-[#DDD7CA]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Stepper Summary */}
        <div className="flex sm:hidden items-center justify-between">
          <span className="text-xs font-semibold text-[#173D35] uppercase tracking-wider">
            Step {currentStep} of 4: {STEPS[currentStep - 1].title}
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={`w-5 h-1.5 rounded-full ${
                  step <= currentStep ? "bg-[#173D35]" : "bg-[#DDD7CA]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form Step Body with Restrained Step Animation */}
      <div className="p-5 sm:p-8">
        {/* STEP 1: WHERE AND WHEN */}
        {currentStep === 1 && (
          <div className="step-animate space-y-6">
            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-serif text-2xl sm:text-[28px] font-normal text-[#173D35] outline-none"
              >
                Where would you like to explore?
              </h2>
              <p className="text-xs sm:text-sm text-[#202A25]/75 mt-1">
                Select one or more regions you wish to combine.
              </p>
            </div>

            {/* Destination Checkbox Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Destinations">
              {DESTINATIONS.map((dest) => {
                const isSelected = formData.destinations.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => toggleDestination(dest.id)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggleDestination(dest.id);
                      }
                    }}
                    className={`p-4 rounded-[8px] cursor-pointer transition-all border flex items-start justify-between min-h-[76px] focus-ring-forest ${
                      isSelected
                        ? "bg-[#E9F0EA] border-[#173D35] border-2"
                        : "bg-[#FFFDF7] border-[#DDD7CA] hover:border-[#173D35]/40"
                    }`}
                  >
                    <div>
                      <span className="font-sans font-semibold text-[15px] text-[#173D35] block leading-tight">
                        {dest.label}
                      </span>
                      <span className="text-xs text-[#59665E] block mt-1">
                        {dest.desc}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-[4px] border shrink-0 flex items-center justify-center transition-colors ml-3 mt-0.5 ${
                        isSelected
                          ? "bg-[#173D35] border-[#173D35] text-white"
                          : "border-[#DDD7CA] bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timing & Duration Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#DDD7CA]/70">
              <div>
                <label htmlFor="planner-month" className="form-label">
                  Expected Travel Month
                </label>
                <select
                  id="planner-month"
                  value={formData.travelMonth}
                  onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                  className="form-control cursor-pointer"
                >
                  <option>Flexible / Not sure yet</option>
                  <option>October 2026 (Autumn Peak)</option>
                  <option>November 2026 (Clear Waters)</option>
                  <option>December 2026 (Winter Snow)</option>
                  <option>January 2027</option>
                  <option>February 2027</option>
                  <option>March 2027 (Spring Bloom)</option>
                  <option>April 2027</option>
                  <option>May to September (Monsoon Waterfalls)</option>
                </select>
              </div>

              <div>
                <label htmlFor="planner-duration" className="form-label">
                  Approximate Duration
                </label>
                <select
                  id="planner-duration"
                  value={formData.tripDuration}
                  onChange={(e) => setFormData({ ...formData, tripDuration: e.target.value })}
                  className="form-control cursor-pointer"
                >
                  <option>3 to 5 days</option>
                  <option>5 to 7 days</option>
                  <option>8 to 10 days</option>
                  <option>11 to 14 days (Full Circuit)</option>
                  <option>15+ days</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="planner-city" className="form-label">
                Departure & Pickup Base
              </label>
              <input
                id="planner-city"
                type="text"
                value={formData.startingCity}
                onChange={(e) => setFormData({ ...formData, startingCity: e.target.value })}
                className="form-control"
              />
              <p className="text-[12px] text-[#59665E] mt-1.5">
                Overland circuits start directly from Guwahati Airport (GAU) or Railway Station.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: YOUR GROUP */}
        {currentStep === 2 && (
          <div className="step-animate space-y-6">
            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-serif text-2xl sm:text-[28px] font-normal text-[#173D35] outline-none"
              >
                Who is travelling in your group?
              </h2>
              <p className="text-xs sm:text-sm text-[#202A25]/75 mt-1">
                Helps us allocate the right vehicle size and hotel room configurations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Adults Counter */}
              <div className="bg-[#FFFDF7] p-4 rounded-[8px] border border-[#DDD7CA] space-y-2">
                <span className="form-label">Adults (12+ yrs)</span>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    aria-label="Decrease Adults"
                    onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                    className="w-10 h-10 min-w-[40px] rounded-[6px] border border-[#DDD7CA] bg-[#F5F1E8] text-[#173D35] font-semibold text-lg flex items-center justify-center hover:border-[#173D35] focus-ring-forest"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-normal text-[#173D35]">{formData.adults}</span>
                  <button
                    type="button"
                    aria-label="Increase Adults"
                    onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                    className="w-10 h-10 min-w-[40px] rounded-[6px] border border-[#DDD7CA] bg-[#F5F1E8] text-[#173D35] font-semibold text-lg flex items-center justify-center hover:border-[#173D35] focus-ring-forest"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="bg-[#FFFDF7] p-4 rounded-[8px] border border-[#DDD7CA] space-y-2">
                <span className="form-label">Children (under 12)</span>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    aria-label="Decrease Children"
                    onClick={() => setFormData({ ...formData, childrenCount: Math.max(0, formData.childrenCount - 1) })}
                    className="w-10 h-10 min-w-[40px] rounded-[6px] border border-[#DDD7CA] bg-[#F5F1E8] text-[#173D35] font-semibold text-lg flex items-center justify-center hover:border-[#173D35] focus-ring-forest"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-normal text-[#173D35]">{formData.childrenCount}</span>
                  <button
                    type="button"
                    aria-label="Increase Children"
                    onClick={() => setFormData({ ...formData, childrenCount: formData.childrenCount + 1 })}
                    className="w-10 h-10 min-w-[40px] rounded-[6px] border border-[#DDD7CA] bg-[#F5F1E8] text-[#173D35] font-semibold text-lg flex items-center justify-center hover:border-[#173D35] focus-ring-forest"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Seniors Counter */}
              <div className="bg-[#FFFDF7] p-4 rounded-[8px] border border-[#DDD7CA] space-y-2">
                <span className="form-label">Seniors (60+)</span>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    aria-label="Decrease Seniors"
                    onClick={() => setFormData({ ...formData, seniorCount: Math.max(0, formData.seniorCount - 1) })}
                    className="w-10 h-10 min-w-[40px] rounded-[6px] border border-[#DDD7CA] bg-[#F5F1E8] text-[#173D35] font-semibold text-lg flex items-center justify-center hover:border-[#173D35] focus-ring-forest"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-normal text-[#173D35]">{formData.seniorCount}</span>
                  <button
                    type="button"
                    aria-label="Increase Seniors"
                    onClick={() => setFormData({ ...formData, seniorCount: formData.seniorCount + 1 })}
                    className="w-10 h-10 min-w-[40px] rounded-[6px] border border-[#DDD7CA] bg-[#F5F1E8] text-[#173D35] font-semibold text-lg flex items-center justify-center hover:border-[#173D35] focus-ring-forest"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="planner-accessibility" className="form-label">
                Mobility or Special Considerations (Optional)
              </label>
              <textarea
                id="planner-accessibility"
                rows="3"
                placeholder="e.g. Need ground floor rooms; travelling with infant; prefer leisurely morning starts."
                value={formData.accessibilityNotes}
                onChange={(e) => setFormData({ ...formData, accessibilityNotes: e.target.value })}
                className="w-full bg-[#FFFDF7] p-3 rounded-[8px] border border-[#DDD7CA] text-sm text-[#202A25] font-medium transition-colors focus:border-[#173D35] focus-ring-forest"
              />
            </div>
          </div>
        )}

        {/* STEP 3: TRAVEL STYLE & BUDGET */}
        {currentStep === 3 && (
          <div className="step-animate space-y-6">
            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-serif text-2xl sm:text-[28px] font-normal text-[#173D35] outline-none"
              >
                What kind of experience do you prefer?
              </h2>
              <p className="text-xs sm:text-sm text-[#202A25]/75 mt-1">
                Tailored based on your selected destination{formData.destinations.length > 1 ? "s" : ""}.
              </p>
            </div>

            {/* Interests Checkbox Cards */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="form-label">Trip Interests (Select all that apply)</span>
                <span className="text-xs text-[#173D35] font-medium">
                  {formData.interests.length} selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableInterests.map((item) => {
                  const isChecked = formData.interests.includes(item.label);
                  return (
                    <div
                      key={item.label}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onClick={() => toggleInterest(item.label)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleInterest(item.label);
                        }
                      }}
                      className={`p-3 rounded-[8px] border transition-all flex items-start gap-2.5 cursor-pointer focus-ring-forest ${
                        isChecked
                          ? "bg-[#E9F0EA] border-[#173D35] border-2"
                          : "bg-[#FFFDF7] border-[#DDD7CA] hover:border-[#173D35]/40"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-[3px] mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-[#173D35] border-[#173D35] text-white"
                            : "border-[#DDD7CA] bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-sans font-semibold text-xs sm:text-sm block leading-snug text-[#173D35]">
                          {item.label}
                        </span>
                        {item.region && (
                          <span className="text-[11px] block mt-0.5 text-[#59665E]">
                            {item.region}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pace & Stay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#DDD7CA]/70">
              <div>
                <label htmlFor="planner-pace" className="form-label">
                  Trip Pace
                </label>
                <select
                  id="planner-pace"
                  value={formData.pace}
                  onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                  className="form-control cursor-pointer"
                >
                  <option>Relaxed (Fewer hotel changes, relaxed mornings)</option>
                  <option>Balanced (Comfortable driving & sightseeing)</option>
                  <option>Active / Fast-Paced (Cover maximum destinations)</option>
                </select>
              </div>

              <div>
                <label htmlFor="planner-stay" className="form-label">
                  Stay Preference
                </label>
                <select
                  id="planner-stay"
                  value={formData.stayPreference}
                  onChange={(e) => setFormData({ ...formData, stayPreference: e.target.value })}
                  className="form-control cursor-pointer"
                >
                  <option>Cozy Homestays & Eco-Cottages</option>
                  <option>Boutique & 3-Star Resorts</option>
                  <option>Premium 4-Star / Heritage Properties</option>
                </select>
              </div>
            </div>

            {/* Vehicle & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="planner-vehicle" className="form-label">
                  Preferred Vehicle
                </label>
                <select
                  id="planner-vehicle"
                  value={formData.vehiclePreference}
                  onChange={(e) => setFormData({ ...formData, vehiclePreference: e.target.value })}
                  className="form-control cursor-pointer"
                >
                  <option>Compact Sedan (Swift Dzire / Etios)</option>
                  <option>Comfortable MUV / Ertiga</option>
                  <option>Premium Mountain SUV / Innova Crysta</option>
                  <option>Tempo Traveller (Group 8+)</option>
                </select>
              </div>

              <div>
                <label htmlFor="planner-budget" className="form-label">
                  Approximate Budget (Per Person)
                </label>
                <select
                  id="planner-budget"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="form-control cursor-pointer"
                >
                  <option>Under ₹20,000 (Budget friendly)</option>
                  <option>₹20,000 to ₹35,000 (Standard comfortable)</option>
                  <option>₹35,000 to ₹50,000 (Premium stay & Crysta)</option>
                  <option>₹50,000+ (Luxury & exclusive arrangements)</option>
                  <option>Help me estimate based on itinerary</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT & REVIEW */}
        {currentStep === 4 && (
          <div className="step-animate space-y-6">
            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-serif text-2xl sm:text-[28px] font-normal text-[#173D35] outline-none"
              >
                Review your request & contact details
              </h2>
              <p className="text-xs sm:text-sm text-[#202A25]/75 mt-1">
                Our local Guwahati travel desk will review your preferences and share a personalized itinerary.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-[#F5F1E8] p-4 sm:p-5 rounded-[8px] border border-[#DDD7CA] space-y-2.5 text-xs sm:text-sm">
              <span className="form-label !mb-1">Summary of Selections</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#59665E]">
                <div>
                  <span className="font-semibold text-[#202A25]">Destinations:</span>{" "}
                  {formData.destinations.join(", ")}
                </div>
                <div>
                  <span className="font-semibold text-[#202A25]">Month & Duration:</span>{" "}
                  {formData.travelMonth} ({formData.tripDuration})
                </div>
                <div>
                  <span className="font-semibold text-[#202A25]">Travelers:</span>{" "}
                  {formData.adults} Adults {formData.childrenCount > 0 ? `, ${formData.childrenCount} Kids` : ""}
                </div>
                <div>
                  <span className="font-semibold text-[#202A25]">Vehicle & Stay:</span>{" "}
                  {formData.vehiclePreference} · {formData.stayPreference}
                </div>
              </div>
            </div>

            {/* Contact Details Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="planner-name" className="form-label">
                  Your Full Name *
                </label>
                <input
                  id="planner-name"
                  type="text"
                  required
                  placeholder="e.g. Aditi Sengupta"
                  value={formData.customerName}
                  onChange={(e) => {
                    setFormData({ ...formData, customerName: e.target.value });
                    if (fieldErrors.customerName) {
                      setFieldErrors({ ...fieldErrors, customerName: null });
                    }
                  }}
                  className={`form-control ${fieldErrors.customerName ? "border-[#9F2F24]" : ""}`}
                />
                {fieldErrors.customerName && (
                  <p className="text-xs text-[#9F2F24] mt-1 font-medium">{fieldErrors.customerName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="planner-phone" className="form-label">
                    WhatsApp / Phone *
                  </label>
                  <PhoneInput
                    id="planner-phone"
                    countryCode={formData.countryCode}
                    onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (fieldErrors.phone) {
                        setFieldErrors({ ...fieldErrors, phone: null });
                      }
                    }}
                    required
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-[#9F2F24] mt-1 font-medium">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="planner-email" className="form-label">
                    Email Address (Optional)
                  </label>
                  <input
                    id="planner-email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div>
                <span className="form-label">Preferred Contact Method</span>
                <div className="flex gap-5 pt-1">
                  {["whatsapp", "phone", "email"].map((method) => (
                    <label key={method} className="flex items-center gap-2 text-xs font-medium text-[#202A25] cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={() => setFormData({ ...formData, preferredContact: method })}
                        className="text-[#173D35] focus:ring-[#173D35]"
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
                    className="mt-0.5 text-[#173D35] focus:ring-[#173D35]"
                    required
                  />
                  <span>
                    I consent to Divine View Tours contacting me regarding this trip enquiry. Information is never shared with third parties.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Predictable Form Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-[#DDD7CA] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="btn-primary text-sm font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Request..." : "Send Trip Request"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
