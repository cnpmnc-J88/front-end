"use client";
import { usePathname } from "next/navigation";
import { SideBarButton } from "./SideBarButton";
import { SideBarTab } from "./SideBarTab";
import { ArrowLeftToLine, Book, FileClock, Mails } from "lucide-react";

export function SideBar() {
  const pathname = usePathname();
  const tabs = [
    {
      tabName: "Add form",
      icon: <Book />,
      path: "/form/performanceAssessment",
      isSelected: pathname === "/form/performanceAssessment",
    },
    {
      tabName: "History",
      icon: <FileClock />,
      path: "/evaluations",
      isSelected: pathname === "/evaluations",
    },
    {
      tabName: "Send Email",
      icon: <Mails />,
      path: "/evaluations/send-bulk",
      isSelected: pathname === "/evaluations/send-bulk",
    },
  ];
  return (
    <div className="w-1/6 min-h-screen bg-black flex flex-col gap-2 py-6 z-10">
      <div className="w-full h-1/6 text-white text-2xl flex items-center justify-center gap-2">
        <img src="favicon.ico" className="w-9" />
        <span>J88</span>
      </div>
      <div className="h-fit flex flex-col gap-3">
        {tabs.map((item, index) => (
          <SideBarTab
            key={index}
            path={item.path}
            icon={item.icon}
            tabName={item.tabName}
            isSelected={item.isSelected}
          />
        ))}
      </div>
      <div className="flex-1 flex items-end justify-center">
        <SideBarButton text="Log out" icon={<ArrowLeftToLine />} />
      </div>
    </div>
  );
}
