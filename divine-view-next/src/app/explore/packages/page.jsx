import PackageInfo from '@/components/ExploreViews/PackageInfo';
import { EXPLORE_DATA } from '@/data/exploreData';

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <PackageInfo exploreData={EXPLORE_DATA} />
    </main>
  );
}
