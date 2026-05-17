import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}
)

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config
  }

  const token = localStorage.getItem("golearn_auth_token")
  const tokenType = localStorage.getItem("golearn_auth_token_type") ?? "Bearer"

  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `${tokenType} ${token}`
  }

  return config
})