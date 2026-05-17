"use client"

import type { ReactNode } from "react"

import { DashboardNavbar } from "@/components/layouts/navbar"
import { DashboardSidebar } from "@/components/layouts/sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <DashboardNavbar />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <DashboardSidebar />

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  )
}