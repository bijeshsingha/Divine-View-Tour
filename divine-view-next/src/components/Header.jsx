"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, MessageCircle, Compass, Mail } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destAccordionOpen, setDestAccordionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  if (pathname?.startsWith("/dzukoufieldnotes")) {
    return null;
  }

  const isTransparent = isHome && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? "bg-[#082D27] border-b border-[#103F36] shadow-xl py-3 sm:py-3.5"
          : isTransparent
          ? "bg-transparent border-b border-transparent shadow-none py-4 sm:py-5"
          : isScrolled
          ? "bg-[#082D27]/95 backdrop-blur-md border-b border-[#103F36] shadow-lg py-2.5 sm:py-3"
          : "bg-[#082D27] border-b border-[#103F36] shadow-md py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo - Official Artwork */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Divine View Tours"
            width={180}
            height={52}
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[0.95rem] font-medium text-[#F7F3E9]">
          {/* Destinations with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDestMenuOpen(true)}
            onMouseLeave={() => setDestMenuOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 hover:text-[#D9A441] transition-colors py-2 focus:outline-none cursor-pointer"
              aria-expanded={destMenuOpen}
            >
              <span>Destinations</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  destMenuOpen ? "rotate-180 text-[#D9A441]" : ""
                }`}
              />
            </button>

            {destMenuOpen && (
              <div className="absolute top-full left-0 w-64 bg-[#FFFDF7] text-[#172C26] rounded-xl shadow-2xl border border-[#DEDCCD] p-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#59665E] uppercase">
                  Explore by Region
                </div>
                <Link
                  href="/destinations/assam"
                  className="flex flex-col px-3 py-2 rounded-lg hover:bg-[#F7F3E9] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#103F36]">Assam</span>
                  <span className="text-[12px] text-[#59665E]">Kaziranga, Kamakhya & Brahmaputra</span>
                </Link>
                <Link
                  href="/destinations/meghalaya"
                  className="flex flex-col px-3 py-2 rounded-lg hover:bg-[#F7F3E9] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#103F36]">Meghalaya</span>
                  <span className="text-[12px] text-[#59665E]">Shillong, Sohra Falls & Dawki River</span>
                </Link>
                <Link
                  href="/destinations/arunachal-pradesh"
                  className="flex flex-col px-3 py-2 rounded-lg hover:bg-[#F7F3E9] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#103F36]">Arunachal Pradesh</span>
                  <span className="text-[12px] text-[#59665E]">Sela Pass, Tawang & High Monasteries</span>
                </Link>
                <Link
                  href="/destinations/dzukou-valley"
                  className="flex flex-col px-3 py-2 rounded-lg hover:bg-[#F7F3E9] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#103F36]">
                    Dzukou Valley Trek
                  </span>
                  <span className="text-[12px] text-[#59665E]">Nagaland / Manipur High Meadows</span>
                </Link>
                <div className="border-t border-[#DEDCCD] my-1" />
                <Link
                  href="/destinations"
                  className="block px-3 py-2 text-xs font-semibold text-[#103F36] hover:text-[#D9A441] text-center"
                >
                  View All Destination Guides →
                </Link>
              </div>
            )}
          </div>

          <Link href="/packages" className="hover:text-[#D9A441] transition-colors py-2">
            Packages
          </Link>
          <Link href="/vehicle-hire" className="hover:text-[#D9A441] transition-colors py-2">
            Vehicle Hire
          </Link>
          <Link href="/custom-trip" className="hover:text-[#D9A441] transition-colors py-2">
            Custom Trips
          </Link>
          <Link href="/travel-guides" className="hover:text-[#D9A441] transition-colors py-2">
            Travel Guides
          </Link>
        </nav>

        {/* Right Actions Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Subtle Search trigger */}
          <Link
            href="/packages"
            className="text-[#F7F3E9]/80 hover:text-[#D9A441] transition-colors p-2"
            title="Search Packages"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          <Link
            href="/custom-trip"
            className="bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-semibold text-sm px-6 py-2.5 rounded-full flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
          >
            <span>Plan my trip</span>
            <span className="text-xs">→</span>
          </Link>
        </div>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Link
            href="/custom-trip"
            className="bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-semibold text-xs px-3.5 py-2 rounded-full min-h-[36px] flex items-center transition-colors active:scale-95 shadow-sm"
          >
            Plan trip →
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] p-2 text-[#F7F3E9] hover:text-[#D9A441] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D9A441] rounded-xl flex items-center justify-center transition-transform cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 bg-[#082D27] text-[#F7F3E9] border-t border-[#103F36] shadow-2xl overflow-y-auto px-5 sm:px-6 py-6 animate-in fade-in duration-200 flex flex-col justify-between"
          style={{ height: "calc(100dvh - 100%)" }}
        >
          <div className="space-y-1 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname === "/" ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              Home
            </Link>

            {/* Destinations Accordion */}
            <div className="border-b border-[#103F36]/60">
              <button
                type="button"
                onClick={() => setDestAccordionOpen(!destAccordionOpen)}
                className="w-full flex items-center justify-between min-h-[44px] py-2 px-3 rounded-xl text-left font-medium hover:text-[#D9A441] hover:bg-[#103F36]/20 transition-colors cursor-pointer"
                aria-expanded={destAccordionOpen}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D9A441]" />
                  <span>Destinations</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#D9A441] transition-transform duration-200 ${
                    destAccordionOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {destAccordionOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1 text-sm text-[#F7F3E9]/90 bg-[#103F36]/30 rounded-xl my-1 border border-[#103F36]/60 animate-in fade-in duration-150">
                  <Link
                    href="/destinations/meghalaya"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-lg hover:text-[#D9A441] hover:bg-[#103F36]/40 transition-colors"
                  >
                    <span>Meghalaya (Shillong, Sohra, Dawki)</span>
                  </Link>
                  <Link
                    href="/destinations/arunachal-pradesh"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-lg hover:text-[#D9A441] hover:bg-[#103F36]/40 transition-colors"
                  >
                    <span>Arunachal Pradesh (Sela Pass, Tawang)</span>
                  </Link>
                  <Link
                    href="/destinations/assam"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-lg hover:text-[#D9A441] hover:bg-[#103F36]/40 transition-colors"
                  >
                    <span>Assam (Kaziranga, Kamakhya)</span>
                  </Link>
                  <Link
                    href="/destinations/dzukou-valley"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-lg hover:text-[#D9A441] hover:bg-[#103F36]/40 transition-colors"
                  >
                    <span>Dzukou Valley Trek (Nagaland/Manipur)</span>
                  </Link>
                  <Link
                    href="/destinations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 text-xs font-semibold text-[#D9A441] hover:underline"
                  >
                    <span>Explore All Destinations →</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname.startsWith("/packages") ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              Tour Packages
            </Link>

            <Link
              href="/vehicle-hire"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname === "/vehicle-hire" ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              Vehicle Hire & Rates
            </Link>

            <Link
              href="/custom-trip"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname === "/custom-trip" ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              Custom Trips
            </Link>

            <Link
              href="/travel-guides"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname.startsWith("/travel-guides") ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              Travel Guides
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname === "/about" ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-xl border-b border-[#103F36]/60 transition-colors ${
                pathname === "/contact" ? "text-[#D9A441] font-semibold bg-[#103F36]/40" : "hover:text-[#D9A441] hover:bg-[#103F36]/20"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Instant Contact & Assistance Bottom Area */}
          <div className="mt-6 pt-5 border-t border-[#103F36] space-y-2.5">
            <div className="text-[11px] text-[#D9A441] uppercase tracking-wider font-bold">
              Instant Contact & Assistance
            </div>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full min-h-[44px] text-center flex items-center justify-center gap-2 active:scale-98 shadow-md"
            >
              <MessageCircle className="w-5 h-5 text-[#172C26]" />
              <span className="font-semibold text-sm">WhatsApp {siteConfig.phone}</span>
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="btn-outline-cream w-full min-h-[44px] text-center flex items-center justify-center gap-2 active:scale-98"
            >
              <Phone className="w-4 h-4 text-[#D9A441]" />
              <span className="font-semibold text-sm">Call: {siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.bookingEmail || "bookings@divineviewtours.com"}?subject=Tour%20Booking%20Inquiry`}
              className="w-full min-h-[44px] text-center py-2.5 px-4 rounded-xl bg-[#103F36] border border-[#D9A441]/30 text-xs font-medium text-[#F7F3E9] flex items-center justify-center gap-2 hover:bg-[#103F36]/80 active:scale-98 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D9A441]" />
              <span className="truncate">Desk: {siteConfig.bookingEmail || "bookings@divineviewtours.com"}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
