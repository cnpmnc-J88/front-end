export const SideBarTab: React.FC<{
  tabName: string;
  icon: any;
  isSelected?: boolean;
}> = ({ tabName, icon, isSelected = false }) => {
  return (
    <div
      className={`w-full flex items-center justify-center  ${
        isSelected
          ? "border-l-6 border-purple-400 text-purple-400"
          : "text-white"
      }  `}
    >
      <div
        className={`w-full flex items-center justify-center py-2 gap-2 hover:bg-gray-800 hover:rounded-xl hover:cursor-pointer mx-4`}
      >
        <div className="w-40 flex items-center justify-left gap-2">
          {icon}
          <span className="text-base font-medium ">{tabName}</span>
        </div>
      </div>
    </div>
  );
};
