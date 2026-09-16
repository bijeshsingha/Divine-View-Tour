import VehicleHireClient from "@/components/VehicleHireClient";

export const metadata = {
  title: "Private Vehicle Hire Rates from Guwahati — Sedan, Ertiga, Innova Crysta",
  description:
    "Transparent daily car rental tariffs for Meghalaya, Tawang, Kaziranga, and Arunachal Pradesh. Commercial tourist vehicles with verified local mountain drivers.",
};

export default function VehicleHirePage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mb-12">
          <span className="badge-forest mb-2">Dedicated Commercial Fleet</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Guwahati Private Vehicle Hire & Approved Daily Rates
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3 leading-relaxed">
            Need only a private car with a dedicated driver for your self-booked hotels? We provide licensed tourist commercial vehicles with fuel, road taxes, parking, and driver allowances included.
          </p>
        </div>

        <VehicleHireClient />
      </div>
    </main>
  );
}
