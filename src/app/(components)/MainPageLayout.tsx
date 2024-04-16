"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { ReactNode } from "react";
import SideNavigator from "./Navigation/SideNavigator";
import { sideNavOpenAtom } from "./Navigation/NavStore";
import { useAtom } from "jotai";

type MainPageLayoutProps = {
  children: ReactNode;
};

const MainPageLayout: React.FC<MainPageLayoutProps> = ({ children }) => {
  const [sideNavOpen] = useAtom(sideNavOpenAtom);

  return (
    <>
      {sideNavOpen && (
        <div className="show md:hidden w-full absolute top-14 h-[calc(100dvh-3.5rem)] overflow-hidden">
          <SideNavigator mobile={true} />
        </div>
      )}
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
              className="hidden md:block"
            >
              <SideNavigator />
            </ResizablePanel>
            <ResizableHandle className="hidden md:block" />
          </>
        )}
        <ResizablePanel
          id="content"
          defaultSize={sideNavOpen ? 85 : 100}
          order={2}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default MainPageLayout;
