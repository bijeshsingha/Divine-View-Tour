import Link from "next/link";
import {
  Globe,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import InternationalTravellersClient from "@/components/InternationalTravellersClient";
import siteConfig from "@/data/siteConfig.json";

export const metadata = {
  title: "International Travellers: Private Northeast India Holidays",
  description:
    "Private holidays across Assam, Meghalaya, and Kaziranga tailored for overseas visitors. Dedicated English-proficient drivers, verified boutique stays, clear INR billing, and official visa guidance.",
  alternates: {
    canonical: "https://www.divineviewtours.com/international-travellers",
  },
  openGraph: {
    title: "International Travellers: Private Northeast India Holidays | Divine View Tours",
    description:
      "Private overland holidays across Assam, Meghalaya, and Kaziranga tailored for overseas visitors. Certified safari naturalists, English-proficient chauffeurs, boutique rooms, and transparent payment methods.",
    url: "https://www.divineviewtours.com/international-travellers",
    siteName: "Divine View Tours",
    images: [
      {
        url: "https://www.divineviewtours.com/images/Kaziranga/photo-1589882485484-c073e3742e60.jpg",
        width: 1200,
        height: 630,
        alt: "One-horned rhino grazing in Kaziranga National Park",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function InternationalTravellersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Divine View Tours",
    "url": "https://www.divineviewtours.com/international-travellers",
    "description":
      "Private overland tours and wildlife safaris across Northeast India for international travellers, departing from Guwahati.",
    "telephone": siteConfig.phone,
    "email": siteConfig.bookingEmail,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Guwahati",
      "addressRegion": "Assam",
      "addressCountry": "IN",
    },
    "currenciesAccepted": "INR",
    "paymentAccepted": "Wise, SWIFT Bank Wire, International Credit Card",
    "areaServed": ["Assam", "Meghalaya", "Arunachal Pradesh"],
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] text-[#172C26]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-[#082D27] text-[#F7F3E9] pt-32 pb-20 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A441_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-xs text-[#F7F3E9]/70 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#D9A441] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#D9A441]">International Travellers</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#103F36] border border-[#D9A441]/40 text-[#D9A441] text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>International Guest Services: Northeast India</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F3E9] leading-[1.15]">
              Private journeys for overseas travellers. Zero guesswork.
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E9]/85 leading-relaxed">
              Arrive into Guwahati Airport (GAU). Explore the UNESCO wildlife of Kaziranga, misty Khasi cloud forests, and living root bridges in your private vehicle with verified English-proficient drivers, handpicked boutique lodgings, and licensed forest naturalists.
            </p>

            {/* Quick Hero Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F3E9]/90 bg-[#103F36]/60 px-3.5 py-2.5 rounded-xl border border-[#103F36]">
                <Plane className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>Guwahati (GAU) Airport Hub</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F3E9]/90 bg-[#103F36]/60 px-3.5 py-2.5 rounded-xl border border-[#103F36]">
                <CreditCard className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>Wise, SWIFT & Card Payments</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F3E9]/90 bg-[#103F36]/60 px-3.5 py-2.5 rounded-xl border border-[#103F36]">
                <ShieldCheck className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>Guwahati-Registered DMC</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#lead-tours"
                className="btn-gold min-h-[48px] px-6 py-3 rounded-full text-center font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>View Featured Journeys & Prices</span>
                <ArrowRight className="w-4 h-4 text-[#172C26]" />
              </a>
              <a
                href="#enquiry-form"
                className="btn-outline-cream min-h-[48px] px-6 py-3 rounded-full text-center font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>Request Custom Proposal</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Client Section (Lead Tours, Currency Converter, Standards, Visa & Enquiry Form) */}
      <InternationalTravellersClient />
    </main>
  );
}
