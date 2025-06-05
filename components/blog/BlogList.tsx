"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";
import { blogPosts } from "@/data/blog";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image: string;
  readTime: string;
  author: string;
  likes: number;
  comments: number;
  views: number;
}

export default function BlogList() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(
    new Set()
  );

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-12 text-slate-800 dark:text-slate-100"
        >
          Latest Stories
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={handleReadMore}
              onLike={handleLike}
              likedPosts={likedPosts}
              index={index}
            />
          ))}
        </div>
        <BlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPost={selectedPost}
          onLike={handleLike}
          likedPosts={likedPosts}
          onBookmark={handleBookmark}
          bookmarkedPosts={bookmarkedPosts}
        />
      </div>
    </section>
  );
}
