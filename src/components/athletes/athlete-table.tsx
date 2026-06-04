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

import { useAthletes } from "@/hooks/athletes/use-athletes"
import { useDeleteAthlete } from "@/hooks/athletes/use-delete-athlete"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { LoadingState } from "@/components/ui/loading-state"
import type { Athlete } from "@/types/athletes"

type AthleteTableRowProps = {
  athlete: Athlete
  onDeleted: (id: string) => void
}

function AthleteTableRow({ athlete, onDeleted }: AthleteTableRowProps) {
  const { submit, loading } = useDeleteAthlete()

  async function handleDelete() {
    const confirmed = window.confirm(`Hapus athlete ${athlete.full_name}?`)

    if (!confirmed) {
      return
    }

    const success = await submit(athlete.id)

    if (success) {
      onDeleted(athlete.id)
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{athlete.full_name}</TableCell>
      <TableCell>{athlete.account.email}</TableCell>
      <TableCell>{athlete.account.username}</TableCell>
      <TableCell>{athlete.gender}</TableCell>
      <TableCell>{athlete.status}</TableCell>
      <TableCell>{athlete.rank.name}</TableCell>
      <TableCell>{new Date(athlete.joined_at).toLocaleDateString("id-ID")}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/athletes/edit/${athlete.id}`}>Edit</Link>
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

export function AthletesTable() {
  const [draftQuery, setDraftQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const { athletes, loading, error, setAthletes } = useAthletes(submittedQuery)

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedQuery(draftQuery)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Athlete</CardTitle>
        <CardAction>
          <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              value={draftQuery}
              onChange={(event) => setDraftQuery(event.target.value)}
              placeholder="Cari athlete..."
              className="w-52 sm:w-64"
              aria-label="Cari athlete"
            />
            <Button type="submit" variant="outline" size="sm">
              <Search className="size-4" />
              Cari
            </Button>
          </form>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <LoadingState variant="table" rows={6} />
        ) : error ? (
          <ErrorState message={error} />
        ) : athletes.length === 0 ? (
          <EmptyState
            message={submittedQuery.trim() ? "Tidak ada athlete yang cocok dengan pencarian." : "Belum ada data athlete."}
          />
        ) : (
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
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {athletes.map((athlete) => (
                <AthleteTableRow
                  key={athlete.id}
                  athlete={athlete}
                  onDeleted={(id) => {
                    setAthletes((current) => current?.filter((item) => item.id !== id) ?? [])
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