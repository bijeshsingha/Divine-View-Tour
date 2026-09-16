import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import siteConfig from "@/data/siteConfig.json";
import { appendBookingToGoogleSheet, fetchBookingsFromGoogleSheet } from "@/lib/googleSheets";
import { verifyAdminRequest } from "@/lib/adminAuth";

// Allowlist of supported enquiry types
const ALLOWED_TYPES = ["package", "custom_trip", "vehicle_hire", "contact_message"];
const ALLOWED_CONTACT_METHODS = ["whatsapp", "phone", "email"];

// Helper to sanitize string inputs (strips dangerous HTML/script tags and control characters)
function sanitizeString(str, maxLength = 255) {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // Strip angle brackets to prevent HTML injection
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // Remove control characters
    .trim()
    .slice(0, maxLength);
}

// Basic phone validation (digits, spaces, plus, hyphens, parentheses, 7 to 20 chars)
function isValidPhone(phone) {
  if (typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

// Basic email validation
function isValidEmail(email) {
  if (!email) return true; // optional
  if (typeof email !== "string" || email.length > 100) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Format and dispatch booking notification email
async function sendBookingNotificationEmail(enquiry) {
  const recipients =
    process.env.BOOKING_NOTIFICATION_EMAIL ||
    siteConfig.bookingEmail ||
    "bookings@divineviewtours.com";

  const cleanPhone = (enquiry.phone || "").replace(/[^0-9]/g, "");
  const subject = `[New Booking #${enquiry.serialNumber}] ${enquiry.reference} - ${enquiry.customerName} (${(enquiry.type || "Tour").toUpperCase()})`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172C26; max-width: 600px; margin: 0 auto; border: 1px solid #DEDCCD; border-radius: 12px; overflow: hidden; background-color: #FFFDF7;">
      <div style="background-color: #082D27; color: #F7F3E9; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; color: #D9A441; letter-spacing: 1px;">DIVINE VIEW TOURS</h2>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">New Online Booking Request Logged</p>
      </div>

      <div style="padding: 24px;">
        <div style="background-color: #E9F0EA; border-left: 4px solid #103F36; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
          <strong style="color: #103F36; font-size: 14px;">Serial Number:</strong> #${enquiry.serialNumber}<br>
          <strong style="color: #103F36; font-size: 14px;">Enquiry Reference:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #103F36;">${enquiry.reference}</span><br>
          <strong style="color: #103F36; font-size: 14px;">Booking Type:</strong> ${(enquiry.type || "").toUpperCase()}
        </div>

        <h3 style="color: #103F36; border-bottom: 1px solid #DEDCCD; padding-bottom: 6px; margin-top: 0;">Guest Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #59665E; width: 140px;"><strong>Full Name:</strong></td>
            <td style="padding: 6px 0; color: #172C26;"><strong>${enquiry.customerName}</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #59665E;"><strong>Phone / WhatsApp:</strong></td>
            <td style="padding: 6px 0;"><a href="tel:${enquiry.phone}" style="color: #103F36; font-weight: bold;">${enquiry.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #59665E;"><strong>Email:</strong></td>
            <td style="padding: 6px 0;">${enquiry.email ? `<a href="mailto:${enquiry.email}" style="color: #103F36;">${enquiry.email}</a>` : '<em style="color: #888;">Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #59665E;"><strong>Preferred Contact:</strong></td>
            <td style="padding: 6px 0; text-transform: capitalize;">${enquiry.preferredContact}</td>
          </tr>
        </table>

        <h3 style="color: #103F36; border-bottom: 1px solid #DEDCCD; padding-bottom: 6px;">Trip / Itinerary Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          ${enquiry.packageTitle ? `<tr><td style="padding: 6px 0; color: #59665E; width: 140px;"><strong>Package:</strong></td><td style="padding: 6px 0; font-weight: bold; color: #103F36;">${enquiry.packageTitle}</td></tr>` : ""}
          ${enquiry.routeName ? `<tr><td style="padding: 6px 0; color: #59665E; width: 140px;"><strong>Vehicle Route:</strong></td><td style="padding: 6px 0; font-weight: bold; color: #103F36;">${enquiry.routeName}</td></tr>` : ""}
          ${enquiry.vehicleType ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Vehicle Selected:</strong></td><td style="padding: 6px 0; font-weight: bold;">${enquiry.vehicleType}</td></tr>` : ""}
          ${enquiry.startDate ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Start Date:</strong></td><td style="padding: 6px 0; font-weight: bold;">${enquiry.startDate}</td></tr>` : ""}
          ${enquiry.travelMonth ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Travel Month:</strong></td><td style="padding: 6px 0; font-weight: bold;">${enquiry.travelMonth}</td></tr>` : ""}
          ${enquiry.tripDuration ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Trip Duration:</strong></td><td style="padding: 6px 0;">${enquiry.tripDuration}</td></tr>` : ""}
          ${enquiry.days ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Total Days:</strong></td><td style="padding: 6px 0;">${enquiry.days} Days</td></tr>` : ""}
          ${enquiry.travellers ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Travellers:</strong></td><td style="padding: 6px 0;">${enquiry.travellers}</td></tr>` : ""}
          ${enquiry.adults ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Group:</strong></td><td style="padding: 6px 0;">${enquiry.adults} Adults, ${enquiry.childrenCount || 0} Children, ${enquiry.seniorCount || 0} Seniors</td></tr>` : ""}
          ${enquiry.destinations?.length ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Destinations:</strong></td><td style="padding: 6px 0;">${enquiry.destinations.join(" · ")}</td></tr>` : ""}
          ${enquiry.startingCity ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Starting City:</strong></td><td style="padding: 6px 0;">${enquiry.startingCity}</td></tr>` : ""}
          ${enquiry.pickup ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Pickup Location:</strong></td><td style="padding: 6px 0;">${enquiry.pickup}</td></tr>` : ""}
          ${enquiry.stayPreference ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Stay Category:</strong></td><td style="padding: 6px 0; text-transform: capitalize;">${enquiry.stayPreference}</td></tr>` : ""}
          ${enquiry.budgetRange ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Budget Range:</strong></td><td style="padding: 6px 0;">${enquiry.budgetRange}</td></tr>` : ""}
          ${enquiry.interests?.length ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Interests:</strong></td><td style="padding: 6px 0;">${enquiry.interests.join(", ")}</td></tr>` : ""}
          ${enquiry.subject ? `<tr><td style="padding: 6px 0; color: #59665E;"><strong>Subject:</strong></td><td style="padding: 6px 0;">${enquiry.subject}</td></tr>` : ""}
        </table>

        ${
          enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message
            ? `
          <div style="background-color: #F7F3E9; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
            <strong style="color: #103F36; font-size: 13px; text-transform: uppercase;">Special Requests & Notes:</strong>
            <p style="margin: 6px 0 0; font-size: 14px; color: #172C26;">${
              enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message
            }</p>
          </div>
        `
            : ""
        }

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #DEDCCD;">
          <a href="https://wa.me/${cleanPhone}" style="display: inline-block; background-color: #237A50; color: #ffffff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">
            Chat on WhatsApp
          </a>
          <a href="tel:${enquiry.phone}" style="display: inline-block; background-color: #103F36; color: #ffffff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 14px;">
            Call Traveler
          </a>
        </div>
      </div>

      <div style="background-color: #F7F3E9; padding: 12px 24px; text-align: center; font-size: 11px; color: #59665E;">
        Divine View Tours Operations Desk · Guwahati, Assam · Phone: ${siteConfig.phone}
      </div>
    </div>
  `;

  const text = `
NEW BOOKING ENQUIRY - DIVINE VIEW TOURS
---------------------------------------
Serial Number: #${enquiry.serialNumber}
Reference: ${enquiry.reference}
Type: ${(enquiry.type || "").toUpperCase()}
Date Logged: ${enquiry.createdAt}

CUSTOMER DETAILS:
- Name: ${enquiry.customerName}
- Phone: ${enquiry.phone}
- Email: ${enquiry.email || "Not provided"}
- Preferred Contact: ${enquiry.preferredContact}

TRIP DETAILS:
${enquiry.packageTitle ? `- Package: ${enquiry.packageTitle}\n` : ""}${enquiry.routeName ? `- Vehicle Route: ${enquiry.routeName}\n` : ""}${enquiry.vehicleType ? `- Vehicle: ${enquiry.vehicleType}\n` : ""}${enquiry.startDate ? `- Start Date: ${enquiry.startDate}\n` : ""}${enquiry.travelMonth ? `- Travel Month: ${enquiry.travelMonth}\n` : ""}${enquiry.tripDuration ? `- Duration: ${enquiry.tripDuration}\n` : ""}${enquiry.days ? `- Days: ${enquiry.days}\n` : ""}${enquiry.travellers ? `- Travellers: ${enquiry.travellers}\n` : ""}${enquiry.adults ? `- Group: ${enquiry.adults} Adults, ${enquiry.childrenCount || 0} Children, ${enquiry.seniorCount || 0} Seniors\n` : ""}${enquiry.destinations?.length ? `- Destinations: ${enquiry.destinations.join(", ")}\n` : ""}${enquiry.pickup ? `- Pickup: ${enquiry.pickup}\n` : ""}${enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message ? `- Notes: ${enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message}\n` : ""}
CONNECT:
- WhatsApp: https://wa.me/${cleanPhone}
- Call: tel:${enquiry.phone}
`;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpFrom =
    process.env.SMTP_FROM ||
    `"Divine View Tours Desk" <${smtpUser || "info@divineviewtours.com"}>`;

  let smtpResult = null;
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: recipients,
        replyTo: enquiry.email || undefined,
        subject,
        text,
        html,
      });

      console.log(`[Email Dispatched via SMTP] Booking #${enquiry.serialNumber} sent to ${recipients}`);
      smtpResult = { sent: true, provider: "smtp", recipient: recipients };
    } catch (mailErr) {
      console.error("[SMTP Error] Failed to dispatch email:", mailErr.message);
      smtpResult = { sent: false, provider: "smtp", error: mailErr.message };
    }
  }

  // FormSubmit relay (completely disabled unless explicitly enabled via ENABLE_FORMSUBMIT=true)
  let relayResult = null;
  if (process.env.ENABLE_FORMSUBMIT === "true") {
    const primaryEmail = (recipients.split(",")[0] || "info@divineviewtours.com").trim();
    try {
      const relayRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primaryEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Referer": "https://www.divineviewtours.com",
          "Origin": "https://www.divineviewtours.com",
        },
        body: JSON.stringify({
          _subject: subject,
          Reference_Code: enquiry.reference,
          Serial: `#${enquiry.serialNumber}`,
          Customer_Name: enquiry.customerName,
          Phone: enquiry.phone,
          Email: enquiry.email || "Not provided",
          Preferred_Contact: enquiry.preferredContact,
          Booking_Type: (enquiry.type || "").toUpperCase(),
          Package_or_Route: enquiry.packageTitle || enquiry.routeName || enquiry.type,
          Vehicle_Type: enquiry.vehicleType || "Private Transport",
          Start_Date: enquiry.startDate || enquiry.travelMonth || "Flexible",
          Duration: enquiry.days ? `${enquiry.days} Days` : (enquiry.tripDuration || "Standard"),
          Travellers: enquiry.travellers || `${enquiry.adults || 2} Adults`,
          Notes: enquiry.notes || enquiry.specialRequests || enquiry.specialWishes || enquiry.message || "None",
        }),
      });

      const relayJson = await relayRes.json();
      console.log(`[Live Email Relay to ${primaryEmail}]:`, relayJson);
      relayResult = { sent: true, provider: "formsubmit", response: relayJson };
    } catch (relayErr) {
      console.warn("[Live Email Relay Notice]:", relayErr.message);
      relayResult = { sent: false, provider: "formsubmit", error: relayErr.message };
    }
  }

  return {
    sent: Boolean(smtpResult?.sent || relayResult?.sent),
    recipient: recipients,
    smtp: smtpResult,
    relay: relayResult,
  };
}

