"use client"

import { createTrainingLogs } from "@/services/training-logs_service"
import { CreateTrainingLogPayload } from "@/types/training-logs"
import { useState } from "react"

import { mutate } from "swr"

export function useCreateTrainingLog() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(payload: CreateTrainingLogPayload) {
    try {
      setLoading(true)
      setError("")

      const success = await createTrainingLogs(payload)
      if (success) {
        await mutate("/coach/training-logs") 
        return true
      }
      return false
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Gagal membuat log latihan")
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