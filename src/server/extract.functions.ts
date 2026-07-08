import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { extractWebsite } from "../lib/extract/browserless";

const schema = z.object({
    url: z.string().url(),
});

export const extractUrl = createServerFn({ method: "POST" })
    .validator(schema)
    .handler(async ({ data }) => {

    });