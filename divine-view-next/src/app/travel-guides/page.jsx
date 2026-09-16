import Link from "next/link";
import { ArrowRight, Clock, Calendar, User, BookOpen } from "lucide-react";
import travelGuidesData from "@/data/travelGuidesData.json";

export const metadata = {
  title: "Northeast India Travel Guides — Seasonal Planning, Permits & Routes",
  description:
    "Firsthand travel advice from local Guwahati specialists. Learn about Meghalaya monsoon timing, Sela Pass road conditions, and Dzukou Valley trekking tips.",
};

export default function TravelGuidesIndexPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-12">
          <span className="badge-forest mb-2">Practical Local Advice</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Northeast Travel Guides & Field Notes
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3 leading-relaxed">
            Honest, verified advice written from real operating experience on the roads of Assam, Meghalaya, Arunachal Pradesh, and Nagaland.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {travelGuidesData.map((guide) => (
            <article
              key={guide.id}
              className="bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#DEDCCD] shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#082D27]">
                <img
                  src={guide.heroImage}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge-gold text-xs">{guide.readTime}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#59665E]">
                    <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>Updated {guide.updatedDate}</span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-[#103F36] group-hover:text-[#D9A441] transition-colors leading-snug">
                    {guide.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DEDCCD] flex items-center justify-between">
                  <span className="text-xs text-[#59665E] font-medium truncate max-w-[150px]">
                    By {guide.author}
                  </span>
                  <Link
                    href={`/travel-guides/${guide.slug}`}
                    className="text-xs font-bold text-[#103F36] group-hover:text-[#D9A441] flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
