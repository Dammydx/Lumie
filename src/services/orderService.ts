import { supabase } from '../config/supabase'
import { Order, OrderItem } from '../types'

export const orderService = {
  // Fetch user orders
  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items(*)
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Fetch order details
  async getOrder(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items(*)
      `
      )
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data
  },

  // Track order by order number
  async trackOrder(orderNumber: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items(*)
      `
      )
      .eq('order_number', orderNumber)
      .single()

    if (error) throw error
    return data
  },

  // Create order
  async createOrder(order: Partial<Order> & { items: OrderItem[] }) {
    const { items, ...orderData } = order

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (error) throw error

    // Insert order items
    if (items && items.length > 0) {
      const itemData = items.map((item) => ({
        ...item,
        order_id: data.id,
      }))
      await supabase.from('order_items').insert(itemData)
    }

    return data
  },

  // Update order status (admin only)
  async updateOrderStatus(
    orderId: string,
    status: Order['status'],
    estimatedDelivery?: string
  ) {
    const updates: any = { status }
    if (estimatedDelivery) {
      updates.estimated_delivery = estimatedDelivery
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update payment status (admin only)
  async updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all orders (admin only)
  async getAllOrders(filters?: {
    status?: string
    paymentStatus?: string
    dateFrom?: string
    dateTo?: string
  }) {
    let query = supabase
      .from('orders')
      .select('*, order_items(*)', { count: 'exact' })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.paymentStatus) {
      query = query.eq('payment_status', filters.paymentStatus)
    }

    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom)
    }

    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo)
    }

    const { data, error, count } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], total: count }
  },
}
