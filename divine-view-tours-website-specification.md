# Divine View Tours — Website Product & Development Specification

Version 1.0 · Developer handoff · 16 September 2026

## 1. Build objective

Build a fast, mobile-first travel website for Divine View Tours that:

1. Inspires visitors to explore Assam, Meghalaya, Arunachal Pradesh and Dzukou Valley.
2. Lets visitors browse suggested tour packages.
3. Lets visitors request a customised package.
4. Shows approved private-vehicle rates without presenting them as complete package prices.
5. Converts visitors into traceable enquiries through web forms, phone and WhatsApp.
6. Creates crawlable, useful destination content that can earn organic search traffic over time.

This is an enquiry-led booking system at launch. A booking becomes confirmed only after availability is checked, a written quotation is accepted and the required payment succeeds.

## 2. Source-of-truth hierarchy

If requirements conflict, use this order:

1. This development specification.
2. Approved business content, rates, policies and itineraries supplied by Divine View Tours.
3. The final brochure for current brand styling and public vehicle rates.
4. `design-b-scenic-escape.md` for the broader experience direction.
5. `website-b-scenic.png` as an illustrative visual reference only.

Do not invent prices, hotel names, testimonials, permits, availability, awards or guarantees.

## 3. Brand and visual direction

Translate the poster/brochure identity into a responsive digital system:

- Large scenic photography.
- Dark forest-green image overlays.
- Bold white uppercase hero headings.
- Small gold pill labels above key headings.
- Cream content backgrounds.
- Forest-green headers, cards and footer areas.
- Warm gold primary actions.
- Dark-green photograph-caption bars.
- Generous whitespace and simple information hierarchy.

### Design tokens

```css
:root {
  --forest: #103f36;
  --forest-deep: #082d27;
  --gold: #d9a441;
  --gold-hover: #c18d2d;
  --cream: #f7f3e9;
  --paper: #fffdf7;
  --ink: #172c26;
  --muted: #59665e;
  --divider: #dedccd;
  --pale-green: #e9f0ea;
  --pale-gold: #f4e5b9;
  --error: #9f2f24;
  --success: #237a50;
  --radius-card: 14px;
  --radius-control: 10px;
  --content-max: 1240px;
}
```

### Typography

- Use one production-ready sans-serif family with broad device support, such as Inter, Manrope or an approved brand font.
- Headings: weight 700–800; hero headings uppercase.
- Body: weight 400–500; minimum 16px on content pages.
- Buttons and short labels: weight 650–750.
- Do not use very light text over photographs.
- Do not render important wording inside images.

### Responsive layout

- Mobile-first breakpoints chosen by content, approximately 640px, 768px and 1024px.
- Main content maximum width: 1240px.
- Horizontal page padding: 20px mobile, 32px tablet and 40–48px desktop.
- Minimum interactive target: 44 × 44px.
- Primary buttons: at least 48px high.
- No horizontal scrolling at 320px viewport width.
- Mobile sticky booking bar must never cover page content or form controls.

## 4. User types and primary jobs

### Visitor who knows the destination

Needs to see highlights, packages, approximate duration, practical information and a clear enquiry action.

### Visitor comparing destinations

Needs destination cards, seasonal guidance, sample routes and “Help me choose”.

### Visitor who wants a complete package

Needs itinerary, inclusions, exclusions, price basis or “Request price”, and availability enquiry.

### Visitor who needs only a vehicle

Needs the vehicle-hire page, approved rates, minimum-duration rules and terms.

### Business administrator

Needs to edit destinations, packages, rates, FAQs, articles and enquiry statuses without changing code.

## 5. Information architecture and URLs

```text
/
├── destinations/
│   ├── assam/
│   ├── meghalaya/
│   ├── arunachal-pradesh/
│   └── dzukou-valley/
├── packages/
│   ├── [package-slug]/
│   └── ...
├── custom-trip/
├── vehicle-hire/
├── travel-guides/
│   ├── [article-slug]/
│   └── ...
├── about/
├── contact/
├── booking-terms/
├── cancellation-policy/
├── privacy/
├── enquiry/received/
└── booking/[reference]/
```

Do not use hash-based routes. Every destination, package and article must have a stable, directly accessible URL.

### Main navigation

