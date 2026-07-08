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

function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate() {

    setIsLoading(true);
    setError("");
    setResult(null);
    setAds([]);

    try {
      const data = await extractUrl({ data: { url } });
      setResult(data);
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

      {result && (
        <section>
          <h2>Extraction result</h2>
          <pre
            style={{
              background: "#111",
              color: "#eee",
              padding: 16,
              overflowX: "auto",
              borderRadius: 8,
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}