"use client"

import { TableCell, TableRow } from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useApproveRegistration } from "@/hooks/registration/use-approve-registration"

import type { Registration } from "@/types/registration"

interface RegistrationRowProps {
  registration: Registration
  onApproved: (id: number) => void
}

export function RegistrationRow({ registration, onApproved }: RegistrationRowProps) {
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