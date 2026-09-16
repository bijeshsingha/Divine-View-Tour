import Link from "next/link";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Divine View Tours",
  description: "Our minimal data collection practices and strict traveller privacy commitments.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-10">
          <span className="badge-forest mb-2">Privacy & Security</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#59665E] mt-2">
            Effective: September 2026 · Divine View Tours, Guwahati
          </p>
        </div>

        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-[#172C26]">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              1. Minimal Data Collection
            </h2>
            <p className="text-[#59665E]">
              We collect only the essential personal details required to prepare your travel itinerary and obtain mandatory government permissions (such as Inner Line Permits for Arunachal Pradesh and Nagaland). We do not require accounts to browse packages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              2. How Your Information is Used
            </h2>
            <p className="text-[#59665E]">
              Your contact details (name, phone/WhatsApp number, email) are utilized strictly for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#59665E]">
              <li>Sharing your tailored quotation, vehicle assignment, and day-by-day itinerary.</li>
              <li>Operational roadside coordination and driver meetup in Guwahati.</li>
              <li>Filing government ILP documentation for restricted entry regions.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              3. Zero Third-Party Advertising
            </h2>
            <p className="text-[#59665E]">
              We do not sell, rent, or trade your contact information or travel plans with third-party marketing networks or automated data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#103F36]">
              4. Payment & Security
            </h2>
            <p className="text-[#59665E]">
              We do not store credit card or debit card details on our servers. Any electronic payments are processed through secure, bank-grade hosted payment gateways with TLS encryption.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
