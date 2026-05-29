import { cn } from "@/lib/utils"

type LoadingStateProps = {
  message: string
  className?: string
}

export function LoadingState({ message, className }: LoadingStateProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{message}</p>
}