"use client"

import type { ReactNode } from "react"

import { DashboardNavbar } from "@/components/layouts/navbar"
import { DashboardSidebar } from "@/components/layouts/sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <DashboardNavbar />

      <div className="mx-auto grid w-full max-w-400 gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[272px_1fr] lg:gap-5 lg:px-6 lg:py-6">
        <DashboardSidebar />

        <section className="min-w-0 space-y-4">{children}</section>
      </div>
    </div>
  )
}