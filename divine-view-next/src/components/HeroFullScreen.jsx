"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroFullScreen() {
  const scrollToFinder = () => {
    const finderEl = document.getElementById("journey-finder-section");
    if (finderEl) {
      finderEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-between overflow-hidden">
      {/* Full-bleed background photograph */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/dawki-hero.jpg"
          alt="Umngot River at Dawki, Meghalaya with traditional wooden boat on crystal clear turquoise water"
          className="w-full h-full object-cover object-[center_60%] select-none scale-[1.01] transition-transform duration-1000 ease-out"
          fetchPriority="high"
        />
        {/* Top gradient scrim for transparent header legibility */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/65 via-black/30 to-transparent pointer-events-none" />

        {/* Cinematic overall contrast scrim */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Bottom gradient scrim for caption and scroll indicator */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Top spacer (reserves header height) */}
      <div className="pt-20 sm:pt-28" />

      {/* Floating Minimal Editorial Content */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Eyebrow */}
          <p className="text-[11px] sm:text-[13px] font-semibold tracking-[0.2em] text-[#E5B869] uppercase drop-shadow-sm">
            PRIVATE JOURNEYS FROM GUWAHATI
          </p>

          {/* Minimal Floating Headline */}
          <h1 className="font-serif text-[34px] sm:text-[54px] md:text-[68px] lg:text-[78px] font-normal text-white leading-[1.08] tracking-tight drop-shadow-md">
            Northeast India,<br />
            at your own pace.
          </h1>

          {/* Minimal Floating Supporting Prose */}
          <p className="text-[15px] sm:text-[18px] text-white/90 leading-[1.65] max-w-lg drop-shadow-sm font-normal">
            Explore Assam, Meghalaya and Arunachal Pradesh with a private itinerary, verified local drivers and time to take it all in.
          </p>

          {/* Minimal Floating Actions */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
            <Link
              href="/custom-trip"
              className="group inline-flex items-center justify-center bg-[#173D35] hover:bg-[#0E2923] text-white font-medium text-[15px] sm:text-base px-6 sm:px-7 py-3.5 rounded-[8px] transition-all shadow-lg border border-white/15 focus-ring-forest"
            >
              <span>Plan my trip</span>
              <span className="ml-2 text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>

            <Link
              href="/packages"
              className="group inline-flex items-center text-white hover:text-[#E5B869] font-medium text-[15px] sm:text-base transition-colors py-2 drop-shadow-sm focus-ring-forest rounded-sm"
            >
              <span>Explore journeys</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll prompt & Photo location caption */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex items-end justify-between">
        {/* Scroll down prompt */}
        <button
          type="button"
          onClick={scrollToFinder}
          className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-[13px] font-medium tracking-wide transition-colors cursor-pointer drop-shadow-sm"
          aria-label="Scroll to Journey Finder"
        >
          <span>Find your journey</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5 animate-bounce" />
        </button>

        {/* Minimal Photo Caption */}
        <div className="select-none">
          <span className="text-white/80 text-[12px] sm:text-[13px] font-sans font-medium tracking-wide drop-shadow-sm">
            Umngot River · Meghalaya
          </span>
        </div>
      </div>
    </section>
  );
}
