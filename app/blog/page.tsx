"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ArrowRight, BookOpen, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  tags: string[];
  image: string;
  readTime?: string;
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const blogPosts = [
    {
      id: 1,
      title: "Family Traditions in Modern Times",
      excerpt: "Discover how we preserve our cultural heritage while embracing contemporary values...",
      content: `Full article content here Discover how we preserve our cultural heritage while embracing contemporary values`, 
      date: "March 15, 2024",
      tags: ["Culture", "Traditions"],
      image: "/images/group.jpeg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Organizing Successful Family Gatherings",
      excerpt: "Learn our secrets to hosting memorable family events that strengthen bonds...",
      content: `Full article content here Learn our secrets to hosting memorable family events that strengthen bonds`, 
      date: "March 12, 2024",
      tags: ["Events", "Tips"],
      image: "/images/group.jpeg",
      readTime: "4 min read"
    },
  ];

  const featuredPosts = [
    {
      id: 3,
      title: "Our Family History: A 100-Year Journey",
      excerpt: "Trace our family's remarkable journey through generations...",
      date: "March 1, 2024",
      tag: "History"
    },
  ];
  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white dark:bg-slate-900 pt-20 -mt-[900px]">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400">
                Family Blog
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Stories, tips, and insights from the Khanal family
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 bg-rose-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">Featured Stories</h2>
            <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[300px] bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Blog Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="/images/group.jpeg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm">{post.readTime}</span>
                      </div>
                    </div>
                    <Button
                    variant="ghost"
                    className="mt-4 group flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700"
                    onClick={() => handleReadMore(post)}
                  >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        {isModalOpen && selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>

              <div className="relative h-64 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover mt-6 rounded-2xl"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {selectedPost.content}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-700">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Mail className="w-12 h-12 mx-auto text-rose-600 dark:text-rose-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Join Our Family Newsletter
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                Get exclusive stories and updates directly in your inbox
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

        {/* Pagination */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="dark:border-slate-600">
              Previous
            </Button>
            <Button variant="outline" className="dark:border-slate-600">
              1
            </Button>
            <Button variant="outline" className="dark:border-slate-600">
              2
            </Button>
            <Button variant="outline" className="dark:border-slate-600">
              Next
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}