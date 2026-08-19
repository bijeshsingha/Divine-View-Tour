import { DM_Mono, Oswald, Manrope } from "next/font/google";
import TrekGuide from "@/components/TrekGuide";
import "./dzukou.css";

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const oswald = Oswald({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Dzukou Valley Trek Guide 2026 | Divine View Tours",
  description: "A practical, visual trek planner and field guide from Guwahati to Dzukou Valley, Nagaland.",
};

export default function DzukouPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;500;600;700&family=Oswald:wght@500;600&display=swap"
      />
      <div className={`${dmMono.variable} ${oswald.variable} ${manrope.variable}`}>
        <TrekGuide />
      </div>
    </>
  );
}
