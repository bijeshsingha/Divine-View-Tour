"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";
import PhoneInput from "@/components/PhoneInput";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullPhone = formData.phone.startsWith("+")
        ? formData.phone
        : `${formData.countryCode} ${formData.phone}`.trim();

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_message",
          ...formData,
          phone: fullPhone,
        }),
      });

      const data = await res.json();
      const ref = data.reference || "DVT-2026-0000";
      router.push(`/enquiry/received?ref=${ref}&type=contact`);
    } catch (err) {
      console.error(err);
      const ref = "DVT-2026-0000";
      router.push(`/enquiry/received?ref=${ref}&type=contact`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-12">
          <span className="badge-forest mb-2">Connect Directly</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Contact Our Guwahati Operations Desk
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3">
            Have questions about permits, road conditions, or private vehicle hire? Reach out to our local team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details Cards */}
          <div className="space-y-6">
            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E9F0EA] flex items-center justify-center text-[#103F36]">
                  <Phone className="w-5 h-5 text-[#D9A441]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">Phone Assistance</h3>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="text-sm text-[#59665E] hover:text-[#D9A441]">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E9F0EA] flex items-center justify-center text-[#103F36]">
                  <MessageCircle className="w-5 h-5 text-[#237A50]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">WhatsApp Chat</h3>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#59665E] hover:text-[#D9A441]"
                  >
                    +91 60265 04087
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E9F0EA] flex items-center justify-center text-[#103F36] shrink-0">
                  <Mail className="w-5 h-5 text-[#D9A441]" />
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#103F36]">Tour & Cab Bookings</h3>
                    <a
                      href={`mailto:${siteConfig.bookingEmail || "bookings@divineviewtours.com"}?subject=Tour%20Booking%20Inquiry%20%7C%20Divine%20View%20Tours`}
                      className="font-mono text-sm text-[#103F36] font-semibold hover:text-[#D9A441] block"
                    >
                      {siteConfig.bookingEmail || "bookings@divineviewtours.com"}
                    </a>
                    <span className="text-[#59665E]">For holiday packages, vehicle hire, and custom itineraries.</span>
                  </div>
                  <div className="pt-2 border-t border-[#DEDCCD]/80">
                    <h3 className="font-serif text-base font-bold text-[#103F36]">General Queries & Info</h3>
                    <a
                      href={`mailto:${siteConfig.infoEmail || "info@divineviewtours.com"}?subject=General%20Query%20%7C%20Divine%20View%20Tours`}
                      className="font-mono text-sm text-[#103F36] font-semibold hover:text-[#D9A441] block"
                    >
                      {siteConfig.infoEmail || "info@divineviewtours.com"}
                    </a>
                    <span className="text-[#59665E]">For corporate partnerships, travel trade, and general queries.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#103F36]">
                <Clock className="w-4 h-4 text-[#D9A441]" />
                Operating Hours
              </div>
              <p className="text-xs text-[#59665E] leading-relaxed">
                Monday – Sunday: 8:00 AM – 9:00 PM IST.<br />
                Emergency roadside assistance is active 24/7 for all ongoing trip guests.
              </p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-2 bg-[#FFFDF7] p-6 sm:p-10 rounded-3xl border border-[#DEDCCD] shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-[#103F36] mb-2">
              Send a Direct Message
            </h2>
            <p className="text-xs sm:text-sm text-[#59665E] mb-6">
              Drop us your trip details or query below, and a destination coordinator will respond promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                    placeholder="e.g. Priyadarshini Roy"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <PhoneInput
                    countryCode={formData.countryCode}
                    onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                    placeholder="priya@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                    Subject / Interest
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                  >
                    <option>Tour Package Inquiry</option>
                    <option>Private Vehicle Hire</option>
                    <option>Arunachal Permit Questions</option>
                    <option>Custom Group Itinerary</option>
                    <option>Other Assistance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#59665E] block mb-1">
                  Your Message or Question *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26]"
                  placeholder="Tell us what you have in mind..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.phone}
                className="btn-gold !py-3 !px-8 text-sm font-semibold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
