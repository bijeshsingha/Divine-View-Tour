import staticConfig from '@/data/data.json';
import PackageDetailView from '@/components/PackageDetailView';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  // Await params since it's a Promise in Next.js 15+ dynamic routes (though mostly synchronous in < 15, it's best practice)
  const { packageId } = await params; 
  const pkg = staticConfig.packages.find((p) => p.id === packageId);
  
  if (!pkg) {
    return { title: 'Package Not Found | Divine View Tours' };
  }

  return {
    title: `${pkg.title} | Divine View Tours`,
    description: pkg.desc,
  };
}

// Client wrapper to handle the interactions for this component
import ClientPackageDetailWrapper from './ClientPackageDetailWrapper';

export default async function PackagePage({ params }) {
  const { packageId } = await params;
  const pkg = staticConfig.packages.find((p) => p.id === packageId);

  if (!pkg) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.subtitle,
    touristType: [
       "Adventure traveler",
       "Cultural traveler" 
    ],
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Divine View Tours',
      url: 'https://divineviewtours.com'
    },
    subTrip: pkg.itinerary.map((day, index) => ({
      '@type': 'TouristTrip',
      name: `Day ${index + 1}: ${day.route}`,
      description: day.stops.join('. ')
    }))
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ClientPackageDetailWrapper packageId={packageId} />
    </main>
  );
}
