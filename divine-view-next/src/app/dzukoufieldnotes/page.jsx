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
    <div className={`${dmMono.variable} ${oswald.variable} ${manrope.variable}`}>
      <TrekGuide />
    </div>
  );
}
