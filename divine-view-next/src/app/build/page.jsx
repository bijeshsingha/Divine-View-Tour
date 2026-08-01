import TripBuilder from '@/components/TripBuilder';

import { Suspense } from 'react';

export default function BuildPage() {
  return (
    <main className="h-screen flex flex-col bg-stone-50">
      <Suspense fallback={<div className="p-8 text-center">Loading builder...</div>}>
        <TripBuilder initialData={{}} />
      </Suspense>
    </main>
  );
}
