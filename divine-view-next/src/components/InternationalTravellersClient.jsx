"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Plane,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Utensils,
  Car,
  FileText,
  HelpCircle,
  ChevronDown,
  Globe,
  Sparkles,
  BedDouble,
  Layers,
} from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import countryCodes from "@/data/countryCodes.json";
import siteConfig from "@/data/siteConfig.json";
import {
  initCampaignTracking,
  getCampaignData,
  trackEnquirySubmitted,
  trackContactIntent,
} from "@/lib/campaignTracking";

export default function InternationalTravellersClient() {
  const router = useRouter();

  // Currency display state (indicative)
  const [currency, setCurrency] = useState("USD"); // "INR" | "USD" | "GBP" | "EUR"

  const exchangeRates = {
    INR: 1,
    USD: 1 / 83.5,
    GBP: 1 / 108.5,
    EUR: 1 / 91.5,
  };

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    GBP: "£",
    EUR: "€",
  };

  const formatPrice = (inrAmount) => {
    if (currency === "INR") {
      return `₹${inrAmount.toLocaleString("en-IN")}`;
    }
    const converted = Math.round(inrAmount * exchangeRates[currency]);
    return `${currencySymbols[currency]}${converted.toLocaleString("en-US")} (~₹${inrAmount.toLocaleString("en-IN")})`;
  };

  // Tier definitions for both lead international journeys
  const packageTiers = {
    "kaziranga-wildlife-tour-from-guwahati": {
      comfort: {
        id: "comfort",
        label: "Comfort (3-Star)",
        badge: "3-Star Eco-Resorts",
        price: 16500,
        stayDesc: "Handpicked 3-star wildlife eco-resorts (e.g. Nature-Hunt Eco Camp, Wild Grass standard cottages). Attached private Western bathroom, geyser with running hot water.",
        vehicleDesc: "Dedicated private AC Maruti Ertiga or tourist sedan with yellow commercial registration plate.",
        guidingDesc: "Verified mountain chauffeur (English and Hindi proficient) + 2 private 4x4 Gypsy safaris with certified Forest Department wildlife naturalist.",
        mealsDesc: "Daily breakfast included at resort.",
        perks: [
          "2 Private 4x4 Gypsy safaris (Central & Western ranges)",
          "Certified forest naturalist inside national park",
          "Private airport transfers from Guwahati (GAU)",
          "Brahmaputra sunset cruise ticket included",
        ],
      },
      premium: {
        id: "premium",
        label: "Premium Boutique (4-Star)",
        badge: "4-Star Heritage Stays",
        price: 26500,
        stayDesc: "4-star boutique jungle lodges & heritage tea estates (e.g. Iora The Retreat, Borgos Resort, Infinity Kaziranga). Garden view cottages, swimming pool, and tea garden trails.",
        vehicleDesc: "Upgraded private Toyota Innova Crysta for supreme highway comfort, plush captain seats, and ample luggage capacity.",
        guidingDesc: "Dedicated senior English-fluent chauffeur + 2 private 4x4 Gypsy safaris with senior certified wildlife naturalist + dedicated optical binoculars.",
        mealsDesc: "Daily breakfast + 1 authentic Assamese culinary thali dinner.",
        perks: [
          "Upgraded stay at premier 4-star boutique jungle resort",
          "Private Toyota Innova Crysta throughout the journey",
          "Dedicated optical binoculars provided for each vehicle",
          "Specialty Assamese ethnic culinary dinner experience",
        ],
      },
      luxury: {
        id: "luxury",
        label: "Luxury Experiential (5-Star)",
        badge: "5-Star Riverfront Estate",
        price: 44500,
        stayDesc: "Ultra-luxury riverside wildlife estate / signature safari cottages (e.g. Diphlu River Lodge or signature river-facing stilt cottages) overlooking the national park border.",
        vehicleDesc: "Executive Toyota Innova Crysta with in-car mobile Wi-Fi hotspot, mineral water, wet wipes, and curated road snacks.",
        guidingDesc: "Master wildlife naturalist escort throughout safaris + 24/7 personal trip concierge manager on WhatsApp and phone.",
        mealsDesc: "Full Board (All meals: artisanal breakfast, jungle picnic lunch, and chef-curated organic dinners).",
        perks: [
          "Ultra-luxury riverfront stilt cottage stay with panoramic views",
          "Full Board (All gourmet breakfasts, lunches, and chef dinners)",
          "Private Brahmaputra sunset boat cruise with high-tea refreshments",
          "Swarovski/Nikon optics + priority safari range slot scheduling",
        ],
      },
    },
    "meghalaya-kaziranga-combo-tour": {
      comfort: {
        id: "comfort",
        label: "Comfort (3-Star)",
        badge: "3-Star Eco-Lodges & Hills",
        price: 29500,
        stayDesc: "Verified 3-star mountain hotels, cozy Khasi guesthouses, and Kaziranga eco-resorts with attached private Western bathrooms and hot water geysers.",
        vehicleDesc: "Dedicated private AC Maruti Ertiga or tourist sedan with yellow commercial plate.",
        guidingDesc: "Verified mountain driver (English and Hindi proficient) + 2 Kaziranga 4x4 safaris with forest naturalist + Umngot river boating in Dawki.",
        mealsDesc: "Daily breakfast included at all destinations.",
        perks: [
          "2 Private Kaziranga 4x4 safaris with licensed forest guides",
          "Shillong, Cherrapunjee waterfalls, and Mawlynnong clean village",
          "Private country boat excursion on crystal Umngot River",
          "Guwahati GAU airport pickup and drop-off included",
        ],
      },
      premium: {
        id: "premium",
        label: "Premium Boutique (4-Star)",
        badge: "4-Star Heritage & Views",
        price: 48500,
        stayDesc: "Handpicked boutique lake and valley resorts (e.g. Ri Kynjai Lake View Shillong, Polo Orchid Cherrapunjee with waterfall vistas, Dawki riverside cottage, Iora / Borgos Kaziranga).",
        vehicleDesc: "Upgraded private Toyota Innova Crysta for comfort across mountain passes and highway transits.",
        guidingDesc: "Senior English-fluent mountain chauffeur + certified senior naturalist at Kaziranga + licensed local Khasi guide at root bridges and waterfalls.",
        mealsDesc: "Daily breakfast + 2 regional specialty dinners (Khasi indigenous dinner & authentic Assamese feast).",
        perks: [
          "Premier boutique stays with valley, waterfall, or lake views",
          "Private Toyota Innova Crysta for smooth mountain ride",
          "High-power safari binoculars provided in vehicle",
          "Two curated cultural dinners celebrating tribal cuisines",
        ],
      },
      luxury: {
        id: "luxury",
        label: "Luxury Experiential (5-Star)",
        badge: "5-Star Premier Signature",
        price: 79500,
        stayDesc: "Premier signature luxury suites (Ri Kynjai Lake View Khasi thatch cottage, Polo Orchid villa with plunge pool or valley view, Diphlu River Lodge Kaziranga riverfront retreat).",
        vehicleDesc: "Executive Toyota Innova Crysta with in-car mobile Wi-Fi, refreshments, gourmet snacks, and daily detailing.",
        guidingDesc: "Master wildlife naturalist at Kaziranga + private cultural guides throughout Meghalaya + 24/7 personal trip concierge manager.",
        mealsDesc: "Full Board (All meals: daily gourmet breakfasts, curated excursion lunches, and private multi-course dinners).",
        perks: [
          "Top-tier luxury cottages with private decks and panoramic vistas",
          "Full Board (All meals included throughout 8 days)",
          "Private sunset yacht cruise on Brahmaputra with refreshments",
          "Exclusive Khasi village cultural engagement + tea tasting",
        ],
      },
    },
  };

  // Selected tiers state for the two packages
  const [kazirangaTier, setKazirangaTier] = useState("comfort");
  const [comboTier, setComboTier] = useState("premium");

  // Enquiry form state
  const [formData, setFormData] = useState({
    customerName: "",
    countryOfResidence: "United States",
    countryCode: "+1",
    phone: "",
    email: "",
    preferredContact: "whatsapp",
    packageInterest: "meghalaya-kaziranga-combo-tour",
    tier: "Premium Boutique (4-Star)",
    travelMonth: "November 2026",
    adults: 2,
    childrenCount: 0,
    dietaryOrAccessibility: "",
    notes: "",
    website_hp: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initCampaignTracking();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectPackageAndTier = (packageSlug, tierKey) => {
    const tierConfig = packageTiers[packageSlug][tierKey];
    setFormData((prev) => ({
      ...prev,
      packageInterest: packageSlug,
      tier: tierConfig.label,
    }));

    if (packageSlug === "kaziranga-wildlife-tour-from-guwahati") {
      setKazirangaTier(tierKey);
    } else {
      setComboTier(tierKey);
    }

    const formElement = document.getElementById("enquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const errors = {};
    if (!formData.customerName.trim()) {
      errors.customerName = "Please enter your full name.";
    }
    if (!formData.countryOfResidence.trim()) {
      errors.countryOfResidence = "Please state your country of residence.";
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      errors.phone = "Please provide either an international WhatsApp number or an email address.";
      errors.email = "Please provide either an international WhatsApp number or an email address.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const fullPhone = formData.phone.startsWith("+")
        ? formData.phone
        : `${formData.countryCode} ${formData.phone}`.trim();

      const campaignData = getCampaignData();

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "international",
          packageId: formData.packageInterest,
          packageTitle:
            formData.packageInterest === "kaziranga-wildlife-tour-from-guwahati"
              ? "Assam Wildlife: Kaziranga Rhino Safari (4D/3N)"
              : formData.packageInterest === "meghalaya-kaziranga-combo-tour"
              ? "Meghalaya & Kaziranga: Highlands and Wildlife Safari (8D/7N)"
              : formData.packageInterest === "meghalaya-5-day-tour-from-guwahati"
              ? "Meghalaya Highlands & Waterfalls (5D/4N)"
              : formData.packageInterest === "tawang-7-day-tour-from-guwahati"
              ? "Tawang & Western Arunachal (7D/6N)"
              : "Custom Private Northeast Journey",
          tier: formData.tier,
          customerName: formData.customerName,
          countryOfResidence: formData.countryOfResidence,
          countryCode: formData.countryCode,
          phone: fullPhone,
          email: formData.email,
          preferredContact: formData.preferredContact,
          flexibleMonth: formData.travelMonth,
          adults: parseInt(formData.adults, 10) || 2,
          childrenCount: parseInt(formData.childrenCount, 10) || 0,
          travellers: `${formData.adults} adults${formData.childrenCount > 0 ? `, ${formData.childrenCount} children` : ""}`,
          notes: `Interested Trip: ${formData.packageInterest}. Preferred Tier: ${formData.tier}. Dietary/Access: ${formData.dietaryOrAccessibility}. Notes: ${formData.notes}`,
          website_hp: formData.website_hp,
          ...campaignData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reference) {
        trackEnquirySubmitted(data.reference, formData.packageInterest);
        router.push(`/enquiry/received?ref=${data.reference}&pkg=${formData.packageInterest}`);
      } else if (data.errors) {
        setFormErrors(data.errors);
      } else {
        alert(data.error || "Please check your details and try again.");
      }
    } catch (err) {
      console.error("International enquiry error:", err);
      const fallbackRef = "DVT-INT-2026";
      router.push(`/enquiry/received?ref=${fallbackRef}&pkg=${formData.packageInterest}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentKazirangaTier = packageTiers["kaziranga-wildlife-tour-from-guwahati"][kazirangaTier];
  const currentComboTier = packageTiers["meghalaya-kaziranga-combo-tour"][comboTier];

  return (
    <div>
      {/* Indicative Currency Switcher Bar */}
      <div className="bg-[#082D27] border-b border-[#103F36] py-2.5 px-4 sticky top-[72px] z-30 shadow-md">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-[#F7F3E9]/80">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#D9A441]" />
            <span>Indicative currency preview:</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#103F36] p-1 rounded-lg border border-[#D9A441]/30">
            {["USD", "GBP", "EUR", "INR"].map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrency(cur)}
                className={`min-h-[32px] px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  currency === cur
                    ? "bg-[#D9A441] text-[#172C26]"
                    : "text-[#F7F3E9] hover:text-[#D9A441]"
                }`}
                aria-pressed={currency === cur}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Lead Journeys Section with Interactive Tier Selection */}
      <section className="py-16 bg-[#FFFDF7]" id="lead-tours">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider mb-3">
              Tiered Accommodation & Service Options
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#103F36] mb-4">
              Two journeys designed for international arrivals
            </h2>
            <p className="text-base text-[#59665E] leading-relaxed">
              Choose your preferred style of travel below: from clean verified 3-star eco-resorts to boutique heritage tea bungalows and ultra-luxury riverfront estates. Toggle between tiers on each card to view exact inclusions, vehicles, and prices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Journey 1: Kaziranga Rhino Safari */}
            <article className="bg-[#FFFDF7] rounded-3xl border border-[#DEDCCD] shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src="/images/Kaziranga/photo-1589882485484-c073e3742e60.jpg"
                    alt="Greater one-horned rhinoceros in Kaziranga National Park grasslands"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="badge-gold text-xs">UNESCO World Heritage</span>
                    <span className="bg-[#082D27]/90 text-[#F7F3E9] text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                      4 Days / 3 Nights
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#082D27]/90 text-[#F7F3E9] text-xs px-2.5 py-1 rounded-md">
                    Guwahati GAU Round-Trip
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#103F36] mb-2">
                      Assam Wildlife: Kaziranga Rhino and Brahmaputra
                    </h3>
                    <p className="text-sm text-[#59665E] leading-relaxed">
                      Immersion in the world’s highest density of Great Indian Rhinoceros, wild water buffalos, elephants, and rich wetlands birding across two park ranges.
                    </p>
                  </div>

                  {/* Interactive Tier Tabs for Kaziranga */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#103F36] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>Select Service & Stay Tier:</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#D9A441] bg-[#082D27] px-2 py-0.5 rounded">
                        {currentKazirangaTier.badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F7F3E9] rounded-xl border border-[#DEDCCD]">
                      {["comfort", "premium", "luxury"].map((tierKey) => {
                        const tier = packageTiers["kaziranga-wildlife-tour-from-guwahati"][tierKey];
                        const isSelected = kazirangaTier === tierKey;
                        return (
                          <button
                            key={tierKey}
                            type="button"
                            onClick={() => setKazirangaTier(tierKey)}
                            className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                              isSelected
                                ? "bg-[#103F36] text-[#F7F3E9] shadow-sm"
                                : "text-[#59665E] hover:text-[#103F36] hover:bg-[#FFFDF7]"
                            }`}
                          >
                            <span>{tierKey === "comfort" ? "Comfort" : tierKey === "premium" ? "Premium" : "Luxury"}</span>
                            <span className={`text-[10px] ${isSelected ? "text-[#D9A441]" : "text-[#59665E]"}`}>
                              {tierKey === "comfort" ? "3-Star" : tierKey === "premium" ? "4-Star" : "5-Star"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Tier Specs Box */}
                  <div className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#DEDCCD] space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <BedDouble className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Accommodation Standard:</strong>
                        <span className="text-[#59665E]">{currentKazirangaTier.stayDesc}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Car className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Dedicated Vehicle:</strong>
                        <span className="text-[#59665E]">{currentKazirangaTier.vehicleDesc}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Chauffeur & Wildlife Guides:</strong>
                        <span className="text-[#59665E]">{currentKazirangaTier.guidingDesc}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Utensils className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Meal Plan:</strong>
                        <span className="text-[#59665E]">{currentKazirangaTier.mealsDesc}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#DEDCCD]/60">
                      <div className="font-semibold text-[#103F36] mb-1.5">Tier Highlights Included:</div>
                      <ul className="space-y-1 text-[#172C26]">
                        {currentKazirangaTier.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#237A50] shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Transparent Pricing Display */}
                  <div className="border-t border-[#DEDCCD] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-[#59665E]">
                        Price ({currentKazirangaTier.label}):
                      </div>
                      <div className="text-2xl font-bold text-[#103F36]">
                        {formatPrice(currentKazirangaTier.price)}
                      </div>
                      <div className="text-[11px] text-[#59665E]">
                        per person (twin-sharing, min 4 guests). Private couples quotes on request.
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <span className="inline-block text-[11px] bg-[#103F36]/10 text-[#103F36] px-2.5 py-1 rounded font-semibold">
                        Billed in INR
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/packages/kaziranga-wildlife-tour-from-guwahati"
                  className="btn-outline-gold min-h-[44px] flex-1 text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>Detailed 4D Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleSelectPackageAndTier("kaziranga-wildlife-tour-from-guwahati", kazirangaTier)}
                  className="btn-primary-forest min-h-[44px] flex-1 text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enquire With {currentKazirangaTier.label.split(" ")[0]}</span>
                </button>
              </div>
            </article>

            {/* Journey 2: Meghalaya & Kaziranga Combo */}
            <article className="bg-[#FFFDF7] rounded-3xl border border-[#DEDCCD] shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src="/images/Meghalaya/Cherrapunjee/sevensisterfalls.jpg"
                    alt="Seven Sisters waterfalls tumbling over the misty cliffs of Cherrapunjee"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="badge-gold text-xs">Highlands + Wildlife Combo</span>
                    <span className="bg-[#082D27]/90 text-[#F7F3E9] text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                      8 Days / 7 Nights
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#082D27]/90 text-[#F7F3E9] text-xs px-2.5 py-1 rounded-md">
                    Guwahati GAU Round-Trip
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#103F36] mb-2">
                      Meghalaya and Kaziranga: Highlands and Wildlife Safari
                    </h3>
                    <p className="text-sm text-[#59665E] leading-relaxed">
                      The quintessential Northeast overland adventure. Combines misty cloud forests, crystal river valleys, and Khasi culture with UNESCO rhino safaris.
                    </p>
                  </div>

                  {/* Interactive Tier Tabs for Combo */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#103F36] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>Select Service & Stay Tier:</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#D9A441] bg-[#082D27] px-2 py-0.5 rounded">
                        {currentComboTier.badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F7F3E9] rounded-xl border border-[#DEDCCD]">
                      {["comfort", "premium", "luxury"].map((tierKey) => {
                        const tier = packageTiers["meghalaya-kaziranga-combo-tour"][tierKey];
                        const isSelected = comboTier === tierKey;
                        return (
                          <button
                            key={tierKey}
                            type="button"
                            onClick={() => setComboTier(tierKey)}
                            className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                              isSelected
                                ? "bg-[#103F36] text-[#F7F3E9] shadow-sm"
                                : "text-[#59665E] hover:text-[#103F36] hover:bg-[#FFFDF7]"
                            }`}
                          >
                            <span>{tierKey === "comfort" ? "Comfort" : tierKey === "premium" ? "Premium" : "Luxury"}</span>
                            <span className={`text-[10px] ${isSelected ? "text-[#D9A441]" : "text-[#59665E]"}`}>
                              {tierKey === "comfort" ? "3-Star" : tierKey === "premium" ? "4-Star" : "5-Star"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Tier Specs Box */}
                  <div className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#DEDCCD] space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <BedDouble className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Accommodation Standard:</strong>
                        <span className="text-[#59665E]">{currentComboTier.stayDesc}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Car className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Dedicated Vehicle:</strong>
                        <span className="text-[#59665E]">{currentComboTier.vehicleDesc}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Chauffeur & Guides:</strong>
                        <span className="text-[#59665E]">{currentComboTier.guidingDesc}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Utensils className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#103F36] block">Meal Plan:</strong>
                        <span className="text-[#59665E]">{currentComboTier.mealsDesc}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#DEDCCD]/60">
                      <div className="font-semibold text-[#103F36] mb-1.5">Tier Highlights Included:</div>
                      <ul className="space-y-1 text-[#172C26]">
                        {currentComboTier.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#237A50] shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Transparent Pricing Display */}
                  <div className="border-t border-[#DEDCCD] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-[#59665E]">
                        Price ({currentComboTier.label}):
                      </div>
                      <div className="text-2xl font-bold text-[#103F36]">
                        {formatPrice(currentComboTier.price)}
                      </div>
                      <div className="text-[11px] text-[#59665E]">
                        per person (twin-sharing, min 4 guests). Private couples quotes on request.
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <span className="inline-block text-[11px] bg-[#103F36]/10 text-[#103F36] px-2.5 py-1 rounded font-semibold">
                        Billed in INR
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/packages/meghalaya-kaziranga-combo-tour"
                  className="btn-outline-gold min-h-[44px] flex-1 text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>Detailed 8D Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleSelectPackageAndTier("meghalaya-kaziranga-combo-tour", comboTier)}
                  className="btn-primary-forest min-h-[44px] flex-1 text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enquire With {currentComboTier.label.split(" ")[0]}</span>
                </button>
              </div>
            </article>
          </div>

          <div className="mt-8 bg-[#F7F3E9] p-4 sm:p-6 rounded-2xl border border-[#DEDCCD] text-xs text-[#59665E] leading-relaxed">
            <p>
              <strong>Important Currency Notice:</strong> All official bookings, payment gateway invoices, and tax receipts are issued strictly in <strong>Indian Rupees (INR)</strong>. Foreign currency amounts shown above (USD, GBP, EUR) are indicative estimates calculated at prevailing bank exchange rates. Your final card or wire charge is converted by your home issuing bank at their applicable rates on the day of payment.
            </p>
          </div>
        </div>
      </section>

      {/* Tier Comparison Guide Matrix Section */}
      <section className="py-16 bg-[#F7F3E9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider mb-3">
              Transparent Tier Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#103F36] mb-4">
              Compare our 3 accommodation and service tiers
            </h2>
            <p className="text-base text-[#59665E] leading-relaxed">
              Every tier provides verified private transport, commercial yellow-plate passenger registration, clean Western attached bathrooms, and certified local naturalists. Review how the tiers differ in comfort, vehicles, and culinary inclusions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Comfort Tier */}
            <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#DEDCCD] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider">
                  Verified Standard
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#103F36]">
                  Comfort Tier
                </h3>
                <p className="text-xs text-[#59665E] leading-relaxed">
                  Ideal for practical travellers, birders, and small groups who prioritize clean, authentic stays and reliable private logistics without luxury markup.
                </p>

                <div className="space-y-3 pt-3 border-t border-[#DEDCCD] text-xs text-[#172C26]">
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Stay Standard:</strong>
                    <span>3-Star eco-lodges, tea garden bungalows, and Khasi highland guesthouses. Private attached Western bathroom, 24/7 hot water geyser.</span>
                  </div>
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Vehicle Model:</strong>
                    <span>Dedicated AC Maruti Ertiga or tourist sedan with yellow commercial plate.</span>
                  </div>
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Chauffeur & Guides:</strong>
                    <span>Verified mountain chauffeur (English/Hindi) + certified Forest Department naturalist on all safaris.</span>
                  </div>
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Meal Inclusions:</strong>
                    <span>Daily breakfast at all hotels.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DEDCCD]">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, tier: "Comfort (3-Star)" }));
                    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-outline-forest w-full min-h-[44px] text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
                >
                  Choose Comfort Tier
                </button>
              </div>
            </div>

            {/* Column 2: Premium Boutique */}
            <div className="bg-[#103F36] text-[#F7F3E9] rounded-3xl p-6 sm:p-8 border-2 border-[#D9A441] shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D9A441] text-[#172C26] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                Most Popular for Overseas Guests
              </div>

              <div className="space-y-4 pt-2">
                <div className="inline-block px-3 py-1 rounded-full bg-[#D9A441]/20 text-[#D9A441] text-xs font-bold uppercase tracking-wider">
                  Boutique Heritage
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#F7F3E9]">
                  Premium Boutique Tier
                </h3>
                <p className="text-xs text-[#F7F3E9]/80 leading-relaxed">
                  Our flagship standard. Combines handpicked 4-star boutique jungle lodges, scenic valley resorts, superior Toyota Innova Crysta comfort, and curated regional dining.
                </p>

                <div className="space-y-3 pt-3 border-t border-[#103F36] text-xs text-[#F7F3E9]/90">
                  <div>
                    <strong className="text-[#D9A441] block mb-0.5">Stay Standard:</strong>
                    <span>4-Star boutique jungle resorts (Iora / Borgos) & scenic lake/waterfall properties (Ri Kynjai / Polo Orchid) with private balconies and swimming pools.</span>
                  </div>
                  <div>
                    <strong className="text-[#D9A441] block mb-0.5">Vehicle Model:</strong>
                    <span>Upgraded Toyota Innova Crysta for maximum highway comfort, captain seats, and ample luggage space.</span>
                  </div>
                  <div>
                    <strong className="text-[#D9A441] block mb-0.5">Chauffeur & Guides:</strong>
                    <span>Senior English-fluent chauffeur + senior certified naturalist + safari optical binoculars in vehicle.</span>
                  </div>
                  <div>
                    <strong className="text-[#D9A441] block mb-0.5">Meal Inclusions:</strong>
                    <span>Daily breakfast + 2 specialty tribal and ethnic culinary dinners.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#103F36]">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, tier: "Premium Boutique (4-Star)" }));
                    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-gold w-full min-h-[44px] text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow-md"
                >
                  Choose Premium Boutique
                </button>
              </div>
            </div>

            {/* Column 3: Luxury Experiential */}
            <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#DEDCCD] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider">
                  Signature Luxury
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#103F36]">
                  Luxury Experiential Tier
                </h3>
                <p className="text-xs text-[#59665E] leading-relaxed">
                  For travellers seeking ultimate immersion: premier riverside safari estates, full-board gourmet meals, private river yacht excursions, and 24/7 personal trip concierge.
                </p>

                <div className="space-y-3 pt-3 border-t border-[#DEDCCD] text-xs text-[#172C26]">
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Stay Standard:</strong>
                    <span>Premier luxury riverside lodges (Diphlu River Lodge) & presidential/lake villas (Ri Kynjai Lake View Thatch, Polo Orchid plunge-pool villa).</span>
                  </div>
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Vehicle Model:</strong>
                    <span>Executive Toyota Innova Crysta with mobile Wi-Fi, refreshments, gourmet snacks, and daily detailing.</span>
                  </div>
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Chauffeur & Guides:</strong>
                    <span>Executive chauffeur + master wildlife naturalist + 24/7 personal trip concierge manager.</span>
                  </div>
                  <div>
                    <strong className="text-[#103F36] block mb-0.5">Meal Inclusions:</strong>
                    <span>Full Board (All breakfasts, excursion lunches, and private multi-course dinners).</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DEDCCD]">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, tier: "Luxury Experiential (5-Star)" }));
                    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-outline-forest w-full min-h-[44px] text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
                >
                  Choose Luxury Experiential
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arrival Logistics & Guiding Standards Section */}
      <section className="py-16 bg-[#103F36] text-[#F7F3E9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/20 text-[#D9A441] text-xs font-bold uppercase tracking-wider mb-3">
              Overland Logistics & Guiding
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4">
              How your arrival, driving days, and guides are organized
            </h2>
            <p className="text-base text-[#F7F3E9]/80 leading-relaxed">
              Travelling in the Northeast requires local coordination. Here is exactly what happens from the moment you touch down at Guwahati Airport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#082D27] p-6 rounded-2xl border border-[#103F36] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9A441]/20 flex items-center justify-center text-[#D9A441]">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#F7F3E9]">
                Guwahati Airport (GAU) Hub
              </h3>
              <p className="text-xs text-[#F7F3E9]/75 leading-relaxed">
                Guwahati is the primary gateway to Northeast India, with frequent daily 2-hour flights from Delhi (DEL), Kolkata (CCU), and Mumbai (BOM). Your driver meets you at Arrivals with a personalized name board.
              </p>
            </div>

            <div className="bg-[#082D27] p-6 rounded-2xl border border-[#103F36] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9A441]/20 flex items-center justify-center text-[#D9A441]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#F7F3E9]">
                Calibrated Travel Pace
              </h3>
              <p className="text-xs text-[#F7F3E9]/75 leading-relaxed">
                Mountain journeys can be tiring. We cap driving days at 4 to 6 hours max, with scheduled rest stops at verified hygienic cafes, clean restrooms, and scenic viewpoints. All travel is completed during safe daylight hours.
              </p>
            </div>

            <div className="bg-[#082D27] p-6 rounded-2xl border border-[#103F36] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9A441]/20 flex items-center justify-center text-[#D9A441]">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#F7F3E9]">
                English-Speaking Chauffeur
              </h3>
              <p className="text-xs text-[#F7F3E9]/75 leading-relaxed">
                You receive a dedicated private tourist vehicle with a commercial yellow-plate registration and a background-verified mountain driver proficient in English and Hindi for smooth communication.
              </p>
            </div>

            <div className="bg-[#082D27] p-6 rounded-2xl border border-[#103F36] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9A441]/20 flex items-center justify-center text-[#D9A441]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#F7F3E9]">
                Certified Forest Naturalists
              </h3>
              <p className="text-xs text-[#F7F3E9]/75 leading-relaxed">
                Inside Kaziranga National Park and specialized heritage areas, we assign separate licensed Forest Department naturalists. Your highway driver remains outside while you explore with wildlife experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation, Meals, Vehicles & Accessibility Standards */}
      <section className="py-16 bg-[#F7F3E9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider mb-3">
              Comfort & Health Standards
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#103F36] mb-4">
              Vehicles, boutique rooms, dietary care, and accessibility
            </h2>
            <p className="text-base text-[#59665E] leading-relaxed">
              We know international guests have specific expectations regarding bathroom hygiene, vehicle luggage space, and food preparation. Here are our exact operating benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Vehicles & Luggage */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    Vehicle Standards & Luggage Allowance
                  </h3>
                  <span className="text-xs text-[#59665E]">Toyota Innova Crysta, Maruti Ertiga, or AC Tempo</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                All overland journeys utilize modern, clean, commercial tourist vehicles with yellow registration plates, comprehensive passenger insurance, operational air-conditioning, and functional seatbelts for all passengers.
              </p>
              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#172C26] space-y-1.5">
                <div className="font-semibold text-[#103F36]">Luggage Guidelines:</div>
                <p>
                  We recommend a maximum of <strong>1 standard check-in suitcase (up to 23 kg / 50 lbs)</strong> plus <strong>1 cabin daypack</strong> per traveller to ensure relaxed legroom and luggage compartment fit across hilly terrains.
                </p>
              </div>
            </div>

            {/* Box 2: Accommodation Standards */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    Boutique Stays & Western Bathrooms
                  </h3>
                  <span className="text-xs text-[#59665E]">Verified hygiene, hot running water, and power backup</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                We contract boutique eco-lodges, tea garden bungalows, and dependable 3-star to 5-star properties. Every private room booked features an <strong>attached Western-style commode</strong>, fresh white bed linen, daily housekeeping, and electric water heaters (geysers).
              </p>
              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#172C26] space-y-1.5">
                <div className="font-semibold text-[#103F36]">Power & Connectivity:</div>
                <p>
                  Most mountain resorts have generator backup for lighting and charging devices. Wi-Fi is available in common areas and rooms, though speeds can vary in deep valleys.
                </p>
              </div>
            </div>

            {/* Box 3: Meals & Dietary Accommodations */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    Meals & Dietary Requirements
                  </h3>
                  <span className="text-xs text-[#59665E]">Vegetarian, Vegan, Jain, Gluten-Sensitive, Low-Spice</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                Daily breakfast is included at all hotels. We proactively brief hotel kitchens and route restaurants regarding dietary preferences. Whether you require completely vegetarian, plant-based vegan, Jain (no onion/garlic), gluten-aware, or mild low-spice cooking, we accommodate your needs.
              </p>
              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#172C26] space-y-1.5">
                <div className="font-semibold text-[#103F36]">Safe Drinking Water:</div>
                <p>
                  Sealed packaged mineral water bottles are provided throughout your journey inside the private vehicle.
                </p>
              </div>
            </div>

            {/* Box 4: Accessibility & Walking Effort */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    Accessibility & Physical Demands
                  </h3>
                  <span className="text-xs text-[#59665E]">Moderate fitness, with accessible options available</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                Kaziranga safaris are seated comfortably inside open 4x4 open-top Gypsy vehicles. In Meghalaya, many scenic waterfalls, gorges, and viewpoint gazebos are accessible directly by car or a short flat stroll.
              </p>
              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#172C26] space-y-1.5">
                <div className="font-semibold text-[#103F36]">Living Root Bridges Note:</div>
                <p>
                  The Single Living Root Bridge in Mawlynnong/Riwai requires an easy 15-minute stone staircase walk. The Double Decker Root Bridge in Nongriat requires 3,500 stairs and is strictly optional for energetic trekkers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Payments, Deposits & Refunds */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider mb-3">
              Payment Transparency
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#103F36] mb-4">
              International payment methods, deposit schedule, and refunds
            </h2>
            <p className="text-base text-[#59665E] leading-relaxed">
              We maintain transparent billing. Learn how deposits are handled, what payment channels are accepted, and how cancellations are reconciled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Method 1: Wise */}
            <div className="bg-[#F7F3E9] p-6 rounded-2xl border border-[#DEDCCD] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center font-bold text-sm">
                Wise
              </div>
              <h3 className="font-serif text-base font-bold text-[#103F36]">
                Wise Bank Transfer (Recommended)
              </h3>
              <p className="text-xs text-[#59665E] leading-relaxed">
                Pay directly in your local currency (USD, GBP, EUR, AUD, SGD, etc.) to our verified Indian Rupee business account with real mid-market exchange rates and minimal fees. Zero merchant surcharge from our side.
              </p>
            </div>

            {/* Method 2: SWIFT International Wire */}
            <div className="bg-[#F7F3E9] p-6 rounded-2xl border border-[#DEDCCD] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#103F36]">
                SWIFT Wire Transfer
              </h3>
              <p className="text-xs text-[#59665E] leading-relaxed">
                Direct wire transfer from your overseas bank account to our corporate bank account in Guwahati, Assam. Standard international banking routing details (SWIFT/BIC, IBAN/IFSC) provided with your formal trip invoice.
              </p>
            </div>

            {/* Method 3: International Cards & Razorpay */}
            <div className="bg-[#F7F3E9] p-6 rounded-2xl border border-[#DEDCCD] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#103F36]">
                Credit & Debit Cards (Razorpay)
              </h3>
              <p className="text-xs text-[#59665E] leading-relaxed">
                Visa, MasterCard, and American Express accepted via secure digital payment link. International card payments incur a 3.5% gateway processing fee charged by the international card payment network.
              </p>
            </div>
          </div>

          {/* Deposit Schedule & Refund Policy Card */}
          <div className="bg-[#103F36] text-[#F7F3E9] p-6 sm:p-8 rounded-2xl border border-[#082D27] space-y-5">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#D9A441]">
              Deposit Timing & Cancellation Policy Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#F7F3E9]/85">
              <div className="space-y-3">
                <div className="font-semibold text-sm text-[#F7F3E9]">Deposit Schedule:</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D9A441] font-bold">•</span>
                    <span><strong>Standard Booking:</strong> 30% advance deposit to secure dates, private vehicles, and hotel rooms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D9A441] font-bold">•</span>
                    <span><strong>Balance Due:</strong> Remaining 70% payable 15 days prior to your arrival in Guwahati.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D9A441] font-bold">•</span>
                    <span><strong>Short-Notice Bookings (within 15 days):</strong> 100% advance payment required at the time of confirmation.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-sm text-[#F7F3E9]">Reconciled Refund Terms:</div>
                <p className="leading-relaxed">
                  Cancellations are governed by our unified policy. If you cancel more than 30 days prior, only a 15% administrative processing fee on the deposit is retained. Cancellations 15 to 29 days prior retain the 30% advance deposit with zero further liability billed to you. Cancellations within 15 days are non-refundable due to supplier blocks.
                </p>
                <div className="pt-2">
                  <Link
                    href="/cancellation-policy"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D9A441] font-bold hover:underline"
                  >
                    <span>Read Full Cancellation Policy with Worked Examples</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Visa Guidance & Arunachal PAP Section */}
      <section className="py-16 bg-[#F7F3E9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider mb-3">
              Government Permits & Visas
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#103F36] mb-4">
              Visas, permits, and Arunachal Pradesh foreign traveller rules
            </h2>
            <p className="text-base text-[#59665E] leading-relaxed">
              Ensure smooth overland transit. Here is what is legally required for international passport holders visiting Assam, Meghalaya, and Arunachal Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Indian Tourist Visa */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    Official Indian e-Visa
                  </h3>
                  <span className="text-xs text-[#59665E]">Required for all foreign visitors</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                All foreign passport holders travelling to India require a valid Indian visa. The Government of India provides an electronic visa (e-Visa) facility for citizens of most nations, including the United States, United Kingdom, Canada, Australia, European Union, and Singapore.
              </p>
              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#172C26] space-y-2">
                <div className="font-semibold text-[#103F36]">Important Visa Guidelines:</div>
                <ul className="space-y-1 text-[#59665E]">
                  <li>• Your passport must have at least 6 months validity from the date of arrival.</li>
                  <li>• Apply only via the official Indian Government portal to avoid commercial scams.</li>
                </ul>
                <div className="pt-2">
                  <a
                    href="https://indianvisaonline.gov.in/evisa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#103F36] font-bold hover:text-[#D9A441] underline"
                  >
                    <span>Visit Official Indian e-Visa Portal (indianvisaonline.gov.in)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Box 2: Arunachal Pradesh PAP Rules */}
            <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-2xl border border-[#DEDCCD] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#103F36] text-[#D9A441] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103F36]">
                    Arunachal Pradesh Protected Area Permit (PAP)
                  </h3>
                  <span className="text-xs text-[#59665E]">Foreign Tourist Guidelines & Local Sponsorship</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#59665E] leading-relaxed">
                While Assam and Meghalaya require no special permits for foreign tourists, <strong>Arunachal Pradesh</strong> is a border-sensitive state where foreign nationals require a <strong>Protected Area Permit (PAP)</strong> issued by the Ministry of Home Affairs / State Government.
              </p>
              <div className="bg-[#F7F3E9] p-3.5 rounded-xl border border-[#DEDCCD] text-xs text-[#172C26] space-y-2">
                <div className="font-semibold text-[#103F36]">Key PAP Requirements:</div>
                <ul className="space-y-1 text-[#59665E]">
                  <li>• Foreign tourists must travel in a group of <strong>at least two (2) foreign passport holders</strong> (or apply under designated circuits with approved tour operator arrangements).</li>
                  <li>• Applications must be submitted <strong>4 to 6 weeks in advance</strong> through an approved local tour operator like Divine View Tours.</li>
                  <li>• <strong>Compliance Disclaimer:</strong> We verify nationality and proposed routes before confirmation. Divine View Tours coordinates documentation and sponsorship, but permit issuance remains at the sole statutory discretion of government authorities and cannot be guaranteed in advance.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Local Operations Team */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#082D27] text-[#F7F3E9] rounded-3xl p-8 sm:p-12 border border-[#103F36] relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/20 text-[#D9A441] text-xs font-bold uppercase tracking-wider">
                Direct Local Tour Operator
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">
                Headquartered in Guwahati, Assam. Not an anonymous aggregator.
              </h2>
              <p className="text-sm sm:text-base text-[#F7F3E9]/80 leading-relaxed">
                When you book with Divine View Tours, you work directly with destination specialists on the ground. We manage our own tourist vehicle fleet, conduct in-person hotel quality checks, and monitor your overland progress daily via private WhatsApp concierge.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#103F36] text-xs text-[#F7F3E9]/90">
                <div>
                  <div className="text-[#D9A441] font-semibold mb-1">Registered Base:</div>
                  <p>Guwahati, Assam, India (Primary Northeast Departure Hub)</p>
                </div>
                <div>
                  <div className="text-[#D9A441] font-semibold mb-1">Direct Desk Phone:</div>
                  <p>{siteConfig.phone} / {siteConfig.phoneSecondary}</p>
                </div>
                <div>
                  <div className="text-[#D9A441] font-semibold mb-1">Overseas Email Desk:</div>
                  <p>{siteConfig.bookingEmail || "bookings@divineviewtours.com"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overseas Travel Enquiry Form Section with Tier Selector */}
      <section className="py-16 bg-[#F7F3E9]" id="enquiry-form">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#DEDCCD] p-6 sm:p-10 shadow-lg">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103F36]/10 text-[#103F36] text-xs font-bold uppercase tracking-wider mb-2">
                Fast Response Within 12 Hours
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#103F36]">
                Plan your private journey to Northeast India
              </h2>
              <p className="text-xs sm:text-sm text-[#59665E] mt-2">
                Share your dates and preferences. Our Guwahati trip planning team will prepare a tailored proposal with itemized pricing in INR and your home currency.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
              {/* Bot Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Leave this empty</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={handleInputChange}
                />
              </div>

              {/* Row 1: Name and Country of Residence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  />
                  {formErrors.customerName && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.customerName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="countryOfResidence" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Country of Residence <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="countryOfResidence"
                    name="countryOfResidence"
                    required
                    placeholder="e.g. United Kingdom, USA, Australia"
                    value={formData.countryOfResidence}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  />
                  {formErrors.countryOfResidence && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.countryOfResidence}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone with International Code & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    WhatsApp or Mobile Number
                  </label>
                  <PhoneInput
                    id="phone"
                    name="phone"
                    countryCode={formData.countryCode}
                    onCountryCodeChange={(code) => setFormData((prev) => ({ ...prev, countryCode: code }))}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 7911 123456"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Interested Journey & Service/Stay Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="packageInterest" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Interested Journey
                  </label>
                  <select
                    id="packageInterest"
                    name="packageInterest"
                    value={formData.packageInterest}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  >
                    <option value="meghalaya-kaziranga-combo-tour">
                      Meghalaya & Kaziranga Combo (8D/7N) - Highlights
                    </option>
                    <option value="kaziranga-wildlife-tour-from-guwahati">
                      Assam Wildlife: Kaziranga Rhino Safari (4D/3N)
                    </option>
                    <option value="meghalaya-5-day-tour-from-guwahati">
                      Meghalaya Highlands & Waterfalls (5D/4N)
                    </option>
                    <option value="tawang-7-day-tour-from-guwahati">
                      Tawang & Western Arunachal (7D/6N, PAP required)
                    </option>
                    <option value="custom-trip">
                      Custom Tailored Itinerary (Any Duration)
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tier" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Accommodation & Service Tier
                  </label>
                  <select
                    id="tier"
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  >
                    <option value="Comfort (3-Star)">
                      Comfort Tier (3-Star Verified Eco-Stays & Ertiga/Sedan)
                    </option>
                    <option value="Premium Boutique (4-Star)">
                      Premium Boutique (4-Star Heritage Lodges & Innova Crysta)
                    </option>
                    <option value="Luxury Experiential (5-Star)">
                      Luxury Experiential (5-Star Riverfront Estate & Full Board)
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Contact Method & Travel Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredContact" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  >
                    <option value="whatsapp">WhatsApp Message (Fastest)</option>
                    <option value="email">Email Proposal</option>
                    <option value="call">Phone Call (Please note time zone)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="travelMonth" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Travel Dates or Month
                  </label>
                  <input
                    type="text"
                    id="travelMonth"
                    name="travelMonth"
                    placeholder="e.g. Nov 2026 or Dec 10-18"
                    value={formData.travelMonth}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  />
                </div>
              </div>

              {/* Row 5: Guest Count Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="adults" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Adults (12+ yrs)
                  </label>
                  <input
                    type="number"
                    id="adults"
                    name="adults"
                    min="1"
                    max="20"
                    value={formData.adults}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  />
                </div>

                <div>
                  <label htmlFor="childrenCount" className="block text-xs font-bold text-[#103F36] mb-1.5">
                    Children (Under 12)
                  </label>
                  <input
                    type="number"
                    id="childrenCount"
                    name="childrenCount"
                    min="0"
                    max="10"
                    value={formData.childrenCount}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                  />
                </div>
              </div>

              {/* Row 6: Dietary and accessibility notes */}
              <div>
                <label htmlFor="dietaryOrAccessibility" className="block text-xs font-bold text-[#103F36] mb-1.5">
                  Dietary Preferences & Special Requests (Optional)
                </label>
                <input
                  type="text"
                  id="dietaryOrAccessibility"
                  name="dietaryOrAccessibility"
                  placeholder="e.g. Vegetarian, low-spice meals, ground-floor room preferred"
                  value={formData.dietaryOrAccessibility}
                  onChange={handleInputChange}
                  className="w-full bg-[#F7F3E9] p-3 rounded-xl border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full min-h-[48px] text-center font-bold text-sm sm:text-base py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Request Proposal for {formData.tier.split(" ")[0]} Tier</span>
                      <ArrowRight className="w-4 h-4 text-[#172C26]" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-[#59665E]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#103F36]" />
                  <span>Zero Spam Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#103F36]" />
                  <span>Response within 12 hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#103F36]" />
                  <span>Transparent itemized billing</span>
                </div>
              </div>
            </form>

            {/* Direct Instant Contact Option */}
            <div className="mt-8 pt-6 border-t border-[#DEDCCD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#59665E] text-center sm:text-left">
                Prefer to chat directly with an itinerary planner right now?
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactIntent("whatsapp", "international-page")}
                  className="btn-primary-forest min-h-[44px] px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#D9A441]" />
                  <span>WhatsApp: {siteConfig.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
