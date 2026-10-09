"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, MessageCircle, Mail } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destAccordionOpen, setDestAccordionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDestMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setDestMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (pathname?.startsWith("/dzukoufieldnotes")) {
    return null;
  }

  const isHomepage = pathname === "/";
  const isTransparent = isHomepage && !isScrolled && !mobileMenuOpen;

  const navLinkClass = (href, startsWith = false) => {
    const active = startsWith ? pathname.startsWith(href) : pathname === href;
    if (isTransparent) {
      return `text-[15px] font-medium transition-colors py-2 focus-ring-forest rounded-sm ${
        active
          ? "text-[#E5B869] font-semibold drop-shadow-sm"
          : "text-white/90 hover:text-white drop-shadow-sm"
      }`;
    }
    return `text-[15px] font-medium transition-colors py-2 focus-ring-forest rounded-sm ${
      active
        ? "text-[#173D35] font-semibold"
        : "text-[#202A25]/85 hover:text-[#173D35]"
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent py-3.5 sm:py-4"
          : "bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#DDD7CA] shadow-sm py-2.5 sm:py-3"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-ring-forest rounded-sm"
          aria-label="Divine View Tours Home"
        >
          <img
            src="/logo.png"
            alt="Divine View Tours"
            width={180}
            height={52}
            className="h-9 sm:h-11 w-auto object-contain transition-opacity group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-7 xl:gap-8 text-[15px]"
          aria-label="Primary Navigation"
        >
          {/* Destinations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDestMenuOpen(true)}
            onMouseLeave={() => setDestMenuOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 py-2 font-medium transition-colors cursor-pointer focus-ring-forest rounded-sm ${
                isTransparent
                  ? pathname.startsWith("/destinations")
                    ? "text-[#E5B869] font-semibold drop-shadow-sm"
                    : "text-white/90 hover:text-white drop-shadow-sm"
                  : pathname.startsWith("/destinations")
                    ? "text-[#173D35] font-semibold"
                    : "text-[#202A25]/85 hover:text-[#173D35]"
              }`}
              aria-expanded={destMenuOpen}
              aria-haspopup="true"
            >
              <span>Destinations</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  destMenuOpen ? "rotate-180" : ""
                } ${
                  isTransparent
                    ? "text-white/80"
                    : destMenuOpen
                      ? "text-[#173D35]"
                      : "text-[#59665E]"
                }`}
              />
            </button>

            {destMenuOpen && (
              <div className="absolute top-full left-0 w-64 bg-[#FFFDF7] rounded-[8px] shadow-lg border border-[#DDD7CA] p-2 mt-1 z-50">
                <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-[#59665E] uppercase">
                  Regions & Treks
                </div>
                <Link
                  href="/destinations/meghalaya"
                  className="flex flex-col px-3 py-2 rounded-[6px] hover:bg-[#F5F1E8] transition-colors"
                >
                  <span className="font-medium text-sm text-[#173D35]">Meghalaya</span>
                  <span className="text-[12px] text-[#59665E]">Shillong, Sohra Falls & Dawki River</span>
                </Link>
                <Link
                  href="/destinations/assam"
                  className="flex flex-col px-3 py-2 rounded-[6px] hover:bg-[#F5F1E8] transition-colors"
                >
                  <span className="font-medium text-sm text-[#173D35]">Assam</span>
                  <span className="text-[12px] text-[#59665E]">Kaziranga, Kamakhya & Brahmaputra</span>
                </Link>
                <Link
                  href="/destinations/arunachal-pradesh"
                  className="flex flex-col px-3 py-2 rounded-[6px] hover:bg-[#F5F1E8] transition-colors"
                >
                  <span className="font-medium text-sm text-[#173D35]">Arunachal Pradesh</span>
                  <span className="text-[12px] text-[#59665E]">Sela Pass, Tawang & Monasteries</span>
                </Link>
                <Link
                  href="/destinations/dzukou-valley"
                  className="flex flex-col px-3 py-2 rounded-[6px] hover:bg-[#F5F1E8] transition-colors"
                >
                  <span className="font-medium text-sm text-[#173D35]">Dzukou Valley Trek</span>
                  <span className="text-[12px] text-[#59665E]">Nagaland & Manipur High Meadows</span>
                </Link>
                <div className="border-t border-[#DDD7CA] my-1" />
                <Link
                  href="/destinations"
                  className="block px-3 py-2 text-xs font-semibold text-[#173D35] hover:text-[#C69A45] text-center"
                >
                  View All Destinations →
                </Link>
              </div>
            )}
          </div>

          <Link href="/packages" className={navLinkClass("/packages", true)}>
            Packages
          </Link>

          <Link href="/vehicle-hire" className={navLinkClass("/vehicle-hire")}>
            Vehicle Hire
          </Link>

          <Link href="/custom-trip" className={navLinkClass("/custom-trip")}>
            Custom Trips
          </Link>

          {/* More Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMoreMenuOpen(true)}
            onMouseLeave={() => setMoreMenuOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 py-2 font-medium transition-colors cursor-pointer focus-ring-forest rounded-sm ${
                isTransparent
                  ? "text-white/90 hover:text-white drop-shadow-sm"
                  : moreMenuOpen
                    ? "text-[#173D35]"
                    : "text-[#202A25]/85 hover:text-[#173D35]"
              }`}
              aria-expanded={moreMenuOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreMenuOpen ? "rotate-180" : ""
                } ${
                  isTransparent
                    ? "text-white/80"
                    : moreMenuOpen
                      ? "text-[#173D35]"
                      : "text-[#59665E]"
                }`}
              />
            </button>

            {moreMenuOpen && (
              <div className="absolute top-full left-0 w-56 bg-[#FFFDF7] rounded-[8px] shadow-lg border border-[#DDD7CA] p-2 mt-1 z-50">
                <Link
                  href="/international-travellers"
                  className="block px-3 py-2 rounded-[6px] text-sm text-[#202A25] hover:bg-[#F5F1E8] hover:text-[#173D35] transition-colors"
                >
                  International Travellers
                </Link>
                <Link
                  href="/travel-guides"
                  className="block px-3 py-2 rounded-[6px] text-sm text-[#202A25] hover:bg-[#F5F1E8] hover:text-[#173D35] transition-colors"
                >
                  Travel Guides
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-[6px] text-sm text-[#202A25] hover:bg-[#F5F1E8] hover:text-[#173D35] transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-[6px] text-sm text-[#202A25] hover:bg-[#F5F1E8] hover:text-[#173D35] transition-colors"
                >
                  Contact Desk
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Action: Single "Plan my trip" */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/custom-trip"
            className={`group inline-flex items-center gap-1.5 font-medium text-sm px-5 py-2.5 rounded-[8px] transition-colors shadow-sm focus-ring-forest ${
              isTransparent
                ? "bg-[#173D35] hover:bg-[#0E2923] text-white border border-white/20"
                : "bg-[#173D35] hover:bg-[#0E2923] text-[#F5F1E8]"
            }`}
          >
            <span>Plan my trip</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Mobile Header Elements */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/custom-trip"
            className="hidden sm:inline-flex bg-[#173D35] hover:bg-[#0E2923] text-[#F5F1E8] font-medium text-xs px-3.5 py-2 rounded-[8px] min-h-[36px] items-center transition-colors active:scale-95"
          >
            Plan my trip →
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`min-w-[40px] min-h-[40px] p-2 active:scale-95 focus-ring-forest rounded-[8px] flex items-center justify-center transition-transform cursor-pointer ${
              isTransparent ? "text-white drop-shadow-sm" : "text-[#202A25] hover:text-[#173D35]"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#202A25]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 bg-[#F5F1E8] text-[#202A25] border-t border-[#DDD7CA] shadow-xl overflow-y-auto px-5 sm:px-6 py-6 flex flex-col justify-between"
          style={{ height: "calc(100dvh - 100%)" }}
        >
          <div className="space-y-1 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname === "/" ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              Home
            </Link>

            {/* Destinations Accordion */}
            <div className="border-b border-[#DDD7CA]/60">
              <button
                type="button"
                onClick={() => setDestAccordionOpen(!destAccordionOpen)}
                className="w-full flex items-center justify-between min-h-[44px] py-2 px-3 rounded-[8px] text-left font-medium hover:text-[#173D35] transition-colors cursor-pointer"
                aria-expanded={destAccordionOpen}
              >
                <span>Destinations</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#59665E] transition-transform duration-200 ${
                    destAccordionOpen ? "rotate-180 text-[#173D35]" : ""
                  }`}
                />
              </button>

              {destAccordionOpen && (
                <div className="pl-3 pr-2 py-2 space-y-1 text-sm text-[#202A25]/90 bg-[#FFFDF7] rounded-[8px] my-1 border border-[#DDD7CA]">
                  <Link
                    href="/destinations/meghalaya"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-[6px] hover:text-[#173D35] hover:bg-[#F5F1E8] transition-colors"
                  >
                    Meghalaya (Shillong, Sohra, Dawki)
                  </Link>
                  <Link
                    href="/destinations/assam"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-[6px] hover:text-[#173D35] hover:bg-[#F5F1E8] transition-colors"
                  >
                    Assam (Kaziranga, Kamakhya)
                  </Link>
                  <Link
                    href="/destinations/arunachal-pradesh"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-[6px] hover:text-[#173D35] hover:bg-[#F5F1E8] transition-colors"
                  >
                    Arunachal Pradesh (Sela Pass, Tawang)
                  </Link>
                  <Link
                    href="/destinations/dzukou-valley"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 rounded-[6px] hover:text-[#173D35] hover:bg-[#F5F1E8] transition-colors"
                  >
                    Dzukou Valley Trek (Nagaland/Manipur)
                  </Link>
                  <Link
                    href="/destinations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 px-3 text-xs font-semibold text-[#173D35]"
                  >
                    Explore All Destinations →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname.startsWith("/packages") ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              Tour Packages
            </Link>

            <Link
              href="/vehicle-hire"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname === "/vehicle-hire" ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              Vehicle Hire & Rates
            </Link>

            <Link
              href="/custom-trip"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname === "/custom-trip" ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              Custom Trips
            </Link>

            <Link
              href="/international-travellers"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname === "/international-travellers" ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              International Travellers
            </Link>

            <Link
              href="/travel-guides"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname.startsWith("/travel-guides") ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              Travel Guides
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname === "/about" ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center min-h-[44px] py-2 px-3 rounded-[8px] border-b border-[#DDD7CA]/60 transition-colors ${
                pathname === "/contact" ? "text-[#173D35] font-semibold bg-[#DDD7CA]/40" : "hover:text-[#173D35]"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Contact & Assistance Drawer Bottom */}
          <div className="mt-6 pt-5 border-t border-[#DDD7CA] space-y-2.5">
            <div className="text-[11px] text-[#59665E] uppercase tracking-wider font-semibold">
              Instant Contact & Assistance
            </div>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] text-center flex items-center justify-center gap-2 bg-[#173D35] text-[#F5F1E8] rounded-[8px] font-medium text-sm transition-colors hover:bg-[#0E2923]"
            >
              <MessageCircle className="w-4 h-4 text-[#C69A45]" />
              <span>WhatsApp {siteConfig.phone}</span>
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="w-full min-h-[44px] text-center flex items-center justify-center gap-2 border border-[#DDD7CA] bg-[#FFFDF7] text-[#202A25] rounded-[8px] font-medium text-sm transition-colors hover:bg-[#F5F1E8]"
            >
              <Phone className="w-4 h-4 text-[#173D35]" />
              <span>Call: {siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.bookingEmail || "info@divineviewtours.com"}?subject=Tour%20Inquiry`}
              className="w-full min-h-[44px] text-center py-2 px-3 text-xs text-[#59665E] flex items-center justify-center gap-2 hover:text-[#173D35]"
            >
              <Mail className="w-3.5 h-3.5 text-[#59665E]" />
              <span>Desk: {siteConfig.bookingEmail || "info@divineviewtours.com"}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
