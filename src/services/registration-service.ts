import { api } from "@/lib/api"

import type { RegisterAthletePayload, RegisterResponse, Registration } from "@/types/registration"

export async function getRegistrations(options?: {
  signal?: AbortSignal
  search?: string
}) {
  const response = await api.get("/registrations", {
    signal: options?.signal,
    params: options?.search ? { search: options.search } : undefined,
  })

  return response.data.data ?? []
}

export async function approveRegistration(id: number) {
  const response = await api.post(`/registrations/${id}/approve`)
  return response.data
}

export async function registerAthlete(payload: RegisterAthletePayload): Promise<RegisterResponse> {
  const response = await api.post("registration-athlete", payload)
  return response.data
}