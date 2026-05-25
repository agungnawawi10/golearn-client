"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { useCreateCoach } from "@/hooks/use-create-coach"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const initialForm = {
  email: "",
  password: "",
  full_name: "",
  username: "",
  phone: "",
}

type FormState = typeof initialForm
type FormField = keyof FormState

const requiredFields: FormField[] = ["full_name", "username", "phone", "email", "password"]

export function CoachForm() {
  const { submit, loading, error } = useCreateCoach()
  const router = useRouter()

  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({})

  const fieldErrors = {
    full_name: form.full_name.trim() ? "" : "required",
    username: form.username.trim() ? "" : "required",
    phone: form.phone.trim() ? "" : "required",
    email: form.email.trim() ? "" : "required",
    password: form.password.trim() ? "" : "required",
  } satisfies Record<FormField, string>

  const isFormComplete = requiredFields.every((field) => form[field].trim() !== "")

  function handleBlur(field: FormField) {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleChange(field: FormField, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nextTouched = requiredFields.reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: true,
      }),
      {} as Partial<Record<FormField, boolean>>,
    )

    setTouched(nextTouched)

    if (!isFormComplete) {
      return
    }

    const success = await submit(form)

    if (success) {
      setForm(initialForm)
      setTouched({})
      router.push("/dashboard/coach")
    }
  }

  function showRequiredMessage(field: FormField) {
    return Boolean(touched[field] || isFormComplete) && fieldErrors[field] === "required"
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Input
            placeholder="Nama Lengkap"
            value={form.full_name}
            aria-invalid={showRequiredMessage("full_name")}
            onBlur={() => handleBlur("full_name")}
            onChange={(e) => handleChange("full_name", e.target.value)}
          />
          {showRequiredMessage("full_name") && (
            <p className="text-sm text-red-500">required</p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            placeholder="Username"
            value={form.username}
            aria-invalid={showRequiredMessage("username")}
            onBlur={() => handleBlur("username")}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          {showRequiredMessage("username") && (
            <p className="text-sm text-red-500">required</p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            placeholder="No.HP"
            value={form.phone}
            aria-invalid={showRequiredMessage("phone")}
            onBlur={() => handleBlur("phone")}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {showRequiredMessage("phone") && <p className="text-sm text-red-500">required</p>}
        </div>

        <div className="space-y-1">
          <Input
            placeholder="Email"
            value={form.email}
            aria-invalid={showRequiredMessage("email")}
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {showRequiredMessage("email") && <p className="text-sm text-red-500">required</p>}
        </div>

        <div className="space-y-1 md:col-span-2">
          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            aria-invalid={showRequiredMessage("password")}
            onBlur={() => handleBlur("password")}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {showRequiredMessage("password") && (
            <p className="text-sm text-red-500">required</p>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading || !isFormComplete}>
          {loading ? "Menyimpan..." : "Tambah Coach"}
        </Button>
      </div>
    </form>
  )
}