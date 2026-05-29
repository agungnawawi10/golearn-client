"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  LogOut,
  PlusSquare,
  ShieldCheck,
  Users,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

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
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <aside
      className={`transition-all ${collapsed ? "w-20" : "w-64"} lg:sticky lg:top-24 lg:h-[calc(100vh-7.25rem)]`}
    >
      <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-sidebar/85 p-3 shadow-[0_18px_40px_-26px_color-mix(in_oklab,var(--foreground)_45%,transparent)]">
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((s) => !s)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
          {/* <div className="flex-1">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Navigation</p>
            {!collapsed && <p className="font-heading text-sm font-semibold text-foreground">Main Menu</p>}
          </div> */}
        </div>

        <nav className="flex flex-col gap-1.5">
          <Button
            asChild
            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
            className="group w-full justify-start rounded-md px-2 py-2 text-sm font-medium transition-colors"
          >
            <Link href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined}>
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                {!collapsed && <span className="text-foreground">Dashboard</span>}
              </div>
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
                className="group w-full justify-start rounded-md px-2 py-2 text-sm font-medium transition-colors"
              >
                <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    {!collapsed && <span className="text-foreground">{item.label}</span>}
                  </div>
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-border/70 pt-4">
          <p className={`mb-2 text-xs text-muted-foreground ${collapsed ? "sr-only" : ""}`}>Session</p>
          <Button
            variant="outline"
            className={`w-full justify-start gap-2 ${collapsed ? "justify-center" : ""}`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}