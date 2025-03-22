export const SideBarButton: React.FC<{
  text: string;
  icon: any;
}> = ({ text, icon }) => {
  return (
    <div className="w-full flex items-center justify-center p-2 gap-2 text-white hover:bg-gray-800 hover:rounded-xl hover:cursor-pointer mx-4">
      {icon}
      <span className="text-base font-medium ">{text}</span>
    </div>
  );
};
