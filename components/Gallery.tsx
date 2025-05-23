"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [randomPositions, setRandomPositions] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    setMounted(true);
    setRandomPositions(
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }))
    );
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-amber-600 dark:text-amber-500"
        >
          Family Gallery
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i} 
              className="relative aspect-square rounded-xl overflow-hidden group"
              variants={item}
            >
              <div className="absolute inset-0 bg-amber-500/10 dark:bg-amber-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <motion.div
                className="relative h-full w-full"
                whileHover={{ 
                  scale: 1.05,
                  rotate: Math.random() * 2 - 1 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={`/images/group.jpeg`}
                  alt="Family photo"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 border-2 border-slate-300 dark:border-slate-700 rounded-xl group-hover:border-amber-600 dark:group-hover:border-amber-500 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Client-side only animated elements */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            {randomPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 bg-amber-500/20 dark:bg-amber-500/30 rounded-full"
                style={pos}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}

        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-soft-light pointer-events-none" />
      </div>
    </section>
  );
}