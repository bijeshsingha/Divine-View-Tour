import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import vehicleRatesData from "@/data/vehicleRates.json";

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
    const updatedRates = await request.json();

    const filePath = path.join(process.cwd(), "src", "data", "vehicleRates.json");
    fs.writeFileSync(filePath, JSON.stringify(updatedRates, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Vehicle rates updated successfully",
      data: updatedRates,
    });
  } catch (error) {
    console.error("Vehicle rates update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update vehicle rates" },
      { status: 500 }
    );
  }
}
