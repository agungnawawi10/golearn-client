"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Award, 
  UserCheck,
  ShieldAlert,
  Fingerprint
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorState } from "@/components/ui/error-state"

import { useAthleteDetail } from "@/hooks/athletes/use-detail-athlete"

export default function AthleteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const athleteId = params?.id as string

  const { athlete, error, isLoading } = useAthleteDetail(athleteId)

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <LoadingState variant="card" rows={5} />
      </div>
    )
  }

  if (error || !athlete) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.push("/dashboard/athletes")} 
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar
        </Button>
        <ErrorState message={error || "Data atlet tidak ditemukan atau terjadi gangguan jaringan."} />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header Navigasi Atas */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/dashboard/athletes")}
            className="p-0 hover:bg-transparent text-muted-foreground hover:text-foreground text-xs gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Database Atlet
          </Button>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Profil Atlet: {athlete.full_name}
          </h1>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/athletes/edit/${athlete.id}`}>Edit Data</Link>
          </Button>
        </div>
      </div>

      <hr />

      {/* Grid Layout Utama */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* KOLOM KIRI: Ringkasan Kartu Identitas Utama */}
        <div className="space-y-6 md:col-span-1">
          <Card className="shadow-sm overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-muted h-20 w-20 rounded-full flex items-center justify-center border-2 border-background shadow-sm mb-3">
                <User className="h-10 w-10 text-muted-foreground/80" />
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">
                {athlete.full_name}
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                @{athlete.account?.username}
              </CardDescription>
              
              <div className="flex justify-center gap-2 mt-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                  athlete.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-slate-50 text-slate-600'
                }`}>
                  {athlete.status}
                </span>
                <span className="bg-primary text-primary-foreground font-extrabold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                  Sabuk {athlete.rank?.name}
                </span>
              </div>
            </CardHeader>

            <CardContent className="border-t pt-4 space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                <div className="overflow-hidden truncate">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Alamat Email</p>
                  <p className="text-foreground font-medium truncate">{athlete.account?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Jenis Kelamin</p>
                  <p className="text-foreground font-medium capitalize">{athlete.gender}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Tanggal Bergabung</p>
                  <p className="text-foreground font-medium">
                    {athlete.joined_at ? new Date(athlete.joined_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN: Informasi Akun & Tingkatan Sabuk sesuai Type */}
        <div className="md:col-span-2">
          <Tabs defaultValue="account" className="w-full space-y-4">
            <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-muted/60">
              <TabsTrigger value="account" className="text-xs font-semibold">
                <UserCheck className="h-3.5 w-3.5 mr-1.5" /> Detail Akun & Akses
              </TabsTrigger>
              <TabsTrigger value="rank" className="text-xs font-semibold">
                <Award className="h-3.5 w-3.5 mr-1.5" /> Informasi Sabuk (Rank)
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: DETAIL AKUN */}
            <TabsContent value="account">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-primary" /> Kredensial & Status Autentikasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 text-xs">
                  <div className="p-3 border rounded-lg bg-muted/10">
                    <p className="text-muted-foreground font-medium mb-0.5">Username Aplikasi</p>
                    <p className="text-sm font-mono font-bold text-foreground">
                      {athlete.account?.username}
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg bg-muted/10">
                    <p className="text-muted-foreground font-medium mb-0.5">Status Akun</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`h-2 w-2 rounded-full ${athlete.account?.is_active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <p className="text-sm font-bold text-foreground">
                        {athlete.account?.is_active ? "Aktif (Dapat Login)" : "Nonaktif"}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg sm:col-span-2 bg-muted/10">
                    <p className="text-muted-foreground font-medium mb-0.5">ID Unik Atlet (UUID)</p>
                    <p className="text-sm font-mono text-slate-500 selection:bg-primary/20">
                      {athlete.id}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: INFORMASI TINGKATAN SABUK */}
            <TabsContent value="rank">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" /> Tingkatan Sabuk Dojo Aktif
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-muted/5 gap-4">
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-medium">Nama Sabuk / Tingkat</p>
                      <p className="text-base font-extrabold text-foreground">
                        Sabuk {athlete.rank?.name}
                      </p>
                    </div>

                    <div className="space-y-1 sm:text-right">
                      <p className="text-muted-foreground font-medium">Bobot Level / Posisi</p>
                      <p className="text-base font-mono font-bold text-primary">
                        Level {athlete.rank?.level}
                      </p>
                    </div>
                  </div>

                  {/* Visual representasi warna sabuk memanfaatkan property athlete.rank.color */}
                  <div className="p-3.5 border border-dashed rounded-lg flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-0.5">Warna Kode Sabuk Sistem</p>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        Atlet berada di tingkatan dengan penanda hex warna:{" "}
                        <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground font-bold">
                          {athlete.rank?.color || "#-"}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  )
}