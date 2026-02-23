// User & Auth Types
export interface User {
  id: string
  email: string
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone: string
  avatar_url?: string
  role: 'customer' | 'admin' | 'vendor'
  created_at: string
  updated_at: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

// Product Types
export interface Product {
  id: string
  title: string
  description: string
  category_id: string
  subcategory?: string
  price: number
  discount_price?: number
  currency: 'NGN' | 'USD' | 'GBP'
  sku: string
  stock_quantity: number
  images: string[]
  tags: string[]
  rating_avg: number
  rating_count: number
  status: 'active' | 'draft' | 'inactive'
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  type: 'size' | 'color' | 'shade' | 'material'
  value: string
  stock_quantity: number
  sku: string
  additional_price?: number
  created_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text?: string
  is_primary: boolean
  display_order: number
  created_at: string
}

// Cart Types
export interface CartItem {
  id: string
  product_id: string
  quantity: number
  variant_selections: {
    size?: string
    color?: string
    shade?: string
    material?: string
  }
  product?: Product
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Order Types
export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  total_amount: number
  subtotal: number
  tax_amount: number
  shipping_fee: number
  discount_amount: number
  currency: 'NGN'
  coupon_code?: string
  customer_email: string
  customer_phone: string
  delivery_address: Address
  contact_info: {
    first_name: string
    last_name: string
    email: string
    phone: string
  }
  payment_method: 'paystack' | 'stripe' | 'flutterwave'
  payment_reference?: string
  created_at: string
  updated_at: string
  estimated_delivery?: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_title: string
  quantity: number
  unit_price: number
  product_image?: string
  variant_selections?: CartItem['variant_selections']
  created_at: string
}

// Address Types
export interface Address {
  id: string
  user_id?: string
  first_name: string
  last_name: string
  phone: string
  email: string
  street_address: string
  city: string
  state_province: string
  postal_code: string
  country: string
  is_default: boolean
  address_type: 'billing' | 'shipping'
  created_at: string
  updated_at: string
}

// Shipping Types
export interface ShippingZone {
  id: string
  name: string
  country: string
  state_province?: string
  base_fee: number
  free_shipping_over: number
  delivery_days_min: number
  delivery_days_max: number
  active: boolean
  created_at: string
}

// Coupon Types
export interface Coupon {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_purchase_amount?: number
  max_discount_amount?: number
  usage_limit?: number
  current_usage: number
  valid_from: string
  valid_until: string
  active: boolean
  created_at: string
}

// Review Types
export interface Review {
  id: string
  product_id: string
  user_id: string
  order_id: string
  rating: number
  title: string
  comment: string
  verified_purchase: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

// Wishlist Types
export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

// Contact Form Types
export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  created_at: string
}

// Analytics Types
export interface DashboardStats {
  total_orders: number
  total_revenue: number
  total_customers: number
  pending_orders: number
  total_products: number
  low_stock_products: number
  monthly_revenue: Array<{ month: string; revenue: number }>
  top_products: Array<{ id: string; title: string; sales: number }>
}
