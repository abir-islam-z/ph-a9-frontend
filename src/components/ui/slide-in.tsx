"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  show: boolean;
  from?: "left" | "right" | "top" | "bottom";
  duration?: number;
  delay?: number;
  className?: string;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  show,
  from = "bottom",
  duration = 0.5,
  delay = 0,
  className,
}) => {
  const directionVariants = {
    left: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    right: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    top: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    bottom: {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          variants={directionVariants[from]}
          transition={{
            duration: duration,
            delay: delay,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      )}
      {!show && (
        <div className={className} style={{ opacity: 0, visibility: "hidden" }}>
          {children}
        </div>
      )}
    </AnimatePresence>
  );
};

export default SlideIn;
