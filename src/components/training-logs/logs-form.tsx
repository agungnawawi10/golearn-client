"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateTrainingLog } from "@/hooks/training-logs/use-training-logs."


interface LogFormProps {
  onSuccess: () => void
}

export function TrainingLogForm({ onSuccess }: LogFormProps) {
  const { submit, loading, error } = useCreateTrainingLog()
  
  const [formData, setFormData] = React.useState({
    title: "",
    training_date: "",
    start_time: "",
    end_time: "",
    location: "",
    class_level: "Intermediate",
    status: "published", // Default berstatus published sesuai skema JSON
    notes: ""
  })

  const availableDrills = [
    { id: 1, name: "Kanku Dai (Kata)" },
    { id: 3, name: "Kicking Power Drill" },
    { id: 5, name: "Kumite Target Sparring" },
  ]

  const [selectedDrills, setSelectedDrills] = React.useState<number[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDrillCheck = (id: number) => {
    setSelectedDrills(prev => 
      prev.includes(id) ? prev.filter(drillId => drillId !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isSuccess = await submit({
      ...formData,
      drill_ids: selectedDrills
    })

    if (isSuccess) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2 max-h-[80vh] overflow-y-auto px-1">
      {/* Judul Latihan */}
      <div className="grid gap-1">
        <Label htmlFor="title">Judul Latihan</Label>
        <Input id="title" name="title" required placeholder="Latihan Kaki Intensif" value={formData.title} onChange={handleChange} />
      </div>

      {/* Grid Tanggal & Waktu */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="grid gap-1">
          <Label htmlFor="training_date">Tanggal</Label>
          <Input id="training_date" name="training_date" type="date" required value={formData.training_date} onChange={handleChange} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="start_time">Jam Mulai</Label>
          <Input id="start_time" name="start_time" type="time" required value={formData.start_time} onChange={handleChange} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="end_time">Jam Selesai</Label>
          <Input id="end_time" name="end_time" type="time" required value={formData.end_time} onChange={handleChange} />
        </div>
      </div>

      {/* Lokasi & Tingkatan Kelas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="location">Lokasi Dojo</Label>
          <Input id="location" name="location" required placeholder="Dojo A" value={formData.location} onChange={handleChange} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="class_level">Tingkatan Kelas</Label>
          <select id="class_level" name="class_level" value={formData.class_level} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Input Status Publikasi (Tambahan Baru Agar Sinkron dengan JSON) */}
      <div className="grid gap-1">
        <Label htmlFor="status">Status Log</Label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Materi / Drills Checklist */}
      <div className="grid gap-1">
        <Label>Materi / Drills Latihan</Label>
        <div className="grid gap-2 border p-3 rounded-md bg-muted/20">
          {availableDrills.map(drill => (
            <label key={drill.id} className="flex items-center gap-2 text-sm font-normal cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={selectedDrills.includes(drill.id)} 
                onChange={() => handleDrillCheck(drill.id)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>{drill.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Catatan Fokus */}
      <div className="grid gap-1">
        <Label htmlFor="notes">Catatan Fokus</Label>
        <Textarea id="notes" name="notes" placeholder="Fokus pada teknik dan ketahanan" value={formData.notes} onChange={handleChange} />
      </div>

      {/* Error Message dari API Laravel */}
      {error && (
        <p className="text-sm text-destructive font-medium bg-destructive/10 p-2 rounded border border-destructive/20">
          {error}
        </p>
      )}

      {/* Tombol Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Menyimpan..." : "Publish Log Latihan"}
      </Button>
    </form>
  )
}