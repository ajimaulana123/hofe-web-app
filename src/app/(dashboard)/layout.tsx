import { Header } from "@/components/header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "News Detector Dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
} 