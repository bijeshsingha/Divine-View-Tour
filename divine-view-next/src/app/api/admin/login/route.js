import { NextResponse } from "next/server";
import { getAdminUsername, getAdminPassword, generateAdminToken } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const expectedUsername = getAdminUsername();
    const expectedPassword = getAdminPassword();

    // Constant-time like basic validation
    const trimmedUser = (username || "").trim();
    const trimmedPass = (password || "").trim();

    if (trimmedUser !== expectedUsername || trimmedPass !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = await generateAdminToken();

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    response.cookies.set("dvt_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err.message);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
