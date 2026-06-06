"use client"

import * as React from "react"
import useSWR from "swr"
import Link from "next/link" // <-- 1. Import Link dari Next.js
import { Plus, Calendar, MapPin, Layers, Clock, ArrowRight } from "lucide-react" // Tambah icon ArrowRight biar manis

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TrainingLogForm } from "@/components/training-logs/logs-form"
import { TrainingLog } from "@/types/training-logs"
import { getTrainingLogs } from "@/services/training-logs_service"


export default function TrainingLogsPage() {
  const [open, setOpen] = React.useState(false)
  const { data: logs = [], isLoading, error } = useSWR<TrainingLog[]>("/coach/training-logs", () => getTrainingLogs())

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Log Latihan Dojo</h1>
          <p className="text-sm text-muted-foreground">Kelola program, riwayat materi, dan jadwal latihan terstruktur.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Buat Log Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>Buat Log Latihan Baru</DialogTitle>
              <DialogDescription>Isi detail target latihan dan pilih drill materi terkait.</DialogDescription>
            </DialogHeader>
            <TrainingLogForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <hr />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat data log latihan...</p>
      ) : error ? (
        <p className="text-sm text-destructive">Gagal memuat data log latihan.</p>
      ) : logs.length === 0 ? (
        <div className="text-center py-12 text-sm text-muted-foreground border border-dashed rounded-lg">
          Belum ada catatan log latihan terstruktur yang dibuat.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {logs.map((log) => (
            <Card key={log.id} className="shadow-sm border-l-4 border-l-primary flex flex-col justify-between">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{log.training_date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    log.status === 'published' 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' 
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold mt-2">{log.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3 text-xs text-muted-foreground flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 border-b pb-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{log.start_time.substring(0, 5)} - {log.end_time.substring(0, 5)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{log.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <Layers className="h-3.5 w-3.5" />
                      <span>Kelas: <strong>{log.class_level}</strong></span>
                    </div>
                  </div>
                  {log.notes && (
                    <p className="italic bg-muted/40 p-2 rounded text-foreground line-clamp-2">
                      &ldquo;{log.notes}&rdquo;
                    </p>
                  )}
                  <div className="text-[11px]">
                    Drills ID Aktif:{" "}
                    <span className="font-mono text-primary font-semibold">
                      {log.drill_ids && log.drill_ids.length > 0
                        ? log.drill_ids.join(", ")
                        : "-"}
                    </span>
                  </div>
                </div>

                {/* <-- 2. TAMBAHAN TOMBOL DETAIL DI SINI --> */}
                <div className="flex justify-end pt-3 border-t mt-2">
                  <Button asChild size="sm" variant="outline" className="w-full sm:w-auto text-xs gap-1">
                    <Link href={`/dashboard/training-logs/${log.id}`}>
                      Detail Sesi <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}