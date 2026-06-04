"use client"


import { registerAthlete } from "@/services/registration-service"
import { RegisterAthletePayload, ValidationErrorFields } from "@/types/registration"
import { useState } from "react"

export function useRegisterAthlete() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<Partial<ValidationErrorFields>>({})

  async function submit(payload: RegisterAthletePayload) {
    try {
      setLoading(true)
      setError("")
      setValidationErrors({})

      await registerAthlete(payload)
      // Jika di masa depan kamu butuh revalidate daftar pendaftaran atlet, tinggal tambah mutate di sini
      return true
    } catch (err: any) {
      // Tangkap error validasi 422 Axios jika ada
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors)
        setError(err.response.data.message || "Validasi gagal.")
      } else {
        setError(err.response?.data?.message || err.message || "Gagal mendaftarkan atlet")
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
    validationErrors,
  }
}