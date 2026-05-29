import { cn } from "@/lib/utils"

type ErrorStateProps = {
  message: string
  className?: string
}

export function ErrorState({ message, className }: ErrorStateProps) {
  return <p className={cn("text-sm text-red-500", className)}>{message}</p>
}