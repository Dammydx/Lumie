import { supabase } from '../config/supabase'
import { Product, ProductVariant, ProductImage } from '../types'

export const productService = {
  // Fetch all products with filters
  async getProducts(
    page = 1,
    limit = 12,
    filters?: {
      category_id?: string
      min_price?: number
      max_price?: number
      search?: string
      sort?: string
    }
  ) {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('status', 'active')

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters?.min_price) {
      query = query.gte('price', filters.min_price)
    }

    if (filters?.max_price) {
      query = query.lte('price', filters.max_price)
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      )
    }

    // Add sorting
    if (filters?.sort === 'price_low') {
      query = query.order('price', { ascending: true })
    } else if (filters?.sort === 'price_high') {
      query = query.order('price', { ascending: false })
    } else if (filters?.sort === 'newest') {
      query = query.order('created_at', { ascending: false })
    } else if (filters?.sort === 'rating') {
      query = query.order('rating_avg', { ascending: false })
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)

    if (error) throw error
    return { data, total: count }
  },

  // Fetch single product
  async getProduct(id: string) {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Get related data
    const [variants, images] = await Promise.all([
      supabase.from('product_variants').select('*').eq('product_id', id),
      supabase.from('product_images').select('*').eq('product_id', id),
    ])

    return {
      ...product,
      variants: variants.data || [],
      images: images.data || [],
    }
  },

  // Fetch product variants
  async getProductVariants(productId: string): Promise<ProductVariant[]> {
    const { data, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)

    if (error) throw error
    return data || []
  },

  // Fetch product images
  async getProductImages(productId: string): Promise<ProductImage[]> {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order')

    if (error) throw error
    return data || []
  },

  // Get categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get subcategories
  async getSubcategories(parentId: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get single category
  async getCategory(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create product (admin only)
  async createProduct(product: Partial<Product> & { variants?: ProductVariant[] }) {
    const { variants, ...productData } = product

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()

    if (error) throw error

    // Insert variants if provided
    if (variants && variants.length > 0) {
      const variantData = variants.map((v) => ({
        ...v,
        product_id: data.id,
      }))
      await supabase.from('product_variants').insert(variantData)
    }

    return data
  },

  // Update product (admin only)
  async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete product (admin only)
  async deleteProduct(id: string) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
  },
}
