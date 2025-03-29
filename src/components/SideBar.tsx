"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SideBarButton } from "./SideBarButton";
import { SideBarTab } from "./SideBarTab";
import {
  ChevronLeft,
  ArrowLeftToLine,
  Book,
  FileClock,
  Gauge,
  ClipboardEdit,
} from "lucide-react";
import Link from "next/link";
import { tokenService } from "@/services/auth";

export function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname?.startsWith("/auth")) {
    return <></>;
  }

  const handleLogout = async () => {
    try {
      // Call logout API to invalidate tokens on the server
      await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      // Redirect to login page
      router.push("/auth/login");
      tokenService.removeAllTokens();
    } catch (error) {
      console.error("Logout failed:", error);
      tokenService.removeAllTokens();
      router.push("/auth/login");
    }
  };

  const tabs = [
    {
      tabName: "Dashboard",
      icon: <Gauge />,
      path: "/",
      isSelected: pathname === "/",
    },
    {
      tabName: "Add form",
      icon: <Book />,
      path: "/form/performanceAssessment",
      isSelected: pathname?.startsWith("/form/performanceAssessment"),
    },
    {
      tabName: "Create Template",
      icon: <ClipboardEdit />,
      path: "/form/template",
      isSelected: pathname?.startsWith("/form/template"),
    },
    {
      tabName: "History",
      icon: <FileClock />,
      path: "/evaluations",
      isSelected: pathname?.startsWith("/evaluations"),
    },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-64" : "w-16"
      } min-h-screen bg-black flex flex-col gap-2 py-6 z-10 relative transition-all duration-300`}
    >
      {/*  __________________LOGO__________________   */}
      <Link
        href={"/"}
        className="w-full h-1/6 text-white text-2xl flex items-center justify-center gap-3 hover:cursor-pointer"
      >
        <div className="flex items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 p-2 shadow-lg transition-all duration-300 hover:shadow-xl">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        {isCollapsed && <span>J88</span>}
      </Link>

      {/* ____________________Collapsed Button____________________ */}
      <button
        className="hover:cursor-pointer border-4 border-white text-white p-1 absolute top-4 -right-4 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div
          className={`transition-transform duration-500 ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        >
          <ChevronLeft size={18} />
        </div>
      </button>

      {/* ____________________Tabs____________________ */}
      <div className="h-fit flex flex-col gap-3">
        {tabs.map((item, index) => (
          <SideBarTab
            key={index}
            path={item.path}
            icon={item.icon}
            tabName={item.tabName}
            isSelected={item.isSelected}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="flex-1 flex items-end justify-center">
        <SideBarButton
          text="Log out"
          icon={<ArrowLeftToLine />}
          isCollapsed={isCollapsed}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
