# Snaprime dev. task


## Stack

- TanStack Start
- React + TypeScript
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM
- Browserless (Playwright)
- OpenAI GPT-4.1 mini
- Cheerio

## Features

- Extracts website content from any URL
- Supports JavaScript-rendered websites
- Generates a structured Brand Profile
- Generates 3 AI ads
- Editable ad preview
- Save edits to Cloudflare D1
- Regenerate a single ad without affecting the others
- Graceful handling of extraction and AI failures
- Displays extraction latency

## Run locally

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

## Environment Variables

```env
BROWSERLESS_TOKEN=
OPENAI_API_KEY=
```

## Database

Generate migrations:

```bash
pnpm db:generate
```

Apply migrations:

```bash
pnpm db:local
pnpm db:remote
```

## Deploy

```bash
pnpm deploy
```

## AI Usage

All AI-generated suggestions were reviewed, adapted, and integrated manually.

## Deferred

Given the suggested time budget, I intentionally deferred:

- image upload
- automatic brand color extraction
- caching
- SSRF protection
- AI retry/fallback strategy
- UI polishing

## Live Demo

https://snaprime-takehome.vholovka.workers.dev