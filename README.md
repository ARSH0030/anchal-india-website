# Anchal India website

Production marketing and RFQ website for Anchal India, built with Next.js 16 and deployed on Vercel.

## Requirements

- Node.js 22.13 or newer
- pnpm 11.25.0

## Local development

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Environment variables

The public pages build without secrets. RFQ email delivery requires:

- `RESEND_API_KEY`: Resend server API key
- `RFQ_FROM_EMAIL`: verified sender, for example `Anchal India <rfq@anchalpiston.com>`
- `RFQ_TO_EMAIL`: destination inbox; defaults to `info@anchalpiston.com`

Copy `.env.example` to `.env.local` for local testing. Never commit real secrets.

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm test
```

`pnpm test` creates a production build and verifies public routes, redirects, security headers, query-context retention, and invalid RFQ handling.

## Deployment

Vercel should use:

- Framework preset: Next.js
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Production branch: `main`
- Node.js: 22.x

Add the RFQ environment variables to Production and Preview environments before launch. After deployment, submit a real test RFQ with a small attachment and confirm receipt at the configured inbox.

## Main routes

- `/` — company overview
- `/about` — story, leadership, credentials
- `/products` — parts finder and vehicle systems
- `/brand-network` — own brands and partner network
- `/global-presence` — international presence
- `/beyond-automotive` — additional capabilities
- `/contact` — RFQ form and contact details
- `/privacy` and `/terms` — legal information
- `/es` — Spanish-language holding page, intentionally excluded from indexing

## Release process

1. Open a pull request into `main`.
2. Require the CI workflow to pass.
3. Review the Vercel preview on desktop and mobile.
4. Merge the pull request and verify the production deployment.
5. Submit one production RFQ and confirm email delivery.
