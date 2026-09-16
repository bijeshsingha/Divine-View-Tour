import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Compass, Shield, ArrowRight } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export default function Footer() {
  return (
    <footer className="bg-[#103F36] text-[#F7F3E9] pt-16 pb-12 border-t border-[#082D27]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#082D27] border border-[#D9A441]/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#D9A441]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-[#F7F3E9]">
                Divine View Tours
              </span>
            </Link>
            <p className="text-sm text-[#F7F3E9]/80 leading-relaxed max-w-sm">
              Authentic journeys across Assam, Meghalaya, Arunachal Pradesh, and Dzukou Valley. Handcrafted private itineraries, verified mountain drivers, and transparent pricing from Guwahati.
            </p>
            <div className="pt-2 flex flex-col gap-2.5 text-xs text-[#F7F3E9]/85">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>Primary Departure Hub: {siteConfig.departureBase}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9A441] shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-[#D9A441] transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#D9A441] shrink-0" />
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D9A441] transition-colors"
                >
                  WhatsApp: +91 60265 04087
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#F7F3E9] mb-4 pb-1 border-b border-[#082D27]/60">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3E9]/80">
              <li>
                <Link href="/destinations/meghalaya" className="hover:text-[#D9A441] transition-colors">
                  Meghalaya
                </Link>
              </li>
              <li>
                <Link href="/destinations/arunachal-pradesh" className="hover:text-[#D9A441] transition-colors">
                  Arunachal Pradesh
                </Link>
              </li>
              <li>
                <Link href="/destinations/assam" className="hover:text-[#D9A441] transition-colors">
                  Assam & Kaziranga
                </Link>
              </li>
              <li>
                <Link href="/destinations/dzukou-valley" className="hover:text-[#D9A441] transition-colors">
                  Dzukou Valley Trek
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-[#D9A441] hover:underline inline-flex items-center gap-1 text-xs font-semibold pt-1">
                  All Destinations <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tour Packages */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#F7F3E9] mb-4 pb-1 border-b border-[#082D27]/60">
              Featured Tours
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3E9]/80">
              <li>
                <Link href="/packages/meghalaya-5-day-tour-from-guwahati" className="hover:text-[#D9A441] transition-colors">
                  Meghalaya Escape (5D/4N)
                </Link>
              </li>
              <li>
                <Link href="/packages/tawang-7-day-tour-from-guwahati" className="hover:text-[#D9A441] transition-colors">
                  Tawang Discovery (7D/6N)
                </Link>
              </li>
              <li>
                <Link href="/packages/kaziranga-wildlife-tour-from-guwahati" className="hover:text-[#D9A441] transition-colors">
                  Assam Wildlife (4D/3N)
                </Link>
              </li>
              <li>
                <Link href="/packages/dzukou-valley-trek-nagaland" className="hover:text-[#D9A441] transition-colors">
                  Dzukou Valley Trek (5D/4N)
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-[#D9A441] hover:underline inline-flex items-center gap-1 text-xs font-semibold pt-1">
                  Browse All Packages <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services & Company */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#F7F3E9] mb-4 pb-1 border-b border-[#082D27]/60">
              Services & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F3E9]/80">
              <li>
                <Link href="/custom-trip" className="hover:text-[#D9A441] transition-colors">
                  Custom Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/vehicle-hire" className="hover:text-[#D9A441] transition-colors">
                  Private Vehicle Hire Rates
                </Link>
              </li>
              <li>
                <Link href="/travel-guides" className="hover:text-[#D9A441] transition-colors">
                  Travel Guides & Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D9A441] transition-colors">
                  About Divine View
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D9A441] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/booking-terms" className="hover:text-[#D9A441] transition-colors">
                  Booking Terms
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#D9A441] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#D9A441] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="pt-8 border-t border-[#082D27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3E9]/60">
          <p>© {new Date().getFullYear()} Divine View Tours. All rights reserved. Registered travel DMC Guwahati, Assam.</p>
          <div className="flex items-center gap-6">
            <span>Website: {siteConfig.domain}</span>
            <Link href="/admin/pricing" className="text-[#D9A441]/80 hover:text-[#D9A441] transition-colors underline">
              Admin Pricing Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
