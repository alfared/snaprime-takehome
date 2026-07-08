import * as cheerio from "cheerio";
import { parseHtml } from "./parser";

export async function extractWithBrowserless(
  url: string,
  token: string,
){

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