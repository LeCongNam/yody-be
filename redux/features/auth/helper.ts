import { AuthState } from "./authSlice"

// Hàm load dữ liệu từ localStorage (chỉ chạy trên client)
export const loadStateFromLocalStorage = (): AuthState | null => {
  try {
    const isLogin = JSON.parse(localStorage.getItem("isLogin") || "false")
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const user = JSON.parse(localStorage.getItem("user") || "null")

    return {
      isLogin,
      accessToken,
      refreshToken,
      user,
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error)
    return null
  }
}
