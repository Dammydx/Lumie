# Lumié Testing Checklist

## Pre-Launch Testing Guide

### 1. Authentication Testing

#### Sign Up
- [ ] Can create new account with valid email/password
- [ ] Email validation works (rejects invalid emails)
- [ ] Password validation works
- [ ] Password confirmation check works
- [ ] Terms agreement required
- [ ] Error messages display for invalid input
- [ ] Success message displays
- [ ] User is logged in after signup
- [ ] Redirects to home page after signup

#### Login
- [ ] Can log in with valid credentials
- [ ] Error message for invalid email/password
- [ ] "Remember me" functionality works
- [ ] Forgot password link visible
- [ ] Can access account after login
- [ ] Session persists on page refresh
- [ ] Can log out successfully
- [ ] Logged out user cannot access protected pages

#### Account Management
- [ ] Can view profile information
- [ ] Can edit profile (name, phone, avatar)
- [ ] Can manage addresses
- [ ] Can set default address
- [ ] Can delete old addresses
- [ ] Can change password
- [ ] Can reset password via email

---

### 2. Product Browsing Testing

#### Home Page
- [ ] Hero banner displays correctly
- [ ] Categories section visible and clickable
- [ ] New Arrivals section loads
- [ ] Best Sellers section loads
- [ ] Images load quickly
- [ ] Mobile responsive layout works
- [ ] Newsletter signup functional
- [ ] Links to policies work

#### Shop Page
- [ ] Products load correctly
- [ ] Pagination works (next/previous)
- [ ] Products per page displays correctly
- [ ] Mobile filter button appears on small screens
- [ ] Desktop filter sidebar displays

#### Filtering & Sorting
- [ ] Filter by category works
- [ ] Price range filter works
- [ ] Sort by newest works
- [ ] Sort by price (low to high) works
- [ ] Sort by price (high to low) works
- [ ] Sort by rating works
- [ ] URL updates when filters applied
- [ ] Filters reset button works
- [ ] Multiple filters can be combined

#### Search
- [ ] Search returns relevant products
- [ ] Search is case-insensitive
- [ ] Search works for product title and description
- [ ] Search redirects from navbar
- [ ] Search results show count
- [ ] Empty search shows error message

#### Product Details Page
- [ ] Product images display
- [ ] Image gallery carousel works
- [ ] Thumbnail selection changes main image
- [ ] Product title, description visible
- [ ] Price displays correctly
- [ ] Discount price shows (if applicable)
- [ ] Stock status displays
- [ ] Rating and reviews visible
- [ ] Related products show
- [ ] Share buttons present

---

### 3. Product Variants Testing

#### Variant Selection
- [ ] Variant options display for the product type
- [ ] Can select multiple variants (size AND color)
- [ ] Selected variant shows visual confirmation
- [ ] Stock levels update based on variant
- [ ] "Out of stock" shows when variant unavailable
- [ ] Cannot select out of stock variant
- [ ] Additional price for variants shows (if applicable)

#### Quantity Selection
- [ ] Can increase quantity
- [ ] Can decrease quantity
- [ ] Cannot go below 1
- [ ] Cannot exceed available stock
- [ ] Quantity updates correctly

---

### 4. Cart Testing

#### Add to Cart
- [ ] "Add to Cart" button works
- [ ] Success message displays
- [ ] Cart count updates in navbar
- [ ] Can add multiple different products
- [ ] Can add same product with different variants
- [ ] Cart drawer/page shows items

#### Cart Page
- [ ] All items display correctly
- [ ] Item images show
- [ ] Item prices correct
- [ ] Variant selections show
- [ ] Quantities display correctly
- [ ] Can update quantity from cart page
- [ ] Can remove items
- [ ] Can clear entire cart

#### Cart Summary
- [ ] Subtotal calculates correctly
- [ ] Tax (7.5%) calculates correctly
- [ ] Shipping fee shows or "Free" if over ₦50,000
- [ ] Total price correct
- [ ] Updates when quantity changes

#### Coupon Code
- [ ] Can enter coupon code
- [ ] Valid code applies discount
- [ ] Invalid code shows error
- [ ] Expired code shows error
- [ ] Discount amount updates total
- [ ] Limited use coupons enforce limit

---

### 5. Checkout Testing

#### Contact Information
- [ ] First name required
- [ ] Last name required
- [ ] Email pre-fills for logged-in users
- [ ] Email validation works
- [ ] Phone number required
- [ ] Phone format validation (if applicable)

#### Delivery Address
- [ ] Street address required
- [ ] City required
- [ ] State/Province required
- [ ] Postal code optional
- [ ] Country dropdown works
- [ ] Can select saved address for logged-in users
- [ ] Address changes shipping zones correctly

#### Shipping Method
- [ ] Shipping zone options display
- [ ] Delivery time estimates show
- [ ] Shipping fees calculate correctly
- [ ] Free shipping threshold message shows

#### Payment Method
- [ ] Payment method options display
- [ ] Can select Paystack
- [ ] Can select Stripe
- [ ] Can select Flutterwave
- [ ] Payment method selection persists

