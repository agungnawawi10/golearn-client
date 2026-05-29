"use client"

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

import { useRegistrations } from "@/hooks/registration/use-registrations"
import { useApproveRegistration } from "@/hooks/registration/use-approve-registration"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { LoadingState } from "@/components/ui/loading-state"
import type { Registration } from "@/types/registration"

type RegistrationTableRowProps = {
  registration: Registration
  onApproved: (id: number) => void
}

function RegistrationTableRow({ registration, onApproved }: RegistrationTableRowProps) {
  const { submit, loading } = useApproveRegistration()

  async function handleApprove() {
    const success = await submit(registration.id)

    if (success) {
      onApproved(registration.id)
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{registration.full_name}</TableCell>
      <TableCell>{registration.email}</TableCell>
      <TableCell>{registration.phone}</TableCell>
      <TableCell>{registration.form_data.gender}</TableCell>
      <TableCell>{registration.form_data.address}</TableCell>
      <TableCell>{registration.form_data.birth_date}</TableCell>
      <TableCell>{registration.status}</TableCell>
      <TableCell>
        {registration.status !== "approved" ? (
          <Button size="sm" onClick={handleApprove} disabled={loading}>
            {loading ? "Approving..." : "Approve"}
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">Approved</span>
        )}
      </TableCell>
    </TableRow>
  )
}

export function RegistrationTable() {
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [draftQuery, setDraftQuery] = useState("")
  const { registrations, loading, error, setRegistrations } = useRegistrations(submittedQuery)

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedQuery(draftQuery)
  }

  if (loading) {
    return <LoadingState message="Memuat data registration..." />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Registration</CardTitle>
        <CardAction>
          <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              value={draftQuery}
              onChange={(event) => setDraftQuery(event.target.value)}
              placeholder="Cari registration..."
              className="w-52 sm:w-64"
              aria-label="Cari registration"
            />
            <Button type="submit" variant="outline" size="sm">
              <Search className="size-4" />
              Cari
            </Button>
          </form>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        {registrations.length === 0 ? (
          <EmptyState
            message={submittedQuery.trim() ? "Tidak ada registration yang cocok dengan pencarian." : "Belum ada data registration."}
          />
        ) : (
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {registrations.map((registration) => (
                <RegistrationTableRow
                  key={registration.id}
                  registration={registration}
                  onApproved={(id) => {
                    setRegistrations((current) =>
                      (current ?? []).map((item) =>
                        item.id === id ? { ...item, status: "approved" } : item,
                      ),
                    )
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