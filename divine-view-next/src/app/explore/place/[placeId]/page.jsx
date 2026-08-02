import PlaceDetail from '@/components/ExploreViews/PlaceDetail';
import { EXPLORE_DATA } from '@/data/exploreData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { placeId } = await params;
  const place = EXPLORE_DATA.find((p) => p.id === placeId);
  
  if (!place) {
    return { title: 'Destination Not Found' };
  }
  
  return {
    title: place.title,
    description: place.description?.substring(0, 160) + '...',
  };
}

export default async function PlacePage({ params }) {
  const { placeId } = await params;
  const place = EXPLORE_DATA.find((p) => p.id === placeId);
  
  if (!place) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <PlaceDetail place={place} />
    </main>
  );
}
