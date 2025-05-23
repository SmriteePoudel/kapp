"use client";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Users,
  HeartHandshake,
  GalleryThumbnails,
  Mail,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PagesPage() {
  const pages = [
    {
      title: "Family Tree",
      description: "Explore our family lineage through generations",
      icon: Users,
      link: "/family-tree",
      color: "text-rose-500",
    },
    {
      title: "Photo Gallery",
      description: "Memorable moments from our family archive",
      icon: GalleryThumbnails,
      link: "/gallery",
      color: "text-amber-500",
    },
    {
      title: "Family Values",
      description: "Principles that guide our family",
      icon: HeartHandshake,
      link: "/values",
      color: "text-emerald-500",
    },
    {
      title: "Family Recipes",
      description: "Traditional dishes passed down through generations",
      icon: BookOpen,
      link: "/recipes",
      color: "text-sky-500",
    },
  ];

  const featuredPages = [
    {
      title: "Family History",
      description: "Our journey through the decades",
      tag: "Heritage",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white dark:bg-slate-900 pt-20 -mt-[900px]">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-rose-50 to-transparent dark:from-slate-800">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400">
                Family Pages
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Explore the different facets of our family&apos;s story
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md mx-auto mt-8"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search pages..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Pages */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">
              Featured Sections
            </h2>
            <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
              {featuredPages.map((page, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[300px] bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-2 border-rose-500/20 hover:border-rose-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full">
                      {page.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                    {page.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {page.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700"
                    asChild
                  >
                    <Link href="#">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Pages Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pages.map((page, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-col items-center text-center">
                    <page.icon className={`w-12 h-12 mb-4 ${page.color}`} />
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                      {page.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {page.description}
                    </p>
                    <Button
                      variant="outline"
                      className="border-slate-200 dark:border-slate-700 group-hover:border-rose-500 group-hover:text-rose-600 dark:group-hover:text-rose-400"
                      asChild
                    >
                      <Link href={page.link}>
                        Explore
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-700">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Mail className="w-12 h-12 mx-auto text-rose-600 dark:text-rose-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Want More Family Content?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                Subscribe to our newsletter for exclusive updates and stories
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                />
                <Button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
