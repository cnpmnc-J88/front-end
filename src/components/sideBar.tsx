import { SideBarButton } from "./sideBarButton";
import { SideBarTab } from "./sideBarTab";
import { ChevronDown, ArrowLeftToLine, Book, FileClock } from "lucide-react";

const tabs = [
  {
    tabName: "Dashboard",
    icon: <ChevronDown />,
    isSelected: true,
  },
  {
    tabName: "Add form",
    icon: <Book />,
  },
  {
    tabName: "History",
    icon: <FileClock />,
  },
];

export function SideBar() {
  return (
    <div className="w-1/6 min-h-screen bg-black flex flex-col gap-2 py-6">
      <div className="w-full h-1/6 text-white text-2xl flex items-center justify-center gap-2">
        <img src="favicon.ico" className="w-9" />
        <span>J88</span>
      </div>
      <div className="h-fit flex flex-col gap-3">
        {tabs.map((item, index) => (
          <SideBarTab
            key={index}
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
