import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Compass,
  PhoneCall,
  ShieldCheck,
  Clock,
  Car,
  CheckCircle2,
  MessageCircle
} from "lucide-react";
import TripFinder from "@/components/TripFinder";
import PackageCard from "@/components/PackageCard";
import destinationsData from "@/data/destinationsData.json";
import packagesData from "@/data/packagesData.json";
import siteConfig from "@/data/siteConfig.json";

export const metadata = {
  title: "Divine View Tours | Thoughtfully Planned Northeast India Journeys & Private Vehicle Hire",
  description:
    "Curated private road tours and commercial tourist car hire from Guwahati. Explore Meghalaya, Assam, Arunachal Pradesh, and Dzukou Valley with verified mountain drivers and transparent tariffs.",
  alternates: {
    canonical: "https://www.divineviewtours.com",
  },
  openGraph: {
    title: "Divine View Tours | Thoughtfully Planned Northeast India Journeys",
    description:
      "Curated journeys through Meghalaya, Assam, and Arunachal Pradesh. Verified mountain drivers, commercial tourist vehicles, and personalized itineraries from Guwahati.",
    url: "https://www.divineviewtours.com",
    siteName: "Divine View Tours",
    images: [
      {
        url: "/images/homescreen.jpg",
        width: 1200,
        height: 630,
        alt: "Umngot River Dawki Meghalaya with Divine View Tours",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  const featuredPackages = [
    packagesData.find((p) => p.slug.includes("meghalaya")),
    packagesData.find((p) => p.slug.includes("tawang")),
    packagesData.find((p) => p.slug.includes("dzukou"))
  ].filter(Boolean);

  const orderedDestinations = [
    destinationsData.find((d) => d.slug === "assam"),
    destinationsData.find((d) => d.slug === "meghalaya"),
    destinationsData.find((d) => d.slug === "arunachal-pradesh"),
    destinationsData.find((d) => d.slug === "dzukou-valley")
  ].filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What destinations does Divine View Tours cover from Guwahati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divine View Tours operates private road tours and vehicle hire across Meghalaya (Shillong, Cherrapunjee, Dawki, Mawlynnong), Assam (Kaziranga National Park, Kamakhya Temple, Majuli), Arunachal Pradesh (Bhalukpong, Dirang, Sela Pass, Tawang), and Nagaland/Manipur (Dzukou Valley trek).",
        },
      },
      {
        "@type": "Question",
        name: "How do vehicle rental tariffs work from Guwahati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our vehicle hire fleet consists 100% of commercially registered yellow-plate vehicles with verified mountain drivers. We provide fixed, transparent daily rates adhering to Tourist Transporter Association Assam standards for Sedans (Dzire/Etios), Ertiga, Innova Crysta, and Tempo Travellers.",
        },
      },
      {
        "@type": "Question",
        name: "Are Inner Line Permits (ILP) included in Arunachal Pradesh tours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, for all Arunachal Pradesh itineraries (including Tawang and Dirang), Divine View Tours assists in coordinating and securing official Inner Line Permits (ILP) for Indian travelers and PAP for foreign nationals before travel commences.",
        },
      },
      {
        "@type": "Question",
        name: "Can tours be customized for families, groups, or seniors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every itinerary can be customized based on your preferred travel pace, hotel comfort preferences (from boutique homestays to luxury resorts), and vehicle requirements.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* =========================================================================
          1. SCENIC PANORAMIC HERO SECTION
          Full horizontal edge-to-edge panoramic photograph of Umngot River, Dawki
          ========================================================================= */}
      <section className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[780px] xl:min-h-[820px] flex items-center pt-24 sm:pt-28 pb-20 sm:pb-24 overflow-hidden bg-[#07241F]">
        {/* Full-bleed Panoramic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/dawki-hero.jpg"
            alt="Umngot River at Dawki, Meghalaya — crystal turquoise waters and traditional wooden boat"
            className="w-full h-full object-cover object-[center_35%] lg:object-center filter brightness-[0.92] scale-100 transition-transform duration-1000"
          />
          {/* Subtle directional vignette: protects WCAG AAA text contrast on left while keeping turquoise water & boat vibrant on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 45% via-black/15 70% to-transparent" />
          {/* Top header vignette and subtle bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent 35% to-black/35" />
        </div>

        {/* Hero Content Container - Full horizontal span on wide screens */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-14 w-full">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="max-w-2xl xl:max-w-3xl text-[#F7F3E9] space-y-5 sm:space-y-6">
              {/* Dignified Editorial Serif Heading */}
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.4rem] font-bold tracking-tight text-white leading-[1.04] drop-shadow-md">
                Find your own<br />Northeast.
              </h1>

              {/* Spaced Uppercase Tagline directly beneath heading */}
              <div className="text-[11px] sm:text-xs md:text-sm tracking-[0.22em] sm:tracking-[0.25em] font-semibold text-[#E5C278] uppercase flex flex-wrap items-center gap-1.5 sm:gap-2 drop-shadow">
                <span>Rivers</span>
                <span className="text-[#E5C278]/60">·</span>
                <span>Mountains</span>
                <span className="text-[#E5C278]/60">·</span>
                <span>Cultures</span>
                <span className="text-[#E5C278]/60">·</span>
                <span>Extraordinary People</span>
              </div>

              {/* Subheading */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-xl drop-shadow">
                Curated journeys through Assam, Meghalaya, Arunachal Pradesh and Nagaland / Manipur.
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/packages"
                  className="bg-[#D9A441] hover:bg-[#C18D2D] text-[#172C26] font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Explore packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/custom-trip"
                  className="border border-white/70 hover:border-white text-white hover:bg-white/10 font-semibold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-full transition-all active:scale-[0.98] drop-shadow"
                >
                  Create my trip
                </Link>
              </div>

              {/* Mobile Location Caption */}
              <div className="pt-2 lg:hidden">
                <div className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white/90 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Umngot River · Meghalaya</span>
                </div>
              </div>
            </div>

            {/* Right Column: Cursive Script Accent & Location Badge */}
            <div className="hidden lg:flex flex-col justify-between lg:self-stretch min-h-[300px] xl:min-h-[360px] pointer-events-none select-none">
              {/* Cursive handwritten accent quote */}
              <div className="flex flex-col items-end text-right pr-2">
                <p className="font-script text-3xl xl:text-4xl text-[#FCE38A] drop-shadow-lg leading-tight">
                  More Than a Destination...
                </p>
                <p className="font-script text-4xl xl:text-5xl text-[#D9A441] font-bold drop-shadow-lg -mt-1">
                  A Deeper Connection
                </p>
                <div className="w-44 h-[2px] bg-gradient-to-l from-[#D9A441] via-[#D9A441]/80 to-transparent mt-1" />
              </div>

              {/* Verified Location Pin at bottom-right corner */}
              <div className="flex justify-end pb-1">
                <div className="flex items-center gap-2 text-white/95 drop-shadow-md">
                  <MapPin className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <div className="text-left">
                    <div className="font-bold text-xs tracking-[0.2em] uppercase text-white leading-none">
                      UMNGOT RIVER
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/80 mt-0.5">
                      MEGHALAYA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TRIP FINDER STRIP
          Segmented floating card docked across the bottom fold
          ========================================================================= */}
      <section className="relative z-30 -mt-10 lg:-mt-12 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <TripFinder />
      </section>

      {/* =========================================================================
          3. FEATURED PACKAGES
          Editorial serif title with gold accent line and 3-column cards
          ========================================================================= */}
      <section className="py-20 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
                Featured Packages
              </h2>
              <div className="h-[2px] w-16 sm:w-24 bg-[#D9A441]" />
            </div>
            <p className="text-sm sm:text-base text-[#59665E] max-w-lg">
              Popular journeys to inspire your next adventure.
            </p>
          </div>
          <Link
            href="/packages"
            className="text-sm font-semibold text-[#103F36] hover:text-[#D9A441] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View all packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Cards Across matching website-b-scenic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. EXPLORE BY DESTINATION
          4 scenic destination cards with circular arrow buttons
          ========================================================================= */}
      <section className="py-20 bg-[#FFFDF7] border-y border-[#DEDCCD]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
                Explore by Destination
              </h2>
              <div className="h-[2px] w-16 sm:w-24 bg-[#D9A441]" />
            </div>
            <p className="text-sm sm:text-base text-[#59665E]">
              Four remarkable regions. Endless stories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderedDestinations.map((dest) => {
              const displayName = dest.slug === "dzukou-valley" ? "Nagaland / Manipur" : dest.name;
              const displaySub =
                dest.slug === "assam"
                  ? "TEMPLES · RIVERS · WILDLIFE"
                  : dest.slug === "meghalaya"
                  ? "RIVERS · WATERFALLS · LIVING ROOT BRIDGES"
                  : dest.slug === "arunachal-pradesh"
                  ? "MONASTERIES · MOUNTAINS · CULTURE"
                  : "VALLEYS · TREKS · LIVING CULTURES";

              return (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-84 flex flex-col justify-end p-5 bg-[#082D27]"
                >
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  <div className="relative z-10 flex items-end justify-between gap-2 text-[#F7F3E9]">
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D9A441] transition-colors leading-snug">
                        {displayName}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#D9A441] uppercase">
                        {displaySub}
                      </p>
                      {dest.slug === "dzukou-valley" && (
                        <span className="inline-block mt-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#D9A441]/25 border border-[#D9A441]/40 text-[#D9A441]">
                          Includes Field Notes & Trail Guide →
                        </span>
                      )}
                    </div>

                    {/* Circular Arrow Button */}
                    <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white shrink-0 group-hover:bg-[#D9A441] group-hover:text-[#172C26] group-hover:border-[#D9A441] transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4B. PRIVATE VEHICLE HIRE & ROAD JOURNEYS
          Direct poster fares, fleet specifications, and TTAA group options
          ========================================================================= */}
      <section id="vehicle-hire" className="py-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441] block">
                Commercial Fleet · Starting from Guwahati
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
                Private Vehicle Hire & Road Journeys
              </h2>
              <div className="h-[2px] w-16 sm:w-24 bg-[#D9A441]" />
            </div>
            <p className="text-sm sm:text-base text-[#59665E] max-w-2xl">
              Travel at your own pace with dedicated tourist commercial vehicles and experienced mountain drivers. Transparent fuel-inclusive fares with zero hidden charges.
            </p>
          </div>
          <Link
            href="/vehicle-hire"
            className="inline-flex items-center gap-2 bg-[#103F36] hover:bg-[#082D27] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all shadow-sm self-start sm:self-auto"
          >
            <span>View Full Rate Sheet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Core Vehicles from Poster */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Card 1: Swift Dzire */}
          <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-7 border border-[#DEDCCD] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F7F3E9] text-[#103F36] border border-[#DEDCCD]">
                  1–4 Guests · 2 Bags
                </span>
                <span className="text-xs font-bold text-[#59665E] uppercase tracking-wider">
                  Sedan
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#103F36] mb-1">
                Maruti Swift Dzire
              </h3>
              <p className="text-xs text-[#59665E] mb-6">
                Compact, agile, and fuel-efficient. Perfect for couples, solo travelers, and city excursions.
              </p>

              {/* Poster Fares List */}
              <div className="space-y-2.5 border-t border-[#DEDCCD]/80 pt-4 mb-6">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Guwahati Airport Transfer</span>
                  <span className="font-bold text-[#103F36]">₹1,000</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Guwahati Local (8h / 80km)</span>
                  <span className="font-bold text-[#103F36]">₹3,000</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Same-Day Shillong Return</span>
                  <span className="font-bold text-[#103F36]">₹5,000</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Meghalaya Multi-Day Tour</span>
                  <span className="font-bold text-[#103F36]">₹4,000 <span className="text-[10px] font-normal text-[#59665E]">/ day</span></span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Arunachal Pradesh Circuit</span>
                  <span className="font-bold text-[#103F36]">₹5,000 <span className="text-[10px] font-normal text-[#59665E]">/ day</span></span>
                </div>
              </div>
            </div>

            <Link
              href="/vehicle-hire"
              className="w-full text-center text-xs font-semibold py-2.5 px-4 rounded-lg bg-[#F7F3E9] hover:bg-[#E9E4D4] text-[#103F36] transition-colors border border-[#DEDCCD]"
            >
              Check Availability & Details
            </Link>
          </div>

          {/* Card 2: Maruti Ertiga (Featured) */}
          <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-7 border-2 border-[#D9A441] shadow-md flex flex-col justify-between relative hover:shadow-lg transition-shadow">
            <div className="absolute -top-3 left-6">
              <span className="bg-[#D9A441] text-[#103F36] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 mt-1">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F7F3E9] text-[#103F36] border border-[#DEDCCD]">
                  4–6 Guests · 3–4 Bags
                </span>
                <span className="text-xs font-bold text-[#D9A441] uppercase tracking-wider">
                  Mid-Size MUV
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#103F36] mb-1">
                Maruti Suzuki Ertiga
              </h3>
              <p className="text-xs text-[#59665E] mb-6">
                Spacious seating with roof carrier. Ideal for families touring Cherrapunji waterfalls and Kaziranga safari parks.
              </p>

              {/* Poster Fares List */}
              <div className="space-y-2.5 border-t border-[#DEDCCD]/80 pt-4 mb-6">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Guwahati Airport Transfer</span>
                  <span className="font-bold text-[#103F36]">₹1,500</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Guwahati Local (8h / 80km)</span>
                  <span className="font-bold text-[#103F36]">₹4,000</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Same-Day Shillong Return</span>
                  <span className="font-bold text-[#103F36]">₹6,000</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Meghalaya Multi-Day Tour</span>
                  <span className="font-bold text-[#103F36]">₹5,000 <span className="text-[10px] font-normal text-[#59665E]">/ day</span></span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Arunachal Pradesh Circuit</span>
                  <span className="font-bold text-[#103F36]">₹6,000 <span className="text-[10px] font-normal text-[#59665E]">/ day</span></span>
                </div>
              </div>
            </div>

            <Link
              href="/vehicle-hire"
              className="w-full text-center text-xs font-bold py-2.5 px-4 rounded-lg bg-[#103F36] hover:bg-[#082D27] text-white transition-colors shadow-sm"
            >
              Book Ertiga for Your Trip
            </Link>
          </div>

          {/* Card 3: Toyota Innova Crysta */}
          <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-7 border border-[#DEDCCD] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F7F3E9] text-[#103F36] border border-[#DEDCCD]">
                  5–7 Guests · 4–6 Bags
                </span>
                <span className="text-xs font-bold text-[#59665E] uppercase tracking-wider">
                  Mountain SUV
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#103F36] mb-1">
                Toyota Innova Crysta
              </h3>
              <p className="text-xs text-[#59665E] mb-6">
                Premium mountain suspension, strong hill-climbing torque, and plush seating for high-altitude passes and long journeys.
              </p>

              {/* Poster Fares List */}
              <div className="space-y-2.5 border-t border-[#DEDCCD]/80 pt-4 mb-6">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Guwahati Airport Transfer</span>
                  <span className="font-bold text-[#103F36]">₹2,000</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Guwahati Local (8h / 80km)</span>
                  <span className="font-bold text-[#103F36]">₹4,500</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Same-Day Shillong Return</span>
                  <span className="font-bold text-[#103F36]">₹7,500</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Meghalaya Multi-Day Tour</span>
                  <span className="font-bold text-[#103F36]">₹6,000 <span className="text-[10px] font-normal text-[#59665E]">/ day</span></span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-[#59665E]">Arunachal Pradesh Circuit</span>
                  <span className="font-bold text-[#103F36]">₹7,000 <span className="text-[10px] font-normal text-[#59665E]">/ day</span></span>
                </div>
              </div>
            </div>

            <Link
              href="/vehicle-hire"
              className="w-full text-center text-xs font-semibold py-2.5 px-4 rounded-lg bg-[#F7F3E9] hover:bg-[#E9E4D4] text-[#103F36] transition-colors border border-[#DEDCCD]"
            >
              Check Availability & Details
            </Link>
          </div>
        </div>

        {/* Group Fleet Callout + Direct Phone Booking */}
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-8 border border-[#DEDCCD] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#D9A441]">
              <Users className="w-4 h-4" />
              <span>Group Fleet & Extended Multi-Day Expeditions</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#103F36]">
              Tempo Travellers (13–26 Seater) & Force Urbania Luxury Vans
            </h4>
            <p className="text-xs sm:text-sm text-[#59665E] max-w-2xl">
              Operating across Tawang, Mechuka, Kaziranga, and Meghalaya under official Tourist Transporter Association of Assam (TTAA) standards. Includes transparent agency coordination and 24/7 mountain dispatch support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href="https://wa.me/916026504087?text=Hello%20Divine%20View%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20hire%20from%20Guwahati"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#103F36] hover:bg-[#082D27] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#D9A441]" />
              <span>WhatsApp Booking</span>
            </a>
            <a
              href={`tel:${siteConfig.phoneSecondaryRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F7F3E9] hover:bg-[#E9E4D4] text-[#103F36] font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg transition-colors border border-[#DEDCCD]"
            >
              <PhoneCall className="w-4 h-4 text-[#D9A441]" />
              <span>{siteConfig.phoneSecondary}</span>
            </a>
          </div>
        </div>

        {/* Operating Trust Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#DEDCCD]">
          <div className="flex items-center gap-3 text-xs text-[#59665E]">
            <ShieldCheck className="w-4 h-4 text-[#103F36] shrink-0" />
            <span><strong>100% Commercial Yellow Plates</strong> (Safe & Legal)</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#59665E]">
            <CheckCircle2 className="w-4 h-4 text-[#103F36] shrink-0" />
            <span><strong>Experienced Mountain Drivers</strong> on hill routes</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#59665E]">
            <Clock className="w-4 h-4 text-[#103F36] shrink-0" />
            <span><strong>Punctual Airport & City Pickups</strong> guaranteed</span>
          </div>
        </div>
      </section>
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#082D27] text-[#F7F3E9]">
        {/* Full-bleed Panoramic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/homescreen.jpg"
            alt="One-Horned Rhinoceros grazing in Kaziranga golden sunrise"
            className="w-full h-full object-cover object-[center_60%] filter brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Left Sub-caption */}
            <div className="lg:w-1/3">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-white/75 block">
                Journeys Beyond Ordinary
              </span>
            </div>

            {/* Right Main Copy & Action */}
            <div className="lg:w-2/3 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Plan a journey that's uniquely yours
                </h2>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  Tell us your interests, and we'll craft a personalised itinerary across the Northeast.
                </p>
              </div>

              <Link
                href="/custom-trip"
                className="inline-flex items-center gap-2 border border-white/75 hover:border-white hover:bg-white hover:text-[#103F36] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all whitespace-nowrap self-start md:self-auto shadow-md"
              >
                <span>Create my custom trip</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PEOPLE & OPERATING TRUST
          Local Northeast expertise from Guwahati
          ========================================================================= */}
      <section className="py-20 bg-[#F7F3E9]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9A441] mb-2 block">
              Local Operating Expertise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
              Why Travellers Trust Divine View
            </h2>
            <p className="text-sm sm:text-base text-[#59665E] mt-2">
              Based directly in Guwahati, we run our own vehicles, coordinate all permits, and support your journey every kilometre of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.trustPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF7] rounded-2xl p-6 border border-[#DEDCCD] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-[#E9F0EA] flex items-center justify-center text-[#103F36] mb-4 font-bold text-sm">
                  0{idx}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#103F36] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Genuine Reviews & Phone Callout */}
          <div className="mt-12 bg-[#FFFDF7] rounded-2xl border border-[#DEDCCD] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#103F36]">
                Planning a trip with family or friends?
              </h4>
              <p className="text-sm text-[#59665E]">
                Talk directly with our route coordinators in Guwahati for honest road advice, timing, and customized quotes.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="bg-[#103F36] hover:bg-[#082D27] text-[#F7F3E9] font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#D9A441]" />
                <span>Call {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
