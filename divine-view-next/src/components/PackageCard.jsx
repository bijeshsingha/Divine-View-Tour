import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function PackageCard({ pkg }) {
  return (
    <div className="bg-[#FFFDF7] rounded-2xl overflow-hidden border border-[#DEDCCD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image and badges */}
      <div className="relative h-56 w-full overflow-hidden bg-[#082D27]">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#082D27]/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {pkg.badge && (
            <span className="badge-gold text-[11px] shadow-sm">
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Duration & Location overlay bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#F7F3E9]">
          <span className="flex items-center gap-1.5 font-medium bg-[#082D27]/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
            {pkg.durationDays} Days / {pkg.durationNights} Nights
          </span>
          <span className="flex items-center gap-1 font-medium bg-[#082D27]/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
            {pkg.destinationLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#103F36] group-hover:text-[#082D27] transition-colors line-clamp-2">
            {pkg.title}
          </h3>
          <p className="text-sm text-[#59665E] mt-2 line-clamp-2 leading-relaxed">
            {pkg.summary}
          </p>

          {/* Highlights tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.highlights.slice(0, 3).map((hl, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-[#F7F3E9] text-[#172C26] font-medium px-2 py-0.5 rounded border border-[#DEDCCD]/80 truncate max-w-[240px]"
              >
                • {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Actions */}
        <div className="mt-6 pt-4 border-t border-[#DEDCCD]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              {pkg.priceMode === "starting_from" && pkg.priceAmount ? (
                <div>
                  <span className="text-xs text-[#59665E] uppercase tracking-wider font-semibold block">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#103F36]">
                      ₹{pkg.priceAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-[#59665E]">/ person</span>
                  </div>
                </div>
              ) : pkg.priceMode === "fixed" && pkg.priceAmount ? (
                <div>
                  <span className="text-xs text-[#59665E] uppercase tracking-wider font-semibold block">
                    Package Price
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#103F36]">
                      ₹{pkg.priceAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-[#59665E]">/ person</span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="badge-forest text-xs">Custom Quote</span>
                  <span className="font-serif text-xl font-bold text-[#103F36] block mt-0.5">
                    Price on Request
                  </span>
                </div>
              )}
            </div>

            {pkg.priceBasis && (
              <span className="text-[11px] text-[#59665E] text-right max-w-[120px] line-clamp-2 leading-tight">
                {pkg.priceBasis}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/packages/${pkg.slug}`}
              className="btn-gold !py-2 !px-3 !text-xs !min-h-[40px] text-center"
            >
              <span>View itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/custom-trip?package=${pkg.slug}`}
              className="btn-outline-forest !py-2 !px-3 !text-xs !min-h-[40px] text-center"
            >
              Customise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
