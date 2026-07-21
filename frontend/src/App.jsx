import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import TripBuilder from './components/TripBuilder';
import ExploreHub from './components/ExploreHub';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const defaultDate = tomorrow.toISOString().split('T')[0];

function MobileLayout({ children }) {
  return (
    <div className="max-w-md w-full min-h-screen shadow-2xl bg-white flex flex-col relative overflow-hidden">
      {children}
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    name: '',
    roomNumber: '',
    checkInDate: defaultDate,
    region: 'meghalaya',
    tripDays: 3,
    travelerCount: 2,
    spots: [],
    transportType: 'private',
    privateCars: { sedan: 1 },
    stayType: 'hotel',
    restaurants: [],
    customRequest: '',
  });

  const handleTripComplete = (data) => {
    setTripData(data);
    // Submit logic will now happen inside TripBuilder before calling onComplete
    // We could navigate back home, or show a success message
  };

  const handleReset = () => {
    setTripData({
      name: '',
      roomNumber: '',
      checkInDate: defaultDate,
      region: 'meghalaya',
      tripDays: 3,
      travelerCount: 2,
      spots: [],
      transportType: 'private',
      privateCars: { sedan: 1 },
      stayType: 'hotel',
      restaurants: [],
      customRequest: '',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-black text-slate-900 font-sans selection:bg-brand-light flex flex-col items-center">
      <Routes>
        <Route path="/" element={<Welcome onStart={() => navigate('/build')} onExplore={() => navigate('/explore')} />} />
        <Route path="/explore" element={<ExploreHub />} />
        <Route path="/build" element={<MobileLayout><TripBuilder initialData={tripData} onComplete={handleTripComplete} /></MobileLayout>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
