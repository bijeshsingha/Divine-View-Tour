# Divine View Tours - Website Architecture & UX Flow

This document outlines the hierarchy, user flows, and core functionality of the Divine View Tours website (built on Next.js).

## 🗺️ 1. Global Sitemap & Routing Hierarchy

The website follows a modern App Router structure in Next.js, broken down into three primary pillars: **Home**, **Explore**, and **Build**.

```text
/ (Root)
│
├── /explore                  [The Discoverability Hub]
│   ├── /explore/packages     [Educational: How Readymade Packages Work]
│   ├── /explore/custom       [Educational: How Custom Itineraries Work]
│   └── /explore/place/[id]   [Dynamic: Specific Destination Details e.g. Dawki, Kaziranga]
│
├── /packages/[id]            [Dynamic: Specific Package Details e.g. 7-Day Meghalaya]
│
└── /build                    [The Conversion Engine: Trip Builder]
    └── ?step=[x]             [Stateful query params for multi-step checkout]
```

---

## 🎨 2. Page Breakdown & Functionality

### A. The Home Page (`/`)
**Component:** `Welcome.jsx`
- **Purpose:** The landing page and primary entry point.
- **UX/UI:** Features a cinematic video background, high-contrast typography, and a prominent call-to-action (CTA).
- **Functionality:** 
  - Directs high-intent users to `/build` to start planning.
  - Directs exploratory users to `/explore` to learn about destinations.

### B. The Explore Hub (`/explore`)
**Component:** `ExploreMain.jsx`
- **Purpose:** The visual catalog of all destinations (Kaziranga, Cherrapunji, etc.).
- **UX/UI:** 
  - Cinematic video hero section with dynamic search bar.
  - Interactive `PlaceCard` components featuring 3D tilt hover effects and horizontal swiping image galleries with indicator dots.
- **Functionality:** 
  - Users can filter destinations by category tags or type in the real-time search bar.
  - Clicking a card navigates to `/explore/place/[id]`.

### C. Destination Details (`/explore/place/[id]`)
**Component:** `PlaceDetail.jsx`
- **Purpose:** Deep-dive into a specific location.
- **UX/UI:** Large image header, interactive tabs (Overview, Highlights, Best Time to Visit).
- **Functionality:** Dynamically lists which "Readymade Packages" include this specific destination, allowing users to jump directly to a package.

### D. Package Details (`/packages/[id]`)
**Component:** `PackageDetailView.jsx`
- **Purpose:** Showcases the full itinerary for a readymade package.
- **UX/UI:** Day-by-day timeline breakdown with inclusions and pricing.
- **Functionality:** 
  - Users can click "Book This Package", which routes them directly into the `/build` engine with the `packageId` pre-loaded.

### E. The Trip Builder Engine (`/build`)
**Component:** `TripBuilder.jsx`
- **Purpose:** The core conversion funnel and multi-step booking engine.
- **Functionality:** A stateful, multi-step flow managed via URL query parameters (`?step=...`).

**The Build Flow:**
1. **Fork (`Step0Fork`)**: User chooses between "Readymade" or "Custom".
2. **Catalog (`StepPackageCatalog`)**: (If Readymade) User selects a pre-built package.
3. **Destinations (`Step1Destination`)**: (If Custom) User selects regions and specific places.
4. **Logistics (`Step2Logistics`)**: User inputs Dates, Traveler Count, and pickup locations.
5. **Customization (`Step3Customization`)**: User selects Hotel tier (Standard, Premium, Luxury) and Vehicle type (Sedan, SUV, Innova).
6. **Summary (`StepFinalGuestDetails`)**: Displays final dynamic pricing.
7. **Conversion**: Generates a success message and instructs the user that they will be contacted via WhatsApp with their final PDF itinerary.

---

## ⚡ 3. Technical & SEO Highlights
- **Performance:** All heavy images utilize Next.js `<Image>` for automatic WebP compression. Heavy background videos use static `poster` images to guarantee instant First Contentful Paint (FCP).
- **SEO Optimization:** Dynamic Next.js Metadata API generates highly targeted title and description tags for every individual destination and package page automatically based on the database.
- **Bundle Optimization:** Heavy client-side libraries (like PDF generators) have been stripped from the main thread, resulting in ultra-fast Total Blocking Time (TBT).
