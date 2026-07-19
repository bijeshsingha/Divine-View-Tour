const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load data
const dataPath = path.join(__dirname, 'data.json');
let db = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// GET /api/config - Return everything needed for the frontend TripBuilder
app.get('/api/config', (req, res) => {
  res.json(db);
});

// POST /api/calculate - Calculate final price and return Whatsapp message
app.post('/api/calculate', (req, res) => {
  const tripData = req.body;
  if (!tripData || !tripData.region) {
    return res.status(400).json({ error: 'Invalid trip data' });
  }

  const regionData = db.regions[tripData.region];
  const regionBase = regionData.basePrice;
  
  const selectedCar = db.cars.find(c => c.id === tripData.carType) || db.cars[2];
  const selectedStay = db.stays.find(s => s.id === tripData.stayType) || db.stays[1];

  const carCost = (1500 * selectedCar.multiplier * tripData.tripDays);
  
  // If Guwahati 1-day trip, no stay cost
  const stayCost = (tripData.region === 'guwahati' && tripData.tripDays === 1) 
    ? 0 
    : (selectedStay.rate * tripData.travelerCount * (tripData.tripDays - 1));

  const totalCost = Math.round(carCost + stayCost + (regionBase * tripData.travelerCount * tripData.tripDays));

  const whatsappMessage = encodeURIComponent(`*New Trip Inquiry - Divine View Tours*

*Region:* ${regionData.title}
*Check-in:* ${tripData.checkInDate}
*Duration:* ${tripData.tripDays} Days
*Travelers:* ${tripData.travelerCount}

*Vehicle:* ${tripData.carType === 'pool' ? 'Pool & Save (Shared)' : selectedCar.label.toUpperCase() + ' (Private)'}
*Accommodation:* ${tripData.tripDays > 1 ? selectedStay.label.toUpperCase() : 'N/A (Day Trip)'}

*Spots Selected:* 
${tripData.spots.length > 0 ? tripData.spots.map(s => `- ${s}`).join('\n') : 'Flexible'}

*Must-Visit Food Spots:*
${tripData.restaurants.length > 0 ? tripData.restaurants.map(r => `- ${r}`).join('\n') : 'Flexible'}

*Estimated Budget:* ₹${totalCost.toLocaleString()}

Please send me the final itinerary and booking link!`);

  res.json({ totalCost, whatsappMessage });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
