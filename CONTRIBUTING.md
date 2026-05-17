# Contributing

Thanks for helping improve PlaybookOps.

## Playbook Requirements

Every playbook must include output contract, expected output, evidence policy, risk level, execution mode, required permissions, safety rules, limitations, owner, version, status, tags, and scorecard.

## Playbook Files

Add one playbook JSON file under `playbooks/{domain}/{playbook-id}.json`. The web app, validators, and adapter generators load playbooks directly from that folder.

## Originality Rules

PlaybookOps accepts reusable workflows, not copied prompt text. Titles, summaries, descriptions, and prompt bodies must use original wording and a clear PlaybookOps structure.

It is fine to preserve the operational intent of a known workflow, but the contribution must improve the framing, expected output, output contract, evidence expectations, safety boundaries, and review value.

## i18n Rules

The platform UI is bilingual. When adding UI text, update both `site/prompt-explorer/src/i18n/en.ts` and `site/prompt-explorer/src/i18n/es.ts`.

Playbook content remains English by default for now. Future translated playbook variants should keep the same id contract and declare the locale explicitly.

## Adapter Rules

Contributors author playbooks. PlaybookOps owns the adapter templates that export those playbooks to AGENTS.md, CLAUDE.md, Kiro, Cursor, Windsurf, and GitHub Copilot formats.

If a tool needs better behavior, update the shared adapter layer in `site/prompt-explorer/src/playbook-adapters.ts` instead of duplicating prompt text inside each playbook.

## Review Process

1. Open an issue describing the playbook or change.
2. Add or update one JSON playbook under `playbooks/`.
3. Run `npm run validate:catalog`.
4. Include a sample output or evaluation note when possible.
5. Avoid destructive instructions and unsupported claims.

## Deprecation

Set `status` to `deprecated`, explain the replacement, and add a changelog entry.
