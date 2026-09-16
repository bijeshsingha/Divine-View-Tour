import Link from "next/link";
import { Compass, ShieldCheck, MapPin, Users, HeartHandshake, ArrowRight } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";

export const metadata = {
  title: "About Us — Divine View Tours Guwahati",
  description:
    "Learn about Divine View Tours, an experienced local travel company headquartered in Guwahati, Assam. Handcrafted private overland journeys and trusted mountain fleet.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9] text-[#172C26] pt-24 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="badge-forest mb-2">Local Operating Experience</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103F36]">
            Rooted in Guwahati. Inspired by the Northeast.
          </h1>
          <p className="text-sm sm:text-base text-[#59665E] mt-3 leading-relaxed">
            We are a team of passionate route coordinators, logistics planners, and mountain drivers headquartered at the commercial heart of Assam.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4 text-sm sm:text-base text-[#59665E] leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
              Our Operating Philosophy
            </h2>
            <p>
              Travel in Northeast India is glorious, wild, and deeply scenic. But it also requires realistic driving estimates, careful checkpoint planning, and verified mountain vehicles.
            </p>
            <p>
              Unlike distant national booking aggregators who treat Guwahati as just another airport pin, we operate directly on the ground. We manage our own commercial vehicles, maintain long-standing relationships with Khasi, Monpa, and Naga homestay hosts, and track mountain weather every morning.
            </p>
            <p>
              We believe in honest, upfront pricing. We clearly separate vehicle hire from complete holiday packages, and we never promise unrealistic drive times or seasonal guarantees.
            </p>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden bg-[#082D27] shadow-xl">
            <img
              src="/images/Meghalaya/Shillong/Elephant Falls.jpg"
              alt="Meghalaya waterfalls"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="caption-bar text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
                Elephant Falls, Shillong — 3 hours from our Guwahati office
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {siteConfig.trustPoints.map((tp, i) => (
            <div
              key={i}
              className="bg-[#FFFDF7] p-6 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-2"
            >
              <div className="w-8 h-8 rounded-full bg-[#E9F0EA] text-[#103F36] flex items-center justify-center font-bold text-xs">
                0{i + 1}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#103F36]">
                {tp.title}
              </h3>
              <p className="text-xs text-[#59665E] leading-relaxed">
                {tp.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#103F36] text-[#F7F3E9] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Ready to plan your Northeast holiday?
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F3E9]/80">
              Speak with our local Guwahati team on WhatsApp or send a custom itinerary request.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/custom-trip" className="btn-gold !py-3 !px-6 text-sm">
              Plan My Trip
            </Link>
            <Link href="/contact" className="btn-outline-cream !py-3 !px-5 text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
