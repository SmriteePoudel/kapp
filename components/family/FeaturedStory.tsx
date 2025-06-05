"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FeaturedStory } from "@/data/family";


interface FeaturedStoriesProps {
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number | ((prev: number) => number)) => void;
  stories: FeaturedStory[];
}

export function FeaturedStories({
  currentStoryIndex,
  setCurrentStoryIndex,
  stories,
}: FeaturedStoriesProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
      setProgress(0);
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [setCurrentStoryIndex, stories.length]);

  return (
    <section className="w-full bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-900/50 dark:to-rose-800/50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-rose-700 dark:text-rose-300 mb-8 text-center">
          Featured Stories
        </h2>
        <motion.div
          key={currentStoryIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Placeholder for story image (if available in your data) */}
            <div className="md:w-1/3 flex-shrink-0">
              <div className="w-full h-35 bg-rose-200 dark:bg-rose-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-300">
                <Image
                  src="/images/blog.png"
                  alt="Story Image"
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {stories[currentStoryIndex].title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                {stories[currentStoryIndex].excerpt}
              </p>
              <Link href={`/story/${stories[currentStoryIndex].slug}`}>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full md:w-auto bg-rose-600 text-white hover:bg-rose-700 transition-colors duration-300"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Read Story
                </Button>
              </Link>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-6 h-1 w-full bg-rose-200 dark:bg-rose-600/30 rounded">
            <div
              className="h-full bg-rose-600 rounded transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStoryIndex(index);
                  setProgress(0);
                }}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  currentStoryIndex === index
                    ? "bg-rose-600 scale-125"
                    : "bg-rose-300 dark:bg-rose-500/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
