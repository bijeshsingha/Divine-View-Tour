import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExploreMain from './ExploreViews/ExploreMain';
import PlaceDetail from './ExploreViews/PlaceDetail';
import PackageInfo from './ExploreViews/PackageInfo';
import CustomInfo from './ExploreViews/CustomInfo';
import PackageDetailView from './PackageDetailView';

// Sample Data with Dummy Images, Map/Insta Links, and Package Mapping
const EXPLORE_DATA = [
  {
    id: "p1",
    title: "Nohkalikai Falls",
    location: "Cherrapunji, Meghalaya",
    tags: ["Waterfalls", "Nature"],
    description: "India's tallest plunge waterfall dropping from a height of 1,115 feet into a turquoise pool. A spectacular sight surrounded by lush green cliffs.",
    gallery: [
      "/images/Meghalaya/Cherrapunjee/Nohkalikai Falls/Nohkalikai Falls1.jpg",
      "/images/Meghalaya/Cherrapunjee/Nohkalikai Falls/Nohkalikai Falls2.jpg",
      "/images/Meghalaya/Cherrapunjee/Nohkalikai Falls/Nohkalikai Falls3.jpg"
    ],
    videoPlaceholder: null,
    packageLinked: '7D Adrenaline & 4D Cherrapunji Classic',
    googleMapsUrl: 'https://maps.google.com/?q=Nohkalikai+Falls',
    instagramUrl: 'https://www.instagram.com/explore/tags/nohkalikaifalls/',
  },
  {
    id: "p2",
    title: "Kamakhya Temple",
    location: "Guwahati, Assam",
    tags: ["Culture", "Spiritual"],
    description: "One of the oldest of the 51 Shakti Pithas. Situated on the Nilachal Hill, it is a key spiritual destination and an architectural marvel.",
    gallery: [
      "/images/Guwahati/Temples/Kamakhya.jpg", 
      "/images/Guwahati/Temples/Kamakhya2.jpg",
      "/images/Guwahati/Temples/Kamakhya3.jpg",
      "/images/Guwahati/Temples/Kamakhya4.jpg"
    ],
    videoPlaceholder: null,
    packageLinked: 'Guwahati Local Tours',
    googleMapsUrl: 'https://maps.google.com/?q=Kamakhya+Temple',
    instagramUrl: 'https://www.instagram.com/explore/tags/kamakhyatemple/',
    proTip: 'Special VIP entry passes for the temple (approx. ₹500) are purchased directly at the venue. Your driver will guide you to the ticketing counters!'
  },
  {
    id: "p2-b",
    title: "Umananda Island (Peacock Island)",
    location: "Guwahati, Assam",
    tags: ["Culture", "Spiritual", "Nature"],
    description: "The smallest inhabited river island in the world, sitting in the middle of the Brahmaputra River. It houses the Umananda Temple dedicated to Lord Shiva.",
    gallery: [
      "/images/Guwahati/Temples/Umananda.jpg",
      "/images/Guwahati/Temples/Umananda2.jpg"
    ],
    videoPlaceholder: null,
    packageLinked: 'Guwahati Local Tours',
    googleMapsUrl: 'https://maps.google.com/?q=Umananda+Island',
  },
  {
    id: "p2-c",
    title: "Purva Tirupati Balaji Temple",
    location: "Guwahati, Assam",
    tags: ["Culture", "Spiritual"],
    description: "A beautiful white shrine dedicated to Lord Venkateshwara, known for its pristine architecture and peaceful evening atmosphere.",
    gallery: [
      "/images/Guwahati/Temples/Balaji Temple.jpg",
      "/images/Guwahati/Temples/Balaji Temple1.jpg"
    ],
    videoPlaceholder: null,
    packageLinked: 'Guwahati Local Tours',
    googleMapsUrl: 'https://maps.google.com/?q=Purva+Tirupati+Balaji+Temple+Guwahati',
  },
  {
    id: "p3",
    title: "Brahmaputra Dinner Cruise",
    location: "Guwahati, Assam",
    tags: ["Adventure", "Leisure"],
    description: "Enjoy sunset views, live local music, and an authentic dinner on the mighty Brahmaputra river.",
    gallery: ["/images/Guwahati/Boat.jpg"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0",
    packageLinked: 'Guwahati Local Tours',
    googleMapsUrl: 'https://maps.google.com/?q=Alfresco+Grand+Guwahati',
    instagramUrl: 'https://www.instagram.com/explore/tags/brahmaputracruise/',
  },
  {
    id: "p4",
    title: "Kaziranga National Park",
    location: "Golaghat, Assam",
    tags: ["Wildlife", "Adventure"],
    description: "A UNESCO World Heritage site, home to two-thirds of the world's Great One-horned Rhinoceroses. Features diverse flora, fauna, and thrilling jeep safaris.",
    gallery: [
      "/images/Kaziranga/photo-1605092676920-8ac5ae40c7c8.jpg", 
      "/images/Kaziranga/premium_photo-1661828159832-19d8340f8e09.jpg",
      "/images/Kaziranga/gettyimages-1485549541-2048x2048.jpg",
      "/images/Kaziranga/photo-1589882485484-c073e3742e60.jpg",
      "/images/Kaziranga/premium_photo-1664302732701-493f8a41ab69.jpg"
    ],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0",
    googleMapsUrl: 'https://maps.google.com/?q=Kaziranga+National+Park',
    instagramUrl: 'https://www.instagram.com/explore/tags/kaziranga/',
  },
  {
    id: "p5",
    title: "Mawlynnong Village",
    location: "East Khasi Hills, Meghalaya",
    tags: ["Culture", "Nature"],
    description: "Renowned as 'Asia's Cleanest Village'. Experience sustainable eco-tourism, local Khasi culture, and the nearby living root bridges.",
    gallery: ["/images/Meghalaya/6809d82be1f015b4b224ff5abe40c006.jpg"],
    videoPlaceholder: null,
    googleMapsUrl: 'https://maps.google.com/?q=Mawlynnong+Village',
    instagramUrl: 'https://www.instagram.com/explore/tags/mawlynnong/',
  },
  {
    id: "p6",
    title: "Don Bosco Museum",
    location: "Shillong, Meghalaya",
    tags: ["Culture", "Heritage"],
    description: "A major cultural hub providing a comprehensive glimpse into the rich and diverse indigenous cultures of Northeast India across 7 floors.",
    gallery: ["/images/Meghalaya/39affdeb3cc07e912309c2348728d6f2.jpg"],
    videoPlaceholder: null,
    googleMapsUrl: 'https://maps.google.com/?q=Don+Bosco+Museum+Shillong',
    instagramUrl: 'https://www.instagram.com/explore/tags/donboscomuseum/',
  },
  {
    id: "p7",
    title: "Majuli Island",
    location: "Brahmaputra River, Assam",
    tags: ["Culture", "Heritage"],
    description: "The world's largest river island. A hub of Assamese neo-Vaishnavite culture, famous for its Satras (monasteries), mask-making, and vibrant festivals.",
    gallery: [
      "/images/Assam/Majuli/Majuli1.jpg",
      "/images/Assam/Majuli/majuli2.jpg",
      "/images/Assam/Majuli/majuli3.jpg"
    ],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0",
    googleMapsUrl: 'https://maps.google.com/?q=Majuli+Island',
    instagramUrl: 'https://www.instagram.com/explore/tags/majuli/',
  },
  // --- MEGHALAYA (TREKKING & HIDDEN GEMS) ---
  {
    id: "p8",
    title: "Wari Chora Canyon",
    location: "South Garo Hills, Meghalaya",
    tags: ["Adventure", "Nature", "Water Sports"],
    description: "A magical canyon surrounded by steep cliffs and the tranquil turquoise waters of the Rongdik River. Known as the sacred resting ground of seven giant serpent gods, visitors can kayak and canoe through this remote, breathtaking gorge.",
    gallery: ["/images/Gemini_Generated_Image_8ylri98ylri98ylr.png"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0"
  },
  {
    id: "p9",
    title: "David Scott Trail",
    location: "Mawphlang, Meghalaya",
    tags: ["Trekking", "History", "Adventure"],
    description: "A historic 16 km trekking route stretching from Mawphlang to Lad Mawphlang, originally built by a British administrator in 1829. The trail offers stunning views of the Umiam River, hanging bridges, and rolling hills.",
    gallery: ["/images/Gemini_Generated_Image_cnqi2wcnqi2wcnqi.png"],
    videoPlaceholder: null
  },
  {
    id: "p10",
    title: "Mawryngkhang Trek (Bamboo Trek)",
    location: "Wahkhen, Meghalaya",
    tags: ["Trekking", "Adventure"],
    description: "Known as the scariest trek in Meghalaya, this thrilling trail takes you over deep gorges and roaring rivers entirely on bamboo bridges tied with cane, leading to the legendary King of Stones.",
    gallery: ["/images/Meghalaya/16965a616fd260417491af59d63cee27.jpg"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0"
  },
  {
    id: "p11",
    title: "Nongriat Double Decker Root Bridge",
    location: "Cherrapunji (Sohra), Meghalaya",
    tags: ["Trekking", "Culture", "Nature"],
    description: "A challenging 3,500-step descent into the rainforest to witness the iconic Double Decker Living Root Bridge, followed by a hike to the pristine Blue Lagoon and Rainbow Falls.",
    gallery: ["/images/Meghalaya/39affdeb3cc07e912309c2348728d6f2.jpg"],
    videoPlaceholder: null
  },

  // --- NAGALAND ---
  {
    id: "p12",
    title: "Dzukou Valley Trek",
    location: "Kohima, Nagaland",
    tags: ["Trekking", "Nature"],
    description: "A stunning 2-day trek sitting at 8,000 ft on the Nagaland-Manipur border. Famous for its rolling green hills and the rare pink-white Dzukou lily that blooms during the monsoon.",
    gallery: ["/images/Gemini_Generated_Image_8ylri98ylri98ylr.png"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0"
  },
  {
    id: "p13",
    title: "Khonoma Green Village",
    location: "Kohima, Nagaland",
    tags: ["Culture", "Nature"],
    description: "India’s first green village, known for its fierce warrior history and current dedication to eco-tourism, terrace farming, and wildlife conservation.",
    gallery: ["/images/Kaziranga/gettyimages-1485549541-2048x2048.jpg"],
    videoPlaceholder: null
  },

  // --- ARUNACHAL PRADESH ---
  {
    id: "p14",
    title: "Tawang & Sela Pass",
    location: "Tawang, Arunachal Pradesh",
    tags: ["Nature", "Spiritual", "Adventure"],
    description: "Journey through the snow-clad Sela Pass at 13,700 ft to reach the ancient Tawang Monastery. Experience pristine high-altitude lakes and Buddhist culture.",
    gallery: ["/images/Gemini_Generated_Image_cnqi2wcnqi2wcnqi.png"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0"
  },
  {
    id: "p15",
    title: "Ziro Valley",
    location: "Lower Subansiri, Arunachal Pradesh",
    tags: ["Culture", "Nature"],
    description: "A picturesque pine-clad valley home to the Apatani tribe. Famous for its terraced rice fields, unique tribal culture, and the annual Ziro Festival of Music.",
    gallery: ["/images/Meghalaya/6809d82be1f015b4b224ff5abe40c006.jpg"],
    videoPlaceholder: null
  },

  // --- MIZORAM ---
  {
    id: "p16",
    title: "Reiek Tlang & Heritage Village",
    location: "Aizawl, Mizoram",
    tags: ["Trekking", "Culture", "Nature"],
    description: "Rising to 1,548 meters, Reiek Mountain offers panoramic views of the valleys. The base features a model Mizo village showcasing the traditional huts of different Mizo sub-tribes and chieftain houses.",
    gallery: ["/images/Guwahati/View Point.jpg"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0"
  },

  // --- SIKKIM & DARJEELING ---
  {
    id: "p17",
    title: "Tiger Hill & Tea Estates",
    location: "Darjeeling, West Bengal",
    tags: ["Nature", "Leisure"],
    description: "Witness a breathtaking sunrise over Mt. Kanchenjunga from Tiger Hill, followed by a ride on the UNESCO Toy Train and a tour of world-famous sloping tea gardens.",
    gallery: ["/images/Meghalaya/c5110caa53e59aadacccdf02fd580450.jpg"],
    videoPlaceholder: null
  },
  {
    id: "p18",
    title: "Tsomgo Lake & Nathu La",
    location: "Gangtok, Sikkim",
    tags: ["Nature", "Adventure"],
    description: "Visit the glacial Tsomgo Lake at 12,310 ft and travel up to the historic Nathu La Pass on the Indo-China border. A mesmerizing landscape of snow and alpine beauty.",
    gallery: ["/images/Gemini_Generated_Image_cnqi2wcnqi2wcnqi.png"],
    videoPlaceholder: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=0&controls=1&mute=0"
  }
];

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
            onBuildPath={() => navigate('/build')} 
            onSelectPackage={handleSelectPackage}
          />
        );
      case 'package_detail':
        return (
          <PackageDetailView 
            packageData={selectedPackage}
            onBack={() => setView('package_info')}
            onBook={() => navigate('/build')}
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
