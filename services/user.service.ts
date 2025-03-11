import { User } from "@/redux/features/auth/authSlice"

import HttpClient from "@/lib/HtttpClient"

class UserService extends HttpClient {
  constructor() {
    super()
  }

  private _PREFIX = "/users"

  async getUserById(id: string): Promise<User> {
    return this.get<User>(`${this._PREFIX}/${id}`)
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.post<User>(`${this._PREFIX}/register`, user)
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return this.put<User>(`${this._PREFIX}/${id}`, user)
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`${this._PREFIX}/${id}`)
  }

  async login(user: Partial<User>): Promise<{
    token: { accessToken: string; refreshToken: string }
    user: User
  }> {
    return this.post<{
      token: { accessToken: string; refreshToken: string }
      user: User
    }>(`${this._PREFIX}/login`, user)
  }

  async checkDuplicateUsername(
    username: string
  ): Promise<{ isDuplicate: boolean }> {
    const response = await this.post<{
      isDuplicate: boolean
    }>(`${this._PREFIX}/checkDuplicateUsername`, {
      username,
    })

    return response
  }

  async checkDuplicateEmail(email: string): Promise<{ isDuplicate: boolean }> {
    const response = await this.post<{
      isDuplicate: boolean
      success: boolean
    }>(`${this._PREFIX}/checkDuplicateEmail`, {
      email,
    })
    return response
  }
}

export { UserService }
