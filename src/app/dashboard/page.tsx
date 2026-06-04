"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardStats } from "@/hooks/dashboard/use-dashboard-stats"
import { DashboardOverviewChart } from "@/components/dashboard/dashboard-overview-chart"

const statCards = [
    {
        key: "athletes" as const,
        title: "Atlet",
        description: "Jumlah athlete terdaftar",
    },
    {
        key: "registrations" as const,
        title: "Registrations",
        description: "Permintaan pendaftaran",
    },
    {
        key: "coaches" as const,
        title: "Coaches",
        description: "Jumlah coach",
    },
]

export default function Dashboard() {
    const { stats, loading: loadingStats } = useDashboardStats()

    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {statCards.map((card) => (
                    <Card key={card.key}>
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loadingStats ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <div className="text-2xl font-semibold">
                                    {stats?.[card.key] ?? 0}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <DashboardOverviewChart stats={stats} loading={loadingStats} />
        </div>
    )
}