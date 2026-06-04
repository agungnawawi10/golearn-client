import { api } from "@/lib/api"
import type { Stats } from "@/types/stats"

export async function getDashboardStats(options?: { signal?: AbortSignal }) {
  const response = await api.get<Stats>("/stats/dashboard", {
    signal: options?.signal,
  })

  return response.data
}
