import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { extractUrl } from "../server/extract.functions";
import type { Ad, BrandProfile } from "../lib/db/schema";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type ProjectResult ={
  id: string;
  inputUrl: string;
  status: string;
  error: string | null;
  extractedText: string;
  images: string[];
  brandProfile: BrandProfile | null;
  ads: Ad[];
  latencyMs: number;
};

function BrandProfileCard({
  brandProfile,
}: {
  brandProfile: BrandProfile;
}) {
  
}

function AdCard({
  ad,
  index,
  onChange,
}: {
  ad: Ad;
  index: number;
  onChange: (adId: string, field: keyof Ad, value: string) => void;
}) {

}

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}){
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
    </label>
  );
}

function HomePage() {
  const [url, setUrl] = useState("");
  const [project, setProject] = useState<ProjectResult | null>(null);ll);
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate() {

    setIsLoading(true);
    setError("");
    setProject(null);
    setAds([]);

    try {
      const result = await extractUrl({ data: { url } });
      setProject(result as ProjectResult);
      setAds((result as ProjectResult).ads ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <main style={{ maxWidth: 900, margin: "35px auto", padding: 20 }}>
      <h1>Ad Generator Test Task</h1>

     <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.snaprime.com"
          style={{ flex: 1, padding: 12 }}
        />

        <button onClick={handleCreate} disabled={isLoading || !url}>
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {project && (

      )}
    </main>
  );
}