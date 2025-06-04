"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Eye, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// --- Import your BlogModal component and blog data ---
import BlogModal from "@/components/blog/BlogModal";
import { blogPosts } from "@/data/blog";

// --- Define the BlogPost interface ---
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
  authorImage?: string;
  authorBio?: string;
  likes: number;
  comments: number;
  views: number;
}

export default function BlogPage() {
  // --- Modal and Interaction States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(
    new Set()
  );

  // --- Newsletter Subscription States ---
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // --- Local Storage Effects ---
  useEffect(() => {
    try {
      const storedLiked = localStorage.getItem("likedPosts");
      if (storedLiked) {
        setLikedPosts(new Set(JSON.parse(storedLiked)));
      }
      const storedBookmarked = localStorage.getItem("bookmarkedPosts");
      if (storedBookmarked) {
        setBookmarkedPosts(new Set(JSON.parse(storedBookmarked)));
      }
    } catch (e) {
      console.error("Failed to load state from local storage:", e);
      setLikedPosts(new Set());
      setBookmarkedPosts(new Set());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(Array.from(likedPosts)));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem(
      "bookmarkedPosts",
      JSON.stringify(Array.from(bookmarkedPosts))
    );
  }, [bookmarkedPosts]);

  // --- Modal Handlers ---
  const handleOpenModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  // --- Like and Bookmark Handlers ---
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
        toast.info("Post removed from bookmarks!");
      } else {
        newSet.add(postId);
        toast.success("Post added to bookmarks!");
      }
      return newSet;
    });
  };

  // --- Newsletter Subscription Handler ---
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed to subscribe");
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription failed:", err);
      toast.error("Failed to subscribe. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Pagination Handler ---
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- Featured Posts and Paginated Posts Logic ---
  const featuredPosts = blogPosts.slice(0, 3);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400">
              Family Stories
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Chronicles of love, tradition, and growth from the Khanal family.
              Discover our journey through stories that connect generations and
              celebrate our shared heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">
            Featured Stories
          </h2>
          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-tight">
            {!featuredPosts || featuredPosts.length === 0 ? (
              <>
                {[0, 1, 2].map((placeholder) => (
                  <div
                    key={`skeleton-${placeholder}`}
                    className="min-w-[350px] bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 p-6"
                  >
                    <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-4 py-2 text-sm bg-gray-200 dark:bg-slate-700 rounded-full w-24 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 leading-tight">
                      <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed line-clamp-3">
                      <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
                      <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                      <span className="text-sm font-medium">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                      </span>
                      <span className="text-sm font-medium">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                      <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="min-w-[350px] bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 p-6"
                >
                  <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-4 py-2 text-sm bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30 text-rose-600 dark:text-rose-400 rounded-full font-medium">
                      {post.tags[0]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 leading-tight">
                    {post.title}
                  </h3>
                  <div className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                    <span className="text-sm font-medium">{post.date}</span>
                    <span className="text-sm font-medium">
                      | {post.readTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleOpenModal(post)}
                      className="text-rose-600 dark:text-rose-400 hover:underline font-medium text-sm"
                    >
                      Quick View
                    </button>
                    <Link href={`/blog/${post.slug}`} passHref>
                      <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-slate-800 dark:text-slate-100">
            All Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!paginatedPosts || paginatedPosts.length === 0 ? (
              <>
                {[0, 1, 2, 3, 4, 5].map((placeholder) => (
                  <div
                    key={`skeleton-all-${placeholder}`}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-slate-200 dark:border-slate-700"
                  >
                    <div className="relative h-48 w-full">
                      <div className="w-full h-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded-full w-16 h-6 animate-pulse" />
                        <span className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded-full w-20 h-6 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                        <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                      </h3>
                      <div className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                        <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-4 w-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                          <div className="h-4 w-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                          <div className="h-4 w-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                        </div>
                        <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-slate-200 dark:border-slate-700"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                      {post.title}
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <span>{post.readTime} read</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleOpenModal(post)}
                        className="text-rose-600 dark:text-rose-400 hover:underline font-medium text-sm"
                      >
                        Quick View
                      </button>
                      <Link href={`/blog/${post.slug}`} passHref>
                        <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-6">
              <Mail className="w-16 h-16 mx-auto text-rose-600 dark:text-rose-400 mb-4" />
              <div className="absolute inset-0 bg-rose-100 dark:bg-rose-900/30 rounded-full w-24 h-24 mx-auto opacity-20 top-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Join Our Family Newsletter
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              Be the first to read our latest stories, get exclusive family
              updates, and receive invitations to special events. Join our
              extended family community.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                disabled={submitting}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            className="dark:border-slate-600 hover:bg-rose-50 dark:hover:bg-slate-800"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className={
                currentPage === page
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "dark:border-slate-600 hover:bg-rose-50 dark:hover:bg-slate-800"
              }
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="dark:border-slate-600 hover:bg-rose-50 dark:hover:bg-slate-800"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* BlogModal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPost={selectedPost}
        onLike={handleLike}
        likedPosts={likedPosts}
        onBookmark={handleBookmark}
        bookmarkedPosts={bookmarkedPosts}
      />
    </main>
  );
}