- Logo → Home
- Destinations
- Packages
- Custom Trips
- Vehicle Hire
- Travel Guides
- Primary CTA: Plan my trip

### Mobile navigation

- Logo, menu button and compact “Plan my trip” action.
- Full-screen or drawer menu with labelled links.
- Preserve keyboard focus inside the open menu and restore it when closed.

## 6. Homepage specification

### 6.1 Header

- Transparent over the hero at the top of the page.
- Changes to solid deep forest after the hero or while scrolling.
- Persistent but not oversized.
- Phone and WhatsApp may appear in a slim desktop utility row; keep mobile header uncluttered.

### 6.2 Hero

- Full-width Meghalaya or Northeast scenic photograph.
- Dark left-to-right overlay for text legibility.
- Gold pill: `PRIVATE JOURNEYS FROM GUWAHATI`.
- Heading: `FIND YOUR OWN NORTHEAST.`
- Supporting text naming Assam, Meghalaya, Arunachal Pradesh and Dzukou Valley.
- Primary CTA: `Explore packages`.
- Secondary CTA: `Create my trip`.
- Optional verified location caption in a dark-green caption bar.

Use an optimised responsive image, preload only the hero image and reserve its dimensions to avoid layout shift.

### 6.3 Journey finder

Fields:

- Destination: Assam, Meghalaya, Arunachal Pradesh, Dzukou Valley, Help me choose.
- Travel month: month/year or Flexible.
- Travellers: adults and children.
- Duration: 3–5, 6–8, 9–12, 13+ days or Flexible.
- Submit: `Find my journey`.

The result page filters genuine published packages. If none match, show nearby options and `Create my trip`; never show an unexplained empty section.

### 6.4 Featured packages

- Three cards desktop; one column mobile.
- Each card contains image, title, destination, duration, summary, main stops, price basis or `Request price`, and `View itinerary`.
- Initial recommended set:
  - Meghalaya Escape.
  - Tawang Discovery.
  - Assam Wildlife Journey.
  - Dzukou Valley Trek.

### 6.5 Explore by destination

Four photo-led cards:

- Assam.
- Meghalaya.
- Arunachal Pradesh.
- Dzukou Valley Trek — label as Nagaland / Manipur.

### 6.6 Custom-trip banner

- Wide scenic photograph with overlay.
- Heading: `PLAN A JOURNEY THAT’S UNIQUELY YOURS.`
- CTA: `Create my trip`.

### 6.7 Trust section

Use only verified information:

- Real team introduction.
- Actual contact details.
- Genuine reviews with source and permission.
- Clear explanation of planning, quote and confirmation.
- No fabricated guest count, rating, award or guarantee.

### 6.8 Travel guides

Show three recent useful articles, then link to all guides. Each card contains image, title, short description, update date and author/reviewer when available.

### 6.9 Footer

- Logo and short brand statement.
- Destinations and packages.
- Vehicle hire.
- Policies.
- Phone: `+91 60265 04087`.
- WhatsApp link using international digits only: `https://wa.me/916026504087`.
- Website/domain text: `divineviewtours.com`.
- Business address and opening hours only when verified.

## 7. Destination page template

Each destination page must include:

1. Scenic hero with gold category pill, uppercase white heading and verified caption.
2. Short destination overview.
3. Key places to visit.
4. Suggested trip duration.
5. Recommended season with honest trade-offs.
6. Typical route from Guwahati.
7. Road-time expectations.
8. Permits or local transport notes where applicable.
9. Suitable packages.
10. FAQs.
11. Custom-trip CTA.
12. Related travel guides.

### Destination-specific minimum content

#### Assam

Kamakhya Temple, Guwahati, Kaziranga, Manas and Brahmaputra experiences.

#### Meghalaya

Shillong, Cherrapunji/Sohra, Dawki/Shnongpdeng, Mawlynnong, waterfalls and living-root landscapes.

#### Arunachal Pradesh

Bomdila, Dirang, Sela landscapes, Tawang, Mechuka and Anini. Clearly distinguish standard Tawang routes from East Arunachal routes and explain that route/permit/local-vehicle rules may affect the final quote.

#### Dzukou Valley

Clearly state that this is a Nagaland/Manipur trek experience. Include departure point, expected walking, difficulty, accommodation style, guide/support inclusion and weather-related changes.

## 8. Package listing page

