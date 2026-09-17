import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import destinationsData from "@/data/destinationsData.json";
import packagesData from "@/data/packagesData.json";
import PackageCard from "@/components/PackageCard";

export function generateStaticParams() {
  return destinationsData.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Not Found" };

  const url = `https://www.divineviewtours.com/destinations/${dest.slug}`;

  return {
    title: `${dest.name} Tour Packages & Travel Guide | Divine View Tours`,
    description: `${dest.summary} Find routes from Guwahati, permits, best travel seasons, and private tours.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${dest.name} Tour Packages & Travel Guide`,
      description: dest.summary,
      url,
      images: [
        {
          url: dest.heroImage,
          width: 1200,
          height: 630,
          alt: `${dest.name} landscape with Divine View Tours`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dest.name} Tours from Guwahati`,
      description: dest.summary,
      images: [dest.heroImage],
    },
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);
  if (!dest) notFound();

  // Find relevant packages
  const relevantPackages = packagesData.filter(
    (pkg) => pkg.destination === dest.slug || pkg.destination === "all"
  );

  const destUrl = `https://www.divineviewtours.com/destinations/${dest.slug}`;

  const destinationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": `${destUrl}#destination`,
        name: dest.name,
        description: dest.summary,
        image: `https://www.divineviewtours.com${dest.heroImage}`,
        touristType: ["Nature enthusiasts", "Adventure seekers", "Cultural travelers"],
        hasMap: `https://maps.google.com/?q=${encodeURIComponent(dest.name)}`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${destUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.divineviewtours.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Destinations",
            item: "https://www.divineviewtours.com/destinations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: dest.name,
            item: destUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
      />
      <main className="min-h-screen bg-[#F7F3E9] text-[#172C26]">
      {/* 1. SCENIC HERO */}
      <section className="relative min-h-[520px] lg:min-h-[620px] flex items-center pt-28 pb-16 bg-[#082D27] overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 scale-100 hover:scale-105"
        />
        {/* Subtle top & bottom vignettes that protect text readability without crushing the photograph */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-32 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl bg-black/50 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl text-[#F7F3E9] space-y-4 shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#F7F3E9] text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{dest.regionLabel}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F3E9] leading-tight drop-shadow-sm">
              {dest.name}
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3E9]/90 font-normal leading-relaxed">
              {dest.tagline}
            </p>

            {dest.heroCaption && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/20 text-xs text-[#F7F3E9]/90 backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                  {dest.heroCaption}
                </span>
              </div>
            )}

            {dest.slug === "dzukou-valley" && (
              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/dzukoufieldnotes"
                  className="btn-gold !py-2.5 !px-5 text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg font-semibold"
                >
                  <span>Open Dzukou Field Notes & Trail Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & PRACTICAL SPECS */}
      <section className="py-14 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="badge-forest mb-2">Regional Overview</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                About {dest.name}
              </h2>
              <p className="text-base text-[#59665E] mt-3 leading-relaxed">
                {dest.summary}
              </p>
            </div>

            {/* Dzukou Field Notes Dedicated Feature Banner */}
            {dest.slug === "dzukou-valley" && (
              <div className="relative overflow-hidden rounded-3xl bg-[#0D241C] text-[#F7F3E9] border border-[#173B2E] p-6 sm:p-8 shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99A4E]/20 border border-[#D99A4E]/40 text-[#D99A4E] text-xs font-mono font-semibold uppercase tracking-wider">
                      Official Trail Companion
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Dzukou Field Notes & Trek Planner
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F7F3E9]/80 leading-relaxed">
                      Detailed trail checkpoints, elevation profiles (Viswema vs Jakhama routes), seasonal breakdown, gear packing checklist, and SAYO registration rules. Compare 3-day to 5-day itineraries with the built-in trip budget calculator.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Link
                      href="/dzukoufieldnotes"
                      className="btn-gold !py-3 !px-6 text-xs sm:text-sm inline-flex items-center gap-2 font-semibold shadow-md whitespace-nowrap"
                    >
                      <span>Launch Field Notes</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Highlights Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#103F36]">
                Must-Visit Places & Cultural Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {dest.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className={`bg-[#FFFDF7] rounded-2xl border border-[#DEDCCD] shadow-sm overflow-hidden flex flex-col ${
                      h.image ? "sm:col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    {h.image && (
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#082D27]">
                        <img
                          src={h.image}
                          alt={h.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        {h.caption && (
                          <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] text-[#F7F3E9] font-medium truncate">
                            {h.caption}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-7 h-7 rounded-full bg-[#E9F0EA] text-[#103F36] flex items-center justify-center text-xs font-bold mb-2">
                          0{idx + 1}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#103F36]">
                          {h.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#59665E] mt-1.5 leading-relaxed">
                          {h.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest Seasonal Breakdown */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#103F36]">
                <Calendar className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-serif text-xl font-bold">
                  When to Visit & Seasonal Trade-Offs
                </h3>
              </div>
              <p className="text-sm font-semibold text-[#103F36]">
                Prime Season: {dest.bestSeason.months}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#59665E]">
                <div className="bg-[#F7F3E9] p-4 rounded-xl border border-[#DEDCCD]">
                  <strong className="font-semibold text-[#103F36] block mb-1">
                    Water Clarity & Outdoor Activities:
                  </strong>
                  {dest.bestSeason.waterClarity}
                </div>
                <div className="bg-[#F7F3E9] p-4 rounded-xl border border-[#DEDCCD]">
                  <strong className="font-semibold text-[#103F36] block mb-1">
                    Waterfalls & Lushness:
                  </strong>
                  {dest.bestSeason.waterfalls}
                </div>
              </div>
              <p className="text-xs text-[#59665E] italic pt-1 border-t border-[#DEDCCD]">
                Note on tradeoffs: {dest.bestSeason.tradeoffs}
              </p>
            </div>
          </div>

          {/* Sidebar / Practical Info (Right 1 col) */}
          <div className="space-y-6">
            {/* Route from Guwahati */}
            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#103F36]">
                <Car className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-serif text-lg font-bold">
                  Route from Guwahati Base
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-[#59665E]">
                <div>
                  <span className="font-semibold text-[#103F36] block">Distance:</span>
                  {dest.routeFromGuwahati.distance}
                </div>
                <div>
                  <span className="font-semibold text-[#103F36] block">Drive Time:</span>
                  {dest.routeFromGuwahati.driveTime}
                </div>
                <div>
                  <span className="font-semibold text-[#103F36] block">Departure Point:</span>
                  {dest.routeFromGuwahati.pickupPoint}
                </div>
              </div>
            </div>

            {/* Permits & Paperwork */}
            <div className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#103F36]">
                <FileCheck className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-serif text-lg font-bold">
                  Permits & Entry Rules
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                {dest.permitNotes}
              </p>
            </div>

            {/* Dzukou Field Notes Sidebar Card */}
            {dest.slug === "dzukou-valley" && (
              <div className="bg-[#0D241C] text-[#F7F3E9] p-6 rounded-2xl border border-[#173B2E] space-y-3 shadow-md">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D99A4E] font-bold block">
                  Comprehensive Guide
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  Dzukou Field Notes
                </h4>
                <p className="text-xs text-[#F7F3E9]/80 leading-relaxed">
                  Explore trail mileposts, water points, packing checklist, and the trip budget calculator.
                </p>
                <Link
                  href="/dzukoufieldnotes"
                  className="btn-gold !py-2.5 !px-4 text-xs w-full text-center flex items-center justify-center gap-1.5 font-semibold block"
                >
                  <span>Read Field Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Custom Trip Callout */}
            <div className="bg-[#103F36] text-[#F7F3E9] p-6 rounded-2xl space-y-3 shadow-md">
              <h4 className="font-serif text-xl font-bold">
                Want a Tailored {dest.name} Itinerary?
              </h4>
              <p className="text-xs text-[#F7F3E9]/85 leading-relaxed">
                Tell us your preferred pace, travel dates, and group size. We design a private route with dedicated vehicle.
              </p>
              <Link
                href={`/custom-trip?dest=${dest.slug}`}
                className="btn-gold !py-2.5 !px-4 text-xs w-full text-center block"
              >
                Plan {dest.name} Custom Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUITABLE PACKAGES */}
      <section className="py-16 bg-[#FFFDF7] border-y border-[#DEDCCD]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="badge-forest mb-2">Suggested Holidays</span>
            <h2 className="font-serif text-3xl font-bold text-[#103F36]">
              {dest.name} Tour Packages
            </h2>
            <p className="text-sm text-[#59665E] mt-1">
              Confirmed itineraries starting and ending at Guwahati with private mountain transport.
            </p>
          </div>

          {relevantPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relevantPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="bg-[#F7F3E9] p-8 rounded-2xl text-center border border-[#DEDCCD]">
              <p className="text-sm text-[#59665E]">
                Custom itineraries are readily tailored for {dest.name}.
              </p>
              <Link href="/custom-trip" className="btn-gold mt-4 text-xs">
                Build a Custom Trip
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. DESTINATION FAQS */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <span className="badge-forest mb-2">Helpful Knowledge</span>
            <h2 className="font-serif text-3xl font-bold text-[#103F36]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            {dest.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF7] rounded-2xl p-5 sm:p-6 border border-[#DEDCCD] shadow-sm"
              >
                <h4 className="font-serif text-lg font-bold text-[#103F36] flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#59665E] mt-2 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
