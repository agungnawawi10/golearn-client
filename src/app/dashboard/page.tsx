"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-provider"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import type { Stats } from "@/types/stats"

export default function Dashboard() {
    const { user, isHydrated } = useAuth()

    const displayName =
        user?.full_name ?? user?.name ?? user?.username ?? user?.email ?? "User"
    const [stats, setStats] = useState<Stats | null>(null)
    const [loadingStats, setLoadingStats] = useState(false)
    const [statsError, setStatsError] = useState("")

    useEffect(() => {
        let mounted = true

        async function fetchStats() {
            try {
                setLoadingStats(true)
                setStatsError("")
                const res = await api.get<Stats>("/stats/dashboard")
                if (!mounted) return
                setStats(res.data)
            } catch (err) {
                if (!mounted) return
                setStatsError("Gagal memuat statistik")
            } finally {
                if (!mounted) return
                setLoadingStats(false)
            }
        }

        fetchStats()

        return () => {
            mounted = false
        }
    }, [])

    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Atlet</CardTitle>
                        <CardDescription>Jumlah athlete terdaftar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {loadingStats ? "—" : stats?.athletes ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Registrations</CardTitle>
                        <CardDescription>Permintaan pendaftaran</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {loadingStats ? "—" : stats?.registrations ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Coaches</CardTitle>
                        <CardDescription>Jumlah coach</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {loadingStats ? "—" : stats?.coaches ?? 0}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}