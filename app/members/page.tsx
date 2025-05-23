"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Users, HeartHandshake, Baby, ChevronRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Member {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  birthdate: string;
  relationship: string;
}

export default function MembersPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Sample data for family members
  const members: Member[] = [
    // Parents
    {
      id: 1,
      name: 'Krishna Khanal',
      role: 'Family Head',
      bio: 'Dedicated family patriarch with 40+ years of leadership experience',
      photo: '/images/group.jpeg',
      birthdate: 'April 20, 1955',
      relationship: 'Father'
    },
    {
      id: 2,
      name: 'Radha Khanal',
      role: 'Matriarch',
      bio: 'Heart of the family with exceptional culinary skills',
      photo: '/images/group.jpeg',
      birthdate: 'June 15, 1960',
      relationship: 'Mother'
    },
    // Children
    {
      id: 3,
      name: 'Ramesh Khanal',
      role: 'Software Engineer',
      bio: 'Tech enthusiast building the future with code',
      photo: '/images/group.jpeg',
      birthdate: 'March 12, 1990',
      relationship: 'Son'
    },
    {
      id: 4,
      name: 'Sita Khanal',
      role: 'Medical Student',
      bio: 'Aspiring doctor passionate about community health',
      photo: '/images/group.jpeg',
      birthdate: 'August 5, 1995',
      relationship: 'Daughter'
    },
    {
      id: 5,
      name: 'Hari Khanal',
      role: 'Business Student',
      bio: 'Entrepreneurial spirit learning the ropes of commerce',
      photo: '/images/group.jpeg',
      birthdate: 'November 30, 2000',
      relationship: 'Son'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Members', icon: Users },
    { id: 'parents', label: 'Parents', icon: HeartHandshake },
    { id: 'children', label: 'Children', icon: Baby },
  ];

  // Filter members based on selected category
  const filteredMembers = members.filter(member => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'parents') {
      return ['Father', 'Mother'].includes(member.relationship);
    }
    if (selectedCategory === 'children') {
      return ['Son', 'Daughter'].includes(member.relationship);
    }
    return true;
  });

  return (
    <>
      <Header />
      <section className="py-20 bg-white dark:bg-slate-900 min-h-screen -mt-[900px]">
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
              Meet the wonderful individuals who make up the Khanal family tree
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.label}
              </Button>
            ))}
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
                <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-all hover:border-rose-500 dark:hover:border-rose-400 hover:shadow-xl dark:hover:shadow-rose-500/10">
                  {/* Member Image */}
                  <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  </div>

                  {/* Member Details */}
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm rounded-full">
                      {member.relationship}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      {member.birthdate}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {member.bio}
                  </p>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full group/btn"
                    onClick={() => setSelectedMember(member)}
                  >
                    View Full Profile
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-slate-600 dark:text-slate-300">
                No members found in this category
              </p>
            </div>
          )}

          {/* Member Detail Modal */}
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                  >
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </button>

                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6">
                <div className="relative h-48 sm:h-64 w-full rounded-lg overflow-hidden mt-8 sm:mt-0">
                <Image
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="sm:pt-0 pt-4">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                      {selectedMember.name}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
                        <p className="text-slate-700 dark:text-slate-300">{selectedMember.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Birthdate</p>
                        <p className="text-slate-700 dark:text-slate-300">{selectedMember.birthdate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Bio</p>
                        <p className="text-slate-700 dark:text-slate-300">{selectedMember.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}