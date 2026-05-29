"use client"

import useSWR from "swr"
import axios from "axios"
import { getCoaches } from "@/services/coach-service"
import type { Coach } from "@/types/coach"

export function useCoaches(search = "") {
  const trimmedSearch = search.trim()
  const { data, error, isLoading, mutate } = useSWR<Coach[]>(
    ["/coaches", trimmedSearch],
    async () => {
      return await getCoaches({ search: trimmedSearch })
    },
    { revalidateOnFocus: false }
  )

  let errorMessage = ""
  if (error) {
    if (axios.isAxiosError(error)) {
      errorMessage = (error.response?.data as { message?: string } | undefined)?.message ?? error.message
    } else {
      errorMessage = "Gagal mengambil data coach"
    }
  }

  return {
    coaches: data || [],
    setCoaches: mutate,
    loading: isLoading,
    error: errorMessage,
  }
}