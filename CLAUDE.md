# HireGEN — Claude Operating Notes

India-first, skill-validated hiring platform. Replaces resume noise with verifiable proof of capability. AI parses GitHub portfolios and projects to build structured skill graphs. Recruiters see qualified candidates ranked by real signal, not pedigree.

- Default branch: **main**
- Remote: https://github.com/vyasdx/HireGEN
- Public mirror: https://github.com/vyasdx/HireGEN-Public
- Single source of truth for project state: **`.voffice/`** in this repo
- The V-Office dashboard reads `.voffice/` directly

## Public Mirror Rule
`HireGEN-Public` is a clean-history public mirror for hackathon visibility. It intentionally excludes `.voffice/`, `.claude/`, `.env*`, `.vercel/`, `node_modules/`, `.next/`, and local generated state. Do not push private V-Office context or secrets to the public mirror. Private-to-public sync is manual until an explicit sync workflow is added.

## V-Office Auto-Update Rules
BEFORE EVERY GIT PUSH, you MUST:
- Update `.voffice/status.md` with current state (dated bullets — every bullet starts with `[YYYY-MM-DD]`)
- Append to `.voffice/log/<today>.md` with push details; create the file if it doesn't exist
- If `.voffice/log/` has more than 5 files, delete the oldest until 5 remain
- Update `.voffice/budget.md` only if a cost changed
- Update `.voffice/infra.md` only if infrastructure changed

## Multi-Agent Session Logs
BEFORE STARTING WORK, you MUST:
- Read the latest files in `docs/sessions/`
- Read the latest Codex session log if you are Claude Code
- Read the latest Claude session log if you are Codex
- Create or update your own session log before handing work back

Session file naming:
- Codex: `docs/sessions/codex.session<NNN>.<YYYY-MM-DD>.md`
- Claude Code: `docs/sessions/claude.session<NNN>.<YYYY-MM-DD>.md`

Each session log should capture: starting context, work completed, files changed, decisions made, open questions, next recommended actions, and git/V-Office status.

## Issue ID Tracking (`.voffice/issues.md`)
- Project prefix: **HIREGEN**
- Every new bug/enhancement/decision gets an ID immediately: `BUG-HIREGEN-NNN`, `ENH-HIREGEN-NNN`, `DEC-HIREGEN-NNN`, `RF-HIREGEN-NNN`
- Reference IDs in status.md In Progress, Blockers, and Decisions sections

## Timezone Rule
ALL dates and times in .voffice/ files MUST use IST (Indian Standard Time, UTC+5:30).

## Company-Wide Context
Before starting work, read `.voffice/company-feed.md` for company-wide context (milestones, NVIDIA Inception, cloud credits, cross-product status, decisions). This file is auto-updated 2x/day by V-Office Exec Agent (8 AM + 7 PM IST).

Privacy rule: `.voffice/company-feed.md` and `.voffice/company-response.md` are local/private V-Office context files and are intentionally ignored by Git. Never force-add them, and do not include their private cross-product, financial, account, or company coordination details in public commits.

### Writing Back (Two-Way Feed)
After reading the company feed, if you discover relevant insights, discrepancies, or cross-product requests, write them to `.voffice/company-response.md` using this format:

```markdown
# Company Feed Response — HireGEN
last_updated: [YYYY-MM-DD]

## Resource Relevance (for this product)
- [emoji] [Resource] — [HIGH/MEDIUM/LOW] — [why]

## Discrepancies Found
- [description]

## Requests to Other Products
- [Product]: [what you need]

## Actions Taken
- [date] [what was done]
```
