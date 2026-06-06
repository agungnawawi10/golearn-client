import { api } from "@/lib/api"
import { PerformanceScore, SavePerformancePayload, ScoreAspect } from "@/types/performance_score"

// GET: Mengambil daftar nilai performa berdasarkan UUID Training Log
export async function getPerformanceScoresByLogId(trainingLogId: string): Promise<PerformanceScore[]> {
  const response = await api.get(`/coach/training-logs/${trainingLogId}/performance-scores`)
  return response.data.data
}

// GET: Mengambil seluruh master aspek penilaian (Kihon, Kata, Kumite, dll)
export async function getScoreAspects(): Promise<ScoreAspect[]> {
  const response = await api.get('/coach/score-aspects')
  return response.data.data
}

// POST: Menyimpan atau memperbarui nilai performa atlet (updateOrCreate)
export async function savePerformanceScore(trainingLogId: string, payload: SavePerformancePayload) {
  try {
    const response = await api.post(`/coach/training-logs/${trainingLogId}/performance-scores`, payload)
    return { success: true, data: response.data }
  } catch (error) {
    console.error("Gagal menyimpan nilai performa:", error)
    return { success: false, error }
  }
}