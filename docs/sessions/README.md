# HireGEN Session Logs

> Shared multi-agent working memory for Codex and Claude Code.

Before starting a new working session, read the latest files in this folder.

## Naming Convention

Codex sessions:

```text
codex.session<NNN>.<YYYY-MM-DD>.md
```

Claude Code sessions:

```text
claude.session<NNN>.<YYYY-MM-DD>.md
```

Examples:

- `codex.session001.2026-05-25.md`
- `claude.session001.2026-05-25.md`

## How To Use

Each session log should include:

- Date and agent
- Starting context
- Work completed
- Files changed
- Decisions made
- Open questions
- Next recommended actions
- Git/V-Office status if relevant

Keep logs concise but complete enough that the other agent can resume without asking the user to repeat context.

