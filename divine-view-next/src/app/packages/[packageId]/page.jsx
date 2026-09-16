import { Suspense } from "react";
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

  const url = `https://www.divineviewtours.com/packages/${pkg.slug}`;

  return {
    title: `${pkg.title} (${pkg.durationDays} Days / ${pkg.durationNights} Nights) | Divine View Tours`,
    description: pkg.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      url,
      images: [
        {
          url: pkg.heroImage,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description: pkg.summary,
      images: [pkg.heroImage],
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

  const pkgUrl = `https://www.divineviewtours.com/packages/${pkg.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${pkgUrl}#trip`,
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pkgUrl}#breadcrumbs`,
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
            name: "Tour Packages",
            item: "https://www.divineviewtours.com/packages",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: pkg.title,
            item: pkgUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F3E9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#082D27]" />}>
        <PackageDetailClient pkg={pkg} />
      </Suspense>
    </main>
  );
}
