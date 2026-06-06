export interface PerformanceScore {
  id: string
  training_log_id: string
  score: number | null
  notes: string | null
  athlete: {
    id: string
    full_name: string
  }
  aspect: {
    id: number
    name: string
    max_score: number
  }
}

export interface ScoreAspect {
  id: number
  name: string
  max_score: number
}
export interface SavePerformancePayload {
  athlete_id: string
  aspect_id: number
  score: number | null
  notes?: string | null
}