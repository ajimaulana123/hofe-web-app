"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { profileService } from "@/lib/services/profile"
import { Mail, User } from "lucide-react"

interface Profile {
  username: string
  email: string
}

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile()
        setProfile(response.data)
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to load profile",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [toast])

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {profile.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{profile.username}</CardTitle>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Username</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{profile.username}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Email</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{profile.email}</p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
} 