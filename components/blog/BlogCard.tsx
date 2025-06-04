"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  User,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

interface BlogCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
  onLike: (postId: number) => void;
  likedPosts: Set<number>;
  index: number;
}

export default function BlogCard({
  post,
  onReadMore,
  onLike,
  likedPosts,
  index,
}: BlogCardProps) {
  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700 group"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/images/group.jpeg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30 text-rose-600 dark:text-rose-400 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1 transition-colors ${
                likedPosts.has(post.id)
                  ? "text-rose-500"
                  : "text-slate-400 hover:text-rose-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  likedPosts.has(post.id) ? "fill-current" : ""
                }`}
              />
              <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            className="group flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 font-medium"
            onClick={() => onReadMore(post)}
          >
            Read Full Story
            <span className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
