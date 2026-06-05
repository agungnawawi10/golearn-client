export interface TrainingLog {
  id: number;
  title: string;
  training_date: string; // YYYY-MM-DD
  start_time: string;    // HH:MM
  end_time: string;      // HH:MM
  location: string;
  class_level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'draft' | 'published';
  notes?: string;
  drill_ids: number[];
  created_at?: string;
}

export interface CreateTrainingLogPayload {
  title: string;
  training_date: string;
  start_time: string;
  end_time: string;
  location: string;
  class_level: string;
  status: string;
  notes?: string;
  drill_ids: number[];
}