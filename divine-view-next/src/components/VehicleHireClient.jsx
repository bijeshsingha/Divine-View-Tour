"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Car,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PhoneCall,
  Calendar,
  Send,
  MessageCircle,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  HelpCircle,
  Mail
} from "lucide-react";
import vehicleData from "@/data/vehicleRates.json";
import siteConfig from "@/data/siteConfig.json";
import VehicleRateTable from "@/components/VehicleRateTable";

export default function VehicleHireClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramDest = searchParams.get("dest") || "";
  const paramTravellers = searchParams.get("travellers") || "";

  // Combine circuits and poster routes for booking selector
  const availableCircuits = [
    {
      id: "poster-meghalaya",
      name: "Meghalaya Tour (Shillong, Cherrapunji, Dawki)",
      minDays: 3,
      sedan: 4000,
      ertiga: 5000,
      crysta: 6000,
      tt13: 8500,
      type: "poster"
    },
    {
      id: "poster-kaziranga",
      name: "Kaziranga & Manas Wildlife Tour",
      minDays: 3,
      sedan: 4500,
      ertiga: 5500,
      crysta: 6500,
      tt13: 9000,
      type: "poster"
    },
    {
      id: "poster-arunachal",
      name: "Arunachal Pradesh (Bomdila, Dirang, Tawang)",
      minDays: 5,
      sedan: 5000,
      ertiga: 6000,
      crysta: 7000,
      tt13: 9900,
      type: "poster"
    },
    {
      id: "ttaa-grand-11d",
      name: "Grand Northeast (Meghalaya + Kaziranga + Tawang)",
      minDays: 11,
      sedan: 6000,
      ertiga: 6700,
      crysta: 7900,
      tt13: 9900,
      type: "circuit"
    },
    {
      id: "ttaa-offbeat-9d",
      name: "Meghalaya Offbeat (Garo Hills, Wari Chora, Jaintia)",
      minDays: 9,
      sedan: 6000,
      ertiga: 6700,
      crysta: 7900,
      tt13: 9900,
      type: "circuit"
    },
    {
      id: "sameday-shillong",
      name: "Same-Day Shillong Roundtrip from Guwahati",
      minDays: 1,
      sedan: 5000,
      ertiga: 6000,
      crysta: 7500,
      tt13: 9500,
      type: "sameday"
    },
    {
      id: "sameday-kaziranga",
      name: "Same-Day Kaziranga Roundtrip from Guwahati",
      minDays: 1,
      sedan: 6500,
      ertiga: 8000,
      crysta: 10000,
      tt13: 12500,
      type: "sameday"
    },
    {
      id: "airport-drop",
      name: "Guwahati Airport Transfer (One-Way)",
      minDays: 1,
      sedan: 1000,
      ertiga: 1500,
      crysta: 2000,
      tt13: 3500,
      type: "transfer"
    }
  ];

  // Match destination from search params if present
  let initialRouteId = availableCircuits[0].id;
  if (paramDest === "arunachal-pradesh") initialRouteId = "poster-arunachal";
  else if (paramDest === "assam") initialRouteId = "poster-kaziranga";
  else if (paramDest === "meghalaya") initialRouteId = "poster-meghalaya";

  // Match vehicle from travellers param if present
  let initialVehicle = "ertiga";
  if (paramTravellers === "1" || paramTravellers === "2") initialVehicle = "sedan";
  else if (paramTravellers === "4") initialVehicle = "ertiga";
  else if (paramTravellers === "6") initialVehicle = "crysta";
  else if (paramTravellers === "8") initialVehicle = "tt13";

  const initialRoute = availableCircuits.find((c) => c.id === initialRouteId) || availableCircuits[0];

  const [selectedRouteId, setSelectedRouteId] = useState(initialRouteId);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicle);
  const [daysCount, setDaysCount] = useState(initialRoute.minDays);
  const [startDate, setStartDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (paramDest) {
      if (paramDest === "arunachal-pradesh") setSelectedRouteId("poster-arunachal");
      else if (paramDest === "assam") setSelectedRouteId("poster-kaziranga");
      else if (paramDest === "meghalaya") setSelectedRouteId("poster-meghalaya");
    }
    if (paramTravellers) {
      if (paramTravellers === "1" || paramTravellers === "2") setSelectedVehicle("sedan");
      else if (paramTravellers === "4") setSelectedVehicle("ertiga");
      else if (paramTravellers === "6") setSelectedVehicle("crysta");
      else if (paramTravellers === "8") setSelectedVehicle("tt13");
    }
  }, [paramDest, paramTravellers]);

  const activeRoute = availableCircuits.find((c) => c.id === selectedRouteId) || availableCircuits[0];
  const dailyRate = activeRoute[selectedVehicle];
  const estimatedTotal = dailyRate ? dailyRate * Math.max(activeRoute.minDays, daysCount) : null;

  const handleVehicleEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vehicle_hire",
          routeName: activeRoute.name,
          vehicleType: selectedVehicle,
          days: Math.max(activeRoute.minDays, daysCount),
          startDate,
          customerName,
          phone,
          email,
          specialRequests,
          estimatedDailyRate: dailyRate,
          estimatedTotal
        }),
      });

      const data = await res.json();
      const ref = data.reference || "DVT-2026-0000";
      router.push(`/enquiry/received?ref=${ref}&type=vehicle`);
    } catch (err) {
      console.error(err);
      const ref = "DVT-2026-0000";
      router.push(`/enquiry/received?ref=${ref}&type=vehicle`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. RATE TABLES */}
      <section className="space-y-6">
        <div>
          <span className="badge-forest mb-2">Approved Tariffs</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#103F36]">
            Transparent Vehicle Hire Rate Cards
          </h2>
          <p className="text-xs sm:text-sm text-[#59665E] mt-1">
            Browse official Divine View poster rates for Guwahati transfers and marked-up association fleet rates for long mountain circuits.
          </p>
        </div>

        <VehicleRateTable compact={false} />
      </section>

      {/* 2. FLEET SHOWCASE */}
      <section className="space-y-6">
        <div>
          <span className="badge-forest mb-2">Commercial Fleet</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#103F36]">
            Our Guwahati Vehicle Options
          </h2>
          <p className="text-xs sm:text-sm text-[#59665E] mt-1">
            All vehicles operate with licensed commercial yellow number plates, mountain drivers, and complete interstate road permits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicleData.vehicles.slice(0, 4).map((veh) => (
            <div
              key={veh.id}
              className="bg-[#FFFDF7] rounded-2xl overflow-hidden border border-[#DEDCCD] shadow-sm flex flex-col justify-between p-5 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441] bg-[#F7F3E9] px-2 py-0.5 rounded border border-[#DEDCCD]">
                    {veh.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#103F36] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {veh.capacity}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    {veh.name}
                  </h3>
                  <span className="text-xs text-[#59665E] font-medium block">
                    {veh.models}
                  </span>
                </div>

                <div className="text-xs text-[#59665E] space-y-1.5 pt-2 border-t border-[#DEDCCD]">
                  <div>
                    <strong className="text-[#103F36]">Luggage:</strong> {veh.luggage}
                  </div>
                  <div>
                    <strong className="text-[#103F36]">Ideal for:</strong> {veh.bestFor}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#DEDCCD]">
                <button
                  type="button"
                  onClick={() => {
                    if (veh.id === "sedan" || veh.id === "ertiga" || veh.id === "crysta" || veh.id === "tt13") {
                      setSelectedVehicle(veh.id);
                    }
                    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-outline-forest w-full !py-2 !text-xs text-center cursor-pointer"
                >
                  Select this vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INCLUSIONS & SOP SUMMARY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#DEDCCD]">
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#237A50] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Included in Vehicle Daily Fares
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#172C26]">
            <li className="flex items-start gap-2">
              <span className="text-[#237A50] font-bold">✓</span>
              <span>Dedicated private vehicle with verified local mountain driver</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#237A50] font-bold">✓</span>
              <span>All vehicle fuel, interstate passenger road taxes, and state entry fees</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#237A50] font-bold">✓</span>
              <span>Driver daily night allowance, food, and driver lodging charges</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#237A50] font-bold">✓</span>
              <span>Highway toll charges and regular parking charges as per declared itinerary</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#237A50] font-bold">✓</span>
              <span>Guwahati pickup and drop-off coordination from airport or railway station</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#9F2F24] flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Exclusions & Supplementary Rules
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#59665E]">
            <li className="flex items-start gap-2">
              <span className="text-[#9F2F24] font-bold">✕</span>
              <span>Hotel accommodation, meals, and personal drinks for travellers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9F2F24] font-bold">✕</span>
              <span>Entry tickets at viewpoints, boat ride tickets, and Kaziranga forest safaris</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9F2F24] font-bold">✕</span>
              <span>Air conditioning on steep mountain ascents (switched off to preserve engine power)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9F2F24] font-bold">✕</span>
              <span>Driver duty past 8:00 PM (overtime @ ₹500/hr) or midnight sunrise runs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9F2F24] font-bold">✕</span>
              <span>Arunachal Pradesh ILP / PAP paperwork and local Bum La Pass 4x4 vehicles</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. INSTANT VEHICLE ENQUIRY & ESTIMATOR FORM */}
      <section id="booking-form" className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="badge-forest mb-2">Direct Booking Desk</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
            Calculate Estimated Fare & Reserve
          </h2>
          <p className="text-xs sm:text-sm text-[#59665E] mt-1">
            Choose your journey type, select your preferred car, and our Guwahati team will confirm driver assignment.
          </p>
        </div>

        <form onSubmit={handleVehicleEnquiry} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Route / Service Selector */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Select Route / Journey *
              </label>
              <select
                value={selectedRouteId}
                onChange={(e) => {
                  setSelectedRouteId(e.target.value);
                  const c = availableCircuits.find((x) => x.id === e.target.value);
                  if (c) setDaysCount(c.minDays);
                }}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              >
                {availableCircuits.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.minDays > 1 ? `Min ${c.minDays} days` : "Single Transfer/Day"})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Vehicle Category *
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              >
                <option value="sedan">Compact Sedan (Swift Dzire / Etios)</option>
                <option value="ertiga">MUV (Maruti Ertiga - 5-6 pax)</option>
                <option value="crysta">SUV (Toyota Innova Crysta - 6-7 pax)</option>
                <option value="tt13">Tempo Traveller (13 Seater Group)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Pickup Date in Guwahati *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Number of Days (Min {activeRoute.minDays}) *
              </label>
              <input
                type="number"
                min={activeRoute.minDays}
                max={30}
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              />
            </div>
          </div>

          {/* Rate Estimate Box */}
          <div className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#DEDCCD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#59665E] block">
                Estimated Tariff:
              </span>
              <div className="flex items-baseline gap-2 flex-wrap">
                {dailyRate ? (
                  <>
                    <span className="font-serif text-2xl font-bold text-[#103F36]">
                      ₹{dailyRate.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#59665E]">
                      {activeRoute.minDays > 1 ? "/ day" : "fixed"}
                    </span>
                    {activeRoute.minDays > 1 && estimatedTotal && (
                      <span className="text-xs font-semibold text-[#103F36] bg-[#E9F0EA] px-2.5 py-1 rounded-full ml-2 border border-[#103F36]/20">
                        Total for {daysCount} Days: ₹{estimatedTotal.toLocaleString("en-IN")}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-amber-800 font-bold text-sm bg-amber-50 px-2 py-1 rounded">
                    Selected vehicle not available for this sector. Please select another vehicle.
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs text-[#59665E] sm:text-right">
              <span>All-inclusive driver, fuel, parking & road tolls.</span>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Chandra"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                WhatsApp / Mobile *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
              Pickup Location in Guwahati / Flight Number (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Arriving Guwahati Airport on Indigo 6E-241 at 10:15 AM; 4 passengers with 3 trolley bags."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !dailyRate || !customerName || !phone}
              className="bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-bold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto shadow-md disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting..." : "Send Vehicle Enquiry"}</span>
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hello Divine View Tours, I would like to check vehicle availability for ${activeRoute.name} with ${selectedVehicle}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#103F36] hover:bg-[#103F36] hover:text-white text-[#103F36] font-semibold text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${siteConfig.bookingEmail || "bookings@divineviewtours.com"}?subject=${encodeURIComponent(
                `Vehicle Hire Booking Inquiry: ${activeRoute.name} (${selectedVehicle})`
              )}`}
              className="border border-[#103F36] hover:bg-[#103F36] hover:text-white text-[#103F36] font-semibold text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto transition-all"
              title="Direct Email Booking"
            >
              <Mail className="w-4 h-4 text-[#D9A441]" />
              <span>Email Bookings</span>
            </a>
          </div>
        </form>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6 pt-4">
        <div>
          <span className="badge-forest mb-2">Help & Advice</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
            Frequently Asked Questions on Vehicle Hire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#103F36]">
              Are tolls, parking fees, and driver allowances included?
            </h4>
            <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
              Yes, our standard daily tariffs include the vehicle, mountain fuel, road tolls, interstate passenger entry taxes, and the driver's daily food and stay allowance. You do not pay extra for the driver's lodging.
            </p>
          </div>

          <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#103F36]">
              Why are commercial yellow plates mandatory in Northeast India?
            </h4>
            <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
              State transport authorities and taxi unions in Assam, Meghalaya, and Arunachal Pradesh strictly prohibit private (white plate) vehicles from carrying tourists. We operate only authorized commercial tourist vehicles to ensure hassle-free passage across all interstate checkpoints.
            </p>
          </div>

          <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#103F36]">
              Why does AC not operate on steep hill climbs?
            </h4>
            <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
              In accordance with mountain transport union regulations, vehicle air conditioning is switched off during steep uphill ascents (e.g. Sela Pass or Cherrapunji gorges) to prevent engine overheating and ensure maximum pulling power on hairpin bends. Fresh mountain air keeps temperatures naturally cool.
            </p>
          </div>

          <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#103F36]">
              Can we book same-day return trips from Guwahati?
            </h4>
            <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
              Yes! We offer fixed same-day return packages from Guwahati to Shillong (₹5,000 for Dzire), Kaziranga (₹6,500), and Manas (₹6,000) with early morning departure and comfortable evening drop-off in Guwahati.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
