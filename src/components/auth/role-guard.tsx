"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Definisi aturan hak akses rute dashboard
export const ROUTE_PERMISSIONS = [
  { path: "/dashboard/coach", roles: ["admin"], exact: false },
  { path: "/dashboard/registration", roles: ["admin", "coach"], exact: false },
  { path: "/dashboard/athletes", roles: ["admin", "coach"], exact: false },
]

/**
 * Memeriksa apakah role tertentu diizinkan mengakses path tertentu
 */
export function checkHasAccess(pathname: string, userRole?: string): boolean {
  const rule = ROUTE_PERMISSIONS.find((item) => {
    if (item.exact) {
      return pathname === item.path
    }
    return pathname === item.path || pathname.startsWith(item.path + "/")
  })

  // Jika tidak ada aturan khusus, halaman bisa diakses oleh semua pengguna terautentikasi
  if (!rule) {
    return true
  }

  if (!userRole) {
    return false
  }

  const normalizedUserRole = userRole.toLowerCase()
  return rule.roles.map((r) => r.toLowerCase()).includes(normalizedUserRole)
}

type RoleGuardProps = {
  children: React.ReactNode
}

export function RoleGuard({ children }: RoleGuardProps) {
  const pathname = usePathname()
  const { user, isHydrated, isAuthenticated } = useAuth()

  // Tunggu hidrasi selesai agar tidak terjadi layout jump atau salah deteksi auth
  if (!isHydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // Jika belum login, biarkan middleware atau auth handling lain mengatasinya
  if (!isAuthenticated) {
    return <>{children}</>
  }

  const userRole = user?.role ?? "Member"
  const hasAccess = checkHasAccess(pathname, userRole)

  if (!hasAccess) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4">
        <Card className="relative overflow-hidden w-full max-w-md border border-destructive/20 bg-background/60 backdrop-blur-xl shadow-xl">
          {/* Efek aksen gradasi merah/oranye halus di bagian atas */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-destructive/60 via-amber-500/60 to-destructive/60" />
          
          <CardContent className="flex flex-col items-center text-center p-8 pt-10">
            <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <ShieldAlert className="h-8 w-8" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                <Lock className="h-2.5 w-2.5" />
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Akses Dibatasi
            </h2>
            
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini memerlukan hak akses khusus.
            </p>

            <div className="w-full rounded-lg bg-muted/50 border border-border/50 p-3 mb-8 flex flex-col gap-1 items-center">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Role Anda Saat Ini
              </span>
              <span className="text-sm font-semibold text-foreground px-2.5 py-0.5 rounded-full bg-background border border-border shadow-sm">
                {userRole}
              </span>
            </div>

            <div className="flex w-full flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="w-full sm:w-auto gap-2">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
