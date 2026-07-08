import OpenAI from "openai";
import { nanoid } from "nanoid";

type Input = {
  url: string;
  title: string;
  description: string;
  text: string;
  images: string[];
};

export async function generateBrandAndAds(input: Input, apiKey: string) {}