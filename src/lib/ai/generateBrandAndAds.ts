import OpenAI from "openai";
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


export async function generateBrandAndAds(
  input: GenerateInput,
): Promise<{
  brandProfile: BrandProfile;
  ads: Ad[];
}> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const openai = new OpenAI({ apiKey });

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: buildPrompt(input),
      },
    ],
    text: {
      format: {
        type: "json_object",
      },
    },
  });

  const parsed = JSON.parse(response.output_text);

  const brandProfile: BrandProfile = {
    whatClientDoes: parsed.brandProfile?.whatClientDoes ?? "not found",
    targetAudience: parsed.brandProfile?.targetAudience ?? "not found",
    mainValueProposition:
      parsed.brandProfile?.mainValueProposition ?? "not found",
    toneVoice: parsed.brandProfile?.toneVoice ?? "not found",
    colorPalette: Array.isArray(parsed.brandProfile?.colorPalette)
      ? parsed.brandProfile.colorPalette
      : [],
    candidateImages: Array.isArray(parsed.brandProfile?.candidateImages)
      ? parsed.brandProfile.candidateImages
      : [],
    warnings: Array.isArray(parsed.brandProfile?.warnings)
      ? parsed.brandProfile.warnings
      : [],
  };

  const ads: Ad[] = (parsed.ads ?? []).slice(0, 3).map((ad: any) => ({
    id: nanoid(),
    creativeIdea: ad.creativeIdea ?? "",
    primaryText: ad.primaryText ?? "",
    headline: ad.headline ?? "",
    description: ad.description ?? "",
    cta: ad.cta ?? "Learn more",
    imageUrl: ad.imageUrl || input.images[0] || null,
    manuallyEdited: false,
  }));

  return {
    brandProfile,
    ads,
  };
}