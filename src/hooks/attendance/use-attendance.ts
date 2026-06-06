import useSWR from "swr"
import * as React from "react"
import { getAttendancesByLogId, saveAthleteAttendance } from "@/services/attendance_service"
import { Attendance, SaveAttendancePayload } from "@/types/attendance"

export function useAttendance(trainingLogId: string) {
  // Menyimpan ID atlet yang sedang diklik untuk indikator loading per baris
  const [submittingAthleteId, setSubmittingAthleteId] = React.useState<string | null>(null)

  const { data, error, isLoading, mutate } = useSWR<Attendance[]>(
    trainingLogId ? `/coach/training-logs/${trainingLogId}/attendances` : null,
    () => getAttendancesByLogId(trainingLogId)
  )

  const submitAttendance = async (payload: SaveAttendancePayload) => {
    setSubmittingAthleteId(payload.athlete_id)
    const result = await saveAthleteAttendance(trainingLogId, payload)
    setSubmittingAthleteId(null)

    if (result.success) {
      mutate() // Memperbarui data absensi di layar secara real-time tanpa reload
      return true
    }
    return false
  }

  return {
    attendances: data || [],
    isLoading,
    error,
    submittingAthleteId,
    submitAttendance,
    refresh: mutate
  }
}