import Link from "next/link";
import { ReactNode } from "react";

export const SideBarTab: React.FC<{
  tabName: string;
  icon: ReactNode;
  isSelected?: boolean;
  path: string;
  isCollapsed?: boolean;
}> = ({ tabName, icon, isSelected = false, path, isCollapsed = false }) => {
  return (
    <Link
      href={path}
      className={`w-full flex items-center justify-center relative px-3 ${
        isSelected ? "text-purple-400" : "text-white"
      } group`}
    >
      {isSelected && (
        <div className="absolute bg-purple-400 left-0 top-0 bottom-0 w-1 rounded-full" />
      )}
      <div
        className={`w-full flex items-center justify-center py-2 gap-2 hover:bg-gray-800 rounded-xl hover:cursor-pointer`}
      >
        <div
          className={`flex items-left w-40 ${
            !isCollapsed ? "justify-center" : "justify-left"
          } gap-3`}
        >
          <div className={`w-6 ${isCollapsed ? "flex justify-center" : ""}`}>
            {icon}
          </div>
          <span
            className={`text-base font-medium whitespace-nowrap ${
              !isCollapsed
                ? "opacity-0 w-0 overflow-hidden hidden"
                : "opacity-100 w-auto"
            }`}
          >
            {tabName}
          </span>
        </div>
      </div>

      {!isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
          {tabName}
        </div>
      )}
    </Link>
  );
};
