import { create } from 'zustand'
import { CartItem, Cart } from '../types'

interface CartStore {
  cart: Cart
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: {
    items: [],
    total: 0,
  },

  addToCart: (item: CartItem) =>
    set((state) => {
      const existingItem = state.cart.items.find(
        (i) =>
          i.product_id === item.product_id &&
          JSON.stringify(i.variant_selections) === JSON.stringify(item.variant_selections)
      )

      let updatedItems: CartItem[]
      if (existingItem) {
        updatedItems = state.cart.items.map((i) =>
          i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      } else {
        updatedItems = [...state.cart.items, item]
      }

      return {
        cart: {
          items: updatedItems,
          total: get().getCartTotal(),
        },
      }
    }),

  removeFromCart: (itemId: string) =>
    set((state) => ({
      cart: {
        items: state.cart.items.filter((i) => i.id !== itemId),
        total: get().getCartTotal(),
      },
    })),

  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => {
      const updatedItems =
        quantity <= 0
          ? state.cart.items.filter((i) => i.id !== itemId)
          : state.cart.items.map((i) => (i.id === itemId ? { ...i, quantity } : i))

      return {
        cart: {
          items: updatedItems,
          total: get().getCartTotal(),
        },
      }
    }),

  clearCart: () =>
    set({
      cart: {
        items: [],
        total: 0,
      },
    }),

  getCartTotal: () => {
    const state = get().cart
    return state.items.reduce((total, item) => {
      const price = item.product?.price || 0
      return total + price * item.quantity
    }, 0)
  },
}))
