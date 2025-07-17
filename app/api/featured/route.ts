import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

export async function GET() {
  try {
   
    const featuredPosts = blogPosts.slice(0, 3).map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      tag: post.tags[0] 
    }));

    return NextResponse.json(featuredPosts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return NextResponse.json({ error: 'Failed to fetch featured posts' }, { status: 500 });
  }
} 