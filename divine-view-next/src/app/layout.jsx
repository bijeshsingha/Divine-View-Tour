import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: {
    template: '%s | Divine View Tours Guwahati',
    default: 'Premium Northeast India Tour Packages | Divine View Tours Guwahati',
  },
  description: 'Expertly curated travel packages and DMCs for Meghalaya, Assam, and Arunachal Pradesh. Book your Kaziranga Jeep Safari 2026, Guwahati to Tawang 7 day itinerary, or luxury homestays in Cherrapunji today.',
  keywords: ['Northeast India Tours', 'Meghalaya packages', 'Kaziranga Jeep Safari booking 2026', 'Guwahati to Tawang 7 day itinerary', 'Luxury homestays in Cherrapunji', 'Divine View Tours Guwahati'],
  alternates: {
    canonical: 'https://www.divineviewtours.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
