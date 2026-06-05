import { api } from "@/lib/api"
import { CreateTrainingLogPayload, TrainingLog } from "@/types/training-logs"


export async function getTrainingLogs(options?: { signal?: AbortSignal }): Promise<TrainingLog[]> {
  const response = await api.get("/trainingLogs", { signal: options?.signal })
  return response.data.data ?? []
}

export async function createTrainingLogs(payload: CreateTrainingLogPayload): Promise<boolean> {
  const response = await api.post("/training-sessions", payload)
  return response.data.status === "success"
}