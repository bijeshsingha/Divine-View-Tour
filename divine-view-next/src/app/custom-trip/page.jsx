import { Suspense } from "react";
import CustomTripPlanner from "@/components/CustomTripPlanner";

export const metadata = {
  title: "Create My Trip — Bespoke Northeast India Custom Itinerary Planner",
  description:
    "Design a custom private journey through Assam, Meghalaya, Arunachal Pradesh, and Dzukou Valley. Choose your travel pace, stay category, and preferred vehicle with our local Guwahati team.",
};

export default function CustomTripPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-forest mb-2">Tailored Discovery</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Plan a Journey That’s Uniquely Yours
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3">
            Tell us where you want to go, how you like to travel, and what matters most. We craft a transparent itinerary and quote in 4 simple steps.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-20 text-[#59665E]">
              Loading custom trip planner...
            </div>
          }
        >
          <CustomTripPlanner />
        </Suspense>
      </div>
    </main>
  );
}
