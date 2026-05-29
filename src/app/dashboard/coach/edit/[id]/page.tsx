"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"

import { CoachForm } from "@/components/coach/coach-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCoachById } from "@/services/coach-service"
import type { Coach } from "@/types/coach"

export default function EditCoachPage() {
  const params = useParams<{ id: string | string[] }>()
  const coachId = Array.isArray(params.id) ? params.id[0] : params.id

  const [coach, setCoach] = useState<Coach | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function fetchCoach() {
      try {
        if (!coachId) {
          throw new Error("ID coach tidak ditemukan")
        }

        setLoading(true)
        setError("")

        const data = await getCoachById(coachId)

        if (!isMounted) {
          return
        }

        setCoach(data)
      } catch (err) {
        if (!isMounted) {
          return
        }

        if (axios.isAxiosError(err)) {
          const backendMessage =
            (err.response?.data as { message?: string } | undefined)?.message ?? err.message
          setError(backendMessage || "Gagal mengambil data coach")
        } else if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Gagal mengambil data coach")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCoach()

    return () => {
      isMounted = false
    }
  }, [coachId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Coach</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && <p className="text-sm text-muted-foreground">Memuat data coach...</p>}

        {!loading && error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && coach && <CoachForm coach={coach} mode="edit" />}

        <Button asChild variant="outline">
          <Link href="/dashboard/coach">Kembali ke daftar coach</Link>
        </Button>
      </CardContent>
    </Card>
  )
}