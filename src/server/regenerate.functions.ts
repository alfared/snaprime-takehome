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

        if (!project) {
            throw new Error("Project not found");
        }

        const ads = project.ads ?? [];
        const targetAd = ads.find((ad) => ad.id === data.adId);

        const generated = await generateBrandAndAds({
            url: project.inputUrl,
            title: "",
            description: "",
            text: project.extractedText ?? "",
            images: project.images ?? [],
        });

        const newAd = generated.ads[0];
        const availableImages = project.images ?? [];
        const currentImageIndex = availableImages.findIndex(
         (image) => image === targetAd.imageUrl,
        );
        const nextImage =
            availableImages.length > 0
                ? availableImages[(currentImageIndex + 1) % availableImages.length]
                : targetAd.imageUrl;

        const updatedAd: Ad = {
            ...newAd,
            id: data.adId,
            imageUrl: nextImage ?? null,
            manuallyEdited: false,
        };

        const updatedAds = ads.map((ad) =>
            ad.id === data.adId ? updatedAd : ad,
        );

        await db
            .update(projects)
            .set({
                ads: updatedAds,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(projects.id, data.projectId));

        return updatedAd;
    });