"use client"

import axios from "axios"
import { useState } from "react"

import { approveRegistration } from "@/services/registration-service"

export function useApproveRegistration() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(id: number) {
    try {
      setLoading(true)
      setError("")

      await approveRegistration(id)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ??
          error.message
        setError(message || "Gagal approve registration")
      } else {
        setError("Gagal approve registration")
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