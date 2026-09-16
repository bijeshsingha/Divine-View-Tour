import { Suspense } from "react";
import packagesData from "@/data/packagesData.json";
import PackagesFilterClient from "@/components/PackagesFilterClient";

export const metadata = {
  title: "Tour Packages from Guwahati — Meghalaya, Tawang, Kaziranga & Dzukou",
  description:
    "Browse handcrafted tour packages departing from Guwahati. Transparent per-person pricing, dedicated vehicles, verified local mountain drivers, and complete day-by-day itineraries.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mb-10">
          <span className="badge-forest mb-2">Handcrafted Northeast Journeys</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#103F36]">
            Holiday Tour Packages
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3 leading-relaxed">
            All itineraries include private vehicle transfers from Guwahati, verified hotel accommodation, daily breakfast, and local checkpoint clearances.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-20 text-[#59665E] font-medium">
              Loading available journeys...
            </div>
          }
        >
          <PackagesFilterClient initialPackages={packagesData} />
        </Suspense>
      </div>
    </main>
  );
}
