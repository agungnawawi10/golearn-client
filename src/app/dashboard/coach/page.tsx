"use client"

import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Coach, CoachesResponse } from "@/types/auth"

export default function CoachPage() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function fetchCoaches() {
      try {
        setLoading(true)
        setError("")
        const res = await api.get<CoachesResponse>("/coaches")
        if (!isMounted) return
        setCoaches(res.data.data ?? [])
      } catch (err) {
        if (!isMounted) return

        if (axios.isAxiosError(err)) {
          const backendMessage =
            (err.response?.data as { message?: string } | undefined)?.message ?? err.message
          setError(backendMessage || "Gagal mengambil data coach")
        } else {
          setError("Gagal mengambil data coach")
        }
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }

    fetchCoaches()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Coach</CardTitle>
        {/* <CardDescription>Data coach dari backend Laravel.</CardDescription> */}
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && <p className="text-sm text-muted-foreground">Memuat data...</p>}
        {!loading && error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && coaches.length === 0 && (
          <p className="text-sm text-muted-foreground">Belum ada data coach.</p>
        )}

        {!loading && !error && coaches.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coaches.map((coach) => (
                <TableRow key={coach.id}>
                  <TableCell className="font-medium">{coach.full_name}</TableCell>
                  <TableCell>{coach.email}</TableCell>
                  <TableCell>{coach.username ?? "-"}</TableCell>
                  <TableCell>{coach.roles.join(", ")}</TableCell>
                  <TableCell>{coach.is_active ? "Aktif" : "Nonaktif"}</TableCell>
                  <TableCell>{coach.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Button asChild variant="outline">
          <Link href="/dashboard">Kembali ke dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  )
}