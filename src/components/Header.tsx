"use client";

import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("User");

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
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (!pathname?.startsWith("/auth")) {
      fetchUserInfo();
    }
  }, [pathname]);

  if (pathname?.startsWith("/auth")) {
    return <></>;
  }

  return (
    <header className="w-full h-14  flex flex-row items-center sticky">
      <div className="flex flex-1 justify-end px-9 gap-2">
        <img src="favicon.ico" className="w-9" />

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-row items-center justify-center hover:cursor-pointer">
              <span className="font-bold">{userName}</span>
              <ChevronDown className="-mb-0.5" />
            </div>
          </PopoverTrigger>

          {/* Nội dung popover */}
          <PopoverContent className="w-48 p-2">
            <div className="flex flex-col gap-2">
              <button className="text-sm hover:bg-gray-100 p-2 rounded">
                Profile
              </button>
              <button className="text-sm hover:bg-gray-100 p-2 rounded">
                Settings
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
