"use client"

import axios from "axios"
import useSWR from "swr"

import { getDashboardStats } from "@/services/stats-service"
import type { Stats } from "@/types/stats"

export function useDashboardStats() {
  const { data, error, isLoading, mutate } = useSWR<Stats>(
    "/stats/dashboard",
    async () => {
      return await getDashboardStats()
    },
    { revalidateOnFocus: false }
  )

  let errorMessage = ""

  if (error) {
    if (axios.isAxiosError(error)) {
      errorMessage = (error.response?.data as { message?: string } | undefined)?.message ?? error.message
    } else {
      errorMessage = "Gagal memuat statistik"
    }
  }

  return {
    stats: data ?? null,
    loading: isLoading,
    error: errorMessage,
    mutate,
  }
}
