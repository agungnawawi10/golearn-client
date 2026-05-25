import { api } from "@/lib/api"
import type { Coach, CreateCoachPayload, UpdateCoachPayload } from "@/types/coach"

// Get data Coach
export async function getCoaches(options?: { signal?: AbortSignal }) {
  const res = await api.get<{ data: Coach[] }>("coaches", {
    signal: options?.signal,
  })
  return res.data.data ?? []
}

export async function getCoachById(id: string, options?: { signal?: AbortSignal }) {
  const res = await api.get<{ data: Coach }>(`coaches/${id}`, {
    signal: options?.signal,
  })
  return res.data.data
}

// Tambah Coach
export async function createCoach(payload: CreateCoachPayload) {
  const res = await api.post("coaches", payload)
  return res.data
}

// Edit Coach
export async function updateCoach(id: string, payload: UpdateCoachPayload) {
  const res = await api.put(`coaches/${id}`, payload)
  return res.data
}

// Hapus Coach
export async function deleteCoach(id: string) {
  const res = await api.delete(`coaches/${id}`)
  return res.data
}
