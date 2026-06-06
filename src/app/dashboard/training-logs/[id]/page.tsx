"use client"

import * as React from "react"
import useSWR from "swr"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, User, Dumbbell, BookOpen, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTrainingLogById } from "@/services/training-logs_service"

export default function TrainingLogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  // Fetch data menggunakan endpoint UUID tepat setelah v1
  const { data: log, isLoading, error } = useSWR(
    id ? `/coach/training-logs/${id}` : null,
    () => getTrainingLogById(id)
  )

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Memuat detail program latihan...</div>
  }

  if (error || !log) {
    return (
      <div className="p-8 text-center max-w-md mx-auto space-y-4">
        <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
        <p className="text-sm font-medium text-destructive">Data sesi latihan tidak ditemukan atau sudah dihapus.</p>
        <Button size="sm" onClick={() => router.push("/dashboard/training-logs")}>Kembali ke Daftar</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/training-logs")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Log Latihan
        </Button>
        <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border
          ${log.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 border-amber-200'}`}
        >
          {log.status}
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="space-y-2 border-b pb-4">
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
            Sesi {log.class_level}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{log.title}</h1>
      </div>

      {/* Info Dashboard Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-none bg-muted/20">
          <CardContent className="flex items-center gap-3 pt-4">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tanggal Pelaksanaan</p>
              <p className="text-sm font-semibold">{log.training_date}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none bg-muted/20">
          <CardContent className="flex items-center gap-3 pt-4">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Durasi Sesi</p>
              <p className="text-sm font-semibold">
                {log.start_time.substring(0, 5)} - {log.end_time.substring(0, 5)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none bg-muted/20">
          <CardContent className="flex items-center gap-3 pt-4">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lokasi Sesi</p>
              <p className="text-sm font-semibold">{log.location}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Kolom Kiri: Catatan & Coach Info (Lebar 1 Kolom) */}
        <div className="space-y-4 md:col-span-1">
          {/* Coach Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Pelatih Penanggung Jawab
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-bold text-base text-slate-800 dark:text-slate-200">{log.coach.full_name}</p>
              <p className="text-xs text-muted-foreground font-mono">{log.coach.email}</p>
            </CardContent>
          </Card>

          {/* Notes Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Catatan Utama Sesi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 bg-amber-50/50 dark:bg-amber-950/10 p-3 rounded-md border border-amber-500/10 italic">
                &ldquo;{log.notes || "Tidak ada instruksi spesifik dari coach."}&rdquo;
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Drills / Materi Kurikulum (Lebar 2 Kolom) */}
        <div className="md:col-span-2">
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Menu Kurikulum Materi Latihan
              </CardTitle>
              <CardDescription>Target teknik karate dan materi fisik yang wajib dikuasai hari ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {log.drills && log.drills.length > 0 ? (
                log.drills.map((drill) => (
                  <div key={drill.id} className="group p-3.5 rounded-lg border bg-background hover:border-slate-400/50 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-primary shrink-0" />
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-50">{drill.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-md pl-6">
                        {drill.description}
                      </p>
                    </div>
                    
                    {/* Badge Kategori Materi */}
                    <div className="pl-6 sm:pl-0">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border
                        ${drill.category.name === "Fisik" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900" : "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900"}`}
                      >
                        {drill.category.name}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-6">Tidak ada menu drill terlampir.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}