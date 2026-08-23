# Felipe Hamasaki — Portfolio

Personal portfolio site, built with Next.js.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui + Radix
- Biome (lint/format)
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key for the Resend transactional email service, used by the contact form. |
| `CONTACT_TO_EMAIL` | Address that receives contact form submissions. |
| `CONTACT_FROM_EMAIL` | Verified sender address on the Resend domain. |
| `NEXT_PUBLIC_SITE_URL` | Public base URL of the site, used for metadata, sitemap, canonical URLs and RSS. |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run Next.js lint |
| `pnpm biome check .` | Lint and format check with Biome |

## Documentation

The full spec-driven documentation for this project lives in [`docs/`](docs/).
