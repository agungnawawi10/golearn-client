import { CoachForm } from "@/components/coach/coach-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateCoachPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Coach</CardTitle>
          <CardDescription>Lengkapi data coach baru di bawah ini.</CardDescription>
        </CardHeader>

        <CardContent>
          <CoachForm />
        </CardContent>
      </Card>
    </div>
  )
}
