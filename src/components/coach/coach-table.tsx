"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteCoach } from "@/hooks/coach/use-delete-coach"
import { useCoaches } from "@/hooks/coach/use-coaches"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { LoadingState } from "@/components/ui/loading-state"
import type { Coach } from "@/types/coach"

type CoachTableRowProps = {
  coach: Coach
  onDeleted: (id: string) => void
}

function CoachTableRow({ coach, onDeleted }: CoachTableRowProps) {
  const { submit, loading } = useDeleteCoach()

  async function handleDelete() {
    const confirmed = window.confirm(`Hapus coach ${coach.full_name}?`)

    if (!confirmed) {
      return
    }

    const success = await submit(coach.id)

    if (success) {
      onDeleted(coach.id)
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{coach.full_name}</TableCell>
      <TableCell>{coach.email}</TableCell>
      <TableCell>{coach.username ?? "-"}</TableCell>
      <TableCell>{coach.phone ?? "-"}</TableCell>
      <TableCell>{coach.roles?.join(", ") ?? "-"}</TableCell>
      <TableCell>{coach.is_active ? "Aktif" : "Nonaktif"}</TableCell>
      <TableCell>{new Date(coach.created_at).toLocaleDateString("id-ID")}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/coach/edit/${coach.id}`}>Edit</Link>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}



export function CoachTable() {
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [draftQuery, setDraftQuery] = useState("")
  const { coaches, loading, error, setCoaches } = useCoaches(submittedQuery)

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedQuery(draftQuery)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Coach</CardTitle>
        <CardAction>
          <div className="flex flex-wrap items-center gap-2">
            <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
              <Input
                type="search"
                value={draftQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                placeholder="Cari coach..."
                className="w-52 sm:w-64"
                aria-label="Cari coach"
              />
              <Button type="submit" variant="outline" size="sm">
                <Search className="size-4" />
                Cari
              </Button>
            </form>

            <Button asChild size="sm" className="w-fit">
              <Link href="/dashboard/coach/create">Tambah Coach</Link>
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <LoadingState variant="table" rows={6} />
        ) : error ? (
          <ErrorState message={error} />
        ) : coaches.length === 0 ? (
          <EmptyState
            message={submittedQuery.trim() ? "Tidak ada coach yang cocok dengan pencarian." : "Belum ada data coach."}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coaches.map((coach) => (
                <CoachTableRow
                  key={coach.id}
                  coach={coach}
                  onDeleted={(id) => {
                    setCoaches((current) => (current ?? []).filter((item) => item.id !== id))
                  }}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}