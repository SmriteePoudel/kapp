"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <motion.footer
      className="bg-white dark:bg-slate-900 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-amber-600 dark:text-amber-500">
              Khanal Pariwar
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Connecting families, preserving memories, and celebrating our heritage.
            </p>
            <div className="flex gap-4 mt-4">
              {[Linkedin, Facebook, Twitter, Instagram].map((Icon, index) => (
                <Link href="/" key={index}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 dark:hover:bg-amber-500 transition-colors cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-slate-600 hover:text-white dark:text-slate-200 dark:hover:text-white" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-amber-600 dark:text-amber-500">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Family Tree', href: '/family-tree' },
                { label: 'Members', href: '/members' },
                { label: 'Gallery', href: '/gallery' },
              ].map(({ label, href }, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  className="text-slate-600 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-500 cursor-pointer text-sm"
                >
                  <Link href={href}>
                    <span>{label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-amber-600 dark:text-amber-500">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'News', href: '/news' },
                { label: 'Events', href: '/events' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  className="text-slate-600 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-500 cursor-pointer text-sm"
                >
                  <Link href={href}>
                    <span>{label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-amber-600 dark:text-amber-500">Contact Us</h4>
            <motion.div
              className="text-sm text-slate-600 dark:text-slate-300 space-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <p>Email: info@khanalpariwar.com</p>
              <p>Phone: +977 1234567890</p>
              <p>Location: Kathmandu, Nepal</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="py-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} Khanal Pariwar. All rights reserved.
        </motion.div>

        {/* Floating ambient particles */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />
            {randomPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 bg-amber-500/20 dark:bg-amber-500/20 rounded-full"
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
      </div>
    </motion.footer>
  );
}
