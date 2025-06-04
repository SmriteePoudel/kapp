"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-rose-50/20 via-amber-50/20 to-blue-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {" "}
          {/* Adjusted padding here, or even remove it if flex centering is enough */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-md"
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-10 border border-slate-200 dark:border-slate-700">
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-200/30 dark:bg-rose-900/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-200/30 dark:bg-amber-900/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400"
                  >
                    Welcome Back
                  </motion.h1>
                  <p className="text-slate-600 dark:text-slate-300">
                    Sign in to continue to Khanal Pariwar
                  </p>
                </div>

                <form className="space-y-6">
                  <div>
                    <Label className="text-slate-700 dark:text-slate-300 mb-2 block">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="name@family.com"
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-700 dark:text-slate-300 mb-2 block">
                      Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-rose-500 dark:text-rose-400 rounded border-slate-300 dark:border-slate-600 focus:ring-rose-500 dark:focus:ring-rose-400"
                      />
                      <Label
                        htmlFor="remember"
                        className="ml-2 text-slate-600 dark:text-slate-300"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="#"
                      className="text-rose-600 dark:text-rose-400 hover:underline text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white transition-all"
                  >
                    Sign In
                  </Button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <FcGoogle className="w-5 h-5" />
                      <span>Google</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-blue-500 dark:hover:bg-slate-700"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                    </Button>
                  </motion.div>
                </div>

                <p className="mt-8 text-center text-slate-600 dark:text-slate-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="signup"
                    className="text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
