import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
type SideNavListProps = {
  navItems: [
    number,
    {
      label: string;
      parentNavId: number;
      link?: string;
    }
  ][];
  handleNavOnClick: (navigatorId: number) => void;
};

const SideNavIist: React.FC<SideNavListProps> = ({
  navItems,
  handleNavOnClick,
}) => {
  const pathname = usePathname();

  if (navItems.length === 0) {
    return (
      <div className="border-b border-b-slate-500 w-full h-full p-2 py-4 text-m text-white flex justify-between hover:bg-blue-400 cursor-pointer">
        <span>We can't seem to find the page you are looking for.</span>
      </div>
    );
  }
  return (
    <>
      {navItems.map((item) => {
        if (item[1].link !== undefined) {
          return (
            <Link key={item[0]} className="text-white" href={item[1].link}>
              <div
                className={`border-b border-b-slate-500 w-full h-full p-2 py-4 text-xs hover:bg-blue-400 cursor-pointer ${
                  item[1].link === pathname && "border-l-4 border-l-blue-400"
                }`}
              >
                {item[1].label}
              </div>
            </Link>
          );
        }
        return (
          <div
            className="border-b border-b-slate-500 w-full h-full p-2 py-4 text-xs text-white flex justify-between hover:bg-blue-400 cursor-pointer"
            key={item[0]}
            onClick={() => handleNavOnClick(item[0])}
          >
            <span>{item[1].label}</span>
            <ChevronRight size="15" className="text-white" />
          </div>
        );
      })}
    </>
  );
};

export default SideNavIist;
