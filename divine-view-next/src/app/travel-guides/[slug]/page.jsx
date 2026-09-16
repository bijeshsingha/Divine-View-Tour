import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import travelGuidesData from "@/data/travelGuidesData.json";
import packagesData from "@/data/packagesData.json";
import PackageCard from "@/components/PackageCard";

export function generateStaticParams() {
  return travelGuidesData.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = travelGuidesData.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };

  const url = `https://www.divineviewtours.com/travel-guides/${guide.slug}`;

  return {
    title: `${guide.title} | Travel Guide — Divine View Tours`,
    description: guide.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url,
      type: "article",
      publishedTime: guide.updatedDate,
      authors: [guide.author],
      siteName: "Divine View Tours",
      images: [
        {
          url: "/images/homescreen.jpg",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.summary,
      images: ["/images/homescreen.jpg"],
    },
  };
}

export default async function TravelGuideDetailPage({ params }) {
  const { slug } = await params;
  const guide = travelGuidesData.find((g) => g.slug === slug);
  if (!guide) notFound();

  const relatedPkg = packagesData.find((p) => p.slug === guide.relatedPackage);
  const guideUrl = `https://www.divineviewtours.com/travel-guides/${guide.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${guideUrl}#article`,
        headline: guide.title,
        description: guide.summary,
        author: {
          "@type": "Person",
          name: guide.author,
        },
        publisher: {
          "@type": "TravelAgency",
          name: "Divine View Tours",
          url: "https://www.divineviewtours.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.divineviewtours.com/logo.png",
          },
        },
        datePublished: "2026-06-01",
        dateModified: "2026-09-01",
        mainEntityOfPage: guideUrl,
        image: "https://www.divineviewtours.com/images/homescreen.jpg",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guideUrl}#breadcrumbs`,
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
            name: "Travel Guides",
            item: "https://www.divineviewtours.com/travel-guides",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: guideUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation back */}
          <Link
            href="/travel-guides"
            className="text-xs font-semibold text-[#59665E] hover:text-[#103F36] inline-flex items-center gap-1.5 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Travel Guides</span>
          </Link>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#59665E]">
              <span className="badge-gold text-xs">{guide.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                Updated {guide.updatedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#D9A441]" />
                {guide.author}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36] leading-tight">
              {guide.title}
            </h1>
          </div>

          {/* Article Body */}
          <div className="prose prose-stone max-w-none space-y-6">
            <p className="text-base sm:text-lg text-[#172C26] font-medium leading-relaxed border-l-4 border-[#D9A441] pl-4 italic">
              {guide.summary}
            </p>

            <div className="space-y-10 pt-4 text-sm sm:text-base text-[#172C26] leading-relaxed">
              {guide.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
                    {sec.heading}
                  </h2>
                  <div className="text-[#59665E] whitespace-pre-line leading-relaxed">
                    {sec.content}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Related Package Recommendation */}
          {relatedPkg && (
            <div className="mt-14 space-y-4">
              <span className="badge-forest text-xs">Featured Travel Route</span>
              <h3 className="font-serif text-2xl font-bold text-[#103F36]">
                Suggested Itinerary for this Guide
              </h3>
              <div className="max-w-md">
                <PackageCard pkg={relatedPkg} />
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
