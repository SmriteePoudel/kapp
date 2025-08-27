"use client";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { JwtPayload } from "@/lib/auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuthStatus();
  }, []);

  
  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);

  
  useEffect(() => {
    const handleAuthChange = () => {
      console.log("Auth state changed, checking status...");
      checkAuthStatus();
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileOpen && !(event.target as Element).closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    
    window.addEventListener("authStateChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("focus", handleAuthChange); 
    document.addEventListener("click", handleClickOutside);
    
    
    const intervalId = setInterval(checkAuthStatus, 60000);
    
    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("focus", handleAuthChange);
      document.removeEventListener("click", handleClickOutside);
      clearInterval(intervalId);
    };
  }, [isProfileOpen, isMenuOpen]);

  const checkAuthStatus = async () => {
    try {
      console.log("Checking auth status...");
      const res = await fetch("/api/auth/home", {
        credentials: "include",
        cache: "no-store",
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (res.status==200) {
        const data = await res.json();
        console.log("Auth check successful:", data);
        setUser(data.user);
      } else {
        console.log("Auth check failed, status:", res.status);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log("Sign out initiated");
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      
      console.log("Logout response status:", res.status);
      console.log("Logout response ok:", res.ok);
      
      if (res.ok) {
        console.log("Logout successful");
        setUser(null);
        setIsProfileOpen(false);
        
        window.dispatchEvent(new CustomEvent("authStateChanged"));
        router.push("/");
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Logout failed with response:", res.status, errorData);
        throw new Error(`Logout failed: ${res.status} ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Sign out failed:", error);
      
      
      setUser(null);
      setIsProfileOpen(false);
      window.dispatchEvent(new CustomEvent("authStateChanged"));
      router.push("/");
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Members", href: "/members" },
    { name: "Family", href: "/family" },
    { name: "Blog", href: "/blog" },
    { name: "Pages", href: "/pages" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  const getUserDisplayName = (user: JwtPayload) => {
    if (user.name && user.name.trim()) {
      return user.name.trim();
    }
    return user.email.split('@')[0];
  };

  const AuthButton = () => {
    
    if (authLoading) {
      return (
        <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-9 w-20 rounded-lg" />
      );
    }

    
    if (user) {
      const displayName = getUserDisplayName(user);
      
      return (
        <div className="relative profile-dropdown">
          <motion.button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Profile menu for ${displayName}`}
          >
            <div className="w-7 h-7 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-300 hidden sm:block max-w-32 truncate">
              {displayName}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {displayName}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                      {user.roles && user.roles.length > 0 && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.roles.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link 
                    href="/profile" 
                    onClick={() => setIsProfileOpen(false)} 
                    className="flex items-center space-x-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  {user.roles && user.roles.includes("ADMIN") && (
                    <Link 
                      href="/admin/dashboard" 
                      onClick={() => setIsProfileOpen(false)} 
                      className="flex items-center space-x-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <hr className="my-2 border-slate-100 dark:border-slate-700" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }


    return (
      <Link href="/auth/signin">
        <Button className="px-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg transition-all duration-200">
          Sign In
        </Button>
      </Link>
    );
  };

  return (
    <>
      <div className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-700 z-50 shadow-xl">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent cursor-pointer">
                Khanal Pariwar
              </h1>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-4">
            
            <div className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <AuthButton />
            </div>

            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {!mounted ? (
                <div className="h-5 w-5" />
              ) : resolvedTheme === "dark" ? (
                
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mobile-menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-rose-500" />
              ) : (
                <Menu className="w-6 h-6 text-rose-500" />
              )}
            </motion.button>
          </div>
        </nav>

        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mobile-menu"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <AuthButton />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}