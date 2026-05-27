import { api } from "@/lib/api"

import type { Registration } from "@/types/registration"

export async function getRegistrations(options?: { signal?: AbortSignal }) {
  const response = await api.get<Registration[]>("/registrations", {
    signal: options?.signal,
  })

  return response.data ?? []
}

export async function approveRegistration(id: number) {
  const response = await api.post(`/registrations/${id}/approve`)
  return response.data
}