import type { User, LoginCredentials, LoginResponse } from '../types'
import authData from '../../mock-data/auth.json'

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    await delay(1000) // Simulate network delay

    const user = authData.users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const { password, ...userWithoutPassword } = user
    
    return {
      success: true,
      data: {
        user: userWithoutPassword as User,
        token: `mock-jwt-token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    }
  },

  logout: async (): Promise<{ success: boolean }> => {
    await delay(500)
    return { success: true }
  },

  getProfile: async (): Promise<{ success: boolean; data: User }> => {
    await delay(500)
    
    // Mock: return first user as logged in user
    const user = authData.users[0]
    const { password, ...userWithoutPassword } = user
    
    return {
      success: true,
      data: userWithoutPassword as User,
    }
  },
}
