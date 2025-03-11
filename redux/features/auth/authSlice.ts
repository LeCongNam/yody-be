import { userService } from "@/services"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { AppDispatch, RootState } from "../../store"

export interface User {
  _id: string
  deletedAt: string | null
  username: string
  email: string
  avatar: string | null
  isEmailVerify: boolean
  isDisable: boolean
  createdAt: string
  updatedAt: string
  errorMessage: string | null
}

// Định nghĩa kiểu cho state
export interface AuthState {
  isLogin: boolean
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  errorMessage?: string | null
}

// **Trạng thái mặc định** (tránh truy cập `localStorage` khi SSR)
const initialState: AuthState = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  user: null,
}

// **Thunk xử lý đăng nhập**
export const login = createAsyncThunk<
  { accessToken: string; refreshToken: string; user: User }, // ✅ Success response type
  { email: string; password: string; recaptchaToken: string }, // ✅ Request payload type
  { dispatch: AppDispatch; state: RootState; rejectValue: string } // ✅ Error message type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await userService.login(credentials)

    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", response.token.accessToken)
      localStorage.setItem("refreshToken", response.token.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.user))
      localStorage.setItem("isLogin", JSON.stringify(true))
    }

    return {
      accessToken: response.token.accessToken,
      refreshToken: response.token.refreshToken,
      user: response.user as unknown as User,
    }
  } catch (error: any) {
    if (error.message) {
      return rejectWithValue(error.message)
    } else {
      return rejectWithValue("An unknown error occurred during login. 1")
    }
  }
})

// **Thunk xử lý cập nhật người dùng**
export const updateUser = createAsyncThunk<
  User,
  { username: string; email: string; avatar: string | null },
  { dispatch: AppDispatch; state: RootState }
>("auth/updateUser", async (userData, { getState }) => {
  const { auth } = getState()
  if (!auth.user) {
    throw new Error("User is not logged in")
  }
  const response = await userService.updateUser(auth.user._id, userData)
  return response as unknown as User
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      return action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.errorMessage = null

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        localStorage.setItem("isLogin", JSON.stringify(false))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLogin = true
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
        state.errorMessage = null

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", action.payload.accessToken)
          localStorage.setItem("refreshToken", action.payload.refreshToken)
          localStorage.setItem("user", JSON.stringify(action.payload.user))
          localStorage.setItem("isLogin", JSON.stringify(true))
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLogin = false
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.errorMessage = action.payload || "Login failed. Please try again."
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.user) {
          state.user.username = action.payload.username
          state.user.email = action.payload.email
          state.user.avatar = action.payload.avatar
        }
      })
  },
})
export const { setAuthState, logout } = authSlice.actions
export default authSlice.reducer
