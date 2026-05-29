import { api } from "@/lib/api"

import type { Registration } from "@/types/registration"

export async function getRegistrations(options?: { signal?: AbortSignal; search?: string }) {
  const response = await api.get<Registration[]>("/registrations", {
    signal: options?.signal,
    params: options?.search ? { search: options.search } : undefined,
  })

  return response.data ?? []
}

export async function approveRegistration(id: number) {
  const response = await api.post(`/registrations/${id}/approve`)
  return response.data
}