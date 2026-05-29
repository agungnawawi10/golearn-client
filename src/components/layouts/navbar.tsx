"use client"

import Link from "next/link"
import { LayoutDashboard, UserCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

export function DashboardNavbar() {
  const { user, isHydrated } = useAuth()

  const displayName =
    user?.full_name ?? user?.name ?? user?.username ?? user?.email ?? "User"
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-17 w-full max-w-400 items-center justify-between gap-4 px-4 sm:px-5 lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <LayoutDashboard className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-heading text-base font-semibold">DOJO Dashboard</p>
            <p className="text-xs text-muted-foreground">Management Console</p>
          </div>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="hidden rounded-xl border border-border/70 bg-card/70 px-3 py-1.5 text-right sm:flex sm:flex-col">
            {/* <span className="text-xs text-muted-foreground">Signed in as</span> */}
            <span className="text-sm font-semibold">
              {isHydrated ? displayName : "Memuat..."}
            </span>
          </div>

          <Button asChild variant="outline" size="icon" aria-label="Buka profile">
            <Link href="/dashboard/profile">
              <UserCircle2 className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}