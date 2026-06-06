import useSWR from "swr"
import type { Athlete } from "@/types/athletes"
import { getAthleteById } from "@/services/athletes-service"

export function useAthleteDetail(athleteId: string) {
  const { data, error, isLoading, mutate } = useSWR<Athlete>(
    athleteId ? `/athletes/${athleteId}` : null,
    // Menggunakan Axio service milikmu, mempassing params id dengan aman
    () => getAthleteById(athleteId)
  )

  return {
    athlete: data,
    error: error instanceof Error ? error.message : error ? "Gagal memuat detail atlet" : null,
    isLoading,
    mutate
  }
}