### Filters

- Destination.
- Duration.
- Travel style: scenic, wildlife, culture, family, road trip, trek.
- Price band only after comparable package prices are approved.

### Behaviour

- Filters update a shareable query-string URL.
- Search result pages are `noindex,follow` unless a curated filter landing page is intentionally created.
- Show result count and reset action.
- Preserve filters when the visitor opens a package and returns.
- Show a custom-trip alternative when no result matches.

## 9. Package detail page

Content order:

1. Breadcrumbs.
2. Gallery and verified captions.
3. Package title and short overview.
4. Destination, duration, pickup/drop, travel style and physical effort.
5. Main highlights.
6. Route map or route sequence.
7. Day-by-day itinerary with realistic drive times.
8. Stay category and room basis.
9. Vehicle options.
10. Inclusions.
11. Exclusions.
12. Price basis or `Request price`.
13. Optional extras.
14. Permit, season, weather and accessibility notes.
15. Payment and cancellation summary.
16. FAQs.
17. Related packages and guides.

Desktop uses a sticky enquiry summary column. Mobile uses a bottom action bar with:

- `Check availability`.
- `Customise this trip`.

The sticky area must stop before the footer and must not cover content.

## 10. Custom-trip planner

Use a four-step form with a visible progress indicator. Save progress in local storage and server-side after contact details are submitted.

### Step 1 — Where and when

- Destination interests, multiple allowed.
- Exact dates or flexible month.
- Trip length or flexible.
- Start location; default Guwahati.

### Step 2 — Travellers

- Adults.
- Children and ages when relevant.
- Senior travellers.
- Mobility or accessibility requests, optional.

### Step 3 — Travel style

- Interests.
- Pace.
- Stay preference.
- Vehicle preference.
- Total group budget range.
- Whether budget includes flights.
- Free-text requests.

### Step 4 — Review and send

- Editable summary.
- Name.
- Phone/WhatsApp.
- Email, optional unless required for quotations.
- Preferred contact method.
- Privacy consent.

After submission, show a unique enquiry reference, complete summary and next-step explanation. Do not promise a response time until the business approves one.

## 11. Suggested-package enquiry flow

```text
Landing page / search / destination
  → Package detail
  → Check availability
  → Dates + travellers + preferences
  → Contact details + review
  → Enquiry received with reference
  → Team checks route, hotel and vehicle availability
  → Written itinerary and quote
  → Customer accepts terms
  → Hosted deposit payment
  → Server verifies payment
  → Booking confirmed
```

Never mark a booking confirmed from a browser return URL alone. Confirmation requires a verified provider event or server-side payment check.

## 12. Vehicle-hire page and approved rates

Vehicle fares must be a separate service type from complete tour packages. Display `Vehicle fare only` near the table and explain that accommodation, meals, guide, permits, safari/entry fees and other exclusions depend on the written quote.

### Current public daily rates

These values include the approved 15% service margin and are rounded as approved in the brochure.

| Route / minimum duration | Sedan | Ertiga | Crysta |
| --- | ---: | ---: | ---: |
| Meghalaya · 5 days+ | ₹5,300 | ₹6,100 | ₹7,300 |
| Meghalaya + Kaziranga · 7 days+ | ₹5,300 | ₹6,100 | ₹7,300 |
| Tawang · 6 days+ | ₹6,000 | ₹6,700 | ₹7,900 |
| Tawang + Kaziranga · 8 days+ | ₹6,000 | ₹6,700 | ₹7,900 |
| Meghalaya + Kaziranga + Tawang · 11 days+ | ₹6,000 | ₹6,700 | ₹7,900 |
| Meghalaya Offbeat · 9 days+ | ₹6,000 | ₹6,700 | ₹7,900 |
| East Arunachal — Mechuka / Anini · 7 days+ | Not offered | ₹6,900 | ₹8,100 |

### Rate implementation rules

- Store rates in the CMS/database; do not hard-code them in components.
- Store `effectiveFrom`, optional `effectiveTo`, vehicle, route, minimum days and public amount.
- Render the effective date and `until revised` where approved.
- Never expose supplier/base rates or the margin-calculation formula in the public client bundle.
- Do not calculate package totals by multiplying these rates; final package pricing needs its own costing.
- If a route does not support a vehicle, display `Not offered`, not zero.
- Require admin confirmation before a changed rate is published.

