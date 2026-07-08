import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import { createDb } from "../lib/db";
import { projects } from "../lib/db/schema";
import type { Ad } from "../lib/db/schema";
import { generateBrandAndAds } from "../lib/ai/generateBrandAndAds";

const schema = z.object({
  projectId: z.string(),
  adId: z.string(),
});

export const regenerateAd = createServerFn({ method: "POST" })
    .validator(schema)
    .handler(async ({ data }) => {
        const db = createDb(env.DB);

        const project = await db.query.projects.findFirst({
            where: eq(projects.id, data.projectId),
        });

        const generated = await generateBrandAndAds({
            url: project.inputUrl,
            title: "",
            description: "",
            text: project.extractedText ?? "",
            images: project.images ?? [],
        });

        const newAd = generated.ads[0];
    });