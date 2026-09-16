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
  Sparkles,
  ShieldCheck,
  Send,
  MapPin
} from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function CustomTripPlanner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL query prefill
  const prefillPkg = searchParams.get("package") || "";
  const prefillDest = searchParams.get("dest") || "";
  const prefillDuration = searchParams.get("duration") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Where and when
    destinations: prefillDest ? [prefillDest] : ["meghalaya"],
    timingType: "month", // "dates" or "month"
    exactDates: "",
    travelMonth: "October 2026",
    tripDuration: prefillDuration ? `${prefillDuration} days` : "5 to 7 days",
    startingCity: "Guwahati (Airport / Station)",

    // Step 2: Group
    adults: 2,
    childrenCount: 0,
    seniorCount: 0,
    accessibilityNotes: "",

    // Step 3: Travel style
    interests: ["Waterfalls & Living Roots", "Scenic Viewpoints"],
    pace: "Balanced (Comfortable driving & sightseeing)",
    stayPreference: "Boutique & 3-Star Resorts",
    vehiclePreference: "Comfortable MUV / Ertiga",
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

  const toggleDestination = (slug) => {
    if (formData.destinations.includes(slug)) {
      if (formData.destinations.length > 1) {
        setFormData({
          ...formData,
          destinations: formData.destinations.filter((d) => d !== slug),
        });
      }
    } else {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, slug],
      });
    }
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
      <div className="p-6 sm:p-10">
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
                    className={`p-4 rounded-xl border text-left transition-all ${
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
                    onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                    className="w-8 h-8 rounded bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#103F36]">{formData.adults}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                    className="w-8 h-8 rounded bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-lg"
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
                    onClick={() => setFormData({ ...formData, childrenCount: Math.max(0, formData.childrenCount - 1) })}
                    className="w-8 h-8 rounded bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#103F36]">{formData.childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, childrenCount: formData.childrenCount + 1 })}
                    className="w-8 h-8 rounded bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-lg"
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
                    onClick={() => setFormData({ ...formData, seniorCount: Math.max(0, formData.seniorCount - 1) })}
                    className="w-8 h-8 rounded bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#103F36]">{formData.seniorCount}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seniorCount: formData.seniorCount + 1 })}
                    className="w-8 h-8 rounded bg-[#FFFDF7] border border-[#DEDCCD] font-bold text-lg"
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
                Choose your desired travel pace, accommodation grade, and interests.
              </p>
            </div>

            {/* Interests Multi-Select */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-2">
                Trip Interests (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Waterfalls & Living Roots",
                  "Scenic Viewpoints",
                  "Rhino Safari / Wildlife",
                  "Monasteries & Tibetan Culture",
                  "Trekking & Backpacking",
                  "Local Food & Cafes",
                  "Serene Photography",
                  "Spiritual Shrines (Kamakhya)",
                ].map((item) => {
                  const isChecked = formData.interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`text-xs px-3.5 py-2 rounded-lg font-medium border transition-colors ${
                        isChecked
                          ? "bg-[#103F36] text-[#F7F3E9] border-[#103F36]"
                          : "bg-[#F7F3E9] text-[#172C26] border-[#DEDCCD]"
                      }`}
                    >
                      {item}
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
            <div className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#DEDCCD] space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-[#103F36] uppercase tracking-wider text-xs border-b border-[#DEDCCD] pb-2">
                Trip Request Summary
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#59665E]">
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
        <div className="mt-10 pt-6 border-t border-[#DEDCCD] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-outline-forest !py-2.5 !px-5 text-xs flex items-center gap-1.5"
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
              onClick={() => setCurrentStep(currentStep + 1)}
              className="btn-gold !py-2.5 !px-6 text-sm flex items-center gap-1.5 shadow-md"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || !formData.customerName || !formData.phone}
              onClick={handleSubmit}
              className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
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
