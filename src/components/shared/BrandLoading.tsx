"use client";

import { motion } from "motion/react";

export default function BrandLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute h-16 w-16 rounded-full border-4 border-dotted border-primary opacity-30"></div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-16 w-16 rounded-full border-4 border-t-4 border-primary border-t-transparent"
        ></motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground"
        >
          NF
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center text-lg text-muted-foreground"
      >
        Loading delicious street food...
      </motion.p>
    </div>
  );
}
