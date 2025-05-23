"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaTree, FaUser, FaSearch, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Member {
  id: number;
  name: string;
  birthYear: number;
  relation: string;
  avatar: string;
}

export default function FamilyTreePage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [viewMode, setViewMode] = useState<"tree" | "timeline">("tree");

  const sampleMembers: Member[] = [
    {
      id: 1,
      name: "Ramesh Khanal",
      birthYear: 1950,
      relation: "Patriarch",
      avatar: "/images/group.jpeg",
    },
    {
      id: 2,
      name: "Sita Khanal",
      birthYear: 1955,
      relation: "Matriarch",
      avatar: "/images/group.jpeg",
    },
    {
      id: 3,
      name: "Gopal Khanal",
      birthYear: 1980,
      relation: "Son",
      avatar: "/images/group.jpeg",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 -mt-[900px]">
        <div className="container mx-auto px-4 py-12 relative">
          {/* Header Section */}
          <header className="text-center mb-16 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
                Khanal Family Legacy
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Tracing our roots back to 18th century Nepal. Explore 5
                generations of family history, achievements, and connections.
              </p>
            </motion.div>

            {/* Interactive Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search family members..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-3 text-amber-500 dark:text-amber-400" />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode("tree")}
                  variant={viewMode === "tree" ? "default" : "outline"}
                  className="gap-2"
                >
                  <FaTree className="w-4 h-4" />
                  Tree View
                </Button>
                <Button
                  onClick={() => setViewMode("timeline")}
                  variant={viewMode === "timeline" ? "default" : "outline"}
                  className="gap-2"
                >
                  <FaInfoCircle className="w-4 h-4" />
                  Timeline
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Family Tree Visualization */}
            <div className="lg:col-span-3 relative h-[800px] w-full rounded-3xl bg-white dark:bg-slate-800 shadow-2xl dark:shadow-slate-900 overflow-hidden">
              {/* 3D Perspective Container */}
              <motion.div
                className="relative h-full w-full perspective-1000"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {/* Interactive Background */}
                <div className="absolute inset-0 bg-[url('/images/heritage-pattern.svg')] opacity-10 dark:opacity-[0.03] bg-repeat" />

                {/* Central Ancestor Node */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-pulse" />
                    <div className="h-32 w-32 rounded-full bg-amber-500/80 dark:bg-amber-400/90 border-4 border-amber-600/30 dark:border-amber-500/20 flex flex-col items-center justify-center text-white shadow-xl hover:scale-105 transition-transform p-4">
                      <Image
                        src="/images/group.jpeg"
                        alt="Ancestor"
                        className="w-16 h-16 rounded-full mb-2 border-2 border-white/30"
                      />
                      <span className="font-semibold text-sm text-center leading-tight">
                        Ramesh Khanal
                      </span>
                      <span className="text-xs opacity-75">b. 1950</span>
                    </div>
                  </div>
                </motion.div>

                {/* Dynamic Branch Nodes */}
                {sampleMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="absolute z-20"
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${30 + index * 10}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-amber-500/30 flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50 dark:hover:bg-slate-600 transition-all group">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full mb-1 border-2 border-amber-500/20 group-hover:border-amber-500/40 transition-colors"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-200 text-center px-1">
                        {member.name.split(" ")[0]}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Connection Lines with Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {sampleMembers.map((_, index) => (
                    <motion.line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`${20 + index * 20}%`}
                      y2={`${30 + index * 10}%`}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-amber-500/30 dark:text-amber-400/20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  ))}
                </svg>
              </motion.div>
            </div>

            {/* Family Statistics Sidebar */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <FaInfoCircle className="w-5 h-5" />
                  Family Stats
                </h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                  <li>• 5 Generations Documented</li>
                  <li>• 127 Family Members</li>
                  <li>• 18 Countries Represented</li>
                  <li>• Oldest Member: 104 years</li>
                  <li>• Youngest Member: 2 months</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <FaUser className="w-5 h-5" />
                  Recent Additions
                </h3>
                <div className="space-y-4">
                  {sampleMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full border-2 border-amber-500/20"
                      />
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                          {member.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {member.relation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Member Detail Modal */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setSelectedMember(null)}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start gap-6">
                    <Image
                      src={selectedMember.avatar}
                      alt={selectedMember.name}
                      className="w-24 h-24 rounded-xl border-4 border-amber-500/20"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        {selectedMember.name}
                      </h2>
                      <p className="text-amber-600 dark:text-amber-400 mb-2">
                        {selectedMember.relation}
                      </p>
                      <div className="space-y-1 text-slate-600 dark:text-slate-300">
                        <p>Born: {selectedMember.birthYear}</p>
                        <p>Generation: 3rd</p>
                        <p>Branch: Maternal</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedMember(null)}
                    className="mt-6 w-full gap-2"
                  >
                    Close Details
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
