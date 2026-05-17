export type Coach = {
  id: string
  username: string | null
  email: string
  full_name: string
  phone: string | null
  photo: string | null
  is_active: boolean
  roles: string[]
  created_at: string
}

export type CoachesResponse = {
  data: Coach[]
}