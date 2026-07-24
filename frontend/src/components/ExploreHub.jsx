import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExploreMain from './ExploreViews/ExploreMain';
import PlaceDetail from './ExploreViews/PlaceDetail';
import PackageInfo from './ExploreViews/PackageInfo';
import CustomInfo from './ExploreViews/CustomInfo';
import PackageDetailView from './PackageDetailView';

// Sample Data with Dummy Images, Map/Insta Links, and Package Mapping
import { EXPLORE_DATA } from '../exploreData';



export default function ExploreHub() {
  const navigate = useNavigate();
  const [view, setView] = useState('main'); // 'main', 'place_detail', 'package_info', 'custom_info', 'package_detail'
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setView('place_detail');
  };

  const handleSelectPackageInfo = () => {
    setView('package_info');
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setView('package_detail');
  };

  const handleSelectCustomInfo = () => {
    setView('custom_info');
  };

  const handleBackToMain = () => {
    setView('main');
    setSelectedPlace(null);
    setSelectedPackage(null);
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
      case 'package_detail':
        return (
          <PackageDetailView 
            packageData={selectedPackage}
            onBack={() => setView('package_info')}
            onBook={() => navigate(`/build?package=${selectedPackage.id}`)}
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative w-full overflow-hidden flex flex-col">
      {renderView()}
    </div>
  );
}
