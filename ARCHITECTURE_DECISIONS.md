# Architecture Decision Records (ADR)

## ADR-001: Framework Choice - React + Vite

**Status**: Accepted ✅

### Context
Need to build a fast, modern e-commerce frontend that supports complex features like filtering, state management, and real-time cart updates.

### Decision
Use React 18 with Vite as the build tool instead of Next.js or Vue.

### Rationale
- **React**: Industry standard with largest ecosystem, excellent Tailwind CSS support, easiest to find developers
- **Vite**: ~10x faster than Webpack, instant HMR (hot module replacement), native ES modules
- **Not Next.js**: Supabase doesn't require server-side rendering; adds complexity
- **Not Vue**: React has better TypeScript support and larger ecosystem

### Consequences
✅ Fast development experience
✅ Excellent library support
✅ Easy component reusability
⚠️ Client-side rendering only (SEO needs meta tags)
⚠️ Larger initial bundle (mitigated by code splitting)

---

## ADR-002: State Management - Zustand

**Status**: Accepted ✅

### Context
Need lightweight, zero-boilerplate state management for cart and authentication.

### Decision
Use Zustand instead of Redux, Context API, or Recoil.

### Rationale
- **Bundle size**: ~2KB vs Redux (~40KB)
- **Learning curve**: Simple function-based API
- **Type safety**: Excellent TypeScript support
- **Performance**: Automatic re-render optimization
- **Simplicity**: No providers, no actions, no selectors

### Consequences
✅ Minimal bundle size
✅ Easy to understand and maintain
✅ No prop drilling
⚠️ Less suitable for massive state trees (not relevant here)
⚠️ Smaller ecosystem than Redux (sufficient for our needs)

---

## ADR-003: Database - Supabase (PostgreSQL)

**Status**: Accepted ✅

### Context
Need a backend database, authentication, and storage without managing servers.

### Decision
Use Supabase (PostgreSQL + Auth + Storage) instead of Firebase or custom backend.

### Rationale
- **PostgreSQL**: More powerful than Firebase's Firestore
- **RLS Policies**: Row-level security at database level (better than app-level permission checks)
- **Supabase Auth**: Built-in Supabase integration, JWT tokens
- **Storage**: Image/file storage without separate S3
- **Cost**: Generous free tier, pay-as-you-go
- **SQL**: Familiarity and power of SQL

### Consequences
✅ Type-safe with PostgreSQL schema
✅ Serverless, no DevOps needed
✅ Integrated auth solution
✅ Real-time capabilities available
⚠️ Cannot access outside Supabase ecosystem (migrations tied to Supabase)
⚠️ Limited to geographic regions Supabase supports

---

## ADR-004: Styling - Tailwind CSS

**Status**: Accepted ✅

### Context
Need a styling solution that enables rapid development and maintains consistency.

### Decision
Use Tailwind CSS instead of styled-components, CSS modules, or plain CSS.

### Rationale
- **Development speed**: Utility-first classes are faster than writing CSS
- **Consistency**: Design tokens ensure visual consistency
- **Bundle size**: Only includes used classes (PurgeCSS)
- **Responsive**: Builtin breakpoints (sm, md, lg, xl)
- **Components**: Can build reusable components on top

### Consequences
✅ Fast iteration
✅ Smaller CSS bundle
✅ Consistent design across app
⚠️ Markup can be verbose
⚠️ Learning curve for utility-first approach

---

## ADR-005: Routing - React Router v6

**Status**: Accepted ✅

### Context
Need client-side routing for 30+ pages with nested routes and protected route support.

### Decision
Use React Router v6 instead of TanStack Router or Remix.

### Rationale
- **Industry standard**: Most React apps use React Router
- **v6**: Modern API with hooks support
- **Features**: Lazy loading, error boundaries, protected routes
- **Ecosystem**: Largest third-party library support
- **Client-side**: No server needed for routing

### Consequences
✅ Familiar to most React developers
✅ Excellent route protection patterns
✅ Easy to implement 404 pages
⚠️ No SEO benefits without additional tooling
⚠️ URL-based navigation doesn't support authentication state in URL

---

## ADR-006: Form Handling - React Hook Form

**Status**: Accepted ✅

### Context
Need form state management for checkout, login, registration with validation.

### Decision
Use React Hook Form instead of Formik or managing state manually.

### Rationale
- **Performance**: Minimal re-renders through uncontrolled components
- **Bundle size**: ~9KB vs Formik's ~15KB
- **DevX**: Simple hooks-based API
- **Validation**: Works with multiple validation libraries (Zod, Yup)
- **Type-safe**: Excellent TypeScript support

### Consequences
✅ Fast form performance
✅ Small bundle size
✅ Easy integration with validation
⚠️ Slightly different mental model than Formik
⚠️ Need separate validation library (we chose Zod)

---

## ADR-007: Data Validation - Schema Validation on Client

**Status**: Accepted ✅

### Context
Need form validation before server submission.

### Decision
Implement client-side validation with schema validation (Zod) in services.

