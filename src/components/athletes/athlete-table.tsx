"use client"

import Link from "next/link"
import { Search, Eye, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    <TableRow className="transition-colors hover:bg-muted/5">
      <TableCell className="font-bold text-slate-900 dark:text-slate-50">{athlete.full_name}</TableCell>
      <TableCell>{athlete.account.email}</TableCell>
      <TableCell className="font-mono text-xs">{athlete.account.username}</TableCell>
      <TableCell className="capitalize">{athlete.gender}</TableCell>
      <TableCell>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
          athlete.status === 'active'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
            : 'bg-slate-50 text-slate-600 border-slate-200'
        }`}>
          {athlete.status}
        </span>
      </TableCell>
      <TableCell>
        <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-[11px]">
          {athlete.rank.name}
        </span>
      </TableCell>
      <TableCell>{new Date(athlete.joined_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
      <TableCell>
        {/* Tombol Aksi yang Sudah Ditambahkan Tombol Detail (Eye Icon) */}
        <div className="flex items-center gap-1.5">
          {/* 1. TOMBOL DETAIL */}
          <Button asChild variant="outline" size="sm" className="h-8 px-2.5 text-xs gap-1">
            <Link href={`/dashboard/athletes/${athlete.id}`}>
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              Detail
            </Link>
          </Button>

          {/* 2. TOMBOL EDIT */}
          <Button asChild variant="outline" size="sm" className="h-8 px-2.5 text-xs gap-1">
            <Link href={`/dashboard/athletes/edit/${athlete.id}`}>
              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
              Edit
            </Link>
          </Button>

          {/* 3. TOMBOL HAPUS */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="h-8 px-2.5 text-xs gap-1"
            disabled={loading}
            onClick={handleDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {loading ? "..." : "Hapus"}
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
    // Menggunakan wrapper max-w-6xl agar konsisten lebarnya dengan halaman log latihan
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b bg-muted/5">
          <div>
            <CardTitle className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Database Atlet Dojo
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Total terdaftar: {athletes.length} atlet aktif dan non-aktif.
            </CardDescription>
          </div>

          {/* Form Pencarian */}
          <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Input
                type="search"
                value={draftQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                placeholder="Cari nama atau username..."
                className="w-full sm:w-64 h-9 text-xs pl-8 focus-visible:ring-primary/20"
                aria-label="Cari athlete"
              />
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground/70" />
            </div>
            <Button type="submit" size="sm" className="h-9 px-4 text-xs font-semibold">
              Cari
            </Button>
          </form>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6">
              <LoadingState variant="table" rows={6} />
            </div>
          ) : error ? (
            <div className="p-6">
              <ErrorState message={error} />
            </div>
          ) : athletes.length === 0 ? (
            <div className="p-6">
              <EmptyState
                message={submittedQuery.trim() ? "Tidak ada atlet yang cocok dengan kriteria pencarian Anda." : "Belum ada data atlet yang terdaftar di dojo ini."}
              />
            </div>
          ) : (
            /* Wrapper responsive overflow untuk mengamankan tampilan mobile/tablet */
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Nama</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Email</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Username</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Gender</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Sabuk (Rank)</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">Tanggal Bergabung</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider w-60">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y">
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}