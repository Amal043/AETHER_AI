"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/hooks/useIsMounted";

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  gridBg?: boolean;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className,
  gridBg = false,
}) => {
  const mounted = useIsMounted();

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden",
        gridBg && "noise-bg",
        className
      )}
    >
      <motion.div
        initial={mounted ? { opacity: 0, y: 25 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};
