import { z } from "zod";

export const skillCategories = [
  "frontend",
  "backend",
  "database",
  "cloud",
  "testing",
  "ai",
  "soft_skill",
  "domain",
] as const;

export const evidenceKinds = ["github", "project", "resume", "lab"] as const;

export const skillEvidenceSchema = z.object({
  kind: z.enum(evidenceKinds),
  ref: z.string().min(1).max(120),
  note: z.string().max(180).nullable().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(60),
  category: z.enum(skillCategories),
  score: z.number().int().min(0).max(100),
  freshness_days: z.number().int().min(0).max(365),
  evidence: z.array(skillEvidenceSchema).min(1).max(4),
});

export const badgeSchema = z.object({
  id: z.string().min(1).max(40),
  label: z.string().min(1).max(80),
  awarded: z.boolean(),
  reason: z.string().min(1).max(180),
});

export const gapSchema = z.object({
  skill: z.string().min(1).max(80),
  severity: z.enum(["high", "medium", "low"]),
  recommendation: z.string().min(1).max(220),
});

export const roadmapItemSchema = z.object({
  week: z.number().int().min(1).max(24),
  focus: z.string().min(1).max(100),
  deliverable: z.string().min(1).max(160),
});

export const skillGraphSchema = z.object({
  id: z.string().min(1).max(80),
  name: z.string().min(1).max(80),
  city: z.string().min(1).max(80),
  education: z.string().min(1).max(120),
  target_role: z.string().min(1).max(120),
  match_score: z.number().int().min(0).max(100),
  summary: z.string().min(1).max(420),
  github: z.string().max(180),
  skills: z.array(skillSchema).min(4).max(10),
  badges: z.array(badgeSchema).min(4).max(8),
  gaps: z.array(gapSchema).min(2).max(5),
  roadmap_90d: z.array(roadmapItemSchema).min(6).max(12),
});

export const builderInputSchema = z.object({
  analysis_mode: z.enum(["baseline_profile", "target_gap"]).optional().default("baseline_profile"),
  name: z.string().trim().min(2).max(80),
  target_role: z.string().trim().max(120).optional().default(""),
  target_job_description: z.string().trim().max(4000).optional().default(""),
  resume_text: z.string().trim().min(20).max(12000),
  github_url: z.string().trim().max(180).optional().default(""),
  project_links: z.array(z.string().trim().max(180)).max(8).optional().default([]),
}).superRefine((input, ctx) => {
  if (input.analysis_mode === "target_gap" && input.target_role.trim().length < 3) {
    ctx.addIssue({
      code: "custom",
      path: ["target_role"],
      message: "Target role is required for target-role gap analysis.",
    });
  }
});

export type SkillGraph = z.infer<typeof skillGraphSchema>;
export type BuilderInput = z.infer<typeof builderInputSchema>;

export const skillGraphJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "name",
    "city",
    "education",
    "target_role",
    "match_score",
    "summary",
    "github",
    "skills",
    "badges",
    "gaps",
    "roadmap_90d",
  ],
  properties: {
    id: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1 },
    city: { type: "string", minLength: 1 },
    education: { type: "string", minLength: 1 },
    target_role: { type: "string", minLength: 1 },
    match_score: { type: "integer", minimum: 0, maximum: 100 },
    summary: { type: "string", minLength: 1 },
    github: { type: "string" },
    skills: {
      type: "array",
      minItems: 4,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "category", "score", "freshness_days", "evidence"],
        properties: {
          name: { type: "string", minLength: 1 },
          category: { type: "string", enum: skillCategories },
          score: { type: "integer", minimum: 0, maximum: 100 },
          freshness_days: { type: "integer", minimum: 0, maximum: 365 },
          evidence: {
            type: "array",
            minItems: 1,
            maxItems: 4,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["kind", "ref", "note"],
              properties: {
                kind: { type: "string", enum: evidenceKinds },
                ref: { type: "string", minLength: 1 },
                note: { type: ["string", "null"] },
              },
            },
          },
        },
      },
    },
    badges: {
      type: "array",
      minItems: 4,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "label", "awarded", "reason"],
        properties: {
          id: { type: "string", minLength: 1 },
          label: { type: "string", minLength: 1 },
          awarded: { type: "boolean" },
          reason: { type: "string", minLength: 1 },
        },
      },
    },
    gaps: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["skill", "severity", "recommendation"],
        properties: {
          skill: { type: "string", minLength: 1 },
          severity: { type: "string", enum: ["high", "medium", "low"] },
          recommendation: { type: "string", minLength: 1 },
        },
      },
    },
    roadmap_90d: {
      type: "array",
      minItems: 6,
      maxItems: 12,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["week", "focus", "deliverable"],
        properties: {
          week: { type: "integer", minimum: 1, maximum: 24 },
          focus: { type: "string", minLength: 1 },
          deliverable: { type: "string", minLength: 1 },
        },
      },
    },
  },
} as const;
