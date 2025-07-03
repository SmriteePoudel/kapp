"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import FocusTrap from "focus-trap-react";
import {
  X,
  User,
  Calendar,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Clock,
  Twitter,
  Facebook,
  Linkedin,
  Bookmark, // Added Bookmark icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  authorImage?: string; // Optional: for author avatar
  authorBio?: string; // Optional: for author mini bio
  likes: number;
  comments: number;
  views: number;
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPost: BlogPost | null;
  onLike: (postId: number) => void;
  likedPosts: Set<number>;
  onBookmark: (postId: number) => void; // Added for bookmarking
  bookmarkedPosts: Set<number>; // Added for tracking bookmarked posts
}

export default function BlogModal({
  isOpen,
   onClose, selectedPost, 
   onLike, likedPosts, 
   onBookmark, bookmarkedPosts,
}: BlogModalProps) {
  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Handle share (copy to clipboard)
  const handleShare = () => {
    if (selectedPost) {
      const url = `${window.location.origin}/blog/${selectedPost.slug}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  // Handle social shares
  const handleShareTwitter = () => {
    if (selectedPost) {
      const url = `${window.location.origin}/blog/${selectedPost.slug}`;
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(selectedPost.title)}`,
        "_blank"
      );
    }
  };

  const handleShareFacebook = () => {
    if (selectedPost) {
      const url = `${window.location.origin}/blog/${selectedPost.slug}`;
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    }
  };

  const handleShareLinkedin = () => {
    if (selectedPost) {
      const url = `${window.location.origin}/blog/${selectedPost.slug}`;
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(
          selectedPost.title
        )}&summary=${encodeURIComponent(
          selectedPost.excerpt
        )}&source=${encodeURIComponent(window.location.origin)}`,
        "_blank"
      );
    }
  };

  if (!isOpen) return null;

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full relative overflow-hidden shadow-2xl animate-pulse">
      <div className="relative h-64 w-full bg-gray-200 dark:bg-slate-700"></div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400 dark:text-gray-500">
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded mb-6"></div>
        <div className="mb-6 flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
        </div>

        {/* Author Bio Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-1"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-5 w-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-5 w-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-5 w-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-5 w-10 bg-gray-200 dark:bg-slate-700 rounded"></div>{" "}
            {/* Bookmark */}
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <div className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <FocusTrap active={isOpen}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {!selectedPost ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>

            <div className="relative h-64 w-full">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedPost.author}</span>
                </div>
                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedPost.date}</span>
                </div>
                {/* Read Time */}
                {selectedPost.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPost.readTime} read</span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                {selectedPost.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {selectedPost.excerpt}
              </p>

              {/* Tags/Categories */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Avatar + Mini Bio */}
              {(selectedPost.authorImage || selectedPost.authorBio) && (
                <div className="flex items-start gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  {selectedPost.authorImage && (
                    <Image
                      src={selectedPost.authorImage}
                      alt={selectedPost.author}
                      width={40}
                      height={40}
                      className="rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      About {selectedPost.author}
                    </h3>
                    {selectedPost.authorBio && (
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {selectedPost.authorBio}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{selectedPost.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedPost.comments}</span>
                  </div>
                  <button
                    onClick={() => onLike(selectedPost.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      likedPosts.has(selectedPost.id)
                        ? "text-rose-500"
                        : "text-slate-400 hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedPosts.has(selectedPost.id) ? "fill-current" : ""
                      }`}
                    />
                    <span>
                      {selectedPost.likes +
                        (likedPosts.has(selectedPost.id) ? 1 : 0)}
                    </span>
                  </button>
                  {/* Bookmark Button */}
                  <button
                    onClick={() => onBookmark(selectedPost.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      bookmarkedPosts.has(selectedPost.id)
                        ? "text-blue-500" // Example color for bookmarked
                        : "text-slate-400 hover:text-blue-500"
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedPosts.has(selectedPost.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span>Bookmark</span>
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare} // Copy to clipboard
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareTwitter}
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareFacebook}
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareLinkedin}
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href={`/blog/${selectedPost.slug}`}>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    Read Full Blog
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </FocusTrap>
  );
}
