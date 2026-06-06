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

export interface CoachInfo {
  id: string;
  full_name: string;
  email: string;
}

export interface DrillCategory {
  id: number;
  name: string;
}

export interface DrillMaterial {
  id: number;
  name: string;
  description: string;
  category: DrillCategory;
}

export interface TrainingLogDetail {
  id: string; // Menggunakan UUID String
  title: string;
  training_date: string;
  start_time: string;
  end_time: string;
  location: string;
  class_level: string;
  status: string;
  notes: string;
  coach: CoachInfo;
  drills: DrillMaterial[];
  attendances: any[];         // Siap digunakan untuk fitur absensi nanti
  performance_scores: any[];  // Siap digunakan untuk tracking skor atlet nanti
  created_at: string;
  updated_at: string;
}