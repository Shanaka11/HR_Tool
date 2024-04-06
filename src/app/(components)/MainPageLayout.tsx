"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { ReactNode } from "react";
import SideNavigator from "./Navigation/SideNavigator";
import { useNavStore } from "./Navigation/NavStore";

type MainPageLayoutProps = {
  children: ReactNode;
};

const MainPageLayout: React.FC<MainPageLayoutProps> = ({ children }) => {
  const sideNavOpen = useNavStore((state) => state.sideNavOpen);
  return (
    <ResizablePanelGroup direction="horizontal">
      {/* Try to animate this in and out */}
      {sideNavOpen && (
        <>
          <ResizablePanel
            id="sidenavigator"
            order={1}
            minSize={10}
            defaultSize={15}
            maxSize={25}
          >
            <SideNavigator />
          </ResizablePanel>
          <ResizableHandle />
        </>
      )}
      <ResizablePanel id="content" defaultSize={85} order={2}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainPageLayout;