## 13. Core content models

The exact storage technology is flexible, but the model must support these fields.

### Destination

```ts
type Destination = {
  id: string;
  slug: string;
  name: string;
  regionLabel?: string;
  heroImage: Media;
  heroCaption?: string;
  summary: string;
  body: RichText;
  highlights: Highlight[];
  bestTime: RichText;
  routeFromGuwahati?: RichText;
  permitNotes?: RichText;
  faqs: FAQ[];
  seo: SEOFields;
  status: "draft" | "published";
  reviewedAt: string;
};
```

### Package

```ts
type Package = {
  id: string;
  slug: string;
  title: string;
  destinationIds: string[];
  durationDays: number;
  durationNights?: number;
  pickup: string;
  dropoff: string;
  travelStyles: string[];
  summary: string;
  gallery: Media[];
  highlights: string[];
  itinerary: ItineraryDay[];
  stayOptions: RichText;
  vehicleOptions: string[];
  inclusions: string[];
  exclusions: string[];
  practicalNotes: RichText;
  priceMode: "fixed" | "starting_from" | "request_quote";
  priceAmount?: number;
  priceCurrency: "INR";
  priceBasis?: string;
  termsSummary: RichText;
  faqs: FAQ[];
  seo: SEOFields;
  featured: boolean;
  status: "draft" | "published" | "archived";
  reviewedAt: string;
};
```

### Vehicle rate

```ts
type VehicleRate = {
  id: string;
  routeName: string;
  routeSlug: string;
  minimumDays: number;
  vehicle: "sedan" | "ertiga" | "crysta";
  publicDailyAmount: number | null;
  currency: "INR";
  effectiveFrom: string;
  effectiveTo?: string;
  notes?: string;
  status: "draft" | "published" | "retired";
};
```

### Enquiry

```ts
type Enquiry = {
  id: string;
  publicReference: string;
  type: "package" | "custom_trip" | "vehicle_hire";
  packageId?: string;
  destinations: string[];
  startDate?: string;
  flexibleMonth?: string;
  durationDays?: number;
  adults: number;
  children?: { age: number }[];
  pickup?: string;
  preferences?: Record<string, unknown>;
  customerName: string;
  phone: string;
  email?: string;
  preferredContact: "whatsapp" | "phone" | "email";
  consentAcceptedAt: string;
  source: AcquisitionSource;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};
```

### Article

Fields: slug, title, description, hero image/caption, body, author/reviewer, published date, reviewed/updated date, related destinations, related packages, SEO fields and publication status.

## 14. Enquiry and booking states

### Enquiry states

```text
new
→ contacted
→ planning
→ quoted
→ customer_review
→ accepted
→ payment_pending
→ converted

Alternative terminal states: declined, expired, duplicate, spam
```

### Booking states

```text
draft
→ awaiting_deposit
→ payment_processing
→ confirmed
→ completed

Alternative states: payment_failed, cancelled, refund_pending, refunded
```

Log every status change with timestamp and actor. Do not delete booking or payment audit history.

## 15. API contract

Exact endpoint naming may follow the chosen framework, but support these operations:

```text
GET    /api/destinations
GET    /api/destinations/:slug
GET    /api/packages
GET    /api/packages/:slug
GET    /api/vehicle-rates
POST   /api/enquiries/package
POST   /api/enquiries/custom
POST   /api/enquiries/vehicle
GET    /api/enquiries/:publicReference/receipt
POST   /api/quotes/:token/accept
POST   /api/payments/session
POST   /api/payments/webhook
GET    /api/bookings/:reference
```

### API rules

- Validate all inputs on the server.
- Return structured field errors without exposing internal details.
- Rate-limit public form endpoints.
- Use idempotency for enquiry creation and payment operations.
- Verify payment webhook signatures.
- Never trust package price, deposit amount or booking state sent by the browser.
- Keep admin endpoints authenticated and authorised by role.

## 16. Forms and validation

- Show persistent labels, not placeholder-only labels.
- Validate after blur and on submission without clearing entered data.
- Move focus to the first invalid field after submission.
- Provide an error summary for longer forms.
- Accept Indian and international phone formats; normalise before storage.
- Store dates in ISO format and display them in the visitor’s chosen format.
- Protect forms with rate limiting and a low-friction anti-spam mechanism.
- Do not collect passport, Aadhaar, permit document or payment-card data during the initial enquiry.
- Provide a clear consent statement linking to the privacy policy.

