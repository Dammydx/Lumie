import { supabase } from '../config/supabase'
import { Wishlist } from '../types'

export const wishlistService = {
  // Get user wishlist
  async getUserWishlist(userId: string) {
    const { data, error } = await supabase
      .from('wishlists')
      .select(
        `
        id,
        product_id,
        product:product_id (
          id,
          title,
          price,
          discount_price,
          images
        ),
        created_at
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Add to wishlist
  async addToWishlist(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('wishlists')
      .insert([{ user_id: userId, product_id: productId }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Remove from wishlist
  async removeFromWishlist(wishlistId: string) {
    const { error } = await supabase.from('wishlists').delete().eq('id', wishlistId)
    if (error) throw error
  },

  // Check if product is in wishlist
  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (error?.code === 'PGRST116') {
      return false // Not found
    }

    if (error) throw error
    return !!data
  },
}
