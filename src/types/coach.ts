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

export type CreateCoachPayload = {
  email: string
  password: string
  full_name: string
  username?: string
  phone?: string
}

export type UpdateCoachPayload = {
  email: string
  full_name: string
  username?: string
  phone?: string
  password?: string
  is_active?: boolean
}