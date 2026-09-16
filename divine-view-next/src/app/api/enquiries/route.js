import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();

    // Generate traceable reference code: DVT-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DVT-2026-${randomSuffix}`;

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      reference,
      status: "new",
      createdAt: new Date().toISOString(),
      ...body,
    };

    // Store in enquiries.json
    const enquiriesFilePath = path.join(process.cwd(), "src", "data", "enquiries.json");
    let enquiriesList = [];

    try {
      if (fs.existsSync(enquiriesFilePath)) {
        const fileContent = fs.readFileSync(enquiriesFilePath, "utf-8");
        enquiriesList = JSON.parse(fileContent);
      }
    } catch (e) {
      console.error("Could not read enquiries file, creating new list:", e);
      enquiriesList = [];
    }

    enquiriesList.unshift(newEnquiry);

    try {
      fs.writeFileSync(enquiriesFilePath, JSON.stringify(enquiriesList, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Could not write to local file (e.g. read-only environment):", writeErr);
    }

    return NextResponse.json({
      success: true,
      reference,
      message: "Enquiry logged successfully",
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
