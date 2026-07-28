import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from '../data.json';

import ExploreMain from './ExploreViews/ExploreMain';
import PlaceDetail from './ExploreViews/PlaceDetail';
import PackageInfo from './ExploreViews/PackageInfo';
import CustomInfo from './ExploreViews/CustomInfo';
import PackageDetailView from './PackageDetailView';

// Sample Data with Dummy Images, Map/Insta Links, and Package Mapping
import { EXPLORE_DATA } from '../exploreData';

export default function ExploreHub() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const packageId = searchParams.get('packageId');

  const [view, setView] = useState('main'); // 'main', 'place_detail', 'package_info', 'custom_info'
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setView('place_detail');
  };

  const handleSelectPackageInfo = () => {
    setView('package_info');
  };

  const handleSelectPackage = (pkg) => {
    setSearchParams(prev => { prev.set('packageId', pkg.id); return prev; });
  };

  const handleSelectCustomInfo = () => {
    setView('custom_info');
  };

  const handleBackToMain = () => {
    setView('main');
    setSelectedPlace(null);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleBuildCustom = () => {
    navigate('/build');
  };

  // Render the current view
  const renderView = () => {
    switch (view) {
      case 'place_detail':
        return (
          <PlaceDetail 
            place={selectedPlace} 
            onBack={handleBackToMain} 
            onSelectPackageInfo={handleSelectPackageInfo}
          />
        );
      case 'package_info':
        return (
          <PackageInfo 
            onBack={handleBackToMain} 
            onBuildPath={() => navigate('/build?path=readymade')} 
            onSelectPackage={handleSelectPackage}
          />
        );
      case 'custom_info':
        return (
          <CustomInfo 
            onBack={handleBackToMain} 
            onBuildPath={() => navigate('/build')} 
          />
        );
      case 'main':
      default:
        return (
          <ExploreMain 
            exploreData={EXPLORE_DATA} 
            onSelectPlace={handleSelectPlace}
            onSelectPackageInfo={handleSelectPackageInfo}
            onSelectCustomInfo={handleSelectCustomInfo}
            onBackHome={handleBackHome}
            onBuildCustom={handleBuildCustom}
          />
        );
    }
  };

  const pkgToView = packageId ? config.packages.find(p => p.id === packageId) : null;

  return (
    <div className="min-h-screen bg-background text-foreground relative w-full overflow-hidden flex flex-col">
      {renderView()}
      
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
