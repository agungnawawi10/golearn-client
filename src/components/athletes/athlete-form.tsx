"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useCreateAthlete } from "@/hooks/athletes/use-create-athlete"
import { useUpdateAthlete } from "@/hooks/athletes/use-update-athlete"
import type { Athlete, UpdateAthletePayload } from "@/types/athletes"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type AthleteFormMode = "create" | "edit"

type AthleteFormProps = {
  athlete?: Athlete
  mode?: AthleteFormMode
}

type FormState = {
  full_name: string
  gender: string
  rank_id: string
  photo: string
  status: string
}

const createInitialForm = (): FormState => ({
  full_name: "",
  gender: "",
  rank_id: "",
  photo: "",
  status: "",
})

const editInitialForm = (athlete: Athlete): FormState => ({
  full_name: athlete.full_name,
  gender: athlete.gender,
  rank_id: String(athlete.rank.id),
  photo: "",
  status: athlete.status,
})

export function AthleteForm({ athlete, mode = athlete ? "edit" : "create" }: AthleteFormProps) {
  const router = useRouter()
  const createAthlete = useCreateAthlete()
  const updateAthlete = useUpdateAthlete()

  const [form, setForm] = useState<FormState>(() =>
    mode === "edit" && athlete ? editInitialForm(athlete) : createInitialForm(),
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(mode === "edit" && athlete ? editInitialForm(athlete) : createInitialForm())
  }, [athlete, mode])

  const loading = mode === "edit" ? updateAthlete.loading : createAthlete.loading
  const error = mode === "edit" ? updateAthlete.error : createAthlete.error

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const payload: UpdateAthletePayload = {
      full_name: form.full_name,
      gender: form.gender,
      rank_id: form.rank_id,
      photo: form.photo,
      status: form.status,
    }

    const success =
      mode === "edit"
        ? await updateAthlete.submit(athlete?.id ?? "", payload)
        : await createAthlete.submit(payload)

    if (success) {
      router.push("/dashboard/athletes")
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
        placeholder="Gender"
        value={form.gender}
        required
        onChange={(e) =>
          setForm({
            ...form,
            gender: e.target.value,
          })
        }
      />

      <Input
        placeholder="Rank ID"
        value={form.rank_id}
        required
        onChange={(e) =>
          setForm({
            ...form,
            rank_id: e.target.value,
          })
        }
      />

      <Input
        placeholder="Photo URL"
        value={form.photo}
        onChange={(e) =>
          setForm({
            ...form,
            photo: e.target.value,
          })
        }
      />

      <Input
        placeholder="Status"
        value={form.status}
        required
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value,
          })
        }
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Tambah Athlete"}
      </Button>
    </form>
  )
}