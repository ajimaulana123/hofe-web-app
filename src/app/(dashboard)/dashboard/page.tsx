import { Suspense } from "react"
import { Metadata } from "next"
import { NewsCard } from "@/components/news-card"
import { newsService } from "@/lib/services/news"

export const metadata: Metadata = {
  title: "News - Dashboard",
  description: "Latest news feed",
}

function LoadingNews() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-muted rounded animate-pulse w-1/4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-48 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}

async function NewsList() {
  try {
    const news = await newsService.getNews()
    
    if (!news.data?.length) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No news available</p>
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.data.map((item: any) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    )
  } catch (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load news</p>
      </div>
    )
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">News Feed</h2>
        <p className="text-muted-foreground">
          Latest news from various sources
        </p>
      </div>
      <Suspense fallback={<LoadingNews />}>
        <NewsList />
      </Suspense>
    </div>
  )
} 