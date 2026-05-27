"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useAthletes } from "@/hooks/athletes/use-athletes"
import { AthleteEmpty } from "./athlete-empty"
import { AthleteError } from "./athlete-error"
import { AthleteLoading } from "./athlete-loading"
import { AthleteRow } from "./athlete-row"

export function AthletesTable() {
  const { athletes, loading, error, setAthletes } = useAthletes()

  if (loading) {
    return <AthleteLoading />
  }

  if (error) {
    return <AthleteError message={error} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Athlete</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {athletes.length === 0 ? (
          <AthleteEmpty />
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
                <AthleteRow
                  key={athlete.id}
                  athlete={athlete}
                  onDeleted={(id) => {
                    setAthletes((current) => current.filter((item) => item.id !== id))
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