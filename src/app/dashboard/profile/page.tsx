"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-provider"

function InitialsAvatar({ name }: { name?: string | null }) {
  const initials = (name || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xl font-semibold">
      {initials.toUpperCase()}
    </div>
  )
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <InitialsAvatar name={user?.full_name ?? user?.username ?? "U"} />
            <div>
              <h2 className="text-2xl font-semibold">{user?.full_name ?? user?.username ?? "User"}</h2>
              <p className="text-sm text-muted-foreground">{user?.role ?? "Member"}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-muted-foreground">Username</dt>
              <dd>{user?.username ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd>{user?.email ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Status</dt>
              <dd>{user?.is_active ? "Aktif" : "Tidak aktif"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Joined</dt>
              <dd>{user?.joined_at ?? "-"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-muted-foreground">Tentang</dt>
              <dd className="text-sm text-muted-foreground">{user?.bio ?? "-"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aksi</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {/* <Button asChild>
            <Link href="/dashboard/profile/edit">Edit profile</Link>
          </Button> */}
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}