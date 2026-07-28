import React from 'react';
import { Routes, Route, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import config from '../data.json';

import ExploreMain from './ExploreViews/ExploreMain';
import PlaceDetail from './ExploreViews/PlaceDetail';
import PackageInfo from './ExploreViews/PackageInfo';
import CustomInfo from './ExploreViews/CustomInfo';
import PackageDetailView from './PackageDetailView';

// Sample Data with Dummy Images, Map/Insta Links, and Package Mapping
import { EXPLORE_DATA } from '../exploreData';

function PlaceDetailWrapper({ onBack, onSelectPackageInfo }) {
  const { placeId } = useParams();
  const place = EXPLORE_DATA.find(p => p.id === placeId);
  if (!place) return null;
  return <PlaceDetail place={place} onBack={onBack} onSelectPackageInfo={onSelectPackageInfo} />;
}

export default function ExploreHub() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const packageId = searchParams.get('packageId');

  const handleSelectPackageInfo = () => navigate('/explore/packages');
  const handleSelectCustomInfo = () => navigate('/explore/custom');
  const handleBackToMain = () => navigate('/explore');
  const handleBackHome = () => navigate('/');
  const handleBuildCustom = () => navigate('/build');
  const handleSelectPlace = (place) => navigate(`/explore/place/${place.id}`);

  const handleSelectPackage = (pkg) => {
    setSearchParams(prev => { prev.set('packageId', pkg.id); return prev; });
  };

  const pkgToView = packageId ? config.packages.find(p => p.id === packageId) : null;

  return (
    <div className="min-h-screen bg-background text-foreground relative w-full overflow-hidden flex flex-col">
      <Routes>
        <Route path="/" element={
          <ExploreMain 
            exploreData={EXPLORE_DATA} 
            onSelectPlace={handleSelectPlace}
            onSelectPackageInfo={handleSelectPackageInfo}
            onSelectCustomInfo={handleSelectCustomInfo}
            onBackHome={handleBackHome}
            onBuildCustom={handleBuildCustom}
          />
        } />
        <Route path="packages" element={
          <PackageInfo 
            onBack={handleBackToMain} 
            onBuildPath={() => navigate('/build?path=readymade')} 
            onSelectPackage={handleSelectPackage}
          />
        } />
        <Route path="custom" element={
          <CustomInfo 
            onBack={handleBackToMain} 
            onBuildPath={() => navigate('/build')} 
          />
        } />
        <Route path="place/:placeId" element={
          <PlaceDetailWrapper 
            onBack={handleBackToMain} 
            onSelectPackageInfo={handleSelectPackageInfo}
          />
        } />
      </Routes>
      
      {pkgToView && (
        <div className="fixed inset-0 z-50 bg-white">
          <PackageDetailView 
            packageData={pkgToView}
            onBack={() => navigate(-1)}
            onBook={() => navigate(`/build?package=${pkgToView.id}`)}
          />
        </div>
      )}
    </div>
  );
}
