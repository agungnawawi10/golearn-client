"use client"

import * as React from "react"

import { clearSession, getStoredSession, login as loginRequest } from "@/lib/auth"
import type { AuthSession, LoginCredentials } from "@/types/auth"

type AuthContextValue = {
  user: AuthSession["user"]
  token: string | null
  isHydrated: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<AuthSession>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<AuthSession | null>(null)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    setSession(getStoredSession())
    setIsHydrated(true)
  }, [])

  const login = React.useCallback(async (credentials: LoginCredentials) => {
    const nextSession = await loginRequest(credentials)
    setSession(nextSession)
    return nextSession
  }, [])

  const logout = React.useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isHydrated,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [isHydrated, login, logout, session]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}