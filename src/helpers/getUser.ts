import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export type DecodedToken = JwtPayload & { userId: string; role: string };

export async function getAuthUser() {
  // Get cookies ===
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Authentication token missing",
    };
  }

  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return { success: true, userId: decoded.userId, role: decoded.role };
  } catch (error) {
    console.error(error);
    return { success: false, status: 401, message: "Invalid auth token" };
  }
}
