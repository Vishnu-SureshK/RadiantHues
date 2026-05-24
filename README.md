# Radiant Hues

Production-ready Next.js rebuild for `radianthues.com`.

## Getting started

1. Install dependencies:
   - `npm install`
2. Set environment variables:
   - Copy `.env.example` to `.env.local`
3. Run development server:
   - `npm run dev`

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks

## Deployment (Vercel)

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Set environment variables in Vercel:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (optional)
4. Set custom domain to `radianthues.com` and add DNS records from Vercel.
5. Verify HTTPS and form submissions in production.
