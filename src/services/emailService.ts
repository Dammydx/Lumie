import { supabase } from '../config/supabase'

export const emailService = {
  // Try to enqueue an email in `email_queue` table if exists, otherwise log
  async sendOrderConfirmation(order: any) {
    try {
      // If you have an 'email_queue' table, insert for background worker
      const { error } = await supabase.from('email_queue').insert([
        {
          to: order.email,
          subject: `Order Confirmation - ${order.order_number}`,
          body: `Thank you for your order. Order number: ${order.order_number}`,
          metadata: JSON.stringify(order),
        },
      ])
      if (error) throw error
      return { success: true }
    } catch (err) {
      console.warn('Email queue not available; logging order confirmation', err)
      console.log('Order confirmation:', order)
      return { success: false }
    }
  },
}
