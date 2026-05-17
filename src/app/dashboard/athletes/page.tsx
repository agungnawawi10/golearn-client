"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"

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
import type { Athlete, AthletesResponse } from "@/types/athletes"

export default function AthletesPage() {
const [athletes, setAthletes] = useState<Athlete[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")

useEffect(() => {
let isMounted = true
async function fetchAthletes() {
  try {
    setLoading(true)
    setError("")

    const response = await api.get<AthletesResponse>("/athletes")

    if (!isMounted) return
    setAthletes(response.data.data ?? [])
  } catch (err) {
    if (!isMounted) return

    if (axios.isAxiosError(err)) {
      const backendMessage =
        (err.response?.data as { message?: string } | undefined)?.message ??
        err.message
      setError(backendMessage || "Gagal mengambil data athlete")
    } else {
      setError("Gagal mengambil data athlete")
    }
  } finally {
    if (!isMounted) return
    setLoading(false)
  }
}

fetchAthletes()

return () => {
  isMounted = false
}
}, [])

return (
<Card>
<CardHeader>
<CardTitle>Daftar Athlete</CardTitle>
{/* <CardDescription>Data athlete.</CardDescription> */}
</CardHeader>

  <CardContent className="space-y-4">
    {loading && <p className="text-sm text-muted-foreground">Memuat data...</p>}

    {!loading && error && (
      <p className="text-sm text-red-500">{error}</p>
    )}

    {!loading && !error && athletes.length === 0 && (
      <p className="text-sm text-muted-foreground">Belum ada data athlete.</p>
    )}

    {!loading && !error && athletes.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow key={athlete.id}>
              <TableCell className="font-medium">{athlete.full_name}</TableCell>
              <TableCell>{athlete.account.email}</TableCell>
              <TableCell>{athlete.account.username}</TableCell>
              <TableCell>{athlete.gender}</TableCell>
              <TableCell>{athlete.status}</TableCell>
              <TableCell>{athlete.rank.name}</TableCell>
              <TableCell>{athlete.joined_at}</TableCell>
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