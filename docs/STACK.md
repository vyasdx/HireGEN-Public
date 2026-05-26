# HireGEN — Infrastructure & Stack

> Definitive reference for what we're building on. Update whenever a stack decision changes.

**Last updated:** 2026-05-15
**Status:** Proposed — final lock at Next.js scaffold time

---

## Stack at a glance

```
┌─────────────────────────────────────────────────────────────┐
│                  Frontend (Next.js 14)                      │
│   App Router · TypeScript · Tailwind · shadcn/ui · Framer  │
├─────────────────────────────────────────────────────────────┤
│              API / Server (Next.js Server Actions)          │
│            + Background Jobs (Inngest / Trigger.dev)        │
├──────────────────────────┬──────────────────────────────────┤
│   Postgres (Neon)        │   Vector store (pgvector)        │
│   Relational data         │   Skill / job embeddings         │
├──────────────────────────┼──────────────────────────────────┤
│   Redis (Upstash)        │   Object storage (Cloudflare R2) │
│   Sessions, cache        │   Resumes, project files          │
├──────────────────────────┴──────────────────────────────────┤
│              AI Layer · Claude Sonnet 4.6                   │
│   Skill extraction · Matching · Coach · Profile parsing     │
├─────────────────────────────────────────────────────────────┤
│   Auth: Clerk (recommended) · Email: Resend · Analytics: PostHog │
├─────────────────────────────────────────────────────────────┤
│             Hosting: Vercel (web) · Cloudflare (edge/files)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Frontend

| Choice | Why |
|---|---|
| **Next.js 14 (App Router)** | SSR for SEO (jobs, profiles must rank on Google), server components reduce JS shipped, mature ecosystem. |
| **TypeScript** | Non-negotiable at this complexity. |
| **Tailwind CSS** | Utility-first, fast iteration, matches design language. |
| **shadcn/ui** | Copy-paste primitives (we own source, no version-lock). Identical aesthetic to Linear / Cal.com / Vercel. |
| **Framer Motion** | Subtle motion only — page transitions, card lifts. |
| **Lucide Icons** | Clean, consistent, tree-shakeable. |
| **next/font** | Self-hosted Inter + Instrument Serif (no Google CDN flash). |

**Rejected:**
- Vite + React Router (no SSR/SEO).
- Material UI / Chakra / Mantine (wrong aesthetic).
- Remix (smaller ecosystem, less recruiter familiarity).

---

## 2. Backend / API

| Choice | Why |
|---|---|
| **Next.js Route Handlers + Server Actions** | Co-located with frontend, type-safe across the wire via tRPC-like contracts. Sufficient for MVP load. |
| **Inngest** (or Trigger.dev) | Background jobs — AI matching, weekly skill-decay recalculations, email digests. Decouples slow AI work from request lifecycle. |
| **Zod** | Schema validation on every server action boundary. |

**Decision point:** If AI workload becomes heavy, peel a Python FastAPI service onto Cloud Run later. Don't pre-optimize.

---

## 3. Database

| Choice | Why |
|---|---|
| **Postgres on Neon** | Serverless, branchable for dev/preview, generous free tier, mature. |
| **pgvector** extension | Native vector similarity inside the same DB — no separate Pinecone bill at MVP scale. Can migrate to Pinecone if recall demands it. |
| **Drizzle ORM** | Type-safe SQL, lightweight, plays well with Neon serverless driver. |

**Rejected:**
- Firestore — relational data (users ↔ jobs ↔ skills ↔ matches) hurts in a doc DB.
- Supabase Postgres — fine alternative; Neon picked for cleaner branching workflow.
- MongoDB — no.

---

## 4. Auth

| Choice | Why |
|---|---|
| **Clerk** (recommended) | LinkedIn OAuth built-in (critical — import LinkedIn profile is our acquisition lever), best DX for Next.js, India-friendly pricing. |
| Alternative: **Supabase Auth** | Cheaper, but worse LinkedIn OAuth ergonomics. |
| Alternative: **NextAuth (Auth.js)** | Free, but more wiring required. |

**Required OAuth providers at launch:**
- LinkedIn (acquisition lever — "import in 1 click")
- Google (universal)
- GitHub (signals to candidate engineers)
- Email + OTP (for candidates without the above)

---

## 5. File storage

| Choice | Why |
|---|---|
| **Cloudflare R2** | S3-compatible, zero egress fees (matters when serving project portfolio downloads). |
| Image transforms via `next/image` + R2 backend. |

**Uploaded artifacts:**
- Candidate: profile photo, project artifacts (code/PDF), video intro.
- Recruiter: company logo, JD attachments.

---

## 6. AI Layer

### Models

| Use case | Model | Rationale |
|---|---|---|
| **Skill extraction from profile / GitHub / resume** | Claude Sonnet 4.6 | Strong structured extraction, cost-efficient at volume. |
| **Job ↔ candidate matching reasoning** | Claude Sonnet 4.6 | Same model, reuse caching. |
| **AI Career Coach** (conversational) | Claude Sonnet 4.6 with prompt caching | Long system prompt holding skill taxonomy benefits from caching. |
| **Embeddings (skills, JDs)** | `voyage-3-large` or OpenAI `text-embedding-3-large` | Vector search in pgvector. Decide based on India-context retrieval quality benchmark. |

### Reliability

- Prompt caching enabled on all Claude calls (long system prompts).
- All AI calls go through a typed `aiClient` wrapper with timeout + retry + structured-output guarantees (Zod schema validation).
- Idempotency keys on all background AI jobs.

---

## 7. Email

| Choice | Why |
|---|---|
| **Resend** | Best DX for transactional + React Email templates. |
| **React Email** | Components for templates so design tokens stay consistent with web. |

**Transactional flows:**
- Welcome / OTP / magic link
- New match notification (candidate)
- New qualified candidate (recruiter)
- Weekly digest (both sides)

---

## 8. Analytics & Observability

| Choice | Why |
|---|---|
| **PostHog** | Product analytics + session replay + feature flags + experiments. One tool, India-region available. |
| **Sentry** | Error tracking, frontend + backend. |
| **Axiom** | Structured logs from server actions + AI calls. |

---

## 9. Hosting

| Layer | Host | Why |
|---|---|---|
| Web app | **Vercel** | Native Next.js, edge functions, India region available. |
| Static assets / files | **Cloudflare R2** + CDN | Zero egress. |
| Background workers | **Inngest** managed | Don't run our own queue at MVP. |
| Database | **Neon** | Serverless Postgres. |

**Decision point:** If Vercel costs spike post-scale, evaluate Cloudflare Workers (Hono / Next on Workers). Don't pre-optimize.

---

## 10. Local dev

| Tool | Why |
|---|---|
| **pnpm** | Fast, disk-efficient. |
| **Biome** | Replaces ESLint + Prettier — single tool, much faster. |
| **TypeScript strict mode** | Always. |
| **Vitest** + **Playwright** | Unit + E2E. |
| **Husky + lint-staged** | Pre-commit gates. |

---

## Cost envelope (rough MVP estimate)

| Service | Monthly (MVP) |
|---|---|
| Vercel Pro | $20 |
| Neon Postgres | $0–$19 |
| Clerk | $0 (free tier covers MVP) |
| Cloudflare R2 | <$5 |
| Resend | $0 (free tier) |
| PostHog Cloud | $0 (free tier) |
| Sentry | $0 (free tier) |
| Inngest | $0 (free tier) |
| Claude API (10k matches/mo) | ~$50–$150 |
| **Total** | **~$80–$200 / month** |

Generous headroom on every free tier until we hit ~5k MAU. Scales to ~$500/mo at ~50k MAU pre-optimization.

---

## Compliance baseline

- **DPDP Act 2023** — granular per-purpose consent, right-to-erase enforced, DPO appointed before scale thresholds.
- **No user data resale, ever.**
- All PII encrypted at rest (Neon native) and in transit (TLS).
- Audit log on every recruiter-side access to candidate data.
