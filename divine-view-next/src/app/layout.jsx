import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Divine View Tours — Guwahati",
    default: "Divine View Tours — Thoughtfully Planned Northeast India Journeys & Private Vehicle Hire",
  },
  description:
    "Explore Meghalaya, Assam, Arunachal Pradesh, and Dzukou Valley. Handcrafted private itineraries, verified mountain drivers, and transparent commercial vehicle hire rates from Guwahati.",
  keywords: [
    "Meghalaya tour packages from Guwahati",
    "Tawang tour package from Guwahati",
    "Kaziranga wildlife tour from Guwahati",
    "Dzukou Valley trek package",
    "Guwahati private car hire",
    "Guwahati airport taxi transfer",
    "Guwahati to Shillong taxi fare",
    "Innova Crysta hire Guwahati",
    "Tempo Traveller Guwahati rental",
    "Tourist Transporter Association Assam rates",
    "Divine View Tours Guwahati",
  ],
  metadataBase: new URL("https://www.divineviewtours.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Divine View Tours — Thoughtfully Planned Northeast India Journeys & Private Vehicle Hire",
    description:
      "Handcrafted private journeys through Assam, Meghalaya, and Arunachal Pradesh with Dzukou Valley trekking and approved vehicle hire rates from Guwahati.",
    url: "https://www.divineviewtours.com",
    siteName: "Divine View Tours",
    images: [
      {
        url: "/images/homescreen.jpg",
        width: 1200,
        height: 630,
        alt: "Scenic Northeast India landscape with Divine View Tours",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine View Tours — Thoughtfully Planned Northeast India Journeys",
    description:
      "Curated private road tours, certified mountain drivers, and transparent vehicle hire tariffs from Guwahati.",
    images: ["/images/homescreen.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-M96VXLSQ2C";

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.divineviewtours.com/#website",
        "url": "https://www.divineviewtours.com",
        "name": "Divine View Tours",
        "description": "Thoughtfully Planned Northeast India Journeys, Curated Holiday Packages & Private Vehicle Hire from Guwahati.",
        "inLanguage": "en-IN",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.divineviewtours.com/packages?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": ["TravelAgency", "LocalBusiness"],
        "@id": "https://www.divineviewtours.com/#organization",
        name: "Divine View Tours",
        legalName: "Divine View Tours",
        image: "https://www.divineviewtours.com/images/homescreen.jpg",
        logo: "https://www.divineviewtours.com/logo.png",
        telephone: "+91-6913-541211",
        url: "https://www.divineviewtours.com",
        email: "info@divineviewtours.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Guwahati City Hub",
          addressLocality: "Guwahati",
          addressRegion: "Assam",
          postalCode: "781001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 26.1445,
          longitude: 91.7362,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-6913-541211",
            email: "bookings@divineviewtours.com",
            contactType: "reservations",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Assamese"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-60265-04087",
            email: "info@divineviewtours.com",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Assamese"],
          },
        ],
        areaServed: [
          { "@type": "State", name: "Assam" },
          { "@type": "State", name: "Meghalaya" },
          { "@type": "State", name: "Arunachal Pradesh" },
          { "@type": "State", name: "Nagaland" },
        ],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Credit Card, Bank Transfer",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "22:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Divine View Services",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Curated Tour Packages",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meghalaya Tour Packages" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tawang Arunachal Road Expeditions" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kaziranga Wildlife Safaris" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dzukou Valley Treks" } },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "Private Vehicle Hire & Transfers",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guwahati Airport Transfer Taxi" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guwahati Local Sightseeing Cab" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guwahati to Shillong Return Taxi" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Day Outstation Tourist Car Rental" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tempo Traveller & Urbania Group Hire" } },
              ],
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#F7F3E9] text-[#172C26] antialiased">
        <Header />
        <div className="flex-1 w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
