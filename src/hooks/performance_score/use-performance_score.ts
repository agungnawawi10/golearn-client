import useSWR from "swr"
import * as React from "react"
import {
  getPerformanceScoresByLogId,
  getScoreAspects,
  savePerformanceScore,
} from "@/services/performance_score_service"
import { SavePerformancePayload } from "@/types/performance_score"

export function usePerformance(trainingLogId: string) {
  // Menyimpan string gabungan "athleteId-aspectId" untuk indikator loading spesifik di form input
  const [submittingKey, setSubmittingKey] = React.useState<string | null>(null)

  // 1. Fetch data nilai performa harian yang sudah diinput
  const { data: scores, isLoading: scoresLoading, mutate } = useSWR(
    trainingLogId ? `/coach/training-logs/${trainingLogId}/performance-scores` : null,
    () => getPerformanceScoresByLogId(trainingLogId)
  )

  // 2. Fetch master aspek penilaian untuk pilihan dropdown / kolom penilaian
  const { data: aspects, isLoading: aspectsLoading } = useSWR(
    '/coach/score-aspects',
    getScoreAspects
  )

  const submitScore = async (payload: SavePerformancePayload) => {
    const key = `${payload.athlete_id}-${payload.aspect_id}`
    setSubmittingKey(key)

    const result = await savePerformanceScore(trainingLogId, payload)
    setSubmittingKey(null)

    if (result.success) {
      mutate() // Re-fetch data nilai terbaru secara real-time
      return true
    }
    return false
  }

  return {
    scores: scores || [],
    aspects: aspects || [],
    isLoading: scoresLoading || aspectsLoading,
    submittingKey,
    submitScore
  }
}