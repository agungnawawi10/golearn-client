"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-provider"
import { useDashboardStats } from "@/hooks/dashboard/use-dashboard-stats"
import { DashboardOverviewChart } from "@/components/dashboard/dashboard-overview-chart"

export default function Dashboard() {
    const { user } = useAuth()
    const { stats, loading: loadingStats, error: statsError } = useDashboardStats()

    const displayName =
        user?.full_name ?? user?.name ?? user?.username ?? user?.email ?? "User"

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

            <DashboardOverviewChart stats={stats} />
        </div>
    )
}