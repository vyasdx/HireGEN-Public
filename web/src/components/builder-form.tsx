"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SubmitState = "idle" | "loading" | "error";

export function BuilderForm() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<"baseline_profile" | "target_gap">("baseline_profile");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError(null);

    const form = new FormData(event.currentTarget);
    const projectLinks = String(form.get("projects") ?? "")
      .split(/\r?\n/)
      .map((link) => link.trim())
      .filter(Boolean);

    const payload = {
      analysis_mode: analysisMode,
      name: String(form.get("name") ?? ""),
      target_role: String(form.get("role") ?? ""),
      target_job_description: String(form.get("target_job_description") ?? ""),
      resume_text: String(form.get("resume") ?? ""),
      github_url: String(form.get("github") ?? ""),
      project_links: projectLinks,
      product_context: String(form.get("product_context") ?? ""),
      product_role: String(form.get("product_role") ?? ""),
      product_users: String(form.get("product_users") ?? ""),
      private_repo_status: String(form.get("private_repo_status") ?? ""),
    };

    const response = await fetch("/api/skill-graph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.graph) {
      setState("error");
      setError(data?.error ?? "Could not generate the proof profile. Please check the inputs and try again.");
      return;
    }

    sessionStorage.setItem("hiregen:last-skill-graph", JSON.stringify(data));
    router.push("/profile/generated");
  }

  return (
    <form onSubmit={onSubmit} className="glass-strong p-6 md:p-8 space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">Analysis type</legend>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <label className={`glass-soft p-4 cursor-pointer border ${analysisMode === "baseline_profile" ? "border-brand-300" : "border-white/70"}`}>
            <input
              type="radio"
              name="analysis_mode_choice"
              value="baseline_profile"
              checked={analysisMode === "baseline_profile"}
              onChange={() => setAnalysisMode("baseline_profile")}
              className="sr-only"
            />
            <span className="block font-semibold text-sm">Profile baseline</span>
            <span className="mt-1 block text-xs text-ink-500">
              Resume + GitHub based current profile, proof signals, and default career roadmap.
            </span>
          </label>
          <label className={`glass-soft p-4 cursor-pointer border ${analysisMode === "target_gap" ? "border-brand-300" : "border-white/70"}`}>
            <input
              type="radio"
              name="analysis_mode_choice"
              value="target_gap"
              checked={analysisMode === "target_gap"}
              onChange={() => setAnalysisMode("target_gap")}
              className="sr-only"
            />
            <span className="block font-semibold text-sm">Target-role gap</span>
            <span className="mt-1 block text-xs text-ink-500">
              Compare profile against a target job role or job description.
            </span>
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className="text-sm font-semibold text-ink-900">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          placeholder="Priya A."
          className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      {analysisMode === "target_gap" && (
        <>
          <div>
            <label htmlFor="role" className="text-sm font-semibold text-ink-900">
              Target role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              minLength={3}
              placeholder="e.g. Senior AI Systems Engineer"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          <div>
            <label htmlFor="target_job_description" className="text-sm font-semibold text-ink-900">
              Target job description
            </label>
            <p className="text-xs text-ink-500 mb-2">
              Optional, but useful. Paste the JD to make the gap analysis sharper.
            </p>
            <textarea
              id="target_job_description"
              name="target_job_description"
              rows={5}
              placeholder="Paste target job description, responsibilities, and required skills..."
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-y"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="resume" className="text-sm font-semibold text-ink-900">
          Resume text
        </label>
        <p className="text-xs text-ink-500 mb-2">
          Paste plain text for the MVP. PDF parsing lands after the core graph is stable.
        </p>
        <textarea
          id="resume"
          name="resume"
          rows={8}
          required
          minLength={20}
          placeholder="Paste resume content here..."
          className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-y"
        />
      </div>

      <div>
        <label htmlFor="github" className="text-sm font-semibold text-ink-900">
          GitHub URL
        </label>
        <input
          id="github"
          name="github"
          type="url"
          placeholder="https://github.com/your-handle"
          className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      <div>
        <label htmlFor="projects" className="text-sm font-semibold text-ink-900">
          Live project links (one per line)
        </label>
        <p className="text-xs text-ink-500 mb-2">
          Add completed/live products, demos, docs, or repo links. HireGEN checks reachability and uses them as proof signals.
        </p>
        <textarea
          id="projects"
          name="projects"
          rows={3}
          placeholder="https://www.disciplinem.com/&#10;https://www.vidyasutra.co.in/&#10;https://github.com/your-handle/repo"
          className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-y"
        />
      </div>

      <fieldset className="glass-soft p-4 space-y-4">
        <legend className="text-sm font-semibold text-ink-900">Product proof details</legend>
        <p className="text-xs text-ink-500">
          Useful when public GitHub is incomplete, private repos hold real work, or the product is niche.
        </p>

        <div>
          <label htmlFor="product_context" className="text-sm font-semibold text-ink-900">
            Product problem and value
          </label>
          <textarea
            id="product_context"
            name="product_context"
            rows={3}
            placeholder="What problem does the product solve? Who benefits? What value does it create?"
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-y"
          />
        </div>

        <div>
          <label htmlFor="product_role" className="text-sm font-semibold text-ink-900">
            Your role in the product
          </label>
          <textarea
            id="product_role"
            name="product_role"
            rows={2}
            placeholder="What did you build personally? Architecture, frontend, backend, AI, deployment, operations, integrations..."
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-y"
          />
        </div>

        <div>
          <label htmlFor="product_users" className="text-sm font-semibold text-ink-900">
            Users, status, or traction
          </label>
          <textarea
            id="product_users"
            name="product_users"
            rows={2}
            placeholder="Who uses it? Is it live, beta, internal, client-facing, demo, or early traction?"
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-y"
          />
        </div>

        <div>
          <label htmlFor="private_repo_status" className="text-sm font-semibold text-ink-900">
            Private repo proof
          </label>
          <select
            id="private_repo_status"
            name="private_repo_status"
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            defaultValue=""
          >
            <option value="">Not specified</option>
            <option value="none">No private repo proof</option>
            <option value="available_on_request">Private repo or screenshots available on request</option>
            <option value="not_available">Private repo cannot be shared</option>
          </select>
        </div>
      </fieldset>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Generating proof profile..." : "Generate skill graph"}
      </button>

      <p className="text-center text-xs text-ink-500">
        Resume is the primary source. GitHub, live products, and product notes add proof without replacing experience.
      </p>
    </form>
  );
}
