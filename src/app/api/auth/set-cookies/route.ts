import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "GET method not supported" },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { accessToken, refreshToken } = body;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
  }

  const response = NextResponse.json({ message: "Cookies set successfully" });

  // Set HttpOnly cookies using the cookies API
  response.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  response.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
