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

## Screenshots
<img width="1902" height="291" alt="image" src="https://github.com/user-attachments/assets/06382788-d40f-4d8c-a310-34b9aa026896" />
<img width="1121" height="634" alt="image" src="https://github.com/user-attachments/assets/828b418d-3115-492a-b963-af4707ff5dce" />

<img width="702" height="777" alt="image" src="https://github.com/user-attachments/assets/fce40a57-12b5-4995-beba-78df3c392d01" />
<img width="661" height="739" alt="image" src="https://github.com/user-attachments/assets/4c8799ee-42cf-417d-9361-e5f0d9bf04d3" />
<img width="653" height="777" alt="image" src="https://github.com/user-attachments/assets/99b22e22-b561-4a6e-b34b-b38b2a9149b6" />

