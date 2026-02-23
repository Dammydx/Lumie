import { supabase } from '../config/supabase'
import { Review } from '../types'

export const reviewService = {
  // Get product reviews
  async getProductReviews(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(
        `
        *,
        user:user_id (
          id,
          profiles (
            first_name,
            last_name,
            avatar_url
          )
        )
      `
      )
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create review
  async createReview(userId: string, review: Partial<Review>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ ...review, user_id: userId }])
      .select()
      .single()

    if (error) throw error

    // Update product rating
    await this.updateProductRating(review.product_id!)

    return data
  },

  // Update review
  async updateReview(id: string, updates: Partial<Review>) {
    const { data: review, error: getError } = await supabase
      .from('reviews')
      .select('product_id')
      .eq('id', id)
      .single()

    if (getError) throw getError

    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Update product rating
    await this.updateProductRating(review.product_id)

    return data
  },

  // Delete review
  async deleteReview(id: string, productId: string) {
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) throw error

    // Update product rating
    await this.updateProductRating(productId)
  },

  // Mark review as helpful
  async markHelpful(id: string) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ helpful_count: supabase.rpc('increment_helpful', { review_id: id }) })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update product rating
  private async updateProductRating(productId: string) {
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)

    if (reviewError || !reviews || reviews.length === 0) return

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await supabase
      .from('products')
      .update({
        rating_avg: parseFloat(avgRating.toFixed(2)),
        rating_count: reviews.length,
      })
      .eq('id', productId)
  },
}
