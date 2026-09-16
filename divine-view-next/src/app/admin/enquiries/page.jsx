"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Car,
  Compass,
  MapPin,
  User,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Settings,
  RefreshCw,
  FileText,
  AlertCircle,
  LogOut
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [copiedRef, setCopiedRef] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState("");

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    window.location.href = "/admin/login";
  };

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success && Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleCopy = (ref) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const query = searchTerm.toLowerCase().trim();
    if (!query) return matchesType;

    const matchesSearch =
      (item.customerName && item.customerName.toLowerCase().includes(query)) ||
      (item.phone && item.phone.includes(query)) ||
      (item.reference && item.reference.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.packageTitle && item.packageTitle.toLowerCase().includes(query)) ||
      (item.routeName && item.routeName.toLowerCase().includes(query));

    return matchesType && matchesSearch;
  });

  const totalCount = enquiries.length;
  const vehicleCount = enquiries.filter((e) => e.type === "vehicle_hire").length;
  const packageCount = enquiries.filter((e) => e.type === "package").length;
  const customCount = enquiries.filter((e) => e.type === "custom_trip").length;

  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Bar: Back link + Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="text-xs font-semibold text-[#59665E] hover:text-[#103F36] inline-flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center shadow-sm">
                <Inbox className="w-5 h-5" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                Guest Enquiries & Booking Leads
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#59665E] mt-1">
              Live inbox of all tour requests, vehicle bookings, and custom inquiries submitted on the website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadEnquiries}
              disabled={loading}
              className="btn-outline-forest !py-2 !px-4 text-xs font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Refreshing..." : "Refresh Inbox"}</span>
            </button>

            <Link
              href="/admin/pricing"
              className="btn-gold !py-2 !px-4 text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Pricing Admin</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-[#DEDCCD] pb-1">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 text-sm font-bold border-b-2 border-[#103F36] text-[#103F36] flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries Inbox</span>
            <span className="bg-[#103F36] text-[#F7F3E9] text-[11px] font-mono px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </Link>
          <Link
            href="/admin/pricing"
            className="px-4 py-2 text-sm font-medium text-[#59665E] hover:text-[#103F36] border-b-2 border-transparent flex items-center gap-2 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Pricing & Tariffs</span>
          </Link>
        </div>

        {/* Info Banner: Storage & Email Destination */}
        <div className="bg-[#FFFDF7] rounded-2xl border border-[#DEDCCD] p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#103F36] font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-[#D9A441]" />
            <span>Where is this enquiry information received & stored?</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#59665E]">
            <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] space-y-1.5">
              <strong className="text-[#103F36] block font-semibold">
                1. Stored Locally on Server (Persistent Database):
              </strong>
              <p>
                Every submission is permanently recorded to JSON at:
                <br />
                <code className="bg-white px-2 py-0.5 rounded font-mono text-[11px] text-[#103F36] border border-[#DEDCCD] mt-1 inline-block">
                  src/data/enquiries.json
                </code>
              </p>
            </div>

            <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] space-y-1.5">
              <strong className="text-[#103F36] block font-semibold">
                2. Real-Time Email Dispatch:
              </strong>
              <p>
                Routed immediately to: <strong className="text-[#103F36]">info@divineviewtours.com</strong> (and singhabijesh7@gmail.com)
                <br />
                via configured SMTP and automated FormSubmit relay.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#FFFDF7] rounded-2xl p-4 border border-[#DEDCCD] shadow-sm">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#59665E]">
              Total Enquiries
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#103F36] mt-1">
              {totalCount}
            </div>
          </div>

          <div className="bg-[#FFFDF7] rounded-2xl p-4 border border-[#DEDCCD] shadow-sm">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#59665E]">
              Vehicle Hires
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#103F36] mt-1">
              {vehicleCount}
            </div>
          </div>

          <div className="bg-[#FFFDF7] rounded-2xl p-4 border border-[#DEDCCD] shadow-sm">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#59665E]">
              Package Tours
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#103F36] mt-1">
              {packageCount}
            </div>
          </div>

          <div className="bg-[#FFFDF7] rounded-2xl p-4 border border-[#DEDCCD] shadow-sm">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#59665E]">
              Custom Trips
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#103F36] mt-1">
              {customCount}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFDF7] rounded-2xl p-4 border border-[#DEDCCD] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#59665E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, phone, ref, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F7F3E9] border border-[#DEDCCD] rounded-xl text-[#172C26] focus:outline-none focus:border-[#103F36]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-[#59665E] shrink-0" />
            {[
              { id: "all", label: "All" },
              { id: "vehicle_hire", label: "Vehicles" },
              { id: "package", label: "Packages" },
              { id: "custom_trip", label: "Custom" },
              { id: "contact_message", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                  typeFilter === tab.id
                    ? "bg-[#103F36] text-[#F7F3E9]"
                    : "bg-[#F7F3E9] text-[#59665E] hover:text-[#103F36] border border-[#DEDCCD]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries List */}
        {loading ? (
          <div className="text-center py-16 bg-[#FFFDF7] rounded-3xl border border-[#DEDCCD]">
            <RefreshCw className="w-8 h-8 text-[#103F36] animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#59665E]">Loading enquiries from server...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF7] rounded-3xl border border-[#DEDCCD] space-y-2">
            <Inbox className="w-10 h-10 text-[#59665E]/40 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#103F36]">No enquiries found</h3>
            <p className="text-xs text-[#59665E]">
              {searchTerm ? "Try searching with a different keyword." : "New leads submitted by travelers will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => {
              const cleanPhone = (enquiry.phone || "").replace(/[^0-9]/g, "");
              const formattedTime = enquiry.createdAt
                ? new Date(enquiry.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Recent";

              const serviceTitle =
                enquiry.packageTitle ||
                enquiry.routeName ||
                (enquiry.type === "custom_trip"
                  ? "Custom Northeast Holiday Itinerary"
                  : enquiry.type === "vehicle_hire"
                  ? "Private Vehicle Route Hire"
                  : "General Travel Inquiry");

              const waMessage = `Hello ${enquiry.customerName || "Traveler"}, this is Bijesh from Divine View Tours regarding your booking request (Ref: ${enquiry.reference || ""}) for ${serviceTitle}. I'm happy to assist you with availability and quotation!`;

              return (
                <div
                  key={enquiry.id || enquiry.reference}
                  className="bg-[#FFFDF7] rounded-3xl p-5 sm:p-6 border border-[#DEDCCD] shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  {/* Card Header: Ref, Serial, Date, Type Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEDCCD]/60 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {typeof enquiry.serialNumber === "number" && (
                        <span className="bg-[#103F36] text-[#D9A441] font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                          #{enquiry.serialNumber}
                        </span>
                      )}
                      <span className="font-mono text-sm sm:text-base font-bold text-[#103F36]">
                        {enquiry.reference}
                      </span>
                      <button
                        onClick={() => handleCopy(enquiry.reference)}
                        type="button"
                        className="p-1 rounded text-[#59665E] hover:text-[#103F36] transition-colors"
                        title="Copy Reference"
                      >
                        {copiedRef === enquiry.reference ? (
                          <Check className="w-3.5 h-3.5 text-[#237A50]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="badge-gold text-[10px] uppercase tracking-wider font-semibold">
                        {enquiry.type?.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#59665E]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formattedTime}</span>
                    </div>
                  </div>

                  {/* Main Grid: Customer info + Service info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Column 1: Customer Contact */}
                    <div className="space-y-1.5 text-xs bg-[#F7F3E9]/70 p-3.5 rounded-2xl border border-[#DEDCCD]/60">
                      <span className="text-[#59665E] font-bold text-[10px] uppercase tracking-wider block">
                        Traveler Contact
                      </span>
                      <div className="font-semibold text-sm text-[#103F36] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>{enquiry.customerName || "Guest"}</span>
                      </div>
                      <div className="text-[#172C26] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#237A50]" />
                        <a href={`tel:${enquiry.phone}`} className="hover:underline font-mono">
                          {enquiry.phone}
                        </a>
                      </div>
                      {enquiry.email && (
                        <div className="text-[#59665E] flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 text-[#103F36]" />
                          <a href={`mailto:${enquiry.email}`} className="hover:underline truncate">
                            {enquiry.email}
                          </a>
                        </div>
                      )}
                      <div className="text-[11px] text-[#59665E]">
                        Preferred: <strong className="capitalize text-[#103F36]">{enquiry.preferredContact || "WhatsApp"}</strong>
                      </div>
                    </div>

                    {/* Column 2: Requested Service */}
                    <div className="space-y-1.5 text-xs bg-[#F7F3E9]/70 p-3.5 rounded-2xl border border-[#DEDCCD]/60">
                      <span className="text-[#59665E] font-bold text-[10px] uppercase tracking-wider block">
                        Requested Itinerary / Route
                      </span>
                      <strong className="text-sm text-[#103F36] block line-clamp-2">
                        {serviceTitle}
                      </strong>
                      {enquiry.vehicleType && (
                        <div className="text-[#172C26] flex items-center gap-1.5 capitalize">
                          <Car className="w-3.5 h-3.5 text-[#D9A441]" />
                          <span>Vehicle: <strong>{enquiry.vehicleType}</strong></span>
                        </div>
                      )}
                      {(enquiry.startDate || enquiry.travelMonth) && (
                        <div className="text-[#172C26] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#103F36]" />
                          <span>Date: <strong>{enquiry.startDate || enquiry.travelMonth}</strong></span>
                        </div>
                      )}
                      {enquiry.days && (
                        <div className="text-[#59665E]">
                          Duration: <strong className="text-[#103F36]">{enquiry.days} Day(s)</strong>
                        </div>
                      )}
                      {enquiry.travellers && (
                        <div className="text-[#59665E]">
                          Party: <strong className="text-[#103F36]">{enquiry.travellers}</strong>
                        </div>
                      )}
                      {enquiry.adults && (
                        <div className="text-[#59665E]">
                          Group: <strong className="text-[#103F36]">{enquiry.adults} Adults</strong>
                          {enquiry.childrenCount ? `, ${enquiry.childrenCount} Children` : ""}
                        </div>
                      )}
                    </div>

                    {/* Column 3: Actions & Quick Connect */}
                    <div className="space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#237A50] hover:bg-[#1b6240] text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reply on WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${enquiry.phone}`}
                          className="w-full bg-white hover:bg-[#F7F3E9] text-[#103F36] border border-[#103F36]/30 text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#103F36]" />
                          <span>Call: {enquiry.phone}</span>
                        </a>
                      </div>

                      <div className="pt-2 border-t border-[#DEDCCD]/60 flex items-center justify-between text-[11px] text-[#59665E]">
                        <span className="flex items-center gap-1 text-[#237A50]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Logged in JSON</span>
                        </span>
                        <Link
                          href={`/enquiry/received?ref=${enquiry.reference}`}
                          target="_blank"
                          className="text-[#103F36] hover:text-[#D9A441] inline-flex items-center gap-1 font-medium underline underline-offset-2"
                        >
                          <span>Receipt View</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Special Requests (if present) */}
                  {(enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message) && (
                    <div className="bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-xs">
                      <strong className="text-[#103F36] block font-semibold mb-1">
                        Traveler Notes / Special Requests:
                      </strong>
                      <p className="text-[#59665E] italic">
                        "{enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
