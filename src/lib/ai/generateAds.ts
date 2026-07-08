import { GoogleGenAI } from "@google/genai";
import { nanoid } from "nanoid";
import type { BrandProfile, Ad } from "../db/schema";

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
  const prompt = ``;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned empty response");
  }
}