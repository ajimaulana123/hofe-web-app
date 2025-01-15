"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { newsService } from "@/lib/services/news"
import { Loader2 } from "lucide-react"

type TextResult = {
  text: string
  prediction: string
}

type UrlResult = {
  url: string
  prediction: string
  cleaned_content?: string
}

export function DetectorForm() {
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [textResult, setTextResult] = useState<TextResult | null>(null)
  const [urlResult, setUrlResult] = useState<UrlResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      setLoading(true)
      setError(null)
      setUrlResult(null) // Reset URL result
      const response = await newsService.predictText(text)
      
      if (response.success) {
        setTextResult({
          text: response.text,
          prediction: response.prediction
        })
      } else {
        setError(response.error)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    try {
      setLoading(true)
      setError(null)
      setTextResult(null)
      const response = await newsService.predictUrl(url)
      
      setUrlResult({
        url: url,
        prediction: String(response.result),
        cleaned_content: response.cleaned_content
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Analisis Teks</TabsTrigger>
          <TabsTrigger value="url">Analisis URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan teks yang ingin dianalisis..."
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={loading || !text.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                "Analisis Teks"
              )}
            </Button>
          </form>

          {textResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Hasil Analisis Teks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Teks:</strong> {textResult.text}</p>
                <p><strong>Prediksi:</strong> {textResult.prediction}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="url">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Masukkan URL yang ingin dianalisis..."
            />
            <Button type="submit" disabled={loading || !url.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                "Analisis URL"
              )}
            </Button>
          </form>

          {urlResult && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Hasil Analisis URL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>URL:</strong> {urlResult.url}</p>
                <p><strong>Prediksi:</strong> {urlResult.prediction}</p>
                {urlResult.cleaned_content && (
                  <p><strong>Konten:</strong> {urlResult.cleaned_content}</p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
} 