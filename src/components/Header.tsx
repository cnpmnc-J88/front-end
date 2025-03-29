"use client";

import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

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
              <span className="font-bold">Name</span>
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
