"use client";

/**
 * Campaign & Lead Attribution Tracking for Divine View Tours
 * 
 * Captures UTM parameters, landing page, and ad click identifiers (gclid).
 * Emits distinct analytics events for 'contact_intent' (WhatsApp / Phone click)
 * vs 'generate_lead' (form successfully stored).
 * Ensures personal contact details (PII) are NEVER passed into analytics parameters or URLs.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
];

const STORAGE_KEY = "dvt_campaign_attribution";

/**
 * Initialize and capture campaign parameters on landing
 */
export function initCampaignTracking() {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    const updated = { ...existing };

    let hasNewData = false;
    UTM_KEYS.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        updated[key] = val.slice(0, 100);
        hasNewData = true;
      }
    });

    if (!updated.landing_page) {
      updated.landing_page = window.location.pathname.slice(0, 150);
      hasNewData = true;
    }

    if (hasNewData) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    // Graceful fallback for restricted storage environments
  }
}

/**
 * Retrieve cached campaign attribution object for enquiry submission payloads
 */
export function getCampaignData() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * Track distinct 'contact_intent' event (WhatsApp or Phone link click)
 * Does NOT log a submitted lead, accurately distinguishing intent from completed enquiries.
 */
export function trackContactIntent(method = "whatsapp") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_intent", {
      event_category: "engagement",
      contact_method: method,
      page_location: window.location.pathname,
    });
  }
}

/**
 * Track completed lead generation event upon successful server storage
 */
export function trackEnquirySubmitted(reference, packageSlugOrTitle) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "enquiry",
      event_label: reference || "DVT-LEAD",
      trip_package: packageSlugOrTitle || "custom",
      value: 1,
    });
  }
}
