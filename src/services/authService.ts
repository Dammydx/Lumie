import { supabase } from '../config/supabase'
import { Profile, Address } from '../types'

export const authService = {
  // Sign up
  async signup(email: string, password: string, firstName: string, lastName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) throw error
    return data.user
  },

  // Sign in
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data.session
  },

  // Sign out
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  },

  // Get user profile
  async getProfile(userId: string): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Create profile (usually called after signup)
  async createProfile(userId: string, profile: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ ...profile, user_id: userId }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Password reset request
  async resetPasswordRequest(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
  },

  // Get user addresses
  async getUserAddresses(userId: string): Promise<Address[]> {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create address
  async createAddress(userId: string, address: Partial<Address>) {
    const { data, error } = await supabase
      .from('addresses')
      .insert([{ ...address, user_id: userId }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update address
  async updateAddress(addressId: string, updates: Partial<Address>) {
    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', addressId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete address
  async deleteAddress(addressId: string) {
    const { error } = await supabase.from('addresses').delete().eq('id', addressId)
    if (error) throw error
  },

  // Set default address
  async setDefaultAddress(userId: string, addressId: string) {
    // First, unset all defaults for this user
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', userId)

    // Set the new default
    const { data, error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
