"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useDeleteCoach } from "@/hooks/use-delete-coach"

import type { Coach } from "@/types/coach"

interface CoachRowProps {
  coach: Coach
  onDeleted: (id: string) => void
}

export function CoachRow({ coach, onDeleted }: CoachRowProps) {
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
      <TableCell className="font-medium">
        {coach.full_name}
      </TableCell>

      <TableCell>{coach.email}</TableCell>

      <TableCell>
        {coach.username ?? "-"}
      </TableCell>

      <TableCell>
        {coach.roles?.join(", ") ?? "-"}
      </TableCell>

      <TableCell>
        {coach.is_active ? "Aktif" : "Nonaktif"}
      </TableCell>

      <TableCell>
        {new Date(coach.created_at).toLocaleDateString("id-ID")}
      </TableCell>

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