"use client"

import axios from "axios"
import { useState } from "react"

import { deleteAthlete } from "@/services/athletes-service"

export function useDeleteAthlete() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(id: string) {
    try {
      setLoading(true)
      setError("")

      await deleteAthlete(id)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string })?.message ?? error.message
        setError(message || "Gagal menghapus athlete")
      } else {
        setError("Gagal menghapus athlete")
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