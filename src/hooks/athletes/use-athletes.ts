"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { getAthletes } from "@/services/athletes-service"
import type { Athlete } from "@/types/athletes"

export function useAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    async function fetchAthletes() {
      try {
        setLoading(true)
        setError("")

        const data = await getAthletes({ signal: controller.signal })

        if (isMounted) {
          setAthletes(data)
        }
      } catch (err) {
        if (!isMounted || axios.isCancel(err)) {
          return
        }

        if (axios.isAxiosError(err)) {
          const backendMessage =
            (err.response?.data as { message?: string } | undefined)?.message ??
            err.message
          setError(backendMessage || "Gagal mengambil data athlete")
        } else {
          setError("Gagal mengambil data athlete")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchAthletes()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return {
    athletes,
    setAthletes,
    loading,
    error,
  }
}