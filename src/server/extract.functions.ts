import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createDb } from "../lib/db";
import { projects } from "../lib/db/schema";
import { extractWebsite } from "../lib/extract/browserless";

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

        const extracted =  extractWebsite(data.url, token);
        const now = new Date().toISOString();

        const db = createDb(process.env.DB as unknown as D1Database);

        const project ={
            id: nanoid()
        }

        await db.insert(projects).values(project);

        return project;
    });