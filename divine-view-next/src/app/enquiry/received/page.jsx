import { Suspense } from "react";
import EnquiryReceiptClient from "@/components/EnquiryReceiptClient";

export const metadata = {
  title: "Enquiry Received — Divine View Tours",
  description: "Your trip enquiry reference code and confirmation details.",
};

export default function EnquiryReceivedPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] pt-28 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="text-center py-20 text-[#59665E]">
              Loading confirmation receipt...
            </div>
          }
        >
          <EnquiryReceiptClient />
        </Suspense>
      </div>
    </main>
  );
}