### Rationale
- **UX**: Immediate feedback to users
- **Performance**: No round-trip to server
- **Type safety**: Zod provides TypeScript inference
- **Reusable**: Same schema for client and server validation (planned)

### Consequences
✅ Better user experience
✅ Reduced server load
⚠️ Still need server-side validation (security)
⚠️ Clients can bypass (not a security issue if server validates)

---

## ADR-008: Payment Processing - Multiple Gateway Support

**Status**: Proposed 🔄

### Context
Need payment processing for Nigerian market + global fallback.

### Decision
Support Paystack (primary), Stripe (secondary), Flutterwave (alternative) with adapter pattern.

### Rationale
- **Paystack**: Dominant in Nigeria, low fees, easy integration
- **Stripe**: Global reach, trusted, handles international cards
- **Flutterwave**: Pan-African alternative, good for African customers
- **Adapter pattern**: Easy to switch providers, supports multiple simultaneous

### Consequences
✅ Covers all major Nigerian payment methods
✅ Global payment support
✅ Easy to switch or add providers
⚠️ Need to integrate 3 payment SDKs
⚠️ Need webhook handlers for all 3
⚠️ More testing required

---

## ADR-009: Image Storage - Supabase Storage

**Status**: Accepted ✅

### Context
Need to store product images, banners, and user avatars.

### Decision
Use Supabase Storage instead of external S3 or CDN.

### Rationale
- **Integration**: Same Supabase account, unified credentials
- **RLS**: Can apply row-level security to storage
- **Cost**: Included in Supabase pricing
- **Simplicity**: No separate AWS/CloudFlare account needed

### Consequences
✅ Simplified infrastructure
✅ Unified authentication
⚠️ Geographic limitations (must match Supabase region)
⚠️ No built-in CDN (need to add CloudFlare separately)

---

## ADR-010: Authentication - Supabase Auth (JWT)

**Status**: Accepted ✅

### Context
Need secure user authentication without building login system from scratch.

### Decision
Use Supabase Auth instead of Auth0, Firebase Auth, or custom implementation.

### Rationale
- **Built-in**: Comes with Supabase
- **JWT**: Stateless, works well with serverless
- **Social**: Easy integration with Google, GitHub, Facebook
- **Email verification**: Built-in email verification flow
- **Password reset**: Integrated password reset flow

### Consequences
✅ Reduces development time
✅ Industry-standard security
✅ Easy to implement social auth later
⚠️ Tied to Supabase ecosystem
⚠️ Cannot self-host (depends on Supabase)

---

## ADR-011: Database Schema - Normalized Design

**Status**: Accepted ✅

### Context
Need database schema that supports product variants, pricing, inventory, and orders.

### Decision
Use normalized relational design (3NF) with separate tables for variants, images, orders, and line items.

### Rationale
- **Data integrity**: Enforced through foreign keys
- **Flexibility**: Easy to add variants/images without modifying products
- **Performance**: Proper indexing on frequent queries
- **Scalability**: Can handle millions of products

### Consequences
✅ Type-safe with schema
✅ Data consistency guaranteed
✅ Good query performance with proper indexing
⚠️ More complex than document databases
⚠️ Requires joins for product queries (minor performance impact)

---

## ADR-012: RLS Policies - Row-Level Security

**Status**: Accepted ✅

### Context
Need to prevent users from accessing other users' orders, wishlists, addresses.

### Decision
Implement Row-Level Security (RLS) policies in PostgreSQL instead of enforcing in application code.

### Rationale
- **Security**: Cannot be bypassed from application
- **Consistency**: Works for all API clients
- **Performance**: Filtering happens at database level
- **Admin access**: Easy to create admin override policies

### Consequences
✅ Database-level security
✅ Cannot be bypassed
✅ Reduces application complexity
⚠️ Requires understanding of RLS policies
⚠️ Debugging can be complex

---

## ADR-013: API Strategy - Serverless Supabase + REST

**Status**: Accepted ✅

### Context
Need API layer for frontend to communicate with database.

### Decision
Use Supabase REST API and generated JavaScript client instead of custom backend.

### Rationale
- **No backend needed**: Supabase provides instant REST API
- **Type-safe**: Can generate types from schema
- **Auto-scaling**: Serverless, handles traffic spikes
- **Cost**: Includes in Supabase pricing
- **Future**: Can add custom backend (Edge Functions) later

### Consequences
✅ No backend development needed
✅ Instant API without code
✅ Scales automatically
⚠️ Limited to Supabase queries (custom logic via Edge Functions)
⚠️ All business logic must be in frontend or database triggers

---

## ADR-014: Deployment - Vercel

**Status**: Accepted ✅

### Context
Need fast, reliable frontend hosting with easy deployments.

### Decision
Use Vercel as primary deployment with Netlify as fallback option.

### Rationale
- **Speed**: Optimized for React and Next.js patterns
- **CI/CD**: Automatic deployments on git push
- **Analytics**: Built-in performance monitoring
- **Edge Functions**: Can run serverless code globally
- **Reliability**: 99.99% uptime SLA

