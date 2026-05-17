import axios from "axios"

import { api } from "@/lib/api"
import type { AuthSession, LoginCredentials, LoginResponse } from "@/types/auth"

export const AUTH_COOKIE_NAME = "golearn_auth_token"
const AUTH_USER_KEY = "golearn_auth_user"
const AUTH_TOKEN_KEY = "golearn_auth_token"
const AUTH_TOKEN_TYPE_KEY = "golearn_auth_token_type"
const AUTH_LOGIN_PATH = process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH ?? "/login"

function serializeCookie(name: string, value: string, maxAgeSeconds: number) {
  return `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`
}

function setClientCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = serializeCookie(name, value, maxAgeSeconds)
}

function clearClientCookie(name: string) {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function readStoredSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)
  const tokenType = window.localStorage.getItem(AUTH_TOKEN_TYPE_KEY) ?? "Bearer"
  const user = safeJsonParse<AuthSession["user"]>(
    window.localStorage.getItem(AUTH_USER_KEY)
  )

  if (!token) {
    return null
  }

  return {
    token,
    tokenType,
    user,
  }
}

function persistSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, session.token)
  window.localStorage.setItem(AUTH_TOKEN_TYPE_KEY, session.tokenType ?? "Bearer")

  if (session.user) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user))
  } else {
    window.localStorage.removeItem(AUTH_USER_KEY)
  }

  setClientCookie(AUTH_COOKIE_NAME, session.token, 60 * 60 * 24 * 7)
}

export function clearSession() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    window.localStorage.removeItem(AUTH_TOKEN_TYPE_KEY)
    window.localStorage.removeItem(AUTH_USER_KEY)
  }

  clearClientCookie(AUTH_COOKIE_NAME)
}

export function getStoredSession() {
  return readStoredSession()
}

export async function login(credentials: LoginCredentials) {
  let response

  try {
    response = await api.post<LoginResponse>(AUTH_LOGIN_PATH, credentials)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message

      const status = error.response?.status

      throw new Error(
        status ? `Login gagal (${status}): ${backendMessage}` : backendMessage
      )
    }

    throw error
  }

  const payload = response.data.data ?? response.data
  const token =
    payload.access_token ?? payload.accessToken ?? payload.token ?? payload.jwt

  if (!token) {
    throw new Error("Backend tidak mengembalikan token login")
  }

  const session: AuthSession = {
    token,
    tokenType: payload.token_type ?? response.data.token_type ?? "Bearer",
    user: payload.user ?? null,
  }

  persistSession(session)

  return session
}