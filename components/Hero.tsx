"use client";
import { Trees, Users } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (  
    <section className="relative py-24 bg-white dark:bg-slate-900 -mt-[900px] overflow-hidden">
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
              Discover your roots, connect with family, and preserve our heritage for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href='/familytree'>
              <Button 
                size="lg" 
                className="bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-600/30 dark:hover:shadow-amber-500/30 transition-all gap-2 w-full sm:w-auto group"
              >
                <Trees className="h-5 w-5 transition-transform group-hover:scale-125" />
                Open Family Tree
              </Button>
              </Link>
              <Link href='/members'>
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
                src="/images/group.jpeg"
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
    </section>
  )
}