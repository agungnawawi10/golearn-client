"use client"

import Link from "next/link"

import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useDeleteAthlete } from "@/hooks/athletes/use-delete-athlete"

import type { Athlete } from "@/types/athletes"

interface AthleteRowProps {
  athlete: Athlete
  onDeleted: (id: string) => void
}

export function AthleteRow({ athlete, onDeleted }: AthleteRowProps) {
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
      <TableCell>
        {new Date(athlete.joined_at).toLocaleDateString("id-ID")}
      </TableCell>
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