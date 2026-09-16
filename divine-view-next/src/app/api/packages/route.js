import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import packagesData from "@/data/packagesData.json";

const ALLOWED_PRICE_MODES = ["starting_from", "fixed", "request_quote"];

function isAuthorized(request) {
  const secretKey = process.env.ADMIN_SECRET_KEY;
  if (secretKey) {
    const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
    if (!authHeader) return false;
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    return token === secretKey;
  }
  return true;
}

function validatePackages(packages) {
  if (!Array.isArray(packages)) {
    return "Invalid payload: must be an array of package objects";
  }

  for (const pkg of packages) {
    if (!pkg.id || typeof pkg.id !== "string") {
      return "Each package must have a valid string 'id'";
    }
    if (!pkg.slug || typeof pkg.slug !== "string") {
      return `Package '${pkg.id}' must have a valid string 'slug'`;
    }
    if (!ALLOWED_PRICE_MODES.includes(pkg.priceMode)) {
      return `Package '${pkg.id}' has invalid priceMode. Allowed: ${ALLOWED_PRICE_MODES.join(", ")}`;
    }
    if (pkg.priceAmount !== null && pkg.priceAmount !== undefined) {
      if (typeof pkg.priceAmount !== "number" || pkg.priceAmount < 0) {
        return `Package '${pkg.id}' priceAmount must be a non-negative number or null`;
      }
    }
  }

  return null;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "packagesData.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json(data);
    }
    return NextResponse.json(packagesData);
  } catch (error) {
    return NextResponse.json(packagesData);
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

    // 2. Enforce payload size limit (max 64KB)
    const rawBody = await request.text();
    if (rawBody.length > 65536) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds 64KB limit" },
        { status: 413 }
      );
    }

    let updatedPackages;
    try {
      updatedPackages = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // 3. Validate packages schema
    const validationError = validatePackages(updatedPackages);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // 4. Safely persist to data file
    const filePath = path.join(process.cwd(), "src", "data", "packagesData.json");
    fs.writeFileSync(filePath, JSON.stringify(updatedPackages, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Packages validated and updated successfully",
      data: updatedPackages,
    });
  } catch (error) {
    console.error("Packages update error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to update packages" },
      { status: 500 }
    );
  }
}
