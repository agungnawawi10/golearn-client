"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import { DashboardNavbar } from "@/components/layouts/navbar"
import { DashboardSidebar } from "@/components/layouts/sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-transparent">
      <DashboardNavbar />

      <div className="mx-auto flex w-full max-w-400 gap-4 px-4 py-4 sm:px-5 lg:gap-5 lg:px-6 lg:py-6">
        <DashboardSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <section className="min-w-0 flex-1 space-y-4">
          {children}
        </section>
      </div>
    </div>
  )
}