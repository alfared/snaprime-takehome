import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export type BrandProfile = {
  whatClientDoes: string;
  targetAudience: string;
  mainValueProposition: string;
  toneVoice: string;
  colorPalette: string[];
  candidateImages: string[];
  warnings: string[];
};

export type Ad = {
  id: string;
  creativeIdea: string;
  primaryText: string;
  headline: string;
  description: string;
  cta: string;
  imageUrl: string | null;
  manuallyEdited: boolean;
};

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  inputUrl: text("input_url").notNull(),
  status: text("status").notNull().default("pending"),
  error: text("error"),
  extractedText: text("extracted_text"),
  images: text("images", { mode: "json" }).$type<string[]>().default([]),
  brandProfile: text("brand_profile", { mode: "json" }).$type<BrandProfile>(),
  ads: text("ads", { mode: "json" }).$type<Ad[]>().default([]),
  latencyMs: integer("latency_ms"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});