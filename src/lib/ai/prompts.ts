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
}) {}