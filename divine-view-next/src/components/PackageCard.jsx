"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PackageCard({ pkg, travellers, month }) {
  const [imgSrc, setImgSrc] = useState(pkg.heroImage || "/images/dawki-hero.jpg");
  const shortTitle = pkg.title.split(":")[0];
  const durationText = pkg.durationDays
    ? `${pkg.durationDays} Days · ${pkg.durationNights || pkg.durationDays - 1} Nights`
    : "Custom duration";

  // Build link with search params if provided
  const queryParams = new URLSearchParams();
  if (travellers && travellers !== "2") queryParams.append("travellers", travellers);
  if (month && month !== "flexible") queryParams.append("month", month);
  const detailUrl = `/packages/${pkg.slug}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  return (
    <article className="bg-[#FFFDF7] rounded-[10px] overflow-hidden border border-[#DDD7CA] hover:border-[#173D35]/40 transition-colors flex flex-col group h-full">
      {/* 1. Photograph: 3:2 ratio, natural bright lighting, hover scale clipped, intentional error fallback */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#173D35]/5">
        <img
          src={imgSrc}
          alt={pkg.title}
          onError={() => setImgSrc("/images/dawki-hero.jpg")}
          className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-[1.025]"
          loading="lazy"
        />
      </div>

      {/* 2. Card Body: Title & duration beneath photo -> description -> price & link */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Small sans-serif duration text */}
          <p className="text-[11px] font-semibold tracking-wider uppercase text-[#C69A45] mb-1.5">
            {durationText}
          </p>

          {/* Package Title: Serif 24–28px beneath the photo */}
          <h3 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#173D35] leading-snug group-hover:text-[#0E2923] transition-colors">
            <Link href={detailUrl} className="focus-ring-forest rounded-sm">
              {shortTitle}
            </Link>
          </h3>

          {/* Short readable description without abrupt chopping */}
          <p className="text-sm text-[#202A25]/85 leading-relaxed mt-2.5">
            {pkg.summary}
          </p>
        </div>

        {/* 3. Price, basis & aligned "View journey" link */}
        <div className="pt-5 mt-6 border-t border-[#DDD7CA] flex items-end justify-between gap-4">
          <div>
            {pkg.priceAmount ? (
              <>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#59665E] block leading-none mb-1">
                  Starting from
                </span>
                <span className="font-serif text-xl sm:text-[22px] font-normal text-[#173D35] block leading-none">
                  ₹{pkg.priceAmount.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-[#59665E] block mt-1 leading-tight">
                  {pkg.priceBasis ? pkg.priceBasis.split(",")[0] : "per person"}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-[#173D35]">
                Custom Itinerary
              </span>
            )}
          </div>

          <Link
            href={detailUrl}
            className="group/link inline-flex items-center text-sm font-medium text-[#173D35] hover:text-[#C69A45] transition-colors pb-0.5 shrink-0 focus-ring-forest rounded-sm"
          >
            <span>View journey</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
