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
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 25,
        marginBottom: 25,
      }}
    >
      <h2>Brand Profile</h2>

      <p><strong>What they do:</strong> {brandProfile.whatClientDoes}</p>
      <p><strong>Audience</strong> {brandProfile.targetAudience}</p>
      <p><strong>Tone:</strong> {brandProfile.toneVoice}</p>

      {brandProfile.warnings?.length > 0 && (
        <p>
          <strong>Warnings:</strong> {brandProfile.warnings.join(", ")}
        </p>
      )}
    </section>
  );
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
  return (
    <article
      style={{
        border: "1px solid #bdb6b6",
        borderRadius: 10,
        padding: 25,
      }}
    >
       <h3>Ad #{index + 1}</h3>
       {ad.imageUrl && (
         <img
            src={ad.imageUrl}
            alt=""
            style={{
              width: "100%",
              maxHeight: 250,
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 20,
            }}
          />
       )}

       <Field 
          label="Creative idea"
          value={ad.creativeIdea}
          onChange={(value) => onChange(ad.id, "creativeIdea", value)}
       />
       <Field 
          label="Primary text"
          value={ad.primaryText}
          onChange={(value) => onChange(ad.id, "primaryText", value)}
       />
       <Field
          label="Headline"
          value={ad.headline}
          onChange={(value) => onChange(ad.id, "headline", value)}
       />

       <Field
          label="Description"
          value={ad.description}
          textarea
          onChange={(value) => onChange(ad.id, "description", value)}
       />

       <Field
         label="CTA"
         value={ad.cta}
         onChange={(value) => onChange(ad.id, "cta", value)}
       />

       <Field
         label="Image URL"
         value={ad.imageUrl ?? ""}
         onChange={(value) => onChange(ad.id, "imageUrl", value)}
       />

        {ad.manuallyEdited && (
          <p style={{ fontSize: 13, color: "rgb(85, 50, 85)" }}>Edited locally</p>
         )}
    </article>
  );
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
       <strong>{label}</strong>

       {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />
       ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />
      )}
    </label>
  );
}

function HomePage() {
  const [url, setUrl] = useState("");
  const [project, setProject] = useState<ProjectResult | null>(null);
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

  function updateAd(adId: string, field: keyof Ad, value: string) {
    setAds((current) =>
      current.map((ad) =>
        ad.id === adId ? { ...ad, [field]: value, manuallyEdited: true } : ad,
      ),
    );
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
        <>
          <section>
            <p>
              <strong>Status:</strong> {project.status} ·{" "}
            </p>
            {project.error && <p style={{ color: "crimson"}}>{project.error}</p>}
          </section>

          {project.brandProfile && (
            <BrandProfileCard brandProfile={project.brandProfile}/>
          )}

          <section>
            <h2>Generated Ads</h2>
            <div style={{ display: "grid", gap: 20 }}>
              {ads.map((ad, index) => (
                <AdCard 
                  key={ad.id}
                  ad={ad}
                  index={index}
                  onChange={updateAd}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}