"use client";

import React, { useEffect, useState } from "react";
import { useSpring } from "framer-motion";

interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const [displayValue, setDisplayValue] = useState<string>(value.toFixed(decimals));

  useEffect(() => {
    setMounted(true);
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    if (!mounted) return;
    return spring.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
  }, [spring, decimals, mounted]);

  return (
    <span className={className}>
      {prefix}
      {mounted ? Number(displayValue).toLocaleString() : value.toLocaleString()}
      {suffix}
    </span>
  );
};
