# Snaprime Take-home

A vertical slice of the Snaprime workflow:

**URL → Website Extraction → Brand Profile → AI Ads → Editable Preview**

## Approach

The application extracts website content using Browserless (Playwright) to support JavaScript-rendered pages, parses the rendered HTML with Cheerio, and sends the extracted content to an LLM to generate a structured Brand Profile and three ads. Users can edit ads, save changes to Cloudflare D1, and regenerate individual ads without affecting the others.

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

- Generic website extraction (no hardcoded selectors)
- Supports JavaScript-rendered websites
- AI-generated Brand Profile
- Generates three ads
- Editable preview
- Save edits to Cloudflare D1
- Regenerate a single ad
- Graceful error handling
- Extraction latency reporting

## AI Usage

The application itself uses **OpenAI GPT-4.1 mini** for Brand Profile and ad generation.
All AI-generated suggestions were reviewed, adapted, and integrated manually.

## Key Decisions

- Used Browserless to reliably support JavaScript-rendered pages.
- Stored Brand Profile and generated ads directly in D1 as JSON for simplicity.
- Implemented single-ad regeneration to preserve user edits to other ads.
- Preferred a simple end-to-end implementation over additional infrastructure.

## Deferred

Given the suggested time budget, I intentionally deferred:

- image upload
- automatic brand color extraction
- caching
- SSRF protection
- AI retry/fallback strategy
- UI polishing

## Run locally

```bash
pnpm install
pnpm dev
```

## Environment Variables

```env
BROWSERLESS_TOKEN=
OPENAI_API_KEY=
```

## Deploy

```bash
pnpm deploy
```

## Live Demo

https://snaprime-takehome.vholovka.workers.dev

## Screenshots
<img width="1902" height="291" alt="image" src="https://github.com/user-attachments/assets/06382788-d40f-4d8c-a310-34b9aa026896" />
<img width="1121" height="634" alt="image" src="https://github.com/user-attachments/assets/828b418d-3115-492a-b963-af4707ff5dce" />

<img width="702" height="777" alt="image" src="https://github.com/user-attachments/assets/fce40a57-12b5-4995-beba-78df3c392d01" />
<img width="661" height="739" alt="image" src="https://github.com/user-attachments/assets/4c8799ee-42cf-417d-9361-e5f0d9bf04d3" />
<img width="653" height="777" alt="image" src="https://github.com/user-attachments/assets/99b22e22-b561-4a6e-b34b-b38b2a9149b6" />

