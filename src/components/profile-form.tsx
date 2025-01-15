"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { profileService } from "@/lib/services/profile"
import { authService } from "@/lib/services/auth"

type Profile = {
  email: string;
}

export function ProfileForm() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      // Cek token terlebih dahulu
      const token = authService.getStoredToken()
      if (!token) {
        router.push('/login')
        return
      }

      try {
        setLoading(true)
        const data = await profileService.getProfile()
        setProfile(data)
      } catch (err: any) {
        setError(err.message)
        // Redirect ke login jika token invalid/expired
        if (err.message.includes('Token')) {
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Card>
      <CardContent className="space-y-2 pt-4">
        <p><strong>Email:</strong> {profile?.email}</p>
      </CardContent>
    </Card>
  )
} 