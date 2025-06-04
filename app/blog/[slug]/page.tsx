"use client";
import Image from "next/image";
import {
  User,
  Calendar,
  BookOpen,
  Eye,
  MessageCircle,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { useState, use } from "react";
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

// export async function getServerSideProps({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   // Primary API fetch
//   try {
//     const primaryUrl = `${
//       process.env.API_URL || "http://localhost:3000"
//     }/api/blogs/${params.slug}`;
//     const response = await fetch(primaryUrl);
//     if (!response.ok)
//       throw new Error("Failed to fetch blog post from primary API");
//     const post: BlogPost = await response.json();
//     if (!post) return { notFound: true };
//     return { props: { post } };
//   } catch (primaryError) {
//     console.warn(
//       `Primary API fetch failed: ${
//         primaryError instanceof Error ? primaryError.message : "Unknown error"
//       }`
//     );

//     // Fallback to local mock API
//     try {
//       const fallbackResponse = await fetch(
//         `/data/blog/${params.slug}`
//       );
//       if (!fallbackResponse.ok)
//         throw new Error("Failed to fetch blog post from fallback API");
//       const post: BlogPost = await fallbackResponse.json();
//       if (!post) return { notFound: true };
//       return { props: { post } };
//     } catch (fallbackError) {
//       console.error(
//         `Fallback API fetch failed: ${
//           fallbackError instanceof Error
//             ? fallbackError.message
//             : "Unknown error"
//         }`
//       );
//       return { notFound: true };
//     }
//   }
// }

// Client Component for interactive elements
function BlogPostContent({ post }: { post: BlogPost }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleReadMore = (relatedPost: BlogPost) => {
    window.location.href = `/blog/${relatedPost.slug}`;
  };

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-80 w-full mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30 text-rose-600 dark:text-rose-400 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-6 text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 transition-colors ${
                      liked
                        ? "text-rose-500"
                        : "text-slate-400 hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                    />
                    <span>{post.likes + (liked ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-blockquote:border-rose-500 prose-blockquote:bg-rose-50 dark:prose-blockquote:bg-rose-900/30 prose-blockquote:italic prose-strong:text-slate-800 dark:prose-strong:text-slate-200 prose-ul:text-slate-600 dark:prose-ul:text-slate-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    Share this story:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
                <Button
                  onClick={handleLike}
                  variant={liked ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    liked
                      ? "bg-rose-500 hover:bg-rose-600 text-white"
                      : "border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                  {liked ? "Loved" : "Love this"}
                </Button>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                More Family Stories
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleReadMore(post)}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 dark:text-slate-100 truncate">
                        {post.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {post.readTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Server Component for data fetching
export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((p: BlogPost) => p.slug === slug);

  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
