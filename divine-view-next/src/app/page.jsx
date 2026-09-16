import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Car,
  BookOpen
} from "lucide-react";
import TripFinder from "@/components/TripFinder";
import PackageCard from "@/components/PackageCard";
import VehicleRateTable from "@/components/VehicleRateTable";
import packagesData from "@/data/packagesData.json";
import destinationsData from "@/data/destinationsData.json";
import travelGuidesData from "@/data/travelGuidesData.json";
import siteConfig from "@/data/siteConfig.json";

export default function HomePage() {
  const featuredPackages = packagesData.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26]">
      {/* 1. SCENIC HERO SECTION */}
      <section className="relative min-h-[620px] lg:min-h-[720px] flex items-center pt-24 pb-16 overflow-hidden bg-[#082D27]">
        {/* Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Meghalaya/Dawki/Dawki River.jpg"
            alt="Umngot River Dawki Meghalaya"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.82]"
          />
          {/* Left-to-right dark overlay for maximum editorial contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#082D27]/95 via-[#082D27]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082D27] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-[#F7F3E9] space-y-6">
            {/* Gold Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/20 border border-[#D9A441]/40 text-[#D9A441] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              {siteConfig.heroPill}
            </div>

            {/* Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F3E9] leading-[1.08]">
              {siteConfig.heroHeading}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#F7F3E9]/85 font-normal leading-relaxed max-w-xl">
              {siteConfig.heroSubheading}
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/packages" className="btn-gold !py-3 !px-7 text-sm sm:text-base">
                <span>Explore packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/custom-trip" className="btn-outline-cream !py-3 !px-7 text-sm sm:text-base">
                Create my trip
              </Link>
            </div>

            {/* Verified Location Caption Bar */}
            <div className="pt-4">
              <span className="caption-bar">
                <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                {siteConfig.heroCaption}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRIP FINDER STRIP (Immediately below Hero) */}
      <section className="relative z-20 -mt-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <TripFinder />
      </section>

      {/* 3. FEATURED TOUR PACKAGES */}
      <section className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="badge-forest mb-2">Curated Itineraries</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
              Featured Journeys
            </h2>
            <p className="text-sm sm:text-base text-[#59665E] mt-1 max-w-lg">
              Transparent per-person pricing, realistic driving times, and handpicked local stays.
            </p>
          </div>
          <Link
            href="/packages"
            className="btn-outline-forest self-start md:self-auto !py-2.5 !px-5 !text-xs sm:!text-sm inline-flex items-center gap-2"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Cards Across */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 4. EXPLORE BY DESTINATION */}
      <section className="py-16 bg-[#FFFDF7] border-y border-[#DEDCCD]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-forest mb-2">Four Distinct Regions</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
              Explore by Destination
            </h2>
            <p className="text-sm sm:text-base text-[#59665E] mt-2">
              From subtropical Kaziranga wetlands to 13,700-ft high Himalayan passes and pristine emerald valleys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationsData.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-80 flex flex-col justify-end p-5 bg-[#082D27]"
              >
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082D27]/95 via-[#082D27]/40 to-transparent" />

                <div className="relative z-10 space-y-1.5 text-[#F7F3E9]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D9A441] bg-[#082D27]/80 px-2 py-0.5 rounded">
                    {dest.regionLabel}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#F7F3E9] group-hover:text-[#D9A441] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#F7F3E9]/80 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#D9A441]">
                    <span>Explore region</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOM-TRIP INVITATION BANNER */}
      <section className="py-20 bg-[#F7F3E9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#082D27] shadow-2xl p-8 sm:p-12 lg:p-16 text-[#F7F3E9]">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/Tawang/Tawang Monastry/Tawang Monastry1.jpg"
                alt="Tawang scenery"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#082D27] via-[#082D27]/85 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl space-y-5">
              <span className="badge-gold text-xs">Bespoke Travel Planning</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F3E9] leading-tight">
                {siteConfig.customInvitation.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#F7F3E9]/80 leading-relaxed">
                {siteConfig.customInvitation.subheading}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link href="/custom-trip" className="btn-gold !py-3 !px-7 text-sm sm:text-base">
                  <span>{siteConfig.customInvitation.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-cream !py-3 !px-6 text-sm"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. APPROVED VEHICLE HIRE RATE PREVIEW */}
      <section className="py-16 bg-[#FFFDF7] border-t border-[#DEDCCD]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-forest mb-2">Dedicated Commercial Fleet</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
                Private Vehicle Hire
              </h2>
              <p className="text-sm text-[#59665E] mt-1">
                Approved daily tariffs from Guwahati with verified mountain drivers.
              </p>
            </div>
            <Link
              href="/vehicle-hire"
              className="text-[#103F36] hover:text-[#D9A441] text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View full vehicle fleet & hire rules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <VehicleRateTable compact={true} />
        </div>
      </section>

      {/* 7. PEOPLE & TRUST SECTION */}
      <section className="py-20 bg-[#F7F3E9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge-forest mb-2">Local Operating Expertise</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
              Why Travellers Trust Divine View
            </h2>
            <p className="text-sm sm:text-base text-[#59665E] mt-2">
              Based directly in Guwahati, we run our own vehicles, coordinate all checkpoints, and support your journey every kilometre of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.trustPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF7] rounded-2xl p-6 border border-[#DEDCCD] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-[#E9F0EA] flex items-center justify-center text-[#103F36] mb-4 font-bold">
                  0{idx + 1}
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

          {/* Genuine Reviews callout */}
          <div className="mt-12 bg-[#FFFDF7] rounded-2xl border border-[#DEDCCD] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#103F36]">
                Planning a trip with family or friends?
              </h4>
              <p className="text-sm text-[#59665E]">
                Talk directly with our local route coordinators in Guwahati for honest timing advice and customized quotes.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href={`tel:${siteConfig.phoneRaw}`} className="btn-forest !py-2.5 !px-5 text-sm">
                <PhoneCall className="w-4 h-4" />
                <span>Call {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRAVEL GUIDES */}
      <section className="py-20 bg-[#FFFDF7] border-t border-[#DEDCCD]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="badge-forest mb-2">Practical Advice</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103F36]">
                Travel Guides & Tips
              </h2>
              <p className="text-sm text-[#59665E] mt-1">
                Factual, firsthand guidance on weather, road conditions, and permits.
              </p>
            </div>
            <Link
              href="/travel-guides"
              className="btn-outline-forest self-start sm:self-auto !py-2.5 !px-5 !text-xs sm:!text-sm inline-flex items-center gap-2"
            >
              <span>All Travel Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelGuidesData.map((guide) => (
              <Link
                key={guide.id}
                href={`/travel-guides/${guide.slug}`}
                className="bg-[#F7F3E9] rounded-2xl overflow-hidden border border-[#DEDCCD] group hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#082D27]">
                  <img
                    src={guide.heroImage}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="badge-gold text-[10px]">
                      {guide.readTime}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#59665E]">
                      Updated {guide.updatedDate}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#103F36] mt-1 group-hover:text-[#D9A441] transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#59665E] mt-2 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#DEDCCD] flex items-center gap-1 text-xs font-semibold text-[#103F36]">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
