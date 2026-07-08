import { parseHtml } from "./parser"

export async function extractWithBrowserless(url: string, token: string) {
  const response = await fetch(
    `https://production-sfo.browserless.io/content?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        waitForTimeout: 3000,
      }),
    },
  );

  const html = await response.text();

  if (!response.ok) {
    throw new Error(`Browserless ${response.status}: ${html.slice(0, 300)}`);
  }

  return parseHtml(url, html);
}

export async function extractWebsite(url: string, token: string) {
    const startedAt = Date.now();

    try {
      const page = await extractWithBrowserless(url, token);

      return {
        ...page,
        latencyMs: Date.now() - startedAt,
        status: page.text.length > 200 ? "ready" : "partial",
        warnings:
            page.text.length > 200
                ? page.warnings
                : [
                    ...page.warnings,
                    "Rendered page contained very little readable text.",
                  ]
      }
    } catch (error) {
        return {
            url,
            title: "",
            description: "",
            headings: [],
            text: "",
            images: [],
            colors: [],
            latencyMs: Date.now() - startedAt,
            status: "failed",
            warnings: [
                error instanceof Error ? error.message : "Could not read this page.",
            ],
        }
    }
}