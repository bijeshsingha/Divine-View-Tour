import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    // 8. Generate traceable reference code: DVT-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DVT-2026-${randomSuffix}`;

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      reference,
      type: enquiryType,
      status: "new",
      createdAt: new Date().toISOString(),
      ...sanitizedData,
    };

    // 9. Persist enquiry safely with bounded array size (max 500 records)
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

    // Prepend new enquiry and keep only the latest 500 records
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
      reference,
      message: "Enquiry validated and recorded successfully",
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
