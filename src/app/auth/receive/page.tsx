"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenService } from "@/services/auth";

export default function ReceivePage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    tokenService.setTokens(accessToken || "", refreshToken || "");

    if (accessToken && refreshToken) {
      // Send tokens to the backend to set HttpOnly cookies
      fetch("/api/auth/set-cookies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      })
        .then((response) => {
          if (response.ok) {
            router.push("/");
          } else {
            console.error("Failed to set cookies");
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          console.error("Error setting cookies:", error);
          router.push("/auth/login");
        });
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Đang xử lý...</h1>
        <p className="text-gray-600 mt-2">
          Chúng tôi đang xác thực thông tin của bạn. Vui lòng đợi trong giây
          lát.
        </p>
      </div>
    </div>
  );
}
