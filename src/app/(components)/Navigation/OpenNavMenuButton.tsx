import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Menu, X } from "lucide-react";
import React from "react";

import { sideNavOpenAtom } from "./NavStore";

const OpenNavMenuButton = () => {
  const [sideNavOpen, setSideNavOpen] = useAtom(sideNavOpenAtom);

  return (
    <Button
      className="h-full rounded-none"
      onClick={() => setSideNavOpen((prevState) => !prevState)}
    >
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
