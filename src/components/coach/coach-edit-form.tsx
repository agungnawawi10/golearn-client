"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { useUpdateCoach } from "@/hooks/use-update-coach"
import type { Coach } from "@/types/coach"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type CoachEditFormProps = {
  coach: Coach
}

type FormState = {
  email: string
  password: string
  full_name: string
  username: string
  phone: string
}

export function CoachEditForm({ coach }: CoachEditFormProps) {
  const router = useRouter()
  const { submit, loading, error } = useUpdateCoach()

  const [form, setForm] = useState<FormState>({
    email: coach.email,
    password: "",
    full_name: coach.full_name,
    username: coach.username ?? "",
    phone: coach.phone ?? "",
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const success = await submit(coach.id, {
      email: form.email,
      full_name: form.full_name,
      username: form.username,
      phone: form.phone,
      ...(form.password.trim() ? { password: form.password } : {}),
    })

    if (success) {
      router.push("/dashboard/coach")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nama Lengkap"
        value={form.full_name}
        required
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value,
          })
        }
      />
      <Input
        placeholder="Username"
        value={form.username}
        required
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />
      <Input
        placeholder="No.HP"
        value={form.phone}
        required
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
      />
      <Input
        placeholder="Email"
        value={form.email}
        required
        type="email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />
      <Input
        placeholder="Password baru"
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}