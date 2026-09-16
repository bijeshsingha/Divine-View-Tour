import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export const metadata = {
  title: "Booking Terms & Conditions — Divine View Tours",
  description: "Terms of booking, quotations, payment schedule, and operational policies for Northeast India tours.",
};

export default function BookingTermsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-10">
          <span className="badge-forest mb-2">Transparency & Commitments</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Booking Terms & Conditions
          </h1>
          <p className="text-sm text-[#59665E] mt-2">
            Last updated: September 2026 · Operational guidelines for Divine View Tours
          </p>
        </div>

        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[#172C26]">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              1. Enquiries vs. Confirmed Bookings
            </h2>
            <p className="text-[#59665E]">
              Submitting an enquiry via our website, WhatsApp, or phone does not constitute a confirmed booking. A booking is confirmed strictly after:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>Route, hotel room categories, and dedicated vehicle availability are verified by our team.</li>
              <li>A formal written quotation and itinerary are accepted in writing by the guest.</li>
              <li>The required initial deposit payment is successfully received and verified.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              2. Deposit & Payment Schedule
            </h2>
            <p className="text-[#59665E]">
              For standard tour packages:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li><strong>Advance Deposit:</strong> 30% of total package amount upon acceptance of the quotation to secure hotel rooms and vehicle booking.</li>
              <li><strong>Second Installment:</strong> 40% due 15 days prior to arrival date.</li>
              <li><strong>Balance Amount:</strong> 30% payable upon pickup in Guwahati on Day 1 of the journey.</li>
              <li>For standalone vehicle hire, a 25% confirmation advance is required.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              3. Vehicle Use & Mountain Driving Rules
            </h2>
            <p className="text-[#59665E]">
              Dedicated commercial tourist vehicles operate according to the agreed itinerary. As mountain terrain poses distinct safety hazards:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>Daily vehicle duty hours are typically 8:00 AM to 7:00 PM unless a long inter-city transit day is pre-arranged.</li>
              <li>Night mountain driving across high passes (such as Sela Pass) is strictly restricted for traveller safety.</li>
              <li>Tawang local union rules require external cars to halt; local 4x4 vehicles are utilized for Bum La Pass and Madhuri Lake excursions.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              4. Permits & Documentation
            </h2>
            <p className="text-[#59665E]">
              Arunachal Pradesh requires an Inner Line Permit (ILP) for Indian citizens and Protected Area Permit (PAP) for foreign nationals. Nagaland requires an ILP. Guests must provide valid government photo IDs at least 5 days prior to departure for documentation processing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              5. Weather & Force Majeure
            </h2>
            <p className="text-[#59665E]">
              Northeast India occasionally experiences sudden landslides, heavy snowfall at high passes, or cloudbursts. In such unexpected force majeure events, our team assists in arranging safe alternate routes or accommodations. Any additional lodging or transport costs incurred due to road blockades remain the guest’s responsibility.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
