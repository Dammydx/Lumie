# Lumié Developer Quick Reference Guide

## 🚀 First Day Checklist

- [ ] Clone repo: `git clone <repo>`
- [ ] Install dependencies: `npm install`
- [ ] Copy env: `cp .env.example .env.local`
- [ ] Get Supabase credentials (ask team lead)
- [ ] Fill in `.env.local` with credentials
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:5173
- [ ] Test homepage loads
- [ ] Read through this guide

---

## 📁 Project Structure Reference

```
src/
├── components/
│   ├── layout/          → Navbar, Footer, Layout wrapper
│   ├── common/          → Button, Toast, Breadcrumbs, LoadingSkeleton
│   ├── products/        → ProductCard, ProductGrid
│   ├── cart/            → (To build) Cart components
│   ├── checkout/        → (To build) Checkout components
│   ├── account/         → (To build) Account components
│   └── admin/           → (To build) Admin components
├── pages/               → Full page components (17 files)
├── store/               → Zustand state (cart, auth)
├── services/            → API calls (6 files)
├── types/               → TypeScript interfaces
├── config/              → Configuration (Supabase)
└── hooks/               → (To add) Custom React hooks
```

---

## 🔑 Key Files & Their Purpose

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/App.tsx` | Route definitions | Adding new pages |
| `src/types/index.ts` | All TypeScript types | Adding new data structures |
| `src/store/cartStore.ts` | Cart state | Modifying cart behavior |
| `src/store/authStore.ts` | Auth state | Modifying auth logic |
| `src/services/*.ts` | API calls to Supabase | Adding new API features |
| `src/pages/HomePage.tsx` | Home page | Changing homepage content |
| `src/components/layout/Navbar.tsx` | Top navigation | Changing navigation menu |
| `.env.example` | Template | Document new env vars |
| `SUPABASE_SCHEMA.sql` | Database structure | Database schema changes |

---

## 🛠️ Common Development Tasks

### Adding a New Page

1. **Create page file** in `src/pages/`:
```typescript
import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function NewPage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'New Page' }
          ]} />
          {/* Content here */}
        </div>
      </div>
    </Layout>
  )
}
```

2. **Import in App.tsx**:
```typescript
import NewPage from './pages/NewPage'
```

3. **Add route in App.tsx** inside `<Routes>`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Component

1. **Create component file** in appropriate folder:
```typescript
import React from 'react'

interface MyComponentProps {
  title: string
  isActive?: boolean
}

export default function MyComponent({ title, isActive }: MyComponentProps) {
  return <div>{title}</div>
}
```

2. **Export from index** (if using index files):
```typescript
// components/common/index.ts
export { default as MyComponent } from './MyComponent'
```

3. **Import and use**:
```typescript
import MyComponent from '../components/common/MyComponent'
```

### Adding a New Store (Zustand)

```typescript
// src/store/exampleStore.ts
import { create } from 'zustand'

interface ExampleStore {
  count: number
  increment: () => void
  decrement: () => void
}

export const useExampleStore = create<ExampleStore>((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 }))
}))
```

### Adding a New Service

```typescript
// src/services/exampleService.ts
import { supabase } from '../config/supabase'

export const exampleService = {
  async fetchData() {
    try {
      const { data, error } = await supabase
        .from('table_name')
        .select('*')
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },

  async createData(payload: any) {
    const { data, error } = await supabase
      .from('table_name')
      .insert([payload])
    
    if (error) throw error
    return data[0]
  }
}
```

### Using the Cart Store

```typescript
import { useCartStore } from '../store/cartStore'

export default function ProductCard({ product }) {
  const addToCart = useCartStore(state => state.addToCart)
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      variants: { size: 'M' }
    })
  }

  return <button onClick={handleAddToCart}>Add to Cart</button>
}
```

### Using the Auth Store

```typescript
import { useAuthStore } from '../store/authStore'

