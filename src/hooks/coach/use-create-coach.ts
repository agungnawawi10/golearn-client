"use client"

import { createCoach } from "@/services/coach-service"
import { CreateCoachPayload } from "@/types/coach"
import { useState } from "react"
import { mutate } from "swr"

export function useCreateCoach() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(payload: CreateCoachPayload) {
    try {
      setLoading(true)
      setError("")

      await createCoach(payload)
      await mutate("/coaches")
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambahkan coach")
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