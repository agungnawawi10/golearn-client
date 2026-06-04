"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#f8fafc,#e2e8f0_60%,#cbd5e1)] px-4 py-12 dark:bg-[radial-gradient(circle_at_top,#0f172a,#020617_60%,#000)]">
      <Card className="w-full max-w-md text-center shadow-sm border-emerald-500/20 dark:border-emerald-500/10">
        <CardHeader className="flex flex-col items-center justify-center pt-8 gap-2">
          {/* Efek Lingkaran Icon Sukses */}
          <div className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 p-3 text-emerald-500 animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="h-12 w-12 stroke-[1.5]" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-2">
            Pendaftaran Berhasil!
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground max-w-xs mx-auto">
            Akun atlet Anda telah berhasil dibuat di dalam sistem manajemen dojo.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-6">
          <div className="rounded-lg border bg-muted/40 p-4 text-left text-sm text-muted-foreground gap-1.5 flex flex-col">
            <p className="font-medium text-foreground">Langkah Selanjutnya:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Silakan melakukan login menggunakan email dan password Anda.</li>
              <li>Lengkapi berkas administrasi jika diminta oleh pelatih/admin.</li>
              <li>Tunggu verifikasi data oleh pengurus dojo untuk status aktif.</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-8 flex flex-col gap-3">
          {/* Tombol Menuju Login */}
          <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700">
            <Link href="/login" className="flex items-center justify-center gap-2">
              Masuk ke Akun
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {/* Tautan Kembali ke Beranda */}
          <Link 
            href="/" 
            className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}