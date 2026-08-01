"use client";

import PackageDetailView from '@/components/PackageDetailView';
import { useRouter } from 'next/navigation';
import staticConfig from '@/data/data.json';

export default function ClientPackageDetailWrapper({ packageId }) {
  const router = useRouter();
  const pkg = staticConfig.packages.find(p => p.id === packageId);

  return (
    <PackageDetailView 
      packageData={pkg} 
      onBack={() => router.push('/explore')} 
      onBook={() => router.push(`/build?packageId=${packageId}`)} 
    />
  );
}
