import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: 'Divine View Tours | Premium Northeast India Travel',
  description: 'Expertly curated, high-margin travel packages and DMCs for Meghalaya, Assam, Arunachal Pradesh, and the wider Northeast.',
  alternates: {
    canonical: 'https://divineviewtours.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
