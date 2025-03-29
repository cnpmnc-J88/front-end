"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { tokenService } from "@/services/auth";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [picture, setPicture] = useState("favicon.ico");

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        console.error("Error during logout:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to call logout API:", error);
    } finally {
      tokenService.removeAllTokens();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("No access token found in cookies");
          return;
        }

        const response = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?alt=json`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || "User");
          setPicture(data.picture || "favicon.ico");
        } else {
          console.error("Failed to fetch user info, status:", response.status);

          // Check if status indicates authentication issue
          if (
            response.status === 401 ||
            response.status === 403 ||
            response.status === 404
          ) {
            alert("Your session has expired. Please login again.");
            handleLogout();
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (!pathname?.startsWith("/auth")) {
      fetchUserInfo();
    }
  }, [pathname, router]);

  if (pathname?.startsWith("/auth")) {
    return <></>;
  }

  return (
    <header className="w-full h-14  flex flex-row items-center sticky">
      <div className="flex flex-1 justify-end px-9 gap-2">
        <img src={picture} className="w-9 rounded-full" />

        <div className="flex flex-row items-center justify-center hover:cursor-pointer">
          <span className="font-bold">{userName}</span>
          {/* <ChevronDown className="-mb-0.5" /> */}
        </div>
      </div>
    </header>
  );
}
