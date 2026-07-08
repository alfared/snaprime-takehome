import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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

        return extractWebsite(data.url, token);
    });