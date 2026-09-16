import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import vehicleRatesData from "@/data/vehicleRates.json";

// Authorization helper
function isAuthorized(request) {
  const secretKey = process.env.ADMIN_SECRET_KEY;
  // If a production secret key is defined, enforce it
  if (secretKey) {
    const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
    if (!authHeader) return false;
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    return token === secretKey;
  }
  // In local/dev environments without an explicit key set, allow local admin interface
  return true;
}

// Validate schema of vehicle rates
function validateVehicleRates(data) {
  if (!data || typeof data !== "object" || !Array.isArray(data.routes)) {
    return "Invalid payload: must contain a 'routes' array";
  }

  for (const route of data.routes) {
    if (!route.id || typeof route.id !== "string") {
      return "Each route must have a valid string 'id'";
    }
    if (typeof route.minimumDays !== "number" || route.minimumDays < 1) {
      return `Route '${route.id}' must have a positive minimumDays number`;
    }
    for (const vehicleKey of ["sedan", "ertiga", "crysta"]) {
      const val = route[vehicleKey];
      if (val !== null && (typeof val !== "number" || val < 0)) {
        return `Route '${route.id}' ${vehicleKey} rate must be a non-negative number or null`;
      }
    }
  }

  return null;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "vehicleRates.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json(data);
    }
    return NextResponse.json(vehicleRatesData);
  } catch (error) {
    return NextResponse.json(vehicleRatesData);
  }
}

export async function POST(request) {
  try {
    // 1. Enforce authentication / authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrative credentials required." },
        { status: 401 }
      );
    }

    // 2. Enforce payload size limit (max 32KB)
    const rawBody = await request.text();
    if (rawBody.length > 32768) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds 32KB limit" },
        { status: 413 }
      );
    }

    let updatedRates;
    try {
      updatedRates = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // 3. Validate rates schema
    const validationError = validateVehicleRates(updatedRates);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // 4. Safely persist to data file
    const filePath = path.join(process.cwd(), "src", "data", "vehicleRates.json");
    fs.writeFileSync(filePath, JSON.stringify(updatedRates, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Vehicle rates validated and updated successfully",
      data: updatedRates,
    });
  } catch (error) {
    console.error("Vehicle rates update error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to update vehicle rates" },
      { status: 500 }
    );
  }
}
