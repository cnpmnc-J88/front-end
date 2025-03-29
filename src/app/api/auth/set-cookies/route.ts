import { tokenService } from "@/services/auth";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function GET() {
  return NextResponse.json(
    { message: "GET method not supported" },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { accessToken, refreshToken } = body;

  try {
    await fetch(`${url}/auth/register_email?access_token=${accessToken}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch (exception) {}

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
  }

  const response = NextResponse.json({ message: "Cookies set successfully" });

  // Set HttpOnly cookies using the cookies API
  response.cookies.set("access_token", accessToken, {
    secure: true,
    path: "/",
  });

  response.cookies.set("refresh_token", refreshToken, {
    secure: true,
    path: "/",
  });

  tokenService.setTokens(accessToken, refreshToken);

  return response;
}
