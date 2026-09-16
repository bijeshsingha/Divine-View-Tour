"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Clock
} from "lucide-react";
import vehicleData from "@/data/vehicleRates.json";
import siteConfig from "@/data/siteConfig.json";
import VehicleRateTable from "@/components/VehicleRateTable";

export default function VehicleHireClient() {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState(vehicleData.routes[0].id);
  const [selectedVehicle, setSelectedVehicle] = useState("ertiga");
  const [daysCount, setDaysCount] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find active route object
  const activeRouteObj = vehicleData.routes.find((r) => r.id === selectedRoute) || vehicleData.routes[0];

  // Daily rate
  const dailyRate = activeRouteObj[selectedVehicle];

  // Estimated total
  const estimatedTotal = dailyRate ? dailyRate * Math.max(activeRouteObj.minimumDays, daysCount) : null;

  const handleVehicleEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vehicle_hire",
          routeName: activeRouteObj.route,
          vehicleType: selectedVehicle,
          days: Math.max(activeRouteObj.minimumDays, daysCount),
          startDate,
          customerName,
          phone,
          email,
          specialRequests,
          estimatedDailyRate: dailyRate,
        }),
      });

      const data = await res.json();
      const ref = data.reference || `DVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      router.push(`/enquiry/received?ref=${ref}&type=vehicle`);
    } catch (err) {
      console.error(err);
      const ref = `DVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      router.push(`/enquiry/received?ref=${ref}&type=vehicle`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. RATE TABLE */}
      <section className="space-y-6">
        <div>
          <span className="badge-forest mb-2">Approved Tariffs</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
            Standard Route Rate Cards
          </h2>
          <p className="text-xs sm:text-sm text-[#59665E] mt-1">
            Prices include private car, fuel, tolls, parking, and driver allowance. Zero surprise charges on the road.
          </p>
        </div>

        <VehicleRateTable compact={false} />
      </section>

      {/* 2. FLEET SHOWCASE */}
      <section className="space-y-6">
        <div>
          <span className="badge-forest mb-2">Our Guwahati Fleet</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
            Choose Your Travel Vehicle
          </h2>
          <p className="text-xs sm:text-sm text-[#59665E] mt-1">
            All vehicles carry commercial tourist permits, GPS tracking, and experienced hill drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicleData.vehicles.map((veh) => (
            <div
              key={veh.id}
              className="bg-[#FFFDF7] rounded-2xl overflow-hidden border border-[#DEDCCD] shadow-sm flex flex-col justify-between p-5 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="h-32 w-full flex items-center justify-center p-2 bg-[#F7F3E9] rounded-xl">
                  <img
                    src={veh.image}
                    alt={veh.name}
                    className="max-h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    {veh.name}
                  </h3>
                  <span className="text-xs text-[#D9A441] font-semibold block">
                    {veh.models}
                  </span>
                  <span className="text-xs text-[#59665E] block mt-0.5">
                    {veh.capacity}
                  </span>
                </div>

                <ul className="text-xs text-[#59665E] space-y-1 pt-2 border-t border-[#DEDCCD]">
                  {veh.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-[#DEDCCD]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVehicle(veh.id);
                    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-outline-forest w-full !py-2 !text-xs text-center"
                >
                  Select this vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INCLUSIONS & POLICIES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#DEDCCD]">
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#237A50] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Vehicle Rental Inclusions
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#172C26]">
            {vehicleData.inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#237A50] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#9F2F24] flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Clear Exclusions
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#59665E]">
            {vehicleData.exclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#9F2F24] font-bold">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. INSTANT VEHICLE ENQUIRY & ESTIMATOR FORM */}
      <section id="booking-form" className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="badge-forest mb-2">Direct Fleet Booking</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
            Reserve Your Vehicle & Mountain Driver
          </h2>
          <p className="text-xs sm:text-sm text-[#59665E] mt-1">
            Pick your circuit, check estimated daily rates, and our Guwahati team will confirm car assignment.
          </p>
        </div>

        <form onSubmit={handleVehicleEnquiry} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Route */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Select Route / Circuit *
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => {
                  setSelectedRoute(e.target.value);
                  const r = vehicleData.routes.find((x) => x.id === e.target.value);
                  if (r) setDaysCount(r.minimumDays);
                }}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              >
                {vehicleData.routes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.route} (Min {r.minimumDays} days)
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Vehicle Type *
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              >
                <option value="sedan">Compact Sedan (Swift Dzire)</option>
                <option value="ertiga">MUV (Maruti Ertiga)</option>
                <option value="crysta">SUV (Innova Crysta)</option>
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
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                Trip Duration (Min {activeRouteObj.minimumDays} days) *
              </label>
              <input
                type="number"
                min={activeRouteObj.minimumDays}
                max={30}
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
            </div>
          </div>

          {/* Rate Estimate Card */}
          <div className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#DEDCCD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#59665E]">
                Approved Daily Tariff:
              </span>
              <div className="flex items-baseline gap-2">
                {dailyRate ? (
                  <>
                    <span className="font-serif text-2xl font-bold text-[#103F36]">
                      ₹{dailyRate.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#59665E]">/ day</span>
                    {estimatedTotal && (
                      <span className="text-xs font-semibold text-[#103F36] bg-[#E9F0EA] px-2 py-0.5 rounded ml-2">
                        Est. {daysCount} Days: ₹{estimatedTotal.toLocaleString("en-IN")}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-amber-800 font-bold text-sm bg-amber-50 px-2 py-1 rounded">
                    Sedan not offered for this mountain sector. Please select Ertiga or Crysta.
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs text-[#59665E] sm:text-right">
              <span>All-inclusive driver, fuel & road tolls.</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Bora"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                WhatsApp / Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
              Flight Details / Special Notes (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Arriving Guwahati 11:30 AM via Indigo; have 3 large suitcases."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !dailyRate || !customerName || !phone}
              className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting..." : "Send Vehicle Enquiry"}</span>
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hi Divine View Tours, I would like to check vehicle availability for ${activeRouteObj.route} with ${selectedVehicle}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-forest !py-3 !px-6 text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-[#237A50]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
