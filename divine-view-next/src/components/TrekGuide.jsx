"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

const plans = [
  {
    id: "weekend",
    label: "Weekend Express",
    short: "3D / 2N",
    fit: "Fit travellers",
    pace: "Fast",
    budget: "₹7,500 – ₹12,000",
    daysCount: 3,
    nightsCount: 2,
    note: "The shortest workable version from Guwahati. Uses overnight train transit and tight transfers. High endurance required.",
    days: [
      {
        num: "01",
        title: "Night transfer",
        route: "Guwahati → Dimapur → Kohima",
        desc: "Use an overnight train to Dimapur, then an early shared cab to Kohima. Check permits and meet your driver.",
        alt: "55m → 1,444m",
        time: "Overnight + 3h cab",
        tip: "Shared Sumos depart Dimapur station between 5:30 AM and 7:00 AM."
      },
      {
        num: "02",
        title: "Climb into Dzukou",
        route: "Kohima → Viswema → Rest House",
        desc: "Drive to Viswema trailhead. Trek the steep forest section, cross the ridge and continue to the rest house. 5–6 trekking hours.",
        alt: "1,700m → 2,450m",
        time: "5–6h trek",
        tip: "Rent a bamboo walking stick at the trailhead and register with SAYO."
      },
      {
        num: "03",
        title: "Sunrise & descend",
        route: "Dzukou → Jakhama → Guwahati",
        desc: "Start before dawn, take a short viewpoint walk, then descend the steeper Jakhama route. Connect to Dimapur and travel overnight.",
        alt: "2,450m → 1,850m",
        time: "4h trek + 3h road",
        tip: "Jakhama descent is steep; double trekking poles are recommended."
      },
    ],
  },
  {
    id: "four",
    label: "Minimum Leave",
    short: "4D / 3N",
    fit: "Short on leave",
    pace: "Fast",
    budget: "₹9,500 – ₹15,500",
    daysCount: 4,
    nightsCount: 3,
    note: "Adds a proper valley exploration day while keeping both transit legs efficient.",
    days: [
      {
        num: "01",
        title: "Reach Kohima",
        route: "Guwahati → Dimapur → Kohima",
        desc: "Morning train or early departure. Settle in Kohima, arrange cash, food and a confirmed trail transfer.",
        alt: "55m → 1,444m",
        time: "4h train + 2.5h cab",
        tip: "Withdraw all cash in Kohima; there are no ATMs in the valley."
      },
      {
        num: "02",
        title: "Trek via Viswema",
        route: "Kohima → Dzukou Rest House",
        desc: "Drive to Viswema and climb through forest to the ridge. Follow the bamboo-covered traverse to the rest house. 5–6 hours.",
        alt: "1,700m → 2,450m",
        time: "5–6h trek",
        tip: "Keep rain covers on backpacks even if the morning sky is clear."
      },
      {
        num: "03",
        title: "Explore & descend",
        route: "Valley floor → Jakhama → Kohima",
        desc: "Descend to the stream and viewpoints early, return to the rest house, then take the steep Jakhama exit. Long trekking day.",
        alt: "2,450m → 2,200m → 1,850m",
        time: "6–7h total",
        tip: "Pre-book your Kohima pickup cab before leaving for the trail."
      },
      {
        num: "04",
        title: "Return",
        route: "Kohima → Dimapur → Guwahati",
        desc: "Keep transfer margins generous and avoid booking an inflexible onward connection.",
        alt: "1,444m → 55m",
        time: "5–6h transit",
        tip: "Allow 1 hour extra buffer for morning market traffic in Dimapur."
      },
    ],
  },
  {
    id: "five",
    label: "Signature Trek",
    short: "5D / 4N",
    fit: "Most travellers",
    pace: "Balanced",
    budget: "₹11,000 – ₹18,500",
    recommended: true,
    daysCount: 5,
    nightsCount: 4,
    note: "The best overall balance: two nights in the valley, an unhurried exploration day and sensible travel windows.",
    days: [
      {
        num: "01",
        title: "Travel to Kohima",
        route: "Guwahati → Dimapur → Kohima",
        desc: "Take a morning train or road transfer to Dimapur, then continue by shared or reserved cab. Overnight in Kohima.",
        alt: "55m → 1,444m",
        time: "6h transit",
        tip: "Visit the WWII cemetery and enjoy local Angami tea in Kohima."
      },
      {
        num: "02",
        title: "Enter via Viswema",
        route: "Kohima → Viswema → Dzukou",
        desc: "Drive about 1–1.5 hours to the trailhead. Climb steep forest steps, gain the ridge, then traverse to the rest house. 5–6 hours.",
        alt: "1,700m → 2,450m",
        time: "5–6h trek",
        tip: "Rent extra foam mattresses & blankets early at the caretaker desk."
      },
      {
        num: "03",
        title: "Full valley day",
        route: "Stream · caves · viewpoints",
        desc: "Descend to the valley floor, follow the stream and explore viewpoints at an easy pace. Carry lunch and rain protection. 5–7 hours.",
        alt: "2,450m ⇄ 2,180m",
        time: "5–7h exploration",
        tip: "Pack boiled eggs, local bread, and hot tea in a flask for a stream picnic."
      },
      {
        num: "04",
        title: "Descend Jakhama",
        route: "Dzukou → Jakhama → Kohima",
        desc: "Leave after breakfast. The Jakhama route is shorter but steeper and can be slippery. Trek 4–5 hours, then drive to Kohima.",
        alt: "2,450m → 1,850m",
        time: "4–5h trek",
        tip: "Warm herbal foot baths are often provided by welcoming homestay hosts."
      },
      {
        num: "05",
        title: "Return to Guwahati",
        route: "Kohima → Dimapur → Guwahati",
        desc: "Travel to Dimapur and connect onward. Keep a buffer for hill-road traffic and weather delays.",
        alt: "1,444m → 55m",
        time: "6h transit",
        tip: "Pick up fresh Naga ginger and bamboo shoots at roadside farm stalls."
      },
    ],
  },
  {
    id: "six",
    label: "Easy Rhythm",
    short: "6D / 5N",
    fit: "First-time trekkers",
    pace: "Relaxed",
    budget: "₹13,500 – ₹22,000",
    daysCount: 6,
    nightsCount: 5,
    note: "A gentler plan with recovery time in Kohima and more flexibility around cloud, rain and transport.",
    days: [
      {
        num: "01",
        title: "Arrive Kohima",
        route: "Guwahati → Dimapur → Kohima",
        desc: "Travel without rushing and spend the evening preparing in Kigwema village.",
        alt: "55m → 1,444m",
        time: "6h transit",
        tip: "Staying in Kigwema village saves 45 minutes on morning trailhead drive."
      },
      {
        num: "02",
        title: "Kohima buffer",
        route: "Acclimatise · local orientation",
        desc: "Use the day for permits, supplies, a heritage walk and an early night.",
        alt: "1,444m → 1,600m",
        time: "3–4h easy walk",
        tip: "Break in hiking shoes and calibrate daypack weight today."
      },
      {
        num: "03",
        title: "Trek to Dzukou",
        route: "Kohima → Viswema → Rest House",
        desc: "Take the Viswema ascent at a steady pace with ample photo stops. 5–6 hours.",
        alt: "1,700m → 2,450m",
        time: "5–6h trek",
        tip: "Carry an extra power bank; there is zero electricity in the valley."
      },
      {
        num: "04",
        title: "Explore the valley",
        route: "Stream · caves · viewpoints",
        desc: "A full unhurried day on the valley floor. 5–7 hours depending on the route chosen.",
        alt: "2,450m ⇄ 2,150m",
        time: "5–7h walk",
        tip: "Blyth's tragopan and various hill birds nest in the dwarf bamboo scrub."
      },
      {
        num: "05",
        title: "Descend",
        route: "Dzukou → Jakhama → Kohima",
        desc: "Use trekking poles and take care on the steep descent. Return to Kohima.",
        alt: "2,450m → 1,850m",
        time: "4h trek",
        tip: "Soak tired feet in cold mountain springs at the trail base."
      },
      {
        num: "06",
        title: "Return",
        route: "Kohima → Dimapur → Guwahati",
        desc: "A dedicated travel day with comfortable connection margins.",
        alt: "1,444m → 55m",
        time: "6h transit",
        tip: "Recheck all tickets and boarding passes before leaving Kohima."
      },
    ],
  },
  {
    id: "seven",
    label: "Trek + Culture",
    short: "7D / 6N",
    fit: "Slow travellers",
    pace: "Relaxed+",
    budget: "₹16,000 – ₹27,500",
    daysCount: 7,
    nightsCount: 6,
    note: "Pairs the trek with Kohima’s history, markets and village culture, with the most useful weather buffer.",
    days: [
      {
        num: "01",
        title: "Reach Kohima",
        route: "Guwahati → Dimapur → Kohima",
        desc: "Travel to Kohima and settle in.",
        alt: "55m → 1,444m",
        time: "6h transit",
        tip: "Catch sunset over the Kohima ridge from the Cathedral viewpoint."
      },
      {
        num: "02",
        title: "Kohima & Kigwema",
        route: "Heritage · markets · village life",
        desc: "Explore respectfully with a local guide and finish trek preparation.",
        alt: "1,444m → 1,550m",
        time: "4h tour",
        tip: "Visit Kisama Heritage Village, home to the Hornbill festival morungs."
      },
      {
        num: "03",
        title: "Enter Dzukou",
        route: "Kohima → Viswema → Rest House",
        desc: "Trek the classic Viswema approach. 5–6 hours.",
        alt: "1,700m → 2,450m",
        time: "5–6h trek",
        tip: "Look out for rare rhododendrons and wild mountain orchids."
      },
      {
        num: "04",
        title: "Deep valley day",
        route: "Stream · caves · viewpoints",
        desc: "Walk the valley floor and spend time photographing the landscape. 5–7 hours.",
        alt: "2,450m ⇄ 2,150m",
        time: "6h exploration",
        tip: "The stream water is pure, ice-cold, and mineral-rich."
      },
      {
        num: "05",
        title: "Weather buffer",
        route: "Short walks · rest house",
        desc: "Keep a flexible second valley morning or use it as a rain and recovery buffer.",
        alt: "2,450m ⇄ 2,600m",
        time: "3–4h walk",
        tip: "Enjoy sweeping views of Manipur and Mount Japfu."
      },
      {
        num: "06",
        title: "Descend",
        route: "Dzukou → Jakhama → Kohima",
        desc: "Take the steep Jakhama route back to Kohima. 4–5 hours.",
        alt: "2,450m → 1,850m",
        time: "4h trek + 1h drive",
        tip: "Sample local smoked pork cooked in bamboo tubes at Khonoma."
      },
      {
        num: "07",
        title: "Return",
        route: "Kohima → Dimapur → Guwahati",
        desc: "Complete the return journey with ample connection time.",
        alt: "1,500m → 55m",
        time: "6–7h transit",
        tip: "Review and backup your camera memory cards on the train ride."
      },
    ],
  },
];

