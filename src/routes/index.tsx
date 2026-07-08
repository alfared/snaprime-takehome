import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { extractUrl } from "../server/extract.functions";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate() {

    setIsLoading(true);
    setError("");
    setResult(null);

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
    </main>
  );
}