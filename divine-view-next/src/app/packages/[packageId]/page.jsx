import { notFound } from "next/navigation";
import packagesData from "@/data/packagesData.json";
import PackageDetailClient from "@/components/PackageDetailClient";

export function generateStaticParams() {
  return packagesData.map((pkg) => ({
    packageId: pkg.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { packageId } = await params;
  const pkg = packagesData.find(
    (p) => p.slug === packageId || p.id === packageId
  );

  if (!pkg) {
    return { title: "Package Not Found" };
  }

  return {
    title: `${pkg.title} (${pkg.durationDays} Days / ${pkg.durationNights} Nights)`,
    description: pkg.summary,
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      images: [
        {
          url: pkg.heroImage,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  };
}

export default async function PackageDetailPage({ params }) {
  const { packageId } = await params;
  const pkg = packagesData.find(
    (p) => p.slug === packageId || p.id === packageId
  );

  if (!pkg) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    touristType: ["Nature explorer", "Cultural traveller", "Scenic holiday"],
    offers: {
      "@type": "Offer",
      price: pkg.priceAmount || "0",
      priceCurrency: pkg.priceCurrency,
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "TravelAgency",
      name: "Divine View Tours",
      url: "https://www.divineviewtours.com",
    },
    itinerary: pkg.itinerary.map((day) => ({
      "@type": "Day",
      name: `Day ${day.day}: ${day.title}`,
      description: day.description,
    })),
  };

  return (
    <main className="min-h-screen bg-[#F7F3E9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PackageDetailClient pkg={pkg} />
    </main>
  );
}
