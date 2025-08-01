"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Users, HeartHandshake, Baby, ChevronRight } from "lucide-react";
import { familyMembers, FamilyMember } from "@/data/family";

const categories = [
  { id: "all", label: "All Members", icon: Users },
  { id: "parents", label: "Parents", icon: HeartHandshake },
  { id: "children", label: "Children", icon: Baby },
];

export default function MembersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMembers = familyMembers.filter((member: FamilyMember) => {
    if (selectedCategory === "parents") return member.generation === 2;
    if (selectedCategory === "children") return member.generation === 3;
    return true; // "all"
  });

  return (
    <section className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400">
            Our Family Members
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Meet the wonderful individuals who make up the Khanal family tree.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={isActive ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all ${
                  isActive
                    ? "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-rose-500 dark:hover:border-rose-400 hover:shadow-xl dark:hover:shadow-rose-500/10 transition-all">
                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Details */}
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                  {member.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm rounded-full">
                    {member.role}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    {member.birthDate}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {member.bio}
                </p>

                {/* View Profile */}
                <Link href={`/members/${member.slug}`}>
                  <Button
                    variant="outline"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white dark:bg-rose-500 dark:hover:bg-rose-600 border-rose-500 dark:border-rose-600 group/btn"
                  >
                    View Full Profile
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 dark:text-slate-300">
              No members found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
