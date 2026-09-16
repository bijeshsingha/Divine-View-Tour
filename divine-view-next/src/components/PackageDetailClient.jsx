"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Car,
  BedDouble,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  Phone,
  Send,
  X
} from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function PackageDetailClient({ pkg }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(pkg.heroImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enquiry modal state
  const [formData, setFormData] = useState({
    startDate: "",
    flexibleMonth: "Flexible",
    travellers: "2",
    pickup: "Guwahati Airport",
    customerName: "",
    phone: "",
    email: "",
    preferredContact: "whatsapp",
    notes: "",
  });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "package",
          packageId: pkg.id,
          packageTitle: pkg.title,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reference) {
        router.push(`/enquiry/received?ref=${data.reference}&pkg=${pkg.slug}`);
      } else {
        alert("Enquiry received! Our team will reach out via WhatsApp shortly.");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      // Fallback redirect with generated reference
      const ref = `DVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      router.push(`/enquiry/received?ref=${ref}&pkg=${pkg.slug}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Gallery & Header Bar */}
      <section className="bg-[#082D27] text-[#F7F3E9] pt-28 pb-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#F7F3E9]/70 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#D9A441]">Home</Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-[#D9A441]">Packages</Link>
            <span>/</span>
            <span className="text-[#D9A441] truncate max-w-[280px] sm:max-w-none">{pkg.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {pkg.badge && <span className="badge-gold text-xs">{pkg.badge}</span>}
            <Link
              href={`/destinations/${pkg.destination}`}
              className="text-xs bg-[#103F36] hover:bg-[#103F36]/80 text-[#F7F3E9] px-2.5 py-0.5 rounded-full border border-[#D9A441]/30 transition-colors"
            >
              {pkg.destinationLabel}
            </Link>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E9] max-w-3xl leading-tight">
            {pkg.title}
          </h1>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-[#F7F3E9]/85 border-t border-[#103F36] pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D9A441]" />
              <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D9A441]" />
              <span>Pickup/Drop: {pkg.pickup}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#D9A441]" />
              <span>Private Dedicated Vehicle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Details, Itinerary, Inclusions */}
          <div className="lg:col-span-2 space-y-12">
            {/* Photo Gallery with Thumbnail switcher */}
            <div className="space-y-3">
              <div className="relative h-[340px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-[#082D27] shadow-md">
                <img
                  src={activeImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {pkg.gallery && pkg.gallery.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {pkg.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === imgUrl ? "border-[#D9A441] scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <span className="badge-forest">Trip Summary</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                Overview & Experience
              </h2>
              <p className="text-base text-[#59665E] leading-relaxed">
                {pkg.summary}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#103F36]">
                Key Journey Highlights
              </h3>
              <ul className="space-y-2.5">
                {pkg.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#172C26]">
                    <CheckCircle2 className="w-5 h-5 text-[#237A50] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day-by-Day Itinerary with Realistic Driving Times */}
            <div className="space-y-6">
              <div>
                <span className="badge-forest">Realistic Mountain Timings</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36] mt-1">
                  Day-by-Day Itinerary
                </h2>
                <p className="text-xs sm:text-sm text-[#59665E] mt-1">
                  Paced with comfortable driving stretches to prevent mountain fatigue and maximize sightseeing daylight.
                </p>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="bg-[#FFFDF7] rounded-2xl p-6 border border-[#DEDCCD] shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEDCCD]/60 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#103F36] text-[#F7F3E9] text-xs font-bold flex items-center justify-center shrink-0">
                          D{day.day}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#103F36]">
                          {day.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-[#D9A441] bg-[#FFFDF7] px-2.5 py-1 rounded-md border border-[#DEDCCD] self-start sm:self-auto">
                        🚗 {day.drivingTime}
                      </span>
                    </div>

                    <p className="text-sm text-[#59665E] leading-relaxed">
                      {day.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs text-[#172C26] font-medium bg-[#F7F3E9] p-2.5 rounded-lg">
                      <BedDouble className="w-4 h-4 text-[#103F36]" />
                      <span>Overnight: {day.stay}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay & Vehicle Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#103F36]">
                  <BedDouble className="w-5 h-5 text-[#D9A441]" />
                  <h3 className="font-serif text-lg font-bold">Accommodation Standard</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                  {pkg.stayOptions}
                </p>
              </div>

              <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[#103F36]">
                  <Car className="w-5 h-5 text-[#D9A441]" />
                  <h3 className="font-serif text-lg font-bold">Vehicle Options</h3>
                </div>
                <ul className="text-xs sm:text-sm text-[#59665E] space-y-1">
                  {pkg.vehicleOptions.map((v, i) => (
                    <li key={i}>• {v}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#237A50] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  What Is Included
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#172C26]">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#237A50] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#9F2F24] flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  What Is Excluded
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#59665E]">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#9F2F24] font-bold">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Practical Notes & Permits */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#103F36]">
                <FileCheck className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-serif text-xl font-bold">
                  Practical Information & Packing Advice
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                {pkg.practicalNotes}
              </p>
            </div>

            {/* FAQs */}
            {pkg.faqs && pkg.faqs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#103F36]">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {pkg.faqs.map((faq, i) => (
                    <div key={i} className="bg-[#FFFDF7] p-5 rounded-2xl border border-[#DEDCCD] shadow-sm">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#103F36] flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#59665E] mt-1.5 pl-6 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Desktop Sticky Summary & Booking Card */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-[#FFFDF7] rounded-3xl p-6 sm:p-7 border border-[#DEDCCD] shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#59665E]">
                  Transparent Holiday Cost
                </span>

                {pkg.priceMode === "starting_from" && pkg.priceAmount ? (
                  <div className="mt-1">
                    <span className="text-xs text-[#59665E]">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl font-bold text-[#103F36]">
                        ₹{pkg.priceAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#59665E]">/ person</span>
                    </div>
                  </div>
                ) : pkg.priceMode === "fixed" && pkg.priceAmount ? (
                  <div className="mt-1">
                    <span className="text-xs text-[#59665E]">Package Cost</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl font-bold text-[#103F36]">
                        ₹{pkg.priceAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#59665E]">/ person</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <span className="badge-forest text-xs">Bespoke Quotation</span>
                    <span className="font-serif text-2xl font-bold text-[#103F36] block mt-1">
                      Price on Request
                    </span>
                  </div>
                )}

                {pkg.priceBasis && (
                  <p className="text-[11px] text-[#59665E] mt-1 italic">
                    Basis: {pkg.priceBasis}
                  </p>
                )}
              </div>

              {/* Inclusions preview */}
              <div className="border-t border-b border-[#DEDCCD] py-4 space-y-2 text-xs text-[#172C26]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A50]" />
                  <span>Private vehicle & mountain driver</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A50]" />
                  <span>{pkg.durationNights} nights stay with breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A50]" />
                  <span>Fuel, tolls, parking & driver allowance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A50]" />
                  <span>24/7 Guwahati route assistance</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-gold w-full text-center justify-center font-semibold text-sm shadow-md"
                >
                  Check Availability
                </button>

                <Link
                  href={`/custom-trip?package=${pkg.slug}&dest=${pkg.destination}&duration=${pkg.durationDays}`}
                  className="btn-outline-forest w-full text-center justify-center text-xs"
                >
                  Customise this trip
                </Link>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2 text-center">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Divine View Tours, I am interested in booking the ${pkg.title} (${pkg.durationDays} Days).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#59665E] hover:text-[#D9A441] inline-flex items-center gap-1.5 font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#237A50]" />
                  <span>Instant enquiry on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE PERSISTENT BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FFFDF7] border-t border-[#DEDCCD] p-3 z-40 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#59665E] uppercase block font-semibold">
            {pkg.priceMode === "starting_from" ? "Starting from" : "Package"}
          </span>
          {pkg.priceAmount ? (
            <span className="font-serif text-xl font-bold text-[#103F36]">
              ₹{pkg.priceAmount.toLocaleString("en-IN")}
            </span>
          ) : (
            <span className="font-serif text-sm font-bold text-[#103F36]">On Request</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/custom-trip?package=${pkg.slug}`}
            className="btn-outline-forest !py-2 !px-3 !text-xs !min-h-[38px]"
          >
            Customise
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold !py-2 !px-4 !text-xs !min-h-[38px]"
          >
            Check Availability
          </button>
        </div>
      </div>

      {/* MODAL: CHECK AVAILABILITY & ENQUIRY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DEDCCD] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#59665E] hover:text-[#172C26] p-1.5 rounded-full hover:bg-[#F7F3E9]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <span className="badge-forest text-xs">Availability Request</span>
              <h3 className="font-serif text-2xl font-bold text-[#103F36]">
                Check Dates: {pkg.title}
              </h3>
              <p className="text-xs text-[#59665E]">
                We verify hotel and vehicle availability within 2 business hours.
              </p>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#59665E] block mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#59665E] block mb-1">Travellers</label>
                  <select
                    value={formData.travellers}
                    onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26]"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 persons</option>
                    <option value="4">4 persons (standard)</option>
                    <option value="6">6 persons</option>
                    <option value="8+">8+ group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#59665E] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#59665E] block mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#59665E] block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#59665E] block mb-1">Specific Requests (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need baby car seat, prefer ground-floor rooms, need flight advice."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full text-center justify-center font-semibold text-sm"
                >
                  {isSubmitting ? "Submitting Request..." : "Request Availability Quote"}
                </button>
              </div>

              <p className="text-[11px] text-[#59665E] text-center">
                🔒 We do not take payments online before availability is checked and quote is accepted.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
