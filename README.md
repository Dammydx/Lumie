# Lumié - Premium E-commerce Platform

A modern, fully-featured e-commerce platform for Jewelry, Fashion, and Beauty products. Built with React, Vite, Tailwind CSS, and Supabase.

## Features

### 🛍️ Customer Features
- **Browse Products**: Shop by category (Jewelry, Fashion, Beauty)
- **Advanced Filtering**: Filter by price, color, size, availability, rating
- **Product Details**: Full product information with variants and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Wishlist**: Save favorite products
- **Checkout**: Multi-step checkout with address management
- **Order Tracking**: Track orders by order number
- **User Accounts**: Register, login, manage profile and addresses
- **Reviews & Ratings**: Leave and read product reviews
- **Search**: Full-text search across products

### 💼 Admin Features
- **Dashboard**: Real-time analytics and metrics
- **Product Management**: Add, edit, delete products with variants
- **Inventory Control**: Track stock levels
- **Order Management**: View and update order status
- **Customer Management**: View customer information and history
- **Shipping Settings**: Configure zones and delivery fees
- **Coupon System**: Create and manage discounts
- **Image Upload**: Upload and manage product images
- **Contact Messages**: Manage contact form submissions

### 🔒 Security
- User authentication with Supabase Auth
- Role-based access control (Customer/Admin)
- Row-level security policies
- Secure payment processing
- Protected admin routes
- HTTPS ready

### 📱 Responsive Design
- Mobile-first approach
- Fully responsive UI
- Touch-optimized navigation
- Works on all devices

### ⚡ Performance
- Code splitting with React Router
- Lazy loading for images
- Optimized bundle size
- Fast load times
- Skeleton loading states

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **React Hook Form** - Form management

### Backend
- **Supabase** - Database, Auth, Storage
- **PostgreSQL** - Database
- **Row Level Security** - Data protection

### Payments
- **Paystack** - Payment processing
- **Stripe** - Payment processing
- **Flutterwave** - Payment processing

### Deployment
- **Vercel** / **Netlify** - Frontend hosting
- **Supabase** - Backend hosting

## Project Structure

```
lumie/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── store/            # Zustand stores
│   ├── services/         # API services
│   ├── types/            # TypeScript types
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilities
│   ├── config/           # Configuration
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── SUPABASE_SCHEMA.sql   # Database schema
├── SETUP_GUIDE.md        # Setup instructions
├── DEPLOYMENT_GUIDE.md   # Deployment guide
├── package.json          # Dependencies
├── vite.config.ts        # Vite config
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Set up database**
   - Create a new Supabase project
   - Copy contents of `SUPABASE_SCHEMA.sql`
   - Run in Supabase SQL Editor

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5173`

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Creating Components

Components should follow the structure:

```typescript
interface ComponentProps {
  prop1: string
  prop2?: number
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  return <div>{prop1}</div>
}
```

### State Management

Use Zustand for global state:

```typescript
import { create } from 'zustand'

interface Store {
  count: number
  increment: () => void
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

## Database Schema

See [SUPABASE_SCHEMA.sql](./SUPABASE_SCHEMA.sql) for complete schema.

**Main Tables:**
- `users` - Supabase Auth users
- `profiles` - User information
- `products` - Product listings
- `product_variants` - Product sizes/colors
- `orders` - Customer orders
- `order_items` - Items in orders
- `reviews` - Product reviews
- `wishlists` - User wishlists
- `categories` - Product categories
- `coupons` - Discount codes
- `shipping_zones` - Delivery fees

## Authentication

### Sign Up
Users can create an account via `/register`

### Login
Users can login via `/login`

### Admin Setup
1. Create a regular account
2. In Supabase, set user's `role` to `admin`

## Product Management

### Adding Products
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill in details
4. Add images
5. Create variants (sizes, colors, etc.)
6. Save

### Product Variants
Each product can have variants with their own stock levels:
- Fashion: Sizes (S/M/L/XL), Colors
- Jewelry: Ring sizes, Materials, Colors
- Beauty: Shades, Volumes, Skin types

## Orders & Payments

### Checkout Flow
1. User browsing products
2. Add items to cart
3. Go to checkout
4. Enter shipping info
5. Select payment method
6. Complete payment
7. Receive order confirmation

### Payment Integration
To enable payments:

1. **Paystack** (Nigeria)
   ```typescript
   import PaystackPop from '@paystack/inline-js'
   ```

2. **Stripe** (Global)
   ```bash
   npm install @stripe/react-stripe-js @stripe/js
   ```

3. **Flutterwave** (Africa)
   ```typescript
   import { Flutterwave } from '@flutterwave/react-v3'
   ```

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy (Vercel)
```bash
npm install -g vercel
vercel
```

### Quick Deploy (Netlify)
```bash
npm install -g netlify-cli
netlify deploy
```

## Performance Tips

### Frontend
- Use React DevTools Profiler to identify slow components
- Implement code splitting for large features
- Optimize images (use WebP with fallback)
- Use Intersection Observer for lazy loading

### Database
- Use indexes for frequently queried fields
- Implement pagination for large datasets
- Archive old orders to separate table
- Monitor slow queries in Supabase

### Caching
- Static assets: 1 year
- API responses: 5-10 minutes
- HTML: No cache (fetch fresh)

## Security

### Best Practices Implemented
✅ HTTPS/TLS encryption
✅ Password hashing (Supabase Auth)
✅ Row-level security (RLS) policies
✅ Environment variables for secrets
✅ CSRF protection
✅ Input validation and sanitization
✅ Protected admin routes
✅ Secure payment handling

### Recommendations
- Keep dependencies updated: `npm audit`
- Review security logs regularly
- Implement rate limiting
- Use strong passwords
- Enable 2FA for admin accounts

## Testing Checklist

### Functionality
- [ ] Browse products with filters
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Clear cart
- [ ] Proceed to checkout
- [ ] Create user account
- [ ] Login/Logout
- [ ] Place order (test payment)
- [ ] Track order
- [ ] Leave review
- [ ] Add to wishlist
- [ ] Apply coupon code

### Mobile
- [ ] Check on iPhone
- [ ] Check on Android
- [ ] Check tablet layout
- [ ] Check touch interactions
- [ ] Check image loading

### Admin
- [ ] View dashboard metrics
- [ ] Add product
- [ ] Edit product
- [ ] Delete product
- [ ] Manage orders
- [ ] Update order status
- [ ] Create coupon

## Troubleshooting

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) for troubleshooting guide.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit pull request

## License

Proprietary - Lumié E-Commerce Platform

## Support

For issues or questions:
- Check documentation files
- Review Supabase docs
- Check GitHub issues

## Roadmap

- [ ] Payment gateway integration
- [ ] Admin dashboard full implementation
- [ ] Advanced analytics
- [ ] Recommendation engine
- [ ] Mobile app
- [ ] Social commerce
- [ ] Live chat support
- [ ] Subscription products

## Credits

Built with React, Vite, Tailwind CSS, and Supabase.

---

**Version**: 1.0.0
**Last Updated**: February 2026
**Status**: Active Development
