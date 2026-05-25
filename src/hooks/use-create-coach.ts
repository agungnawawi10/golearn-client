"use client"

import { createCoach } from "@/services/coach-service"
import { CreateCoachPayload } from "@/types/coach"
import { useState } from "react"

export function useCreateCoach() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(payload: CreateCoachPayload) {
    try {
      setLoading(true)
      setError("")

      await createCoach(payload)
      return true
    } catch (error) {
      setError("Gagal menambahkan coach")
      return false
    } finally {
      setLoading(false)
    }
  }
  return {
    submit,
    loading,
    error
  }

}