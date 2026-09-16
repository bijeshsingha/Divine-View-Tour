import { Suspense } from "react";
import VehicleHireClient from "@/components/VehicleHireClient";

export const metadata = {
  title: "Guwahati Private Vehicle Hire & Daily Tariffs — Sedan, Ertiga, Innova Crysta | Divine View Tours",
  description:
    "Official fixed car rental tariffs from Guwahati for airport transfers, Shillong same-day returns, Meghalaya, Kaziranga, and Tawang multi-day circuits. 100% commercial tourist fleet with verified mountain drivers.",
  keywords: [
    "Guwahati private vehicle hire",
    "car rental Guwahati to Shillong",
    "Innova Crysta hire Guwahati",
    "Ertiga rental Guwahati",
    "Swift Dzire Guwahati taxi",
    "Guwahati airport taxi fare",
    "TTAA taxi rates Guwahati",
    "Tempo Traveller rental Guwahati",
  ],
  alternates: {
    canonical: "https://www.divineviewtours.com/vehicle-hire",
  },
  openGraph: {
    title: "Guwahati Private Vehicle Hire & Daily Tariffs — Divine View Tours",
    description:
      "Transparent vehicle hire tariffs from Guwahati. Commercial yellow plates, verified mountain drivers, and fuel-inclusive pricing for Meghalaya, Kaziranga, and Arunachal.",
    url: "https://www.divineviewtours.com/vehicle-hire",
    siteName: "Divine View Tours",
    images: [
      {
        url: "/images/homescreen.jpg",
        width: 1200,
        height: 630,
        alt: "Private tourist vehicles in Assam and Meghalaya with Divine View Tours",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guwahati Private Vehicle Hire & Daily Tariffs",
    description:
      "Official rates for airport transfers, Shillong returns, and multi-day tours across Assam, Meghalaya, and Arunachal.",
    images: ["/images/homescreen.jpg"],
  },
};

export default function VehicleHirePage() {
  const vehicleSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoRental", "TaxiService"],
        "@id": "https://www.divineviewtours.com/vehicle-hire#service",
        name: "Divine View Tours Private Vehicle Hire Guwahati",
        serviceType: "Tourist Vehicle Rental with Mountain Driver",
        provider: {
          "@type": "TravelAgency",
          name: "Divine View Tours",
          telephone: "+91-9282-041211",
          url: "https://www.divineviewtours.com",
        },
        areaServed: [
          { "@type": "City", name: "Guwahati" },
          { "@type": "State", name: "Assam" },
          { "@type": "State", name: "Meghalaya" },
          { "@type": "State", name: "Arunachal Pradesh" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Divine View Private Vehicle Rates",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Vehicle",
                name: "Maruti Swift Dzire (Compact Sedan)",
                vehicleConfiguration: "Sedan (1–4 Passengers)",
                seatingCapacity: 4,
              },
              priceSpecification: [
                {
                  "@type": "UnitPriceSpecification",
                  price: 1000,
                  priceCurrency: "INR",
                  name: "Airport Transfer (One-Way)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 3000,
                  priceCurrency: "INR",
                  name: "Guwahati Local Sightseeing (8 Hours / 80 KM)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 5000,
                  priceCurrency: "INR",
                  name: "Same-Day Shillong Return",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 4000,
                  priceCurrency: "INR",
                  unitCode: "DAY",
                  name: "Meghalaya Multi-Day Circuit (Per Day)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 5000,
                  priceCurrency: "INR",
                  unitCode: "DAY",
                  name: "Arunachal Multi-Day Circuit (Per Day)",
                },
              ],
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Vehicle",
                name: "Maruti Suzuki Ertiga (Mid-Size MUV)",
                vehicleConfiguration: "MUV (4–6 Passengers)",
                seatingCapacity: 6,
              },
              priceSpecification: [
                {
                  "@type": "UnitPriceSpecification",
                  price: 1500,
                  priceCurrency: "INR",
                  name: "Airport Transfer (One-Way)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 4000,
                  priceCurrency: "INR",
                  name: "Guwahati Local Sightseeing (8 Hours / 80 KM)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 6000,
                  priceCurrency: "INR",
                  name: "Same-Day Shillong Return",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 5000,
                  priceCurrency: "INR",
                  unitCode: "DAY",
                  name: "Meghalaya Multi-Day Circuit (Per Day)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 6000,
                  priceCurrency: "INR",
                  unitCode: "DAY",
                  name: "Arunachal Multi-Day Circuit (Per Day)",
                },
              ],
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Vehicle",
                name: "Toyota Innova Crysta (Mountain SUV)",
                vehicleConfiguration: "SUV (5–7 Passengers)",
                seatingCapacity: 7,
              },
              priceSpecification: [
                {
                  "@type": "UnitPriceSpecification",
                  price: 2000,
                  priceCurrency: "INR",
                  name: "Airport Transfer (One-Way)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 4500,
                  priceCurrency: "INR",
                  name: "Guwahati Local Sightseeing (8 Hours / 80 KM)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 7500,
                  priceCurrency: "INR",
                  name: "Same-Day Shillong Return",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 6000,
                  priceCurrency: "INR",
                  unitCode: "DAY",
                  name: "Meghalaya Multi-Day Circuit (Per Day)",
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: 7000,
                  priceCurrency: "INR",
                  unitCode: "DAY",
                  name: "Arunachal Multi-Day Circuit (Per Day)",
                },
              ],
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Vehicle",
                name: "Tempo Traveller & Force Urbania (Group Fleet)",
                vehicleConfiguration: "13 to 26-Seater Mini Coach / Van",
                seatingCapacity: 26,
              },
              description: "Official Tourist Transporter Association of Assam (TTAA) fleet tariffs with transparent agency dispatch coordination markup.",
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.divineviewtours.com/vehicle-hire#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included in the vehicle hire tariffs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Published rates include a private commercial tourist vehicle with verified mountain driver, fuel for the agreed itinerary, highway toll clearances, and driver allowances. Personal stays, meals, entry fees, and wildlife safaris are quoted separately.",
            },
          },
          {
            "@type": "Question",
            name: "Do you operate vehicles with commercial yellow registration plates?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All Divine View vehicles operate strictly with commercial yellow registration plates, valid road permits, fitness certificates, and passenger insurance. White private plates are legally prohibited for tourist operations across Northeast India.",
            },
          },
          {
            "@type": "Question",
            name: "How does the air conditioning (AC) policy work in the hills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Air conditioning is provided on flat plains and national highways. In compliance with transporter union standards across Meghalaya and Arunachal, AC is switched off on steep uphill gradients to preserve engine power and cooling, and on stationary vehicles.",
            },
          },
          {
            "@type": "Question",
            name: "What are the driver duty hours?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Driver duty follows the pre-agreed itinerary up to 8:00 PM. Night driving across hill sectors is restricted for passenger safety. Late-night excursions exceeding the itinerary are charged at union overtime rates of ₹500/hour.",
            },
          },
          {
            "@type": "Question",
            name: "What are the payment and cancellation terms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Booking confirmation requires a 30% advance deposit. The remaining 70% balance is payable upon vehicle arrival and pickup in Guwahati.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.divineviewtours.com/vehicle-hire#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.divineviewtours.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Vehicle Hire Rates",
            item: "https://www.divineviewtours.com/vehicle-hire",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchemas) }}
      />
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

          <Suspense fallback={<div className="text-center py-20 text-[#59665E]">Loading vehicle rental desk...</div>}>
            <VehicleHireClient />
          </Suspense>
        </div>
      </main>
    </>
  );
}
