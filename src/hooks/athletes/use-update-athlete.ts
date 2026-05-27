"use client"

import axios from "axios"
import { useState } from "react"

import { updateAthlete } from "@/services/athletes-service"
import type { UpdateAthletePayload } from "@/types/athletes"

export function useUpdateAthlete() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(id: string, payload: UpdateAthletePayload) {
    try {
      setLoading(true)
      setError("")

      await updateAthlete(id, payload)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string })?.message ?? error.message
        setError(message || "Gagal mengubah athlete")
      } else {
        setError("Gagal mengubah athlete")
      }

      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    submit,
    loading,
    error,
  }
}