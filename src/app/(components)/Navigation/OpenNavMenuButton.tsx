import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React from "react";
import { useNavStore } from "./NavStore";

const OpenNavMenuButton = () => {
  const { toggleSideNav, sideNavOpen } = useNavStore((state) => ({
    toggleSideNav: state.toggleSideNav,
    sideNavOpen: state.sideNavOpen,
  }));

  return (
    <Button className="h-full rounded-none" onClick={toggleSideNav}>
      {sideNavOpen ? (
        <>
          <X className="h-full fill-white md:hidden" />
          <Menu className="h-full fill-white hidden md:block" />
        </>
      ) : (
        <Menu className="h-full fill-white" />
      )}
    </Button>
  );
};

export default OpenNavMenuButton;
