"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Star,
  Trophy,
  Share2,
} from "lucide-react";
import {
  FeaturedStory,
  familyMembers,
  familyEvents,
  familyPhotos,
} from "@/data/family";

interface StoryPageClientProps {
  story: FeaturedStory;
}

export function StoryPageClient({ story }: StoryPageClientProps) {
  const handleShare = async () => {
    const shareData = {
      title: story.title,
      text: story.excerpt,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Derive author details from FamilyMember using memberId
  const authorDetails = familyMembers.find(
    (member) => member.id === story.memberId
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 py-8 mt-6">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/familytree">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-8 mb-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-8 ring-white/30 backdrop-blur-sm">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {story.title}
              </h1>
              <p className="text-xl opacity-90 mb-4">By {story.author}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  Published {story.date}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-rose-500" />
                About the Story
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {story.content}
              </p>
              {story.excerpt && (
                <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-900/20 dark:to-amber-900/20 rounded-xl border-l-4 border-rose-500">
                  <p className="italic text-slate-700 dark:text-slate-300">
                    {story.excerpt}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Education Section (Placeholder) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                Background Context
              </h2>
              <div className="space-y-4">
                {[
                  `Story authored by ${story.author}`,
                  `Inspired by ${authorDetails?.bio || "a family member"}`,
                ].map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                    <p className="text-slate-700 dark:text-slate-300">{edu}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Career Section (as Related Events) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-purple-500" />
                Related Events
              </h2>
              <div className="space-y-4">
                {[
                  ...familyEvents
                    .filter((e) => e.memberIds.includes(story.memberId))
                    .map((e) => e.title + " - " + e.date),
                  ...familyPhotos
                    .filter((p) => p.memberIds.includes(story.memberId))
                    .map((p) => p.event + " - " + p.date),
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                    <p className="text-slate-700 dark:text-slate-300">{job}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Section (as Milestones) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                Milestones
              </h2>
              <div className="grid gap-4">
                {[
                  `Published on ${story.date}`,
                  `Authored by ${story.author}`,
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl"
                  >
                    <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-slate-700 dark:text-slate-300">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Story Information</h3>
              <div className="space-y-3">
                {story.author && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {story.author}
                    </span>
                  </div>
                )}
                {authorDetails?.birthDate && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Born {authorDetails.birthDate}
                    </span>
                  </div>
                )}
                {authorDetails?.name && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      About {authorDetails.name}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {story.date}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Story Themes</h3>
              <div className="flex flex-wrap gap-2">
                {["Narrative", "History", "Storytelling"].map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Languages</h3>
              <div className="space-y-2">
                {["English"].map((language, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {language}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hobbies */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {["Storytelling", "Tradition"].map((hobby, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 text-rose-700 dark:text-rose-300 text-sm rounded-full"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Personality Traits */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Story Tone</h3>
              <div className="flex flex-wrap gap-2">
                {["Inspiring", "Heartwarming"].map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 text-sm rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
