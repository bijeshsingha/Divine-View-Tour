import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import packagesData from "@/data/packagesData.json";

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
    const updatedPackages = await request.json();

    const filePath = path.join(process.cwd(), "src", "data", "packagesData.json");
    fs.writeFileSync(filePath, JSON.stringify(updatedPackages, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Packages updated successfully",
      data: updatedPackages,
    });
  } catch (error) {
    console.error("Packages update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update packages" },
      { status: 500 }
    );
  }
}
