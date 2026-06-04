"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"
import {
  LayoutDashboard,
  LogOut,
  PlusSquare,
  ShieldCheck,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/components/auth/auth-provider"

const sidebarItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/coach",
    label: "Daftar Coach",
    icon: Users,
    exact: false,
  },
  {
    href: "/dashboard/registration",
    label: "Daftar Registration",
    icon: PlusSquare,
    exact: false,
  },
  {
    href: "/dashboard/athletes",
    label: "Daftar Athlete",
    icon: ShieldCheck,
    exact: false,
  },
]

type DashboardSidebarProps = {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

export function DashboardSidebar({
  collapsed,
  setCollapsed,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={`transition-[width] duration-300 ease-in-out ${
          collapsed ? "w-[3.5rem]" : "w-60"
        } lg:sticky lg:top-24 lg:h-[calc(100vh-7.25rem)]`}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-background/85 backdrop-blur-xl shadow-sm">

          {/* ── Header: hanya toggle button ── */}
          <div
            className={`flex h-11 shrink-0 items-center border-b border-border/60 ${
              collapsed ? "justify-center px-2" : "justify-between px-3"
            }`}
          >
            {!collapsed && (
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 select-none">
                Menu
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="h-7 w-7 shrink-0 rounded-md text-muted-foreground hover:text-foreground"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* ── Navigation ── */}
          <nav className="flex flex-1 flex-col gap-0.5 p-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href, item.exact)

              const btn = (
                <Button
                  key={item.href}
                  asChild
                  variant={active ? "secondary" : "ghost"}
                  className={`group w-full justify-start rounded-lg h-9 px-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <Link href={item.href}>
                    <Icon
                      className={`h-[1.1rem] w-[1.1rem] shrink-0 transition-colors ${
                        active
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    <span
                      className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                        collapsed ? "w-0 ml-0 opacity-0" : "w-full ml-2.5 opacity-100"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </Button>
              )

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{btn}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return btn
            })}
          </nav>

          {/* ── Footer / Logout ── */}
          <div className="shrink-0 border-t border-border/60 p-2">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full h-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <LogOut className="h-[1.1rem] w-[1.1rem]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  Logout
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2.5 h-9 rounded-lg px-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-[1.1rem] w-[1.1rem] shrink-0" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}