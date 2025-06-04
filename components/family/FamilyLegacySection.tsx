"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart } from "lucide-react";

export function FamilyLegacySection() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-900/10 dark:to-rose-900/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Our Family Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From humble beginnings in rural Nepal to spreading across the globe,
            the Khanal family story is one of perseverance, education, and
            unity.
          </p>
        </motion.div>
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6">
              Our Migration Story
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              The Khanal family began in the hills of Nepal, rooted in
              agriculture and community. In the 1970s, seeking better
              opportunities, Ram and Sita&apos;s children moved to Kathmandu,
              pursuing education and careers. By the 2000s, the third generation
              ventured globally—London, Sydney, and beyond—carrying their
              heritage while embracing new cultures.
            </p>
            <div className="text-center">
              <Button
                variant="outline"
                className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/20"
              >
                Explore Our Global Roots
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              1940s
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Foundation laid by Ram Bahadur and Sita Devi in rural Nepal
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              1970s-90s
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Second generation pursued education and professional careers
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              2000s-Present
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Third generation embracing technology while honoring traditions
            </p>
          </motion.div>
        </div>
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6">
              Our Family Values
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                  Education
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Knowledge as the path to progress
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                  Unity
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Stronger together across distances
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🌱</div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                  Growth
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Continuous improvement and adaptation
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🙏</div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                  Respect
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Honoring elders and traditions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
