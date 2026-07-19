# TripBuilder Component: Logic & Flow Documentation

The `TripBuilder.jsx` component is the core frontend engine for acquiring customer trip preferences. It is a dynamic, 7-step React form that adjusts its options in real-time based on backend configuration and user input.

---

## 1. State Management & Initialization

The component relies on three primary state variables:
*   `step` (Integer): Tracks the user's progress through the form (1 to 7).
*   `data` (Object): The user's accumulated selections (`checkInDate`, `region`, `tripDays`, `travelerCount`, `spots`, `carType`, `stayType`, `restaurants`).
*   `config` (Object): The dynamic configuration data loaded from the backend (`/api/config`, which pulls from `data.json`).

**Initialization:**
On component mount, a `useEffect` hook fetches the configuration data from the backend. The component displays a loading screen (`RefreshCw` spinner) until this JSON payload is successfully loaded, ensuring no UI renders without available options.

---

## 2. Step-by-Step User Flow

The builder is divided into 7 distinct steps. Progress is tracked via a dynamic progress bar at the top of the UI.

### **Step 1: Check-in Date**
*   **Input:** Standard HTML5 date picker.
*   **Logic:** Updates `data.checkInDate`. The user cannot proceed to Step 2 until a date is selected.

### **Step 2: Region Selection**
*   **Input:** Buttons generated from `config.regions` (e.g., Meghalaya Expedition, Guwahati Local).
*   **Logic:** 
    *   Updates `data.region`.
    *   **Crucial Reset:** Automatically clears any previously selected `spots` and `restaurants` to prevent data mismatch if the user changes regions later.
    *   **Boundary Enforcement:** Checks the new region's `minDays` and `maxDays`. If the currently selected `tripDays` falls outside this range, it forcefully adjusts `tripDays` to fit the new region's constraints.

### **Step 3: Trip Details (Duration & Group Size)**
*   **Input:** Custom `+` and `-` incrementers to prevent keyboard popup fatigue on mobile.
*   **Logic:** 
    *   **Duration:** Bounded strictly by the selected region's `minDays` and `maxDays`.
    *   **Group Size:** Minimum value is locked at 1. Updates `data.travelerCount`.

### **Step 4: Must-See Spots**
*   **Input:** Multi-select toggle list populated from `config.regions[currentRegion].spots`.
*   **Logic:** Uses a `toggleArrayItem` function to add or remove strings from the `data.spots` array.
*   **External Integration:** Dynamically generates Deep Links for each spot:
    *   *Google Maps:* `https://www.google.com/maps/search/?api=1&query=[Spot Name]`
    *   *Instagram:* Cleans the string to generate an Instagram hashtag search URL (`https://www.instagram.com/explore/tags/[cleantag]/`).

### **Step 5: Vehicle Class (Fleet Filtering)**
*   **Input:** Single-select list of vehicles (including the "Pool & Save" option).
*   **Logic (Dynamic Filtering):** The list of vehicles is filtered in real-time based on group size: `config.cars.filter(car => data.travelerCount <= car.maxPax)`.
    *   *Safety Catch:* If the user previously selected a car (e.g., Hatchback, max pax 3), went back to Step 3, increased the group size to 5, and returned to Step 5, the UI automatically invalidates the Hatchback and defaults to the first available valid vehicle (like an SUV).

### **Step 6: Accommodation**
*   **Input:** Single-select list of stay types (BnB, Hotel, Resort).
*   **Logic (Conditional Skip):** 
    *   If the user selected the `guwahati` region AND the duration is exactly `1` day, the system determines it's a day trip.
    *   When clicking "Continue" on Step 5, the `nextStep()` function detects this condition and **skips Step 6 entirely**, jumping straight to Step 7.
    *   The `prevStep()` function contains the inverse logic to skip back over Step 6 if necessary.

### **Step 7: Trending Food**
*   **Input:** Multi-select toggle list populated from `config.regions[currentRegion].restaurants`.
*   **Logic:** Functions identically to Step 4 (Spots), including the dynamic Map and Instagram deep links.

---

## 3. Form Submission

When the user reaches Step 7, the "Continue" button changes to **"Calculate My Trip"**. 
Clicking this triggers the `onComplete(data)` prop, passing the fully constructed JSON payload back up to the parent component (`App.jsx`), which then forwards it to the backend (`/api/calculate`) to generate the final pricing and WhatsApp message in the `ItineraryView`.