## 17. Administrator/CMS requirements

The administrator must be able to:

- Create, edit, preview, publish and archive destinations.
- Create, edit, preview, publish and archive packages.
- Reorder itinerary days and highlights.
- Manage approved public vehicle rates with effective dates.
- Create and update FAQs and travel guides.
- Upload images, captions, alt text and image-credit information.
- View enquiries and update their status.
- Export enquiries as CSV.
- Record quote/booking references without exposing internal notes publicly.
- Redirect retired URLs.
- See who changed rates or booking states and when.

Use role-based access: administrator, content editor and enquiry manager.

## 18. SEO implementation requirements

Organic visibility comes from useful, factual content and sound technical implementation; do not promise a ranking position.

### Rendering and crawlability

- Server-render or statically generate destination, package and article content.
- The primary content must exist in rendered HTML and must not require interaction to load.
- Navigation must use crawlable `<a href>` links.
- Provide a self-referencing canonical URL on indexable pages.
- Generate an XML sitemap containing only canonical published pages.
- Maintain a valid `robots.txt` and do not accidentally block production assets.
- Use permanent redirects when URLs change.

### Page metadata

Every indexable page needs:

- Unique HTML title.
- Unique meta description.
- One descriptive H1.
- Logical H2/H3 hierarchy.
- Canonical URL.
- Open Graph title, description and image.
- Appropriate social-card metadata.

### Structured data

Use JSON-LD only when it matches visible, verified content:

- `Organization` or the most appropriate supported `LocalBusiness` type on business/contact pages.
- `BreadcrumbList` on internal pages.
- `Article` on genuine travel guides.
- Do not add self-serving aggregate review ratings or unsupported price/availability claims.
- Validate structured data before deployment.

### Content requirements

- Separate destination intent, package intent and vehicle-hire intent.
- Each page must answer a distinct visitor need rather than swapping place names in duplicated copy.
- Include first-hand operational details: route planning, realistic driving, seasonal trade-offs and what the business actually arranges.
- Link destinations to packages and guides; link guides back to relevant destination and package pages.
- Add reviewed/updated dates only when a human actually checks the content.
- Avoid guaranteed wildlife sightings, clear river water, snowfall or unrestricted road access.

### Technical SEO QA

- Verify the production property in Google Search Console.
- Submit the sitemap.
- Test representative URLs through URL Inspection.
- Validate responsive layout and rendered HTML.
- Test canonical, redirect, not-found and noindex behaviour.

Official implementation references:

- [Google Search developer guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)

## 19. Analytics and conversion measurement

Measure events without storing sensitive form content in analytics:

```text
view_destination
view_package
use_journey_finder
start_package_enquiry
submit_package_enquiry
start_custom_trip
complete_custom_trip_step
submit_custom_trip
view_vehicle_rates
start_vehicle_enquiry
submit_vehicle_enquiry
click_whatsapp
click_phone
accept_quote
start_payment
payment_success
booking_confirmed
```

Required event properties: page path, package/destination ID where relevant, device category, campaign/source and anonymous session identifier. Never send name, phone, email, free-text request or payment details to analytics.

## 20. Performance requirements

- Meet current Core Web Vitals expectations on representative mobile devices and real production hosting.
- Avoid a heavy carousel or autoplay hero video at launch.
- Use responsive AVIF/WebP images with appropriate fallbacks.
- Preload only critical fonts and the hero image.
- Self-host fonts where licensing permits and use `font-display: swap`.
- Lazy-load below-the-fold media.
- Reserve image dimensions.
- Defer non-essential scripts.
- Keep third-party chat, tracking and review scripts to a minimum.
- Add suitable caching for static assets and versioned filenames.

## 21. Accessibility requirements

Target WCAG 2.2 AA:

- Semantic landmarks and heading order.
- Keyboard-operable menus, filters, galleries, accordions and forms.
- Visible focus styles.
- Sufficient colour contrast, including text over images.
- Informative alt text for meaningful photographs and empty alt text for decorative images.
- Form labels, descriptions and errors associated programmatically.
- Status messages announced to assistive technology.
- Reduced-motion support.
- No information conveyed only by colour.
- Zoom and text resizing without lost content.

