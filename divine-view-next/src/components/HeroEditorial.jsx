"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroEditorial() {
  const photoWrapperRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking && window.innerWidth >= 1024) {
        window.requestAnimationFrame(() => {
          if (photoWrapperRef.current) {
            const scrollY = window.scrollY;
            // Restrained 16-22px scroll parallax clipped within container
            const movement = Math.min(Math.max(scrollY * 0.08, 0), 22);
            photoWrapperRef.current.style.transform = `translateY(${movement}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full bg-[#F5F1E8] border-b border-[#DDD7CA] overflow-hidden pt-[68px] sm:pt-[72px]">
      {/* 
        Desktop Asymmetric Composition:
        - 42% left warm ivory editorial panel aligned to shared grid
        - 58% right destination photography extending all the way to right screen edge
      */}
      <div className="w-full lg:min-h-[580px] xl:min-h-[620px] lg:h-[calc(100vh-72px)] lg:max-h-[700px] flex flex-col lg:flex-row">
        {/* Left Column: Editorial Journal Content */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center z-10">
          <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <div className="max-w-xl space-y-6 sm:space-y-7">
              {/* Small Eyebrow */}
              <p className="hero-animate-eyebrow text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#C69A45] uppercase">
                PRIVATE JOURNEYS FROM GUWAHATI
              </p>

              {/* Main Heading */}
              <h1 className="hero-animate-heading font-serif text-[42px] sm:text-[54px] md:text-[62px] lg:text-[68px] xl:text-[76px] font-normal text-[#173D35] leading-[1.05] tracking-tight">
                Northeast India,<br />
                at your own pace.
              </h1>

              {/* Supporting Editorial Prose */}
              <p className="hero-animate-subtext text-[17px] sm:text-[18px] text-[#202A25]/90 leading-[1.65] max-w-[480px]">
                Explore Assam, Meghalaya and Arunachal Pradesh with a private itinerary, local drivers and time to take it all in.
              </p>

              {/* Restrained Actions */}
              <div className="hero-animate-actions flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
                {/* Primary CTA: Filled Deep Forest Button */}
                <Link
                  href="/custom-trip"
                  className="group inline-flex items-center justify-center bg-[#173D35] hover:bg-[#0E2923] text-[#F5F1E8] font-medium text-[15px] sm:text-base px-6 sm:px-7 py-3.5 rounded-[8px] transition-colors shadow-sm focus-ring-forest"
                >
                  <span>Plan my trip</span>
                  <span className="ml-2 text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>

                {/* Secondary CTA: Simple Text Link with Arrow */}
                <Link
                  href="/packages"
                  className="group inline-flex items-center text-[#173D35] hover:text-[#C69A45] font-medium text-[15px] sm:text-base transition-colors py-2 focus-ring-forest rounded-sm"
                >
                  <span>Explore journeys</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Destination Photography extending to right edge */}
        <div className="w-full lg:w-[58%] relative min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-[#173D35]/10">
          <div
            ref={photoWrapperRef}
            className="w-full h-full hero-animate-photo will-change-transform"
          >
            <img
              src="/images/dawki-hero.jpg"
              alt="Umngot River at Dawki, Meghalaya with traditional wooden boat floating on turquoise water"
              width={1184}
              height={724}
              fetchPriority="high"
              className="w-full h-full object-cover object-[center_60%] select-none pointer-events-none"
            />
          </div>

          {/* Discreet Local Bottom Gradient solely for the caption */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

          {/* Typographic Caption: Authentic, minimal, no pins or badges */}
          <div className="absolute bottom-4 right-5 sm:bottom-5 sm:right-7 z-10 select-none">
            <span className="text-white/90 text-[12px] sm:text-[13px] font-sans font-medium tracking-wide drop-shadow-sm">
              Umngot River · Meghalaya
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
