// Static Data Dictionary for Meghalaya / Guwahati Spots
export const spotsMetadata = {
  // Meghalaya
  "Shillong Peak & Elephant Falls": {
    id: "shillong_peak_elephant_falls",
    name: "Shillong Peak & Elephant Falls",
    default_duration_mins: 120,
    region: "Shillong",
    order: 1
  },
  "Mawryngkhang Trek (Bamboo Trek)": {
    id: "bamboo_trek",
    name: "Mawryngkhang Trek (Bamboo Trek)",
    default_duration_mins: 240,
    region: "Wahkhen",
    order: 2
  },
  "Wei Sawdong": {
    id: "wei_sawdong",
    name: "Wei Sawdong",
    default_duration_mins: 90,
    region: "Cherrapunji",
    order: 3
  },
  "Double Decker Root Bridge": {
    id: "double_decker",
    name: "Double Decker Root Bridge",
    default_duration_mins: 240,
    region: "Cherrapunji",
    order: 4
  },
  "Dawki River (Umngot)": {
    id: "dawki_river",
    name: "Dawki River (Umngot)",
    default_duration_mins: 150,
    region: "Dawki",
    order: 5
  },
  "Krang Suri Waterfalls": {
    id: "krang_suri",
    name: "Krang Suri Waterfalls",
    default_duration_mins: 120,
    region: "Jaintia Hills",
    order: 6
  },
  // Guwahati
  "Kamakhya Temple": {
    id: "kamakhya",
    name: "Kamakhya Temple",
    default_duration_mins: 120,
    region: "Guwahati",
    order: 1
  },
  "Umananda Island (Peacock Island)": {
    id: "umananda",
    name: "Umananda Island (Peacock Island)",
    default_duration_mins: 90,
    region: "Guwahati",
    order: 2
  },
  "Brahmaputra River Cruise": {
    id: "river_cruise",
    name: "Brahmaputra River Cruise",
    default_duration_mins: 120,
    region: "Guwahati",
    order: 3
  },
  "Assam State Zoo": {
    id: "assam_zoo",
    name: "Assam State Zoo",
    default_duration_mins: 150,
    region: "Guwahati",
    order: 4
  },
  "Srimanta Sankaradeva Kalakshetra": {
    id: "kalakshetra",
    name: "Srimanta Sankaradeva Kalakshetra",
    default_duration_mins: 120,
    region: "Guwahati",
    order: 5
  }
};

// Helper to format time (e.g., 9:00 AM)
const formatTime = (dateObj) => {
  return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// Mock function for Google Maps Distance Matrix API
// In production, this would make an actual API call to Google Maps
export const fetchTravelTimes = async (origin, destination) => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a mock travel time (60 mins) between any two spots
  // For production, replace this with Google Maps Distance Matrix API call
  return 60; 
};

// Main sequence generator
export const generateSchedule = async (selectedSpots, baseDateStr) => {
  // 1. Sort the user's selected spots logically based on region order
  const validSpots = selectedSpots.filter(spotName => spotsMetadata[spotName]);
  
  const sortedSpots = validSpots.sort((a, b) => {
    return spotsMetadata[a].order - spotsMetadata[b].order;
  });

  const timeline = [];
  
  // 2. Initial Setup: Start at 9:00 AM on the given date
  // baseDateStr is typically "YYYY-MM-DD"
  const startDateTime = new Date(`${baseDateStr}T09:00:00`);
  let currentTime = new Date(startDateTime.getTime());
  
  let previousLocation = "Hotel Divine View, Guwahati";

  // 3. The Loop: Calculate arrival and departure times sequentially
  for (const spotName of sortedSpots) {
    const meta = spotsMetadata[spotName];
    
    // Fetch mock driving time from previous spot to this spot
    const driveMins = await fetchTravelTimes(previousLocation, meta.name);
    
    // Add driving time to current time to get Arrival Time
    currentTime = new Date(currentTime.getTime() + driveMins * 60000);
    const arrivalTime = formatTime(currentTime);
    
    // Add activity duration to get Departure Time
    currentTime = new Date(currentTime.getTime() + meta.default_duration_mins * 60000);
    const departureTime = formatTime(currentTime);
    
    timeline.push({
      id: meta.id,
      name: meta.name,
      region: meta.region,
      driveTimeMins: driveMins,
      durationMins: meta.default_duration_mins,
      arrivalTime,
      departureTime
    });
    
    previousLocation = meta.name;
  }
  
  // Add return journey to hotel
  const returnDriveMins = await fetchTravelTimes(previousLocation, "Hotel Divine View");
  currentTime = new Date(currentTime.getTime() + returnDriveMins * 60000);
  const finalArrivalTime = formatTime(currentTime);
  
  timeline.push({
    id: "return_hotel",
    name: "Return to Hotel",
    region: "Base",
    driveTimeMins: returnDriveMins,
    durationMins: 0,
    arrivalTime: finalArrivalTime,
    departureTime: ""
  });

  return timeline;
};
