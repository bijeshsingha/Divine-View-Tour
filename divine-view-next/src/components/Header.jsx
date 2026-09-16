"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Phone, MessageCircle, Compass } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#082D27]/95 backdrop-blur-md shadow-md py-3"
          : "bg-gradient-to-b from-[#082D27]/80 via-[#082D27]/40 to-transparent py-4"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#103F36] border border-[#D9A441]/40 flex items-center justify-center p-1 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-[#D9A441]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#F7F3E9] leading-tight">
              Divine View Tours
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#D9A441] font-medium">
              Northeast Escapes · Guwahati
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[0.92rem] font-medium text-[#F7F3E9]">
          {/* Destinations with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDestMenuOpen(true)}
            onMouseLeave={() => setDestMenuOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 hover:text-[#D9A441] transition-colors py-2 focus:outline-none"
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
          <Link href="/custom-trip" className="hover:text-[#D9A441] transition-colors py-2">
            Custom Trips
          </Link>
          <Link href="/vehicle-hire" className="hover:text-[#D9A441] transition-colors py-2">
            Vehicle Hire
          </Link>
          <Link href="/travel-guides" className="hover:text-[#D9A441] transition-colors py-2">
            Travel Guides
          </Link>
          <Link href="/about" className="hover:text-[#D9A441] transition-colors py-2">
            About Us
          </Link>
        </nav>

        {/* Right Actions Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-medium text-[#F7F3E9]/90 hover:text-[#D9A441] transition-colors px-2 py-1"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#D9A441]" />
            <span>{siteConfig.phone}</span>
          </a>

          <Link href="/custom-trip" className="btn-gold !py-2.5 !px-5 !text-sm">
            Plan my trip
          </Link>
        </div>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <Link href="/custom-trip" className="btn-gold !py-2 !px-3.5 !text-xs !min-h-[38px]">
            Plan trip
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F7F3E9] hover:text-[#D9A441] focus:outline-none focus:ring-2 focus:ring-[#D9A441] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#082D27]/98 backdrop-blur-xl z-50 overflow-y-auto px-6 py-6 text-[#F7F3E9] border-t border-[#103F36] animate-in fade-in duration-200">
          <div className="space-y-4 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              Home
            </Link>

            {/* Destinations collapsible */}
            <div className="py-2 border-b border-[#103F36]">
              <div className="text-xs uppercase tracking-wider text-[#D9A441] font-bold mb-2">
                Destinations
              </div>
              <div className="pl-3 space-y-2 text-sm text-[#F7F3E9]/90">
                <Link
                  href="/destinations/meghalaya"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#D9A441]"
                >
                  Meghalaya (Shillong, Sohra, Dawki)
                </Link>
                <Link
                  href="/destinations/arunachal-pradesh"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#D9A441]"
                >
                  Arunachal Pradesh (Sela Pass, Tawang)
                </Link>
                <Link
                  href="/destinations/assam"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#D9A441]"
                >
                  Assam (Kaziranga, Kamakhya)
                </Link>
                <Link
                  href="/destinations/dzukou-valley"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#D9A441]"
                >
                  Dzukou Valley Trek (Nagaland/Manipur)
                </Link>
              </div>
            </div>

            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              Tour Packages
            </Link>
            <Link
              href="/custom-trip"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              Custom Trips
            </Link>
            <Link
              href="/vehicle-hire"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              Vehicle Hire & Rates
            </Link>
            <Link
              href="/travel-guides"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              Travel Guides
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#103F36] hover:text-[#D9A441]"
            >
              Contact
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#103F36] space-y-4">
            <div className="text-xs text-[#59665E] uppercase tracking-wider font-semibold">
              Instant Assistance
            </div>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full text-center"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp {siteConfig.phone}
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="btn-outline-cream w-full text-center"
            >
              <Phone className="w-5 h-5" />
              Call Direct: {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
