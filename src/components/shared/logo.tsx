"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-sm cyber-border">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold bg-slate-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{ textShadow: "0 0 5px rgba(6, 182, 212, 0.7)" }}
          >
            NF
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="hidden font-bold tracking-tight md:block"
        >
          <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
            Neo
          </span>
          <span className="text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text">
            Foodie
          </span>
        </motion.div>
      </Link>
    </>
  );
}
