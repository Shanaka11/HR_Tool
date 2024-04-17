"use client";
import { Button } from "@/components/ui/button";
import { HomeIcon, LogOut, Menu, Palette, Settings, X } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Username from "../Username";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import OpenNavMenuButton from "./OpenNavMenuButton";
import { useRouter } from "next/navigation";

// TODO: try to make the title bar a server component. make buttons client components
const TitleBar = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleHomeOnClick = () => {
    router.push("/");
  };

  const handleSettingsOnClick = () => {
    router.push("/settings");
  };
  return (
    <div className="h-14 bg-slate-300 flex justify-between">
      <div className="h-full">
        <OpenNavMenuButton />
        <Button className="h-full rounded-none" onClick={handleHomeOnClick}>
          <HomeIcon className="h-full" />
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-full min-w-40 rounded-none">
            {data?.user?.image && (
              <Image
                src={data?.user?.image}
                alt="avatar"
                className="h-full rounded-full mr-2"
                width={40}
                height={40}
              />
            )}
            <Username />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleSettingsOnClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 h-4 w-4" />
                <span>Color Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Theme1</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Theme2</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Theme3</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TitleBar;
