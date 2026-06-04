"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegisterAthlete } from "@/hooks/registration/use-register-athlete"

export default function RegisterPage() {
  const router = useRouter()
  const { submit, loading, error, validationErrors } = useRegisterAthlete()

  // Kelola state form lokal di level UI seperti halaman login kamu
  const [formData, setFormData] = React.useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    birth_date: "",
    gender: "",
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // Panggil fungsi submit dari hook
    const isSuccess = await submit(formData)
    
    // Jika hook mengembalikan true (sukses), baru lakukan redirect di sini
    if (isSuccess) {
      router.push("/register/success")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#f8fafc,#e2e8f0_60%,#cbd5e1)] px-4 py-12 dark:bg-[radial-gradient(circle_at_top,#0f172a,#020617_60%,#000)]">
      <Card className="w-full max-w-lg shadow-sm">
        <CardHeader>
          <CardTitle>Pendaftaran Atlet Baru</CardTitle>
          <CardDescription>
            Masukkan data diri atlet dengan benar untuk mendaftar ke dojo
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              
              {/* Nama Lengkap */}
              <div className="grid gap-2">
                <Label htmlFor="full_name">Nama Lengkap</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Alex"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                />
                {validationErrors.full_name && (
                  <p className="text-xs text-destructive">{validationErrors.full_name[0]}</p>
                )}
              </div>

              {/* Grid Telepon & Tanggal Lahir */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0812345678322"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {validationErrors.phone && (
                    <p className="text-xs text-destructive">{validationErrors.phone[0]}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="birth_date">Tanggal Lahir</Label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    required
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                  {validationErrors.birth_date && (
                    <p className="text-xs text-destructive">{validationErrors.birth_date[0]}</p>
                  )}
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div className="grid gap-2">
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {validationErrors.gender && (
                  <p className="text-xs text-destructive">{validationErrors.gender[0]}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Alex@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <p className="text-xs text-destructive">{validationErrors.email[0]}</p>
                )}
              </div>

              {/* Alamat */}
              <div className="grid gap-2">
                <Label htmlFor="address">Alamat Rumah</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Jl. Jati warna, No 10"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
                {validationErrors.address && (
                  <p className="text-xs text-destructive">{validationErrors.address[0]}</p>
                )}
              </div>

              {/* Grid Password */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {validationErrors.password && (
                    <p className="text-xs text-destructive">{validationErrors.password[0]}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

            {error ? (
              <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </Button>
            <div className="text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Login di sini
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}