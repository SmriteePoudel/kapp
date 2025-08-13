"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Users, HeartHandshake, Baby, ChevronRight, User } from "lucide-react";
import { familyMembers, FamilyMember } from "@/data/family";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const categories = [
  { id: "all", label: "All Members", icon: Users },
  { id: "parents", label: "Parents", icon: HeartHandshake },
  { id: "children", label: "Children", icon: Baby },
];

export default function MembersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user, loading } = useAuth();

  const filteredMembers = familyMembers.filter((member: FamilyMember) => {
    if (selectedCategory === "parents") return member.generation === 2;
    if (selectedCategory === "children") return member.generation === 3;
    return true;
  });

  return (
    <section className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        
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

        
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="border-2 border-rose-500 dark:border-rose-400 rounded-xl p-6 bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-900/20 dark:to-amber-900/20 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {user.name || user.email.split('@')[0]}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Welcome back! You're part of the Khanal family.
                  </p>
                </div>
              </div>










              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm rounded-full">
                  Current User
                </span>
                {user.roles && user.roles.map((role) => (
                  <span key={role} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm rounded-full">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        
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
