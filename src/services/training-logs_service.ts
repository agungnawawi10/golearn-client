import { api } from "@/lib/api"
import { CreateTrainingLogPayload, TrainingLog, TrainingLogDetail } from "@/types/training-logs"


export async function getTrainingLogs(options?: { signal?: AbortSignal }): Promise<TrainingLog[]> {
  const response = await api.get("/coach/training-logs", { signal: options?.signal })
  return response.data.data ?? []
}

export async function createTrainingLogs(payload: CreateTrainingLogPayload): Promise<boolean> {
  const response = await api.post("/coach/training-logs", payload)
  return response.data.status === "success"
}

export async function getTrainingLogById(id: string, options?: { signal?: AbortSignal }): Promise<TrainingLogDetail | null> {
  try {
    const response = await api.get(`/coach/training-logs/${id}`, { signal: options?.signal })
    return response.data.data ?? null
  } catch (error) {
    console.error("Gagal mengambil detail log latihan:", error)
    return null
  }
}

export async function updateTrainingLog(id: string, data: any): Promise<boolean> {
  try {
    await api.put(`/coach/training-logs/${id}`, data)
    return true
  } catch (error) {
    console.error("Gagal mengupdate log latihan:", error)
    return false
  }
}

export async function deleteTrainingLog(id: string): Promise<boolean> {
  try {
    await api.delete(`/coach/training-logs/${id}`)
    return true
  } catch (error) {
    console.error("Gagal menghapus log latihan:", error)
    return false
  }
}