import { supabase } from '../config/supabase'
import { Coupon } from '../types'

export const couponService = {
  // Validate coupon
  async validateCoupon(code: string): Promise<Coupon | null> {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single()

    if (error || !data) return null

    // Check if coupon is valid by date
    const now = new Date()
    const validFrom = new Date(data.valid_from)
    const validUntil = new Date(data.valid_until)

    if (now < validFrom || now > validUntil) {
      return null
    }

    // Check if usage limit reached
    if (data.usage_limit && data.current_usage >= data.usage_limit) {
      return null
    }

    return data
  },

  // Get coupon
  async getCoupon(id: string): Promise<Coupon> {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create coupon (admin only)
  async createCoupon(coupon: Partial<Coupon>) {
    const { data, error } = await supabase
      .from('coupons')
      .insert([coupon])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update coupon (admin only)
  async updateCoupon(id: string, updates: Partial<Coupon>) {
    const { data, error } = await supabase
      .from('coupons')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Increment coupon usage
  async incrementCouponUsage(couponId: string) {
    const coupon = await this.getCoupon(couponId)
    const { error } = await supabase
      .from('coupons')
      .update({ current_usage: coupon.current_usage + 1 })
      .eq('id', couponId)

    if (error) throw error
  },

  // Get all coupons (admin only)
  async getAllCoupons() {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Delete coupon (admin only)
  async deleteCoupon(id: string) {
    const { error } = await supabase.from('coupons').delete().eq('id', id)
    if (error) throw error
  },
}
