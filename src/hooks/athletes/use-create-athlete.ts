"use client"

import axios from "axios"
import { useState } from "react"
import { mutate } from "swr"

import { createAthlete } from "@/services/athletes-service"
import type { UpdateAthletePayload } from "@/types/athletes"

export function useCreateAthlete() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(payload: UpdateAthletePayload) {
    try {
      setLoading(true)
      setError("")

      await createAthlete(payload)
      // revalidate athletes list
      await mutate("/athletes")
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message ?? error.message
        setError(message || "Gagal menambahkan athlete")
      } else {
        setError("Gagal menambahkan athlete")
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