"use client"

import { getCoaches } from "@/services/coach-service"
import type { Coach } from "@/types/coach"
import axios from "axios"
import { useEffect, useState } from "react"

export function useCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    async function fetchCoaches() {
      try {
        setLoading(true)
        setError("")
        const data = await getCoaches({ signal: controller.signal })
        if (isMounted) {
          setCoaches(data)
        }
      } catch (error) {
        if (!isMounted || axios.isCancel(error)) {
          return
        }

        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ?? error.message
          setError(message || "Gagal mengambil data coach")
        } else {
          setError("Gagal mengambil data Coach")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCoaches()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  return {
    coaches,
    setCoaches,
    loading,
    error,
  }
}