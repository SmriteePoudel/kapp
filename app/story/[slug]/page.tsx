// app/story/[slug]/page.tsx
import { notFound } from "next/navigation";
import { StoryPageClient } from "@/components/StoryPageClient";
import { featuredStories } from "@/data/family";

async function getStoryBySlug(slug: string) {
  return featuredStories.find((story) => story.slug === slug) || null;
}

interface StoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const resolvedParams = await params;
  const story = await getStoryBySlug(resolvedParams.slug);

  if (!story) {
    notFound();
  }

  return <StoryPageClient story={story} />;
}
