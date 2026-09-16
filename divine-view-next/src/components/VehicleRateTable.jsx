import Link from "next/link";
import { Car, ShieldCheck, AlertCircle, Calendar } from "lucide-react";
import vehicleData from "@/data/vehicleRates.json";

export default function VehicleRateTable({ compact = false }) {
  return (
    <div className="space-y-4">
      {/* Service type clarification alert */}
      <div className="bg-[#FFFDF7] border-l-4 border-[#D9A441] p-4 rounded-r-xl shadow-sm flex items-start gap-3 border border-[#DEDCCD]">
        <AlertCircle className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#172C26]">
          <strong className="font-semibold text-[#103F36]">
            Vehicle Fares Only:
          </strong>{" "}
          These rates cover the private dedicated vehicle, mountain driver allowance, fuel, interstate permits, and highway tolls. Hotel accommodation, meals, entrance fees, and safari permits are quoted separately.
        </div>
      </div>

      {/* Table container */}
      <div className="bg-[#FFFDF7] rounded-2xl shadow-sm border border-[#DEDCCD] overflow-hidden">
        <div className="p-4 sm:p-5 bg-[#F7F3E9] border-b border-[#DEDCCD] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
              Approved Public Daily Rates (per vehicle / day)
            </h3>
            <p className="text-xs text-[#59665E] mt-0.5">
              {vehicleData.effectiveLabel}
            </p>
          </div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#103F36] bg-[#E9F0EA] px-2.5 py-1 rounded-full border border-[#103F36]/20 self-start sm:self-auto">
            All prices in INR (₹)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DEDCCD] bg-[#FFFDF7] text-xs font-bold uppercase tracking-wider text-[#59665E]">
                <th className="py-3.5 px-4 sm:px-6">Route / Circuit</th>
                <th className="py-3.5 px-3 sm:px-4 text-center">Min Duration</th>
                <th className="py-3.5 px-3 sm:px-4 text-right">
                  Sedan
                  <span className="block text-[10px] text-[#59665E] font-normal lowercase">Dzire / Etios</span>
                </th>
                <th className="py-3.5 px-3 sm:px-4 text-right">
                  Ertiga
                  <span className="block text-[10px] text-[#59665E] font-normal lowercase">MUV 5-6 pax</span>
                </th>
                <th className="py-3.5 px-4 sm:px-6 text-right">
                  Innova Crysta
                  <span className="block text-[10px] text-[#59665E] font-normal lowercase">SUV 6-7 pax</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEDCCD] text-sm text-[#172C26]">
              {vehicleData.routes.map((r) => (
                <tr key={r.id} className="hover:bg-[#F7F3E9]/60 transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-semibold text-[#103F36]">{r.route}</div>
                    {!compact && (
                      <div className="text-xs text-[#59665E] mt-0.5 max-w-sm">
                        {r.notes}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-3 sm:px-4 text-center">
                    <span className="badge-forest text-xs whitespace-nowrap">
                      {r.minimumDays} Days+
                    </span>
                  </td>
                  <td className="py-4 px-3 sm:px-4 text-right font-medium">
                    {r.sedan !== null ? (
                      <span className="font-semibold text-[#103F36]">
                        ₹{r.sedan.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                        Not offered
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-3 sm:px-4 text-right font-semibold text-[#103F36]">
                    ₹{r.ertiga.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right font-bold text-[#103F36]">
                    ₹{r.crysta.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inclusions summary */}
        <div className="p-4 sm:p-5 bg-[#F7F3E9]/40 border-t border-[#DEDCCD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#59665E]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-[#103F36]">Includes:</span>
            <span>✓ Dedicated local mountain driver</span>
            <span>✓ Fuel, road tolls & interstate taxes</span>
            <span>✓ Driver lodging & allowance</span>
          </div>
          <Link
            href="/vehicle-hire#booking-form"
            className="btn-gold !py-2 !px-4 !text-xs !min-h-[38px] whitespace-nowrap shrink-0"
          >
            Inquire Vehicle Availability
          </Link>
        </div>
      </div>
    </div>
  );
}
