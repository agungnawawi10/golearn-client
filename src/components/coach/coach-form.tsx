"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { useCreateCoach } from "@/hooks/coach/use-create-coach"
import { useUpdateCoach } from "@/hooks/coach/use-update-coach"
import type { Coach, CreateCoachPayload, UpdateCoachPayload } from "@/types/coach"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type CoachFormMode = "create" | "edit"

type CoachFormProps = {
  coach?: Coach
  mode?: CoachFormMode
}

const schema = z.object({
  full_name: z.string().min(1, "Nama lengkap wajib diisi"),
  username: z.string().min(1, "Username wajib diisi"),
  phone: z.string().min(1, "No. HP wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function CoachForm({ coach, mode = coach ? "edit" : "create" }: CoachFormProps) {
  const router = useRouter()
  const createCoach = useCreateCoach()
  const updateCoach = useUpdateCoach()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: coach?.full_name ?? "",
      username: coach?.username ?? "",
      phone: coach?.phone ?? "",
      email: coach?.email ?? "",
      password: "",
    },
  })

  React.useEffect(() => {
    form.reset({
      full_name: coach?.full_name ?? "",
      username: coach?.username ?? "",
      phone: coach?.phone ?? "",
      email: coach?.email ?? "",
      password: "",
    })
  }, [coach, mode, form])

  const loading = mode === "edit" ? updateCoach.loading : createCoach.loading
  const error = mode === "edit" ? updateCoach.error : createCoach.error

  async function onSubmit(values: FormValues) {
    const payload =
      mode === "edit"
        ? ({
            email: values.email,
            full_name: values.full_name,
            username: values.username,
            phone: values.phone,
            ...(values.password?.trim() ? { password: values.password } : {}),
          } as UpdateCoachPayload)
        : ({
            email: values.email,
            password: values.password ?? "",
            full_name: values.full_name,
            username: values.username,
            phone: values.phone,
          } as CreateCoachPayload)

    const success =
      mode === "edit"
        ? await updateCoach.submit(coach?.id ?? "", payload as UpdateCoachPayload)
        : await createCoach.submit(payload as CreateCoachPayload)

    if (success) {
      form.reset()
      router.push("/dashboard/coach")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <Input {...field} placeholder="Nama Lengkap" aria-invalid={fieldState.invalid} />
              {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Username</label>
              <Input {...field} placeholder="Username" aria-invalid={fieldState.invalid} />
              {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">No.HP</label>
              <Input {...field} placeholder="No.HP" aria-invalid={fieldState.invalid} />
              {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <Input {...field} placeholder="Email" aria-invalid={fieldState.invalid} />
              {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">{mode === "edit" ? "Password baru" : "Password"}</label>
              <Input {...field} type="password" placeholder={mode === "edit" ? "Password baru" : "Password"} aria-invalid={fieldState.invalid} />
              {mode === "create" && fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Tambah Coach"}
        </Button>
      </div>
    </form>
  )
}