export async function POST(request) {
  try {
    // 1. Enforce payload size limit (max 16KB to prevent resource exhaustion / DoS)
    const rawBody = await request.text();
    if (rawBody.length > 16384) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds size limit (16KB maximum)" },
        { status: 413 }
      );
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // 2. Validate enquiry type
    const enquiryType = body.type;
    if (!enquiryType || !ALLOWED_TYPES.includes(enquiryType)) {
      return NextResponse.json(
        { success: false, error: `Invalid enquiry type. Must be one of: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    const errors = {};

    // 3. Validate name (supports customerName or name)
    const rawName = body.customerName || body.name;
    const name = sanitizeString(rawName, 100);
    if (!name || name.length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    }

    // 4. Validate phone
    const phone = sanitizeString(body.phone, 25);
    if (!phone || !isValidPhone(phone)) {
      errors.phone = "A valid contact phone or WhatsApp number is required.";
    }

    // 5. Validate email (optional)
    const email = body.email ? sanitizeString(body.email, 100) : "";
    if (email && !isValidEmail(email)) {
      errors.email = "Please provide a valid email address.";
    }

    // 6. Validate contact preference
    const preferredContact = ALLOWED_CONTACT_METHODS.includes(body.preferredContact)
      ? body.preferredContact
      : "whatsapp";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors },
        { status: 400 }
      );
    }

    // 7. Sanitize and bound optional payload fields based on enquiry type
    const sanitizedData = {
      customerName: name,
      phone,
      email: email || undefined,
      preferredContact,
    };

    if (enquiryType === "package") {
      sanitizedData.packageId = sanitizeString(body.packageId, 100);
      sanitizedData.packageTitle = sanitizeString(body.packageTitle, 150);
      sanitizedData.startDate = sanitizeString(body.startDate, 30);
      sanitizedData.travellers = sanitizeString(body.travellers, 20);
      sanitizedData.pickup = sanitizeString(body.pickup, 100);
      sanitizedData.notes = sanitizeString(body.notes, 1000);
    } else if (enquiryType === "custom_trip") {
      sanitizedData.destinations = Array.isArray(body.destinations)
        ? body.destinations.map((d) => sanitizeString(d, 50)).slice(0, 10)
        : [];
      sanitizedData.travelMonth = sanitizeString(body.travelMonth, 50);
      sanitizedData.tripDuration = sanitizeString(body.tripDuration, 50);
      sanitizedData.startingCity = sanitizeString(body.startingCity, 100);
      sanitizedData.adults = typeof body.adults === "number" ? Math.min(Math.max(1, body.adults), 50) : 2;
      sanitizedData.childrenCount = typeof body.childrenCount === "number" ? Math.min(Math.max(0, body.childrenCount), 30) : 0;
      sanitizedData.seniorCount = typeof body.seniorCount === "number" ? Math.min(Math.max(0, body.seniorCount), 30) : 0;
      sanitizedData.interests = Array.isArray(body.interests)
        ? body.interests.map((i) => sanitizeString(i, 80)).slice(0, 15)
        : [];
      sanitizedData.pace = sanitizeString(body.pace, 100);
      sanitizedData.stayPreference = sanitizeString(body.stayPreference, 100);
      sanitizedData.vehiclePreference = sanitizeString(body.vehiclePreference, 100);
      sanitizedData.budgetRange = sanitizeString(body.budgetRange, 100);
      sanitizedData.specialWishes = sanitizeString(body.specialWishes, 1000);
      sanitizedData.accessibilityNotes = sanitizeString(body.accessibilityNotes, 1000);
    } else if (enquiryType === "vehicle_hire") {
      sanitizedData.routeName = sanitizeString(body.routeName, 150);
      sanitizedData.vehicleType = sanitizeString(body.vehicleType, 50);
      sanitizedData.days = typeof body.days === "number" ? Math.min(Math.max(1, body.days), 60) : 5;
      sanitizedData.startDate = sanitizeString(body.startDate, 30);
      sanitizedData.specialRequests = sanitizeString(body.specialRequests, 1000);
    } else if (enquiryType === "contact_message") {
      sanitizedData.subject = sanitizeString(body.subject, 100);
      sanitizedData.message = sanitizeString(body.message, 2000);
    }

    // 8. Read existing enquiries to generate sequential zero-indexed serial number
    const enquiriesFilePath = path.join(process.cwd(), "src", "data", "enquiries.json");
    let enquiriesList = [];

    try {
      if (fs.existsSync(enquiriesFilePath)) {
        const fileContent = fs.readFileSync(enquiriesFilePath, "utf-8");
        enquiriesList = JSON.parse(fileContent);
        if (!Array.isArray(enquiriesList)) enquiriesList = [];
      }
    } catch (e) {
      console.error("Warning: Could not read existing enquiries file:", e.message);
      enquiriesList = [];
    }

    // 9. Generate strictly incrementing serial number and reference code: DVT-2026-0000, DVT-2026-0001, etc.
    let maxSerial = -1;
    for (const item of enquiriesList) {
      if (typeof item.serialNumber === "number" && item.serialNumber > maxSerial) {
        maxSerial = item.serialNumber;
      } else if (typeof item.reference === "string") {
        const match = item.reference.match(/DVT-\d{4}-(\d+)/);
        if (match) {
          const parsed = parseInt(match[1], 10);
          // Only count sequential 4-digit counters (< 1000) so old random 4-digit IDs don't offset the counter
          if (!isNaN(parsed) && parsed < 1000 && parsed > maxSerial) {
            maxSerial = parsed;
          }
        }
      }
    }
    const serialNumber = maxSerial >= 0 ? maxSerial + 1 : enquiriesList.length;
    const serialPadded = String(serialNumber).padStart(4, "0");
    const reference = `DVT-2026-${serialPadded}`;

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      serialNumber,
      reference,
      type: enquiryType,
      status: "new",
      createdAt: new Date().toISOString(),
      ...sanitizedData,
    };

    // 10. Record in live Google Spreadsheet via webhook
    const sheetResult = await appendBookingToGoogleSheet(newEnquiry);
    newEnquiry.googleSheets = sheetResult;

    // If Google Sheets assigned a sequential ID, adopt it
    let assignedSerial = serialNumber;
    let assignedRef = reference;
    if (sheetResult && sheetResult.sent && sheetResult.serialNumber != null) {
      assignedSerial = sheetResult.serialNumber;
      assignedRef = sheetResult.reference || `DVT-2026-${String(assignedSerial).padStart(4, "0")}`;
      newEnquiry.serialNumber = assignedSerial;
      newEnquiry.reference = assignedRef;
    }

    // 11. Dispatch notification email to business inbox with confirmed reference & serial
    const emailResult = await sendBookingNotificationEmail(newEnquiry);
    newEnquiry.emailNotification = emailResult;

    // 12. Persist enquiry safely with bounded array size (max 500 records)
    enquiriesList.unshift(newEnquiry);
    if (enquiriesList.length > 500) {
      enquiriesList = enquiriesList.slice(0, 500);
    }

    try {
      fs.writeFileSync(enquiriesFilePath, JSON.stringify(enquiriesList, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Storage notice (non-fatal in read-only serverless):", writeErr.message);
    }

    return NextResponse.json({
      success: true,
      serialNumber: assignedSerial,
      reference: assignedRef,
      message: "Enquiry validated, logged, and routed to business email successfully",
    });
  } catch (error) {
    // Sanitize server-side error logging: never log sensitive request payloads
    console.error("Enquiry API internal processing error:", error.message);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again or contact us via WhatsApp." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get("ref");

    // When fetching all enquiries (dashboard view), require valid admin authentication
    if (!ref) {
      const isAuthorized = await verifyAdminRequest(request);
      if (!isAuthorized) {
        return NextResponse.json(
          { success: false, error: "Unauthorized access. Admin authentication required." },
          { status: 401 }
        );
      }
    }

    // Try fetching live bookings from Google Sheet first
    const sheetsList = await fetchBookingsFromGoogleSheet();

    const enquiriesFilePath = path.join(process.cwd(), "src", "data", "enquiries.json");
    let localList = [];

    if (fs.existsSync(enquiriesFilePath)) {
      try {
        const fileContent = fs.readFileSync(enquiriesFilePath, "utf-8");
        localList = JSON.parse(fileContent);
        if (!Array.isArray(localList)) localList = [];
      } catch {
        localList = [];
      }
    }

    // Prioritize Google Sheets if connected and non-empty, otherwise use local archive
    const enquiriesList = Array.isArray(sheetsList) && sheetsList.length > 0 ? sheetsList : localList;

    if (ref) {
      const cleanRef = ref.trim().toLowerCase();
      const found = enquiriesList.find(
        (e) => (e.reference && e.reference.toLowerCase() === cleanRef) || (e.id && e.id.toLowerCase() === cleanRef)
      );

      if (!found) {
        // Also check localList as fallback if sheetsList didn't have it
        const fallbackFound = localList.find(
          (e) => (e.reference && e.reference.toLowerCase() === cleanRef) || (e.id && e.id.toLowerCase() === cleanRef)
        );
        if (fallbackFound) {
          return NextResponse.json({ success: true, enquiry: fallbackFound });
        }

        return NextResponse.json(
          { success: false, error: `Enquiry with reference ${ref} not found.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, enquiry: found });
    }

    return NextResponse.json({
      success: true,
      total: enquiriesList.length,
      enquiries: enquiriesList,
      source: Array.isArray(sheetsList) && sheetsList.length > 0 ? "google_sheets" : "local_file"
    });
  } catch (error) {
    console.error("GET enquiries error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve enquiries data." },
      { status: 500 }
    );
  }
}
