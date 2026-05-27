import { api } from "@/lib/api"

import type { Athlete, UpdateAthletePayload } from "@/types/athletes"

export async function getAthletes(options?: { signal?: AbortSignal }) {
  const response = await api.get<{ data: Athlete[] }>("/athletes", {
    signal: options?.signal,
  })

  return response.data.data ?? []
}

export async function getAthleteById(id: string, options?: { signal?: AbortSignal }) {
  const response = await api.get<{ data: Athlete }>(`/athletes/${id}`, {
    signal: options?.signal,
  })

  return response.data.data
}

export async function updateAthlete(id: string, payload: UpdateAthletePayload) {
  const response = await api.put(`/athletes/${id}`, payload)
  return response.data
}

export async function deleteAthlete(id: string) {
  const response = await api.delete(`/athletes/${id}`)
  return response.data
}