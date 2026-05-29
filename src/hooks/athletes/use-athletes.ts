"use client"

import useSWR from "swr"
import axios from "axios"
import { getAthletes } from "@/services/athletes-service"
import type { Athlete } from "@/types/athletes"

export function useAthletes(search = "") {
  const trimmedSearch = search.trim()
  // SWR menggunakan key unik (misal: '/athletes') untuk menyimpan cache data ini
  const { data, error, isLoading, mutate } = useSWR<Athlete[]>(
    ["/athletes", trimmedSearch], 
    async () => {
      // Memanggil fungsi fetcher bawaan service kamu
      return await getAthletes({ search: trimmedSearch })
    },
    {
      revalidateOnFocus: false, // Mencegah fetch ulang otomatis saat user pindah tab browser
      dedupingInterval: 5000,    // Jika dalam 5 detik user bolak-balik halaman, jangan fetch ulang
    }
  )

  // Memformat pesan error dari Axios agar sesuai dengan struktur lama kamu
  let errorMessage = ""
  if (error) {
    if (axios.isAxiosError(error)) {
      errorMessage =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message
    } else {
      errorMessage = "Gagal mengambil data athlete"
    }
  }

  return {
    athletes: data || [],      // Jika data belum ada/cache kosong, default ke array kosong
    setAthletes: mutate,       // 'mutate' berfungsi mirip seperti setAthletes jika ingin memperbarui cache lokal
    loading: isLoading,
    error: errorMessage,
  }
}