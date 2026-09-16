/**
 * Google Sheets Integration Helper for Divine View Tours
 * 
 * Securely and asynchronously appends new booking requests to a live Google Sheet
 * via Google Apps Script Webhook.
 */

export async function appendBookingToGoogleSheet(enquiry) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl || typeof webhookUrl !== "string" || !webhookUrl.startsWith("http")) {
    // Graceful fallback when webhook URL is not yet configured
    return {
      sent: false,
      reason: "GOOGLE_SHEETS_WEBHOOK_URL is not configured in environment variables",
    };
  }

  // Format clean Indian Standard Time (IST) timestamp
  const now = new Date();
  const istDateStr = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);

  const cleanPhone = (enquiry.phone || "").replace(/[^0-9]/g, "");
  const whatsappLink = cleanPhone ? `https://wa.me/${cleanPhone}` : "";

  // Prepare structured row payload
  const payload = {
    timestamp: istDateStr,
    reference: enquiry.reference || "",
    serialNumber: enquiry.serialNumber != null ? `#${enquiry.serialNumber}` : "",
    customerName: enquiry.customerName || "",
    phone: enquiry.phone || "",
    whatsappLink,
    email: enquiry.email || "Not provided",
    preferredContact: (enquiry.preferredContact || "whatsapp").toUpperCase(),
    bookingType: (enquiry.type || "Tour").toUpperCase(),
    packageOrRoute: enquiry.packageTitle || enquiry.routeName || (enquiry.type || "Custom Trip"),
    startDate: enquiry.startDate || enquiry.travelMonth || "Flexible",
    duration: enquiry.days ? `${enquiry.days} Days` : (enquiry.tripDuration || "Standard"),
    travellers: enquiry.travellers || `${enquiry.adults || 2} Adults`,
    pickup: enquiry.pickup || enquiry.startingCity || "Guwahati",
    notes: enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message || "",
    status: "New",
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7-second safe timeout

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const resultText = await response.text();
    let resultJson = null;
    try {
      resultJson = JSON.parse(resultText);
    } catch {
      resultJson = { raw: resultText };
    }

    console.log(`[Google Sheets] Booking ${enquiry.reference} appended successfully.`);
    return {
      sent: true,
      provider: "google_sheets",
      response: resultJson,
    };
  } catch (err) {
    console.warn(`[Google Sheets Warning] Could not append booking ${enquiry.reference}:`, err.message);
    return {
      sent: false,
      provider: "google_sheets",
      error: err.message,
    };
  }
}
