"use client";

import { cn } from "@/lib/utils";
import { motion, type Variant } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "bottom" | "top" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  visible?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  from = "bottom",
  distance = 20,
  once = true,
  visible = true,
}: FadeInProps) {
  const directions = {
    bottom: { y: distance },
    top: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
    none: { y: 0, x: 0 },
  };

  const initial: Variant = {
    opacity: 0,
    ...directions[from],
  };

  const animate: Variant = {
    opacity: visible ? 1 : 0,
    y: visible
      ? 0
      : directions[from === "top" || from === "bottom" ? from : "none"]?.y,
    x: visible
      ? 0
      : directions[from === "left" || from === "right" ? from : "none"]?.x,
  };

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  visible?: boolean;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  visible = true,
}: StaggerContainerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: visible ? 1 : 0,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatePresenceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
