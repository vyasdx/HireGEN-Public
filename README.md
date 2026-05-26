# HireGEN

> Get hired on proof, not polish. India-first, AI-native hiring platform.

**Status:** Hackathon MVP build (OpenAI × Outskill, May 25–29 2026)
**Working name:** HireGEN *(placeholder, subject to change)*
**Project root:** `D:\HireGEN`
**Repo:** https://github.com/vyasdx/HireGEN
**Tracker:** [`docs/HACKATHON-TRACKER.md`](docs/HACKATHON-TRACKER.md)

---

## What this is

An AI-enabled hiring platform that **complements LinkedIn** rather than replacing it:

- **LinkedIn** shows who you are → identity, network, system of record.
- **HireGEN** proves what you can do → skill graphs, validation, system of action.

The wedge: **proof-of-capability hiring** for the Indian market, with explicit access to Tier-2/3 talent that LinkedIn's network bias structurally under-serves.

---

## Repository layout

```
D:\HireGEN\
├── web/                       ← Next.js 16 application (the actual product)
│   ├── src/app/              # App Router routes (/, /builder, /profile/[id], /recruiter, /brief)
│   ├── src/components/       # Shared UI (Nav, Footer, DemoChip)
│   ├── src/lib/              # demo-data.ts and future server utilities
│   └── .env.example          # required env keys
├── docs/                      ← Project docs (strategy, decisions, viability, hackathon)
│   ├── HACKATHON-TRACKER.md  # ⭐ Single source of truth for the sprint
│   ├── DECISIONS.md          # 20+ numbered decisions with rationale
│   ├── sessions/             # Multi-agent session logs (Codex + Claude Code)
│   └── ...
├── .voffice/                  ← V-Office project state (status, issues, log, budget)
├── assets/                    ← Logos + badges (SVG)
├── index.html                 ← Original Liquid Glass mockup (reference, not deployed)
├── hiregen-premium.html       ← Codex's parallel premium mockup (reference)
├── CLAUDE.md                  ← Claude Code operating rules (V-Office + multi-agent)
└── README.md
```

---

## Quick start

### Run the Next.js app

```bash
cd web
npm install   # only on first checkout
npm run dev   # http://localhost:3000
```

### Build for production

```bash
cd web
npm run build
npm start
```

### View the static mockup (no install)

```bash
# from D:\HireGEN
start index.html
```

---

## Documents

| File | Purpose |
|---|---|
| **`docs/HACKATHON-TRACKER.md`** | ⭐ **Single source of truth for the sprint** — 16-box scoreboard, dual journey, daily log |
| `docs/sessions/` | Multi-agent session logs (Codex + Claude Code) |
| `docs/DECISIONS.md` | All product/design/tech decisions with rationale (D-001 → D-023) |
| `docs/STACK.md` | Infrastructure stack and component choices |
| `docs/VISION.md` | Product vision, positioning, personas, win conditions |
| `docs/APPLICATION-VIABILITY-REPORT.md` | Viability + monetization + market sizing + risks |
| `docs/PRODUCT-MODULES-BACKLOG.md` | Module backlog (anti-cheat, personas, Git analyzer, Career Guide, AI Impact viz) |
| `docs/HACKATHON-DELIVERY-PLAN.md` | 7-day execution plan |
| `docs/KICKOFF-NOTES-2026-05-25.md` | Outskill kickoff session notes |
| `docs/BADGE-SYSTEM.md` | Candidate trust badge taxonomy |
| `docs/UI-UX-REFERENCES.md` | UI/UX teardown notes (Zoom-inspired structure) |
| `docs/CONTEXT-AND-PROMPT.md` | Self-contained handover document |

---

## Multi-agent collaboration

This project is built by **Codex** and **Claude Code** working in parallel, with strict session-log handoffs documented in `docs/sessions/`. See `CLAUDE.md` for the protocol.

Before starting a new session, each agent reads:
- The latest session logs in `docs/sessions/`
- `.voffice/status.md`
- `docs/HACKATHON-TRACKER.md`

---

## Roadmap

**Wave 1 (this hackathon, May 25–29 2026):**
1. ✅ Next.js scaffold + Liquid Glass design system port
2. ✅ Skeleton routes — `/`, `/builder`, `/profile/[id]`, `/recruiter`, `/brief`
3. ⏳ OpenAI structured-output skill-graph engine (Day 2)
4. ⏳ Deploy to Vercel + custom subdomain (Day 2–3)
5. ⏳ Real candidate fixtures + recruiter ranking (Day 3)
6. ⏳ Badge system + validation lab preview (Day 4)
7. ⏳ Polish + demo video + 1-page pitch finalized (Day 5)

**Wave 2 (post-hackathon):**
- Auth (Clerk LinkedIn OAuth)
- Postgres + pgvector skill graph store
- Git portfolio analyzer integration
- Career Guide module (resume → 3/6-month plan)

**Wave 3 (production):**
- Hermes Agent on Hostinger VPS for the agentic skill layer
- WhatsApp + Telegram career-guide gateway
- AI Impact on Jobs visualization

---

## Source brainstorm

- `LinkedIn_Product_Strategy.md` (in user's Downloads — original wedge thesis)
- `Layoff-Forensics-Brief.md` (sibling product brief)
