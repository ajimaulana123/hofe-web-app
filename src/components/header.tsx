"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authService } from "@/lib/services/auth"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/login')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold">News Detector</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">News</Button>
            </Link>
            <Link href="/dashboard/detector">
              <Button variant="ghost">Detector</Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-2 pb-4">
              <Link href="/dashboard" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  News
                </Button>
              </Link>
              <Link href="/dashboard/detector" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Detector
                </Button>
              </Link>
              <Link href="/dashboard/profile" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 