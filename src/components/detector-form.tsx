"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { newsService } from "@/lib/services/news"
import { AlertCircle, CheckCircle2, Link, Type } from "lucide-react"

export function DetectorForm() {
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { toast } = useToast()

  const handleTextCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter text to check",
      })
      return
    }

    try {
      setLoading(true)
      const response = await newsService.predictText(text)
      setResult(response)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to check text",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUrlCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter URL to check",
      })
      return
    }

    try {
      setLoading(true)
      const response = await newsService.predictUrl(url)
      setResult(response)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to check URL",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="h-5 w-5" />
            <span>Check by Text</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTextCheck} className="space-y-4">
            <Input
              placeholder="Enter news text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Checking..." : "Check Text"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5" />
            <span>Check by URL</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUrlCheck} className="space-y-4">
            <Input
              placeholder="Enter news URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Checking..." : "Check URL"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {result.prediction === "REAL" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span>Result</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Prediction: {result.prediction}
              </p>
              <p className="text-sm text-muted-foreground">
                Confidence: {result.confidence}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 