export default function UserMenu() {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const logout = useAuthStore(state => state.logout)

  if (!isAuthenticated) return <div>Please log in</div>

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Fetching Data from Supabase

```typescript
import { useEffect, useState } from 'react'
import { productService } from '../services/productService'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(1, 10)
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  )
}
```

---

## 🎨 Styling Guidelines

### Using Tailwind Classes

```typescript
// Responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Stack on mobile, half width on tablet, third on desktop */}
</div>

// Hover states
<button className="bg-purple-600 hover:bg-purple-700 transition-colors">
  Click me
</button>

// Spacing
<div className="px-4 py-8 md:px-8 md:py-12">
  {/* Mobile: 4px horizontal, 8px vertical */}
  {/* Desktop: 8px horizontal, 12px vertical */}
</div>
```

### Color Palette

```
Primary Purple: #9333ea (bg-purple-600)
Secondary Pink: #ec4899 (bg-pink-500)
Gray: #6b7280 (bg-gray-500)
Red: #ef4444 (bg-red-500)
Green: #10b981 (bg-green-500)
```

---

## 🔐 Authentication Flow

```
1. User visits /register
   ↓
2. Submits form with email, password, name
   ↓
3. authService.signup() called
   ↓
4. Supabase creates user + profile
   ↓
5. useAuthStore.setUser() called
   ↓
6. Redirect to home (authenticated)
```

### Protected Routes Pattern

```typescript
// Example: Check auth before loading account page
export default function AccountPage() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? <div>Account content</div> : null
}
```

---

## 📝 Common Code Patterns

### Pattern 1: Fetch Data with Loading State

```typescript
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  (async () => {
    try {
      const result = await service.fetch()
      setData(result)
    } finally {
      setLoading(false)
    }
  })()
}, [])
```

### Pattern 2: Form with Validation

```typescript
import { useForm } from 'react-hook-form'

const { register, handleSubmit, formState: { errors } } = useForm({
  defaultValues: { email: '', password: '' }
})

const onSubmit = async (data) => {
  try {
    await authService.login(data.email, data.password)
  } catch (error) {
    console.error(error)
  }
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('email', { required: true })} />
    {errors.email && <span>Email required</span>}
    <button type="submit">Login</button>
  </form>
)
```

### Pattern 3: Using Button Component

```typescript
import Button from '../components/common/Button'

<Button 
  variant="primary" 
  size="md"
  onClick={handleClick}
  loading={isLoading}
  disabled={isDisabled}
>
  Click me
</Button>
```

---

## 🐛 Debugging Tips

### 1. Check Supabase Connection
```typescript
import { supabase } from '../config/supabase'

// In browser console:
// supabase.auth.getSession().then(console.log)
```

### 2. View Network Requests
- Right-click → Inspect → Network tab
- Filter by "Fetch/XHR"
- Look for requests to "api.supabase.co"

### 3. Check State in Browser
Install Redux DevTools (works with Zustand):
- Open DevTools → Redux tab
- See all state changes in real-time

### 4. Console Debugging
```typescript
console.table(array)        // Nice table format
console.log({ data })       // Shows variable name
console.time('label')       // Measure performance
console.timeEnd('label')    // End measurement
```

### 5. Supabase Logs
- Go to Supabase dashboard
- Logs → Realtime
- See all database calls

---

## 📦 Dependency Guide

| Package | Version | Purpose | Docs |
|---------|---------|---------|------|
| react | 18.3.1 | UI library | https://react.dev |
| vite | 5.0.8 | Build tool | https://vitejs.dev |
| react-router-dom | 6.20.0 | Routing | https://reactrouter.com |
| zustand | 4.4.1 | State mgmt | https://github.com/pmndrs/zustand |
| tailwindcss | 3.4.1 | Styling | https://tailwindcss.com |
| lucide-react | 0.344.0 | Icons | https://lucide.dev |
| react-hook-form | 7.50.0 | Forms | https://react-hook-form.com |
| @supabase/supabase-js | Latest | Backend | https://supabase.com/docs |

---

## ✅ Checklist Before Pushing Code

- [ ] Code follows project structure
- [ ] TypeScript has no errors
- [ ] All imports are correct
- [ ] Component is responsive (check mobile)
- [ ] No console errors or warnings
- [ ] Added proper error handling
- [ ] Tested on Chrome and Firefox
- [ ] Used existing components where possible
- [ ] Updated types if needed
- [ ] Wrote meaningful commit message

---

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module 'App'` | Wrong import path | Check exact path in file explorer |
| `TypeError: Cannot read property 'id'` | Null/undefined value | Add null check: `product?.id` |
| `ReferenceError: supabase is not defined` | Missing import | `import { supabase } from '../config/supabase'` |
| `Type 'any' is not assignable to type 'Product'` | Type mismatch | Check interface matches data |
| `Module not found: 'zustand'` | Dependency not installed | Run `npm install` |
| `'_' is not defined` | Lodash not imported | Remove underscore or install lodash |
| `CORS error` | Wrong Supabase URL | Check `.env.local` credentials |

---

## 📚 Learning Resources

**React**:
- Official React docs: https://react.dev
- React Patterns: https://react-patterns.com
- Hooks guide: https://react.dev/reference/react

**Supabase**:
- Getting started: https://supabase.com/docs
- SQL queries: https://supabase.com/docs/guides/database
- Authentication: https://supabase.com/docs/guides/auth

**TypeScript**:
- Handbook: https://www.typescriptlang.org/docs/
- Types cheatsheet: https://www.typescriptlang.org/cheatsheets/

**Tailwind CSS**:
- Official docs: https://tailwindcss.com/docs
- IntelliSense: Install Tailwind CSS IntelliSense VS Code extension

**Git**:
- Basic commands: https://git-scm.com/book/en/v2
- Branching: https://git-scm.com/book/en/v2/Git-Branching

---

## 🤝 Team Conventions

### Naming Conventions
- **Files**: `PascalCase.tsx` (components), `camelCase.ts` (utils/services)
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces**: `PascalCase`, prefix with `I` (optional): `IProduct`

### Commit Messages
```
Good:   "Add product filter by category"
Good:   "Fix cart total calculation bug"
Bad:    "update"
Bad:    "fix stuff"

Format: "[Type] Description"
Types:  feat, fix, refactor, docs, style,
        perf, test, chore
```

### Code Review Checklist
- Code is readable and follows conventions
- No unused imports or variables
- TypeScript types are correct
- Error handling is present
- Component is reusable if possible
- Tests pass (when available)
- Documentation updated if needed

### Git Workflow
```bash
# Create feature branch
git checkout -b feat/add-product-filter

# Make changes and commit
git add .
git commit -m "feat: Add product filter by category"

# Push and create PR
git push origin feat/add-product-filter

# After approval, merge and delete branch
```

---

## 💡 Pro Tips

1. **VSCode Extensions**: Install Tailwind CSS IntelliSense, TypeScript Vue Plugin
2. **Keyboard Shortcuts**: Learn Vite HMR works - save file and see changes instantly
3. **React DevTools**: Install React DevTools browser extension for debugging
4. **Responsive Design**: Develop mobile-first, test on real devices
5. **Performance**: Use Chrome DevTools Lighthouse for performance audits
6. **Type Safety**: Let TypeScript catch errors - don't use `any`
7. **Component Props**: Destructure with typing for cleaner code
8. **Accessibility**: Add alt text to images, proper label for inputs

---

## 📞 Getting Help

1. **Check repo docs**: README.md, SETUP_GUIDE.md, DEPLOYMENT_GUIDE.md
2. **Search codebase**: Look for similar patterns in existing code
3. **Check Supabase docs**: Most questions answered there
4. **Ask team lead**: For architecture decisions or blockers
5. **Check this guide**: Scroll up—the answer might be here!

---

## 🎯 Your First Task

1. Set up local environment (follow checklist above)
2. Read through SETUP_GUIDE.md
3. Explore project structure with code editor
4. Try adding a simple component
5. Pull a task from your backlog
6. Make your first contribution! 🚀

---

**Last Updated**: February 2026
**For questions**: See team lead or check documentation
