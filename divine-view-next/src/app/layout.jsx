import { Cormorant_Garamond, Inter } from "next/font/google";
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

export const metadata = {
  title: {
    template: "%s | Divine View Tours — Guwahati",
    default: "Divine View Tours — Thoughtfully Planned Northeast India Journeys",
  },
  description:
    "Explore Meghalaya, Assam, Arunachal Pradesh, and Dzukou Valley. Handcrafted private itineraries, verified mountain drivers, and transparent vehicle rates from Guwahati.",
  keywords: [
    "Meghalaya tour packages from Guwahati",
    "Tawang tour package from Guwahati",
    "Kaziranga tour from Guwahati",
    "Dzukou Valley trek package",
    "Guwahati private car hire",
    "Divine View Tours Guwahati",
  ],
  metadataBase: new URL("https://www.divineviewtours.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Divine View Tours — Thoughtfully Planned Northeast India Journeys",
    description:
      "Handcrafted private journeys through Assam, Meghalaya, and Arunachal Pradesh with Dzukou Valley trekking.",
    url: "https://www.divineviewtours.com",
    siteName: "Divine View Tours",
    images: [
      {
        url: "/images/homescreen.jpg",
        width: 1200,
        height: 630,
        alt: "Scenic Meghalaya landscape with Divine View Tours",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Divine View Tours",
    image: "https://www.divineviewtours.com/images/homescreen.jpg",
    telephone: "+91-60265-04087",
    url: "https://www.divineviewtours.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guwahati",
      addressRegion: "Assam",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1445,
      longitude: 91.7362,
    },
    priceRange: "₹₹",
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
      opens: "08:00",
      closes: "21:00",
    },
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M96VXLSQ2C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M96VXLSQ2C');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#F7F3E9] text-[#172C26] antialiased">
        <Header />
        <div className="flex-1 w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
