"use client";
import { motion } from "framer-motion";

export default function MovingText() {
  return (
    <div className="relative h-32 overflow-hidden bg-white dark:bg-slate-900 flex items-center border-y-2 border-amber-500/30 dark:border-amber-500/20 group">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />
        <div className="absolute left-0 top-1/3 w-full h-1/3 bg-amber-500/10 dark:bg-amber-500/5 -skew-y-12" />
        <div className="absolute right-0 top-1/2 w-full h-1/3 bg-amber-500/10 dark:bg-amber-500/5 skew-y-12" />
      </div>

      <motion.div
        className="absolute flex whitespace-nowrap"
        initial={{ translateX: '-50%'}}
        animate={{ translateX: '0'}}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear"
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center px-4 text-4xl font-bold"
          >
            <span className="text-amber-600 dark:text-amber-500">
              A time for family
            </span>
            <motion.span 
              className="mx-4 text-5xl text-amber-600 dark:text-amber-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              •
            </motion.span>
            <span className="text-amber-600 dark:text-amber-500">
              Strong bond
            </span>
            <motion.span 
              className="mx-4 text-5xl text-amber-600 dark:text-amber-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ✶
            </motion.span>
            <span className="text-amber-600 dark:text-amber-500">
              Homemade happiness
            </span>
            <motion.span 
              className="mx-4 text-5xl text-amber-600 dark:text-amber-500"
              animate={{
                scale: [1, 1.2, 1],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              ❤
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 border-y-2 border-amber-500/40 dark:border-amber-500/20"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
    </div>
  );
}