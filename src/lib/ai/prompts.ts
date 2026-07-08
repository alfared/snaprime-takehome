export const SYSTEM_PROMPT = `
You are a senior performance marketer.

Rules:

- Use ONLY information found on the website.
- Never invent facts.
- If something is unknown return "not found".
- Return only valid JSON.
`;

export function buildPrompt(input: {
  url: string;
  title: string;
  description: string;
  text: string;
  images: string[];
}) {
  return `
Website URL:
${input.url}

Title:
${input.title}

Description:
${input.description}

Candidate Images:
${input.images.join("\n")}

Website Text:
${input.text}

Generate:

1. Brand Profile
2. Between 1 and 3 ads.

Return ONLY JSON.

{
  "brandProfile": {
    "whatClientDoes": "",
    "targetAudience": "",
    "mainValueProposition": "",
    "toneVoice": "",
    "colorPalette": [],
    "candidateImages": [],
    "warnings": []
  },
  "ads": [
    {
      "creativeIdea": "",
      "primaryText": "",
      "headline": "",
      "description": "",
      "cta": "",
      "imageUrl": ""
    }
  ]
}
`;
}