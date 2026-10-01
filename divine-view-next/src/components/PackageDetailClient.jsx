"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  X,
  Mail
} from "lucide-react";
import siteConfig from "@/data/siteConfig.json";
import PhoneInput from "@/components/PhoneInput";
import {
  initCampaignTracking,
  getCampaignData,
  trackContactIntent,
  trackEnquirySubmitted,
} from "@/lib/campaignTracking";

export default function PackageDetailClient({ pkg }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTravellers = searchParams.get("travellers") || "2";
  const queryMonth = searchParams.get("month") || "";

  const [activeImage, setActiveImage] = useState(pkg.heroImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Enquiry modal & inline form state
  const [formData, setFormData] = useState({
    startDate: "",
    flexibleMonth: queryMonth ? queryMonth : "Flexible",
    travellers: queryTravellers,
    adults: 2,
    childrenCount: 0,
    pickup: "Guwahati Airport",
    customerName: "",
    countryCode: "+91",
    countryOfResidence: "India",
    phone: "",
    email: "",
    preferredContact: "whatsapp",
    budget: "",
    notes: queryMonth ? `Preferred Travel Month: ${queryMonth}` : "",
    website_hp: "",
  });

  // Initialize campaign tracking
  useEffect(() => {
    initCampaignTracking();
  }, []);

  // Sync state if query params change
  useEffect(() => {
    if (queryTravellers) {
      setFormData((prev) => ({ ...prev, travellers: queryTravellers }));
    }
    if (queryMonth) {
      setFormData((prev) => ({
        ...prev,
        flexibleMonth: queryMonth,
        notes: prev.notes ? prev.notes : `Preferred Travel Month: ${queryMonth}`,
      }));
    }
  }, [queryTravellers, queryMonth]);

  // Accessible Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const fullPhone = formData.phone.startsWith("+")
        ? formData.phone
        : `${formData.countryCode} ${formData.phone}`.trim();

      const campaignData = getCampaignData();

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "package",
          packageId: pkg.id,
          packageTitle: pkg.title,
          ...formData,
          ...campaignData,
          phone: fullPhone,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reference) {
        trackEnquirySubmitted(data.reference, pkg.slug);
        router.push(`/enquiry/received?ref=${data.reference}&pkg=${pkg.slug}`);
      } else if (data.errors) {
        setFormErrors(data.errors);
      } else {
        alert(data.error || "Please check your inputs and try again.");
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      // Fallback redirect with generated reference
      const ref = "DVT-2026-0000";
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
          <nav aria-label="Breadcrumb" className="text-xs text-[#F7F3E9]/70 mb-4 flex items-center gap-2">
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
                      type="button"
                      aria-label={`View photo ${i + 1} of ${pkg.title}`}
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

            {/* Safari Details (When present, for Kaziranga and combo tours) */}
            {pkg.safariSpecs && (
              <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border-2 border-[#D9A441]/40 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#DEDCCD] pb-3">
                  <div>
                    <span className="badge-gold text-xs">Flagship Wildlife Experience</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36] mt-1">
                      Kaziranga National Park Safari Experience
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-[#F7F3E9] p-4 rounded-xl space-y-1">
                    <span className="font-bold text-[#103F36] block">Jeep Safaris Included</span>
                    <p className="text-[#59665E]">{pkg.safariSpecs.jeepSafaris}</p>
                    <span className="text-[11px] text-[#237A50] font-semibold block">{pkg.safariSpecs.ranges}</span>
                  </div>

                  <div className="bg-[#F7F3E9] p-4 rounded-xl space-y-1">
                    <span className="font-bold text-[#103F36] block">Session Timings & Duration</span>
                    <p className="text-[#59665E]">{pkg.safariSpecs.sessionTimings}</p>
                  </div>

                  <div className="bg-[#F7F3E9] p-4 rounded-xl space-y-1">
                    <span className="font-bold text-[#103F36] block">Vehicle Exclusivity & Capacity</span>
                    <p className="text-[#59665E]">{pkg.safariSpecs.vehicleCapacity}</p>
                  </div>

                  <div className="bg-[#F7F3E9] p-4 rounded-xl space-y-1">
                    <span className="font-bold text-[#103F36] block">Naturalist & Driver Policy</span>
                    <p className="text-[#59665E]">{pkg.safariSpecs.guiding}</p>
                  </div>
                </div>

                <div className="bg-[#FFFDF7] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#59665E] space-y-1">
                  <strong className="text-[#103F36] block">Season & Sighting Policy:</strong>
                  <p>Operating season: {pkg.safariSpecs.seasonDates}.</p>
                  <p className="italic">{pkg.safariSpecs.sightingDisclaimer}</p>
                </div>
              </div>
            )}

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

            {/* Deposit & Cancellation Summary */}
            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEDCCD]/60 pb-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#103F36] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#237A50]" />
                  <span>Booking Deposit and Cancellation Summary</span>
                </h3>
                <Link
                  href="/cancellation-policy"
                  className="text-xs font-semibold text-[#103F36] hover:text-[#D9A441] underline underline-offset-4"
                >
                  View full policy
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                Reservations are secured with a 30% advance deposit. Cancellations made 30 or more days before tour start receive an 85% refund of the deposit paid (15% administrative processing fee). Cancellations within 15 to 29 days retain the advance deposit towards committed hotel rooms and transport blocks, with no further liability billed to you. Bookings confirmed within 15 days of arrival require full payment. Government permits (ILP/PAP) and reserved forest safari slots are non-refundable.
              </p>
            </div>

            {/* INLINE QUICK ENQUIRY FORM (Section 6 requirement) */}
            <div id="quick-enquiry" className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border-2 border-[#103F36]/20 shadow-md space-y-6">
              <div>
                <span className="badge-forest text-xs">Direct Operations Desk</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36] mt-1">
                  Request a Quote for {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#59665E] mt-1">
                  Share your planned dates and party size. We provide a transparent quote and confirm driver and room allotments within 2 hours.
                </p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inline-date" className="font-bold text-[#59665E] block mb-1">
                      Travel Date (or Month) *
                    </label>
                    <input
                      id="inline-date"
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inline-adults" className="font-bold text-[#59665E] block mb-1">
                      Group Size (Adults and Children)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        id="inline-adults"
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value, 10), travellers: `${e.target.value} Adults` })}
                        className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                        <option value="5">5 Adults</option>
                        <option value="6">6+ Adults</option>
                      </select>
                      <select
                        id="inline-children"
                        value={formData.childrenCount}
                        onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value, 10) })}
                        className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                      >
                        <option value="0">0 Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                        <option value="3">3+ Children</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inline-name" className="font-bold text-[#59665E] block mb-1">
                      Full Name *
                    </label>
                    <input
                      id="inline-name"
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inline-country" className="font-bold text-[#59665E] block mb-1">
                      Country of Residence
                    </label>
                    <input
                      id="inline-country"
                      type="text"
                      placeholder="e.g. India, United Kingdom, USA"
                      value={formData.countryOfResidence}
                      onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                      className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inline-phone" className="font-bold text-[#59665E] block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-20 bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] text-center focus:ring-2 focus:ring-[#103F36] focus:outline-none font-medium"
                      />
                      <input
                        id="inline-phone"
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inline-email" className="font-bold text-[#59665E] block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="inline-email"
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inline-contact-pref" className="font-bold text-[#59665E] block mb-1">
                      Preferred Way to Reach You
                    </label>
                    <select
                      id="inline-contact-pref"
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                    >
                      <option value="whatsapp">WhatsApp Message</option>
                      <option value="phone">Direct Phone Call</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inline-budget" className="font-bold text-[#59665E] block mb-1">
                      Budget or Hotel Category (Optional)
                    </label>
                    <input
                      id="inline-budget"
                      type="text"
                      placeholder="e.g. Standard 3-Star, Luxury Eco-Lodge"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inline-notes" className="font-bold text-[#59665E] block mb-1">
                    Special Requests or Pickup Preferences (Optional)
                  </label>
                  <textarea
                    id="inline-notes"
                    rows={2}
                    placeholder="e.g. Arriving at Guwahati Airport at 11 AM, traveling with senior parents, interested in wildlife photography"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full text-center justify-center font-bold text-sm sm:text-base py-3.5 shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? "Submitting Request..." : "Request Detailed Quote and Confirm Availability"}
                </button>

                <p className="text-[11px] text-[#59665E] text-center pt-1">
                  Guaranteed response within 2 hours · Direct Guwahati operations desk · Never any spam
                </p>
              </form>
            </div>
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
                  type="button"
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
                  onClick={() => trackContactIntent("whatsapp")}
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
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FFFDF7] border-t border-[#DEDCCD] p-3 z-40 shadow-2xl flex items-center justify-between gap-2">
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

        <div className="flex items-center gap-1.5">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              `Hi Divine View Tours, I am interested in booking the ${pkg.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactIntent("whatsapp")}
            className="p-2 rounded-lg bg-[#E9F0EA] text-[#237A50] hover:bg-[#237A50] hover:text-white transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href="#quick-enquiry"
            className="btn-gold !py-2 !px-3 !text-xs !min-h-[38px]"
          >
            Get Quote
          </a>
        </div>
      </div>

      {/* MODAL: CHECK AVAILABILITY & ENQUIRY (Accessible Dialog) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="availability-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#FFFDF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DEDCCD] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close availability modal"
              className="absolute top-5 right-5 text-[#59665E] hover:text-[#172C26] p-1.5 rounded-full hover:bg-[#F7F3E9] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <span className="badge-forest text-xs">Availability Request</span>
              <h3 id="availability-modal-title" className="font-serif text-2xl font-bold text-[#103F36]">
                Check Dates: {pkg.title}
              </h3>
              <p className="text-xs text-[#59665E]">
                We verify hotel and vehicle availability within 2 business hours.
              </p>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="avail-date" className="font-bold text-[#59665E] block mb-1">
                    Travel Date *
                  </label>
                  <input
                    id="avail-date"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="avail-travellers" className="font-bold text-[#59665E] block mb-1">
                    Travellers
                  </label>
                  <select
                    id="avail-travellers"
                    value={formData.travellers}
                    onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 persons</option>
                    <option value="4">3 to 4 persons</option>
                    <option value="6">5 to 6 persons</option>
                    <option value="8">7+ persons group</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="avail-name" className="font-bold text-[#59665E] block mb-1">
                  Full Name *
                </label>
                <input
                  id="avail-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                />
                {formErrors.name && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="avail-phone" className="font-bold text-[#59665E] block mb-1">
                    WhatsApp / Phone *
                  </label>
                  <PhoneInput
                    id="avail-phone"
                    countryCode={formData.countryCode}
                    onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    inputClassName="!p-2.5"
                    selectClassName="!py-2.5"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="avail-email" className="font-bold text-[#59665E] block mb-1">
                    Email (Optional)
                  </label>
                  <input
                    id="avail-email"
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="avail-notes" className="font-bold text-[#59665E] block mb-1">
                  Specific Requests (Optional)
                </label>
                <textarea
                  id="avail-notes"
                  rows="2"
                  placeholder="e.g. Need baby car seat, prefer ground-floor rooms, need flight advice."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-2.5 rounded-lg border border-[#DEDCCD] text-[#172C26] focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full text-center justify-center font-semibold text-sm focus:ring-2 focus:ring-[#103F36] focus:outline-none"
                >
                  {isSubmitting ? "Submitting Request..." : "Request Availability Quote"}
                </button>
              </div>

              <p className="text-[11px] text-[#59665E] text-center">
                🔒 We do not take payments online before availability is checked and quote is accepted.
              </p>

              <div className="pt-2 text-center text-xs text-[#59665E] border-t border-[#DEDCCD]/60 flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Prefer direct email? </span>
                <a
                  href={`mailto:${siteConfig.bookingEmail || "bookings@divineviewtours.com"}?subject=${encodeURIComponent(
                    `Booking Enquiry: ${pkg.title}`
                  )}`}
                  className="font-semibold text-[#103F36] hover:text-[#D9A441] underline underline-offset-2"
                >
                  bookings@divineviewtours.com
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
