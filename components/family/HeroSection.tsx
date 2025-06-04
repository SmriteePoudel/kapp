'use client';
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <div className="bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-amber-600 dark:text-amber-500">
              Khanal Family
            </span>
            <br />
            <span className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-200">
              Heritage Tree
            </span>
          </h1>
          <p className="text-xl text-amber-700 dark:text-amber-400 font-medium mb-4">
            Rooted in tradition, growing toward the future
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Explore our family connections, stories, and legacy across generations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                3
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Generations
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                10
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Family Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                5
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Countries
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                80+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Years of Stories
              </div>
            </div>
          </div>
          <Carousel className="max-w-3xl mx-auto">
            <CarouselContent>
              {[
                { year: "1940s", text: "Ram and Sita lay the foundation in rural Nepal." },
                { year: "1970s", text: "Second generation pursues education." },
                { year: "2000s", text: "Global expansion and tech embrace." },
              ].map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-rose-50 dark:bg-rose-900/30">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-rose-600 dark:text-rose-400">
                        {item.year}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
}
