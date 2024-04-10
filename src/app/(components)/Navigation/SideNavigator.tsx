"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import SideNavIist from "./SideNavIist";
import SideNavFilter from "./SideNavFilter";
import { complexTextSearch } from "@/lib/complexTextSearch";

// Make this a key value store (map)
const navigator = new Map([
  [1, { label: "Time Reporting", parentNavId: -1 }],
  [1.1, { label: "Project Time Reporting", parentNavId: 1, link: "/321" }],
  [1.2, { label: "Company Time Reporting", parentNavId: 1, link: "/31" }],
  [
    1.3,
    { label: "My Time Reporting", parentNavId: 1, link: "/MyTimeReporting" },
  ],
  [2, { label: "Project Management", parentNavId: -1 }],
  [2.1, { label: "Project", parentNavId: 2, link: "/4123" }],
  [2.2, { label: "Projects", parentNavId: 2, link: "/125" }],
  [2.3, { label: "Basic Data", parentNavId: 2 }],
  [2.31, { label: "Project Basic Data", parentNavId: 2.3 }],
  [2.311, { label: "Project Types", parentNavId: 2.31, link: "/paso" }],
  [3, { label: "Company", parentNavId: -1, link: "/3121" }],
]);

const navigatorArray = Array.from(navigator);

const SideNavigator = () => {
  //TODO: Update the filtering , try to match word for work i.e if we searcg t r then it should show all entries that have similar letter arrangement like time reporting, quick time reporting etc

  // Id of the root node
  const [rootNode, setRootNode] = useState<number[]>([-1]);
  const [filterString, setFilterString] = useState<string>("");
  const activeNavigator = useMemo(() => {
    return navigatorArray.filter((navEntry) => {
      if (filterString === "") return navEntry[1].parentNavId === rootNode[0];
      return (
        navEntry[1].link !== undefined &&
        complexTextSearch(navEntry[1].label, filterString)
      );
    });
  }, [rootNode, filterString]);
  const pathname = usePathname();
  const navTitle = useMemo(() => {
    if (rootNode.length === 1) {
      return null;
    }
    return navigator.get(rootNode[0])?.label;
  }, [rootNode]);

  const handleNavOnClick = (navigatorId: number) => {
    setRootNode((prevState) => {
      prevState.unshift(navigatorId);
      return [...prevState];
    });
  };

  const handleNavToPrevOnClick = () => {
    // Navigate back
    setRootNode((prevState) => {
      prevState.shift();
      return [...prevState];
    });
  };

  const getBreadcrumbTrail = (
    id: number,
    trail: number[] = [],
    skip: boolean = true
  ): number[] => {
    // This is a top level nav item
    if (id === -1) return [...trail, -1];

    const navEntry = navigator.get(id);
    if (navEntry === undefined)
      throw new Error(
        `Navigator entry does not exist for id: ${id} check the navigator`
      );

    // Ignore the very first entry
    if (skip) return getBreadcrumbTrail(navEntry.parentNavId, trail, false);
    return getBreadcrumbTrail(navEntry.parentNavId, [...trail, id], false);
  };

  const generateBreadcrumbTrailString = () => {
    return rootNode
      .slice(1, -1)
      .reverse()
      .map((item) => navigator.get(item)?.label)
      .join(" / ");
  };

  const getNavIdForPage = () => {
    const ret = navigatorArray.find((item) => item[1].link === pathname);

    if (ret === undefined) return -1;

    return ret[0];
  };

  const setParentFilterString = (value: string) => {
    setFilterString(value);
  };
  // Run this at the start only
  useEffect(() => {
    setRootNode(getBreadcrumbTrail(getNavIdForPage()));
  }, []);

  return (
    <>
      <SideNavFilter setParentFilterString={setParentFilterString} />
      {rootNode.length > 1 && (
        // This section is the breadcrumb
        <>
          <div
            className="border-b border-b-slate-500 w-full p-2 py-1 text-xs text-white flex gap-2 hover:bg-blue-400 bg-slate-800 cursor-pointer"
            onClick={handleNavToPrevOnClick}
          >
            <ChevronLeft size="15" className="text-white" />
            {rootNode.length > 2 && (
              <div className="text-slate-300">
                {generateBreadcrumbTrailString()}
              </div>
            )}
          </div>
          {!!navTitle && (
            <div className="border-b border-b-slate-500 w-full p-2 py-1 text-xs text-white flex justify-between hover:bg-blue-400 bg-slate-800 cursor-pointer font-semibold">
              {navTitle}
            </div>
          )}
        </>
      )}
      <ScrollArea className="h-full w-full bg-slate-700">
        <SideNavIist
          navItems={activeNavigator}
          handleNavOnClick={handleNavOnClick}
          // filterString={filterString}
          // rootNode={rootNode[0]}
        />
      </ScrollArea>
    </>
  );
};

export default SideNavigator;
