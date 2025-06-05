import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

export async function GET() {
  try {
    // Get the first 3 posts as featured posts
    const featuredPosts = blogPosts.slice(0, 3).map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      tag: post.tags[0] // Use the first tag as the featured tag
    }));

    return NextResponse.json(featuredPosts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return NextResponse.json({ error: 'Failed to fetch featured posts' }, { status: 500 });
  }
} 