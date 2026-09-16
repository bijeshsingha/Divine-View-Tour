"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Download,
  Settings,
  Car,
  Package,
  ArrowLeft,
  Inbox
} from "lucide-react";
import initialVehicleRates from "@/data/vehicleRates.json";
import initialPackagesData from "@/data/packagesData.json";

export default function AdminPricingPage() {
  const [vehicleRates, setVehicleRates] = useState(initialVehicleRates);
  const [packages, setPackages] = useState(initialPackagesData);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Handle vehicle route price change
  const handleRateChange = (routeId, field, value) => {
    const numericVal = value === "" ? null : Number(value);
    setVehicleRates({
      ...vehicleRates,
      routes: (vehicleRates?.routes || []).map((r) =>
        r.id === routeId ? { ...r, [field]: numericVal } : r
      ),
    });
  };

  // Handle package price change
  const handlePackagePriceChange = (pkgId, field, value) => {
    setPackages(
      packages.map((p) =>
        p.id === pkgId
          ? {
              ...p,
              [field]: field === "priceAmount" ? (value === "" ? null : Number(value)) : value,
            }
          : p
      )
    );
  };

  // Save changes to API
  const handleSaveAll = async () => {
    setIsSaving(true);
    setStatusMsg("");

    try {
      const [resVehicles, resPackages] = await Promise.all([
        fetch("/api/vehicle-rates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicleRates),
        }),
        fetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(packages),
        }),
      ]);

      if (resVehicles.ok && resPackages.ok) {
        setStatusMsg("All pricing changes successfully saved! Live across all pages.");
      } else {
        setStatusMsg("Changes saved in memory. Download JSON backup to persist permanently.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Changes saved locally in state. Use Download JSON below to update files.");
    } finally {
      setIsSaving(false);
    }
  };

  // Export JSON
  const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="text-xs font-semibold text-[#59665E] hover:text-[#103F36] inline-flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#D9A441]" />
              <h1 className="font-serif text-3xl font-bold text-[#103F36]">
                Pricing & Tariffs Control Center
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#59665E] mt-1">
              Update vehicle daily rates and tour package starting prices. Changes take effect across all user-facing views immediately.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="btn-gold !py-2.5 !px-6 text-sm font-semibold flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-[#DEDCCD] pb-1 mb-8">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 text-sm font-medium text-[#59665E] hover:text-[#103F36] border-b-2 border-transparent flex items-center gap-2 transition-colors"
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries Inbox</span>
          </Link>
          <Link
            href="/admin/pricing"
            className="px-4 py-2 text-sm font-bold border-b-2 border-[#103F36] text-[#103F36] flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>Pricing & Tariffs</span>
          </Link>
        </div>

        {/* Status Notification */}
        {statusMsg && (
          <div className="mb-6 p-4 rounded-xl bg-[#E9F0EA] border border-[#237A50]/30 text-[#103F36] text-sm flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#237A50] shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* SECTION 1: VEHICLE HIRE DAILY RATES */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#DEDCCD] shadow-sm space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEDCCD] pb-4">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-[#103F36]" />
              <h2 className="font-serif text-xl font-bold text-[#103F36]">
                Private Vehicle Daily Rates (per vehicle / day in ₹)
              </h2>
            </div>
            <button
              onClick={() => downloadJSON(vehicleRates, "vehicleRates.json")}
              className="btn-outline-forest !py-1.5 !px-3 text-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export vehicleRates.json</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F7F3E9] text-[#103F36] font-bold uppercase tracking-wider">
                  <th className="p-3">Route Circuit</th>
                  <th className="p-3 text-center">Min Days</th>
                  <th className="p-3 text-right">Sedan (₹)</th>
                  <th className="p-3 text-right">Ertiga MUV (₹)</th>
                  <th className="p-3 text-right">Innova Crysta (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDCCD]">
                {(vehicleRates?.routes || []).map((r) => (
                  <tr key={r.id} className="hover:bg-[#F7F3E9]/50">
                    <td className="p-3 font-semibold text-[#103F36]">
                      {r.route}
                      <span className="block text-[11px] text-[#59665E] font-normal">
                        {r.notes}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="badge-forest text-xs">{r.minimumDays}d+</span>
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        placeholder="N/A"
                        value={r.sedan !== null ? r.sedan : ""}
                        onChange={(e) => handleRateChange(r.id, "sedan", e.target.value)}
                        className="w-24 bg-[#F7F3E9] p-2 rounded-lg border border-[#DEDCCD] text-right font-semibold text-[#103F36]"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        value={r.ertiga || ""}
                        onChange={(e) => handleRateChange(r.id, "ertiga", e.target.value)}
                        className="w-24 bg-[#F7F3E9] p-2 rounded-lg border border-[#DEDCCD] text-right font-semibold text-[#103F36]"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        value={r.crysta || ""}
                        onChange={(e) => handleRateChange(r.id, "crysta", e.target.value)}
                        className="w-24 bg-[#F7F3E9] p-2 rounded-lg border border-[#DEDCCD] text-right font-bold text-[#103F36]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: HOLIDAY PACKAGES PRICING */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#DEDCCD] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEDCCD] pb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#103F36]" />
              <h2 className="font-serif text-xl font-bold text-[#103F36]">
                Tour Package Starting Costs & Price Modes
              </h2>
            </div>
            <button
              onClick={() => downloadJSON(packages, "packagesData.json")}
              className="btn-outline-forest !py-1.5 !px-3 text-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export packagesData.json</span>
            </button>
          </div>

          <div className="space-y-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#DEDCCD] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="badge-forest text-xs">{pkg.destinationLabel}</span>
                    <span className="text-xs text-[#59665E]">
                      {pkg.durationDays}D / {pkg.durationNights}N
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36] mt-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#59665E] line-clamp-1">{pkg.summary}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Price Mode */}
                  <div>
                    <label className="text-[11px] font-bold text-[#59665E] block mb-1">
                      Price Mode
                    </label>
                    <select
                      value={pkg.priceMode}
                      onChange={(e) => handlePackagePriceChange(pkg.id, "priceMode", e.target.value)}
                      className="bg-[#FFFDF7] p-2 rounded-lg border border-[#DEDCCD] text-xs font-semibold text-[#172C26]"
                    >
                      <option value="starting_from">Starting From</option>
                      <option value="fixed">Fixed Price</option>
                      <option value="request_quote">Price on Request</option>
                    </select>
                  </div>

                  {/* Price Amount */}
                  <div>
                    <label className="text-[11px] font-bold text-[#59665E] block mb-1">
                      Amount (₹ / person)
                    </label>
                    <input
                      type="number"
                      disabled={pkg.priceMode === "request_quote"}
                      value={pkg.priceAmount || ""}
                      onChange={(e) => handlePackagePriceChange(pkg.id, "priceAmount", e.target.value)}
                      className="w-28 bg-[#FFFDF7] p-2 rounded-lg border border-[#DEDCCD] text-right text-xs font-bold text-[#103F36] disabled:opacity-40"
                    />
                  </div>

                  {/* Price Basis */}
                  <div>
                    <label className="text-[11px] font-bold text-[#59665E] block mb-1">
                      Price Basis Note
                    </label>
                    <input
                      type="text"
                      value={pkg.priceBasis || ""}
                      onChange={(e) => handlePackagePriceChange(pkg.id, "priceBasis", e.target.value)}
                      className="w-48 bg-[#FFFDF7] p-2 rounded-lg border border-[#DEDCCD] text-xs text-[#172C26]"
                      placeholder="e.g. min 4 travellers"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Footer */}
        <div className="mt-8 p-4 bg-[#FFFDF7] rounded-xl border border-[#DEDCCD] text-xs text-[#59665E] flex items-center justify-between">
          <span>
            📘 For more instructions on data models and updating schema, see{" "}
            <Link href="/" className="text-[#103F36] font-bold underline">
              PRICING_MANAGEMENT.md
            </Link>
          </span>
          <button
            onClick={handleSaveAll}
            className="btn-gold !py-1.5 !px-4 text-xs font-semibold"
          >
            Save All
          </button>
        </div>
      </div>
    </main>
  );
}