const routeStops = [
  {
    name: "Guwahati",
    alt: "55 m",
    transit: "Rail & Flight Gateway",
    time: "Start / Departure",
    desc: "Overnight trains (BG Express / Donyi Polo) depart Guwahati for Dimapur every evening. Outdoor gear and general supplies available."
  },
  {
    name: "Dimapur",
    alt: "145 m",
    transit: "Shared Tata Sumo",
    time: "4h train / 2.5h cab to Kohima",
    desc: "Nagaland's rail hub. Shared Sumos (₹350–450/seat) to Kohima line up outside the station from 5:30 AM. ILP verification counters."
  },
  {
    name: "Kohima",
    alt: "1,444 m",
    transit: "4x4 Bolero to Trailhead",
    time: "Basecamp",
    desc: "State capital. Essential stop to withdraw cash (no ATMs in valley), buy provisions, hire local drivers, and finalize permits."
  },
  {
    name: "Viswema",
    alt: "1,700 m",
    transit: "Stone Steps + Ridge Trail",
    time: "5–6h ascent to Rest House",
    desc: "Recommended entry route. 8 km rough road to trailhead, followed by 1.5h steep stone forest stairs leading to the gentle dwarf bamboo traverse."
  },
  {
    name: "Dzukou",
    alt: "2,450 m",
    transit: "Valley Floor & Stream Walks",
    time: "Destination High Camp",
    desc: "Endless rolling green valleys, meandering freshwater stream, natural ghost caves, and SAYO Rest House with basic bunk dormitories and camping."
  },
  {
    name: "Jakhama",
    alt: "1,850 m",
    transit: "Steep Step Descent",
    time: "3.5–4.5h exit to highway",
    desc: "Direct, shorter exit route down fern-covered ravines and boulder steps. Steeper on knees; connects directly to Kohima-Imphal highway."
  },
];

