# Adapter Guide

Adapters convert one playbook into tool-specific formats:

- `AGENTS.md` for Codex and coding assistants.
- `CLAUDE.md` for Claude Code.
- Kiro steering files and Kiro specs.
- Cursor and Windsurf workspace rules.
- GitHub Copilot instructions.

Each adapter preserves the same safety, evidence, permissions, expected output, and output contract from the selected playbook.

Adapters are useful when a team wants to place a playbook directly inside a repository or agent workspace. They generate instruction artifacts; they do not execute operational actions.
