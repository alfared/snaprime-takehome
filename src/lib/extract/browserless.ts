import * as cheerio from "cheerio";
import { parseHtml } from "./parser"

export async function extractWithBrowserless(
  url: string,
  token: string,
){
    const response = await fetch(
        `https://chrome.browserless.io/content?token=${token}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url,
                gotoOptions: {
                    waitUntil: "networkidle2",
                    timeout: 16000,
                },
            }),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to render page");
    }

    const html = await response.text();

    return parseHtml(url, html);
}

export async function extractWebsite(url: string, token: string) {
    const startedAt = Date.now();

    try {
      const page = await extractWithBrowserless(url, token);
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