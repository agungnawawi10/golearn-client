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
export interface RegisterAthletePayload {
  full_name: string;
  phone: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  address: string;
  birth_date: string;
  gender: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data?: any;
}
export type ValidationErrorFields = Record<string, string[]>;