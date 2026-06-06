// Sesuai dengan Rule::in(['hadir', 'izin', 'sakit', 'alfa']) di backend
export type AttendanceStatus = 'hadir' | 'izin' | 'sakit' | 'alfa';

export interface AthleteInline {
  id: string;         // Mengikuti $this->athlete?->id
  full_name: string;  // Mengikuti $this->athlete?->full_name
}

export interface Attendance {
  id: string;               // UUID Absensi
  training_log_id: string;  // UUID Training Log asal
  athlete: AthleteInline;   // Object data atlet bentukan dari resource
  status: AttendanceStatus; // 'hadir' | 'izin' | 'sakit' | 'alfa'
  notes: string | null;     // nullable string
  created_at: string;       // Format String dari ->toDateTimeString()
}

// Payload untuk kebutuhan request POST ke store()
export interface SaveAttendancePayload {
  athlete_id: string;
  status: AttendanceStatus;
  notes?: string | null;
}