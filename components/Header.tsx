"use client";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // const [activeNav, setActiveNav] = useState('Home');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Members", href: "/members" },
    { name: "Family", href: "/family" },
    { name: "Blog", href: "/blog" },
    { name: "Pages", href: "/pages" },
  ];
  return (
    <header className="min-h-screen">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-slate-900/90 z-50 border-b border-slate-200 dark:border-slate-700 shadow-xl">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-2xl font-bold text-rose-500 dark:text-rose-400">
              Khanal Pariwar
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 font-medium transition-all ${
                    pathname === item.href
                      ? "bg-rose-500 text-white shadow-lg hover:bg-rose-600"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/auth/signin">
                <Button
                  variant="default"
                  className="px-6 bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-rose-500/30"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="text-slate-600 dark:text-slate-300"
            >
              {!mounted ? (
                <div className="h-5 w-5" />
              ) : resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-rose-500 dark:text-rose-400" />
              ) : (
                <Menu className="w-6 h-6 text-rose-500 dark:text-rose-400" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 inset-x-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur border-b border-slate-200 dark:border-slate-700 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-4 ${
                      pathname === item.href
                        ? "bg-rose-500 text-white"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Link href="/auth/signin">
                <Button
                  variant="default"
                  className="px-6 mt-2 bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-rose-500/30"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 dark:from-slate-900/30 to-transparent" />
      </div>
    </header>
  );
}
