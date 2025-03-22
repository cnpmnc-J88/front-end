export const SideBarTab: React.FC<{
  tabName: string;
  icon: any;
  isSelected?: boolean;
}> = ({ tabName, icon, isSelected = false }) => {
  return (
    <div
      className={`w-full flex items-center justify-center text-white ${
        isSelected ? "border-l-6 border-purple-500" : ""
      }  `}
    >
      <div
        className={`w-full flex items-center justify-left py-2  ${
          isSelected ? "px-12" : "px-14"
        } gap-2 hover:bg-gray-800 hover:rounded-xl hover:cursor-pointer mx-4`}
      >
        {icon}
        <span className="text-base font-medium ">{tabName}</span>
      </div>
    </div>
  );
};