#### Order Review
- [ ] Order summary shows all items
- [ ] Totals correct
- [ ] Can go back to edit cart
- [ ] Continue button visible

#### Order Confirmation
- [ ] Confirmation page displays after checkout
- [ ] Order number generated
- [ ] Order total correct
- [ ] Shipping address correct
- [ ] Estimated delivery date shows
- [ ] Can track order by order number
- [ ] Email confirmation sent (check email)

---

### 6. Cart Persistence Testing

- [ ] Cart items persist on page refresh
- [ ] Cart persists across different pages
- [ ] Cart clears after successful checkout
- [ ] Cart saved for logged-in users
- [ ] Cart merged when logging in with local cart

---

### 7. Wishlist Testing

- [ ] Can add product to wishlist
- [ ] Success message displays
- [ ] Heart icon updates
- [ ] Can view wishlist page
- [ ] Wishlist shows all saved items
- [ ] Can remove from wishlist
- [ ] Can add wishlist item to cart
- [ ] Wishlist persists for logged-in users

---

### 8. Reviews Testing

- [ ] Can see product reviews
- [ ] Stars display correctly
- [ ] Can filter by rating
- [ ] Can submit review (if logged in)
- [ ] Review submission works
- [ ] Average rating updates
- [ ] Can read multiple reviews
- [ ] Review page responsive

---

### 9. Responsive Design Testing

#### Mobile (iPhone 12)
- [ ] Layout adjusts properly
- [ ] Navigation menu works
- [ ] Images load correctly
- [ ] Forms are usable
- [ ] Buttons are large enough
- [ ] No horizontal scrolling
- [ ] Touch interactions work

#### Tablet (iPad)
- [ ] All features functional
- [ ] Layout optimized for tablet
- [ ] Touch interactions work
- [ ] Images scale properly

#### Desktop (1920x1080)
- [ ] All features functional
- [ ] Layout uses full width
- [ ] Sidebar displays
- [ ] Mouse interactions work

---

### 10. Performance Testing

#### Load Times
- [ ] Home page loads in < 3 seconds
- [ ] Shop page loads in < 4 seconds
- [ ] Product details load in < 3 seconds
- [ ] Cart page loads instantly
- [ ] Images lazy load below fold

#### Network Throttling
- [ ] Works on slow 3G connection
- [ ] Loading skeletons display
- [ ] App responsive despite slow network
- [ ] Images still load (with lag)

---

### 11. Information Pages Testing

- [ ] About Us page loads correctly
- [ ] Contact Us page functional
  - [ ] Form validates
  - [ ] Form submission works
  - [ ] Contact info displays
- [ ] FAQ page loads correctly
  - [ ] Categories work
  - [ ] Accordion expands/collapses
- [ ] Privacy Policy readable
- [ ] Terms & Conditions readable

---

### 12. Error Handling Testing

#### Network Errors
- [ ] Error message on connection failure
- [ ] Retry button works
- [ ] Timeout handled gracefully

#### Validation Errors
- [ ] Empty fields rejected
- [ ] Invalid email rejected
- [ ] Invalid phone rejected
- [ ] Error messages helpful

#### 404 Errors
- [ ] Non-existent product 404
- [ ] Non-existent page 404
- [ ] Can navigate home from 404

---

### 13. Admin Testing (Basic)

#### Admin Access
- [ ] Admin user can access /admin
- [ ] Non-admin users blocked from /admin
- [ ] Admin dashboard loads

---

### 14. Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome (Android)

---

### 15. Security Testing

#### HTTPS
- [ ] All pages served over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid

#### Authentication
- [ ] Passwords hashed (not visible)
- [ ] Session tokens secure
- [ ] CSRF tokens present
- [ ] No sensitive data in localStorage except cart

#### XSS Protection
- [ ] User input sanitized
- [ ] Scripts in comments not executed
- [ ] Special characters handled

---

### 16. Accessibility Testing

- [ ] Color contrast sufficient
- [ ] Images have alt text
- [ ] Form labels present
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] No keyboard traps

---

## Test Results

| Section | Status | Notes |
|---------|--------|-------|
| Authentication | ⬜ | |
| Product Browsing | ⬜ | |
| Variants | ⬜ | |
| Cart | ⬜ | |
| Checkout | ⬜ | |
| Wishlist | ⬜ | |
| Reviews | ⬜ | |
| Responsive | ⬜ | |
| Performance | ⬜ | |
| Pages | ⬜ | |
| Errors | ⬜ | |
| Admin | ⬜ | |
| Security | ⬜ | |
| Accessibility | ⬜ | |

**Legend**: ⬜ Not Started | 🟨 In Progress | ✅ Passed | ❌ Failed

---

## Known Issues / To Do

- [ ] Payment integration not yet implemented (test endpoint available)
- [ ] Admin dashboard pages to be completed
- [ ] Email notifications not yet configured
- [ ] Analytics not yet implemented
- [ ] Image optimization pending
- [ ] SEO metadata to be added

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Product Manager | | | |
| Developer | | | |
| CEO/Founder | | | |

---

**Testing Date**: ___________
**Build Version**: 1.0.0
**Test Environment**: Production Ready
