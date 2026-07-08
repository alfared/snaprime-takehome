import * as cheerio from "cheerio";

export function parseHtml(url: string, html: string) {
  const $ = cheerio.load(html);

  $("script").remove();
  $("style").remove();
  $("noscript").remove();
  $("svg").remove()

  return {
    url,
    title: $("title").text(),

    description:
      $('meta[name="description"]').attr("content") ??
      $('meta[property="og:description"]').attr("content") ??
      "",

    headings: $("h1,h2,h3")
        .map((_, el) => $(el).text())
        .get(),

    text: $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 10000),

    images: $("img")
      .map((_, el) => $(el).attr("src"))
      .get()
      .filter(Boolean)
      .map((src) => new URL(src!, url).href)
      .filter((src) => !src.startsWith("data:"))
      .slice(0, 10),

    colors: [],

    warnings: [],
  }
}