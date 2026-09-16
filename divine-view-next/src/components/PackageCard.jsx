import Link from "next/link";
import { ArrowRight, Users, Calendar } from "lucide-react";

export default function PackageCard({ pkg, travellers, month }) {
  // Extract clean short title matching website-b-scenic (e.g. "Meghalaya Escape")
  const shortTitle = pkg.title.split(":")[0];
  const durationText = pkg.durationDays ? `${pkg.durationDays} days` : "Custom duration";

  // Build link with search params if provided
  const queryParams = new URLSearchParams();
  if (travellers && travellers !== "2") queryParams.append("travellers", travellers);
  if (month && month !== "flexible") queryParams.append("month", month);
  const detailUrl = `/packages/${pkg.slug}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  return (
    <div className="bg-[#FFFDF7] rounded-2xl overflow-hidden border border-[#DEDCCD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* 1. Destination Image with integrated Title & Duration overlay */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#082D27]">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 60% to-transparent" />

        {/* Title and Duration on Image matching website-b-scenic.png */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
          <h3 className="font-serif text-2xl font-bold text-white leading-snug drop-shadow">
            {shortTitle}
          </h3>
          <p className="text-sm font-medium text-[#F4E5B9] drop-shadow">
            {durationText}
          </p>
        </div>
      </div>

      {/* 2. Card Body: Editorial description & Request Price CTA */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
        <p className="text-sm text-[#59665E] leading-relaxed line-clamp-2">
          {pkg.summary}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#DEDCCD]">
          {pkg.priceAmount ? (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#59665E] block">
                From
              </span>
              <span className="font-serif text-lg font-bold text-[#103F36]">
                ₹{pkg.priceAmount.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-[#59665E] block">
                / person
              </span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-[#59665E]">
              Custom Itinerary
            </span>
          )}

          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1.5 border border-[#103F36]/30 hover:border-[#D9A441] hover:bg-[#D9A441] text-[#103F36] hover:text-[#172C26] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all"
          >
            <span>Request price</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
