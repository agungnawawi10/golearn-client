"use client"

import * as React from "react"
import { Legend, ResponsiveContainer, Tooltip } from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    color?: string
  }
>

type ChartContextValue = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within ChartContainer")
  }

  return context
}

type ChartContainerProps = {
  config: ChartConfig
  className?: string
  children: React.ReactElement
}

type ChartTooltipEntry = {
  dataKey?: string | number
  color?: string
  value?: unknown
}

type ChartTooltipContentProps = {
  active?: boolean
  payload?: ChartTooltipEntry[]
  label?: string | number
  indicator?: "dot" | "line"
  labelFormatter?: (label: string | number) => React.ReactNode
}

type ChartLegendEntry = {
  dataKey?: string | number
  color?: string
}

export function ChartContainer({ config, className, children }: ChartContainerProps) {
  const style = Object.fromEntries(
    Object.entries(config)
      .filter(([, value]) => value.color)
      .map(([key, value]) => [`--color-${key}`, value.color]),
  ) as React.CSSProperties

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full", className)} style={style}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartTooltipContent({ active, payload, label, indicator = "dot", labelFormatter }: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-border/70 bg-popover px-3 py-2 text-sm shadow-lg">
      {label !== undefined ? (
        <div className="mb-2 text-xs font-semibold text-muted-foreground">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      ) : null}

      <div className="grid gap-1.5">
        {payload.map((entry: ChartTooltipEntry) => {
          const dataKey = String(entry.dataKey ?? "")
          const itemConfig = config[dataKey]

          return (
            <div key={dataKey} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block rounded-full",
                  indicator === "dot" ? "size-2" : "h-0.5 w-4",
                )}
                style={{ backgroundColor: itemConfig?.color ?? String(entry.color ?? "currentColor") }}
              />
              <span className="text-muted-foreground">{itemConfig?.label ?? dataKey}</span>
              <span className="ml-auto font-medium tabular-nums">
                {typeof entry.value === "number" ? entry.value.toLocaleString("id-ID") : String(entry.value ?? "-")}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartLegendContent({ payload }: { payload?: ChartLegendEntry[] }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
      {payload.map((entry: ChartLegendEntry) => {
        const dataKey = String(entry.dataKey ?? "")
        const itemConfig = config[dataKey]

        return (
          <div key={dataKey} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: itemConfig?.color ?? String(entry.color ?? "currentColor") }} />
            <span>{itemConfig?.label ?? dataKey}</span>
          </div>
        )
      })}
    </div>
  )
}

const ChartTooltip = Tooltip
const ChartLegend = Legend

export {
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
}