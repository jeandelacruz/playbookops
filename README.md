# PlaybookOps

Reusable playbooks for teams that ship with evidence.

[Leer en Espanol](README.es.md)

PlaybookOps turns engineering know-how into reusable playbooks for Codex, Claude Code, Kiro, Cursor, Windsurf, GitHub Copilot, Gemini CLI, Aider, and future tools.

## Why It Exists

Most prompt libraries are useful, but teams need more than loose snippets. A good playbook should define scope, required permissions, evidence, output sections, expected output, safety boundaries, adapters, and review criteria.

## What Is Included

- A playbook catalog across CloudOps, DevSecOps, Backend, Architecture, Agent Context, Payments, and FinOps.
- Dynamic catalog loading directly from `playbooks/**/*.json`.
- JSON Schema for playbooks, adapters, and scorecards.
- React + Vite catalog explorer.
- TypeScript validation and adapter generation tools.
- Community governance, security, contribution, and evaluation docs.

## Run Locally

```bash
npm install
npm run dev
npm run validate:catalog
```

## Build

```bash
npm run build
npm run preview
```

The static site is written to `dist/site`.

## Generate Adapters

Adapters turn one playbook into tool-specific instruction files. Use them when you want to copy a playbook into a repository or workspace as `AGENTS.md`, `CLAUDE.md`, Kiro steering/spec files, Cursor rules, Windsurf rules, or GitHub Copilot instructions.

They do not change cloud resources or execute the playbook. They only create portable instruction files from the selected playbook. Each adapter has its own structure and guidance for the target tool.

```bash
npm run generate:agents -- --playbook aws-lambda-cost-security-review
npm run generate:claude -- --playbook aws-lambda-cost-security-review
npm run generate:kiro-steering -- --playbook aws-lambda-cost-security-review
npm run generate:kiro-spec -- --playbook aws-lambda-cost-security-review
npm run generate:cursor -- --playbook aws-lambda-cost-security-review
npm run generate:windsurf -- --playbook aws-lambda-cost-security-review
npm run generate:copilot -- --playbook aws-lambda-cost-security-review
```

## Categories

CloudOps, DevSecOps, Backend Engineering, Architecture, Spec-Driven Development, Agent Context Engineering, Incident Response, Payments, and FinOps.

## Governance Rules

Every playbook must declare an output contract, expected output, risk level, execution mode, required permissions, evidence policy, safety rules, owner, version, status, tags, and limitations. Playbooks must not request production mutation without explicit confirmation and must not invent evidence.

## Contributing UI Translations

The platform UI supports English and Spanish. Add new UI strings to both `site/prompt-explorer/src/i18n/en.ts` and `site/prompt-explorer/src/i18n/es.ts`.

## Content Originality

Playbooks must use original titles, summaries, descriptions, and prompt bodies. Contributions can preserve a workflow intent, but they must improve the structure, evidence expectations, safety language, and decision value.

## Roadmap

1. MVP catalog.
2. Governed playbook authoring.
3. Enhanced playbook library.
4. Multi-agent adapters.
5. PromptOps governance.
6. Evaluation framework.
7. Community marketplace.
8. Enterprise policy packs.

## License

MIT.

## Credits

Built by [Jeancarlos De la cruz C.](https://www.linkedin.com/in/jeancarlosdelacruz/).
