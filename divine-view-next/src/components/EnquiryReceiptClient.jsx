"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function EnquiryReceiptClient() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "DVT-2026-0841";
  const pkgSlug = searchParams.get("pkg") || "";
  const enquiryType = searchParams.get("type") || "package";

  return (
    <div className="max-w-2xl mx-auto bg-[#FFFDF7] rounded-3xl p-8 sm:p-12 border border-[#DEDCCD] shadow-xl text-center space-y-8">
      <div className="w-16 h-16 rounded-full bg-[#E9F0EA] text-[#237A50] flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="badge-gold text-xs">Request Successfully Received</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
          Thank You! Your Travel Request is Logged
        </h1>
        <p className="text-sm text-[#59665E]">
          Our Guwahati operations desk has received your details and started reviewing availability.
        </p>
      </div>

      {/* Reference Card */}
      <div className="bg-[#F7F3E9] p-6 rounded-2xl border border-[#DEDCCD] space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
          Your Enquiry Reference
        </span>
        <div className="font-mono text-2xl sm:text-3xl font-bold text-[#103F36] tracking-wider">
          {refCode}
        </div>
        <p className="text-xs text-[#59665E]">
          Please quote this reference number in any communication with our team.
        </p>
      </div>

      {/* Next Steps Timeline */}
      <div className="text-left space-y-4 pt-2">
        <h3 className="font-serif text-lg font-bold text-[#103F36] text-center">
          What Happens Next?
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-[#172C26]">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-[#DEDCCD]">
            <span className="w-6 h-6 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong className="font-semibold text-[#103F36]">Availability Check:</strong>{" "}
              We verify room blocks and mountain vehicle rosters for your travel dates.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-[#DEDCCD]">
            <span className="w-6 h-6 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong className="font-semibold text-[#103F36]">Written Quotation:</strong>{" "}
              A local destination specialist will connect via WhatsApp or phone with a detailed itinerary and quote.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-[#DEDCCD]">
            <span className="w-6 h-6 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong className="font-semibold text-[#103F36]">Acceptance & Confirmation:</strong>{" "}
              Review inclusions, customize any stops, and secure your journey with the approved deposit.
            </div>
          </div>
        </div>
      </div>

      {/* Direct WhatsApp connect */}
      <div className="pt-4 border-t border-[#DEDCCD] flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
            `Hi Divine View Tours, I just submitted an enquiry (Ref: ${refCode}). Could you please share the quote?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold !py-3 !px-6 text-sm flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
        >
          <MessageCircle className="w-4 h-4 text-[#172C26]" />
          <span>Chat on WhatsApp with Ref</span>
        </a>

        <Link
          href="/"
          className="btn-outline-forest !py-3 !px-6 text-sm w-full sm:w-auto text-center"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
