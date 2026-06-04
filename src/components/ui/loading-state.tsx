import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type LoadingStateProps = {
  message?: string
  className?: string
  variant?: "text" | "table" | "card"
  rows?: number
}

export function LoadingState({
  message,
  className,
  variant = "text",
  rows = 5,
}: LoadingStateProps) {
  if (variant === "table") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-[28%]" />
            <Skeleton className="h-4 w-[22%]" />
            <Skeleton className="h-4 w-[18%]" />
            <Skeleton className="h-4 w-[14%]" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={cn("space-y-2", className)}>
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-24" />
      </div>
    )
  }

  // fallback text
  return <p className={cn("text-sm text-muted-foreground", className)}>{message ?? "Memuat..."}</p>
}