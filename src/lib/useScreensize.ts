import { useEffect, useLayoutEffect, useState } from "react";
type Beakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export const useScreenSize = () => {
  const [breakpoint, setBreakpoint] = useState<Beakpoint>("sm");

  const isScreensizeBigger = (targetBreakpoint: Beakpoint) => {
    // Every breakpint is bigger than sm
    if (targetBreakpoint === "sm") return true;

    // If target is md then only sm is smaller than it
    if (targetBreakpoint === "md") return breakpoint !== "sm";

    if (targetBreakpoint === "lg")
      return breakpoint !== "sm" && breakpoint !== "md";

    // Only breakpint larger than xl is 2 xl
    if (targetBreakpoint === "xl") return breakpoint === "2xl";

    if (targetBreakpoint === "2xl") return breakpoint === "2xl";
  };

  const handleSize = () => {
    if (window.innerWidth < 640) {
      setBreakpoint("sm");
      return;
    }

    if (window.innerWidth < 768) {
      setBreakpoint("md");
      return;
    }

    if (window.innerWidth < 1024) {
      setBreakpoint("lg");
      return;
    }

    if (window.innerWidth < 1280) {
      setBreakpoint("xl");
      return;
    }

    if (window.innerWidth < 1536) {
      setBreakpoint("2xl");
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return window.removeEventListener("resize", handleSize);
  }, []);

  return breakpoint;
};
