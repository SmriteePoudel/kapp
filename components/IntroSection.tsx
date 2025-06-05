"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trees } from "lucide-react";
import Image from "next/image";

const IntroSection: FC = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Main content grid/flex container */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-8 items-start">
          {/* Left Column: Intro Text + Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-amber-600 dark:text-amber-500">
                Khanal Pariwar
              </span>
              <br />
              <span className="text-2xl md:text-4xl font-medium text-slate-800 dark:text-slate-200">
                Family Heritage Network
              </span>
            </h1>

            {/* Optional: Family Motto */}
            <p className="text-md sm:text-lg italic text-foreground/75 my-6">
              &quot;जोड्दै जाने, नतोड्ने: Connecting Generations, Strengthening
              Bonds&quot;
            </p>

            {/* Call to Action Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
              <Link href="/familytree">
                <Button
                  size="lg"
                  className="bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-600/30 dark:hover:shadow-amber-500/30 transition-all gap-2 w-full sm:w-auto group"
                >
                  <Trees className="h-5 w-5 transition-transform group-hover:scale-125" />
                  Explore Our Roots
                </Button>
              </Link>
            </div>

            {/* Image Placeholder - Adjusted to fill the red square area */}
            <div className="mt-12 w-full max-w-sm md:max-w-lg lg:max-w-xl mx-auto md:mx-0">
              <Image
                src="/images/YR8A9110.webp" // Ensure this image exists in your public directory
                alt="Family Placeholder"
                width={800}
                height={450}
                className="rounded-lg shadow-lg object-cover w-full h-auto aspect-video"
              />
            </div>
          </div>

          {/* Right Column: Family Introduction (on timeline) + Timeline */}
          <div className="w-full md:w-1/2">
            {/* Main Timeline Header - Still Present */}
            <div className="text-center md:text-left mb-8">
              <h2 className="text-2xl font-bold text-slate-100">
                Family Introduction
              </h2>
              <p className="text-slate-400">
                Understanding our purpose and history
              </p>
            </div>

            <div className="relative py-4">
              {/* Vertical Line for Timeline */}
              <div className="absolute left-[10px] md:left-0 h-full w-[2px] bg-slate-700"></div>

              <div className="space-y-16">
                {" "}
                {/* Spacing between timeline items */}
                {/* Q&A Item: Who are we? */}
                <div className="flex w-full relative">
                  {/* Dot on timeline */}
                  <div className="absolute left-[2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 z-10"></div>
                  <div className="ml-8 bg-slate-800 p-6 rounded-lg shadow-lg w-full">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Who are we?
                    </h4>
                    <p className="text-slate-300 text-sm">
                      The Khanal family is a lineage rooted in Nepal, known for
                      its strong values and community contributions. We cherish
                      our shared heritage.
                    </p>
                  </div>
                </div>
                {/* Q&A Item: What the website is? */}
                <div className="flex w-full relative">
                  {/* Dot on timeline */}
                  <div className="absolute left-[2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 z-10"></div>
                  <div className="ml-8 bg-slate-800 p-6 rounded-lg shadow-lg w-full">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      What this website is?
                    </h4>
                    <p className="text-slate-300 text-sm">
                      This website is a digital hub for the Khanal family. It
                      serves as a central repository for our history,
                      genealogies, and shared stories.
                    </p>
                  </div>
                </div>
                {/* Q&A Item: Why it exists? */}
                <div className="flex w-full relative">
                  {/* Dot on timeline */}
                  <div className="absolute left-[2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 z-10"></div>
                  <div className="ml-8 bg-slate-800 p-6 rounded-lg shadow-lg w-full">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Why it exists?
                    </h4>
                    <p className="text-slate-300 text-sm">
                      It exists to foster a deep sense of belonging, preserve
                      our unique history, and strengthen family bonds across the
                      globe, connecting past to future.
                    </p>
                  </div>
                </div>
                {/* Q&A Item: Who it's for? */}
                <div className="flex w-full relative">
                  {/* Dot on timeline */}
                  <div className="absolute left-[2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 z-10"></div>
                  <div className="ml-8 bg-slate-800 p-6 rounded-lg shadow-lg w-full">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Who it&apos;s for?
                    </h4>
                    <p className="text-slate-300 text-sm">
                      This site is specifically created for all descendants of
                      the Khanal lineage, from the youngest generation to our
                      esteemed elders, uniting our family.
                    </p>
                  </div>
                </div>
                {/* Q&A Item: Brief historical overview */}
                <div className="flex w-full relative">
                  {/* Dot on timeline */}
                  <div className="absolute left-[2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 z-10"></div>
                  <div className="ml-8 bg-slate-800 p-6 rounded-lg shadow-lg w-full">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      A brief historical overview:
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Our family&apos;s story began generations ago in the
                      beautiful Kathmandu Valley. Rooted in traditional Nepali
                      culture, our ancestors established a foundation of
                      resilience and community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
