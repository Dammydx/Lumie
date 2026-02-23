# Lumié E-Commerce Platform - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### 3. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `SUPABASE_SCHEMA.sql`
4. Run the SQL to create all tables and policies

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Navbar, Footer, Layout
│   ├── common/          # Toast, Button, Loading, etc
│   ├── products/        # Product cards, grids
│   ├── cart/            # Cart components
│   ├── checkout/        # Checkout components
│   ├── account/         # Account components
│   └── admin/           # Admin dashboard components
├── pages/               # Page components
├── store/               # Zustand stores (cart, auth)
├── services/            # API services
├── types/               # TypeScript types
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── config/              # Configuration files
└── styles/              # Global styles
```

---

## Database Schema

### Core Tables
- **users** - Supabase Auth users
- **profiles** - Extended user information
- **categories** - Product categories
- **products** - Product listings
- **product_variants** - Product sizes, colors, shades
- **product_images** - Product images
- **orders** - Customer orders
- **order_items** - Items in an order
- **addresses** - Shipping/billing addresses
- **wishlists** - User wishlists
- **reviews** - Product reviews
- **coupons** - Discount coupons
- **shipping_zones** - Shipping fees by location
- **contact_messages** - Contact form submissions

---

## Authentication

### Sign Up / Login
Users can create accounts through the `/register` page. Authentication is handled by Supabase Auth.

### Admin Setup
To create an admin user:

1. Create a regular user account
2. Go to your Supabase dashboard
3. In the `profiles` table, find the user's row
4. Change the `role` from `customer` to `admin`

---

## Product Management

### Adding Products
1. Go to Admin Dashboard
2. Click on Products Manager
3. Fill in:
   - Title, description
   - Category
   - Price and discount pricing
   - SKU (unique identifier)
   - Stock quantity
   - Images
   - Variants (sizes, colors, etc.)

### Product Variants
Each product can have multiple variants:
- **Fashion**: Sizes (S/M/L/XL), Colors
- **Jewelry**: Ring sizes, Materials, Colors
- **Beauty**: Shades, Volume/Weight, Skin types

---

## Cart Management

The cart is managed client-side using Zustand and localStorage. When users add items:

1. Items are stored in the Zustand cart store
2. Cart persists across page refreshes
3. Items can be updated or removed
4. Cart is cleared after successful checkout

---

## Checkout & Orders

### Checkout Flow
1. **Contact Information** - Name, email, phone
2. **Delivery Address** - Street, city, state, country
3. **Payment Method** - Choose payment provider
4. **Order Summary** - Review cart items and total

### Payment Integration
Currently configured for:
- Paystack (Nigeria)
- Stripe (Global)
- Flutterwave (Africa)

To implement payments:
1. Install payment provider SDK: `npm install @paystack/inline-js` (example)
2. Add API keys to environment variables
3. Implement payment handler in checkout page
4. Handle payment callback to update order status

### Order Management
Orders can be tracked by customers via:
- Order ID
- Order number (provided at checkout)
- Email address

---

## Shipping & Delivery

### Shipping Fees
- Configure shipping zones in Admin Dashboard
- Set base fees per location
- Enable free shipping over certain amounts
- Set estimated delivery times

### Order Status
Orders progress through:
- `pending` - Awaiting payment
- `processing` - Payment confirmed, preparing shipment
- `shipped` - Item dispatched
- `delivered` - Item received
- `cancelled` - Order cancelled

---

## Coupons & Discounts

### Creating Coupons
1. Go to Admin Dashboard → Discounts & Coupons
2. Create coupon with:
   - Unique code
   - Discount type (percentage or fixed amount)
   - Minimum purchase requirement
   - Expiration date
   - Usage limits

### Applying Coupons
Customers can enter coupon code during checkout to receive discount.

---

## Security

### Row Level Security (RLS)
- Users can only view their own orders, addresses, and wishlists
- Anonymous users can view published products
- Admin users have full access
- All policies are defined in `SUPABASE_SCHEMA.sql`

### Protected Routes
- Admin routes require `role = 'admin'`
- Account routes require authentication
- Checkout requires email (guest or logged in)

---

## Email Notifications

Set up email notifications using:
- Supabase Email (default)
- SendGrid
- Mailgun
- Or custom SMTP

Configure in your Supabase dashboard under Settings → Email templates.

---

## Image Storage

### Upload Images
1. Use Supabase Storage buckets:
   - `product-images` - Product photos
   - `banners` - Homepage banners
   - `blog-images` - Blog post images (optional)

2. Configure bucket policies in Supabase Dashboard
3. Images are served via Supabase CDN

### Image Optimization
- Compress images before upload (target: max 2MB)
- Use modern formats (WebP with JPEG fallback)
- Implement lazy loading with Intersection Observer

---

## Search & Filters

### Available Filters
- Category
- Price range
- Colors
- Sizes
- Availability (in stock)
- Rating
- Search by title/description

### Sorting Options
- Newest
- Price: Low to High
- Price: High to Low
- Best selling
- Top rated

---

## Reviews & Ratings

### Customer Reviews
- Only verified buyers can leave reviews
- Reviews are moderated
- Display rating and count on product
- Average rating calculated automatically

### Managing Reviews
Admin can:
- Approve/reject reviews
- Delete inappropriate reviews
- Pin helpful reviews
- Respond to reviews (optional)

---

## Analytics

### Dashboard Metrics
- Total orders and revenue
- Monthly revenue chart
- Top selling products
- Customer count
- Low stock alerts
- Pending orders

---

## Internationalization (Optional)

The platform is currently set for Nigeria (NGN currency).

To add more regions:
1. Add currency to types
2. Add shipping zones for each region
3. Add language translations (i18n)
4. Configure tax rates per region

---

## Performance Optimization

### Implemented
- Code splitting with React Router
- Lazy loading images
- Skeleton loading states
- Zustand for efficient state management
- Tailwind CSS for small bundle size

### Recommended
- Image CDN optimization
- Database query optimization
- Caching strategy for products
- API rate limiting
- SEO optimization with meta tags

---

## Troubleshooting

### Products not loading
- Check Supabase connection
- Verify RLS policies are correct
- Check product status is 'active'

### Cart not persisting
- Check browser localStorage is enabled
- Verify Zustand store is initialized

### Payment failing
- Verify API keys are correct
- Check payment gateway account status
- Review payment logs in provider dashboard

### Images not displaying
- Verify bucket exists in Supabase Storage
- Check image URLs are publicly accessible
- Check bucket policies allow public read access

---

## Building for Production

### Build Optimized Bundle
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

---

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **React Router**: https://reactrouter.com/en/main
- **Zustand**: https://github.com/pmndrs/zustand
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## Next Steps

1. ✅ Set up Supabase
2. ✅ Install dependencies
3. ✅ Configure environment variables
4. 🔄 Add payment integration
5. 🔄 Implement admin pages fully
6. 🔄 Set up email notifications
7. 🔄 Deploy to production
8. 🔄 Add SEO optimization
9. 🔄 Set up monitoring/analytics
10. 🔄 Create admin user guide
