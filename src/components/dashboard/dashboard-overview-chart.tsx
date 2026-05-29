"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { Stats } from "@/types/stats"

type DashboardOverviewChartProps = {
  stats: Stats | null
}

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function DashboardOverviewChart({ stats }: DashboardOverviewChartProps) {
  const chartData = React.useMemo(
    () => [
      {
        metric: "Athletes",
        total: stats?.athletes ?? 0,
        athletes: stats?.athletes ?? 0,
        registrations: 0,
        coaches: 0,
      },
      {
        metric: "Registrations",
        total: stats?.registrations ?? 0,
        athletes: 0,
        registrations: stats?.registrations ?? 0,
        coaches: 0,
      },
      {
        metric: "Coaches",
        total: stats?.coaches ?? 0,
        athletes: 0,
        registrations: 0,
        coaches: stats?.coaches ?? 0,
      },
    ],
    [stats],
  )

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Ringkasan Dashboard</CardTitle>
          <CardDescription>Data chart diambil langsung dari statistik dashboard.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="metric"
              tickLine={false}
              axisLine={false}
              width={110}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => `Metric: ${value}`}
                />
              }
            />

            <Bar dataKey="total" radius={10} fill="var(--color-total)" />

            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}