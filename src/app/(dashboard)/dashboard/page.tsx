'use client';

import { useEffect, useState } from 'react';
import { newsService } from '@/lib/services/news';
import { authService } from '@/lib/services/auth';
import { useRouter } from 'next/navigation';
import { NewsCard } from "@/components/news-card";

export default function Dashboard() {
  const router = useRouter();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const token = authService.getStoredToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsService.getNews();
        setNews(response.articles || []);
      } catch (error: any) {
        console.error('Error fetching news:', error);
        setError(error.message);
        if (error.message.includes('Token')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [router]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-48 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No news available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">News Feed</h2>
        <p className="text-muted-foreground">
          Latest news from various sources
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, index) => (
          <NewsCard key={index} news={item} />
        ))}
      </div>
    </div>
  );
} 