/**
 * Admin Authentication & Session Management Helper for Divine View Tours
 * 
 * Works across both Node.js API routes and Edge Runtime Middleware
 * using Web Crypto API.
 */

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "divineview2026";
const DEFAULT_SESSION_SECRET = "dvt_admin_secure_vault_token_2026";

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export async function generateAdminToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
  const password = getAdminPassword();
  const rawString = `${password}:${secret}`;
  
  const data = new TextEncoder().encode(rawString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyAdminToken(token) {
  if (!token || typeof token !== "string") return false;
  const expectedToken = await generateAdminToken();
  return token === expectedToken;
}

export async function verifyAdminRequest(request) {
  const cookieToken = request.cookies.get("dvt_admin_session")?.value;
  if (!cookieToken) return false;
  return await verifyAdminToken(cookieToken);
}
