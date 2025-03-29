import { ReactNode } from "react";

export const SideBarButton: React.FC<{
  text: string;
  icon: ReactNode;
  isCollapsed?: boolean;
  onClick: any;
}> = ({ text, icon, isCollapsed = false, onClick }) => {
  return (
    <>
      <div className="w-full group relative flex items-center justify-center">
        <button
          className="w-full flex items-center justify-center p-2 gap-2 text-white hover:bg-gray-800 hover:rounded-xl hover:cursor-pointer mx-3"
          onClick={onClick}
        >
          <div
            className={`flex items-left transition duration-1000 ${
              !isCollapsed ? "justify-center w-full" : "justify-left w-40"
            } gap-3`}
          >
            <div className={`w-6 ${isCollapsed ? "flex justify-center" : ""}`}>
              {icon}
            </div>
            <span
              className={`text-base font-medium transition duration-1000 whitespace-nowrap ${
                !isCollapsed
                  ? "opacity-0 w-0 overflow-hidden hidden"
                  : "opacity-100 w-auto"
              }`}
            >
              {text}
            </span>
          </div>
        </button>
        {!isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
            {text}
          </div>
        )}
      </div>
    </>
  );
};
