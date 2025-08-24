"use client";
import { Trees, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only auto-collapse if user hasn't manually toggled
      if (!isManuallyToggled) {
        const scrollY = window.scrollY;
        const shouldCollapse = scrollY > 100; // Collapse after scrolling 100px
        setIsCollapsed(shouldCollapse);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManuallyToggled]);

  const handleManualToggle = () => {
    setIsManuallyToggled(true);
    setIsCollapsed(!isCollapsed);
    
    // Reset manual toggle after 3 seconds to re-enable auto-scroll behavior
    setTimeout(() => {
      setIsManuallyToggled(false);
    }, 3000);
  };

  return (
    <section className="relative bg-white dark:bg-slate-900 overflow-hidden sticky top-0 z-40 shadow-sm">
      {/* Collapse/Expand Button */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleManualToggle}
            className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            title={isManuallyToggled ? "Manual mode (auto-scroll disabled for 3s)" : "Click to toggle manually"}
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                {isManuallyToggled ? "Show Hero (Manual)" : "Show Hero"}
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                {isManuallyToggled ? "Hide Hero (Manual)" : "Hide Hero"}
              </>
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-24">
              <div className="container mx-auto px-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Text Content */}
                  <motion.div
                    className="space-y-6 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      <span className="text-amber-600 dark:text-amber-500">
                        Khanal Pariwar
                      </span>
                      <br />
                      <span className="text-2xl md:text-4xl font-medium text-slate-800 dark:text-slate-200">
                        Family Heritage Network
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto md:mx-0">
                      Discover your roots, connect with family, and preserve our
                      heritage for generations to come.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Link href="/familytree">
                        <Button
                          size="lg"
                          className="bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-600/30 dark:hover:shadow-amber-500/30 transition-all gap-2 w-full sm:w-auto group"
                        >
                          <Trees className="h-5 w-5 transition-transform group-hover:scale-125" />
                          Open Family Tree
                        </Button>
                      </Link>
                      <Link href="/members">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all gap-2 w-full sm:w-auto group"
                        >
                          <Users className="h-5 w-5 transition-transform group-hover:scale-125" />
                          View All Members
                        </Button>
                      </Link>
                    </div>
                  </motion.div>

                  {/* Image Container */}
                  <motion.div
                    className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-black/30 z-10" />
                    <div className="absolute inset-0 border-4 border-amber-500/30 dark:border-amber-500/20 rounded-2xl pointer-events-none" />

                    <motion.div
                      className="relative h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/images/entire-family.png"
                        alt="Group"
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-20" />
                  </motion.div>
                </div>

                {/* Animated Background Elements */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />
                  <div className="absolute left-0 top-1/3 w-full h-1/3 bg-amber-500/10 dark:bg-amber-500/5 -skew-y-12" />
                  <div className="absolute right-0 top-1/2 w-full h-1/3 bg-amber-500/10 dark:bg-amber-500/5 skew-y-12" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed State - Optional minimal header */}
      {isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="py-4 border-b border-slate-200 dark:border-slate-700"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-500">
                Khanal Pariwar
              </h2>
              <div className="flex gap-2">
                <Link href="/familytree">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Trees className="h-4 w-4" />
                    Tree
                  </Button>
                </Link>
                <Link href="/members">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Users className="h-4 w-4" />
                    Members
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}