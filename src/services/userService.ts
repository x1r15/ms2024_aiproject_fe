import { create } from 'zustand'
import { decodeJWT } from '../utils/jwt'

type UserRole = 'user' | 'expert' | 'admin'

interface UserState {
  email: string | null
  role: UserRole | null
  isAuthenticated: boolean
  setUser: (token: string) => void
  clearUser: () => void
  hasRole: (...roles: UserRole[]) => boolean
  initializeFromStorage: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  email: null,
  role: null,
  isAuthenticated: false,
  setUser: (token: string) => {
    const decoded = decodeJWT(token)
    if (decoded) {
      set({
        email: decoded.email,
        role: decoded.role as UserRole,
        isAuthenticated: true,
      })
    }
  },
  clearUser: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({
      email: null,
      role: null,
      isAuthenticated: false,
    })
  },
  hasRole: (...roles: UserRole[]) => {
    const state = get()
    return state.role ? roles.includes(state.role) : false
  },
  initializeFromStorage: () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      get().setUser(token)
    }
  },
}))

useUserStore.getState().initializeFromStorage() 