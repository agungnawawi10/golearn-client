export type RegistrationFormData = {
  gender: string
  address: string
  birth_date: string
}

export type Registration = {
  id: number
  full_name: string
  phone: string
  email: string
  form_data: RegistrationFormData
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}

