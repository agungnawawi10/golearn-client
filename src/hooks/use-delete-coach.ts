"use client"

import axios from "axios"
import { useState } from "react"

import { deleteCoach } from "@/services/coach-service"

export function useDeleteCoach() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(id: string) {
    try {
      setLoading(true)
      setError("")

      await deleteCoach(id)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string })?.message ?? error.message
        setError(message || "Gagal menghapus coach")
      } else {
        setError("Gagal menghapus coach")
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