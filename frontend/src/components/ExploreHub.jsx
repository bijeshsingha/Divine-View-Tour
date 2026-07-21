import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExploreMain from './ExploreViews/ExploreMain';
import PlaceDetail from './ExploreViews/PlaceDetail';
import PackageInfo from './ExploreViews/PackageInfo';
import CustomInfo from './ExploreViews/CustomInfo';

// Sample Data with Dummy Images, Map/Insta Links, and Package Mapping
const EXPLORE_DATA = [
  {
    id: '1',
    title: 'Nohkalikai Falls',
    category: 'Waterfalls',
    region: 'Cherrapunji',
    description: 'India’s tallest plunge waterfall dropping from a height of 1,115 feet into a turquoise pool.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=Nohkalikai+Falls',
    instagramUrl: 'https://www.instagram.com/explore/tags/nohkalikaifalls/',
    packageLinked: '7D Adrenaline & 4D Cherrapunji Classic',
    isCuratedChoice: true,
  },
  {
    id: '2',
    title: 'Jadoh at Trattoria',
    category: 'Food',
    region: 'Shillong (Police Bazar)',
    description: 'Famous local Khasi eatery serving authentic Jadoh (rice cooked with meat broth and spices).',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=Trattoria+Shillong',
    instagramUrl: 'https://www.instagram.com/explore/tags/khasifood/',
    packageLinked: '7D Untamed Frontier & 5D Easy Explorer',
    isCuratedChoice: true,
  },
  {
    id: '3',
    title: 'Umngot River (Crystal Clear)',
    category: 'Adventure',
    region: 'Dawki / Shnongpdeng',
    description: 'Boating on water so transparent that boats look like they are floating in thin air.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=Umngot+River+Dawki',
    instagramUrl: 'https://www.instagram.com/explore/tags/dawkiriver/',
    packageLinked: '5D Waterfall Chaser & 7D Cloud Retreat',
    isCuratedChoice: false,
  },
  {
    id: '4',
    title: 'Kamakhya Temple',
    category: 'Culture',
    region: 'Guwahati',
    description: 'One of the oldest of the 51 Shakti Pithas. Situated on the Nilachal Hill, it is a key spiritual destination.',
    image: 'https://images.unsplash.com/photo-1621213076118-28562d46e10f?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=Kamakhya+Temple',
    instagramUrl: 'https://www.instagram.com/explore/tags/kamakhyatemple/',
    packageLinked: 'Guwahati Local Tours',
    isCuratedChoice: false,
    proTip: 'Special VIP entry passes for the temple (approx. ₹500) are purchased directly at the venue. Your driver will guide you to the ticketing counters!'
  },
  {
    id: '5',
    title: 'Brahmaputra Dinner Cruise',
    category: 'Adventure',
    region: 'Guwahati',
    description: 'Enjoy sunset views, live local music, and dinner on the water.',
    image: 'https://images.unsplash.com/photo-1605335133615-5460594cc6f3?auto=format&fit=crop&w=800&q=80',
    googleMapsUrl: 'https://maps.google.com/?q=Alfresco+Grand+Guwahati',
    instagramUrl: 'https://www.instagram.com/explore/tags/brahmaputracruise/',
    packageLinked: 'Guwahati Local Tours',
    isCuratedChoice: false,
    proTip: 'Sunset Cruise tickets (approx. ₹1,000) are purchased directly at the venue. Enjoy live music and a beautiful view of the river!'
  }
];

export default function ExploreHub() {
  const navigate = useNavigate();
  const [view, setView] = useState('main'); // 'main', 'place_detail', 'package_info', 'custom_info'
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setView('place_detail');
  };

  const handleSelectPackageInfo = () => {
    setView('package_info');
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
          />
        );
      case 'package_info':
        return (
          <PackageInfo 
            onBack={handleBackToMain} 
            onBuildPath={() => navigate('/build')} 
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
