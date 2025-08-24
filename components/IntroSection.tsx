"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trees, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const IntroSection: FC = () => {
  const [isTimelineCollapsed, setIsTimelineCollapsed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      
      setIsTimelineCollapsed(currentScrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineItems = [
    {
      title: "Who are we?",
      content: "The Khanal family is a lineage rooted in Nepal, known for its strong values and community contributions. We cherish our shared heritage."
    },
    {
      title: "What this website is?",
      content: "This website is a digital hub for the Khanal family. It serves as a central repository for our history, genealogies, and shared stories."
    },
    {
      title: "Why it exists?",
      content: "It exists to foster a deep sense of belonging, preserve our unique history, and strengthen family bonds across the globe, connecting past to future."
    },
    {
      title: "Who it's for?",
      content: "This site is specifically created for all descendants of the Khanal lineage, from the youngest generation to our esteemed elders, uniting our family."
    },
    {
      title: "A brief historical overview:",
      content: "Our family's story began generations ago in the beautiful Kathmandu Valley. Rooted in traditional Nepali culture, our ancestors established a foundation of resilience and community."
    }
  ];

  return (
    <section className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        
         <div className="flex flex-col md:flex-row gap-8 md:gap-8 items-start">
          
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

            
            <p className="text-md sm:text-lg italic text-foreground/75 my-6">
              &quot;जोड्दै जाने, नतोड्ने: Connecting Generations, Strengthening
              Bonds&quot;
            </p>

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

            
            <div className="mt-12 w-full max-w-sm md:max-w-lg lg:max-w-xl mx-auto md:mx-0">
              <Image
                src="/images/YR8A9110.webp" 
                alt="Family Placeholder"
                width={800}
                height={450}
                className="rounded-lg shadow-lg object-cover w-full h-auto aspect-video"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
           
            <div className="text-center md:text-left mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">
                    Family Introduction
                  </h2>
                  <p className="text-slate-400">
                    Understanding our purpose and history
                  </p>
                </div>
                
                
                {isTimelineCollapsed && (
                  <Button
                    onClick={() => setIsTimelineCollapsed(!isTimelineCollapsed)}
                    variant="ghost"
                    size="sm"
                    className="text-amber-500 hover:text-amber-400 hover:bg-slate-800"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

            <motion.div 
              className="relative py-4"
              animate={{ 
                height: isTimelineCollapsed ? "120px" : "auto",
                opacity: isTimelineCollapsed ? 0.7 : 1
              }}
              transition={{ 
                duration: 0.4,
                ease: "easeInOut"
              }}
              style={{ 
                overflow: isTimelineCollapsed ? "hidden" : "visible"
              }}
            >
              
              <div className="absolute left-[10px] md:left-0 h-full w-[2px] bg-slate-700"></div>

              <div className="space-y-16">
                {timelineItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex w-full relative"
                    animate={{
                      y: isTimelineCollapsed ? -index * 20 : 0,
                      scale: isTimelineCollapsed ? 0.8 : 1,
                      opacity: isTimelineCollapsed && index > 0 ? 0 : 1
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: isTimelineCollapsed ? 0 : index * 0.1
                    }}
                  >
                    
                    <div className="absolute left-[2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-900 z-10"></div>
                    <div className="ml-8 bg-slate-800 p-6 rounded-lg shadow-lg w-full">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h4>
                      {(!isTimelineCollapsed || index === 0) && (
                        <p className="text-slate-300 text-sm">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              
              {isTimelineCollapsed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 flex justify-center"
                >
                  <Button
                    onClick={() => setIsTimelineCollapsed(false)}
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900"
                  >
                    <ChevronDown className="h-4 w-4 mr-2" />
                    View All ({timelineItems.length - 1} more)
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;