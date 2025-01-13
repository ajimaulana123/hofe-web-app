import { Metadata } from "next"
import { DetectorForm } from "@/components/detector-form"

export const metadata: Metadata = {
  title: "News Detector",
  description: "Detect fake news using AI",
}

export default function DetectorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">News Detector</h2>
        <p className="text-muted-foreground">
          Check if a news article is real or fake
        </p>
      </div>
      <DetectorForm />
    </div>
  )
} 