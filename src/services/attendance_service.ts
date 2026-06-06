import { api } from "@/lib/api"
import { Attendance, SaveAttendancePayload } from "@/types/attendance"


// GET: Mengambil daftar absensi atlet berdasarkan UUID Training Log
export async function getAttendancesByLogId(trainingLogId: string): Promise<Attendance[]> {
  const response = await api.get(`/coach/training-logs/${trainingLogId}/attendances`)
  return response.data.data // Mengambil data dari wrapper resource Laravel
}

// POST: Menyimpan atau memperbarui (updateOrCreate) absensi atlet
export async function saveAthleteAttendance(
  trainingLogId: string, 
  payload: SaveAttendancePayload
) {
  try {
    const response = await api.post(`/coach/training-logs/${trainingLogId}/attendances`, payload)
    return { success: true, data: response.data }
  } catch (error) {
    console.error("Gagal mengirim absensi ke server:", error)
    return { success: false, error }
  }
}