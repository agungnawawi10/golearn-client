"use client"

import * as React from "react"
import useSWR from "swr"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, User, Dumbbell, BookOpen, AlertCircle, Trash2, Users, Loader2, Award, FileText, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTrainingLogById, deleteTrainingLog } from "@/services/training-logs_service"
import { AttendanceStatus } from "@/types/attendance"
import { useAttendance } from "@/hooks/attendance/use-attendance"
import { usePerformance } from "@/hooks/performance_score/use-performance_score"


export default function TrainingLogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [isDeleting, setIsDeleting] = React.useState(false)
  
  // State Navigasi Tab Utama (Lebar Penuh)
  const [activeTab, setActiveTab] = React.useState<'info' | 'attendance' | 'performance'>('info')

  // 1. Fetch data detail program latihan utama
  const { data: log, isLoading: logLoading, error: logError } = useSWR(
    id ? `/coach/training-logs/${id}` : null,
    () => getTrainingLogById(id)
  )

  // 2. Hook Presensi Atlet
  const {
    attendances,
    isLoading: attLoading,
    submittingAthleteId,
    submitAttendance
  } = useAttendance(id)

  // 3. Hook Penilaian Performa Atlet
  const {
    scores,
    aspects,
    isLoading: perfLoading,
    submittingKey,
    submitScore
  } = usePerformance(id)

  const handleStatusChange = async (athleteId: string, status: AttendanceStatus) => {
    const success = await submitAttendance({
      athlete_id: athleteId,
      status: status,
      notes: null 
    })
    if (!success) alert("Gagal memperbarui status absensi atlet.")
  }

  const handleScoreChange = async (athleteId: string, aspectId: number, scoreValue: string, originalNotes: string | null) => {
    const parsedScore = scoreValue === "" ? null : parseInt(scoreValue, 10)
    await submitScore({
      athlete_id: athleteId,
      aspect_id: aspectId,
      score: parsedScore,
      notes: originalNotes
    })
  }

  const handleNotesChange = async (athleteId: string, aspectId: number, originalScore: number | null, notesValue: string) => {
    await submitScore({
      athlete_id: athleteId,
      aspect_id: aspectId,
      score: originalScore,
      notes: notesValue === "" ? null : notesValue
    })
  }

  const handleDeleteLog = async () => {
    if (!log) return
    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus seluruh log latihan "${log.title}"?`)
    if (!confirmDelete) return

    setIsDeleting(true)
    const success = await deleteTrainingLog(log.id)
    setIsDeleting(false)

    if (success) router.push("/dashboard/training-logs")
  }

  if (logLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Memuat detail program latihan...</div>
  }

  if (logError || !log) {
    return (
      <div className="p-8 text-center max-w-md mx-auto space-y-4">
        <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
        <p className="text-sm font-medium text-destructive">Data sesi latihan tidak ditemukan.</p>
        <Button size="sm" onClick={() => router.push("/dashboard/training-logs")}>Kembali ke Daftar</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* 1. Header Navigasi Atas */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/training-logs")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Log Latihan
        </Button>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border
            ${log.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 border-amber-200'}`}
          >
            {log.status}
          </span>
          <Button variant="destructive" size="sm" className="gap-1.5 h-8 text-xs" disabled={isDeleting} onClick={handleDeleteLog}>
            <Trash2 className="h-3.5 w-3.5" />
            {isDeleting ? "Menghapus..." : "Hapus Log"}
          </Button>
        </div>
      </div>

      {/* 2. Judul Sesi Utama */}
      <div className="space-y-2 border-b pb-4">
        <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
          Sesi {log.class_level}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{log.title}</h1>
      </div>

      {/* 3. STRATEGI BARU: Navigasi Tab Horizontal Lebar Penuh */}
      <div className="flex border-b gap-1 bg-muted/20 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold uppercase tracking-wider rounded-md transition-all
            ${activeTab === 'info' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Info className="h-3.5 w-3.5" /> Detail & Materi
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold uppercase tracking-wider rounded-md transition-all
            ${activeTab === 'attendance' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Users className="h-3.5 w-3.5" /> Presensi Atlet
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold uppercase tracking-wider rounded-md transition-all
            ${activeTab === 'performance' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Award className="h-3.5 w-3.5" /> Evaluasi Performa
        </button>
      </div>

      {/* 4. KONTEN MASING-MASING TAB (LEBAR PENUH) */}
      
      {/* TAB 1: DETAIL LATIHAN & MATERI DRILL */}
      {activeTab === 'info' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Info Utama Mini Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="shadow-none bg-muted/20"><CardContent className="flex items-center gap-3 pt-4"><Calendar className="h-5 w-5 text-primary" /><div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tanggal</p><p className="text-sm font-semibold">{log.training_date}</p></div></CardContent></Card>
            <Card className="shadow-none bg-muted/20"><CardContent className="flex items-center gap-3 pt-4"><Clock className="h-5 w-5 text-primary" /><div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Durasi</p><p className="text-sm font-semibold">{log.start_time.substring(0, 5)} - {log.end_time.substring(0, 5)}</p></div></CardContent></Card>
            <Card className="shadow-none bg-muted/20"><CardContent className="flex items-center gap-3 pt-4"><MapPin className="h-5 w-5 text-primary" /><div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lokasi</p><p className="text-sm font-semibold">{log.location}</p></div></CardContent></Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Coach Card */}
            <Card className="shadow-sm md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Pelatih Penanggung Jawab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{log.coach.full_name}</p>
                <p className="text-xs text-muted-foreground font-mono">{log.coach.email}</p>
              </CardContent>
            </Card>

            {/* Drills/Kurikulum Card */}
            <Card className="shadow-sm md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 font-bold">
                  <BookOpen className="h-4 w-4 text-primary" /> Kurikulum Materi Latihan Sesi Ini
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {log.drills && log.drills.length > 0 ? (
                  log.drills.map((drill) => (
                    <div key={drill.id} className="p-3.5 border rounded-lg bg-background text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-50">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Dumbbell className="h-4 w-4 text-primary" />
                          {drill.name}
                        </div>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-muted font-mono border">
                          {drill.category?.name}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2 leading-relaxed text-xs">{drill.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-6">Tidak ada materi drill terlampir pada sesi ini.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: LOG PRESENSI LEBAR PENUH */}
      {activeTab === 'attendance' && (
        <Card className="shadow-sm animate-in fade-in duration-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <Users className="h-4 w-4 text-primary" /> Lembar Presensi Kehadiran Atlet
            </CardTitle>
            <CardDescription>Kelola kehadiran atlet hari ini dengan menekan tombol status di bawah.</CardDescription>
          </CardHeader>
          <CardContent>
            {attLoading ? (
              <div className="text-center py-12 text-xs text-muted-foreground animate-pulse">Mengambil data presensi...</div>
            ) : attendances && attendances.length > 0 ? (
              <div className="border rounded-xl divide-y bg-background overflow-hidden">
                {attendances.map((att) => {
                  const athlete = att.athlete;
                  const isRowSubmitting = submittingAthleteId === athlete?.id;

                  return (
                    <div key={att.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm hover:bg-muted/5 transition-colors">
                      <div className="space-y-0.5">
                        <p className="font-bold text-base text-slate-900 dark:text-slate-50 flex items-center gap-2">
                          {athlete?.full_name || "Nama Tidak Diketahui"}
                          {isRowSubmitting && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">ID Atlet: {athlete?.id}</p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(['hadir', 'izin', 'sakit', 'alfa'] as const).map((status) => {
                          const isSelected = att.status === status;
                          return (
                            <Button
                              key={status}
                              size="default"
                              variant={isSelected ? "default" : "outline"}
                              disabled={isRowSubmitting}
                              onClick={() => handleStatusChange(athlete.id, status)}
                              className={`text-xs h-9 px-4 capitalize font-semibold rounded-md shadow-none transition-all
                                ${isSelected && status === 'hadir' ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600' : ''}
                                ${isSelected && status === 'alfa' ? 'bg-destructive hover:bg-destructive/90 text-white border-destructive' : ''}
                                ${isSelected && (status === 'izin' || status === 'sakit') ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500' : ''}
                              `}
                            >
                              {status}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-muted-foreground border border-dashed rounded-lg">Tidak ada data atlet aktif terikat pada log ini.</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB 3: LEMBAR EVALUASI PERFORMA LEBAR PENUH */}
      {activeTab === 'performance' && (
        <Card className="shadow-sm animate-in fade-in duration-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <Award className="h-4 w-4 text-primary" /> Rapor Penilaian Performa Atlet Harian
            </CardTitle>
            <CardDescription>Nilai dihitung berdasarkan kriteria master aspek yang terdaftar. Tekan enter atau ganti kolom untuk autosave.</CardDescription>
          </CardHeader>
          <CardContent>
            {perfLoading ? (
              <div className="text-center py-12 text-xs text-muted-foreground animate-pulse">Memuat lembar kriteria penilaian...</div>
            ) : attendances && attendances.length > 0 && aspects.length > 0 ? (
              <div className="space-y-6">
                {attendances.map((att) => {
                  const athlete = att.athlete;
                  if (!athlete) return null;

                  return (
                    <div key={athlete.id} className="p-5 border rounded-xl bg-muted/5 space-y-4 shadow-sm">
                      {/* Sub-Header Nama Atlet */}
                      <div className="border-b pb-2 flex items-center justify-between">
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-50">{athlete.full_name}</h4>
                        <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full">Sabuk Putih</span>
                      </div>

                      {/* Tampilan Grid Berubah Menjadi 3 Kolom Jika Layar Lebar (Lebih Lega!) */}
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {aspects.map((aspect) => {
                          const currentRecord = scores.find(s => s.athlete?.id === athlete.id && s.aspect?.id === aspect.id);
                          const currentScoreValue = currentRecord?.score !== null && currentRecord?.score !== undefined ? currentRecord.score : "";
                          const currentNotesValue = currentRecord?.notes || "";
                          
                          const targetKey = `${athlete.id}-${aspect.id}`;
                          const isFieldSaving = submittingKey === targetKey;

                          return (
                            <div key={aspect.id} className="p-3 border rounded-lg bg-background space-y-2.5 shadow-none transition-all hover:border-slate-300">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                  {aspect.name}
                                  {isFieldSaving && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
                                </span>
                                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Max: {aspect.max_score}</span>
                              </div>

                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  placeholder="0"
                                  min="0"
                                  max={aspect.max_score}
                                  defaultValue={currentScoreValue}
                                  disabled={isFieldSaving}
                                  onBlur={(e) => handleScoreChange(athlete.id, aspect.id, e.target.value, currentNotesValue)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleScoreChange(athlete.id, aspect.id, e.currentTarget.value, currentNotesValue)
                                  }}
                                  className="w-16 h-9 text-center text-xs font-bold border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                                
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    placeholder="Evaluasi teknik..."
                                    defaultValue={currentNotesValue}
                                    disabled={isFieldSaving}
                                    onBlur={(e) => handleNotesChange(athlete.id, aspect.id, currentRecord?.score ?? null, e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleNotesChange(athlete.id, aspect.id, currentRecord?.score ?? null, e.currentTarget.value)
                                    }}
                                    className="w-full h-9 px-3 pl-8 text-xs border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-ellipsis"
                                  />
                                  <FileText className="absolute left-2.5 top-3 h-3.5 w-3.5 text-muted-foreground/70" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-muted-foreground border border-dashed rounded-lg">
                Belum ada aspek penilaian penunjang yang dibuat di database dojo.
              </div>
                )}
          </CardContent>
        </Card>
      )}

    </div>
  )
}