import ExploreMain from '@/components/ExploreViews/ExploreMain';
import { EXPLORE_DATA } from '@/data/exploreData';

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <ExploreMain exploreData={EXPLORE_DATA} />
    </main>
  );
}
