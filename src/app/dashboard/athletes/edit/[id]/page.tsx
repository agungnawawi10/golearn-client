"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"

import { AthleteEditForm } from "@/components/athletes/athlete-edit-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAthleteById } from "@/services/athletes-service"
import type { Athlete } from "@/types/athletes"

export default function EditAthletePage() {
	const params = useParams<{ id: string | string[] }>()
	const athleteId = Array.isArray(params.id) ? params.id[0] : params.id

	const [athlete, setAthlete] = useState<Athlete | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const controller = new AbortController()
		let isMounted = true

		async function fetchAthlete() {
			try {
				if (!athleteId) {
					throw new Error("ID athlete tidak ditemukan")
				}

				setLoading(true)
				setError("")

				const data = await getAthleteById(athleteId, { signal: controller.signal })

				if (!isMounted) {
					return
				}

				setAthlete(data)
			} catch (err) {
				if (!isMounted || axios.isCancel(err)) {
					return
				}

				if (axios.isAxiosError(err)) {
					const backendMessage =
						(err.response?.data as { message?: string } | undefined)?.message ?? err.message
					setError(backendMessage || "Gagal mengambil data athlete")
				} else if (err instanceof Error) {
					setError(err.message)
				} else {
					setError("Gagal mengambil data athlete")
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchAthlete()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [athleteId])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Athlete</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				{loading && <p className="text-sm text-muted-foreground">Memuat data athlete...</p>}

				{!loading && error && <p className="text-sm text-red-500">{error}</p>}

				{!loading && !error && athlete && <AthleteEditForm athlete={athlete} />}

				<Button asChild variant="outline">
					<Link href="/dashboard/athletes">Kembali ke daftar athlete</Link>
				</Button>
			</CardContent>
		</Card>
	)
}
