"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  HeartHandshake,
  Users,
  Baby,
  Clock,
  ScrollText,
  Gem,
} from "lucide-react";

export default function FamilyPage() {
  const familyMembers = [
    {
      name: "Krishna Khanal",
      role: "Patriarch",
      generation: "2nd",
      photo: "/images/group.jpeg",
    },
    {
      name: "Radha Khanal",
      role: "Matriarch",
      generation: "2nd",
      photo: "/images/group.jpeg",
    },
    {
      name: "Ramesh Khanal",
      role: "Eldest Son",
      generation: "3rd",
      photo: "/images/group.jpeg",
    },
    {
      name: "Sita Khanal",
      role: "Daughter",
      generation: "3rd",
      photo: "/images/group.jpeg",
    },
    {
      name: "Hari Khanal",
      role: "Youngest Son",
      generation: "3rd",
      photo: "/images/group.jpeg",
    },
  ];

  const familyTimeline = [
    {
      year: "1975",
      event: "Family Foundation",
      description: "Krishna & Radha married",
    },
    {
      year: "1980",
      event: "First Home",
      description: "Built family home in Kathmandu",
    },
    {
      year: "1995",
      event: "Family Business",
      description: "Established Khanal Enterprises",
    },
    {
      year: "2010",
      event: "Golden Jubilee",
      description: "35th anniversary celebration",
    },
    {
      year: "2023",
      event: "New Generation",
      description: "First grandchildren born",
    },
  ];

  return (
    <>
      <main className="bg-white dark:bg-slate-900 pt-20">
        <section className="relative py-16 md:py-24 flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/group.jpeg"
              alt="Family background"
              fill
              className="object-cover opacity-20 dark:opacity-10"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10 px-4"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400">
              Khanal Family
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              United by love, strengthened by tradition, growing through
              generations
            </p>
          </motion.div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-8 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Our Family Tree
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Tracing our roots through generations
              </p>
            </motion.div>
            <div className="relative flex flex-col items-center space-y-12">
              {familyMembers.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-rose-500">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">
                        {member.name}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                        {member.role}
                      </p>
                      <span className="inline-block mt-2 px-3 py-1 text-xs md:text-sm bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full">
                        {member.generation} Generation
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Family Timeline
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Milestones that shaped our family history
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 w-1 bg-slate-200 dark:bg-slate-700 h-full -translate-x-1/2" />
              {familyTimeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-12 flex ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } items-center justify-between`}
                >
                  <div className="w-5/12 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
                      {event.year}
                    </h3>
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                      {event.event}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {event.description}
                    </p>
                  </div>
                  <div className="w-1/12 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-rose-500 dark:bg-rose-400 border-4 border-white dark:border-slate-800" />
                  </div>
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-8 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Our Core Values
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Principles that guide our family
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  icon: HeartHandshake,
                  title: "Unity",
                  description: "Standing together through all challenges",
                },
                {
                  icon: Users,
                  title: "Tradition",
                  description: "Honoring our cultural heritage",
                },
                {
                  icon: Gem,
                  title: "Integrity",
                  description: "Always doing the right thing",
                },
                {
                  icon: ScrollText,
                  title: "Education",
                  description: "Lifelong learning for all",
                },
                {
                  icon: Clock,
                  title: "Legacy",
                  description: "Building for future generations",
                },
                {
                  icon: Baby,
                  title: "Growth",
                  description: "Nurturing each family member",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700"
                >
                  <value.icon className="w-8 h-8 md:w-12 md:h-12 text-rose-500 dark:text-rose-400 mb-3 md:mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
