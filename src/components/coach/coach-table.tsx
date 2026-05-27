"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CoachLoading } from "./coach-loading"
import { CoachError } from "./coach-error"
import { CoachEmpty } from "./coach-empty"
import { CoachRow } from "./coach-row"
import { useCoaches } from "@/hooks/coach/use-coaches"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"



export function CoachTable() {
  const { coaches, loading, error, setCoaches } = useCoaches()

  if (loading) {
    return <CoachLoading />
  }

  if (error) {
    return <CoachError message={error} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Coach</CardTitle>
        <CardAction>
          <Button asChild size="sm" className="w-fit">
            <Link href="/dashboard/coach/create">
              Tambah Coach
            </Link>
          </Button>
        </CardAction>
        {/* <CardDescription>Data coach dari backend Laravel.</CardDescription> */}
      </CardHeader>

      <CardContent className="space-y-4">
        {coaches.length === 0 ? (
          <CoachEmpty />
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
                <CoachRow
                  key={coach.id}
                  coach={coach}
                  onDeleted={(id) => {
                    setCoaches((current) => current.filter((item) => item.id !== id))
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