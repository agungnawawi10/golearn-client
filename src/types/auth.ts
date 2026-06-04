export type AuthUser = {
  id?: string | number
  name?: string
  username?: string
  full_name?: string
  email?: string
  role?: string
  is_active?: boolean
  joined_at?: string
  [key: string]: unknown
}

export type LoginCredentials = {
  email: string
  password: string
}

export type AuthSession = {
  token: string
  tokenType?: string
  user?: AuthUser | null
}

export type LoginResponse = {
  message?: string
  user?: AuthUser
  token_type?: string
  access_token?: string
  accessToken?: string
  token?: string
  jwt?: string
  data?: {
    message?: string
    accessToken?: string
    access_token?: string
    token?: string
    jwt?: string
    token_type?: string
    user?: AuthUser
  }
}