## 22. Security and privacy

- HTTPS everywhere.
- Secure, HTTP-only and same-site cookies where cookies are used.
- CSRF protection for authenticated/state-changing operations.
- Output encoding and content sanitisation for CMS rich text.
- Strict validation of uploaded file types and sizes.
- Role-based admin access with strong authentication.
- Secrets kept server-side and out of the repository/client bundle.
- Minimal personal-data collection.
- Documented retention and deletion policy for enquiries.
- Backups and tested restore procedure.
- Payment-card details handled only by a compliant hosted payment provider.
- Security logging without recording passwords, payment data or full sensitive form payloads.

## 23. Error and empty states

Implement designed states for:

- No package matches.
- Form validation error.
- Submission temporarily unavailable.
- Duplicate submission.
- Expired quote link.
- Payment failed or abandoned.
- Package unpublished after an enquiry was started.
- Offline/poor connection during a multi-step form.
- 404 and 500 pages.

Always preserve customer input where safe and provide a clear recovery action.

## 24. Testing requirements

### Automated

- Unit tests for pricing display, validation and status transitions.
- Integration tests for enquiry creation and notifications.
- End-to-end tests for package enquiry, custom-trip enquiry and vehicle enquiry.
- Payment webhook and idempotency tests when payments launch.
- Accessibility checks on main templates.
- Sitemap, canonical and metadata tests.

### Manual

- Current Chrome, Edge, Safari and Firefox.
- iOS Safari and Android Chrome.
- Keyboard-only navigation.
- Screen-reader smoke test.
- Slow mobile network and small-screen test.
- Form resubmission and back-button behaviour.
- Printed/downloaded quotation review if quotations are generated.

## 25. Definition of done

The initial website is complete when:

- Homepage matches the approved poster-style visual system.
- All four destination pages are published with verified content.
- At least four real package pages are complete.
- Package, custom-trip and vehicle enquiries create traceable references and reach the operating team.
- Public vehicle rates match the approved rate table.
- Vehicle-only and package pricing are clearly distinguished.
- Admin users can manage content, rates and enquiries.
- Forms work on mobile, preserve data and provide accessible errors.
- Published pages are crawlable, canonical and present in the sitemap.
- Search Console and privacy-safe conversion measurement are configured.
- Accessibility, responsive, security and performance QA pass.
- No placeholder price, fabricated review, unverified claim or mock confirmation remains.

## 26. Recommended implementation phases

### Phase 1 — Foundation

Design system, content models, CMS, header/footer, homepage and destination templates.

### Phase 2 — Conversion

Package pages, filters, custom planner, vehicle-hire page, enquiry APIs and team notifications.

### Phase 3 — Operations

Admin enquiry workflow, quote acceptance, payment provider and booking confirmation.

### Phase 4 — Organic growth

Travel-guide publishing workflow, internal-linking improvements, Search Console monitoring and content updates based on real search/enquiry data.

## 27. Required business inputs before launch

- Original logo files and approved brand assets.
- Rights-cleared destination, vehicle, team and customer photographs.
- Final package itineraries and realistic drive-time estimates.
- Package prices or approved `Request price` treatment.
- Hotel/stay categories and vehicle capacity rules.
- Complete booking, cancellation, refund and privacy policies.
- Verified business address and working hours if they will be published.
- Approved response-time wording.
- Payment-provider account and deposit rules.
- Genuine reviews and permission to publish them.
- Email/CRM destination for enquiries.
- Domain, hosting, analytics and Search Console access.

## 28. Copyable instruction for the development agent

> Build the Divine View Tours website according to `divine-view-tours-website-specification.md`. Treat this file as the functional source of truth and use `design-b-scenic-escape.md`, `website-b-scenic.png` and the final brochure only as supporting visual references. Implement mobile-first, accessible, server-rendered public pages; CMS-managed destinations, packages, articles and vehicle rates; package/custom/vehicle enquiry flows with traceable references; and SEO-ready canonical pages. Do not invent business facts or expose supplier rates. Do not treat an enquiry as a confirmed booking, and do not treat vehicle-only daily rates as package prices. Use safe placeholders or `Request price` for any unapproved content and clearly list all business inputs still required before production launch.
