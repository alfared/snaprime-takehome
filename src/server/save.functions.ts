import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { env } from "cloudflare:workers";

import { createDb } from "../lib/db";
import { projects } from "../lib/db/schema";

const schema = z.object({
    projectId: z.string(),
    ads: z.array(z.any()),
});

export const saveAds = createServerFn({
        method: "POST",
    })
    .validator(schema)
    .handler(async ({ data }) => {

        const db = createDb(env.DB);

        await db
            .update(projects)
            .set({
                ads: data.ads,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(projects.id, data.projectId));
        
        return {
            success: true,
        };
    });