# Divine View Tours — Pricing Management Guide

This document outlines how tour package prices and vehicle-hire daily rates are managed, updated, and extended in the codebase.

## 1. Architecture Overview

To ensure prices are easily updateable in the future without modifying UI components or altering CSS, all pricing data is decoupled into structured JSON configurations:

1. **Vehicle Daily Rates**: Located in [`divine-view-next/src/data/vehicleRates.json`](file:///d:/kachra/Downloads/My%20Projects/Divine%20View%20Tour/divine-view-next/src/data/vehicleRates.json)
2. **Holiday Packages**: Located in [`divine-view-next/src/data/packagesData.json`](file:///d:/kachra/Downloads/My%20Projects/Divine%20View%20Tour/divine-view-next/src/data/packagesData.json)

Changes to these files immediately propagate across:
- The Homepage featured package cards (`/`)
- The Package listing directory (`/packages`)
- Package detail pages (`/packages/[slug]`)
- The Vehicle Hire rate table (`/vehicle-hire`)
- The Admin Pricing Dashboard (`/admin/pricing`)
- Public API endpoints (`/api/vehicle-rates`, `/api/packages`)

---

## 2. Updating Vehicle Hire Daily Rates

Open [`src/data/vehicleRates.json`](file:///d:/kachra/Downloads/My%20Projects/Divine%20View%20Tour/divine-view-next/src/data/vehicleRates.json).

Each route entry has this schema:
```json
{
  "id": "meghalaya-5d",
  "route": "Meghalaya Circuit (Shillong, Cherrapunji, Dawki)",
  "minimumDays": 5,
  "sedan": 5300,
  "ertiga": 6100,
  "crysta": 7300,
  "status": "published",
  "notes": "Covers Shillong, Sohra waterfalls, living root bridges, and Umngot River."
}
```

### How to:
- **Change a rate**: Simply change the number (e.g. change `"sedan": 5300` to `5500`).
- **Mark a vehicle as unavailable for a route**: Set the value to `null` (e.g. `"sedan": null`). The UI will automatically render a badge `"Not offered"` instead of ₹0.
- **Update the effective date label**: Change `"effectiveLabel": "Effective from October 2026 (until revised)"` at the top of the file.
- **Add a new route**: Append a new object to the `"routes"` array with a unique `id`.

---

## 3. Updating Package Prices & Price Modes

Open [`src/data/packagesData.json`](file:///d:/kachra/Downloads/My%20Projects/Divine%20View%20Tour/divine-view-next/src/data/packagesData.json).

Each package object includes pricing configuration:
```json
{
  "id": "pkg-meghalaya-5d",
  "slug": "meghalaya-5-day-tour-from-guwahati",
  "priceMode": "starting_from",
  "priceAmount": 18500,
  "priceCurrency": "INR",
  "priceBasis": "per person (twin-sharing basis, min 4 travellers)"
}
```

### Supported `priceMode` values:
1. `"starting_from"`: Renders "From ₹18,500" alongside the transparent `priceBasis`.
2. `"request_quote"`: Renders "Price on Request" / "Request Price" button. Useful during peak festival seasons or when hotel tariffs fluctuate.
3. `"fixed"`: Renders "₹18,500" fixed rate.

### How to:
- **Update the starting cost**: Change `"priceAmount": 18500` to the new figure.
- **Switch to 'Request Quote'**: Set `"priceMode": "request_quote"` (leave `priceAmount: null` or existing number).
- **Change group size or basis**: Update the `"priceBasis"` string (e.g., `"per person based on 2 travellers"`).

---

## 4. Interactive Admin Dashboard (`/admin/pricing`)

For rapid in-browser adjustments:
1. Navigate to `/admin/pricing` on your running local or staging server.
2. View all package starting prices and vehicle daily rates in an interactive table.
3. Edit prices inline and click **Save Changes**. The server API updates the configuration, or you can export the updated JSON with one click.
