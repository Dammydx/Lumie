import { create } from 'zustand'
import { Profile } from '../types'
import { supabase } from '../config/supabase'

interface AuthStore {
  user: any | null
  profile: Profile | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  setUser: (user: any) => void
  setProfile: (profile: Profile | null) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setProfile: (profile) => set({ profile }),

  logout: async () => {
    await supabase.auth.signOut()
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
    })
  },

  checkAuth: async () => {
    try {
      set({ loading: true })
      const { data } = await supabase.auth.getSession()
      set({
        user: data.session?.user ?? null,
        isAuthenticated: !!data.session,
      })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },
}))
