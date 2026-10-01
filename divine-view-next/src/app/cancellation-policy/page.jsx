import Link from "next/link";
import { AlertCircle, CheckCircle2, RotateCcw, Info } from "lucide-react";

export const metadata = {
  title: "Cancellation and Refund Policy",
  description: "Clear, transparent cancellation terms, consistent refund calculations, worked examples, and date amendment policies.",
  alternates: {
    canonical: "https://www.divineviewtours.com/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-10">
          <span className="badge-forest mb-2">Fair & Predictable</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Cancellation and Refund Policy
          </h1>
          <p className="text-sm text-[#59665E] mt-2">
            Consistent, transparent cancellation terms designed to protect guests and local partner accommodations.
          </p>
        </div>

        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-sm space-y-10 text-sm sm:text-base leading-relaxed text-[#172C26]">
          {/* Section 1: Standard Calculation Basis */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36]">
              1. Consistent Calculation Method
            </h2>
            <p className="text-[#59665E]">
              To avoid confusion, all cancellation fees are calculated against the <strong>Total Package Price</strong>, and any applicable refund is returned directly from the <strong>Booking Deposit Paid</strong>. Divine View Tours does not hold guests liable for uncollected balances beyond the paid advance deposit, except where non-refundable third-party commitments (such as luxury safari permits or non-transferable flight bookings) were agreed upon in writing.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DEDCCD] text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F7F3E9] text-[#103F36] font-bold">
                    <th className="p-3 border border-[#DEDCCD]">Cancellation Notice Window</th>
                    <th className="p-3 border border-[#DEDCCD]">Cancellation Charge</th>
                    <th className="p-3 border border-[#DEDCCD]">Refund Calculation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DEDCCD] text-[#59665E]">
                  <tr>
                    <td className="p-3 border border-[#DEDCCD] font-medium text-[#103F36]">
                      30 or more days before tour start
                    </td>
                    <td className="p-3 border border-[#DEDCCD]">
                      15% of paid deposit (administrative processing fee)
                    </td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-[#237A50]">
                      85% refund of total paid deposit
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#DEDCCD] font-medium text-[#103F36]">
                      15 to 29 days before tour start
                    </td>
                    <td className="p-3 border border-[#DEDCCD]">
                      50% of total package price
                    </td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-[#103F36]">
                      Deposit retained towards cancellation fee; no further liability
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#DEDCCD] font-medium text-[#103F36]">
                      7 to 14 days before tour start
                    </td>
                    <td className="p-3 border border-[#DEDCCD]">
                      75% of total package price
                    </td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-amber-800">
                      Full deposit retained towards supplier hotel blocks
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#DEDCCD] font-medium text-[#103F36]">
                      Less than 7 days or No-Show
                    </td>
                    <td className="p-3 border border-[#DEDCCD]">
                      100% of package amount paid
                    </td>
                    <td className="p-3 border border-[#DEDCCD] font-semibold text-[#9F2F24]">
                      No refund (Transport and rooms fully reserved)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Worked Example */}
          <section className="space-y-4 bg-[#F7F3E9]/60 p-6 rounded-2xl border border-[#DEDCCD]">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#103F36]" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
                2. Worked Example
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#59665E]">
              Consider a private holiday package with a <strong>Total Price of INR 100,000</strong>, booked with a standard <strong>INR 30,000 Advance Deposit</strong> (30%):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-[#FFFDF7] p-3 rounded-lg border border-[#DEDCCD]">
                <strong className="text-[#103F36] block mb-1">Cancelled at 32 Days</strong>
                <p className="text-[#59665E]">
                  Charge is 15% administrative fee on INR 30,000 deposit (INR 4,500).<br />
                  <span className="text-[#237A50] font-semibold">Refund credited: INR 25,500</span>.
                </p>
              </div>
              <div className="bg-[#FFFDF7] p-3 rounded-lg border border-[#DEDCCD]">
                <strong className="text-[#103F36] block mb-1">Cancelled at 20 Days</strong>
                <p className="text-[#59665E]">
                  50% cancellation fee on package is INR 50,000. The INR 30,000 deposit is fully retained towards hotel releases.<br />
                  <span className="text-amber-800 font-semibold">Refund credited: INR 0 (No extra charge billed)</span>.
                </p>
              </div>
              <div className="bg-[#FFFDF7] p-3 rounded-lg border border-[#DEDCCD]">
                <strong className="text-[#103F36] block mb-1">Cancelled at 10 Days</strong>
                <p className="text-[#59665E]">
                  75% cancellation fee on package is INR 75,000. Deposit is retained.<br />
                  <span className="text-amber-800 font-semibold">Refund credited: INR 0</span>.
                </p>
              </div>
              <div className="bg-[#FFFDF7] p-3 rounded-lg border border-[#DEDCCD]">
                <strong className="text-[#103F36] block mb-1">Cancelled within 6 Days or No-Show</strong>
                <p className="text-[#59665E]">
                  Full retention of all committed payments to compensate drivers and village homestays.<br />
                  <span className="text-[#9F2F24] font-semibold">Refund credited: INR 0</span>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Bookings within 15 Days of Arrival */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36]">
              3. Bookings Made Within 15 Days of Arrival
            </h2>
            <p className="text-[#59665E]">
              For reservations made 15 days or less prior to the scheduled travel date:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>
                <strong>100% full payment</strong> is required upon confirmation so vehicles, dedicated mountain drivers, and room allotments can be locked instantly.
              </li>
              <li>
                Bookings made within 15 days of arrival are <strong>non-refundable</strong> upon confirmation.
              </li>
            </ul>
          </section>

          {/* Section 4: Permits, Safari Slots & Supplier Exceptions */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36]">
              4. Permits, National Park Safaris, and Non-Refundable Items
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#59665E]">
              <li>
                <strong>Government Permits:</strong> Inner Line Permits (ILP) for Arunachal Pradesh and Nagaland, and Protected Area Permits (PAP) for foreign nationals are processed directly through state government portals. Once government fees are paid, they are 100% non-refundable and non-transferable under all circumstances.
              </li>
              <li>
                <strong>Kaziranga and Manas Wildlife Safaris:</strong> Jeep safari vehicle bookings, forest department entry tickets, toll permits, and official naturalist fees are reserved in advance through the Assam Forest Department. Safari tickets are non-refundable and non-changeable once issued.
              </li>
              <li>
                <strong>Peak Season Supplier Policies:</strong> Stays in remote eco-lodges (Cherrapunji, Kaziranga, Tawang) during high-demand festival periods (such as Hornbill Festival or New Year week) operate under strict zero-refund supplier policies once booked. These exceptions will be identified in your customized quote before deposit collection.
              </li>
            </ul>
          </section>

          {/* Section 5: Date Amendments & Rescheduling */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36]">
              5. Date Amendments and Rescheduling
            </h2>
            <p className="text-[#59665E]">
              If flights are disrupted or travel plans shift due to unforeseen personal emergencies:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>
                Requests submitted at least 14 days prior to travel can be rescheduled to any available dates within 6 months with zero administrative penalty, subject to hotel availability and seasonal tariff differences.
              </li>
              <li>
                In the event of severe weather closures, sudden road landslides, or official park shutdowns, our Guwahati operations desk assists with rerouting to alternative scenic valleys of equal value without additional rescheduling charges.
              </li>
            </ul>
          </section>

          {/* Section 6: Refund Processing & International Transactions */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36]">
              6. Refund Processing and International Payments
            </h2>
            <p className="text-[#59665E]">
              Approved refunds are initiated within 5 to 7 business days:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>
                <strong>Domestic Payments (UPI / Net Banking / Debit Card):</strong> Refunded directly to the source account through our secure banking partner.
              </li>
              <li>
                <strong>International Payments (Credit Card / Wire / Wise):</strong> Refunded in Indian Rupees (INR) to the original payment method. The net amount received depends on your card issuer or bank exchange rate and any intermediary banking transfer charges.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
