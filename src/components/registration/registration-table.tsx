"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRegistrations } from "@/hooks/registration/use-registrations"
import { RegistrationEmpty } from "./registration-empty"
import { RegistrationError } from "./registration-error"
import { RegistrationLoading } from "./registration-loading"
import { RegistrationRow } from "./registration-row"

export function RegistrationTable() {
  const { registrations, loading, error, setRegistrations } = useRegistrations()

  if (loading) {
    return <RegistrationLoading />
  }

  if (error) {
    return <RegistrationError message={error} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Registration</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {registrations.length === 0 ? (
          <RegistrationEmpty />
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
                <RegistrationRow
                  key={registration.id}
                  registration={registration}
                  onApproved={(id) => {
                    setRegistrations((current) =>
                      current.map((item) =>
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