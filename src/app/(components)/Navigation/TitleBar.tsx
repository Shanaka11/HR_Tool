"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React from "react";
import { useNavStore } from "./NavStore";

// TODO: try to make the title bar a server component. make buttons client components
const TitleBar = () => {
  const { toggleSideNav, sideNavOpen } = useNavStore((state) => ({
    toggleSideNav: state.toggleSideNav,
    sideNavOpen: state.sideNavOpen,
  }));

  return (
    <div className="h-14 bg-slate-300">
      <Button className="h-full rounded-none" onClick={toggleSideNav}>
        {sideNavOpen ? (
          <X className="h-full fill-white" />
        ) : (
          <Menu className="h-full fill-white" />
        )}
      </Button>
    </div>
  );
};

export default TitleBar;
