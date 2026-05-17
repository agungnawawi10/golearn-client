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
import type { Registration } from "@/types/registration"

export default function RegistrationPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function fetchRegistrations() {
      try {
        setLoading(true)
        setError("")

        const response = await api.get<Registration[]>('/registrations')

        if (!isMounted) return
        setRegistrations(response.data ?? [])
      } catch (err) {
        if (!isMounted) return

        if (axios.isAxiosError(err)) {
          const backendMessage =
            (err.response?.data as { message?: string } | undefined)?.message ??
            err.message
          setError(backendMessage || "Gagal mengambil data registration")
        } else {
          setError("Gagal mengambil data registration")
        }
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }

    fetchRegistrations()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Registration</CardTitle>
        {/* <CardDescription>Data registration dari backend Laravel.</CardDescription> */}
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && <p className="text-sm text-muted-foreground">Memuat data...</p>}

        {!loading && error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && registrations.length === 0 && (
          <p className="text-sm text-muted-foreground">Belum ada data registration.</p>
        )}

        {!loading && !error && registrations.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">{registration.full_name}</TableCell>
                  <TableCell>{registration.email}</TableCell>
                  <TableCell>{registration.phone}</TableCell>
                  <TableCell>{registration.form_data.gender}</TableCell>
                  <TableCell>{registration.form_data.address}</TableCell>
                  <TableCell>{registration.form_data.birth_date}</TableCell>
                  <TableCell>{registration.status}</TableCell>
                  <TableCell>{registration.created_at}</TableCell>
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