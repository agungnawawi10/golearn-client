"use client"

import axios from "axios"
import { useState } from "react"
import { mutate } from "swr"

import { updateCoach } from "@/services/coach-service"
import type { UpdateCoachPayload } from "@/types/coach"

export function useUpdateCoach() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(id: string, payload: UpdateCoachPayload) {
    try {
      setLoading(true)
      setError("")

      await updateCoach(id, payload)
      await mutate("/coaches")
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string })?.message ?? error.message
        setError(message || "Gagal mengubah coach")
      } else {
        setError("Gagal mengubah coach")
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