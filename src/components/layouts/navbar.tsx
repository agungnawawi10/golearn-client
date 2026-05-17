"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, UserCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

export function DashboardNavbar() {
  const router = useRouter()
  const { user, logout, isHydrated } = useAuth()

  const displayName =
    user?.full_name ?? user?.name ?? user?.username ?? user?.email ?? "User"
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="size-5" />
          <span>DOJO Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden flex-col text-right sm:flex">
            <span className="text-sm font-medium">
              {isHydrated ? displayName : "Memuat..."}
            </span>
          </div>

          <Button asChild variant="ghost" size="icon" aria-label="Buka profile">
            <Link href="/dashboard/profile">
              <UserCircle2 className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}