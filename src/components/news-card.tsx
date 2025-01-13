import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Globe } from "lucide-react"

interface NewsCardProps {
  news: {
    title: string
    description: string
    source?: string
    publishedAt?: string
  }
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="line-clamp-2 text-2xl">
          {news.title}
        </CardTitle>
        {news.source && (
          <CardDescription className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>{news.source}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {news.description}
        </p>
        {news.publishedAt && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={news.publishedAt}>
              {new Date(news.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 