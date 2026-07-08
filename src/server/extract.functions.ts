import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createDb } from "../lib/db";
import { projects } from "../lib/db/schema";
import { extractWebsite } from "../lib/extract/browserless";
import { generateBrandAndAds } from "../lib/ai/generateAds";

const schema = z.object({
    url: z.string().url(),
});

export const extractUrl = createServerFn({ method: "POST" })
    .validator(schema)
    .handler(async ({ data }) => {
        const token = process.env.BROWSERLESS_TOKEN;

        if (!token) {
            throw new Error("BROWSERLESS_TOKEN is missing");
        }

        const db = createDb(env.DB);

        const extracted = await extractWebsite(data.url, token);
        const now = new Date().toISOString();

        const geminiKey = process.env.GEMINI_API_KEY;

        if (!geminiKey) {
            throw new Error("GEMINI_API_KEY is missing");
        }

        const generated = await generateBrandAndAds({
            url: data.url,
            title: extracted.title,
            description: extracted.description,
            text: extracted.text,
            images: extracted.images,
        });

        const project ={
            id: nanoid(),
            inputUrl: data.url,
            status: extracted.status,
            error: extracted.status === "failed" ? extracted.warnings.join("\n") : null,
            extractedText: extracted.text,
            images: extracted.images,
            brandProfile: generated.brandProfile,
            ads: generated.ads,
            latencyMs: extracted.latencyMs,
            createdAt: now,
            updatedAt: now,
        }

        await db.insert(projects).values(project);

        return project;
    });