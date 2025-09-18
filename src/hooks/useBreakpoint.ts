"use client";

import { useEffect, useState } from "react";

// Tailwind default breakpoints
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
export type BreakpointState = {
  width: number | null;
  isMobile: boolean; // < 1024 (below lg)
  isTablet: boolean; // >= 640 and < 1024
  isDesktop: boolean; // >= 1024
};

export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>({
    width: null,
    isMobile: false,
    isTablet: false,
    isDesktop: true, // assume desktop on first SSR paint to avoid layout jumps
  });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const isDesktop = w >= 1024; // lg
      const isTablet = w >= 640 && w < 1024; // sm..md range
      const isMobile = w < 640; // below sm
      setState({ width: w, isMobile: !isDesktop, isTablet, isDesktop });
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return state;
}

export default useBreakpoint;
