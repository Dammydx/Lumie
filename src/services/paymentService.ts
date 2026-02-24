// Minimal payment service with adapters for Paystack, Stripe, Flutterwave
export const paymentService = {
  // Load external script helper
  loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('Failed to load script'))
      document.body.appendChild(s)
    })
  },

  async initializePaystack({ email, amount, reference }: any) {
    const key = (import.meta.env.VITE_PAYSTACK_KEY as string) || ''
    if (!key) {
      console.warn('VITE_PAYSTACK_KEY not set; falling back to stub')
      return { success: true }
    }

    await this.loadScript('https://js.paystack.co/v1/inline.js')

    return new Promise((resolve, reject) => {
      try {
        ;(window as any).PaystackPop.setup({
          key,
          email,
          amount: Math.round(amount),
          ref: reference,
          onClose: function () {
            reject(new Error('Payment closed'))
          },
          callback: function (response: any) {
            resolve({ success: true, reference: response.reference })
          },
        }).openIframe()
      } catch (err) {
        reject(err)
      }
    })
  },

  async initializeStripe({ paymentMethodId, amount }: any) {
    console.log('Initialize Stripe (stub)', { paymentMethodId, amount })
    return { success: true }
  },

  async initializeFlutterwave({ email, amount }: any) {
    console.log('Initialize Flutterwave (stub)', { email, amount })
    return { success: true }
  },
}
