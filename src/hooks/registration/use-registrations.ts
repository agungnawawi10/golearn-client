"use client"

import useSWR from "swr"
import axios from "axios"
import { getRegistrations } from "@/services/registration-service"
import type { Registration } from "@/types/registration"

export function useRegistrations(search = "") {
  const trimmedSearch = search.trim()
  const { data, error, isLoading, mutate } = useSWR<Registration[]>(
    ["/registrations", trimmedSearch],
    async () => {
      return await getRegistrations({ search: trimmedSearch })
    },
    { revalidateOnFocus: false }
  )

  let errorMessage = ""
  if (error) {
    if (axios.isAxiosError(error)) {
      errorMessage = (error.response?.data as { message?: string } | undefined)?.message ?? error.message
    } else {
      errorMessage = "Gagal mengambil data registration"
    }
  }

  return {
    registrations: data || [],
    setRegistrations: mutate,
    loading: isLoading,
    error: errorMessage,
  }
}