import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsCardProps {
  news: {
    title: string
    content: string
    url: string
    date?: string
    thumbnail?: string
  }
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      {news.thumbnail && (
        <div className="relative h-48 w-full">
          <img
            src={news.thumbnail}
            alt={news.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback jika gambar gagal dimuat
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            {news.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {news.content}
        </p>
        {news.date && (
          <p className="text-xs text-muted-foreground mt-2">
            {news.date}
          </p>
        )}
      </CardContent>
    </Card>
  )
} 