"use client";

import { motion } from "motion/react";
import React, { ReactNode } from "react";

interface PersistentSlideInProps {
  children: ReactNode;
  active: boolean;
  from?: "left" | "right" | "top" | "bottom";
  duration?: number;
  delay?: number;
  className?: string;
}

export const PersistentSlideIn: React.FC<PersistentSlideInProps> = ({
  children,
  active,
  from = "bottom",
  duration = 0.5,
  delay = 0,
  className,
}) => {
  const directionVariants = {
    left: {
      hidden: { x: -50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      inactive: { opacity: 0.7, x: 0, transition: { duration: 0.3 } },
    },
    right: {
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      inactive: { opacity: 0.7, x: 0, transition: { duration: 0.3 } },
    },
    top: {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      inactive: { opacity: 0.7, y: 0, transition: { duration: 0.3 } },
    },
    bottom: {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      inactive: { opacity: 0.7, y: 0, transition: { duration: 0.3 } },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={active ? "visible" : "inactive"}
      variants={directionVariants[from]}
      transition={{
        duration: duration,
        delay: active ? delay : 0,
        ease: "easeOut",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PersistentSlideIn;