### Consequences
✅ Simple deployment process
✅ Fast global content delivery
✅ Good free tier for small projects
⚠️ Vendor lock-in (tied to Vercel)
⚠️ Cost scales with usage

---

## ADR-015: Component Architecture - Atomic Design

**Status**: Accepted ✅

### Context
Need well-organized component structure for maintainability and reusability.

### Decision
Use atomic design pattern with atoms (Button, Input), molecules (ProductCard), and organisms (ProductGrid, Layout).

### Rationale
- **Reusability**: Components can be composed together
- **Maintainability**: Clear separation of concerns
- **Testability**: Small components are easier to test
- **Scalability**: Easy to add new features

### Consequences
✅ Consistent component structure
✅ Easy to find components
✅ Reduces code duplication
⚠️ More files overall
⚠️ Requires discipline to keep structure clean

---

## ADR-016: Internationalization (i18n) - Planned for Future

**Status**: Deferred 🔄

### Context
App is launching in Nigeria, but may expand to other countries.

### Decision
Not implementing i18n at launch, plan to add later if needed.

### Rationale
- **Current**: All content in English, users are primarily English-speaking
- **Complexity**: i18n adds significant complexity
- **Delayed**: Can be added later without major refactoring
- **Cost**: Not essential for MVP

### Consequences
✅ Faster initial development
✅ Simpler codebase
⚠️ Will need refactoring when implementing i18n
⚠️ Not accessible to non-English speakers currently

---

## ADR-017: Testing Strategy - Manual for MVP

**Status**: Accepted ✅

### Context
Need to ensure quality before launch without spending too much time on automation.

### Decision
Use manual testing checklist for MVP, plan to add automated tests (vitest/Cypress) later.

### Rationale
- **MVP Focus**: Getting to market quickly is higher priority
- **Comprehensive**: Created detailed testing checklist
- **Cost**: Automation costs time upfront, manual testing faster for MVP
- **Team Size**: Small team can manually test efficiently

### Consequences
✅ Faster time to launch
⚠️ Risk of undetected bugs
⚠️ Manual testing doesn't scale
⚠️ Will need automated tests for future updates

---

## ADR-018: Error Handling - Graceful Degradation

**Status**: Accepted ✅

### Context
App depends on Supabase; network failures can occur.

### Decision
Implement error boundaries, fallback UI, and retry logic instead of showing raw errors.

### Rationale
- **UX**: Users see helpful messages, not technical errors
- **Recovery**: Retry buttons help with temporary failures
- **Logging**: Errors are logged for debugging

### Consequences
✅ Better user experience
✅ Easier to debug
⚠️ May hide real issues initially
⚠️ Need comprehensive error logging

---

## ADR-019: Mobile-First Design - Tailwind Breakpoints

**Status**: Accepted ✅

### Context
Users browse from smartphones, tablets, and desktops.

### Decision
Use mobile-first design—style for mobile, then add breakpoints (sm, md, lg, xl) for larger screens.

### Rationale
- **Performance**: Mobile users have slower connections
- **Simplicity**: Simpler CSS than desktop-first
- **Future**: Mobile is growing, safer to prioritize

### Consequences
✅ Better mobile experience
✅ Simpler maintenance
⚠️ Need to test on all devices
⚠️ Some features may not scale to desktop perfectly

---

## ADR-020: Environment Configuration - .env.local

**Status**: Accepted ✅

### Context
Need to manage different configurations for dev, staging, production.

### Decision
Use `.env.example` template with `.env.local` for local overrides (not committed).

### Rationale
- **Security**: Secrets never committed to git
- **Simplicity**: No complex configuration management
- **Standard**: Industry-standard approach with Vite

### Consequences
✅ Secrets are protected
✅ Easy to set up
⚠️ Must remember to update .env locally
⚠️ No environment-specific defaults (manual override needed)

---

## Future ADR Topics to Consider

1. **ADR-021**: Real-time updates (WebSockets vs polling)
2. **ADR-022**: Search strategy (full-text search vs Elasticsearch)
3. **ADR-023**: Caching strategy (in-memory vs Redis)
4. **ADR-024**: Recommendation engine approach
5. **ADR-025**: Analytics platform (GA4 vs Mixpanel vs custom)
6. **ADR-026**: Email service (Mailgun vs SendGrid vs AWS SES)
7. **ADR-027**: Image optimization (Cloudinary vs On-device)
8. **ADR-028**: Error tracking (Sentry vs LogRocket vs custom)
9. **ADR-029**: Feature flags (LaunchDarkly vs custom)
10. **ADR-030**: Monitoring & alerting strategy

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 2026 | Dev Team | Initial ADRs 1-20 |
| | | | |

---

## How to Use This Document

1. **For new developers**: Read ADRs to understand why we made certain choices
2. **For architecture decisions**: Follow the same format when making new decisions
3. **For refactoring**: Check if ADR exists before proposing changes to major components
4. **For maintenance**: Update ADRs when architecture changes

---

**Last Updated**: February 2026
**Maintainer**: Development Team
**Status**: Active
