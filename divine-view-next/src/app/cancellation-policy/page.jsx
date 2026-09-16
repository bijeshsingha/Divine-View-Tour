import Link from "next/link";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy — Divine View Tours",
  description: "Clear, transparent cancellation terms, refund slabs, and date amendment policies.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-10">
          <span className="badge-forest mb-2">Fair & Predictable</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm text-[#59665E] mt-2">
            Clear refund tiers designed to protect both the guest and local community hosts.
          </p>
        </div>

        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[#172C26]">
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              Standard Package Cancellation Slabs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DEDCCD] text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F7F3E9] text-[#103F36] font-bold">
                    <th className="p-3 border border-[#DEDCCD]">Cancellation Notice Window</th>
                    <th className="p-3 border border-[#DEDCCD]">Refund Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DEDCCD] text-[#59665E]">
                  <tr>
                    <td className="p-3 border border-[#DEDCCD]">30 or more days before arrival</td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-[#237A50]">
                      85% refund of total paid deposit (15% administrative processing fee)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#DEDCCD]">15 to 29 days before arrival</td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-[#103F36]">
                      50% refund of total package value
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#DEDCCD]">7 to 14 days before arrival</td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-amber-800">
                      25% refund of total package value
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#DEDCCD]">Less than 7 days or No-Show</td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-[#9F2F24]">
                      No refund (Full retention towards committed hotel rooms & driver blocks)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              Date Amendments & Postponements
            </h2>
            <p className="text-[#59665E]">
              If your flight is cancelled or you need to reschedule dates due to a family emergency:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>Notices given at least 14 days prior to travel can be rescheduled to any available dates within 6 months with zero penalty, subject to seasonal tariff variations.</li>
              <li>Inner Line Permit (ILP) fees once paid to the government cannot be refunded as permits are non-transferable.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              Refund Processing Timeline
            </h2>
            <p className="text-[#59665E]">
              Approved refunds are credited directly to the original payment source (bank account / UPI) within 5 to 7 working business days.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
