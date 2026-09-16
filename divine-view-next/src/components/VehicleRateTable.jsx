"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car,
  ShieldCheck,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  PhoneCall,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import vehicleData from "@/data/vehicleRates.json";
import siteConfig from "@/data/siteConfig.json";

export default function VehicleRateTable({ compact = false }) {
  const [activeTab, setActiveTab] = useState("direct"); // "direct", "multiday", "circuits", "sop"
  const poster = vehicleData.posterFares;
  const circuits = vehicleData.circuitRatesWithMarkup;

  // COMPACT HOMEPAGE PREVIEW
  if (compact) {
    return (
      <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#DEDCCD] shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DEDCCD] pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441] block mb-1">
              Verified Commercial Fleet
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
              Private Vehicle Fares from Guwahati
            </h3>
            <p className="text-xs sm:text-sm text-[#59665E] mt-1">
              Official rates for local transfers, same-day excursions, and multi-day mountain circuits.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/vehicle-hire"
              className="bg-[#103F36] hover:bg-[#082D27] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>View full rate sheet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#DEDCCD] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#59665E] block">
              Airport Transfers
            </span>
            <div className="font-serif text-2xl font-bold text-[#103F36]">
              From ₹1,000
            </div>
            <p className="text-xs text-[#59665E]">
              Guwahati Airport to City Hotels · Swift Dzire ₹1,000 · Ertiga ₹1,500 · Innova ₹2,000
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#DEDCCD] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#59665E] block">
              Same-Day Shillong
            </span>
            <div className="font-serif text-2xl font-bold text-[#103F36]">
              From ₹5,000
            </div>
            <p className="text-xs text-[#59665E]">
              Round-trip from Guwahati · Swift Dzire ₹5,000 · Ertiga ₹6,000 · Innova ₹7,500
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#DEDCCD] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#59665E] block">
              Meghalaya Tour (Per Day)
            </span>
            <div className="font-serif text-2xl font-bold text-[#103F36]">
              From ₹4,000 <span className="text-xs font-normal">/ day</span>
            </div>
            <p className="text-xs text-[#59665E]">
              Multi-day tours · Swift Dzire ₹4,000/d · Ertiga ₹5,000/d · Innova ₹6,000/d
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#DEDCCD] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#59665E] block">
              Arunachal Pradesh (Per Day)
            </span>
            <div className="font-serif text-2xl font-bold text-[#103F36]">
              From ₹5,000 <span className="text-xs font-normal">/ day</span>
            </div>
            <p className="text-xs text-[#59665E]">
              Tawang mountain sector · Swift Dzire ₹5,000/d · Ertiga ₹6,000/d · Innova ₹7,000/d
            </p>
          </div>
        </div>

        {/* Commercial Badge & Phone Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#E9F0EA]/60 border border-[#103F36]/20 text-xs sm:text-sm text-[#103F36]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D9A441] shrink-0" />
            <span>
              <strong>100% Commercial Tourist Plates:</strong> Verified mountain drivers, commercial permits, GPS tracked, with zero hidden charges.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="font-bold underline hover:text-[#D9A441] transition-colors"
            >
              Call {siteConfig.phone}
            </a>
            <span>or</span>
            <a
              href={`tel:${siteConfig.phoneSecondaryRaw}`}
              className="font-bold underline hover:text-[#D9A441] transition-colors"
            >
              {siteConfig.phoneSecondary}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // FULL INTERACTIVE RATE TABLE FOR /vehicle-hire
  return (
    <div className="space-y-8">
      {/* Alert banner */}
      <div className="bg-[#FFFDF7] border-l-4 border-[#D9A441] p-4 rounded-r-2xl shadow-sm flex items-start gap-3 border border-[#DEDCCD]">
        <AlertCircle className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#172C26] leading-relaxed">
          <strong className="font-semibold text-[#103F36]">
            Transparent Vehicle Hire Fares:
          </strong>{" "}
          Published rates include private commercial vehicle with experienced mountain driver, fuel, highway toll clearances, and driver allowances. Stays, meals, permits, and safaris are quoted separately.
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#DEDCCD] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("direct")}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === "direct"
              ? "bg-[#103F36] text-white shadow-md"
              : "bg-[#FFFDF7] text-[#59665E] hover:bg-[#F7F3E9] border border-[#DEDCCD]"
          }`}
        >
          Direct Fares (Transfers & Returns)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("multiday")}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === "multiday"
              ? "bg-[#103F36] text-white shadow-md"
              : "bg-[#FFFDF7] text-[#59665E] hover:bg-[#F7F3E9] border border-[#DEDCCD]"
          }`}
        >
          Multi-Day Daily Tariffs (Poster)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("circuits")}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === "circuits"
              ? "bg-[#103F36] text-white shadow-md"
              : "bg-[#FFFDF7] text-[#59665E] hover:bg-[#F7F3E9] border border-[#DEDCCD]"
          }`}
        >
          Extended Circuits & Group Fleet (TTAA + Markup)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("sop")}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === "sop"
              ? "bg-[#103F36] text-white shadow-md"
              : "bg-[#FFFDF7] text-[#59665E] hover:bg-[#F7F3E9] border border-[#DEDCCD]"
          }`}
        >
          Operating Rules & SOP
        </button>
      </div>

      {/* TAB 1: LOCAL TRANSFERS & SAME-DAY RETURNS */}
      {activeTab === "direct" && (
        <div className="space-y-8">
          {/* Local & Transfers Table */}
          <div className="bg-[#FFFDF7] rounded-2xl shadow-sm border border-[#DEDCCD] overflow-hidden">
            <div className="p-4 sm:p-5 bg-[#F7F3E9] border-b border-[#DEDCCD] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
                  1. Local & Airport Transfers (Guwahati)
                </h4>
                <p className="text-xs text-[#59665E] mt-0.5">
                  Point-to-point and city sightseeing with fuel and driver included
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#103F36] bg-[#E9F0EA] px-2.5 py-1 rounded-full border border-[#103F36]/20 self-start sm:self-auto">
                Fixed Fares (INR ₹)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#DEDCCD] bg-[#FFFDF7] text-xs font-bold uppercase tracking-wider text-[#59665E]">
                    <th className="py-3.5 px-4 sm:px-6">Service</th>
                    <th className="py-3.5 px-3 sm:px-4">Coverage & Details</th>
                    <th className="py-3.5 px-3 sm:px-4 text-right">
                      Dzire
                      <span className="block text-[10px] text-[#59665E] font-normal lowercase">Sedan (1-4 pax)</span>
                    </th>
                    <th className="py-3.5 px-3 sm:px-4 text-right">
                      Ertiga
                      <span className="block text-[10px] text-[#59665E] font-normal lowercase">MUV (4-6 pax)</span>
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">
                      Innova Crysta
                      <span className="block text-[10px] text-[#59665E] font-normal lowercase">SUV (5-7 pax)</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DEDCCD] text-sm text-[#172C26]">
                  {poster.localAndTransfers.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F7F3E9]/60 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-[#103F36]">
                        {item.service}
                        <span className="block text-xs font-normal text-[#59665E] mt-0.5">
                          {item.duration}
                        </span>
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-xs text-[#59665E] max-w-xs">
                        {item.coverage}
                        {item.footnote && (
                          <span className="block text-[11px] text-amber-800 mt-1 font-medium">
                            * {item.footnote}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-right font-bold text-[#103F36]">
                        ₹{item.dzire.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-right font-bold text-[#103F36]">
                        ₹{item.ertiga.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-bold text-[#103F36]">
                        ₹{item.innova.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Same-Day Return Trips Table */}
          <div className="bg-[#FFFDF7] rounded-2xl shadow-sm border border-[#DEDCCD] overflow-hidden">
            <div className="p-4 sm:p-5 bg-[#F7F3E9] border-b border-[#DEDCCD] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
                  2. Same-Day Return Trips from Guwahati
                </h4>
                <p className="text-xs text-[#59665E] mt-0.5">
                  Early morning departure and evening return to Guwahati in private vehicle
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#103F36] bg-[#E9F0EA] px-2.5 py-1 rounded-full border border-[#103F36]/20 self-start sm:self-auto">
                Same-Day Roundtrip
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#DEDCCD] bg-[#FFFDF7] text-xs font-bold uppercase tracking-wider text-[#59665E]">
                    <th className="py-3.5 px-4 sm:px-6">Destination</th>
                    <th className="py-3.5 px-3 sm:px-4">Travel Distance & Highlights</th>
                    <th className="py-3.5 px-3 sm:px-4 text-right">
                      Dzire
                      <span className="block text-[10px] text-[#59665E] font-normal lowercase">Sedan</span>
                    </th>
                    <th className="py-3.5 px-3 sm:px-4 text-right">
                      Ertiga
                      <span className="block text-[10px] text-[#59665E] font-normal lowercase">MUV</span>
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">
                      Innova Crysta
                      <span className="block text-[10px] text-[#59665E] font-normal lowercase">SUV</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DEDCCD] text-sm text-[#172C26]">
                  {poster.sameDayReturns.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F7F3E9]/60 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-[#103F36]">
                        {item.destination}
                        <span className="block text-xs font-normal text-[#59665E] mt-0.5">
                          {item.distance}
                        </span>
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-xs text-[#59665E] max-w-sm">
                        {item.coverage}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-right font-bold text-[#103F36]">
                        ₹{item.dzire.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-right font-bold text-[#103F36]">
                        ₹{item.ertiga.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-bold text-[#103F36]">
                        ₹{item.innova.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-DAY PER-DAY TOURS (POSTER RATES) */}
      {activeTab === "multiday" && (
        <div className="bg-[#FFFDF7] rounded-2xl shadow-sm border border-[#DEDCCD] overflow-hidden">
          <div className="p-4 sm:p-5 bg-[#F7F3E9] border-b border-[#DEDCCD] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
                Multi-Day Tours · Daily Fares (per vehicle / day)
              </h4>
              <p className="text-xs text-[#59665E] mt-0.5">
                Exact rates as published on the official Divine View Tours pricing poster
              </p>
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#103F36] bg-[#E9F0EA] px-2.5 py-1 rounded-full border border-[#103F36]/20 self-start sm:self-auto">
              Per Day Rates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DEDCCD] bg-[#FFFDF7] text-xs font-bold uppercase tracking-wider text-[#59665E]">
                  <th className="py-3.5 px-4 sm:px-6">Region / Sector</th>
                  <th className="py-3.5 px-3 sm:px-4">Typical Places Covered</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Min Days</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">
                    Dzire
                    <span className="block text-[10px] text-[#59665E] font-normal lowercase">Sedan / day</span>
                  </th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">
                    Ertiga
                    <span className="block text-[10px] text-[#59665E] font-normal lowercase">MUV / day</span>
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">
                    Innova Crysta
                    <span className="block text-[10px] text-[#59665E] font-normal lowercase">SUV / day</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDCCD] text-sm text-[#172C26]">
                {poster.multiDayPerDay.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7F3E9]/60 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#103F36]">
                      {item.region}
                      {item.footnote && (
                        <span className="block text-[11px] text-amber-800 mt-0.5 font-medium">
                          * {item.footnote}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-xs text-[#59665E] max-w-sm">
                      {item.coverage}
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-center">
                      <span className="badge-forest text-xs whitespace-nowrap">
                        {item.minDays} Days+
                      </span>
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-right font-bold text-[#103F36]">
                      ₹{item.dzire.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-right font-bold text-[#103F36]">
                      ₹{item.ertiga.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-bold text-[#103F36]">
                      ₹{item.innova.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: EXTENDED CIRCUITS & GROUP FLEET (TTAA BASE + MARKUP) */}
      {activeTab === "circuits" && (
        <div className="bg-[#FFFDF7] rounded-2xl shadow-sm border border-[#DEDCCD] overflow-hidden">
          <div className="p-4 sm:p-5 bg-[#F7F3E9] border-b border-[#DEDCCD] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
                Extended Circuits & Group Fleet Rates (per day)
              </h4>
              <p className="text-xs text-[#59665E] mt-0.5">
                {circuits.description}
              </p>
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#D9A441] bg-[#103F36] px-3 py-1 rounded-full text-white self-start sm:self-auto">
              TTAA Aligned + Service Markup
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-[#DEDCCD] bg-[#FFFDF7] text-[11px] font-bold uppercase tracking-wider text-[#59665E]">
                  <th className="py-3.5 px-4">Circuit / Sector</th>
                  <th className="py-3.5 px-2 text-center">Min Days</th>
                  <th className="py-3.5 px-3 text-right">
                    Sedan
                    <span className="block text-[9px] text-[#59665E] font-normal lowercase">Dzire</span>
                  </th>
                  <th className="py-3.5 px-3 text-right">
                    Ertiga
                    <span className="block text-[9px] text-[#59665E] font-normal lowercase">MUV</span>
                  </th>
                  <th className="py-3.5 px-3 text-right">
                    Innova Crysta
                    <span className="block text-[9px] text-[#59665E] font-normal lowercase">Premium SUV</span>
                  </th>
                  <th className="py-3.5 px-3 text-right">
                    TT-13
                    <span className="block text-[9px] text-[#59665E] font-normal lowercase">13 Seater</span>
                  </th>
                  <th className="py-3.5 px-3 text-right">
                    TT-17 / TT-26
                    <span className="block text-[9px] text-[#59665E] font-normal lowercase">17 / 26 Seater</span>
                  </th>
                  <th className="py-3.5 px-4 text-right">
                    Force Urbania
                    <span className="block text-[9px] text-[#D9A441] font-bold lowercase">Luxury Van</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDCCD] text-xs sm:text-sm text-[#172C26]">
                {circuits.sectors.map((sec) => (
                  <tr key={sec.id} className="hover:bg-[#F7F3E9]/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#103F36]">
                      {sec.sector}
                      <span className="block text-[11px] font-normal text-[#59665E] mt-0.5">
                        {sec.coverage}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="badge-forest text-[11px] whitespace-nowrap">
                        {sec.minDays}D+
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right font-medium">
                      {sec.sedan ? (
                        <>
                          <div className="font-bold text-[#103F36]">₹{sec.sedan.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-[#59665E] block">base ₹{sec.baseSedan}</span>
                        </>
                      ) : (
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          Not offered
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 text-right font-medium">
                      <div className="font-bold text-[#103F36]">₹{sec.ertiga.toLocaleString("en-IN")}</div>
                      <span className="text-[10px] text-[#59665E] block">base ₹{sec.baseErtiga}</span>
                    </td>
                    <td className="py-4 px-3 text-right font-medium">
                      <div className="font-bold text-[#103F36]">₹{sec.crysta.toLocaleString("en-IN")}</div>
                      <span className="text-[10px] text-[#59665E] block">base ₹{sec.baseCrysta}</span>
                    </td>
                    <td className="py-4 px-3 text-right font-medium">
                      {sec.tt13 ? (
                        <>
                          <div className="font-bold text-[#103F36]">₹{sec.tt13.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-[#59665E] block">base ₹{sec.baseTT13}</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-4 px-3 text-right font-medium">
                      {sec.tt17 ? (
                        <>
                          <div className="font-bold text-[#103F36]">₹{sec.tt17.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-[#59665E] block">26-str: ₹{sec.tt26.toLocaleString("en-IN")}</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      {sec.urbania ? (
                        <>
                          <div className="font-bold text-[#D9A441]">₹{sec.urbania.toLocaleString("en-IN")}</div>
                          <span className="text-[10px] text-[#59665E] block">base ₹{sec.baseUrbania}</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#F7F3E9]/50 border-t border-[#DEDCCD] text-xs text-[#59665E] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              * Base rates reflect Tourist Transporter Association of Assam circular ref TTAA/AT/2026-27/190. Retail marked-up rates include trip management, vehicle sanitization, and 24/7 mountain dispatch.
            </span>
            <span className="font-semibold text-[#103F36] shrink-0">
              Coaches (22–24 str): Available on request
            </span>
          </div>
        </div>
      )}

      {/* TAB 4: OPERATING SOP & RULES */}
      {activeTab === "sop" && (
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-8 border border-[#DEDCCD] shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-[#DEDCCD] pb-4">
            <ShieldCheck className="w-6 h-6 text-[#103F36]" />
            <div>
              <h4 className="font-serif text-xl font-bold text-[#103F36]">
                Tourist Vehicle Operating SOP & Rules
              </h4>
              <p className="text-xs text-[#59665E]">
                Official operating guidelines established under the Tourist Transporter Association of Assam
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {vehicleData.associationSOP.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F7F3E9] border border-[#DEDCCD] space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#103F36]">
                  <span className="w-5 h-5 rounded-full bg-[#103F36] text-white flex items-center justify-center text-[10px] shrink-0">
                    {idx}
                  </span>
                  <span>{rule.title}</span>
                </div>
                <p className="text-xs text-[#59665E] leading-relaxed pl-7">
                  {rule.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Booking Callout with both numbers */}
      <div className="bg-[#103F36] text-[#F7F3E9] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441] block">
            Guwahati Transport Desk
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Need a verified driver for custom dates?
          </h4>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg">
            Speak directly with our local route coordinators in Dispur, Guwahati for vehicle availability and instant booking confirmations.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-bold text-xs sm:text-sm px-5 py-3 rounded-full flex items-center gap-2 transition-all shadow-md"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {siteConfig.phone}</span>
          </a>

          <a
            href={`tel:${siteConfig.phoneSecondaryRaw}`}
            className="bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full flex items-center gap-2 transition-all border border-white/30"
          >
            <PhoneCall className="w-4 h-4 text-[#D9A441]" />
            <span>Call {siteConfig.phoneSecondary}</span>
          </a>

          <a
            href={`https://wa.me/916026504087?text=${encodeURIComponent(
              "Hello Divine View Tours, I would like to check vehicle availability and rates."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full flex items-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
