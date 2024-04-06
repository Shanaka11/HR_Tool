"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";
import { useNavStore } from "./NavStore";

// TODO: try to make the title bar a server component. make buttons client components
const TitleBar = () => {
  const toggleSideNav = useNavStore((state) => state.toggleSideNav);

  return (
    <div className="h-14 bg-slate-300">
      <Button className="h-full rounded-none" onClick={toggleSideNav}>
        <Menu className="h-full fill-white" />
      </Button>
    </div>
  );
};

export default TitleBar;
