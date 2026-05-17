"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, PlusSquare, ShieldCheck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

const sidebarItems = [
  {
    href: "/dashboard/coach",
    label: "Daftar Coach",
    icon: Users,
  },
  {
    href: "/dashboard/registration",
    label: "Daftar Registration",
    icon: PlusSquare,
  },
  {
    href: "/dashboard/athletes",
    label: "Daftar Athlete",
    icon: ShieldCheck,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isHydrated, logout } = useAuth()

  const displayName =
    user?.full_name ?? user?.name ?? user?.username ?? user?.email ?? "User"

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
      <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-background p-4 shadow-sm">

        <nav className="space-y-1">
          <Button
            asChild
            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </Button>

          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <Link href={item.href}>
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-border/70 pt-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}