"use client";

import { useState, useEffect } from "react";

/**
 * Returns true only after the component has hydrated on the client.
 * Use this to prevent Framer Motion from rendering opacity:0 on the server,
 * which causes a white/blank page flash before JS hydration completes.
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