const packingItems = [
  "30–40 L backpack",
  "Grippy trekking shoes",
  "Rain shell + pack cover",
  "2 L water capacity"
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

function MountainMark() {
  return (
    <svg viewBox="0 0 48 34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M2 31 17 7l7 11 6-9 16 22H2Z" />
      <path d="m13 14 4-7 4 7" />
    </svg>
  );
}

export default function TrekGuide() {
  const [selected, setSelected] = useState("five");
  const [openDay, setOpenDay] = useState(0);
  const [checked, setChecked] = useState([]);
  const [selectedStop, setSelectedStop] = useState(4);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Budget Estimator State
  const [calcTrekkers, setCalcTrekkers] = useState(2);
  const [calcDays, setCalcDays] = useState(5);
  const [calcStay, setCalcStay] = useState("dorm");
  const [calcTransport, setCalcTransport] = useState("shared");
  const [calcGuide, setCalcGuide] = useState(true);

  const plan = useMemo(() => plans.find((item) => item.id === selected) || plans[2], [selected]);

  // Smooth scroll listener for navbar morph
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (toastMsg) {
      const t = setTimeout(() => setToastMsg(""), 3000);
      return () => clearTimeout(t);
    }
  }, [toastMsg]);

  const showToast = (msg) => {
    setToastMsg(msg);
  };

  const choosePlan = (id) => {
    setSelected(id);
    setOpenDay(0);
    const p = plans.find((item) => item.id === id);
    if (p) setCalcDays(p.daysCount);
  };

  const toggleCheck = (item) => {
    setChecked((items) =>
      items.includes(item) ? items.filter((x) => x !== item) : [...items, item]
    );
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cost calculation
  const calculatedCost = useMemo(() => {
    const ilpFee = 150;
    const sayoFee = 100;
    const sanitationFee = 50;

    let transportPerPerson = calcTransport === "shared" ? 1800 : Math.round(14000 / calcTrekkers);
    const valleyNights = Math.min(calcDays - 2, 2);
    const kohimaNights = Math.max(calcDays - valleyNights - 1, 1);

    const kohimaStay = kohimaNights * 1200;
    const valleyStay = calcStay === "dorm" ? valleyNights * 350 : valleyNights * 1200;
    const foodCost = calcDays * 650;
    const guidePerPerson = calcGuide ? Math.round((calcDays * 2200) / calcTrekkers) : 0;

    const total = ilpFee + sayoFee + sanitationFee + transportPerPerson + kohimaStay + valleyStay + foodCost + guidePerPerson;

    return {
      perPerson: total,
      totalGroup: total * calcTrekkers,
      breakdown: {
        permits: ilpFee + sayoFee + sanitationFee,
        transit: transportPerPerson,
        stay: kohimaStay + valleyStay,
        food: foodCost,
        guide: guidePerPerson
      }
    };
  }, [calcTrekkers, calcDays, calcStay, calcTransport, calcGuide]);

  const copyTripSummary = () => {
    const text = `DZUKOU VALLEY TREK PLAN (${calcDays}D / ${calcDays - 1}N)
Trekkers: ${calcTrekkers}
Accommodation: ${calcStay === "dorm" ? "Rest House Dormitory" : "Tented Pitch"}
Transit: ${calcTransport === "shared" ? "Shared Sumo & Train" : "Private 4x4 Bolero"}
Guide: ${calcGuide ? "Local Angami Guide" : "Self-Guided"}
Estimated Total: ₹${calculatedCost.perPerson.toLocaleString()} per person (Group: ₹${calculatedCost.totalGroup.toLocaleString()})
Route: Guwahati → Dimapur → Kohima → Viswema → Dzukou Valley → Jakhama → Guwahati`;

    navigator.clipboard.writeText(text).then(() => {
      showToast("Copied trip summary to clipboard");
    });
  };

  return (
    <div className="dzukou-root">
      <main>
        {/* Toast Notification */}
        {toastMsg && (
          <div className="toast" role="status">
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Smooth Morphing Minimalist Header */}
        <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
          <div className="nav-container">
            <a
              className="brand"
              href="#top"
              onClick={(e) => scrollToSection(e, "top")}
              aria-label="Dzukou guide home"
            >
              <MountainMark />
              <span>
                DZUKOU
                <br />
                FIELD NOTES
              </span>
            </a>

            <div className="nav-links">
              <a href="#choose" onClick={(e) => scrollToSection(e, "choose")}>
                Itineraries
              </a>
              <a href="#route" onClick={(e) => scrollToSection(e, "route")}>
                Route
              </a>
              <a href="#field-guide" onClick={(e) => scrollToSection(e, "field-guide")}>
                Field guide
              </a>
              <a
                href="#calculator"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCalcOpen(true);
                }}
              >
                Calculator
              </a>
            </div>

            <a
              className="nav-cta"
              href="#choose"
              onClick={(e) => {
                e.preventDefault();
                setIsCalcOpen(true);
              }}
            >
              <span>PLAN MY TREK</span>
              <ArrowIcon />
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero" id="top">
          <Image
            src="/images/dzukou-sunrise.jpg"
            alt="Sunrise and mist over the rolling hills of Dzukou Valley"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="shell hero-content">
            <p className="eyebrow light">
              <span>2026 EDITION</span> NAGALAND · INDIA
            </p>
            <h1>
              <span>DZUKOU</span>
              <em>VALLEY</em>
            </h1>
            <div className="hero-bottom">
              <p>
                A practical, visual trek planner from Guwahati—built for clear choices, lighter packs and slower mornings
                above the clouds.
              </p>
              <a
                href="#choose"
                onClick={(e) => scrollToSection(e, "choose")}
                className="round-link"
                aria-label="Explore itinerary options"
              >
                <ArrowIcon />
              </a>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="quick-stats shell">
            <div>
              <span>ALTITUDE</span>
              <strong>2,450 m</strong>
              <small>8,045 ft</small>
            </div>
            <div>
              <span>GRADE</span>
              <strong>Moderate</strong>
              <small>Steep in sections</small>
            </div>
            <div>
              <span>BEST BALANCE</span>
              <strong>5D / 4N</strong>
              <small>Two valley nights</small>
            </div>
            <div>
              <span>IDEAL WINDOW</span>
              <strong>Oct–Nov</strong>
              <small>Clearest views</small>
            </div>
          </div>
        </section>

        {/* Intro Overview */}
        <section className="intro shell section-pad">
          <div>
            <p className="eyebrow">THE JOURNEY</p>
            <h2>
              One valley.<br />
              Five ways in.
            </h2>
          </div>
          <div className="intro-copy">
            <p>
              Dzukou rewards time, but it can fit a long weekend. Compare every realistic duration, then open the
              day-by-day plan that suits your fitness and leave.
            </p>
            <div className="mini-rule">
              <span>01</span>
              <p>Enter by Viswema for the more gradual approach.</p>
            </div>
            <div className="mini-rule">
              <span>02</span>
              <p>Exit via Jakhama for a shorter, steeper descent.</p>
            </div>
          </div>
        </section>

        {/* Itinerary Planner */}
        <section className="planner section-pad" id="choose">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="eyebrow">CHOOSE YOUR PACE</p>
                <h2>Find your itinerary</h2>
              </div>
              <p>Indicative independent-travel budgets per person. Tap a duration to reveal the complete plan.</p>
            </div>

            {/* Plan Tabs */}
            <div className="plan-tabs" role="tablist" aria-label="Trek duration">
              {plans.map((item) => (
                <button
                  key={item.id}
                  className={`plan-tab-item ${selected === item.id ? "active" : ""}`}
                  onClick={() => choosePlan(item.id)}
                  role="tab"
                  aria-selected={selected === item.id}
                >
                  <div className="tab-header">
                    <span>{item.short}</span>
                    {item.recommended && <b>BEST</b>}
                  </div>
                  <small>{item.label}</small>
                </button>
              ))}
            </div>

            {/* Plan Summary */}
            <div className="plan-summary">
              <div className="plan-title">
                <p className="eyebrow">{plan.pace.toUpperCase()} PACE</p>
                <h3>{plan.label}</h3>
                <p>{plan.note}</p>
              </div>
              <div className="plan-data">
                <div>
                  <span>GOOD FOR</span>
                  <strong>{plan.fit}</strong>
                </div>
                <div>
                  <span>EST. BUDGET</span>
                  <strong>{plan.budget}</strong>
                  <a
                    href="#calc"
                    className="calc-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setCalcDays(plan.daysCount);
                      setIsCalcOpen(true);
                    }}
                  >
                    Customise budget →
                  </a>
                </div>
                <div>
                  <span>DURATION</span>
                  <strong>{plan.short}</strong>
                </div>
              </div>
            </div>

            {/* Day Grid with Minimalist Field Note Typography */}
            <div className="day-grid">
              <div className="days-list">
                {plan.days.map((day, index) => {
                  const isOpen = openDay === index;
                  return (
                    <div key={day.num} className={`day-item ${isOpen ? "is-active" : ""}`}>
                      <button
                        className={`day-btn ${isOpen ? "open" : ""}`}
                        onClick={() => setOpenDay(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="day-num">DAY {day.num}</span>
                        <div className="day-text">
                          <strong>{day.title}</strong>
                          <small>{day.route}</small>
                        </div>
                        <i className="day-toggle-icon">{isOpen ? "−" : "+"}</i>
                      </button>

                      {/* Pure Minimalist Field Notes Drawer */}
                      {isOpen && (
                        <div className="day-drawer">
                          <div className="drawer-meta">
                            <span>Alt: {day.alt}</span>
                            <span>Time: {day.time}</span>
                          </div>
                          <p className="drawer-desc">{day.desc}</p>
                          <p className="drawer-note">
                            <span className="note-label">Note:</span> {day.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop Day Detail Card */}
              <div className="day-detail" aria-live="polite">
                <span>DAY {plan.days[openDay].num} · FIELD PLAN</span>
                <h3>{plan.days[openDay].title}</h3>
                <h4>{plan.days[openDay].route}</h4>
                <p>{plan.days[openDay].desc}</p>
                <div className="day-note">
                  <strong>Field Note:</strong> {plan.days[openDay].tip}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Route Section with Interactive Milepost Cards */}
        <section className="route-section" id="route">
          <div className="route-image">
            <Image
              src="/images/dzukou-trail.jpg"
              alt="Trail across bamboo-covered hills in Dzukou Valley"
              fill
              sizes="100vw"
            />
            <div className="route-overlay" />
            <div className="shell route-copy">
              <p className="eyebrow light">THE SIGNATURE LINE</p>
              <h2>
                From river plains<br />
                to bamboo ridges.
              </h2>
            </div>
          </div>

          {/* Interactive Route Track */}
          <div className="route-track shell" role="tablist" aria-label="Route explorer">
            {routeStops.map((stop, index) => (
              <button
                className={`route-stop ${selectedStop === index ? "active" : ""}`}
                key={stop.name}
                onClick={() => setSelectedStop(index)}
                role="tab"
                aria-selected={selectedStop === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stop.name}</strong>
                <small>{stop.alt}</small>
              </button>
            ))}
          </div>

          {/* Route Milepost Detail Card */}
          <div className="route-detail shell" aria-live="polite">
            <div className="route-detail-head">
              <div>
                <span>MILEPOST 0{selectedStop + 1}</span>
                <h3>{routeStops[selectedStop].name} ({routeStops[selectedStop].alt})</h3>
              </div>
              <div className="route-detail-meta">
                <strong>{routeStops[selectedStop].transit}</strong>
                <small>{routeStops[selectedStop].time}</small>
              </div>
            </div>
            <p>{routeStops[selectedStop].desc}</p>
          </div>
        </section>

        {/* Signature 5-Day Plan */}
        <section className="signature shell section-pad">
          <div className="portrait-card">
            <Image
              src="/images/dzukou-ridge.jpg"
              alt="Trekker photographing Dzukou Valley from a ridge"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
            <span>THE RIDGE · GOLDEN HOUR</span>
          </div>
          <div className="signature-copy">
            <p className="eyebrow">WHY 5D / 4N WINS</p>
            <h2>Room for the valley to unfold.</h2>
            <p>
              The signature plan protects the best part of the journey: a full day below the rest house, following the stream
              between rounded hills without needing to race for the exit.
            </p>
            <div className="quote">“Arrive with enough time to notice the landscape changing.”</div>
            <a
              href="#choose"
              onClick={(e) => {
                scrollToSection(e, "choose");
                choosePlan("five");
              }}
            >
              Open the 5-day plan <ArrowIcon />
            </a>
          </div>
        </section>

        {/* Explore Band */}
        <section className="explore-band">
          <Image
            src="/images/dzukou-stream.jpg"
            alt="Trekker overlooking a stream on the Dzukou Valley floor"
            fill
            sizes="100vw"
          />
          <div className="explore-shade" />
          <div className="shell explore-copy">
            <span className="index">03</span>
            <div>
              <p className="eyebrow light">VALLEY DAY</p>
              <h2>
                Follow the water.<br />
                Stay for the quiet.
              </h2>
              <p>
                Budget 5–7 walking hours for the stream, caves and viewpoints. Carry lunch, a warm layer and rain
                protection even when the morning looks clear.
              </p>
            </div>
          </div>
        </section>

        {/* Field Guide & Interactive Packing Assistant */}
        <section className="field shell section-pad" id="field-guide">
          <div className="section-head">
            <div>
              <p className="eyebrow">TREKKER’S FIELD GUIDE</p>
              <h2>Pack for change</h2>
            </div>
            <p>The valley can move from sun to cloud and rain within hours. Keep the system simple, dry and easy to carry.</p>
          </div>
          <div className="field-grid">
            <div className="season-card">
              <Image
                src="/images/dzukou-flora.jpg"
                alt="Wildflowers and green hills in Dzukou Valley during monsoon"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className="season-copy">
                <p className="eyebrow light">SEASON SELECTOR</p>
                <div>
                  <span>OCT–NOV</span>
                  <strong>Clearest views</strong>
                </div>
                <div>
                  <span>LATE JUN–JUL</span>
                  <strong>Wildflowers + rain</strong>
                </div>
                <div>
                  <span>DEC–FEB</span>
                  <strong>Cold + possible frost</strong>
                </div>
              </div>
            </div>

            <div className="check-card">
              <div className="check-image">
                <Image
                  src="/images/dzukou-descent.jpg"
                  alt="Trekkers moving through shrubs beneath dramatic clouds"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
              <div className="check-content">
                <p className="eyebrow">TAP TO PACK</p>
                <h3>Four non-negotiables</h3>
                {packingItems.map((item) => {
                  const isChecked = checked.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleCheck(item)}
                      className={isChecked ? "checked" : ""}
                      role="checkbox"
                      aria-checked={isChecked}
                    >
                      <i>{isChecked ? "✓" : ""}</i>
                      <span>{item}</span>
                    </button>
                  );
                })}
                <div className="check-footer">
                  <small>{checked.length}/4 ready</small>
                  <button
                    className="print-link"
                    onClick={() => window.print()}
                  >
                    Print packing list ↑
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="advice-grid">
            <article>
              <span>01 / PERMIT</span>
              <h3>Nagaland ILP</h3>
              <p>
                Indian visitors who require an Inner Line Permit should arrange it before travel and keep a digital and
                printed copy.
              </p>
            </article>
            <article>
              <span>02 / MONEY</span>
              <h3>Carry small cash</h3>
              <p>
                Connectivity and digital payments can be unreliable. Carry small denominations for trail fees, food and simple
                lodging.
              </p>
            </article>
            <article>
              <span>03 / TRACE</span>
              <h3>Everything back out</h3>
              <p>Carry every wrapper, bottle and piece of plastic back to town. Pack a dedicated waste pouch.</p>
            </article>
          </div>
        </section>

        {/* Night Band */}
        <section className="night-band">
          <Image
            src="/images/dzukou-night.jpg"
            alt="A trekker standing before Dzukou Valley at twilight"
            fill
            sizes="100vw"
          />
          <div className="night-shade" />
          <div className="shell night-copy">
            <p className="eyebrow light">VALLEY NIGHTS</p>
            <h2>
              Cold air.<br />
              Early light.
            </h2>
            <p>
              Accommodation is simple and temperatures drop quickly after sunset. Bring a warm layer, headlamp and enough
              cash for food and bedding.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer shell">
          <div className="brand">
            <MountainMark />
            <span>
              DZUKOU
              <br />
              FIELD NOTES
            </span>
          </div>
          <p>
            Plan lightly. Walk responsibly.
            <br />
            Verify permits, transport and trail conditions before departure.
          </p>
          <a href="#top" onClick={(e) => scrollToSection(e, "top")}>
            BACK TO TOP ↑
          </a>
        </footer>

        {/* ========================================================================= */}
        {/* CLEAN MINIMALIST TRIP BUDGET ESTIMATOR MODAL */}
        {/* ========================================================================= */}
        {isCalcOpen && (
          <div
            className="modal-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsCalcOpen(false);
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-content">
              <div className="modal-head">
                <div>
                  <span className="eyebrow">ESTIMATOR</span>
                  <h2>Trip Budget Calculator</h2>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setIsCalcOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                {/* Form Controls */}
                <div className="modal-controls">
                  <div className="control-group">
                    <div className="control-label">
                      <span>TREKKERS</span>
                      <strong>{calcTrekkers} {calcTrekkers === 1 ? "Person" : "People"}</strong>
                    </div>
                    <div className="stepper">
                      <button
                        onClick={() => setCalcTrekkers((p) => Math.max(1, p - 1))}
                        disabled={calcTrekkers <= 1}
                      >
                        −
                      </button>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={calcTrekkers}
                        onChange={(e) => setCalcTrekkers(Number(e.target.value))}
                      />
                      <button
                        onClick={() => setCalcTrekkers((p) => Math.min(10, p + 1))}
                        disabled={calcTrekkers >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="control-group">
                    <div className="control-label">
                      <span>DURATION</span>
                      <strong>{calcDays} Days / {calcDays - 1} Nights</strong>
                    </div>
                    <div className="duration-pills">
                      {[3, 4, 5, 6, 7].map((d) => (
                        <button
                          key={d}
                          className={calcDays === d ? "active" : ""}
                          onClick={() => {
                            setCalcDays(d);
                            const matching = plans.find((p) => p.daysCount === d);
                            if (matching) setSelected(matching.id);
                          }}
                        >
                          {d}D
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="control-group">
                    <div className="control-label">
                      <span>STAY PREFERENCE</span>
                    </div>
                    <div className="option-row">
                      <button
                        className={calcStay === "dorm" ? "active" : ""}
                        onClick={() => setCalcStay("dorm")}
                      >
                        <strong>Rest House Dorm</strong>
                        <small>₹350/night</small>
                      </button>
                      <button
                        className={calcStay === "tent" ? "active" : ""}
                        onClick={() => setCalcStay("tent")}
                      >
                        <strong>Tented Pitch</strong>
                        <small>₹1,200/night</small>
                      </button>
                    </div>
                  </div>

                  <div className="control-group">
                    <div className="control-label">
                      <span>TRANSIT MODE</span>
                    </div>
                    <div className="option-row">
                      <button
                        className={calcTransport === "shared" ? "active" : ""}
                        onClick={() => setCalcTransport("shared")}
                      >
                        <strong>Shared Sumo & Train</strong>
                        <small>Economical</small>
                      </button>
                      <button
                        className={calcTransport === "private" ? "active" : ""}
                        onClick={() => setCalcTransport("private")}
                      >
                        <strong>Private 4x4 Bolero</strong>
                        <small>Dedicated</small>
                      </button>
                    </div>
                  </div>

                  <div className="control-checkbox">
                    <input
                      type="checkbox"
                      id="guideCheck"
                      checked={calcGuide}
                      onChange={(e) => setCalcGuide(e.target.checked)}
                    />
                    <label htmlFor="guideCheck">
                      <strong>Include Local Angami Guide</strong>
                      <small>₹2,200/day split among group</small>
                    </label>
                  </div>
                </div>

                {/* Estimate Summary */}
                <div className="modal-summary">
                  <span className="eyebrow light">ESTIMATE</span>
                  <div className="total-display">
                    <strong>₹{calculatedCost.perPerson.toLocaleString()}</strong>
                    <small>/ person</small>
                  </div>
                  <div className="group-total">
                    <span>Group Total ({calcTrekkers}):</span>
                    <strong>₹{calculatedCost.totalGroup.toLocaleString()}</strong>
                  </div>

                  <div className="breakdown">
                    <div>
                      <span>Permits (ILP + SAYO)</span>
                      <strong>₹{calculatedCost.breakdown.permits}</strong>
                    </div>
                    <div>
                      <span>Transit & cabs</span>
                      <strong>₹{calculatedCost.breakdown.transit.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>Stays & bedding</span>
                      <strong>₹{calculatedCost.breakdown.stay.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>Food & tea</span>
                      <strong>₹{calculatedCost.breakdown.food.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>Guide share</span>
                      <strong>₹{calculatedCost.breakdown.guide.toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button className="btn-modal-action" onClick={copyTripSummary}>
                      Copy summary
                    </button>
                    <button className="btn-modal-action secondary" onClick={() => window.print()}>
                      Print plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
