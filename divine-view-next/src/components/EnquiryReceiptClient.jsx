"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  User,
  Car,
  MapPin,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  FileText,
  ArrowRight
} from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function EnquiryReceiptClient() {
  const searchParams = useSearchParams();
  const urlRef = searchParams.get("ref") || "";
  const pkgSlug = searchParams.get("pkg") || "";
  const enquiryType = searchParams.get("type") || "package";

  const [activeRef, setActiveRef] = useState(urlRef);
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchEnquiry() {
      try {
        if (urlRef) {
          const res = await fetch(`/api/enquiries?ref=${encodeURIComponent(urlRef)}`);
          const data = await res.json();
          if (data.success && data.enquiry) {
            setEnquiry(data.enquiry);
            setActiveRef(data.enquiry.reference);
          }
        } else {
          // If no ref specified, fetch the most recently submitted booking
          const res = await fetch("/api/enquiries");
          const data = await res.json();
          if (data.success && Array.isArray(data.enquiries) && data.enquiries.length > 0) {
            const latest = data.enquiries[0];
            setEnquiry(latest);
            setActiveRef(latest.reference || "DVT-2026-0000");
          }
        }
      } catch (err) {
        console.warn("Could not load enquiry details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEnquiry();
  }, [urlRef]);

  const refCode = activeRef || enquiry?.reference || "DVT-2026-0000";

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBooking =
    enquiryType === "package" ||
    enquiryType === "vehicle" ||
    enquiryType === "custom" ||
    enquiry?.type !== "contact_message";

  const targetEmail = isBooking
    ? (siteConfig.bookingEmail || "bookings@divineviewtours.com")
    : (siteConfig.infoEmail || "info@divineviewtours.com");

  const serviceTitle =
    enquiry?.packageTitle ||
    enquiry?.routeName ||
    (enquiry?.type === "custom_trip"
      ? "Custom Northeast Itinerary"
      : enquiry?.type === "vehicle_hire"
      ? "Private Vehicle Hire"
      : "Holiday Tour Package");

  const formattedDate =
    enquiry?.startDate ||
    enquiry?.travelMonth ||
    "Dates to be coordinated";

  const durationLabel =
    enquiry?.days
      ? `${enquiry.days} Day${enquiry.days > 1 ? "s" : ""}`
      : enquiry?.tripDuration || "Full Tour";

  const whatsappMessage = `Hi Divine View Tours, I just submitted an inquiry on your website (Ref: ${refCode}) for ${serviceTitle}. Please confirm vehicle and room availability with quote.`;

  return (
    <div className="max-w-2xl mx-auto bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border border-[#DEDCCD] shadow-xl text-center space-y-7 animate-in fade-in duration-300">
      {/* Top Success Badge */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#E9F0EA] text-[#237A50] flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="badge-gold text-xs tracking-wider uppercase font-semibold">
          Request Successfully Received
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36] leading-tight">
          Thank You{enquiry?.customerName ? `, ${enquiry.customerName}` : ""}!
        </h1>
        <p className="text-sm text-[#59665E] max-w-lg leading-relaxed">
          Your travel request has been logged at our Guwahati operations desk and routed directly to our destination specialists.
        </p>
      </div>

      {/* Reference Card with Copy Action */}
      <div className="bg-[#F7F3E9] p-6 rounded-2xl border border-[#DEDCCD] space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#59665E] block">
          Your Enquiry Reference Code
        </span>
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[#103F36] tracking-wider">
            {refCode}
          </span>
          <button
            onClick={handleCopyRef}
            type="button"
            className="p-2 rounded-lg bg-white border border-[#DEDCCD] text-[#103F36] hover:bg-[#E9F0EA] transition-colors cursor-pointer"
            title="Copy Reference Code"
          >
            {copied ? <Check className="w-4 h-4 text-[#237A50]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && (
          <span className="text-xs text-[#237A50] font-semibold block animate-in fade-in">
            Reference code copied to clipboard!
          </span>
        )}
        <div className="pt-2 border-t border-[#DEDCCD]/60 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#59665E]">
          <span className="inline-flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
            Dispatched to:
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#103F36] bg-white px-2 py-0.5 rounded border border-[#DEDCCD]">
            info@divineviewtours.com
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="text-[11px]">Guwahati Desk (+91 60265 04087)</span>
        </div>
      </div>

      {/* Booking Summary Card */}
      {enquiry ? (
        <div className="bg-[#FFFDF7] rounded-2xl border border-[#DEDCCD] p-5 sm:p-6 text-left space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#DEDCCD] pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D9A441]" />
              <h3 className="font-serif text-lg font-bold text-[#103F36]">
                Booking Summary
              </h3>
            </div>
            <span className="badge-forest text-[11px] uppercase tracking-wider">
              {enquiry.type?.replace("_", " ") || "Tour Booking"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-[#59665E] block text-[11px] uppercase font-semibold">
                Service / Route
              </span>
              <strong className="text-[#103F36] block font-semibold">
                {serviceTitle}
              </strong>
            </div>

            <div className="space-y-1">
              <span className="text-[#59665E] block text-[11px] uppercase font-semibold">
                Travel Date & Duration
              </span>
              <span className="text-[#172C26] block font-medium">
                {formattedDate} · {durationLabel}
              </span>
            </div>

            {enquiry.vehicleType && (
              <div className="space-y-1">
                <span className="text-[#59665E] block text-[11px] uppercase font-semibold">
                  Vehicle Selected
                </span>
                <span className="text-[#172C26] block font-medium capitalize">
                  {enquiry.vehicleType}
                </span>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[#59665E] block text-[11px] uppercase font-semibold">
                Guest Details
              </span>
              <span className="text-[#172C26] block font-medium">
                {enquiry.customerName} ({enquiry.phone})
              </span>
            </div>

            {enquiry.pickup && (
              <div className="space-y-1 sm:col-span-2">
                <span className="text-[#59665E] block text-[11px] uppercase font-semibold">
                  Pickup Point
                </span>
                <span className="text-[#172C26] block">{enquiry.pickup}</span>
              </div>
            )}

            {(enquiry.notes || enquiry.specialRequests || enquiry.specialWishes) && (
              <div className="space-y-1 sm:col-span-2 bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD]">
                <span className="text-[#103F36] block text-[11px] uppercase font-bold">
                  Special Notes
                </span>
                <p className="text-xs text-[#59665E]">
                  {enquiry.notes || enquiry.specialRequests || enquiry.specialWishes}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Next Steps Timeline (Corrected to 1, 2, 3) */}
      <div className="text-left space-y-3 pt-2">
        <h3 className="font-serif text-lg font-bold text-[#103F36] text-center">
          What Happens Next?
        </h3>
        <div className="space-y-2.5 text-xs sm:text-sm text-[#172C26]">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-[#DEDCCD]">
            <span className="w-6 h-6 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong className="font-semibold text-[#103F36]">Availability Check:</strong>{" "}
              We review mountain vehicle rosters and room blocks for your travel dates.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-[#DEDCCD]">
            <span className="w-6 h-6 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong className="font-semibold text-[#103F36]">Direct Quote & Itinerary:</strong>{" "}
              A local destination specialist connects via WhatsApp or email with your finalized price and day plan.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E9]/60 border border-[#DEDCCD]">
            <span className="w-6 h-6 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong className="font-semibold text-[#103F36]">Confirmation & Driver Details:</strong>{" "}
              Review inclusions, lock your dates with deposit, and receive verified vehicle & driver contact.
            </div>
          </div>
        </div>
      </div>

      {/* Direct Connect Options */}
      <div className="pt-4 border-t border-[#DEDCCD] flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold !py-3 !px-5 text-sm flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
        >
          <MessageCircle className="w-4 h-4 text-[#172C26]" />
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="btn-outline-forest !py-3 !px-5 text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Phone className="w-4 h-4 text-[#103F36]" />
          <span>Call: {siteConfig.phone}</span>
        </a>

        <Link
          href="/"
          className="text-xs text-[#59665E] hover:text-[#103F36] py-2 px-4 w-full sm:w-auto text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
