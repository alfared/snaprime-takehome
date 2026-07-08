import { GoogleGenAI } from "@google/genai";
import { nanoid } from "nanoid";
import type { BrandProfile, Ad } from "../db/schema";
import { SYSTEM_PROMPT, buildPrompt } from "./prompts";

type GenerateInput = {
  url: string;
  title: string;
  description: string;
  text: string;
  images: string[];
};

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateBrandAndAds(
  input: GenerateInput,
): Promise<{
  brandProfile: BrandProfile;
  ads: Ad[];
}> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\n${buildPrompt(input)}`,
          },
        ],
      },
    ],
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  const cleaned = text
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    brandProfile: parsed.brandProfile,
    ads: (parsed.ads ?? []).map((ad: any) => ({
      id: nanoid(),
      creativeIdea: ad.creativeIdea ?? "",
    })),
  };
}