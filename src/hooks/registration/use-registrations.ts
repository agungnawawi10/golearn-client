"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { getRegistrations } from "@/services/registration-service"
import type { Registration } from "@/types/registration"

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    async function fetchRegistrations() {
      try {
        setLoading(true)
        setError("")

        const data = await getRegistrations({ signal: controller.signal })

        if (isMounted) {
          setRegistrations(data)
        }
      } catch (err) {
        if (!isMounted || axios.isCancel(err)) {
          return
        }

        if (axios.isAxiosError(err)) {
          const backendMessage =
            (err.response?.data as { message?: string } | undefined)?.message ??
            err.message
          setError(backendMessage || "Gagal mengambil data registration")
        } else {
          setError("Gagal mengambil data registration")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRegistrations()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return {
    registrations,
    setRegistrations,
    loading,
    error,
  }
}