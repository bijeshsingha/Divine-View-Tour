import { Suspense } from "react";
import CustomTripPlanner from "@/components/CustomTripPlanner";

export const metadata = {
  title: "Plan your Northeast journey | Divine View Tours",
  description:
    "Tell us where you’d like to go and how you like to travel. Build your enquiry in four short steps.",
  alternates: {
    canonical: "https://www.divineviewtours.com/custom-trip",
  },
};

export default function CustomTripPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] pt-[76px] sm:pt-[84px] pb-16 sm:pb-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Compact Introduction */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#173D35] leading-tight">
            Plan your Northeast journey
          </h1>
          <p className="text-sm sm:text-base text-[#202A25]/85 mt-2.5 leading-relaxed">
            Tell us where you’d like to go and how you like to travel. Build your enquiry in four short steps.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-16 text-[#59665E]">
              Loading trip planner...
            </div>
          }
        >
          <CustomTripPlanner />
        </Suspense>
      </div>
    </main>
  );
}
