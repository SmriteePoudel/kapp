"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50/20 via-amber-50/20 to-blue-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 -mt-[900px]">
        <div className="container mx-auto px-4 py-24">
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
                    Join Our Family
                  </motion.h1>
                  <p className="text-slate-600 dark:text-slate-300">
                    Create your family account
                  </p>
                </div>

                <form className="space-y-6">
                  <div>
                    <Label className="text-slate-700 dark:text-slate-300 mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400"
                    />
                  </div>

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

                  <div>
                    <Label className="text-slate-700 dark:text-slate-300 mb-2 block">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-rose-500 dark:text-rose-400 rounded border-slate-300 dark:border-slate-600 focus:ring-rose-500 dark:focus:ring-rose-400"
                    />
                    <Label
                      htmlFor="terms"
                      className="ml-2 text-slate-600 dark:text-slate-300 text-sm"
                    >
                      I agree to the family{' '}
                      <Link href="#" className="text-rose-600 dark:text-rose-400 hover:underline">
                        terms and conditions
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white transition-all"
                  >
                    Create Account
                  </Button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <FcGoogle className="w-5 h-5" />
                      <span>Google</span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </Button>
                  </motion.div>
                </div>

                <p className="mt-8 text-center text-slate-600 dark:text-slate-300">
                  Already have an account?{' '}
                  <Link
                    href="signin"
                    className="text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}