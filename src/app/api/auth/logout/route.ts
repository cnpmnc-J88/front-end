import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Get the cookies store and clear the authentication cookie
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
